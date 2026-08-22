import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  GraduationCap, 
  MessageCircle, 
  Share2,
  Sparkles,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface NavbarProps {
  onOpenApplication: (presetField?: string) => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication, onOpenShare, onOpenPortal }) => {
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
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Mini Top Contact Strip with Red/Blue Prestige Accents */}
      <div className="bg-[#050B14] text-white/90 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 relative overflow-hidden">
        {/* Subtle top ambient red/blue glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-red-600 via-sky-400 to-rose-600 opacity-80" />
        
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-rose-300 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              2026 Intake Live
            </span>
            <span className="text-slate-300 font-medium hidden md:inline">
              Direct University Admissions • Bonafide Visa Letters
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${BRAND.contacts.india.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
            >
              <span className="text-xs">🇮🇳</span>
              <span className="text-slate-400 hidden sm:inline">India:</span>
              <span className="font-semibold text-white tracking-wide font-mono">{BRAND.contacts.india.phoneDisplay}</span>
            </a>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <a 
              href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-rose-300 transition-colors"
            >
              <span className="text-xs">🇱🇷</span>
              <span className="text-slate-400 hidden sm:inline">Liberia:</span>
              <span className="font-semibold text-white tracking-wide font-mono">{BRAND.contacts.liberia.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200/80 py-3 sm:py-3.5' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-4.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo with Stylist Red & Blue Gradient Badge */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#060F1E] via-[#0B1E38] to-[#1E293B] border border-white/20 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-5 h-5 text-sky-400 group-hover:text-rose-400 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-rose-600 border-2 border-white shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#060F1E]">
                  Fresh Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-sky-600">India</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                International Admissions Advisory
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="hover:text-red-600 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-red-600 after:to-sky-600 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                title="Admissions Staff Portal"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Staff Portal</span>
              </button>
            )}

            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="p-2.5 rounded-xl text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Stylist Red & Blue Gradient Application Button */}
            <button
              onClick={() => onOpenApplication()}
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-[#0B1E38] hover:from-red-500 hover:via-rose-500 hover:to-sky-900 transition-all duration-200 shadow-md hover:shadow-red-500/25 hover:shadow-lg active:scale-98 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Start Application</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-200 group-hover:translate-x-0.5 transition-transform" />
              </span>
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
            <div className="flex flex-col space-y-3 text-sm font-bold text-slate-800 uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-red-600 transition-colors"
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
                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-[#0B1E38] flex items-center justify-center gap-2 shadow-md"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4 text-rose-200" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={getWhatsAppLink('india')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <span>🇮🇳 India Desk</span>
                </a>

                <a
                  href={getWhatsAppLink('liberia')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <span>🇱🇷 Liberia Desk</span>
                </a>
              </div>

              {onOpenPortal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 bg-rose-50 border border-rose-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Admissions Staff Portal</span>
                </button>
              )}

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
