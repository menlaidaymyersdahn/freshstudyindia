import React from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  GraduationCap, 
  Plane,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  return (
    <section id="hero" className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-white to-[#FAFBFD]">
      {/* Subtle Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/30 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-indigo-100/40 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/80 shadow-xs text-xs font-semibold text-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
              <span>Direct Admissions & Guidance for International Students</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black tracking-tight text-[#0B192C] leading-[1.08]">
                STUDY IN INDIA.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B192C] via-sky-800 to-sky-600">
                  START YOUR NEXT CHAPTER.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From choosing the right university to preparing for your journey, Fresh Study India helps international students navigate the process of studying in India.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wide text-white bg-[#0B192C] hover:bg-[#1E2E48] shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>START YOUR APPLICATION</span>
                <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>TALK TO AN ADVISOR</span>
              </a>
            </div>

            {/* Direct Contact Micro Indicator */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Zero guesswork</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Direct university alignment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Liberia & India direct helpline</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Visual & Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Frame */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-slate-200/60 via-white to-sky-100/70 shadow-2xl border border-white">
                
                {/* Main Hero Image */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                    alt="International students at an Indian university campus"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/70 via-transparent to-black/10" />

                  {/* Bottom Text inside Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0B192C]/80 backdrop-blur-md border border-white/10 text-white">
                    <p className="text-xs font-semibold text-sky-300">Empowering Global Aspirations</p>
                    <p className="text-sm font-bold mt-0.5">Accredited Degrees • Quality Campuses • Practical Learning</p>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md py-3 px-4 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 animate-float-gentle">
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Official Consultancy</p>
                  <p className="text-xs font-extrabold text-[#0B192C]">Helping International Students Discover India 🇮🇳</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md py-3 px-4 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 animate-float-slow">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#0B192C]">Direct Country Desks</p>
                  <p className="text-[11px] text-slate-600 font-medium">India 🇮🇳 +91 9201330946 | Liberia 🇱🇷 +231 889425645</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
