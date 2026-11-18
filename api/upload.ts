import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 60,
  },
};

// Handle individual image uploads
// Saves to high-speed cloud storage and returns real, direct raw image file URLs (PNG, JPG, WEBP, GIF, etc.)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 50 * 1024 * 1024,
    keepExtensions: true,
  });

  try {
    const { files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    let uploadedFile: formidable.File | undefined;
    const rawEntry = Object.values(files)[0];
    if (Array.isArray(rawEntry)) {
      uploadedFile = rawEntry[0];
    } else {
      uploadedFile = rawEntry;
    }

    if (!uploadedFile || !uploadedFile.filepath || !fs.existsSync(uploadedFile.filepath)) {
      return res.status(400).json({ success: false, message: 'No file received' });
    }

    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    const filename = uploadedFile.originalFilename || 'product_photo.png';
    const mime = uploadedFile.mimetype || 'image/png';
    const blob = new Blob([fileBuffer], { type: mime });

    let directUrl: string | null = null;

    // 1. Primary: Catbox with proper Chrome User-Agent header (outputs permanent direct PNG/JPG/WEBP link)
    try {
      const catboxData = new FormData();
      catboxData.append('reqtype', 'fileupload');
      catboxData.append('fileToUpload', blob, filename);

      const catboxRes = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: catboxData,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      if (catboxRes.ok) {
        const text = await catboxRes.text();
        if (text && text.startsWith('http')) {
          directUrl = text.trim();
        }
      }
    } catch (e) {
      console.warn('Catbox upload fallback:', e);
    }

    // 2. Secondary fallback: Gofile
    if (!directUrl) {
      try {
        const gofileServersRes = await fetch('https://api.gofile.io/servers');
        const gofileServersData = await gofileServersRes.json();
        const server = gofileServersData?.data?.servers?.[0]?.name || 'store1';

        const gofileFormData = new FormData();
        gofileFormData.append('file', blob, filename);

        const gofileUploadRes = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
          method: 'POST',
          body: gofileFormData,
        });

        const gofileJson = await gofileUploadRes.json();
        if (gofileJson?.data?.downloadPage) {
          directUrl = gofileJson.data.downloadPage;
        }
      } catch (e) {
        console.warn('Gofile upload error:', e);
      }
    }

    // Cleanup temp file
    try {
      if (uploadedFile.filepath && fs.existsSync(uploadedFile.filepath)) {
        fs.unlinkSync(uploadedFile.filepath);
      }
    } catch (e) {}

    if (directUrl) {
      return res.status(200).json({
        success: true,
        url: directUrl,
        name: filename,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Could not upload image to storage.',
      });
    }
  } catch (err: any) {
    console.error('Upload endpoint error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Server error uploading file',
    });
  }
}
