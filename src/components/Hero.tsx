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
  Compass,
  Layers
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { Hero3DCanvas } from './Hero3DCanvas';
import { TiltCard3D } from './TiltCard3D';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-screen bg-gradient-to-b from-[#060F1E] via-[#09182E] to-[#040A15] text-white pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden flex items-center"
    >
      {/* 3D WebGL Hologram & Particle Canvas */}
      <Hero3DCanvas />

      {/* Cinematic Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Ruby Ambient Glow on Left */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-red-600/15 blur-[130px] rounded-full" />
        
        {/* Sky / Sapphire Ambient Glow on Right */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full" />

        {/* Center Horizon Light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-t from-blue-900/30 to-transparent blur-2xl pointer-events-none" />
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-red-500/40 text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/40"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400 font-extrabold tracking-widest text-[11px]">
                MYERS GLOBAL PATHWAY • 2026 ADMISSIONS
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
                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase">
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
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/25 via-rose-400/20 to-blue-500/30 blur-2xl -z-10 rounded-3xl" />
                
                <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-400">
                  IN INDIA.
                </span>
              </motion.div>
            </div>

            {/* 3. Supporting Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
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
                className="group relative px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:via-rose-500 hover:to-blue-500 shadow-xl shadow-red-600/30 hover:shadow-red-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">START YOUR APPLICATION</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-200" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Secondary Advisor Button */}
              <a
                href={getWhatsAppLink('india', 'Hello Myers Global Pathway, I want to talk to an advisor regarding accredited Indian universities and the 2026 intake.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>TALK TO AN ADVISOR</span>
              </a>

              {/* Direct 3D Pathway Explorer Anchor */}
              <a
                href="#interactive-3d-pathway"
                className="text-xs font-bold text-sky-400 hover:text-sky-300 text-center py-2 sm:py-0 hover:underline transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore 3D Pathway</span>
              </a>
            </motion.div>

            {/* Quick Micro Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span className="font-semibold text-slate-200">Direct Bonafide Letters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-slate-200">Zero Upfront Secret Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Airport Pickup & SIM Support</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High-End 3D Tilt Animated International Corridor Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 relative"
          >
            <TiltCard3D maxTilt={7} perspective={1100}>
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0A1A35] to-slate-950 border border-slate-700/80 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
                
                {/* Corner Ambient Accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-red-500/20 to-transparent blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-500/20 to-transparent blur-2xl pointer-events-none" />

                {/* Card Header with Status Telemetry */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-blue-600 border border-white/20 flex items-center justify-center shadow-lg">
                      <Globe2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-white">
                        GLOBAL ADMISSION CORRIDOR
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">
                        Live Telemetry • 2026 Academic Intake
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    VERIFIED
                  </span>
                </div>

                {/* Interactive Africa 🇱🇷 to India 🇮🇳 Animated Route Graphic */}
                <div className="relative bg-slate-950/80 rounded-2xl p-5 border border-white/10 mb-5 overflow-hidden">
                  
                  {/* Locations Row */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    {/* Origin: West Africa (Monrovia, Liberia) */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">🇱🇷</span>
                        <span className="text-xs font-black text-rose-400 uppercase tracking-wide">
                          West Africa
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">Monrovia Desk</p>
                      <span className="inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-950/60 border border-red-800 text-rose-300">
                        WAEC / WASSCE
                      </span>
                    </div>

                    {/* Flight Icon & Pulsing Route Vector */}
                    <div className="flex flex-col items-center justify-center px-4">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono mb-1">
                        <Plane className="w-3.5 h-3.5 text-sky-400 rotate-45 animate-pulse" />
                        <span>Direct Route</span>
                      </div>
                      <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-red-500 via-sky-400 to-blue-500 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 mt-1">Visa Bonafide</span>
                    </div>

                    {/* Destination: India */}
                    <div className="space-y-1 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-xs font-black text-blue-400 uppercase tracking-wide">
                          India
                        </span>
                        <span className="text-xl">🇮🇳</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">Accredited Hubs</p>
                      <span className="inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-300">
                        UGC & NAAC
                      </span>
                    </div>
                  </div>

                  {/* Active Support Milestones inside Corridor */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                      <p className="font-mono text-rose-400 font-bold">Step 1</p>
                      <p className="text-slate-200 font-medium truncate">Eligibility</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                      <p className="font-mono text-blue-400 font-bold">Step 2</p>
                      <p className="text-slate-200 font-medium truncate">Bonafide Letter</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                      <p className="font-mono text-emerald-400 font-bold">Step 3</p>
                      <p className="text-slate-200 font-medium truncate">Airport Pickup</p>
                    </div>
                  </div>

                </div>

                {/* Telemetry Live Feed Card */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-red-950/80 text-rose-400 flex items-center justify-center border border-red-800/60">
                        <FileCheck2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-200 font-medium">Bonafide Letter Issuance</span>
                    </div>
                    <span className="font-mono font-bold text-rose-400 text-[11px]">Direct Registrar</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center border border-blue-800/60">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-200 font-medium">Visa & FRRO Documentation</span>
                    </div>
                    <span className="font-mono font-bold text-blue-400 text-[11px]">100% Guided</span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger to Apply */}
                <button
                  onClick={onOpenApplication}
                  className="w-full mt-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-600 hover:border-red-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Initiate Student Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                </button>

              </div>
            </TiltCard3D>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

