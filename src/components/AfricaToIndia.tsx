import React from 'react';
import { 
  Plane, 
  MapPin, 
  Globe2, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Award,
  GraduationCap
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface AfricaToIndiaProps {
  onOpenApplication: () => void;
}

export const AfricaToIndia: React.FC<AfricaToIndiaProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Convocation Photo with rich dark atmospheric filter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <img
          src="/DSC_9367.jpeg"
          onError={(e) => {
            if (e.currentTarget.src.endsWith('.jpeg')) {
              e.currentTarget.src = '/DSC_9367.jpg';
            }
          }}
          alt="International Graduates at Convocation in India"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/85 to-slate-900" />
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Flight / Route Map with Integrated Photographic Proof */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            
            {/* The Flight Corridor Card */}
            <div className="bg-[#071322] rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden border border-white/15 backdrop-blur-xl">
              
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

              <div className="relative z-10 space-y-6">
                
                {/* Visual Route Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                      INTERNATIONAL STUDENT CORRIDOR
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active 2026 Intake
                  </span>
                </div>

                {/* Animated Flight Path Route Diagram */}
                <div className="py-2 relative">
                  
                  {/* SVG Curved Flight Line */}
                  <svg className="w-full h-36 sm:h-44 overflow-visible" viewBox="0 0 400 160" fill="none">
                    <defs>
                      <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#34D399" />
                      </linearGradient>
                    </defs>

                    {/* Background track */}
                    <path
                      d="M 50 120 Q 190 20 350 100"
                      stroke="#1E293B"
                      strokeWidth="4"
                      strokeDasharray="6 6"
                    />

                    {/* Active glowing path */}
                    <path
                      d="M 50 120 Q 190 20 350 100"
                      stroke="url(#corridorGradient)"
                      strokeWidth="3.5"
                      strokeDasharray="10 10"
                      className="animate-pulse"
                    />

                    {/* Origin Node */}
                    <circle cx="50" cy="120" r="14" fill="#071322" stroke="#38BDF8" strokeWidth="3" />
                    <circle cx="50" cy="120" r="5" fill="#38BDF8" className="animate-ping origin-center" />
                    <circle cx="50" cy="120" r="5" fill="#38BDF8" />

                    {/* Mid-flight Plane */}
                    <g transform="translate(190, 48) rotate(10)">
                      <circle cx="0" cy="0" r="14" fill="#071322" stroke="#818CF8" strokeWidth="2" />
                      <Plane className="w-4 h-4 text-sky-300 -translate-x-2 -translate-y-2" />
                    </g>

                    {/* India Destination Node */}
                    <circle cx="350" cy="100" r="16" fill="#071322" stroke="#34D399" strokeWidth="3" />
                    <circle cx="350" cy="100" r="6" fill="#34D399" className="animate-ping origin-center" />
                    <circle cx="350" cy="100" r="6" fill="#34D399" />
                  </svg>

                  {/* Route Label Cards */}
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    {/* Origin Box */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold mb-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Origin</span>
                      </div>
                      <p className="text-sm font-extrabold text-white">Liberia & Africa 🇱🇷</p>
                      <p className="text-[11px] text-slate-400">Monrovia Admissions Desk</p>
                    </div>

                    {/* Destination Box */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-emerald-400 text-xs font-bold mb-0.5">
                        <span>Destination</span>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm font-extrabold text-white">Campuses in India 🇮🇳</p>
                      <p className="text-[11px] text-slate-400">Raipur • Delhi • Bengaluru</p>
                    </div>
                  </div>

                </div>

                {/* Direct Helplines Strip */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span>Liberia Desk:</span>
                    <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-bold text-sky-300 hover:text-white underline">
                      {BRAND.contacts.liberia.phoneDisplay}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <span>India HQ Desk:</span>
                    <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-bold text-emerald-300 hover:text-white underline">
                      {BRAND.contacts.india.phoneDisplay}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Dual Real Photo Cards: Convocation & Student Portrait */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md relative group aspect-[4/3] shadow-lg">
                <img
                  src="/DSC_9367.jpeg"
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith('.jpeg')) {
                      e.currentTarget.src = '/DSC_9367.jpg';
                    }
                  }}
                  alt="Convocation Ceremony at Indian University"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/20 to-transparent flex items-end p-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-sky-500 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      India Convocation
                    </span>
                    <p className="text-xs font-bold text-white mt-0.5">Accredited Campus Event</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md relative group aspect-[4/3] shadow-lg">
                <img
                  src="/DSC_9531.jpeg"
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith('.jpeg')) {
                      e.currentTarget.src = '/DSC_9531.jpg';
                    }
                  }}
                  alt="Myers - Liberian Student Graduate in India"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/20 to-transparent flex items-end p-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      Liberia → India
                    </span>
                    <p className="text-xs font-bold text-white mt-0.5">Myers • Microbiology</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Narrative & Clear Scope */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bridging Continents</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              FROM AFRICA TO INDIA.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-emerald-300 mt-1">
                YOUR DREAM DEGREE.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <p className="text-xl font-bold text-white">
                A new country. A recognized university. A lifetime of global opportunity.
              </p>
              <p>
                Fresh Study India helps students take that first step with total clarity and confidence. We bridge the distance between secondary school graduation in West Africa and accredited universities in India's leading education hubs.
              </p>
            </div>

            {/* Clear Country Support Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Active assistance for students from Liberia and international destinations.</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                Students from Liberia, Ghana, Nigeria, Kenya, Sierra Leone, and across the African continent receive direct support on university selection, tuition structures, Indian visa eligibility, and pre-departure briefings.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-[#071322] bg-white hover:bg-sky-50 shadow-2xl hover:shadow-sky-400/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start Your International Journey</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </button>

              <a
                href={getWhatsAppLink('liberia')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Liberia Desk WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
