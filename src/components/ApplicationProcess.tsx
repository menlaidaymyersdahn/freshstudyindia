import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { PROCESS_STEPS, getWhatsAppLink } from '../lib/constants';

interface ApplicationProcessProps {
  onOpenApplication: (stepName?: string) => void;
}

export const ApplicationProcess: React.FC<ApplicationProcessProps> = ({ onOpenApplication }) => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Step-by-Step Pathway</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Your Journey Unfolds
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A clear, organized 8-step roadmap from your first enquiry in your home country to your safe arrival at campus in India.
          </p>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#FAFCFF] border border-slate-200/80 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Step Indicator */}
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center border border-blue-100">
                    0{item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Stage {item.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-base font-bold text-slate-900 pt-1">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-400">
                  {item.step <= 3 ? 'Consultation & Planning' : item.step <= 6 ? 'Admissions Board' : 'Embassy & Travel'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action strip */}
        <div className="mt-14 p-8 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Ready to take Step 1?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your academic transcripts for an initial admissions assessment today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenApplication('Step 1: Submit an Enquiry')}
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>Begin Step 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition"
            >
              Ask a Question on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
