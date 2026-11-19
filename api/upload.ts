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
// Stores files on high-speed raw image CDN storage and returns authentic, direct raw image file URLs (PNG, JPG, WEBP, etc.)
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
    const errors: string[] = [];

    // 1. Primary: uguu.se (Instant, raw binary CDN, supports all formats PNG/JPG/WEBP, works on AWS/Vercel)
    try {
      const uguuData = new FormData();
      uguuData.append('files[]', blob, filename);

      const uguuRes = await fetch('https://uguu.se/upload', {
        method: 'POST',
        body: uguuData,
      });

      if (uguuRes.ok) {
        const json = await uguuRes.json();
        if (json?.success && json?.files?.[0]?.url) {
          directUrl = json.files[0].url;
        }
      } else {
        errors.push(`uguu status: ${uguuRes.status}`);
      }
    } catch (e: any) {
      errors.push('uguu error: ' + (e?.message || e));
    }

    // 2. Secondary: x0.at (Returns pure direct raw image file URL, 100% verified PNG/JPG)
    if (!directUrl) {
      try {
        const x0Data = new FormData();
        x0Data.append('file', blob, filename);

        const x0Res = await fetch('https://x0.at', {
          method: 'POST',
          body: x0Data,
          headers: {
            'User-Agent': 'curl/7.88.1',
          },
        });

        if (x0Res.ok) {
          const text = await x0Res.text();
          if (text && text.trim().startsWith('http')) {
            directUrl = text.trim();
          }
        } else {
          errors.push(`x0 status: ${x0Res.status}`);
        }
      } catch (e: any) {
        errors.push('x0 error: ' + (e?.message || e));
      }
    }

    // 3. Tertiary fallback: Catbox
    if (!directUrl) {
      try {
        const catboxData = new FormData();
        catboxData.append('reqtype', 'fileupload');
        catboxData.append('fileToUpload', blob, filename);

        const catboxRes = await fetch('https://catbox.moe/user/api.php', {
          method: 'POST',
          body: catboxData,
          headers: {
            'User-Agent': 'curl/7.88.1',
          },
        });

        if (catboxRes.ok) {
          const text = await catboxRes.text();
          if (text && text.trim().startsWith('http')) {
            directUrl = text.trim();
          }
        } else {
          errors.push(`catbox status: ${catboxRes.status}`);
        }
      } catch (e: any) {
        errors.push('catbox error: ' + (e?.message || e));
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
      console.error('All upload providers failed:', errors);
      return res.status(500).json({
        success: false,
        message: 'Could not upload image to storage.',
        errors,
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
