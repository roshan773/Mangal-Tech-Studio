import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-evergreen/10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-evergreen tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-charcoal/60">
            Last Updated: November 2026 &bull; Mangal Tech Studio
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-refined p-6 sm:p-10 border border-evergreen/15 shadow-subtle space-y-8 text-sm text-charcoal/80 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">1. Agreement to Terms</h2>
            <p>
              By accessing our website or engaging Mangal Tech Studio for creative services, you agree to be bound by these Terms and Conditions. Mangal Tech Studio operates as an AI-assisted managed creative product photography service and is not an automated self-service SaaS tool.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">2. Scope of Services</h2>
            <p>
              Mangal Tech Studio transforms client-supplied digital product images into studio-style, lifestyle, and e-commerce visuals using human-directed artificial intelligence and manual retouching. We rely on the photographic clarity, angles, and lighting of the initial references provided by the client.
            </p>
            <p className="text-xs text-charcoal/70 bg-ivory p-3 rounded border border-evergreen/10">
              <strong>Important limitation:</strong> We cannot guarantee that our process can reconstruct or accurately invent micro-details, small print, or hidden sides that are absent or obscured in client-submitted source materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">3. Client Ownership & Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>You represent and warrant that you own or have obtained all necessary licenses, copyrights, and permissions for all product designs, trademarks, logos, and photographs you provide to us.</li>
              <li>Upon receipt of final payment, you receive a non-exclusive, worldwide, perpetual commercial usage license for all delivered final imagery.</li>
              <li>Mangal Tech Studio retains internal archival rights for project records and will not publicly exhibit your deliverables without mutual written agreement.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">4. Project Timelines & Revisions</h2>
            <p>
              Standard turnaround is 48 to 72 hours for Essential and Brand packages from the date reference materials are approved and deposit/payment is acknowledged. Delivery dates may adjust for complex custom campaign scopes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">5. Limitation of Liability</h2>
            <p>
              In no event shall Mangal Tech Studio be liable for indirect, incidental, or consequential damages resulting from the use or inability to use delivered image assets.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
