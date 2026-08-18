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
  MessageCircle,
  MapPin,
  Award
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  return (
    <section id="hero" className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32 overflow-hidden bg-[#071322] text-white">
      {/* 1. Large High-Resolution Convocation Background Photo with Sleek Deep-Navy Visual Tint */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <ImageWithFallback
          src={IMAGES.convocation.src}
          fallbackSrcs={[
            IMAGES.convocation.webp,
            IMAGES.convocation.publicUrl,
            '/DSC_9367.jpeg',
            IMAGES.convocation.png,
            IMAGES.convocation.svg
          ]}
          alt={IMAGES.convocation.alt}
          className="w-full h-full object-cover object-[center_28%] sm:object-[center_35%] md:object-center scale-105 opacity-60 sm:opacity-65 transition-transform duration-1000"
          loading="eager"
        />
        {/* Optical Duotone & Legibility Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322]/95 via-[#071322]/85 to-[#071322]/70 sm:to-[#071322]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-[#071322]/80" />
      </div>

      {/* Atmospheric Accent Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[300px] bg-sky-500/20 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Clear High-Impact Headline & Quick Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-xs font-bold text-sky-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Official 2026 International Student Admissions Desk</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black tracking-tight text-white leading-[1.05] drop-shadow-sm">
                STUDY IN INDIA.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-emerald-300">
                  START YOUR NEXT CHAPTER.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow">
              We guide students from Africa and around the world into accredited Indian universities — providing verified admissions, bonafide visa documents, and airport arrival reception.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-[#071322] bg-white hover:bg-sky-50 shadow-2xl hover:shadow-sky-400/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>START YOUR APPLICATION</span>
                <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>TALK TO AN ADVISOR</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Direct University Liaison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">WAEC / WASSCE Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Airport Pickup & FRRO Assistance</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Real Graduate Showcase & Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow & Glass Frame */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-white/25 via-white/10 to-white/5 backdrop-blur-xl shadow-2xl border border-white/20">
                
                {/* Main Hero Image: Real Graduate Portrait */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] shadow-2xl group">
                  <ImageWithFallback
                    src={IMAGES.graduate.src}
                    fallbackSrcs={[
                      IMAGES.graduate.webp,
                      IMAGES.graduate.publicUrl,
                      '/DSC_9531.jpeg',
                      IMAGES.graduate.png,
                      IMAGES.graduate.svg
                    ]}
                    alt={IMAGES.graduate.alt}
                    className="w-full h-full object-cover object-top transform group-hover:scale-103 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient for Bottom Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/20 to-transparent pointer-events-none" />

                  {/* Top Live Verification Chip */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071322]/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-lg">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real Student Success</span>
                  </div>

                  {/* Real Student Journey Highlight Card inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-4 rounded-2xl bg-[#071322]/95 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-black tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Official Graduate
                      </span>
                      <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                        <span>🇱🇷 Liberia</span>
                        <span>→</span>
                        <span>🇮🇳 India</span>
                      </span>
                    </div>
                    <p className="text-sm font-black text-white">
                      Myers • B.Sc Microbiology (Class of 2026)
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-1">
                      Shri Rawatpura Sarkar University, Raipur, India
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-3 sm:-right-5 bg-[#0B192C]/95 backdrop-blur-xl py-3 px-4 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-float-gentle text-white">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">Top Indian Campuses</p>
                  <p className="text-xs font-extrabold text-white">NAAC A++ / A+ Accredited 🇮🇳</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#0B192C]/95 backdrop-blur-xl py-3 px-4 rounded-2xl shadow-2xl border border-emerald-400/30 flex items-center gap-3 animate-float-slow text-white">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white">Full On-Ground Care</p>
                  <p className="text-[10px] text-slate-300 font-medium">India 🇮🇳 & Liberia 🇱🇷 Support</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
