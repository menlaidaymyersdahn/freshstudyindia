import React from 'react';
import { 
  Users2, 
  CheckCircle, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Award,
  Sparkles,
  MapPin
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface WhyUsProps {
  onOpenApplication: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenApplication }) => {
  const points = [
    {
      num: '01',
      title: 'HONEST, PERSONAL GUIDANCE',
      desc: 'Real advisors who understand the African & international student journey.',
      detail: 'You are never dealing with automated bots or vague promises. Our counselors walk you through genuine course requirements, fee breakdowns, and real campus realities.',
      icon: Users2
    },
    {
      num: '02',
      title: 'VERIFIED & DIRECT ADMISSIONS',
      desc: 'Clear official paperwork with zero guesswork or hidden charges.',
      detail: 'We provide authentic Bonafide Admission Letters directly from accredited Indian university registrars, enabling smooth, confident student visa approvals.',
      icon: CheckCircle
    },
    {
      num: '03',
      title: 'ON-GROUND ARRIVAL & TRANSITION',
      desc: 'Full reception support when you land at the airport in India.',
      detail: 'From airport reception and campus hostel check-in to SIM card setup and local police/FRRO registration, we ensure you are safe and supported from day one.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#071322] text-white relative overflow-hidden">
      {/* Background Convocation Photo with rich cinematic treatment */}
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
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071322] via-[#071322]/90 to-[#071322]" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16 sm:space-y-20">
        
        {/* Section Header & Visual Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Mission & Real Talk */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Who We Are & What We Stand For</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              INDIA IS A BIG MOVE.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-emerald-300 mt-1 sm:mt-2">
                YOU DON'T HAVE TO NAVIGATE IT ALONE.
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
              Fresh Study India was founded to eliminate the uncertainty, misinformation, and risk international students face when seeking higher education in India.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-sky-400">100%</p>
                <p className="text-xs font-semibold text-slate-300 mt-1">Verified Universities</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">2 Desks</p>
                <p className="text-xs font-semibold text-slate-300 mt-1">India & Liberia Teams</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-black text-amber-400">Direct</p>
                <p className="text-xs font-semibold text-slate-300 mt-1">Airport to Hostel Care</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Real Photography Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-tr from-sky-500/20 via-white/10 to-emerald-500/20 border border-white/20 shadow-2xl backdrop-blur-xl">
              
              {/* Primary Photo Showcase Container: Real Graduation Ceremony */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-2xl group">
                <ImageWithFallback
                  src={IMAGES.convocation.src}
                  fallbackSrcs={[
                    IMAGES.convocation.webp,
                    IMAGES.convocation.publicUrl,
                    '/DSC_9367.jpeg',
                    IMAGES.convocation.png,
                    IMAGES.convocation.svg
                  ]}
                  alt="Real International Students Convocation in India"
                  className="w-full h-full object-cover object-[center_28%] sm:object-[center_35%] md:object-center group-hover:scale-103 transition-transform duration-700"
                />

                {/* Gradient and Badge Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#071322]/85 backdrop-blur-md border border-white/20 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Convocation Day</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#071322]/90 backdrop-blur-md border border-white/15 text-white shadow-xl">
                  <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wide">
                    Real Students • Real Results
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    Fresh Study India students celebrating graduation in Indian university auditorium.
                  </p>
                </div>
              </div>

              {/* Secondary Student Highlight Bar */}
              <div className="mt-2.5 p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
                <ImageWithFallback
                  src={IMAGES.graduate.src}
                  fallbackSrcs={[
                    IMAGES.graduate.webp,
                    IMAGES.graduate.publicUrl,
                    '/DSC_9531.jpeg',
                    IMAGES.graduate.png,
                    IMAGES.graduate.svg
                  ]}
                  alt="Myers Graduate"
                  className="w-12 h-12 rounded-xl object-cover object-top border border-emerald-400/40 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Myers • Microbiology Graduate</p>
                  <p className="text-[11px] text-slate-300 truncate">Shri Rawatpura Sarkar University, India</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3 Pillars Grid with Visual Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-white/15">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div 
                key={pt.num} 
                className="p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-sky-400/40 transition-all duration-300 space-y-4 group"
              >
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-black text-sky-400/60 group-hover:text-sky-400 transition-colors">
                    {pt.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white tracking-tight leading-snug">
                  {pt.title}
                </h3>

                {/* Primary Short Description */}
                <p className="text-sm sm:text-base font-bold text-sky-200 leading-snug">
                  {pt.desc}
                </p>

                {/* Extended Supporting Text */}
                <p className="text-sm text-slate-400 leading-relaxed pt-1">
                  {pt.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-950/60 via-[#0B192C] to-slate-900/60 border border-white/15 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-2xl font-black text-white">
              Have questions about universities, safety, or fees?
            </h4>
            <p className="text-sm text-slate-300 max-w-xl">
              Connect directly with our India or Liberia admissions desks for straightforward, factual counsel.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2"
            >
              <span>WhatsApp India Desk</span>
            </a>

            <button
              onClick={onOpenApplication}
              className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wide text-[#071322] bg-white hover:bg-sky-50 transition shadow-lg cursor-pointer"
            >
              Start Application
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
