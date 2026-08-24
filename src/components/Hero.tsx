import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { HeroGlobe3D } from './HeroGlobe3D';

interface HeroProps {
  onOpenApplication: (field?: string) => void;
  onExploreStudyInIndia: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenApplication,
  onExploreStudyInIndia
}) => {
  return (
    <section 
      id="hero"
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 bg-[#050B14] text-white overflow-hidden"
    >
      {/* Background Architectural Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent pointer-events-none opacity-0" />

      {/* Subtle Starfield / Grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column High-End Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-amber-500/30 text-xs font-semibold text-amber-400 tracking-wide shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="uppercase tracking-wider font-bold">2026 / 2027 Admissions Open</span>
            </div>

            {/* Core Headline as Requested: "Your Pathway to Study in India" */}
            <div className="space-y-4">
              <h1 
                id="hero-main-heading"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]"
              >
                Your Pathway to <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-[#D99B26] bg-clip-text text-transparent">
                  Study in India
                </span>
              </h1>

              {/* Supporting Text as Requested */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Personalized guidance for international students seeking quality education, university opportunities, and a smoother journey to India.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA */}
              <button
                id="hero-apply-btn"
                onClick={() => onOpenApplication()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer active:scale-98"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-explore-btn"
                onClick={onExploreStudyInIndia}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore Study in India</span>
              </button>
            </div>

            {/* Key Trust Signals (No fake statistics, honest pillars) */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct University Liaison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Visa & Bonafide Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Airport & Campus Support</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Pathway Globe with Floating Tags */}
          <div className="lg:col-span-5 relative">
            <HeroGlobe3D onOpenApplication={() => onOpenApplication()} />
          </div>

        </div>

      </div>
    </section>
  );
};
