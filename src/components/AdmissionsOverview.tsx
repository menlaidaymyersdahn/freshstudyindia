import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Users, 
  CheckCircle2, 
  Globe2,
  FileText,
  Compass,
  Laptop
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface AdmissionsOverviewProps {
  onOpenApplication: () => void;
}

export const AdmissionsOverview: React.FC<AdmissionsOverviewProps> = ({ onOpenApplication }) => {
  const [indiaTime, setIndiaTime] = useState('');
  const [monroviaTime, setMonroviaTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // IST is UTC+5:30
      const istString = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      // Monrovia GMT is UTC+0
      const gmtString = now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setIndiaTime(istString);
      setMonroviaTime(gmtString);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="study-in-india" className="py-24 sm:py-32 bg-[#F8FAFD] text-slate-900 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>2026 Academic Season</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            START YOUR NEXT CHAPTER.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Studying in India provides high-quality education at globally competitive tuition rates. We handle every detail — from initial academic evaluation to university bonafide letters and airport arrival.
          </p>
        </div>

        {/* High-End Admissions Dashboard */}
        <div className="rounded-3xl bg-white border border-sky-100 p-6 sm:p-10 shadow-[0_15px_40px_rgba(15,23,42,0.06)] relative overflow-hidden">
          
          {/* Top Status Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  ACTIVE INTAKE • 2026 ADMISSIONS DESK
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Streamlined International Student Path
              </h3>
            </div>

            {/* Timezones & Telemetry Hubs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
              <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                <span className="text-base">🇮🇳</span>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">New Delhi (IST)</p>
                  <p className="font-bold text-blue-700">{indiaTime || 'IST Live'}</p>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                <span className="text-base">🇱🇷</span>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Monrovia (GMT)</p>
                  <p className="font-bold text-rose-700">{monroviaTime || 'GMT Live'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Feature Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            
            {/* Pillar 1: Verified Universities */}
            <div className="p-6 rounded-2xl bg-sky-50/50 hover:bg-sky-50 border border-sky-100 hover:border-sky-300 transition-all duration-300 group shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-white text-blue-600 border border-sky-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Step 01</span>
              <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-2">
                Accredited Universities
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct matching with UGC and NAAC grade recognized Indian institutions tailored to your career aspirations.
              </p>
            </div>

            {/* Pillar 2: Direct Bonafide */}
            <div className="p-6 rounded-2xl bg-rose-50/40 hover:bg-rose-50/80 border border-red-100 hover:border-red-300 transition-all duration-300 group shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-white text-rose-600 border border-red-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">Step 02</span>
              <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-2">
                Official Bonafide Letters
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Legitimate registrar-signed admission documentation required for Indian Embassy student visa appointments.
              </p>
            </div>

            {/* Pillar 3: Visa Dossier */}
            <div className="p-6 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50/80 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 group shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-white text-emerald-600 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Step 03</span>
              <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-2">
                Visa Guidance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Checklist preparation, financial affidavit guidance, and consular interview readiness support.
              </p>
            </div>

            {/* Pillar 4: Arrival & Settlement */}
            <div className="p-6 rounded-2xl bg-amber-50/40 hover:bg-amber-50/80 border border-amber-100 hover:border-amber-300 transition-all duration-300 group shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Step 04</span>
              <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-2">
                On-Ground Reception
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Airport meeting in India, campus transit, hostel allocation, local SIM card, and mandatory FRRO registration.
              </p>
            </div>

          </div>

          {/* Bottom Bar: Action Strip */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero hidden agency markups • All tuition fees paid directly to university bank accounts</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
              >
                <span>APPLY WITH MYERS GLOBAL PATHWAY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
