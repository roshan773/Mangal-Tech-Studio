import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 60,
  },
};

// Handle individual image upload one-by-one
// Individual files are small (~2-4MB each), well within Vercel's 4.5MB per-request limit!
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 25 * 1024 * 1024,
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
    const blob = new Blob([fileBuffer], { type: uploadedFile.mimetype || 'image/jpeg' });
    const filename = uploadedFile.originalFilename || 'product_photo.jpg';

    // 1. Upload to Catbox
    let directUrl: string | null = null;
    try {
      const catboxData = new FormData();
      catboxData.append('reqtype', 'fileupload');
      catboxData.append('fileToUpload', blob, filename);

      const catboxRes = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: catboxData,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MangalTechStudio/1.0',
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

    // 2. Fallback to tmpfiles if catbox fails
    if (!directUrl) {
      try {
        const tmpData = new FormData();
        tmpData.append('file', blob, filename);

        const tmpRes = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: tmpData,
        });

        if (tmpRes.ok) {
          const json = await tmpRes.json();
          if (json?.data?.url) {
            // Convert to direct downloadable link
            directUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          }
        }
      } catch (e) {
        console.warn('Tmpfiles upload error:', e);
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
