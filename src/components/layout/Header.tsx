import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-evergreen/95 backdrop-blur-md shadow-lg py-3.5 border-b border-evergreen-light/20'
          : 'bg-evergreen py-4.5 border-b border-evergreen-light/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-refined bg-ivory/10 border border-ivory/20 flex items-center justify-center text-ivory group-hover:border-copper transition-colors">
              <svg className="w-6 h-6 text-copper" viewBox="0 0 100 100" fill="none">
                <path d="M26 70V30L50 48L74 30V70" stroke="#F4F0E6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="58" r="7" fill="#C47A4A"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg md:text-xl text-ivory tracking-tight group-hover:text-ivory-light">
                Mangal Tech <span className="text-copper">Studio</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ivory/60 font-medium">
                AI Product Photography
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-refined transition-all relative ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-ivory/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-copper rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asLink
              to="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start Your Project
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-refined text-ivory hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-evergreen border-t border-evergreen-light/20 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-refined text-base font-medium transition-colors ${
                    active
                      ? 'bg-copper text-white font-semibold'
                      : 'text-ivory hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Button
                asLink
                to="/contact"
                variant="primary"
                className="w-full text-center justify-center py-3"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
