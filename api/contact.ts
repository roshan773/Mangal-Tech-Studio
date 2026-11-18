import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel Serverless Function Config for multi-part parsing / limits
export const config = {
  api: {
    bodyParser: false, // Disabling body parser for raw multipart streaming or using standard parser
  },
};

// We will implement an endpoint that safely accepts JSON or FormData, reads process.env.WEB3FORMS_ACCESS_KEY,
// and forwards to Web3Forms API: https://api.web3forms.com/submit
// Crucially: Web3Forms access key is never revealed to client browser.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are accepted.',
    });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error('Server Configuration Error: WEB3FORMS_ACCESS_KEY is not defined in environment variables.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Contact submission service is not currently configured.',
    });
  }

  try {
    const contentType = req.headers['content-type'] || '';

    // If request is standard multipart/form-data, we forward to Web3Forms using standard fetch & FormData
    // Since Node 18+, native FormData and fetch are available in Node.js
    let web3FormData = new FormData();
    web3FormData.append('access_key', accessKey);
    web3FormData.append('from_name', 'Mangal Tech Studio Enquiry');
    web3FormData.append('subject', 'New Project Intake - Mangal Tech Studio');

    // Parse incoming data
    // In standard Vercel environment or development express/vite proxy:
    // If incoming body is parsed or stream:
    if (contentType.includes('application/json')) {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      for (const key in body) {
        if (key !== 'access_key') {
          web3FormData.append(key, body[key]);
        }
      }
    } else {
      // Forward form entries
      // Note: Node's standard request handling
      // When deployed on Vercel with body parser disabled or enabled:
      const rawBody = req.body;
      if (rawBody && typeof rawBody === 'object') {
        for (const [key, val] of Object.entries(rawBody)) {
          if (key !== 'access_key') {
            if (val instanceof Blob || typeof val === 'string') {
              web3FormData.append(key, val as any);
            } else {
              web3FormData.append(key, String(val));
            }
          }
        }
      }
    }

    // Call official Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return res.status(200).json({
        success: true,
        message: 'Submission received successfully.',
      });
    } else {
      console.error('Web3Forms returned error:', data);
      return res.status(response.status || 400).json({
        success: false,
        message: data.message || 'Error occurred while submitting form to service.',
      });
    }
  } catch (error: any) {
    console.error('Server error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing enquiry.',
    });
  }
}
