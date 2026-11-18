import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-evergreen/10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper">
            <Lock className="w-3.5 h-3.5" />
            <span>Legal & Data Protection</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-evergreen tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal/60">
            Last Updated: November 2026 &bull; Mangal Tech Studio
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-refined p-6 sm:p-10 border border-evergreen/15 shadow-subtle space-y-8 text-sm text-charcoal/80 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">1. Introduction</h2>
            <p>
              At Mangal Tech Studio ("we", "our", or "us"), we value and respect your privacy. This Privacy Policy outlines how we collect, handle, store, and protect your personal information and product reference materials when you interact with our website or submit an enquiry for our managed creative photography services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">2. Information We Collect</h2>
            <p>When you fill out our project enquiry form, we collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Contact Information:</strong> Full name, business or brand name, email address, and WhatsApp contact number.</li>
              <li><strong>Project Details:</strong> Product category, estimated number of products, preferred styling aesthetics, project budget, and specific creative instructions.</li>
              <li><strong>Product Photographs & Reference Files:</strong> Original digital photographs, packaging artwork, or reference images uploaded through our secure file submission interface.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">3. How Your Product Photographs Are Used</h2>
            <p>
              We collect your product photographs solely for the purpose of assessing your project requirements, communicating creative proposals, and executing the requested AI-assisted photography production and manual retouching.
            </p>
            <div className="bg-ivory/60 p-4 rounded border-l-4 border-copper text-xs space-y-1">
              <strong className="text-evergreen block">Strict Portfolio Privacy Commitment:</strong>
              <p>
                Customer-uploaded product photographs and final project deliverables are <strong>never</strong> published on our website, social media, or public portfolio without your explicit prior written consent. Demonstration items shown on our public portfolio are proprietary studio concept projects.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">4. Role of AI in Creative Processing</h2>
            <p>
              As a managed creative service, we utilize proprietary AI-assisted staging workflows combined with professional human art direction. We do not sell, license, or submit your proprietary product photographs to public third-party model training datasets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">5. Data Retention & Security</h2>
            <p>
              We retain submitted contact details and project asset files only for the period necessary to complete your project, provide customer support, and maintain project archives for agreed revision rounds. We employ industry-standard encryption protocols (TLS/HTTPS) for all file transmissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">6. Third-Party Integrations</h2>
            <p>
              Enquiry submissions and initial attachments are routed securely through Web3Forms API to our creative review team. Web3Forms operates in compliance with strict data transfer standards and acts solely as a secure transmission processor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">7. Contact Regarding Privacy</h2>
            <p>
              If you have any questions regarding your personal information, wish to request deletion of your uploaded reference photos, or need data clarification, please contact our privacy desk at: <a href="mailto:hello@mangaltechstudio.com" className="text-copper underline font-medium">hello@mangaltechstudio.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
