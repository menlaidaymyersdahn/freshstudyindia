import React from 'react';
import { GraduationCap, Phone, MapPin, ArrowUp, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenApplication: () => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenApplication, onOpenShare, onOpenPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050B14] text-white pt-20 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      {/* Top Stylish Red to Blue Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-rose-500 via-sky-400 to-blue-600" />
      
      {/* Ambient background glows */}
      <div className="absolute bottom-0 left-1/4 w-80 h-32 bg-blue-600/10 blur-[90px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-32 bg-rose-600/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-[#060F1E] border border-white/20 text-white flex items-center justify-center font-black shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Fresh Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-sky-400">India</span>
              </span>
            </div>

            <p className="text-lg font-bold text-rose-400">
              {BRAND.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We help you get from your home country to your university in India. Dedicated advisory for international students seeking accredited undergraduate and postgraduate programs.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenApplication}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 transition shadow-md cursor-pointer"
              >
                Apply for 2026
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-rose-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-rose-300 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#services" className="hover:text-rose-300 transition-colors">Services</a>
              </li>
              <li>
                <a href="#study-options" className="hover:text-rose-300 transition-colors">Study Options</a>
              </li>
              <li>
                <a href="#about" className="hover:text-rose-300 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-rose-300 transition-colors">Contact Direct</a>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              {onOpenPortal && (
                <li>
                  <button 
                    onClick={onOpenPortal} 
                    className="hover:text-rose-400 transition-colors text-left cursor-pointer flex items-center gap-1.5 font-bold text-rose-400/90"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span>Staff Admissions Portal</span>
                  </button>
                </li>
              )}
              {onOpenShare && (
                <li>
                  <button 
                    onClick={onOpenShare} 
                    className="hover:text-sky-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share With Friends</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Direct Desks */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Direct Contact Desks
            </h4>

            <div className="space-y-3">
              {/* India Line */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-blue-400/30 transition">
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🇮🇳 India Admissions Line</span>
                  </p>
                  <a 
                    href={`tel:${BRAND.contacts.india.phoneRaw}`}
                    className="text-sm font-mono font-bold text-sky-400 hover:underline mt-0.5 block"
                  >
                    {BRAND.contacts.india.phoneDisplay}
                  </a>
                </div>
                <a
                  href={getWhatsAppLink('india')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition"
                  title="WhatsApp India"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              {/* Liberia Line */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-red-400/30 transition">
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🇱🇷 Liberia Admissions Line</span>
                  </p>
                  <a 
                    href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
                    className="text-sm font-mono font-bold text-rose-400 hover:underline mt-0.5 block"
                  >
                    {BRAND.contacts.liberia.phoneDisplay}
                  </a>
                </div>
                <a
                  href={getWhatsAppLink('liberia')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-rose-600/30 text-rose-300 hover:bg-rose-600 hover:text-white transition"
                  title="WhatsApp Liberia"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Fresh Study India. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
