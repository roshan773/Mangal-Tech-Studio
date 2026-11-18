import React, { useState } from 'react';
import { Sparkles, Sliders, X, Eye, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/data/portfolio';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { Button } from '@/components/common/Button';

type CategoryFilter = 'All' | 'Skincare' | 'Beauty' | 'Jewellery' | 'Fashion' | 'Home Décor' | 'Lifestyle' | 'Food';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [lightboxMode, setLightboxMode] = useState<'after' | 'slider'>('after');

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

  const openLightbox = (item: PortfolioItem, mode: 'after' | 'slider' = 'after') => {
    setSelectedItem(item);
    setLightboxMode(mode);
  };

  return (
    <div className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-evergreen/10 text-evergreen text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>Curated Creative Gallery</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-evergreen tracking-tight">
            Our Studio Portfolio
          </h1>
          <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
            Explore our curated showcase of product transformations. Each piece is crafted using our managed AI-assisted production pipeline and perfected with rigorous manual art direction.
          </p>
          <div className="text-xs text-charcoal/60 bg-white/60 p-3 rounded border border-evergreen/10 inline-block">
            <strong>Note:</strong> Work displayed represents curated demonstration concepts and approved client deliverables. Client assets are never publicly showcased without prior written consent.
          </div>
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
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-dark">
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-evergreen/90 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded shadow-sm">
                  {item.category}
                </div>

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => openLightbox(item, 'slider')}
                    className="bg-white text-evergreen hover:bg-copper hover:text-white px-3.5 py-2 rounded-refined text-xs font-semibold shadow-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Compare Before/After</span>
                  </button>
                  <button
                    onClick={() => openLightbox(item, 'after')}
                    className="bg-evergreen text-ivory hover:bg-evergreen-light px-3.5 py-2 rounded-refined text-xs font-semibold shadow-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-copper font-semibold uppercase tracking-wider">
                    {item.clientType}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-evergreen mt-0.5">
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
                    className="text-copper hover:text-copper-dark font-medium flex items-center gap-1 shrink-0"
                  >
                    Compare <Sliders className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if any filter has no items */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-refined border border-evergreen/10 p-8">
            <h3 className="text-lg font-heading font-bold text-evergreen">No projects found in this category</h3>
            <p className="text-xs text-charcoal/70 mt-1">Please select another category or view all projects.</p>
            <div className="mt-4">
              <Button onClick={() => setActiveCategory('All')} variant="secondary" size="sm">
                View All Projects
              </Button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-refined bg-evergreen text-ivory border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading font-bold text-2xl text-white">
              Love What You See? Let's Style Your Products.
            </h3>
            <p className="text-sm text-ivory/70 max-w-xl">
              Submit your phone photos and project vision. We'll send you art-directed proof samples tailored to your brand.
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

      {/* Lightbox / Before-After Comparison Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
          <div className="bg-white rounded-refined max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col border border-evergreen/20 shadow-2xl relative">
            
            {/* Modal Header */}
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
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5">
              
              {/* Toggle View Options */}
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
                  Interactive Before & After
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
                  Final Studio Visual
                </button>
              </div>

              {/* View Display */}
              {lightboxMode === 'slider' ? (
                <div>
                  <BeforeAfterSlider
                    beforeImage={selectedItem.beforeImage}
                    afterImage={selectedItem.afterImage}
                    beforeLabel="Raw Camera Reference"
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

              {/* Description & Specs */}
              <div className="bg-ivory/50 p-4 rounded-refined border border-evergreen/10 space-y-2">
                <h4 className="font-heading font-semibold text-sm text-evergreen">Creative Notes & Execution:</h4>
                <p className="text-xs text-charcoal/80 leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="text-xs text-copper font-medium pt-1">
                  Deliverables: {selectedItem.deliverables}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
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
