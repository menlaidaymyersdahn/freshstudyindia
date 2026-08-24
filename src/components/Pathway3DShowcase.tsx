import React from 'react';
import { ThreePathwayGlobe } from './ThreePathwayGlobe';
import { TiltCard3D } from './TiltCard3D';
import { 
  GraduationCap, 
  ShieldCheck, 
  Plane, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Building2,
  DollarSign
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface Pathway3DShowcaseProps {
  onOpenApplication: (programTitle?: string) => void;
}

export const Pathway3DShowcase: React.FC<Pathway3DShowcaseProps> = ({ onOpenApplication }) => {
  return (
    <section id="interactive-3d-pathway" className="relative py-24 bg-[#030914] text-white overflow-hidden">
      {/* Background 3D Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/15 via-rose-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-xs font-bold text-sky-400 mb-4 shadow-lg shadow-blue-950/50">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="uppercase tracking-widest text-[11px]">3D Interactive Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Explore Your International <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-400">
              Student Corridor
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Interact with the 3D globe to trace direct admissions pathways connecting African departure desks with verified Indian higher education admissions, bonafide visa dossiers, and airport arrival support.
          </p>
        </div>

        {/* 1. Interactive 3D Globe Component */}
        <div className="mb-14">
          <ThreePathwayGlobe />
        </div>

        {/* 2. Key Pathway Highlights & Assurances (3D Tilt Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard3D maxTilt={6} perspective={1000} className="h-full">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition shadow-xl flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800/60 text-rose-400 flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Registrar Bonafide Letters
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Direct official admission letters with verified university stamp and seal required for Indian Embassy student visa appointments.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Embassy Verified</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} perspective={1000} className="h-full">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition shadow-xl flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Direct University Tuition
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Zero hidden agent markups or inflated package rates. All tuition and hostel fees are invoiced directly by accredited universities.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Transparent Official Billing</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} perspective={1000} className="h-full">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition shadow-xl flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Airport Arrival & FRRO Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Dedicated airport reception staff, direct campus transfer, hostel room handover, Indian SIM card setup, and police registration assistance.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Complete Ground Support</span>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Action Button Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-extrabold text-white">
              Ready to begin your higher education journey?
            </h4>
            <p className="text-xs text-slate-400">
              Submit your academic transcripts or contact our admissions desk directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => onOpenApplication()}
              className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink('india', 'Hello Myers Global Pathway, I want to talk to an advisor regarding 2026 admissions.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition"
            >
              Talk to Advisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
