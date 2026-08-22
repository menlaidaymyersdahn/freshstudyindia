import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Wallet, 
  PhoneCall, 
  Building2, 
  Users,
  Award
} from 'lucide-react';
import { getWhatsAppLink } from '../lib/constants';

interface WhyUsProps {
  onOpenApplication: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenApplication }) => {
  const comparisons = [
    {
      feature: 'Tuition Fee Payment',
      freshStudy: 'Direct student payment to accredited university bank account with official receipts',
      unverified: 'Demands personal cash or third-party agent accounts with huge secret markups',
      icon: <Wallet className="w-4 h-4 text-emerald-600" />
    },
    {
      feature: 'Admission & Bonafide Letter',
      freshStudy: 'Issued directly by university registrar with verifiable accreditation numbers',
      unverified: 'Fabricated or unaccredited college letters rejected by Indian embassies',
      icon: <Building2 className="w-4 h-4 text-rose-600" />
    },
    {
      feature: 'Dual Physical Desks',
      freshStudy: 'Dedicated admissions offices in Monrovia, Liberia 🇱🇷 and India 🇮🇳 for total student safety',
      unverified: 'Anonymous online agents who vanish once money is transferred',
      icon: <Users className="w-4 h-4 text-blue-600" />
    },
    {
      feature: 'Airport & FRRO Settlement',
      freshStudy: 'Met directly at Indian airport, transported to campus hostel, assisted with SIM & FRRO',
      unverified: 'Student stranded alone at airport with no local contacts or accommodation',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F8FAFD] text-slate-900 relative overflow-hidden bg-grid-dense">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-400/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Honest Admissions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            ZERO FALSE PROMISES.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            International education is an important investment for you and your family. Here is how Fresh Study India guarantees transparency and integrity.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="rounded-3xl bg-white border border-sky-100 p-6 sm:p-10 shadow-lg space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-xs font-mono font-bold uppercase text-slate-500">
            <div className="md:col-span-4">Admission Pillar</div>
            <div className="md:col-span-4 text-emerald-700">Fresh Study India Standard</div>
            <div className="md:col-span-4 text-rose-700">Unverified Agents</div>
          </div>

          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition items-center"
              >
                {/* Feature Title */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">{item.feature}</span>
                </div>

                {/* Fresh Study India (Positive) */}
                <div className="md:col-span-4 flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {item.freshStudy}
                  </span>
                </div>

                {/* Unverified Agents (Negative) */}
                <div className="md:col-span-4 flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-red-200/60">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-rose-950 font-medium leading-relaxed">
                    {item.unverified}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Award className="w-4 h-4 text-rose-600" />
              <span>Full compliance with UGC, AICTE & Association of Indian Universities (AIU).</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
              >
                <span>APPLY WITH FRESH STUDY INDIA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
