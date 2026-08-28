import React from 'react';
import { ArrowUpRight, Compass, CheckCircle2, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { getWhatsAppConfig } from '../config/company';
import { CursorRingField } from './CursorRingField';
import { StarfieldButton } from './StarfieldButton';

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
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 text-slate-900 overflow-hidden bg-gradient-to-b from-[#CDE2F8]/70 via-[#E2EFFC]/60 to-[#EBF3FC]/80 border-b border-sky-300/60"
    >
      {/* Interactive Cursor Ring Field Hero Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <CursorRingField
          background="transparent"
          colors={["#0284c7", "#2563eb", "#1d4ed8", "#38bdf8", "#1e3a8a"]}
          density={300}
          dotSize={125}
          speed={6.5}
          ring={{ push: 60, width: 11, radius: 14, turbulence: 75 }}
        />
      </div>

      {/* Subtle background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-sky-300 text-blue-900 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm shadow-xs"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>International Higher Education Consultancy</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]"
            >
              Your Pathway to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-sky-700">
                Study in India
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal"
            >
              Personalized guidance for international students seeking quality higher education, accredited degree opportunities, and a smooth journey to India.
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <StarfieldButton
                onClick={onOpenApplication}
                fill="#f59e0b"
                textColor="#0f172a"
                padding="14px 26px"
                rounded={100}
                glow={{ color: '#fbbf24', size: 16, opacity: 100 }}
                stroke={{ color: '#d97706', size: 90, count: 2, speed: 60, movement: 'continuous', direction: 'cw', thickness: 2 }}
                pixel={{ color: '#b45309', size: 4, density: 60, brightness: 100 }}
                border={{ borderColor: 'rgba(217, 119, 6, 0.4)', borderWidth: 1.5, borderStyle: 'solid' }}
              >
                <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider">Start Your Application</span>
                <ArrowUpRight className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </StarfieldButton>

              <StarfieldButton
                onClick={onExploreStudyInIndia}
                fill="#ffffff"
                textColor="#0f172a"
                padding="12px 20px"
                rounded={100}
                glow={{ color: '#38bdf8', size: 12, opacity: 85 }}
                stroke={{ color: '#38bdf8', size: 70, count: 1, speed: 45, movement: 'continuous', direction: 'cw', thickness: 1.5 }}
                pixel={{ color: '#38bdf8', size: 3, density: 40, brightness: 90 }}
                border={{ borderColor: 'rgba(125, 211, 252, 0.8)', borderWidth: 1.5, borderStyle: 'solid' }}
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Study in India</span>
              </StarfieldButton>

              <StarfieldButton
                onClick={onExploreServices}
                fill="#ffffff"
                textColor="#0f172a"
                padding="12px 20px"
                rounded={100}
                glow={{ color: '#38bdf8', size: 12, opacity: 85 }}
                stroke={{ color: '#38bdf8', size: 70, count: 1, speed: 45, movement: 'continuous', direction: 'cw', thickness: 1.5 }}
                pixel={{ color: '#38bdf8', size: 3, density: 40, brightness: 90 }}
                border={{ borderColor: 'rgba(125, 211, 252, 0.8)', borderWidth: 1.5, borderStyle: 'solid' }}
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Our 8 Services</span>
              </StarfieldButton>
            </motion.div>

            {/* Trust Pillars Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="pt-4 border-t border-sky-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-800 font-semibold"
            >
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
            </motion.div>
          </div>

          {/* Right Column: Clean Admissions Overview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative"
          >
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};
