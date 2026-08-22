import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2,
  FileCheck2,
  Building2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface BigCTAProps {
  onOpenApplication: () => void;
}

export const BigCTA: React.FC<BigCTAProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F4F8FD] text-slate-900 relative overflow-hidden bg-grid-dense">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-red-400/8 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-blue-400/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main Banner Box */}
        <div className="rounded-3xl bg-white border border-sky-100 p-8 sm:p-14 lg:p-16 shadow-[0_20px_60px_rgba(15,23,42,0.06)] text-center relative overflow-hidden">
          
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-blue-600" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>2026 Direct Admissions</span>
          </div>

          {/* Big Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.05]">
            TAKE THE FIRST STEP TOWARDS YOUR DEGREE IN INDIA.
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Get your academic qualifications evaluated for free, secure your official bonafide acceptance letter, and receive 100% guided visa and airport arrival support.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenApplication}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-xl shadow-red-600/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>APPLY NOW FOR 2026</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink('india', 'Hello Fresh Study India, I want to talk to an advisor regarding 2026 admissions.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Official Bonafide Letters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Direct University Tuition Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free Academic Assessment</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
