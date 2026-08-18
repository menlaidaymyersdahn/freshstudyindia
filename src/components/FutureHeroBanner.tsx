import React from 'react';
import { ArrowRight, Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';

interface FutureHeroBannerProps {
  onOpenApplication: () => void;
}

export const FutureHeroBanner: React.FC<FutureHeroBannerProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-6 sm:py-10 bg-[#F4F8FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Full-Width Visual Showcase Card with Rounded Corners & Subtly Filtered Real Photo */}
        <div 
          id="future-starts-here"
          className="relative min-h-[560px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 flex items-center justify-center text-center p-6 sm:p-12 lg:p-16 group transition-all duration-700"
        >
          {/* 1. Real Uploaded Graduation Photo as Full-Cover Background with Optimized Subject Centering */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <img
              src="/DSC_9367.jpeg"
              onError={(e) => {
                // Fallback to .jpg extension if needed
                if (e.currentTarget.src.endsWith('.jpeg')) {
                  e.currentTarget.src = '/DSC_9367.jpg';
                }
              }}
              alt="International Students in Graduation Robes at Indian University Convocation"
              className="w-full h-full object-cover object-[center_28%] sm:object-[center_35%] md:object-center transform scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            
            {/* 2. Subtle Dark Navy Overlay for optimal contrast & text legibility while keeping students clearly visible */}
            <div className="absolute inset-0 bg-[#071322]/70 sm:bg-[#071322]/55 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/95 via-[#071322]/40 to-[#071322]/70" />
            <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-[#071322]/30 to-[#071322]/85" />
          </div>

          {/* Ambient Lighting Accents */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

          {/* 3. Text & CTA Layer over Image */}
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
            
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sky-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Real International Graduates in India</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white uppercase drop-shadow-md">
              YOUR FUTURE STARTS HERE.
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl lg:text-2xl text-slate-100 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
              From your first application to your graduation journey, Fresh Study India helps international students take the next step toward studying in India.
            </p>

            {/* Call to Action Button */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-xs sm:text-base font-black uppercase tracking-wider text-[#071322] bg-white hover:bg-sky-50 shadow-2xl hover:shadow-sky-400/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                id="btn-future-start-app"
              >
                <span>START YOUR APPLICATION</span>
                <ArrowRight className="w-5 h-5 text-sky-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Bottom Caption Pill */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentic Convocation Ceremony • Verified UGC & AICTE Approved Indian Universities</span>
            </div>

          </div>

          {/* Bottom Corner Floating Photo Credit Badge */}
          <div className="hidden sm:flex absolute bottom-4 right-6 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-300 items-center gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Convocation Ceremony • India</span>
          </div>

        </div>

      </div>
    </section>
  );
};
