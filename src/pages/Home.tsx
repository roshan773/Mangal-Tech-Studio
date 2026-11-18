import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  Camera, 
  Clock, 
  Zap, 
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { SERVICES } from '@/data/services';
import { PRICING_PACKAGES } from '@/data/pricing';

export const Home: React.FC = () => {
  const [activeBeforeAfterIndex, setActiveBeforeAfterIndex] = useState(0);

  const featuredBeforeAfters = [
    {
      title: 'Lumière Botanical Radiance Serum',
      category: 'Cosmetics & Skincare',
      before: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: 'aspect-[4/3]',
      transformation: 'Smartphone bottle snap → Sunlit travertine pedestal with natural water reflections'
    },
    {
      title: 'Aurelia 18K Emerald Heritage Pendant',
      category: 'Fine Jewellery',
      before: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: 'aspect-[4/3]',
      transformation: 'Flat tabletop snap → Macro directional rim lighting with prismatic gem facets'
    },
    {
      title: 'Monsoon Malabar Single-Origin Coffee',
      category: 'Food & Beverage',
      before: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: 'aspect-[4/3]',
      transformation: 'Cardboard box cutout → Sensory artisanal roastery setting with warm morning light'
    }
  ];

  const categories = [
    {
      name: 'Beauty & Skincare',
      count: 'Bottles, Jars, Droppers, Compacts',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Jewellery & Accessories',
      count: 'Rings, Necklaces, Bracelets, Watches',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Fashion & Lifestyle',
      count: 'Bags, Footwear, Leather Goods, Apparel',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Home Décor',
      count: 'Ceramics, Vases, Art Pieces, Textiles',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Food & Beverage',
      count: 'Packaged Foods, Bottles, Coffee, Spices',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Handmade Products',
      count: 'Artisanal Soaps, Crafts, Candles, Gifts',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Share Your Product',
      desc: 'Send us high-clarity photos taken with your smartphone or digital camera against any clean background.',
    },
    {
      step: '02',
      title: 'Choose Creative Direction',
      desc: 'Pick your preferred aesthetic: architectural studio podiums, organic nature sets, or lifestyle interiors.',
    },
    {
      step: '03',
      title: 'We Create Your Visuals',
      desc: 'Our artists blend AI-assisted generation with precise manual retouching to preserve every label and color detail.',
    },
    {
      step: '04',
      title: 'Review and Receive',
      desc: 'Review digital proofs, request adjustments, and download print-ready high-resolution deliverables.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative bg-evergreen text-ivory pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Subtle decorative background noise/glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F4F0E6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-copper/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-ivory tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-copper" />
                <span className="font-medium">AI-Assisted Managed Creative Photography</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                Your Products Deserve the <span className="text-copper italic font-normal">Studio Treatment.</span>
              </h1>

              <p className="text-base sm:text-lg text-ivory/80 max-w-xl font-normal leading-relaxed">
                Transform ordinary product photographs into professional studio-style and lifestyle visuals with AI-assisted creative production and meticulous human quality control.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  asLink
                  to="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Your Project
                </Button>
                <Button
                  asLink
                  to="/portfolio"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-ivory hover:bg-white/10 hover:text-white"
                >
                  Explore Our Work
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <div className="font-heading font-bold text-xl text-white">100%</div>
                  <div className="text-ivory/60">Brand & Label Accuracy</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-white">48-72h</div>
                  <div className="text-ivory/60">Standard Turnaround</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-white">Zero Shipping</div>
                  <div className="text-ivory/60">No Fragile Logistics</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="relative rounded-refined overflow-hidden shadow-2xl border border-white/15 bg-evergreen-light/40 group">
                  <img
                    src="https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=1200&q=85"
                    alt="Lumière Luxury Product Studio Staging"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle floating badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 backdrop-blur-md p-4 rounded border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-copper font-semibold">Art Directed Transformation</div>
                      <div className="text-sm font-medium text-white">Lumière Botanical Serum</div>
                    </div>
                    <Link
                      to="/portfolio"
                      className="text-xs text-ivory/80 hover:text-white flex items-center gap-1 font-medium"
                    >
                      View Case <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Decorative Accent Tag */}
                <div className="absolute -top-4 -right-4 bg-copper text-white text-xs font-semibold px-3 py-1.5 rounded shadow-lg uppercase tracking-wider hidden sm:block">
                  Studio Quality &bull; No Studio Hassle
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: BRAND INTRODUCTION */}
      <section className="py-20 bg-ivory border-b border-evergreen/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-copper font-bold">
            The Visual Advantage
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight">
            Great Product Photography Starts With a Better Visual Story.
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            For online brands, your customer cannot touch, smell, or test your product before purchasing. Your imagery is your entire storefront, your packaging, and your salesperson rolled into one. High-converting imagery requires art direction, precise lighting, and context—not just another white-box snapshot.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="h-0.5 w-16 bg-copper/50" />
          </div>
        </div>
      </section>

      {/* SECTION 3: BEFORE & AFTER COMPARISON (INTERACTIVE SLIDER) */}
      <section className="py-20 lg:py-28 bg-white border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-bold">
                Proven Visual Transformation
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight mt-1">
                Before & After: See The Difference
              </h2>
              <p className="text-sm sm:text-base text-charcoal/70 mt-2 max-w-xl">
                Drag the interactive slider below to inspect how our artists convert raw mobile phone shots into high-end editorial campaigns.
              </p>
            </div>

            {/* Category Select Tabs for Slider */}
            <div className="flex flex-wrap gap-2">
              {featuredBeforeAfters.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => setActiveBeforeAfterIndex(idx)}
                  className={`text-xs px-3.5 py-2 rounded-refined font-medium transition-all ${
                    activeBeforeAfterIndex === idx
                      ? 'bg-evergreen text-white shadow-sm'
                      : 'bg-ivory text-charcoal hover:bg-ivory-dark border border-evergreen/10'
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Slider Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <BeforeAfterSlider
                beforeImage={featuredBeforeAfters[activeBeforeAfterIndex].before}
                afterImage={featuredBeforeAfters[activeBeforeAfterIndex].after}
                beforeLabel="Original Raw Photo"
                afterLabel="Mangal Tech Studio Output"
                aspectRatio={featuredBeforeAfters[activeBeforeAfterIndex].aspectRatio}
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-ivory/60 p-6 rounded-refined border border-evergreen/10 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-copper">
                  Case Spotlight
                </span>
                <h3 className="font-heading font-bold text-xl text-evergreen">
                  {featuredBeforeAfters[activeBeforeAfterIndex].title}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {featuredBeforeAfters[activeBeforeAfterIndex].transformation}
                </p>

                <div className="space-y-2.5 pt-2 text-xs text-charcoal/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                    <span>Labels, text & typography 100% protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                    <span>Physical shadow falloff & surface caustics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                    <span>Multi-format exports for Instagram & Web</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    asLink
                    to="/portfolio"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View All Portfolio Transformations
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: SERVICES OVERVIEW */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-copper font-bold">
              Creative Capabilities
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight">
              Tailored Product Visuals for Every Channel
            </h2>
            <p className="text-charcoal/70 text-base">
              From pristine white e-commerce catalog cutouts to evocative seasonal lifestyle editorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-refined overflow-hidden border border-evergreen/10 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-evergreen group-hover:text-copper transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 mt-2 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-evergreen/10 flex items-center justify-between">
                    <Link
                      to={`/services#${service.id}`}
                      className="text-xs font-semibold text-evergreen hover:text-copper flex items-center gap-1"
                    >
                      Explore Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-charcoal/50 bg-ivory px-2 py-0.5 rounded">
                      Commercial Use
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asLink
              to="/services"
              variant="secondary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Detailed Service Specifications
            </Button>
          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-20 lg:py-28 bg-white border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-copper font-bold">
              Simple Remote Workflow
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight">
              How Our Managed Creative Service Works
            </h2>
            <p className="text-charcoal/70 text-base">
              No product shipping required. No physical studio rental fees. Four clear steps from concept to final assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-ivory/50 rounded-refined p-6 border border-evergreen/10 relative group hover:border-copper/40 transition-colors"
              >
                <div className="text-4xl font-heading font-extrabold text-copper/30 mb-3 group-hover:text-copper transition-colors">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-lg text-evergreen mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-refined bg-evergreen text-ivory text-center max-w-2xl mx-auto border border-white/10">
            <p className="text-xs sm:text-sm font-medium">
              &ldquo;We act as your dedicated art department. You send your photos, we handle concepting, lighting simulation, and final retouching.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: PRODUCT CATEGORIES */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-bold">
                Specialized Industries
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight mt-1">
                Visuals Crafted for Your Category
              </h2>
            </div>
            <Button
              asLink
              to="/portfolio"
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Browse By Industry
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative rounded-refined overflow-hidden border border-evergreen/10 aspect-[4/3] group shadow-subtle"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading font-bold text-lg text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ivory/80 mt-0.5">
                    {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US */}
      <section className="py-20 lg:py-28 bg-white border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-copper font-bold">
              The Mangal Tech Studio Edge
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight">
              Why Brands Choose Our Managed Creative Service
            </h2>
            <p className="text-charcoal/70 text-base">
              We combine cutting-edge creative AI with professional art direction and stringent manual quality control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Bespoke Creative Direction</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                We don't use cookie-cutter prompts. Every image is thoughtfully composed with props, surface textures, and color tones that match your brand identity.
              </p>
            </div>

            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Rigorous Human Quality Control</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Raw AI generates errors; our creative retouchers catch them. We verify label legibility, color accuracy, logos, and geometry before every delivery.
              </p>
            </div>

            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Zero Product Shipping Hassle</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Never risk lost packages, customs duties, broken sample bottles, or weeks of transit waiting for physical studio bookings.
              </p>
            </div>

            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Consistent Product Presentation</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Maintain uniform horizon levels, shadow directions, and color grading across entire catalogue lines and seasonal launches.
              </p>
            </div>

            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Rapid 48-72h Turnaround</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Launch new products, festive campaigns, or flash sales in days instead of waiting 3-4 weeks for commercial studio slots.
              </p>
            </div>

            <div className="p-6 rounded-refined bg-ivory/50 border border-evergreen/10 space-y-3">
              <div className="w-10 h-10 rounded-refined bg-copper/10 text-copper flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-evergreen">Transparent Transparent Pricing</h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Transparent package pricing starting at ₹1,499. No hidden photographer day rates, studio rental fees, or equipment surcharges.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: PORTFOLIO PREVIEW */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-copper font-bold">
                Selected Works
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight mt-1">
                Recent Studio Creations
              </h2>
            </div>
            <Button
              asLink
              to="/portfolio"
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Complete Gallery ({PORTFOLIO_ITEMS.length} Projects)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-refined overflow-hidden border border-evergreen/10 shadow-subtle group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/80 backdrop-blur-sm text-ivory text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-heading font-bold text-base text-evergreen">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: PRICING PREVIEW */}
      <section className="py-20 lg:py-28 bg-white border-b border-evergreen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-copper font-bold">
              Transparent Investment
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-evergreen tracking-tight">
              Featured Creative Packages
            </h2>
            <p className="text-charcoal/70 text-base">
              Affordable, transparent tiers designed for growing brands, online stores, and product launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PACKAGES.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-refined p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-evergreen text-ivory shadow-xl border-2 border-copper'
                    : 'bg-ivory/50 text-charcoal border border-evergreen/15 hover:border-copper/40'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-copper text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className={`font-heading font-bold text-2xl ${pkg.popular ? 'text-white' : 'text-evergreen'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs mt-1 ${pkg.popular ? 'text-ivory/70' : 'text-charcoal/70'}`}>
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="py-2 border-y border-current/10">
                    <span className={`text-4xl font-heading font-extrabold ${pkg.popular ? 'text-copper' : 'text-copper'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-xs block mt-1 ${pkg.popular ? 'text-ivory/60' : 'text-charcoal/60'}`}>
                      {pkg.imagesCount} &bull; {pkg.productsCount}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    {pkg.features.slice(0, 5).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-copper' : 'text-copper'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-current/10">
                  <Button
                    asLink
                    to={`/contact?package=${pkg.id}`}
                    variant={pkg.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    {pkg.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="text-sm font-semibold text-copper hover:text-copper-dark inline-flex items-center gap-1.5"
            >
              View Full Pricing Comparison & Custom Campaign Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="py-24 bg-evergreen text-ivory relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest text-copper font-bold">
            Begin Your Studio Journey
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Ready to Make Your Products Stand Out?
          </h2>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Send us your product photos today. We will review your requirements, suggest creative directions, and deliver studio-standard imagery in 48 to 72 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asLink
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project
            </Button>
            <Button
              asLink
              to="/portfolio"
              variant="outline"
              size="lg"
              className="border-white/30 text-ivory hover:bg-white/10 hover:text-white"
            >
              Browse Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
