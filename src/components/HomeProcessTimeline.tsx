import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeProcessTimelineProps {
  onOpenApplication: () => void;
}

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'Speak with our admissions desk to review your WAEC/WASSCE, high school, or Bachelor’s credentials, academic interests, and tuition budget.'
  },
  {
    step: '02',
    title: 'University Selection and Application',
    description:
      'Shortlist matching English-taught degree programs in India, prepare your verified supporting documents, and submit a complete application package.'
  },
  {
    step: '03',
    title: 'Admission Offer and Visa Preparation',
    description:
      'Receive your official provisional university offer letter, review fee details, and assemble your Indian student visa documentation checklist.'
  },
  {
    step: '04',
    title: 'Arrival and Campus Settlement',
    description:
      'Complete your pre-departure briefing, travel to India, settle into campus hostel accommodation, and finish university registration.'
  }
];

export const HomeProcessTimeline: React.FC<HomeProcessTimelineProps> = ({
  onOpenApplication
}) => {
  return (
    <section
      id="admissions-process"
      className="py-16 lg:py-24 bg-[#0B1F3A] text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#F0C86E]">
              How the Admissions Process Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white leading-[1.15] text-balance">
              Four Clear Steps From First Consultation to Campus Arrival
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every stage is transparent, documented, and supported by our Monrovia and India advisory desks so students and parents always know what comes next.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenApplication}
            className="self-start lg:self-end px-6 py-3 rounded-lg bg-[#C5922E] hover:bg-[#D4A13B] text-[#081528] text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Begin Step 01 Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Horizontal Timeline (lg+) */}
        <div className="hidden lg:block relative pt-4">
          {/* Continuous Horizontal Connecting Rail */}
          <div
            className="absolute top-[38px] left-12 right-12 h-px bg-white/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((item) => (
              <div key={item.step} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#132E54] border border-[#C5922E]/60 text-[#F0C86E] font-display font-bold text-sm tabular-nums flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.04] border border-white/12 space-y-2.5 h-full">
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (< lg) */}
        <div className="lg:hidden relative space-y-6 pl-5">
          {/* Vertical Spine */}
          <div
            className="absolute top-3 bottom-3 left-[19px] w-px bg-white/20"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="relative pl-8">
              <div className="absolute left-[-19px] top-1 w-10 h-10 rounded-lg bg-[#132E54] border border-[#C5922E]/70 text-[#F0C86E] font-display font-bold text-xs tabular-nums flex items-center justify-center">
                {item.step}
              </div>

              <div className="p-5 rounded-xl bg-white/[0.04] border border-white/12 space-y-2">
                <h3 className="font-display text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProcessTimeline;
