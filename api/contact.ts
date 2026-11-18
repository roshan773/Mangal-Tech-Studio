import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable default Vercel body parser to handle multipart streams
export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // Extract first value helper
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

    // Prepare Web3Forms payload
    const web3FormData = new FormData();
    web3FormData.append('access_key', accessKey);
    web3FormData.append('subject', `Project Enquiry: ${brandName} - ${fullName}`);
    web3FormData.append('from_name', 'Mangal Tech Studio');
    web3FormData.append('name', fullName);
    web3FormData.append('email', email);

    // Format message body
    const formattedMessage = [
      `New Project Intake for Mangal Tech Studio:`,
      `-----------------------------------------`,
      `Full Name: ${fullName}`,
      `Brand / Business: ${brandName}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Product Category: ${productCategory}`,
      `Number of Products: ${productCount}`,
      `Preferred Style: ${preferredStyle}`,
      `Project Budget: ${projectBudget}`,
      `Images Required: ${imagesRequired}`,
      `Creative Instructions:`,
      `${creativeInstructions || 'None provided'}`,
    ].join('\n');

    web3FormData.append('message', formattedMessage);

    // Add extra metadata fields for Web3Forms dashboard
    web3FormData.append('Brand Name', brandName);
    web3FormData.append('WhatsApp', whatsapp);
    web3FormData.append('Product Category', productCategory);
    web3FormData.append('Budget', projectBudget);
    web3FormData.append('Images Required', imagesRequired);

    // Attach uploaded files according to Web3Forms documentation
    // In Web3Forms, file attachment keys can be named 'attachment' or numbered 'attachment_1', 'attachment_2', etc.
    const fileList: formidable.File[] = [];
    Object.values(files).forEach((fileEntry) => {
      if (Array.isArray(fileEntry)) {
        fileList.push(...fileEntry);
      } else if (fileEntry) {
        fileList.push(fileEntry);
      }
    });

    for (let i = 0; i < fileList.length; i++) {
      const item = fileList[i];
      if (item.filepath && fs.existsSync(item.filepath)) {
        const fileBuffer = fs.readFileSync(item.filepath);
        const blob = new Blob([fileBuffer], { type: item.mimetype || 'image/jpeg' });
        // Web3Forms supports 'attachment' field for files
        const fieldName = i === 0 ? 'attachment' : `attachment_${i + 1}`;
        web3FormData.append(fieldName, blob, item.originalFilename || `image_${i + 1}.jpg`);
      }
    }

    // Submit to Web3Forms official API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
      headers: {
        Accept: 'application/json',
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
