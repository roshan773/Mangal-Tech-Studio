import React from 'react';
import { ArrowRight, ShieldCheck, Target, Palette } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { PageBanner } from '@/components/common/PageBanner';

export const About: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Top Page Banner */}
      <PageBanner
        badge="Our Studio Story & Philosophy"
        title="About Mangal Tech"
        highlightedTitle="Studio"
        description="We are a modern managed creative photography studio. We empower independent brands, online artisans, and growing e-commerce businesses with magazine-grade visual storytelling without traditional commercial production fees."
        bgImageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            <span className="text-xs uppercase tracking-widest text-copper font-bold block">
              The Reality of Traditional Photography
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-evergreen tracking-tight">
              Bridging the Gap Between Big Studio Budgets and Indie Brands
            </h2>
            <p>
              Until recently, high-end product photography was reserved for luxury conglomerates with five-figure campaign budgets. Booking a traditional commercial studio requires renting physical space, hiring lighting technicians, arranging expensive backdrops, booking prop stylists, and risking courier damage by shipping fragile inventory back and forth.
            </p>
            <p>
              Meanwhile, generic AI image tools offer speed, but they consistently hallucinate—distorting labels, smudging typography, butchering logos, and changing container shapes.
            </p>
            <p className="font-medium text-evergreen">
              Mangal Tech Studio was founded to solve this dilemma: combining the efficiency of AI-assisted rendering with the precision, taste, and strict quality control of human commercial art directors.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-refined overflow-hidden border border-evergreen/15 shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
                alt="Mangal Tech Studio Creative Process"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-copper font-bold block">
                  Art-Directed Precision
                </span>
                <p className="text-sm font-medium">
                  Every product retains 100% label and packaging integrity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Creative Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-7 rounded-refined border border-evergreen/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-evergreen">Our Mission</h3>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              To level the commercial playing field by providing emerging and independent product businesses with the visual polish required to compete with global retail giants.
            </p>
          </div>

          <div className="bg-white p-7 rounded-refined border border-evergreen/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-evergreen">Our Creative Philosophy</h3>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              Technology is our tool, not our artist. True commercial appeal comes from understanding focal depth, natural light physics, color psychology, and consumer desire.
            </p>
          </div>

          <div className="bg-white p-7 rounded-refined border border-evergreen/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-evergreen">Uncompromising Quality Control</h3>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              We never deliver direct raw AI output. Every single image goes through our multi-point manual review to check label sharpness, chromatic fidelity, and contact shadows.
            </p>
          </div>
        </div>

        {/* How We Work: The Partnership Model */}
        <div className="bg-white rounded-refined border border-evergreen/15 p-8 md:p-12 mb-20 space-y-8 shadow-subtle">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-copper font-bold">
              Collaboration
            </span>
            <h2 className="font-heading font-bold text-3xl text-evergreen">
              Your Creative Partner, Not Just a Software Tool
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              When you submit a project to Mangal Tech Studio, you are assigned a dedicated creative specialist who takes time to understand your brand guidelines, target audience, and marketing channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            <div className="border-l-2 border-copper pl-4 space-y-1">
              <span className="text-xs font-bold text-copper uppercase">Phase 1</span>
              <h4 className="font-heading font-bold text-sm text-evergreen">Brief Review</h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">We evaluate your product category, competitors, and target audience aesthetic.</p>
            </div>
            <div className="border-l-2 border-copper pl-4 space-y-1">
              <span className="text-xs font-bold text-copper uppercase">Phase 2</span>
              <h4 className="font-heading font-bold text-sm text-evergreen">Scene Formulation</h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">We architect customized pedestals, natural lighting scenarios, and context backdrops.</p>
            </div>
            <div className="border-l-2 border-copper pl-4 space-y-1">
              <span className="text-xs font-bold text-copper uppercase">Phase 3</span>
              <h4 className="font-heading font-bold text-sm text-evergreen">Human QC & Polish</h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">Digital artists refine edges, restore labels, and balance color grades manually.</p>
            </div>
            <div className="border-l-2 border-copper pl-4 space-y-1">
              <span className="text-xs font-bold text-copper uppercase">Phase 4</span>
              <h4 className="font-heading font-bold text-sm text-evergreen">Final Delivery</h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">Full resolution master files delivered in organized web and e-commerce formats.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 md:p-12 rounded-refined bg-evergreen text-ivory text-center space-y-5 border border-white/10 max-w-4xl mx-auto shadow-xl">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Ready to Partner With Our Creative Team?
          </h3>
          <p className="text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Let's elevate your brand's presence today. Fill out our simple project enquiry form and share your product references.
          </p>
          <div className="pt-2">
            <Button
              asLink
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project Enquiry
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
