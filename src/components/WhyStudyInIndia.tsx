import React from 'react';
import { WHY_STUDY_IN_INDIA } from '../config/company';
import { GraduationCap, Wallet, BookOpen, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';

interface WhyStudyInIndiaProps {
  onOpenApplication: () => void;
}

export const WhyStudyInIndia: React.FC<WhyStudyInIndiaProps> = ({ onOpenApplication }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-500" />;
      case 'BadgeCheck': return <Wallet className="w-5 h-5 text-emerald-500" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-sky-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-500" />;
      case 'Users': return <Users className="w-5 h-5 text-rose-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-amber-500" />;
      default: return <GraduationCap className="w-5 h-5 text-amber-500" />;
    }
  };

  const primaryPillars = WHY_STUDY_IN_INDIA.slice(0, 3);
  const secondaryPillars = WHY_STUDY_IN_INDIA.slice(3, 6);

  return (
    <section id="why-india" className="py-20 lg:py-28 bg-[#0A1128] text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Educational Destination
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Study in India?
          </h2>
          <p className="text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
            India offers a compelling combination of academic rigor, accessible living expenses, and an expansive spectrum of recognized degree programs taught in English.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition (Avoiding 6 identical cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Top 3 Core Pillars */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {primaryPillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-slate-800/80 shrink-0">
                    {getIcon(pillar.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                    <p className="text-[11px] font-medium text-amber-400/90">{pillar.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Column: Editorial Campus Photography */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-slate-800 min-h-[380px] flex flex-col justify-end bg-slate-900 group">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85" 
              alt="International students celebrating university graduation ceremony"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/40 to-transparent" />

            <div className="relative z-10 p-6 text-left">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                Higher Education Hub
              </span>
              <h4 className="text-lg font-bold text-white mt-2">
                Expanding Horizons in Indian Academia
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect with accredited universities offering modern faculties, campus hostels, and comprehensive student support.
              </p>

              <button
                onClick={onOpenApplication}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Inquire About Admissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Secondary 3 Pillars */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {secondaryPillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-slate-800/80 shrink-0">
                    {getIcon(pillar.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                    <p className="text-[11px] font-medium text-amber-400/90">{pillar.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
