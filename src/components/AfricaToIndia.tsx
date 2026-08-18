import React from 'react';
import { 
  Plane, 
  MapPin, 
  Globe2, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface AfricaToIndiaProps {
  onOpenApplication: () => void;
}

export const AfricaToIndia: React.FC<AfricaToIndiaProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Flight / Route Map SVG */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#0B192C] rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden border border-slate-800">
              
              {/* Map Glows & Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                
                {/* Visual Route Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-300">
                      INTERNATIONAL STUDENT CORRIDOR
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Intake 2026
                  </span>
                </div>

                {/* Animated Flight Path Route Diagram */}
                <div className="py-4 relative">
                  
                  {/* SVG Curved Flight Line with animated dash */}
                  <svg className="w-full h-44 sm:h-52 overflow-visible" viewBox="0 0 400 180" fill="none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#34D399" />
                      </linearGradient>
                    </defs>

                    {/* Background faint path */}
                    <path
                      d="M 50 130 Q 190 20 350 110"
                      stroke="#334155"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                    />

                    {/* Active glowing path */}
                    <path
                      d="M 50 130 Q 190 20 350 110"
                      stroke="url(#routeGradient)"
                      strokeWidth="3.5"
                      strokeDasharray="12 12"
                      className="animate-pulse"
                    />

                    {/* Africa Origin Node */}
                    <circle cx="50" cy="130" r="14" fill="#0B192C" stroke="#38BDF8" strokeWidth="3" />
                    <circle cx="50" cy="130" r="6" fill="#38BDF8" className="animate-ping origin-center" />
                    <circle cx="50" cy="130" r="6" fill="#38BDF8" />

                    {/* Mid-flight Plane Indicator */}
                    <g transform="translate(190, 52) rotate(15)">
                      <circle cx="0" cy="0" r="14" fill="#0B192C" stroke="#818CF8" strokeWidth="2" />
                      <path d="M-6 0 L6 0 M0 -6 L6 0 L0 6" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>

                    {/* India Destination Node */}
                    <circle cx="350" cy="110" r="16" fill="#0B192C" stroke="#34D399" strokeWidth="3" />
                    <circle cx="350" cy="110" r="7" fill="#34D399" className="animate-ping origin-center" />
                    <circle cx="350" cy="110" r="7" fill="#34D399" />
                  </svg>

                  {/* Route Label Cards */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {/* Origin Box */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Origin Desk</span>
                      </div>
                      <p className="text-sm font-extrabold text-white">Liberia & Africa 🇱🇷</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Monrovia Admissions Desk</p>
                    </div>

                    {/* Destination Box */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                        <span>Destination Universities</span>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm font-extrabold text-white">Campuses in India 🇮🇳</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Bengaluru • Delhi • Pune • Chennai</p>
                    </div>
                  </div>

                </div>

                {/* Direct Helplines Strip */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span>Direct Liberia Line:</span>
                    <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-bold text-sky-300 hover:text-white underline">
                      {BRAND.contacts.liberia.phoneDisplay}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <span>India HQ:</span>
                    <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-bold text-emerald-300 hover:text-white underline">
                      {BRAND.contacts.india.phoneDisplay}
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Clear Scope */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold uppercase tracking-wider">
              <span>Bridging Continents</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
              FROM AFRICA TO INDIA.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              <p className="text-xl sm:text-2xl font-bold text-[#0B192C]">
                A new country. A new university. A new opportunity.
              </p>

              <p className="text-slate-600 font-normal text-base sm:text-lg">
                Fresh Study India helps students take that first step with greater clarity and confidence. We bridge the gap between high school completion in West Africa and higher education in India's leading academic cities.
              </p>
            </div>

            {/* Clear Country Support Badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Currently assisting students from Liberia and other international destinations.</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-6">
                Students from Liberia, Ghana, Nigeria, Kenya, Sierra Leone, and across the African continent receive personalized guidance on admissions, currency, Indian consular paperwork, and academic transfers.
              </p>

              {/* Photo preview of real graduates in convocation */}
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 relative group">
                <img
                  src="/DSC_9367.jpeg"
                  alt="International Graduates at Convocation Ceremony in India"
                  className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    🎓 International Students Convocation Ceremony • Raipur, India
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-[#0B192C] hover:bg-[#1E2E48] shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Your International Journey</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>

              <a
                href={getWhatsAppLink('liberia')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Liberia Desk WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
