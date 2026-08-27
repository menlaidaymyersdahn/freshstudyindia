import React from 'react';
import { CORE_PRINCIPLES } from '../config/company';
import { ShieldCheck, HeartHandshake, Compass, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-[#E2EFFD] via-[#EBF3FD] to-[#E2EEFA] text-slate-900 scroll-mt-24 border-b border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>About Myers Global Pathways</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Guidance Built Around Your Journey.
          </h2>
          
          <p className="text-base text-slate-700 mt-3 leading-relaxed font-normal">
            Myers Global Pathways is an international education consultancy committed to helping international students explore and access higher education opportunities in India through structured, transparent, and personalized advisory.
          </p>
        </div>

        {/* Editorial Split: Photography + Core Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Photo Frame */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border-2 border-white bg-white shadow-xl">
              <img
                src="/DSC_9531.jpeg"
                alt="Myers Global Pathways international student advisory and mentorship"
                className="w-full h-[400px] object-cover object-center"
                loading="lazy"
              />
              <div className="p-6 bg-white border-t border-sky-100 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Our Mission
                </p>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-normal">
                  To provide accessible, honest, and comprehensive admissions guidance that empowers international students to pursue their academic ambitions with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Core Advisory Principles */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {CORE_PRINCIPLES.map((principle, index) => (
              <div 
                key={principle.title}
                className="p-5 rounded-2xl bg-white border border-sky-200 hover:border-blue-400 hover:shadow-md transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-blue-800 text-xs font-bold shrink-0">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-950">{principle.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pl-10 leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
