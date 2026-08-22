import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Plane, 
  MessageCircle,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface BigCTAProps {
  onOpenApplication: () => void;
}

export const BigCTA: React.FC<BigCTAProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#060F1E] text-white relative overflow-hidden">
      {/* Background Decorative Mesh & Red/Blue Atmospheric Light */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/18 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-8 shadow-lg">
          <GraduationCap className="w-4 h-4" />
          <span>2026 Academic Admissions Open</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          READY TO BUILD YOUR CAREER AT AN
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 via-blue-300 to-sky-400 drop-shadow-sm">
            ACCREDITED INDIAN UNIVERSITY?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Begin your application profile today. Our counselors verify your academic documents, issue direct university bonafide letters, and guide you every step of the way.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onOpenApplication}
            className="w-full sm:w-auto px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 transition-all duration-200 shadow-2xl shadow-red-600/30 hover:shadow-red-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>START YOUR APPLICATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppLink('india', 'Hello Fresh Study India, I want to discuss university options and tuition fees for studying in India.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-sky-400/40 backdrop-blur-md transition flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>TALK ON WHATSAPP</span>
          </a>
        </div>

        {/* Trust Badges Underneath */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Zero Upfront Agency Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Direct Registrar Admission Letters</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-emerald-400" />
            <span>Full India Airport Reception</span>
          </div>
        </div>

      </div>
    </section>
  );
};
