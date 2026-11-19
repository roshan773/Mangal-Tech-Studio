# Mangala Tech Studio – Premium AI-Assisted Product Photography

A modern, high-converting managed creative photography studio web application built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Vercel Serverless Functions**.

---

## 🌟 Brand & Technology Overview

- **Business Model:** AI-Assisted Product Photography as a Managed Creative Service (not self-service AI generation SaaS).
- **Brand Palette:**
  - **Deep Evergreen** (`#123B32`): Primary branding, header, dark accents.
  - **Warm Ivory** (`#F4F0E6`): Background & editorial warmth.
  - **Muted Copper** (`#C47A4A`): Accent buttons, badges, highlights.
  - **Charcoal** (`#252820`): High-legibility body typography.
  - **White** (`#FFFFFF`): Cards and high-contrast containers.
- **Typography:** Plus Jakarta Sans (Headings) & Inter (Body UI).

---

## 🚀 Key Features

1. **Interactive Before & After Comparison:** Custom touch- and drag-enabled slider showcasing genuine raw product shot improvements.
2. **Curated Showcase Portfolio:** Multi-category filtering (Skincare, Beauty, Jewellery, Fashion, Home Décor, Lifestyle, Food) with high-res modal inspect & before/after modes.
3. **Comprehensive Creative Services:** In-depth pages for Studio, Lifestyle, E-commerce (#FFFFFF catalog), Product Detail (Macro), Social Media Packs, and Custom Campaigns.
4. **Transparent Pricing Tiers:** Clear packages for Essential (₹1,499), Brand (₹2,499), Growth (₹4,499), and Custom Campaigns (₹6,999+) with package pre-selection across pages.
5. **Production Contact & Intake Form:**
   - Drag-and-drop & browse file uploads for up to 10 photos (up to 10MB each).
   - Real-time client-side format & size validation.
   - Individual preview cards with file names, sizes, and instant removal.
   - Exact client-facing success state: *"Thank you for contacting Mangala Tech Studio! We've received your enquiry and will get back to you soon."*
6. **Secure Server-Side Web3Forms Integration (`api/contact.ts`):**
   - Access key is strictly stored server-side via `process.env.WEB3FORMS_ACCESS_KEY`.
   - Never bundled into frontend JavaScript or exposed in browser responses.
   - Handles multi-part attachments and forwards directly to the official Web3Forms API.
7. **Legal & Transparency Framework:** Dedicated Privacy Policy, Terms & Conditions, and Refund & Revision policies clarifying customer asset confidentiality and human art direction.

---

## 🛠️ Local Development

### 1. Environment Setup

Create a `.env.local` file in the project root:
```env
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```
*(Reference `.env.example` for details)*

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The app runs at `http://localhost:3000` with local `/api/contact` serverless endpoint emulation enabled.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment to Vercel

1. Push this repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. In **Project Settings** → **Environment Variables**, add:
   - **Key:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** `your_web3forms_access_key`
4. Deploy. Vercel automatically deploys the frontend and the serverless API at `/api/contact`.
