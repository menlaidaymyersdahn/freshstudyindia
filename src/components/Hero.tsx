import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  MessageCircle, 
  Plane, 
  Building2, 
  FileCheck2, 
  Globe2,
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-screen bg-gradient-to-b from-[#EBF3FC] via-[#F4F8FD] to-[#FFFFFF] text-slate-900 pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden flex items-center bg-grid-light"
    >
      {/* Cinematic Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Ruby Ambient Glow on Left */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-red-400/10 blur-[130px] rounded-full" />
        
        {/* Sky / Sapphire Ambient Glow on Right */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-400/15 blur-[150px] rounded-full" />

        {/* Center Horizon Light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-t from-sky-100/40 to-transparent blur-2xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Cinematic Text Content */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8">
            
            {/* 1. Small Label Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 font-extrabold tracking-widest text-[11px]">
                2026 INTERNATIONAL STUDENT ADMISSIONS DESK
              </span>
            </motion.div>

            {/* 2. Main Headline */}
            <div className="space-y-1 sm:space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                className="overflow-hidden"
              >
                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 leading-[0.95] uppercase">
                  STUDY
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative inline-block"
              >
                {/* Visual Glow Behind "INDIA." */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/15 via-rose-400/10 to-blue-500/15 blur-2xl -z-10 rounded-3xl" />
                
                <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-600">
                  IN INDIA.
                </span>
              </motion.div>
            </div>

            {/* 3. Supporting Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl"
            >
              We guide ambitious students from Africa and across the world into accredited Indian universities, providing verified admissions, bonafide visa documentation, and full airport arrival support.
            </motion.p>

            {/* 4. Action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Application Button */}
              <button
                onClick={onOpenApplication}
                className="group relative px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-xl shadow-red-600/25 hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">START YOUR APPLICATION</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-200" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Secondary Advisor Button */}
              <a
                href={getWhatsAppLink('india', 'Hello Fresh Study India, I want to talk to an advisor regarding accredited Indian universities and the 2026 intake.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>TALK TO AN ADVISOR</span>
              </a>

              {/* Direct Eligibility Anchor */}
              <a
                href="#eligibility-checker"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 text-center py-2 sm:py-0 hover:underline transition-colors flex items-center justify-center gap-1"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Check Eligibility</span>
              </a>
            </motion.div>

            {/* Quick Micro Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span className="font-semibold text-slate-700">Direct Bonafide Letters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-700">Zero Upfront Secret Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">Airport Pickup & SIM Support</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High-End Animated International Corridor Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Container */}
            <div className="relative rounded-3xl bg-white border border-sky-100 p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] animate-float-gentle overflow-hidden">
              
              {/* Corner Ambient Accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-red-500/10 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-500/10 to-transparent blur-2xl pointer-events-none" />

              {/* Card Header with Status Telemetry */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-blue-700 border border-white/40 flex items-center justify-center shadow-xs">
                    <Globe2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-900">
                      STUDENT ADMISSION CORRIDOR
                    </p>
                    <p className="text-[10px] font-mono text-slate-500">
                      Live Telemetry • 2026 Academic Intake
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              {/* Interactive Africa 🇱🇷 to India 🇮🇳 Animated Route Graphic */}
              <div className="relative bg-gradient-to-br from-sky-50/70 to-blue-50/40 rounded-2xl p-5 border border-sky-100 mb-5 overflow-hidden">
                
                {/* Locations Row */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  {/* Origin: West Africa (Monrovia, Liberia) */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">🇱🇷</span>
                      <span className="text-xs font-black text-rose-700 uppercase tracking-wide">
                        West Africa
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">Monrovia Desk</p>
                    <span className="inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 border border-red-200 text-rose-700">
                      WAEC / WASSCE
                    </span>
                  </div>

                  {/* Flight Icon & Pulsing Route Vector */}
                  <div className="flex flex-col items-center justify-center px-4">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono mb-1">
                      <Plane className="w-3.5 h-3.5 text-blue-600 rotate-45 animate-pulse" />
                      <span>Direct Route</span>
                    </div>
                    <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-red-500 via-sky-400 to-blue-600 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563EB]" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">Visa Bonafide</span>
                  </div>

                  {/* Destination: India */}
                  <div className="space-y-1 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-xs font-black text-blue-700 uppercase tracking-wide">
                        India
                      </span>
                      <span className="text-xl">🇮🇳</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">Accredited Hubs</p>
                    <span className="inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 border border-blue-200 text-blue-700">
                      UGC & NAAC
                    </span>
                  </div>
                </div>

                {/* Active Support Milestones inside Corridor */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-sky-100 text-[10px] text-slate-600 text-center">
                  <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-xs">
                    <p className="font-mono text-rose-600 font-bold">Step 1</p>
                    <p className="text-slate-700 font-medium truncate">Eligibility</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-xs">
                    <p className="font-mono text-blue-600 font-bold">Step 2</p>
                    <p className="text-slate-700 font-medium truncate">Bonafide Letter</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-xs">
                    <p className="font-mono text-emerald-600 font-bold">Step 3</p>
                    <p className="text-slate-700 font-medium truncate">Airport Pickup</p>
                  </div>
                </div>

              </div>

              {/* Telemetry Live Feed Card */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-red-100 text-rose-600 flex items-center justify-center">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 font-medium">Bonafide Letter Issuance</span>
                  </div>
                  <span className="font-mono font-bold text-rose-600 text-[11px]">Direct Registrar</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 font-medium">Visa & FRRO Documentation</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600 text-[11px]">100% Guided</span>
                </div>
              </div>

              {/* Bottom Interactive Trigger to Apply */}
              <button
                onClick={onOpenApplication}
                className="w-full mt-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-red-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Initiate Student Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
              </button>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
