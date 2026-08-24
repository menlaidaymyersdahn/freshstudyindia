import React from 'react';
import { CORE_PRINCIPLES } from '../config/company';
import { ShieldCheck, HeartHandshake, Compass, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0A1128] text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>About Myers Global Pathways</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Guidance Built Around Your Journey.
          </h2>
          
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Myers Global Pathways is an international education consultancy committed to helping international students explore and access higher education opportunities in India through structured, transparent, and personalized advisory.
          </p>
        </div>

        {/* Editorial Split: Photography + Core Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Photo Frame */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85"
                alt="International students engaged in collaborative study session"
                className="w-full h-[400px] object-cover object-center"
                loading="lazy"
              />
              <div className="p-6 bg-slate-900/95 border-t border-slate-800 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Our Mission
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
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
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-bold text-white">{principle.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-10 leading-relaxed">
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
