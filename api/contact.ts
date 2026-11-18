import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Vercel serverless configuration
export const config = {
  api: {
    bodyParser: false,
    maxDuration: 60,
  },
};

// Upload helper for cloud links
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
    console.error('Cloud storage upload error:', err);
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are permitted.',
    });
  }

  const form = formidable({
    multiples: true,
    maxFileSize: 10 * 1024 * 1024,
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

    if (!fullName || !email || !brandName || !whatsapp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: Full Name, Brand Name, Email, and WhatsApp are required.',
      });
    }

    // Collect all uploaded file objects
    const fileList: formidable.File[] = [];
    Object.values(files).forEach((fileEntry) => {
      if (Array.isArray(fileEntry)) {
        fileList.push(...fileEntry);
      } else if (fileEntry) {
        fileList.push(fileEntry);
      }
    });

    // 1. Prepare raw email attachments (for direct file attachment in inbox)
    const emailAttachments = fileList.map((file) => ({
      filename: file.originalFilename || 'product_photo.jpg',
      content: fs.readFileSync(file.filepath),
      contentType: file.mimetype || 'image/jpeg',
    }));

    // 2. Also upload to cloud storage for one-click clickable links in email body
    const uploadedLinks: { name: string; url: string }[] = [];
    for (const file of fileList) {
      const link = await uploadToCloud(file);
      if (link) {
        uploadedLinks.push({
          name: file.originalFilename || 'Photo',
          url: link,
        });
      }
    }

    // Prepare email contents
    const emailSubject = `📸 New Project Enquiry: ${brandName} (${fullName})`;
    
    // HTML Email Body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #252820; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #123B32; padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px;">Mangal Tech Studio – New Project Intake</h2>
          <p style="margin: 4px 0 0; color: #C47A4A; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">AI Product Photography Enquiry</p>
        </div>
        
        <div style="padding: 24px;">
          <h3 style="color: #123B32; border-bottom: 2px solid #F4F0E6; padding-bottom: 8px; margin-top: 0;">Client Details</h3>
          <table style="width: 100%; font-size: 14px; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; width: 160px; color: #64748b;"><strong>Full Name:</strong></td><td>${fullName}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Brand Name:</strong></td><td><strong>${brandName}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Email Address:</strong></td><td><a href="mailto:${email}" style="color: #C47A4A;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>WhatsApp:</strong></td><td><a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #123B32;">${whatsapp}</a></td></tr>
          </table>

          <h3 style="color: #123B32; border-bottom: 2px solid #F4F0E6; padding-bottom: 8px;">Project Specifications</h3>
          <table style="width: 100%; font-size: 14px; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; width: 160px; color: #64748b;"><strong>Category:</strong></td><td>${productCategory}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Product Count:</strong></td><td>${productCount}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Preferred Style:</strong></td><td>${preferredStyle}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Budget / Package:</strong></td><td><span style="background: #123B32; color: #ffffff; padding: 2px 8px; border-radius: 4px;">${projectBudget}</span></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Images Required:</strong></td><td>${imagesRequired}</td></tr>
          </table>

          <h3 style="color: #123B32; border-bottom: 2px solid #F4F0E6; padding-bottom: 8px;">Creative Instructions</h3>
          <p style="background: #F4F0E6; padding: 12px; border-radius: 6px; font-size: 14px; margin: 0 0 20px;">
            ${creativeInstructions || 'No specific creative instructions provided.'}
          </p>

          <h3 style="color: #123B32; border-bottom: 2px solid #F4F0E6; padding-bottom: 8px;">
            Uploaded Photos (${fileList.length} Files Attached)
          </h3>
          ${
            uploadedLinks.length > 0
              ? `
                <div style="margin-top: 12px;">
                  <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Direct links to view full-resolution references in browser:</p>
                  <ul style="padding-left: 20px; margin: 0; font-size: 14px;">
                    ${uploadedLinks
                      .map(
                        (l, idx) => `
                      <li style="margin-bottom: 8px;">
                        <strong>[${idx + 1}] ${l.name}:</strong> 
                        <a href="${l.url}" target="_blank" style="color: #C47A4A; font-weight: bold; text-decoration: underline;">View & Download Image</a>
                      </li>`
                      )
                      .join('')}
                  </ul>
                </div>
              `
              : `<p style="font-size: 14px; color: #64748b;">No photos uploaded.</p>`
          }
        </div>
      </div>
    `;

    // Plain text fallback
    const plainTextBody = [
      `NEW PROJECT INTAKE - MANGAL TECH STUDIO`,
      `-----------------------------------------`,
      `Client Name: ${fullName}`,
      `Brand Name: ${brandName}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Category: ${productCategory}`,
      `Products: ${productCount}`,
      `Style: ${preferredStyle}`,
      `Budget: ${projectBudget}`,
      `Images Required: ${imagesRequired}`,
      ``,
      `Creative Notes:`,
      `${creativeInstructions || 'None provided'}`,
      ``,
      `Uploaded Images (${uploadedLinks.length} Files):`,
      ...uploadedLinks.map((l, i) => `[${i + 1}] ${l.name}: ${l.url}`),
    ].join('\n');

    let deliverySucceeded = false;

    // METHOD A: DIRECT SMTP / GMAIL / ZOHO (Attaches actual image files directly to the email!)
    // If SMTP_USER & SMTP_PASS (e.g. Gmail App Password) are provided in Vercel
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE !== 'false',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;

        await transporter.sendMail({
          from: `"Mangal Tech Studio" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: email,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
          attachments: emailAttachments, // Physical file attachments in inbox!
        });

        deliverySucceeded = true;
      } catch (smtpErr) {
        console.error('SMTP delivery failed, falling back:', smtpErr);
      }
    }

    // METHOD B: RESEND API (Supports up to 40MB of direct file attachments!)
    // If RESEND_API_KEY is configured in Vercel
    if (!deliverySucceeded && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const targetEmail = process.env.NOTIFICATION_EMAIL || 'pakhreroshan@gmail.com';

        await resend.emails.send({
          from: 'Mangal Tech Studio <onboarding@resend.dev>',
          to: targetEmail,
          replyTo: email,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
          attachments: emailAttachments.map((a) => ({
            filename: a.filename,
            content: a.content,
          })),
        });

        deliverySucceeded = true;
      } catch (resendErr) {
        console.error('Resend delivery failed, falling back:', resendErr);
      }
    }

    // METHOD C: WEB3FORMS (Always active fallback with links embedded in message)
    if (!deliverySucceeded) {
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error('WEB3FORMS_ACCESS_KEY is not defined.');
      }

      const web3FormData = new FormData();
      web3FormData.append('access_key', accessKey);
      web3FormData.append('subject', emailSubject);
      web3FormData.append('from_name', 'Mangal Tech Studio');
      web3FormData.append('name', fullName);
      web3FormData.append('email', email);
      web3FormData.append('message', plainTextBody);
      web3FormData.append('Brand Name', brandName);
      web3FormData.append('WhatsApp', whatsapp);
      web3FormData.append('Category', productCategory);

      // Add each image link as a prominent custom field in the email
      uploadedLinks.forEach((img, i) => {
        web3FormData.append(`📷 Product Photo ${i + 1}`, `${img.name}: ${img.url}`);
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        deliverySucceeded = true;
      } else {
        throw new Error(result.message || 'Web3Forms failed to process submission.');
      }
    }

    // Cleanup local temp files
    fileList.forEach((item) => {
      try {
        if (item.filepath && fs.existsSync(item.filepath)) {
          fs.unlinkSync(item.filepath);
        }
      } catch (e) {}
    });

    if (deliverySucceeded) {
      return res.status(200).json({
        success: true,
        message: 'Submission received successfully.',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to deliver email. Please check server logs.',
      });
    }
  } catch (error: any) {
    console.error('Server error handling submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error: ' + (error?.message || 'Unknown error'),
    });
  }
}
