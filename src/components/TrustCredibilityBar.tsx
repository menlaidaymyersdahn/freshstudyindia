import React from 'react';
import { Compass, Building2, Receipt, ShieldCheck } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Compass,
    title: 'Personalized Admissions Guidance',
    description:
      'One-on-one evaluation of your academic credentials, degree goals, and preferred study level before choosing a program.'
  },
  {
    icon: Building2,
    title: 'Direct University Connections',
    description:
      'Structured application submissions and direct admissions liaison with recognized higher education institutions in India.'
  },
  {
    icon: Receipt,
    title: 'Transparent Tuition and Hostel Fees',
    description:
      'Clear upfront breakdown of estimated tuition schedules, campus hostel accommodation, and monthly living expenses.'
  },
  {
    icon: ShieldCheck,
    title: 'Documentation and Visa Assistance',
    description:
      'Step-by-step support for academic transcripts, provisional offer letters, Indian student visa checklists, and pre-departure readiness.'
  }
];

export const TrustCredibilityBar: React.FC = () => {
  return (
    <section
      aria-label="Core advisory commitments"
      className="bg-white border-b border-slate-200/80 py-10 sm:py-12 lg:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#F4F6F9]/75 border border-slate-200/80 text-left transition-ui hover:border-[#0B1F3A]/25"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A] text-[#E5B95C] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="font-display text-[15px] font-bold text-[#0B1F3A] leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustCredibilityBar;
