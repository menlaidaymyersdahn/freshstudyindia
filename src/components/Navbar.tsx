import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  GraduationCap,
  MessageCircle,
  Share2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface NavbarProps {
  onOpenApplication: (presetField?: string) => void;
  onOpenShare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication, onOpenShare }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'How It Works', href: '#journey' },
    { label: 'Services', href: '#services' },
    { label: 'Study Options', href: '#study-options' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Mini Top Contact Strip */}
      <div className="bg-[#0B192C] text-white/90 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Admissions Open for Indian Universities</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${BRAND.contacts.india.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>{BRAND.contacts.india.flag}</span>
              <span className="text-white/60 hidden sm:inline">India:</span>
              <span className="font-semibold text-white tracking-wide">{BRAND.contacts.india.phoneDisplay}</span>
            </a>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <a 
              href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>{BRAND.contacts.liberia.flag}</span>
              <span className="text-white/60 hidden sm:inline">Liberia:</span>
              <span className="font-semibold text-white tracking-wide">{BRAND.contacts.liberia.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3 sm:py-3.5' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-4.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0B192C]">
                  Fresh Study India
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                International Student Consultancy
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="hover:text-[#0B192C] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="p-2.5 rounded-xl text-slate-600 hover:text-[#0B192C] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                title="Share Fresh Study India"
                aria-label="Share Fresh Study India"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenApplication()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase text-white bg-[#0B192C] hover:bg-[#1E2E48] transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <span>Start Application</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 text-base font-semibold text-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#0B192C] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#0B192C] flex items-center justify-center gap-2 shadow-md"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={getWhatsAppLink('india')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <span>🇮🇳 India WhatsApp</span>
                </a>

                <a
                  href={getWhatsAppLink('liberia')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <span>🇱🇷 Liberia WhatsApp</span>
                </a>
              </div>

              {onOpenShare && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenShare();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-sky-600" />
                  <span>Share Website on Social Media</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
