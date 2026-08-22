import React from 'react';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  Award,
  Globe2,
  CheckCircle2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface AfricaToIndiaProps {
  onOpenApplication: () => void;
}

export const AfricaToIndia: React.FC<AfricaToIndiaProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F8FAFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Dedicated Africa Admissions Corridor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060F1E] tracking-tight leading-tight">
            WEST AFRICA TO INDIA.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-600">
              A PROVEN STUDENT BRIDGE.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            With direct counselors stationed in Monrovia, Liberia and university coordinators in India, we ensure international students experience a seamless transition from their home community to world-class Indian campuses.
          </p>
        </div>

        {/* Visual Route Corridor Graphic Card (Clean Graphic UI) */}
        <div className="bg-gradient-to-br from-[#060F1E] via-[#0B1E38] to-[#12233E] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-72 h-32 bg-red-600/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-32 bg-blue-600/15 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Origin: West Africa Hub */}
            <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇱🇷</span>
                <span className="text-[10px] font-mono font-bold text-rose-300 uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30">
                  West Africa Hub
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Monrovia, Liberia</h3>
              <p className="text-xs text-slate-300">
                In-person academic evaluation, WAEC / WASSCE result verification, and student visa file preparation.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-rose-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{BRAND.contacts.liberia.phoneDisplay}</span>
              </div>
            </div>

            {/* Flight Flight Corridor Track Indicator */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center py-4 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 border border-white/15">
                <Plane className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>International Flight Route</span>
              </div>

              <div className="w-full flex items-center justify-center gap-2 text-slate-400 text-xs font-mono">
                <span className="h-0.5 flex-1 bg-gradient-to-r from-red-500 via-rose-400 to-sky-400" />
                <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-bold text-white">6,000+ Miles</span>
                <span className="h-0.5 flex-1 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-500" />
              </div>

              <p className="text-[11px] text-slate-300 max-w-xs">
                Direct Airport Meet-and-Greet upon international landing in India
              </p>
            </div>

            {/* Destination: India University Hub */}
            <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇮🇳</span>
                <span className="text-[10px] font-mono font-bold text-sky-300 uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                  Destination Hub
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Accredited India Campuses</h3>
              <p className="text-xs text-slate-300">
                Delhi NCR, Bangalore, Chennai, Punjab & Pune. Complete campus settlement, hostel check-in & FRRO support.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-sky-300">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{BRAND.contacts.india.phoneDisplay}</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars of West Africa to India Care */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black">
              1
            </div>
            <h4 className="text-sm font-bold text-[#060F1E]">Local In-Person Guidance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meet counselors in Monrovia who understand the local education system, high school certificates, and student needs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
              2
            </div>
            <h4 className="text-sm font-bold text-[#060F1E]">Indian Visa Verification</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete review of your visa files, financial affidavits, and letters before submission to the Indian Embassy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
              3
            </div>
            <h4 className="text-sm font-bold text-[#060F1E]">Airport Arrival Team</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We greet you directly at airport arrival in India, transport you safely to campus, and notify your parents back home.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              4
            </div>
            <h4 className="text-sm font-bold text-[#060F1E]">On-Ground Settling</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assistance with local SIM cards, hostel accommodation, student orientation, and mandatory police FRRO paperwork.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
