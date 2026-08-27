import React from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';

interface ApplicationCTAProps {
  onOpenApplication: () => void;
  onContactClick: () => void;
}

export const ApplicationCTA: React.FC<ApplicationCTAProps> = ({
  onOpenApplication,
  onContactClick
}) => {
  const whatsappConfig = getWhatsAppConfig();

  return (
    <section id="apply-now" className="relative py-20 sm:py-24 bg-gradient-to-r from-blue-950 via-blue-900 to-sky-950 text-white border-t border-b border-sky-300/40 scroll-mt-24 overflow-hidden">
      {/* Subtle ambient lighting orbs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-amber-300 text-xs font-bold tracking-wide mb-6 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4" />
          <span>Begin Your Educational Path in India</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Start Your Journey?
        </h2>

        <p className="text-base sm:text-lg text-blue-100 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
          Submit your academic background and preferred course of study. Our admissions team will review your qualifications and provide personalized guidance on university options.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenApplication}
            className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Start Your Application</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={onContactClick}
            className="px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-blue-200" />
            <span>Speak With an Advisor</span>
          </button>
        </div>

      </div>
    </section>
  );
};
