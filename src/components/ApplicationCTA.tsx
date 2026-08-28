import React from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';
import { ScrollReveal } from './ScrollReveal';
import { StarfieldButton } from './StarfieldButton';

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

      <ScrollReveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
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
          <StarfieldButton
            onClick={onOpenApplication}
            fill="#f59e0b"
            textColor="#0f172a"
            padding="14px 28px"
            rounded={100}
            glow={{ color: '#fbbf24', size: 16, opacity: 100 }}
            stroke={{ color: '#d97706', size: 90, count: 2, speed: 60, movement: 'continuous', direction: 'cw', thickness: 2 }}
            pixel={{ color: '#b45309', size: 4, density: 60, brightness: 100 }}
            border={{ borderColor: 'rgba(217, 119, 6, 0.5)', borderWidth: 1.5, borderStyle: 'solid' }}
          >
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">Start Your Application</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </StarfieldButton>

          <StarfieldButton
            onClick={onContactClick}
            fill="rgba(255, 255, 255, 0.12)"
            textColor="#ffffff"
            padding="14px 24px"
            rounded={100}
            glow={{ color: '#38bdf8', size: 14, opacity: 90 }}
            stroke={{ color: '#38bdf8', size: 70, count: 1, speed: 50, movement: 'continuous', direction: 'cw', thickness: 1.5 }}
            pixel={{ color: '#38bdf8', size: 3, density: 45, brightness: 90 }}
            border={{ borderColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 1.5, borderStyle: 'solid' }}
          >
            <MessageSquare className="w-4 h-4 text-blue-200" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">Speak With an Advisor</span>
          </StarfieldButton>
        </div>

      </ScrollReveal>
    </section>
  );
};
