import React from 'react';
import { WHY_STUDY_IN_INDIA } from '../config/company';
import { GraduationCap, Wallet, BookOpen, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem, TextScrollReveal } from './ScrollReveal';

interface WhyStudyInIndiaProps {
  onOpenApplication: () => void;
}

export const WhyStudyInIndia: React.FC<WhyStudyInIndiaProps> = ({ onOpenApplication }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'BadgeCheck': return <Wallet className="w-5 h-5 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Globe': return <Globe className="w-5 h-5 text-amber-600" />;
      default: return <GraduationCap className="w-5 h-5 text-blue-600" />;
    }
  };

  const primaryPillars = WHY_STUDY_IN_INDIA.slice(0, 3);
  const secondaryPillars = WHY_STUDY_IN_INDIA.slice(3, 6);

  return (
    <section id="why-india" className="py-20 lg:py-28 bg-gradient-to-b from-[#E2EFFD] via-[#EBF4FE] to-[#E5F1FC] text-slate-900 scroll-mt-24 border-b border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Educational Destination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            <TextScrollReveal text="Why Study in India?" />
          </h2>
          <p className="text-base text-slate-700 mt-3 max-w-2xl leading-relaxed font-normal">
            <TextScrollReveal delay={0.12} text="India offers a compelling combination of academic rigor, accessible living expenses, and an expansive spectrum of recognized degree programs taught in English." />
          </p>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Top 3 Core Pillars */}
          <ScrollStaggerContainer className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {primaryPillars.map((pillar) => (
              <ScrollStaggerItem key={pillar.id}>
                <div 
                  className="p-6 rounded-2xl bg-white border border-sky-200 hover:border-blue-400 hover:shadow-md transition-all text-left shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 shrink-0">
                      {getIcon(pillar.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">{pillar.title}</h3>
                      <p className="text-[11px] font-bold text-blue-700">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                    {pillar.description}
                  </p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>

          {/* Center Column: Editorial Campus Photography */}
          <ScrollReveal delay={0.15} className="lg:col-span-4 relative rounded-3xl overflow-hidden border-2 border-white shadow-xl min-h-[380px] flex flex-col justify-end bg-white group">
            <img 
              src="/DSC_9531.jpeg" 
              alt="Myers Global Pathways international students celebrating academic success"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="relative z-10 p-6 text-left text-white">
              <span className="px-3 py-1 rounded-md bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Higher Education Hub
              </span>
              <h4 className="text-lg font-bold text-white mt-2">
                Expanding Horizons in Indian Academia
              </h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Connect with accredited universities offering modern faculties, campus hostels, and comprehensive student support.
              </p>

              <button
                onClick={onOpenApplication}
                className="mt-4 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Inquire About Admissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: Secondary 3 Pillars */}
          <ScrollStaggerContainer delayChildren={0.2} className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {secondaryPillars.map((pillar) => (
              <ScrollStaggerItem key={pillar.id}>
                <div 
                  className="p-6 rounded-2xl bg-white border border-sky-200 hover:border-blue-400 hover:shadow-md transition-all text-left shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 shrink-0">
                      {getIcon(pillar.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">{pillar.title}</h3>
                      <p className="text-[11px] font-bold text-blue-700">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                    {pillar.description}
                  </p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>

        </div>

      </div>
    </section>
  );
};
