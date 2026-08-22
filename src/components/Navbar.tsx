import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Lock
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface NavbarProps {
  onOpenApplication: () => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenApplication, 
  onOpenShare, 
  onOpenPortal 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Study in India', href: '#study-in-india' },
    { label: 'Courses', href: '#study-options' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Eligibility', href: '#eligibility-checker' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      
      {/* Top Admissions Announcement Strip */}
      <div 
        className={`w-full bg-[#0F172A] text-[11px] font-medium text-slate-200 py-1.5 px-4 sm:px-8 transition-all duration-300 pointer-events-auto ${
          isScrolled ? 'opacity-0 -translate-y-full h-0 py-0 overflow-hidden pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">
              2026 International Admissions Active
            </span>
            <span className="hidden md:inline-block text-slate-300">• Direct Registrar Bonafide Letters</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${BRAND.contacts.india.phoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <span>🇮🇳 India:</span>
              <span className="font-mono text-sky-300 font-bold">{BRAND.contacts.india.phoneDisplay}</span>
            </a>
            <a 
              href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <span>🇱🇷 Liberia:</span>
              <span className="font-mono text-rose-300 font-bold">{BRAND.contacts.liberia.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-3 pointer-events-auto">
        <nav
          className={`w-full rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
            isScrolled
              ? 'py-3 bg-white/90 backdrop-blur-xl border border-sky-100 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
              : 'py-4 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md shadow-sky-950/5'
          }`}
        >
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-blue-700 border border-white/40 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                Fresh Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-600">India</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
                International Admissions Advisory
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 border border-slate-200/60 rounded-xl px-2 py-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-150 shadow-none hover:shadow-xs"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                title="Counselor Portal"
              >
                <Lock className="w-3.5 h-3.5 text-rose-500" />
                <span>Portal</span>
              </button>
            )}

            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-all duration-150 flex items-center justify-center shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenApplication}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-md shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10">START APPLICATION</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenApplication}
              className="px-3 py-2 rounded-xl text-[11px] font-black uppercase text-white bg-gradient-to-r from-red-600 to-blue-700"
            >
              Apply
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 shadow-md flex items-center justify-center gap-2"
              >
                <span>START APPLICATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={getWhatsAppLink('india')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {onOpenPortal && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPortal();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Portal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
