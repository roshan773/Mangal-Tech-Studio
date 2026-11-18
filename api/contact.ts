import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';

// Disable default Vercel body parser to handle multipart streams
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: upload image file to cloud storage so it can be previewed/downloaded directly from email
async function uploadToCloud(file: formidable.File): Promise<string | null> {
  try {
    if (!file.filepath || !fs.existsSync(file.filepath)) return null;
    const fileBuffer = fs.readFileSync(file.filepath);
    const blob = new Blob([fileBuffer], { type: file.mimetype || 'image/jpeg' });
    
    const uploadData = new FormData();
    uploadData.append('reqtype', 'fileupload');
    uploadData.append('fileToUpload', blob, file.originalFilename || 'product_photo.jpg');

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: uploadData,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MangalTechStudio/1.0',
      },
    });

    if (res.ok) {
      const url = await res.text();
      if (url && url.startsWith('http')) {
        return url.trim();
      }
    }
  } catch (err) {
    console.error('Error uploading file to storage:', err);
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are permitted.',
    });
  }

  // Load environment variable strictly server-side
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('Server Configuration Error: WEB3FORMS_ACCESS_KEY is missing from environment.');
    return res.status(500).json({
      success: false,
      message: 'Server error: Contact service is not currently configured.',
    });
  }

  const form = formidable({
    multiples: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB per file
    maxFiles: 10,
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    const getVal = (val: string | string[] | undefined): string => {
      if (Array.isArray(val)) return val[0] || '';
      return val || '';
    };

    const fullName = getVal(fields.fullName);
    const brandName = getVal(fields.brandName);
    const email = getVal(fields.email);
    const whatsapp = getVal(fields.whatsapp);
    const productCategory = getVal(fields.productCategory);
    const productCount = getVal(fields.productCount);
    const preferredStyle = getVal(fields.preferredStyle);
    const projectBudget = getVal(fields.projectBudget);
    const imagesRequired = getVal(fields.imagesRequired);
    const creativeInstructions = getVal(fields.creativeInstructions);

    // Server-side validation
    if (!fullName || !email || !brandName || !whatsapp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: Full Name, Brand Name, Email, and WhatsApp are required.',
      });
    }

    // Collect all uploaded files
    const fileList: formidable.File[] = [];
    Object.values(files).forEach((fileEntry) => {
      if (Array.isArray(fileEntry)) {
        fileList.push(...fileEntry);
      } else if (fileEntry) {
        fileList.push(fileEntry);
      }
    });

    // Upload user reference images to high-speed cloud storage
    // so they are delivered directly in the email as clickable, permanent high-res preview links!
    const uploadedImageLinks: { name: string; url: string }[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const link = await uploadToCloud(file);
      if (link) {
        uploadedImageLinks.push({
          name: file.originalFilename || `Image_${i + 1}`,
          url: link,
        });
      }
    }

    // Prepare Web3Forms payload
    const web3FormData = new FormData();
    web3FormData.append('access_key', accessKey);
    web3FormData.append('subject', `📸 New Project Enquiry: ${brandName} (${fullName})`);
    web3FormData.append('from_name', 'Mangal Tech Studio');
    web3FormData.append('name', fullName);
    web3FormData.append('email', email);

    // Format rich email message with all project details AND direct clickable image links
    const lines = [
      `NEW PROJECT INTAKE - MANGAL TECH STUDIO`,
      `=========================================`,
      ``,
      `👤 CLIENT INFORMATION`,
      `• Full Name: ${fullName}`,
      `• Brand / Business: ${brandName}`,
      `• Email Address: ${email}`,
      `• WhatsApp Number: ${whatsapp}`,
      ``,
      `🎨 PROJECT SPECIFICATIONS`,
      `• Product Category: ${productCategory}`,
      `• Number of Products / SKUs: ${productCount}`,
      `• Preferred Style: ${preferredStyle}`,
      `• Selected Budget / Tier: ${projectBudget}`,
      `• Estimated Images Required: ${imagesRequired}`,
      ``,
      `📝 CREATIVE INSTRUCTIONS & NOTES:`,
      `${creativeInstructions ? creativeInstructions : 'None provided'}`,
      ``,
      `🖼️ UPLOADED ORIGINAL PRODUCT PHOTOGRAPHS (${uploadedImageLinks.length} Files):`,
      `--------------------------------------------------`,
    ];

    if (uploadedImageLinks.length > 0) {
      uploadedImageLinks.forEach((img, idx) => {
        lines.push(`[${idx + 1}] ${img.name}:`);
        lines.push(`    👉 ${img.url}`);
        lines.push(``);
      });
      lines.push(`Click the links above to view or download full-resolution client references.`);
    } else {
      lines.push(`No photo references were uploaded.`);
    }

    lines.push(``);
    lines.push(`=========================================`);

    web3FormData.append('message', lines.join('\n'));

    // Also populate dashboard columns
    web3FormData.append('Brand Name', brandName);
    web3FormData.append('WhatsApp', whatsapp);
    web3FormData.append('Category', productCategory);
    web3FormData.append('Budget', projectBudget);
    if (uploadedImageLinks.length > 0) {
      web3FormData.append('Uploaded References', uploadedImageLinks.map(l => l.url).join(' , '));
    }

    // Submit to Web3Forms official API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const result = await response.json().catch(() => ({}));

    // Clean up temporary files on disk
    fileList.forEach((item) => {
      try {
        if (item.filepath && fs.existsSync(item.filepath)) {
          fs.unlinkSync(item.filepath);
        }
      } catch (e) {
        // ignore cleanup error
      }
    });

    if (response.ok && result.success) {
      return res.status(200).json({
        success: true,
        message: 'Submission received successfully.',
      });
    } else {
      console.error('Web3Forms returned failure response:', result);
      return res.status(response.status || 400).json({
        success: false,
        message: result.message || 'Failed to submit enquiry. Please verify your details and try again.',
      });
    }
  } catch (error: any) {
    console.error('Server error processing enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing enquiry: ' + (error?.message || 'Unknown error'),
    });
  }
}
