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
    <section id="apply-now" className="relative py-20 sm:py-24 bg-[#060B19] text-white border-t border-b border-slate-800 scroll-mt-24 overflow-hidden">
      {/* Authentic Myers Graduation Background Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/DSC_9367.jpeg"
          alt="Myers Global Pathways graduation celebration"
          className="w-full h-full object-cover object-center opacity-15 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B19] via-[#060B19]/90 to-[#060B19]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B19] via-transparent to-[#060B19]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide mb-6 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Begin Your Educational Path in India</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Start Your Journey?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
          Submit your academic background and preferred course of study. Our admissions team will review your qualifications and provide personalized guidance on university options.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenApplication}
            className="px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your Application</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={onContactClick}
            className="px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 backdrop-blur-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <span>Speak With an Advisor</span>
          </button>
        </div>

      </div>
    </section>
  );
};
