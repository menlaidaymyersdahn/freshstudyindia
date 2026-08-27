import React from 'react';
import { APPLICATION_JOURNEY } from '../config/company';
import { ArrowUpRight, CheckCircle, Compass } from 'lucide-react';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from './ScrollReveal';

interface ApplicationJourneyProps {
  onOpenApplication: () => void;
}

export const ApplicationJourney: React.FC<ApplicationJourneyProps> = ({ onOpenApplication }) => {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#EBF3FC] text-slate-900 border-b border-sky-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Process Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            From Ambition to Arrival
          </h2>
          <p className="text-base text-slate-700 mt-2 max-w-2xl leading-relaxed font-normal">
            A clear, transparent seven-step progression guiding international students from initial course exploration to campus arrival in India.
          </p>
        </ScrollReveal>

        {/* Timeline Visual Structure */}
        <div className="relative">
          
          {/* Horizontal Desktop Progression Line */}
          <div className="hidden lg:block absolute top-8 left-6 right-6 h-0.5 bg-sky-300 z-0" />

          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
            {APPLICATION_JOURNEY.map((item, index) => (
              <ScrollStaggerItem key={item.step}>
                <div 
                  className="h-full p-5 rounded-3xl bg-white border border-sky-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 shadow-sm text-left flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Number Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-blue-950 font-mono font-bold text-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      {item.step}
                    </div>

                    {/* Title & Core Subtitle */}
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm font-bold text-slate-950 mt-1 leading-snug">
                      {item.description}
                    </p>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                      {item.details}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
                    <span>Phase {index + 1}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>

        </div>

        {/* Callout Strip */}
        <ScrollReveal delay={0.2} className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
              Need guidance identifying which step you are currently on?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our advisors can evaluate your existing transcripts and documents within 24–48 hours.
            </p>
          </div>

          <button
            onClick={onOpenApplication}
            className="shrink-0 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Begin Step 01</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
