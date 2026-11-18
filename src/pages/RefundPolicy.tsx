import React from 'react';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-evergreen/10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Client Satisfaction Framework</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-evergreen tracking-tight">
            Refund & Revision Policy
          </h1>
          <p className="text-xs text-charcoal/60">
            Last Updated: November 2026 &bull; Mangal Tech Studio
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-refined p-6 sm:p-10 border border-evergreen/15 shadow-subtle space-y-8 text-sm text-charcoal/80 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">1. Creative Nature of Service</h2>
            <p>
              Mangal Tech Studio delivers bespoke creative design, rendering, and manual retouching labor. Because substantial hours of manual artist direction and computational resources are dedicated from the moment a project commences, digital services are generally non-refundable once production work has begun.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">2. Revision Framework</h2>
            <p>
              We are dedicated to ensuring your complete satisfaction with every delivered image. Our pricing tiers include dedicated revision rounds to dial in the creative direction:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Essential Package:</strong> 1 full round of creative revisions.</li>
              <li><strong>Brand Package:</strong> 1 full round of creative revisions.</li>
              <li><strong>Growth Package:</strong> 2 full rounds of creative revisions.</li>
              <li><strong>Custom Campaigns:</strong> Iterative preview milestones established in your scope of work.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">3. What is Covered in Revisions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-ivory rounded border border-evergreen/10">
                <span className="font-bold text-evergreen block mb-1">Included in Revision Scope:</span>
                <ul className="space-y-1 text-charcoal/70">
                  <li>&bull; Background color grade and mood adjustments</li>
                  <li>&bull; Pedestal & surface material changes</li>
                  <li>&bull; Shadow depth & lighting intensity tweaks</li>
                  <li>&bull; Crop & framing adjustments</li>
                </ul>
              </div>
              <div className="p-3 bg-ivory rounded border border-evergreen/10">
                <span className="font-bold text-evergreen block mb-1">Excluded (Requires Extra Scope):</span>
                <ul className="space-y-1 text-charcoal/70">
                  <li>&bull; Supplying entirely different physical products</li>
                  <li>&bull; Radical brief alterations post final rendering</li>
                  <li>&bull; Changes due to new physical packaging changes</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-evergreen">4. Cancellation & Refund Eligibility</h2>
            <p>
              If a project is cancelled prior to our creative team commencing concept generation and file preparation, a full refund less any third-party payment gateway transaction fees will be provided. In the rare scenario that our team is unable to fulfill a project scope due to technical incompatibility, a full 100% refund will be issued promptly.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
