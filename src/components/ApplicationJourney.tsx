import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  Plane, 
  GraduationCap,
  Building2,
  ShieldCheck,
  Compass,
  MessageCircle
} from 'lucide-react';
import { APPLICATION_JOURNEY_STEPS, getWhatsAppLink } from '../lib/constants';

interface ApplicationJourneyProps {
  onOpenApplication: (stepName?: string) => void;
  onNavigateHome?: () => void;
}

export const ApplicationJourney: React.FC<ApplicationJourneyProps> = ({
  onOpenApplication,
  onNavigateHome
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = APPLICATION_JOURNEY_STEPS[activeStepIndex];

  return (
    <section 
      id="journey"
      className="py-24 sm:py-32 bg-[#FAFAF8] text-[#0A1120] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D99B26]">
            <span>Admissions Roadmap</span>
            <span className="w-8 h-[1px] bg-[#D99B26]" />
          </div>

          <h2 
            id="journey-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]"
          >
            Your Application Journey
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A clear, 7-step pathway from your first consultation to your classroom arrival in India.
          </p>
        </div>

        {/* Step Indicator Navigation Bar (Horizontal on Desktop) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {APPLICATION_JOURNEY_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              return (
                <button
                  key={step.step}
                  id={`journey-step-btn-${step.step}`}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] border ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : isPast
                        ? 'bg-amber-50/60 text-slate-800 border-amber-200/80 hover:bg-amber-50'
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-amber-400' : isPast ? 'text-[#D99B26]' : 'text-slate-400'
                    }`}>
                      0{step.step}
                    </span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-[#D99B26]" />}
                  </div>

                  <span className={`text-xs sm:text-sm font-bold truncate ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Big Narrative Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#D99B26]">
                <span>Step {activeStep.step} of 7</span>
                <span>•</span>
                <span>{activeStep.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 leading-tight">
                {activeStep.title}
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {activeStep.description}
              </p>

              {/* Step Checklist Items */}
              <div className="pt-4 space-y-3 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Actions During This Step
                </p>
                <div className="space-y-2.5">
                  {activeStep.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-[#D99B26] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation & Action Footer */}
            <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous Step
                </button>
                <button
                  disabled={activeStepIndex === APPLICATION_JOURNEY_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(APPLICATION_JOURNEY_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-slate-200 hover:bg-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next Step
                </button>
              </div>

              <button
                onClick={() => onOpenApplication(`Step ${activeStep.step}: ${activeStep.title}`)}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer shadow-md"
              >
                <span>Start This Step</span>
              </button>
            </div>
          </div>

          {/* Right Column: Support & Verification Box */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 border border-slate-800">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white">
                Personalized Advisor Assigned at Every Stage
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                You are never left alone to figure out complex embassy requirements or university portal errors. Your dedicated Myers Global Pathways counselor assists with:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>WAEC / WASSCE / High School equivalency checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Embassy Student Visa checklist verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Pre-departure briefing & travel arrangement support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Airport reception in Delhi, Bangalore, or Chennai</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400 font-medium">
                Have questions about your specific credentials?
              </p>
              <a
                href={getWhatsAppLink('india', 'Hello Myers Global Pathways, I have questions about the application journey and my high school documents.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat directly with admissions advisor</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
