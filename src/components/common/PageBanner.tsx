import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageBannerProps {
  badge?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  bgImageUrl?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  title,
  highlightedTitle,
  description,
  bgImageUrl = 'https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=2000&q=80',
}) => {
  return (
    <section className="relative bg-evergreen text-ivory py-16 md:py-24 overflow-hidden border-b border-evergreen-light/20">
      {/* Background Photography with Sophisticated Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageUrl}
          alt={title}
          className="w-full h-full object-cover opacity-20 filter saturate-50 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen-dark/95 via-evergreen/90 to-evergreen-dark/95" />
        <div className="absolute inset-0 bg-[radial-gradient(#F4F0E6_1px,transparent_1px)] opacity-10 [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-4">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-ivory tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-copper" />
              <span className="font-medium text-ivory-light">{badge}</span>
            </div>
          )}

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            {title}{' '}
            {highlightedTitle && (
              <span className="text-copper italic font-normal">{highlightedTitle}</span>
            )}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-ivory/80 leading-relaxed font-normal max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Subtle bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper/20 via-copper to-copper/20" />
    </section>
  );
};
