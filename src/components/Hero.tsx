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
      {/* Background Photo with Light Blue Gradient Overlays for High Legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src="/DSC_9367.jpeg"
          alt="Myers Global Pathways graduation ceremony in India"
          className="w-full h-full object-cover object-center opacity-20 filter scale-105"
        />
        {/* Layered luminous sky blue gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#CDE2F8]/95 via-[#E2EFFC]/90 to-[#EBF3FC]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#CDE2F8] via-transparent to-[#EBF3FC]" />
      </div>

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

          {/* Right Column: High-End Photography Composition Featuring Myers Graduates */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Editorial Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white group">
                <img
                  src="/DSC_9367.jpeg"
                  alt="Myers Global Pathways student graduates at university convocation ceremony"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Subtle Image Tagline Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200 text-left shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-blue-700">
                      Myers Global Graduates
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                      Class of 2024
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 mt-1.5 font-medium leading-relaxed">
                    Celebrating international students successfully admitted, graduated, and thriving in top universities in India.
                  </p>
                </div>
              </div>

              {/* Floating Verified Advisory Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-300 text-slate-900 shadow-xl flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-950">Proven Results</p>
                  <p className="text-[10px] text-slate-600 font-medium">Official Partner Universities</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
