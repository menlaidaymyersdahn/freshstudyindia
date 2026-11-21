import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ApplicationCTAProps {
  onOpenApplication: () => void;
  onContactClick: () => void;
}

export const ApplicationCTA: React.FC<ApplicationCTAProps> = ({
  onOpenApplication,
  onContactClick
}) => {
  return (
    <section
      id="apply-now"
      className="py-16 lg:py-24 bg-[#F7F5F0] text-[#181A1F] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl bg-[#EFECE4] border border-[#181A1F]/[0.08] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">

          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#181A1F] leading-[1.15]">
              Submit your academic profile for review
            </h2>
            <p className="text-base text-[#4F535C] max-w-2xl leading-relaxed">
              Share your educational background and preferred course of study. Our admissions team reviews your qualifications and responds with matching Indian university options and next steps.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
            <button
              type="button"
              onClick={onOpenApplication}
              className="px-6 py-3 rounded-lg bg-[#A63A24] hover:bg-[#8C2F1C] text-white text-sm font-medium transition-ui inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start your application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="px-6 py-3 rounded-lg bg-white hover:bg-[#F7F5F0] text-[#181A1F] border border-[#181A1F]/[0.14] text-sm font-medium transition-ui cursor-pointer"
            >
              Speak with an advisor
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
