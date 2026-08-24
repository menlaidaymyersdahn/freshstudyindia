import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ClipboardList,
  FileText,
  ShieldCheck,
  Plane,
  FileCheck,
  MessageCircle
} from 'lucide-react';
import { PROCESS_STEPS, getWhatsAppLink } from '../lib/constants';

interface ApplicationProcessProps {
  onOpenApplication: (stepName?: string) => void;
  onNavigateHome?: () => void;
}

export const ApplicationProcess: React.FC<ApplicationProcessProps> = ({ 
  onOpenApplication,
  onNavigateHome
}) => {
  return (
    <div className="pt-32 pb-24 bg-[#FAFCFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            {onNavigateHome ? (
              <button 
                onClick={onNavigateHome}
                className="hover:text-blue-700 transition cursor-pointer"
              >
                Home
              </button>
            ) : (
              <span>Home</span>
            )}
            <span>/</span>
            <span className="text-blue-700">Application Process</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>8-Stage Application Roadmap</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Your Journey to Study in India Unfolds
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A transparent, linear 8-step roadmap from initial transcript evaluation in your home country to receiving your visa, arriving in India, and checking into your campus hostel.
          </p>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
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

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  {item.step <= 3 ? 'Consultation & Planning' : item.step <= 6 ? 'Admissions Board' : 'Embassy & Travel'}
                </span>
                <button
                  onClick={() => onOpenApplication(`Step ${item.step}: ${item.title}`)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Required Documents Checklist Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <FileCheck className="w-4 h-4" />
              <span>Admissions Preparation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Standard Document Checklist for Admissions & Student Visa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Have these documents ready for verification when submitting your application:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">1. High School Transcripts / Certificate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                WASSCE, WAEC, KCSE, CBSE, A-Levels, or equivalent national secondary school certificate with subject score breakdown.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">2. Valid International Passport</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear scan of the passport data page with minimum 6 months validity from expected travel date.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">3. Bachelor Credentials (PG Only)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official Degree Certificate and semester-wise transcripts for Master's or Postgraduate applicants.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">4. Passport-Size Photographs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recent white-background passport-standard photographs (35mm x 45mm or standard 2x2 in).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">5. University Bonafide & Offer Letter</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procured directly through Myers Global Pathways from the university registrar for the embassy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">6. Financial / Sponsor Proof</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank statement or sponsor affidavit covering tuition and living expenses for visa clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action strip */}
        <div className="p-8 rounded-2xl bg-blue-50/80 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Ready to begin Stage 1?
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
              <span>Begin Step 1 Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
