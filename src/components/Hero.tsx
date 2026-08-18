import React, { useState, useEffect, useRef } from 'react';
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
  Camera,
  Upload,
  RotateCcw
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [customBg, setCustomBg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('fresh_study_hero_photo');
      if (savedPhoto) {
        setCustomPhoto(savedPhoto);
      }
      const savedBg = localStorage.getItem('fresh_study_bg_photo');
      if (savedBg) {
        setCustomBg(savedBg);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setCustomPhoto(base64);
          try {
            localStorage.setItem('fresh_study_hero_photo', base64);
          } catch {
            // ignore storage full
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setCustomBg(base64);
          try {
            localStorage.setItem('fresh_study_bg_photo', base64);
          } catch {
            // ignore storage full
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomPhoto(null);
    try {
      localStorage.removeItem('fresh_study_hero_photo');
    } catch {
      // ignore
    }
  };

  return (
    <section id="hero" className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 overflow-hidden bg-slate-50">
      {/* Background Convocation Photo with Elegant Subtle Fade & Scrim */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <img
          src={customBg || "/DSC_9367.jpeg"}
          alt="Fresh Study India International Graduates Convocation Ceremony"
          className="w-full h-full object-cover object-center opacity-20 sm:opacity-25 filter blur-[0.6px] scale-105 transition-opacity duration-500"
        />
        {/* Multilayered Gradient Scrim to ensure 100% crisp typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F8FC]/92 via-white/85 to-[#FAFBFD]/95 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 lg:to-white/40" />
      </div>

      {/* Subtle Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-indigo-100/30 blur-[90px] rounded-full pointer-events-none -z-10" />

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
                
                {/* Main Hero Image / Visual Presentation */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] shadow-inner group">
                  <img
                    src={customPhoto || "/graduate-myers.svg"}
                    alt="Myers - Liberian Graduate in B.Sc Microbiology at Shri Rawatpura Sarkar University, India"
                    className="w-full h-full object-cover object-top transform group-hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/20 to-transparent pointer-events-none" />

                  {/* Top Photo Upload / Change Action Pill */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    {customPhoto && (
                      <button
                        onClick={handleResetPhoto}
                        title="Reset to default graphic"
                        className="px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-bold backdrop-blur-md border border-white/20 transition flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-300" />
                        <span>Reset</span>
                      </button>
                    )}

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      title="Upload or change student photo"
                      className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-900 text-[11px] font-bold shadow-md backdrop-blur-md border border-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-sky-600" />
                      <span>{customPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    <button
                      onClick={() => bgInputRef.current?.click()}
                      title="Change background photo"
                      className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md backdrop-blur-md border border-slate-200 transition flex items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-700" />
                    </button>
                    <input
                      ref={bgInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBgUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Real Student Journey Highlight Card inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-[#0B192C]/90 backdrop-blur-md border border-white/15 text-white shadow-xl">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Official Graduate
                      </span>
                      <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                        <span>🇱🇷 Liberia</span>
                        <span>→</span>
                        <span>🇮🇳 India</span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-black text-white">
                      Myers • B.Sc Microbiology (Class of 2026)
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-1">
                      Shri Rawatpura Sarkar University, Raipur, India
                    </p>
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
