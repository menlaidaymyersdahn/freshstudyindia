import React from 'react';
import { 
  Globe2, 
  Plane, 
  Building2, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Clock
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface AfricaToIndiaProps {
  onOpenApplication: () => void;
}

export const AfricaToIndia: React.FC<AfricaToIndiaProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] text-slate-900 relative overflow-hidden bg-grid-light">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-400/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Globe2 className="w-3.5 h-3.5 text-rose-600" />
            <span>International Desk Corridor</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            FROM MONROVIA TO INDIA.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Direct physical coordination connecting West African students to certified higher education institutions across India with full on-ground accountability.
          </p>
        </div>

        {/* Dual Desks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Desk 1: Monrovia, Liberia */}
          <div className="rounded-3xl bg-white hover:bg-slate-50/50 border border-sky-100 hover:border-red-300 p-7 sm:p-9 shadow-lg transition-all duration-300 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇱🇷</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    West Africa Regional Desk
                  </h3>
                  <p className="text-xs font-mono text-slate-500">Monrovia, Liberia</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[10px] font-mono font-bold text-rose-700">
                ACTIVE DESK
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Direct physical consultation, document verification (WAEC/WASSCE), transcript review, and visa orientation for students and parents across Liberia and West Africa.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-slate-700 font-medium">{BRAND.contacts.liberia.address}</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <a 
                  href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
                  className="font-mono font-bold text-rose-700 hover:underline"
                >
                  {BRAND.contacts.liberia.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('liberia', 'Hello Fresh Study India Monrovia desk, I want to arrange a consultation regarding studying in India.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Contact Monrovia Counselor</span>
              </a>
            </div>
          </div>

          {/* Desk 2: India Admissions Hub */}
          <div className="rounded-3xl bg-white hover:bg-slate-50/50 border border-sky-100 hover:border-blue-300 p-7 sm:p-9 shadow-lg transition-all duration-300 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇮🇳</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    India Admissions & Arrival Hub
                  </h3>
                  <p className="text-xs font-mono text-slate-500">Accredited University Desk</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-blue-700">
                CAMPUS RELATIONS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Direct liaison with university registrars, bonafide acceptance certification, airport pickup logistics, hostel accommodations, and Foreigners Registration (FRRO).
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-700 font-medium">{BRAND.contacts.india.address}</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a 
                  href={`tel:${BRAND.contacts.india.phoneRaw}`}
                  className="font-mono font-bold text-blue-700 hover:underline"
                >
                  {BRAND.contacts.india.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('india', 'Hello Myers Global Pathway HQ, I want to verify admissions requirements for 2026 intake.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Contact India Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* Global Student Corridor Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to begin your international journey?
            </h4>
            <p className="text-xs sm:text-sm text-red-100 font-normal">
              2026 academic admissions are currently open. Secure your university offer letter today.
            </p>
          </div>

          <button
            onClick={onOpenApplication}
            className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>APPLY TODAY</span>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
