import React, { useState } from 'react';
import { Sliders, Eye, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/data/portfolio';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { Button } from '@/components/common/Button';
import { PageBanner } from '@/components/common/PageBanner';

type CategoryFilter = 'All' | 'Skincare' | 'Beauty' | 'Jewellery' | 'Fashion' | 'Home Décor' | 'Lifestyle' | 'Food';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [lightboxMode, setLightboxMode] = useState<'after' | 'slider'>('slider');

  const categories: CategoryFilter[] = [
    'All',
    'Skincare',
    'Beauty',
    'Jewellery',
    'Fashion',
    'Home Décor',
    'Lifestyle',
    'Food',
  ];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item: PortfolioItem, mode: 'after' | 'slider' = 'slider') => {
    setSelectedItem(item);
    setLightboxMode(mode);
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Top Page Banner */}
      <PageBanner
        badge="Curated Creative Gallery"
        title="Our Studio"
        highlightedTitle="Portfolio"
        description="Inspect our actual product transformations. See how raw mobile phone photos are converted into magazine-grade studio podiums, tactile macro close-ups, and aspirational lifestyle scenes."
        bgImageUrl="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Quality & Consent Note */}
        <div className="mb-8 text-xs text-charcoal/70 bg-white/80 p-4 rounded-refined border border-evergreen/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-subtle">
          <div>
            <strong className="text-evergreen">Exemplary Studio Showcases:</strong> Each card demonstrates a comparison between raw reference photos and final commercial art-directed outputs.
          </div>
          <span className="text-[11px] text-copper font-medium whitespace-nowrap">
            Client images never displayed without consent
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-evergreen/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-refined font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-evergreen text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory-dark border border-evergreen/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-refined overflow-hidden border border-evergreen/10 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col group"
            >
              {/* Interactive In-Card Before/After Slider */}
              <div className="relative">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="Raw Photo"
                  afterLabel="Studio Output"
                  aspectRatio="aspect-[4/3]"
                />
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-copper font-semibold uppercase tracking-wider">
                      {item.category} &bull; {item.clientType}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-evergreen mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-evergreen/10 flex items-center justify-between text-xs">
                  <span className="text-charcoal/60 text-[11px] truncate max-w-[200px]">
                    {item.deliverables}
                  </span>
                  <button
                    onClick={() => openLightbox(item, 'slider')}
                    className="text-copper hover:text-copper-dark font-semibold flex items-center gap-1 shrink-0"
                  >
                    Inspect Fullscreen <Sliders className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-20 p-8 md:p-12 rounded-refined bg-evergreen text-ivory border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading font-bold text-2xl text-white">
              Want This Quality For Your Catalog?
            </h3>
            <p className="text-sm text-ivory/70 max-w-xl">
              Send us your raw smartphone snaps today. We'll formulate your custom set styling and deliver ready-to-sell studio visuals in 48 to 72 hours.
            </p>
          </div>
          <Button
            asLink
            to="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start Your Project
          </Button>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
          <div className="bg-white rounded-refined max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col border border-evergreen/20 shadow-2xl relative">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-evergreen/10 bg-ivory">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-copper">
                  {selectedItem.category} &bull; {selectedItem.clientType}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-evergreen">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded text-charcoal/70 hover:text-black hover:bg-black/5"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setLightboxMode('slider')}
                  className={`text-xs px-3.5 py-1.5 rounded-refined font-medium flex items-center gap-1.5 transition-colors ${
                    lightboxMode === 'slider'
                      ? 'bg-evergreen text-white'
                      : 'bg-ivory text-charcoal hover:bg-ivory-dark'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Interactive Comparison Slider
                </button>
                <button
                  onClick={() => setLightboxMode('after')}
                  className={`text-xs px-3.5 py-1.5 rounded-refined font-medium flex items-center gap-1.5 transition-colors ${
                    lightboxMode === 'after'
                      ? 'bg-evergreen text-white'
                      : 'bg-ivory text-charcoal hover:bg-ivory-dark'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Studio Output Only
                </button>
              </div>

              {lightboxMode === 'slider' ? (
                <div>
                  <BeforeAfterSlider
                    beforeImage={selectedItem.beforeImage}
                    afterImage={selectedItem.afterImage}
                    beforeLabel="Raw Smartphone Shot"
                    afterLabel="Mangal Tech Studio Output"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[11px] text-center text-charcoal/60 mt-2">
                    Drag the middle handle to inspect sharpness, lighting caustics, and label fidelity.
                  </p>
                </div>
              ) : (
                <div className="rounded-refined overflow-hidden border border-evergreen/10 aspect-[16/10] bg-ivory-dark">
                  <img
                    src={selectedItem.afterImage}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="bg-ivory/50 p-4 rounded-refined border border-evergreen/10 space-y-2">
                <h4 className="font-heading font-semibold text-sm text-evergreen">Creative Direction Notes:</h4>
                <p className="text-xs text-charcoal/80 leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="text-xs text-copper font-medium pt-1">
                  Deliverables: {selectedItem.deliverables}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-evergreen/10 bg-ivory flex items-center justify-between">
              <span className="text-xs text-charcoal/60 hidden sm:inline">
                Want a similar aesthetic for your catalogue?
              </span>
              <Button
                asLink
                to="/contact"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Inquire For Your Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
