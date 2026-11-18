import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Layers, Sliders, Check } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Button } from '@/components/common/Button';

export const Services: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-evergreen/10 text-evergreen text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>Creative Studio Capabilities</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-evergreen tracking-tight">
            Our Photography Services
          </h1>
          <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
            Professional AI-assisted product photography engineered for growing brands. We merge state-of-the-art computational rendering with human art direction to deliver commercial-grade imagery without traditional studio complexity.
          </p>
        </div>

        {/* AI Transparency & Quality Commitment Box */}
        <div className="mb-16 bg-white border border-evergreen/15 rounded-refined p-6 sm:p-8 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-copper font-heading font-bold text-base">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Our Commitment to Transparency & Accuracy</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            <div>
              <p>
                <strong>AI-Assisted, Human Perfected:</strong> We use artificial intelligence as an advanced staging and rendering engine, but every image is directed, color-corrected, and inspected by senior digital retouchers.
              </p>
            </div>
            <div>
              <p>
                <strong>Uncompromised Product Identity:</strong> We never promise that AI can hallucinate or accurately guess product details that aren't visible in your input reference photos. We preserve original product shapes, exact brand logos, typography, colors, and container proportions without distortion.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Service Sections */}
        <div className="space-y-16">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.id}
                className="scroll-mt-28 bg-white rounded-refined border border-evergreen/10 shadow-subtle overflow-hidden p-6 sm:p-10"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Presentation */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-refined overflow-hidden border border-evergreen/10 aspect-[4/3] group shadow-sm bg-ivory">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-evergreen/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                        Service #{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Text Specifications */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-copper font-bold">
                        Creative Service
                      </span>
                      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-evergreen tracking-tight mt-1">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-sm text-charcoal/80 leading-relaxed font-normal">
                      {service.fullDescription}
                    </p>

                    {/* Suitable categories */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-evergreen uppercase tracking-wider block">
                        Best Suited For:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.categories.map((cat) => (
                          <span
                            key={cat}
                            className="bg-ivory text-charcoal/80 text-xs px-2.5 py-1 rounded border border-evergreen/10"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Two-column features & deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-ivory/50 p-3.5 rounded border border-evergreen/10">
                        <span className="text-xs font-bold text-evergreen uppercase tracking-wider block mb-2">
                          Standard Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-charcoal/80">
                          {service.deliverables.map((del) => (
                            <li key={del} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-copper shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-ivory/50 p-3.5 rounded border border-evergreen/10">
                        <span className="text-xs font-bold text-evergreen uppercase tracking-wider block mb-2">
                          Execution Features:
                        </span>
                        <ul className="space-y-1.5 text-xs text-charcoal/80">
                          {service.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-copper shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <Button
                        asLink
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        variant="primary"
                        size="md"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        {service.ctaText}
                      </Button>
                    </div>

                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Global Capabilities Notice */}
        <div className="mt-20 p-8 rounded-refined bg-evergreen text-ivory text-center space-y-4 border border-white/10 max-w-4xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-white">
            Have a Complex or Multi-Product Requirement?
          </h3>
          <p className="text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Need high-volume catalog processing, custom seasonal color palettes, or multi-angle 360-style series? Our creative director can formulate a custom project scope.
          </p>
          <div className="pt-2">
            <Button
              asLink
              to="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss a Custom Project Scope
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
