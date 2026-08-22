import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface WhyUsProps {
  onOpenApplication: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenApplication }) => {
  const pillars = [
    {
      icon: <Building2 className="w-6 h-6 text-sky-400" />,
      tag: 'University Liaison',
      title: 'Direct University Representation',
      desc: 'We do not pass your application through layers of commission agents. We work directly with recognized registrars in India, ensuring your admission letter is genuine and verifiable.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      tag: 'Full Transparency',
      title: 'No Hidden or Secret Fees',
      desc: 'All tuition fees are paid directly to the university official account. We maintain 100% financial clarity so students and parents are never surprised by arbitrary charges.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-400" />,
      tag: 'India Ground Presence',
      title: 'Real On-Ground Support in India',
      desc: 'Most consultancies disappear once your flight takes off. We maintain dedicated advisors stationed in India who meet you at the airport and assist with housing, food, and local settling.'
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#060F1E] text-white relative overflow-hidden">
      {/* Background Decorative Mesh & Red/Blue Glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-blue-600/12 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-rose-600/12 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Why Choose Fresh Study India</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            TRUSTED ADMISSIONS ADVISORY.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-sky-400">
              ZERO FALSE PROMISES.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            International education is a life-changing investment. We protect students and families with truthful guidance, genuine accreditations, and real support in India.
          </p>
        </div>

        {/* 3 Large Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-white/[0.04] rounded-3xl p-8 border border-white/10 hover:border-red-400/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>

                <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wide block mb-2">
                  {pillar.tag}
                </span>

                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-sky-400 group-hover:text-rose-300 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Fresh Study Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0B1E38] to-[#12233E] border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center lg:text-left">
            <h4 className="text-xl font-black text-white">
              Have questions about university fees or living costs in India?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our counselor in Monrovia, Liberia or our university liaison in India.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BRAND.contacts.india.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <span>🇮🇳 Call India: {BRAND.contacts.india.phoneDisplay}</span>
            </a>

            <a
              href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-red-600/20"
            >
              <span>🇱🇷 Call Liberia: {BRAND.contacts.liberia.phoneDisplay}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
