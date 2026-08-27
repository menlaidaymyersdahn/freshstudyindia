import React from 'react';
import { ArrowUpRight, Compass, CheckCircle2, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';

interface HeroProps {
  onOpenApplication: () => void;
  onExploreStudyInIndia: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenApplication, 
  onExploreStudyInIndia, 
  onExploreServices 
}) => {
  const whatsappConfig = getWhatsAppConfig();

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 text-slate-900 overflow-hidden bg-gradient-to-b from-[#CDE2F8] via-[#E2EFFC] to-[#EBF3FC] border-b border-sky-300/60"
    >
      {/* Subtle background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-sky-300 text-blue-900 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm shadow-xs">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>International Higher Education Consultancy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Your Pathway to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-sky-700">
                Study in India
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
              Personalized guidance for international students seeking quality higher education, accredited degree opportunities, and a smooth journey to India.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenApplication}
                className="px-7 py-4 rounded-2xl text-sm sm:text-base font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-5 h-5 text-slate-950" />
              </button>

              <button
                onClick={onExploreStudyInIndia}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide text-blue-950 bg-white/90 hover:bg-white border border-sky-300 shadow-xs backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer hover:border-blue-500"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Study in India</span>
              </button>

              <button
                onClick={onExploreServices}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide text-blue-950 bg-white/90 hover:bg-white border border-sky-300 shadow-xs backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer hover:border-blue-500"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Our 8 Services</span>
              </button>
            </div>

            {/* Trust Pillars Checklist */}
            <div className="pt-4 border-t border-sky-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-800 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Personalized Advising</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transparent Process</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>End-to-End Visa Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Admissions Overview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="rounded-3xl border-2 border-white shadow-2xl bg-white p-6 sm:p-8 text-left space-y-6">
                
                <div className="flex items-center justify-between gap-3 border-b border-sky-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">
                      Admissions Overview
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-950 mt-0.5">
                      2026/2027 Intakes
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-sky-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Key Pillars */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950">100% English-Medium Programs</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-normal">
                        No IELTS or TOEFL required for qualifying applicants with English high school backgrounds.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950">Accredited Degrees</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-normal">
                        UGC, AICTE, NAAC accredited universities across Tech, Medicine, Business & Humanities.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950">Dedicated Visa Dossier Assistance</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-normal">
                        Step-by-step guidance for Indian Embassy/Consulate student visa appointments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="pt-2">
                  <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Currently Accepting International Applications</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
