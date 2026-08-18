import React from 'react';
import { GraduationCap, Phone, MapPin, ArrowUp, MessageCircle } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenApplication: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenApplication }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07111E] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B192C] flex items-center justify-center font-black shadow-md">
                <GraduationCap className="w-5 h-5 text-sky-600" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Fresh Study India
              </span>
            </div>

            <p className="text-lg font-bold text-sky-400">
              {BRAND.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We help you get from your home country to your university in India. Dedicated advisory for international students seeking accredited undergraduate and postgraduate programs.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#study-options" className="hover:text-white transition-colors">Study Options</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Desks */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Direct Contact Desks
            </h4>

            <div className="space-y-3">
              {/* India Line */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
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
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🇱🇷 Liberia Admissions Line</span>
                  </p>
                  <a 
                    href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
                    className="text-sm font-mono font-bold text-emerald-400 hover:underline mt-0.5 block"
                  >
                    {BRAND.contacts.liberia.phoneDisplay}
                  </a>
                </div>
                <a
                  href={getWhatsAppLink('liberia')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition"
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
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-1"
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
