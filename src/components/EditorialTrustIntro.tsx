import React from 'react';
import { ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

interface EditorialTrustIntroProps {
  onOpenApplication: () => void;
  onExploreServices: () => void;
}

export const EditorialTrustIntro: React.FC<EditorialTrustIntroProps> = ({
  onOpenApplication,
  onExploreServices
}) => {
  return (
    <section id="overview" className="py-20 lg:py-28 bg-[#EBF3FC] text-slate-900 border-b border-sky-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Consultancy Overview</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Your Journey to India Starts With the Right Guidance.
          </h2>
        </div>

        {/* Editorial Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Rich Editorial Photography */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-white">
              <img
                src="/DSC_9531.jpeg"
                alt="Myers Global Pathways international student graduates in India"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-sky-200 text-left shadow-md">
                <p className="text-xs font-bold text-slate-900">
                  Dedicated International Advisory
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-medium">
                  Navigating academic standards, credential evaluations, and embassy requirements with clarity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Scope */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Choosing a university and preparing to study in another country can be complicated. International applicants face varying entry prerequisites, unfamiliar academic calendars, documentation formatting standards, and student visa procedures.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Myers Global Pathways</strong> helps students understand their options, choose suitable programs, prepare their applications, organize documentation, and navigate their journey toward studying in India.
            </p>

            {/* Core Advisory Breakdown */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900">Program & University Fit</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Careful assessment of your academic credentials and budget against recognized degree programs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900">Document & Visa Clarity</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Detailed checklists for transcript attestation, offer letters, and student visa submissions.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenApplication}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
              >
                Start Your Application
              </button>

              <button
                onClick={onExploreServices}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:text-blue-900 bg-white hover:bg-sky-50 border border-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Learn How We Help</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
