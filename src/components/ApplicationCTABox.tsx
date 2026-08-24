import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface ApplicationCTABoxProps {
  onOpenApplication: () => void;
  onOpenContact?: () => void;
}

export const ApplicationCTABox: React.FC<ApplicationCTABoxProps> = ({
  onOpenApplication,
  onOpenContact
}) => {
  return (
    <section 
      id="application-cta"
      className="py-20 sm:py-28 bg-[#050B14] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          
          {/* Subtle Top Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Advisory Open</span>
          </div>

          {/* Headline as requested: "Ready to Begin Your Journey?" */}
          <div className="space-y-4">
            <h2 
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Ready to Begin Your Journey?
            </h2>

            {/* Supporting text as requested: "Tell us what you want to study, and our team will help you understand the next steps." */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Tell us what you want to study, and our team will help you understand the next steps.
            </p>
          </div>

          {/* Dual CTAs as requested */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* Primary: START YOUR APPLICATION */}
            <button
              id="cta-start-app-btn"
              onClick={() => onOpenApplication()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-xl shadow-amber-500/20 cursor-pointer active:scale-98"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary: TALK TO ADMISSIONS */}
            <a
              id="cta-talk-admissions-btn"
              href={getWhatsAppLink('india', 'Hello Myers Global Pathways, I am ready to begin my application journey and would like to talk to an admissions advisor.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Talk to Admissions</span>
            </a>

          </div>

          {/* Guarantee Badges */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>No Upfront Registration Charges</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Direct University Bonafide Letters</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
