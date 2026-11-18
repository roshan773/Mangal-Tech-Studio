import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Helper: read raw body if request is sent as stream/json
async function getRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are permitted.',
    });
  }

  try {
    const contentType = req.headers['content-type'] || '';
    let fields: Record<string, any> = {};
    let imageLinks: { name: string; url: string }[] = [];
    let fileAttachments: { filename: string; content: Buffer; contentType: string }[] = [];

    if (contentType.includes('application/json')) {
      // 1. JSON Payload: Lightweight & never blocked by Vercel 4.5MB ceiling
      let rawJson = req.body;
      if (typeof rawJson === 'string') {
        try {
          rawJson = JSON.parse(rawJson);
        } catch (e) {}
      } else if (!rawJson || Object.keys(rawJson).length === 0) {
        const text = await getRawBody(req);
        try {
          rawJson = JSON.parse(text);
        } catch (e) {}
      }

      fields = rawJson || {};
      if (Array.isArray(fields.imageLinks)) {
        imageLinks = fields.imageLinks;
      }
    } else {
      // 2. Fallback Multipart Form Parsing
      const form = formidable({
        multiples: true,
        maxFileSize: 10 * 1024 * 1024,
        maxFiles: 10,
        keepExtensions: true,
      });

      const parsed = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
        (resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
          });
        }
      );

      const getVal = (v: any) => (Array.isArray(v) ? v[0] : v || '');
      Object.keys(parsed.fields).forEach((k) => {
        fields[k] = getVal(parsed.fields[k]);
      });

      // Handle raw files
      const rawFiles: formidable.File[] = [];
      Object.values(parsed.files).forEach((entry) => {
        if (Array.isArray(entry)) rawFiles.push(...entry);
        else if (entry) rawFiles.push(entry);
      });

      for (const f of rawFiles) {
        if (f.filepath && fs.existsSync(f.filepath)) {
          fileAttachments.push({
            filename: f.originalFilename || 'photo.jpg',
            content: fs.readFileSync(f.filepath),
            contentType: f.mimetype || 'image/jpeg',
          });
        }
      }
    }

    const fullName = fields.fullName || '';
    const brandName = fields.brandName || '';
    const email = fields.email || '';
    const whatsapp = fields.whatsapp || '';
    const productCategory = fields.productCategory || 'General Product';
    const productCount = fields.productCount || '1 Product';
    const preferredStyle = fields.preferredStyle || 'Studio';
    const projectBudget = fields.projectBudget || '₹2,499';
    const imagesRequired = fields.imagesRequired || '10 Images';
    const creativeInstructions = fields.creativeInstructions || '';

    if (!fullName || !email || !brandName || !whatsapp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: Full Name, Brand Name, Email, and WhatsApp are required.',
      });
    }

    const emailSubject = `📸 New Project Enquiry: ${brandName} (${fullName})`;

    // HTML Email
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
            Uploaded Photos (${imageLinks.length > 0 ? imageLinks.length : fileAttachments.length} Files)
          </h3>
          ${
            imageLinks.length > 0
              ? `
                <div style="margin-top: 12px;">
                  <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Direct links to view full-resolution references in browser:</p>
                  <ul style="padding-left: 20px; margin: 0; font-size: 14px;">
                    ${imageLinks
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
              : `<p style="font-size: 14px; color: #64748b;">${fileAttachments.length > 0 ? 'Files attached to this email.' : 'No photos uploaded.'}</p>`
          }
        </div>
      </div>
    `;

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
      `Uploaded Images (${imageLinks.length} Files):`,
      ...imageLinks.map((l, i) => `[${i + 1}] ${l.name}: ${l.url}`),
    ].join('\n');

    let deliverySucceeded = false;

    // 1. TRY RESEND (Direct file attachment or email with links)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const targetEmail = process.env.NOTIFICATION_EMAIL || 'pakhreroshan@gmail.com';

        const resendPayload: any = {
          from: 'Mangal Tech Studio <onboarding@resend.dev>',
          to: targetEmail,
          replyTo: email,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
        };

        if (fileAttachments.length > 0) {
          resendPayload.attachments = fileAttachments;
        }

        const resendResult = await resend.emails.send(resendPayload);

        if (!resendResult.error) {
          deliverySucceeded = true;
        } else {
          console.warn('Resend failed, falling back:', resendResult.error);
        }
      } catch (e) {
        console.warn('Resend exception, falling back:', e);
      }
    }

    // 2. TRY SMTP (Gmail / Zoho)
    if (!deliverySucceeded && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
          attachments: fileAttachments,
        });

        deliverySucceeded = true;
      } catch (e) {
        console.warn('SMTP fallback error:', e);
      }
    }

    // 3. TRY WEB3FORMS (Always reliable, embeds direct image links)
    if (!deliverySucceeded) {
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
      if (accessKey) {
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

        imageLinks.forEach((img, i) => {
          web3FormData.append(`📷 Photo ${i + 1}`, `${img.name}: ${img.url}`);
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
        }
      }
    }

    if (deliverySucceeded) {
      return res.status(200).json({
        success: true,
        message: 'Submission received successfully.',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to deliver notification. Please try again or email us directly.',
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
