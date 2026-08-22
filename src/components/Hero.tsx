import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Plane,
  ShieldCheck,
  MessageCircle,
  FileCheck,
  Clock,
  Award,
  Globe2,
  Users2,
  Flame,
  Star
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  return (
    <section id="hero" className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32 overflow-hidden bg-[#050B14] text-white">
      {/* Background Decorative Mesh & Stylist Radiant Atmosphere (Red & Blue Radiant Glows) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
        
        {/* Stylist Luminous Blue & Red Glow Orbs */}
        <div className="absolute top-1/4 left-1/5 w-[650px] h-[380px] bg-blue-600/18 blur-[150px] rounded-full animate-pulse-glow-blue" />
        <div className="absolute bottom-10 right-1/6 w-[550px] h-[420px] bg-rose-600/18 blur-[160px] rounded-full animate-pulse-glow-red" />
        <div className="absolute top-0 right-1/4 w-[450px] h-[320px] bg-indigo-600/15 blur-[130px] rounded-full" />
        <div className="absolute top-2/3 left-1/10 w-[350px] h-[300px] bg-red-600/12 blur-[140px] rounded-full" />
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/40 via-[#050B14]/70 to-[#050B14]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Clear High-Impact Headline & Quick Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Verified Badge with Red & Blue Prestige Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/15 via-blue-500/15 to-rose-500/15 backdrop-blur-md border border-red-500/30 shadow-lg text-xs font-bold text-slate-200">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-white font-extrabold tracking-wide uppercase">2026 International Student Admissions Desk</span>
              <span className="hidden sm:inline-block text-rose-300 font-bold">• India 🇮🇳 & Liberia 🇱🇷</span>
            </div>

            {/* Main Headline with Stylist Red & Blue Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black tracking-tight text-white leading-[1.04]">
                STUDY IN INDIA.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 via-blue-300 to-sky-400 drop-shadow-sm">
                  START YOUR NEXT CHAPTER.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We guide ambitious students from Africa and across the world into accredited Indian universities — delivering verified admissions, bonafide visa documents, and full airport arrival reception.
            </p>

            {/* Action Buttons: Stylist Red & Blue CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-2xl shadow-red-600/30 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>START YOUR APPLICATION</span>
                <ArrowRight className="w-4 h-4 text-rose-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-sky-400/40 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-sky-400" />
                <span>TALK TO AN ADVISOR</span>
              </a>
            </div>

            {/* Trust Points with Red/Blue Accent Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-bold text-white">Direct University Liaison</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-bold text-white">WAEC / WASSCE Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">Airport Pickup & FRRO Assistance</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Admissions Hub Card (Stylist Red & Blue Glassmorphism UI) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Card Glass Frame with Red/Blue Border Glow */}
              <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#0B1E38]/90 via-[#081528]/95 to-[#050B14]/98 backdrop-blur-2xl shadow-2xl border border-white/20 shadow-blue-900/20 space-y-6">
                
                {/* Header Row: Live Desk Status */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-red-400/30 flex items-center justify-center text-rose-400">
                      <GraduationCap className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">2026 Admissions Desk</h3>
                      <p className="text-[11px] text-slate-400 font-semibold">India 🇮🇳 & West Africa 🇱🇷 Desk</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    Active Intake
                  </span>
                </div>

                {/* 4-Step Express Progression with Stylist Color Coded Steps */}
                <div className="space-y-3">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                    Streamlined Student Path
                  </p>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-3 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-sky-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white">Course & Budget Evaluation</p>
                        <p className="text-[11px] text-slate-400 truncate">Eligibility check for WAEC / WASSCE / Degrees</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-3 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white">Direct Bonafide Admission Letter</p>
                        <p className="text-[11px] text-slate-400 truncate">Official university registrar documentation for visa</p>
                      </div>
                      <FileCheck className="w-4 h-4 text-rose-400 shrink-0" />
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-3 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white">Indian Student Visa Dossier</p>
                        <p className="text-[11px] text-slate-400 truncate">Embassy checklist, affidavit & appointment review</p>
                      </div>
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-3 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        4
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white">Airport Reception & Campus Check-in</p>
                        <p className="text-[11px] text-slate-400 truncate">Hostel settlement, SIM card & FRRO police registration</p>
                      </div>
                      <Plane className="w-4 h-4 text-amber-400 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Popular Degree Badges */}
                <div className="pt-1 border-t border-white/10 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Available Degree Streams
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Computer Science & AI', 'Nursing & Health', 'Pharmacy', 'Engineering', 'BBA / MBA', 'Cyber Security', 'Microbiology'].map((tag, idx) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                          idx % 2 === 0
                            ? 'bg-blue-500/10 text-sky-200 border-blue-400/20 hover:border-blue-400'
                            : 'bg-rose-500/10 text-rose-200 border-rose-400/20 hover:border-rose-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="pt-2">
                  <button
                    onClick={onOpenApplication}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:via-rose-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider transition shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check University Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
