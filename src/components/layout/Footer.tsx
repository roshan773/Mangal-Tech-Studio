import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle, Instagram, ShieldCheck, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  // Configurable placeholders for contact and social info
  const CONTACT_EMAIL = 'hello@mangaltechstudio.com';
  const WHATSAPP_NUMBER = '+91 98765 43210';
  const WHATSAPP_LINK = 'https://wa.me/919876543210';
  const INSTAGRAM_HANDLE = '@mangaltechstudio';
  const INSTAGRAM_LINK = 'https://instagram.com/mangaltechstudio';

  return (
    <footer className="bg-evergreen text-ivory/80 border-t border-evergreen-light/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-refined bg-ivory/10 border border-ivory/20 flex items-center justify-center text-ivory">
                <svg className="w-6 h-6 text-copper" viewBox="0 0 100 100" fill="none">
                  <path d="M26 70V30L50 48L74 30V70" stroke="#F4F0E6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="50" cy="58" r="7" fill="#C47A4A"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  Mangal Tech <span className="text-copper">Studio</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-ivory/60 font-medium">
                  Managed Creative Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              We create professional product visuals for growing brands, without the complexity, delays, and exorbitant costs of arranging a traditional photoshoot.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-ivory/80">
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-refined border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-copper" />
                <span>Human Quality Control</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-refined border border-white/10">
                <Clock className="w-3.5 h-3.5 text-copper" />
                <span>48h Fast Turnaround</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white">
              Studio Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-copper transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-copper transition-colors">Portfolio & Work</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-copper transition-colors">Creative Services</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-copper transition-colors">Pricing Packages</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-copper transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-copper transition-colors">Start Project / Enquiry</Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services#studio-product-photography" className="hover:text-copper transition-colors">Studio Product Visuals</Link>
              </li>
              <li>
                <Link to="/services#lifestyle-product-photography" className="hover:text-copper transition-colors">Lifestyle Set Compositions</Link>
              </li>
              <li>
                <Link to="/services#ecommerce-product-images" className="hover:text-copper transition-colors">E-Commerce White Background</Link>
              </li>
              <li>
                <Link to="/services#product-detail-visuals" className="hover:text-copper transition-colors">Macro & Detail Creatives</Link>
              </li>
              <li>
                <Link to="/services#social-media-product-creatives" className="hover:text-copper transition-colors">Social Feed & Story Packs</Link>
              </li>
              <li>
                <Link to="/services#custom-campaign-visuals" className="hover:text-copper transition-colors">Art-Directed Campaigns</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 hover:text-copper transition-colors group"
                >
                  <Mail className="w-4 h-4 text-copper shrink-0" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-copper transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-copper shrink-0" />
                  <span>{WHATSAPP_NUMBER}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-copper transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-copper shrink-0" />
                  <span>{INSTAGRAM_HANDLE}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-xs text-ivory/50 block">Managed Service Office:</span>
              <span className="text-xs text-ivory/80">Remote Studio &bull; Serving Brands Globally</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Mangal Tech Studio. All rights reserved. Managed creative product photography.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ivory transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-ivory transition-colors">
              Refund & Revision Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
