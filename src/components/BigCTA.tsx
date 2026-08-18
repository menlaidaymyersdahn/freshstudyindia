import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  GraduationCap,
  ShieldCheck,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface BigCTAProps {
  onOpenApplication: () => void;
}

export const BigCTA: React.FC<BigCTAProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#071322] text-white relative overflow-hidden">
      {/* 1. Background Convocation Photo with rich visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <ImageWithFallback
          src={IMAGES.convocation.src}
          fallbackSrcs={[
            IMAGES.convocation.webp,
            IMAGES.convocation.publicUrl,
            '/DSC_9367.jpeg',
            IMAGES.convocation.png,
            IMAGES.convocation.svg
          ]}
          alt={IMAGES.convocation.alt}
          className="w-full h-full object-cover object-center opacity-50 sm:opacity-55 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322]/95 via-[#071322]/80 to-[#071322]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-[#071322]/80" />
      </div>

      {/* Atmospheric ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-8">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Your 2026 Academic Journey Awaits</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white max-w-4xl mx-auto">
          YOUR INDIA JOURNEY CAN START TODAY.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto">
          Tell us your intended degree, and our India and Liberia admissions teams will guide you every step from admission letter to campus arrival.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onOpenApplication}
            className="w-full sm:w-auto flex-1 px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-[#071322] bg-white hover:bg-sky-50 shadow-2xl hover:shadow-sky-400/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>START MY APPLICATION</span>
            <ArrowRight className="w-4 h-4 text-sky-600" />
          </button>

          <a
            href={getWhatsAppLink('india')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4.5 h-4.5 text-white" />
            <span>WHATSAPP AN ADVISOR</span>
          </a>
        </div>

        {/* Quick Phone Contacts */}
        <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">🇮🇳 India Direct Helpline:</span>
            <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-bold text-white hover:text-sky-300">
              {BRAND.contacts.india.phoneDisplay}
            </a>
          </div>

          <div className="h-3 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-slate-400">🇱🇷 Liberia Direct Helpline:</span>
            <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-bold text-white hover:text-sky-300">
              {BRAND.contacts.liberia.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
