import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  FileCheck2, 
  Wallet, 
  Plane, 
  GraduationCap, 
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      id: 'ugc',
      badge: 'Accreditation',
      title: 'UGC & NAAC Accredited',
      desc: 'Government Recognized Universities in India',
      icon: <Building2 className="w-4 h-4 text-blue-600" />,
      accent: 'border-blue-200 bg-blue-50 text-blue-700'
    },
    {
      id: 'bonafide',
      badge: 'Visa Verification',
      title: 'Official Bonafide Letters',
      desc: 'Direct Registrar Documentation for Visa',
      icon: <FileCheck2 className="w-4 h-4 text-rose-600" />,
      accent: 'border-red-200 bg-red-50 text-rose-700'
    },
    {
      id: 'transparent',
      badge: 'Direct Payment',
      title: 'Zero Upfront Secret Fees',
      desc: 'Direct Tuition Payment to University',
      icon: <Wallet className="w-4 h-4 text-emerald-600" />,
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    },
    {
      id: 'arrival',
      badge: 'Full Settlement',
      title: 'Full On-Ground Reception',
      desc: 'Airport Pickup, SIM & FRRO Support',
      icon: <Plane className="w-4 h-4 text-amber-600" />,
      accent: 'border-amber-200 bg-amber-50 text-amber-700'
    },
    {
      id: 'waec',
      badge: 'Eligibility',
      title: 'WAEC & WASSCE Accepted',
      desc: 'High School & Transfer Credit Evaluations',
      icon: <GraduationCap className="w-4 h-4 text-purple-600" />,
      accent: 'border-purple-200 bg-purple-50 text-purple-700'
    }
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="relative py-8 bg-[#EBF3FC] border-y border-sky-100 overflow-hidden">
      
      {/* Subtle Background Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Edge Gradient Masks to create smooth fade-in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#EBF3FC] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#EBF3FC] to-transparent z-10 pointer-events-none" />

      {/* Continuous Marquee Ticker */}
      <div className="animate-marquee flex items-center gap-4 sm:gap-6">
        {marqueeList.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="group shrink-0 flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-sky-100 hover:border-sky-200 shadow-xs transition-all duration-200 cursor-default"
          >
            {/* Icon Container */}
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {item.icon}
            </div>

            {/* Content */}
            <div className="space-y-0.5 min-w-[200px] max-w-[280px]">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border ${item.accent}`}>
                  {item.badge}
                </span>
              </div>
              <h4 className="text-xs font-black text-slate-900 tracking-tight leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-normal truncate">
                {item.desc}
              </p>
            </div>

            <div className="text-slate-300 pl-2">
              •
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
