import React from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import { PRICING_PACKAGES } from '@/data/pricing';
import { Button } from '@/components/common/Button';
import { PageBanner } from '@/components/common/PageBanner';

export const Pricing: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Top Page Banner */}
      <PageBanner
        badge="Clear & Honest Investment"
        title="Simple, Transparent"
        highlightedTitle="Pricing"
        description="Commercial studio quality at predictable, accessible rates. No hidden day rates, photographer equipment fees, or licensing surprises. Select the tier that matches your product lineup."
        bgImageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-refined p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-evergreen text-ivory shadow-xl border-2 border-copper'
                  : 'bg-white text-charcoal border border-evergreen/15 shadow-subtle hover:border-copper/40'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-copper text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className={`font-heading font-bold text-xl ${pkg.popular ? 'text-white' : 'text-evergreen'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mt-1 min-h-[32px] ${pkg.popular ? 'text-ivory/70' : 'text-charcoal/70'}`}>
                    {pkg.tagline}
                  </p>
                </div>

                <div className="py-3 border-y border-current/10">
                  <span className={`text-3xl sm:text-4xl font-heading font-extrabold ${pkg.popular ? 'text-copper' : 'text-copper'}`}>
                    {pkg.price}
                  </span>
                  <div className={`text-xs font-medium mt-1 ${pkg.popular ? 'text-ivory/80' : 'text-charcoal/80'}`}>
                    {pkg.imagesCount}
                  </div>
                  <div className={`text-[11px] ${pkg.popular ? 'text-ivory/60' : 'text-charcoal/60'}`}>
                    {pkg.productsCount}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 text-xs">
                  <span className={`font-semibold uppercase tracking-wider text-[10px] block ${pkg.popular ? 'text-copper' : 'text-evergreen'}`}>
                    What's Included:
                  </span>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.popular ? 'text-copper' : 'text-copper'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Turnaround & Revision Badges */}
                <div className={`p-3 rounded text-[11px] space-y-1 ${pkg.popular ? 'bg-white/5 border border-white/10' : 'bg-ivory border border-evergreen/10'}`}>
                  <div><strong>Revisions:</strong> {pkg.revisions}</div>
                  <div><strong>Turnaround:</strong> {pkg.turnaround}</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-current/10">
                <Button
                  asLink
                  to={`/contact?package=${pkg.id}`}
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full text-center"
                >
                  {pkg.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Conditions & FAQ Section */}
        <div className="mt-16 bg-white rounded-refined border border-evergreen/15 p-8 shadow-subtle space-y-6">
          <div className="flex items-center gap-2 text-evergreen font-heading font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-copper" />
            <span>Package Conditions & Clarity Notes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-charcoal/80">
            <div className="space-y-1.5">
              <h4 className="font-semibold text-evergreen">Complex Products & Quotations</h4>
              <p className="text-xs leading-relaxed text-charcoal/70">
                Intricate reflective items (e.g. multi-gem diamond rings, intricate mirror finishes, or transparent complex bottles) may require additional digital sculpt pass and custom quotation.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-evergreen">Input Quality Guidelines</h4>
              <p className="text-xs leading-relaxed text-charcoal/70">
                While professional studio cameras are not required, higher resolution phone reference photos with clear lighting yield the highest fidelity final deliverables.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-evergreen">Commercial Usage Rights</h4>
              <p className="text-xs leading-relaxed text-charcoal/70">
                All delivered final images include full commercial usage rights for your website, Amazon, Shopify, social media advertising, and marketing collateral.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <Button
            asLink
            to="/contact"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start Your Custom Project Enquiry
          </Button>
        </div>

      </div>
    </div>
  );
};
