import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  FileCheck2, 
  Plane, 
  MessageCircle,
  Building2,
  Compass
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';

interface HeroProps {
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplication }) => {
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 bg-[#FAFCFF] overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Value proposition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Elegant pill badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Admissions Advisory & Student Support</span>
            </div>

            {/* Core Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Your Pathway to <br className="hidden sm:inline" />
                <span className="text-blue-700">Study in India</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Myers Global Pathways assists international students with university selection, admissions guidance, documentation, and the journey to studying in India.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenApplication}
                className="px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScrollToSection('programs')}
                className="px-6 py-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Explore Study Options</span>
              </button>
            </div>

            {/* Value Guarantees list */}
            <div className="pt-4 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accredited Universities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visa Filing Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Airport Arrival & Check-In</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Editorial Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Framing background */}
              <div className="rounded-2xl bg-white p-3 border border-slate-200 shadow-xl overflow-hidden">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                  <picture>
                    <source srcSet={IMAGES.convocation.webp} type="image/webp" />
                    <source srcSet={IMAGES.convocation.jpeg} type="image/jpeg" />
                    <img 
                      src={IMAGES.convocation.src} 
                      alt="International students celebrating graduation ceremony in India" 
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-tight">
                      International Students Convocation in India
                    </p>
                    <p className="text-[11px] text-slate-200 mt-0.5">
                      Empowering African & international scholars through accredited degrees
                    </p>
                  </div>
                </div>

                {/* Sub-card with direct advisor availability */}
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">2026 Admissions Open</p>
                      <p className="text-[11px] text-slate-500">Undergraduate & Postgraduate</p>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink('india')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Subtle Trust / Core Assistance Pillars Bar underneath Hero */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-8">
            How Myers Global Pathways Supports Your Journey
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">University Selection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective evaluation of accredited institutions matching your subject preferences and budget.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Admission Guidance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct processing with faculty boards to secure official Provisional Letters & Bonafide certificates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Visa Documentation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured dossier compilation for smooth Indian Embassy student visa appointments and verification.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Arrival & Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Airport meet & greet in India, hostel accommodation handover, FRRO guidance, and ongoing support.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
