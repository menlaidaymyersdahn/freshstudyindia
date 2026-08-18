import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  GraduationCap,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface BigCTAProps {
  onOpenApplication: () => void;
}

export const BigCTA: React.FC<BigCTAProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#0B192C] to-[#081220] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-8">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Future Awaits</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white max-w-4xl mx-auto">
          YOUR INDIA JOURNEY CAN START TODAY.
        </h2>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
          Tell us what you want to study, and our team will help you understand your next steps.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenApplication}
            className="w-full sm:w-auto flex-1 px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#0B192C] bg-white hover:bg-slate-100 shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>START MY JOURNEY</span>
            <ArrowRight className="w-4 h-4 text-sky-600" />
          </button>

          <a
            href={getWhatsAppLink('india')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4.5 h-4.5 text-white" />
            <span>WHATSAPP AN ADVISOR</span>
          </a>
        </div>

        {/* Quick Phone Contacts */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>🇮🇳 India Direct:</span>
            <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-bold text-white hover:text-sky-300">
              {BRAND.contacts.india.phoneDisplay}
            </a>
          </div>

          <div className="h-3 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span>🇱🇷 Liberia Direct:</span>
            <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-bold text-white hover:text-sky-300">
              {BRAND.contacts.liberia.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
