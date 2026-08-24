import React from 'react';
import { APPLICATION_JOURNEY } from '../config/company';
import { ArrowUpRight, CheckCircle, Compass } from 'lucide-react';

interface ApplicationJourneyProps {
  onOpenApplication: () => void;
}

export const ApplicationJourney: React.FC<ApplicationJourneyProps> = ({ onOpenApplication }) => {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#FAFCFF] text-slate-900 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Process Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            From Ambition to Arrival
          </h2>
          <p className="text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            A clear, transparent seven-step progression guiding international students from initial course exploration to campus arrival in India.
          </p>
        </div>

        {/* Timeline Visual Structure */}
        <div className="relative">
          
          {/* Horizontal Desktop Progression Line */}
          <div className="hidden lg:block absolute top-8 left-6 right-6 h-0.5 bg-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
            {APPLICATION_JOURNEY.map((item, index) => (
              <div 
                key={item.step}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400/80 transition-all duration-200 shadow-sm text-left flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    {item.step}
                  </div>

                  {/* Title & Core Subtitle */}
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                    {item.description}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-amber-700 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Step {index + 1} of 7</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Action Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Take Step 01: Discover & Apply Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Connect with Myers Global Pathways advisors to begin your preliminary transcript evaluation and university selection.
            </p>
          </div>

          <button
            onClick={onOpenApplication}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Start Your Application</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
};
