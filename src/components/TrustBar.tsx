import React from 'react';
import { 
  Building2, 
  FileCheck, 
  ShieldCheck, 
  Users, 
  Plane, 
  Award,
  Sparkles,
  MapPin
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  const highlights = [
    {
      icon: <Building2 className="w-5 h-5 text-sky-400" />,
      accentBg: 'bg-blue-500/10 border-blue-500/20 group-hover:border-blue-400/50',
      title: 'UGC & NAAC Accredited',
      desc: 'Government Recognized Universities in India',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-rose-400" />,
      accentBg: 'bg-rose-500/10 border-rose-500/20 group-hover:border-rose-400/50',
      title: 'Official Bonafide Letters',
      desc: 'Direct Registrar Documentation for Visa',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      accentBg: 'bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-400/50',
      title: 'Zero Upfront Secret Fees',
      desc: 'Direct Tuition Payment to University',
    },
    {
      icon: <Plane className="w-5 h-5 text-amber-400" />,
      accentBg: 'bg-amber-500/10 border-amber-500/20 group-hover:border-amber-400/50',
      title: 'Full On-Ground Reception',
      desc: 'Airport Pickup, SIM & FRRO Support',
    },
  ];

  return (
    <section className="bg-[#081324] border-y border-white/10 py-8 relative overflow-hidden">
      {/* Subtle background ambient red/blue highlight glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-20 bg-blue-600/10 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-20 bg-rose-600/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 flex items-start gap-3.5 group shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-colors ${item.accentBg}`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight group-hover:text-rose-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
