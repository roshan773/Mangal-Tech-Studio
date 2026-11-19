import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import formidable from 'formidable';
import fs from 'fs';

// Load .env.local for local server development
dotenv.config({ path: '.env.local' });

// Custom Vite plugin to handle /api/contact in local dev mode
function localApiPlugin() {
  return {
    name: 'local-api-contact-handler',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          try {
            const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
            if (!accessKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                message: 'WEB3FORMS_ACCESS_KEY is not defined in .env.local',
              }));
              return;
            }

            const form = formidable({
              multiples: true,
              maxFileSize: 10 * 1024 * 1024,
              keepExtensions: true,
            });

            form.parse(req, async (err, fields, files) => {
              if (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: err.message }));
                return;
              }

              const getVal = (v: any) => (Array.isArray(v) ? v[0] : v || '');
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

              const web3FormData = new FormData();
              web3FormData.append('access_key', accessKey);
              web3FormData.append('subject', `Project Enquiry: ${brandName} - ${fullName}`);
              web3FormData.append('from_name', 'Mangala Tech Studio');
              web3FormData.append('name', fullName);
              web3FormData.append('email', email);

              const formattedMessage = [
                `New Project Intake for Mangala Tech Studio:`,
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
              web3FormData.append('Brand Name', brandName);
              web3FormData.append('WhatsApp', whatsapp);
              web3FormData.append('Product Category', productCategory);

              // Attach files
              const fileList: formidable.File[] = [];
              Object.values(files).forEach((fileEntry) => {
                if (Array.isArray(fileEntry)) fileList.push(...fileEntry);
                else if (fileEntry) fileList.push(fileEntry);
              });

              for (let i = 0; i < fileList.length; i++) {
                const item = fileList[i];
                if (item.filepath && fs.existsSync(item.filepath)) {
                  const fileBuffer = fs.readFileSync(item.filepath);
                  const blob = new Blob([fileBuffer], { type: item.mimetype || 'image/jpeg' });
                  const fieldName = i === 0 ? 'attachment' : `attachment_${i + 1}`;
                  web3FormData.append(fieldName, blob, item.originalFilename || `image_${i + 1}.jpg`);
                }
              }

              try {
                const response = await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  body: web3FormData,
                  headers: {
                    Accept: 'application/json',
                  },
                });

                const data = await response.json();

                // Clean temp files
                fileList.forEach(item => {
                  try {
                    if (item.filepath && fs.existsSync(item.filepath)) fs.unlinkSync(item.filepath);
                  } catch (e) {}
                });

                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (networkErr: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: networkErr.message }));
              }
            });
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e.message }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
