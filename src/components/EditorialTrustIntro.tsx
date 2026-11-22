import React, { useState } from 'react';
import { ArrowRight, Mail, MessageSquare, FileText, Search, CheckCircle2 } from 'lucide-react';
import { ApplicationStatus } from '../types';

interface EditorialTrustIntroProps {
  onOpenApplication: () => void;
  onExploreServices: () => void;
  onTrackApplication?: (trackingId?: string) => void;
}

interface WorkflowStage {
  step: string;
  status: ApplicationStatus;
  shortLabel: string;
  summary: string;
  deskAction: string;
  studentReceives: string[];
  channelNote: string;
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    status: 'Application Received',
    shortLabel: 'Received',
    summary:
      'Your academic profile, degree preference, and contact details are logged with a unique tracking reference.',
    deskAction: 'Admissions desk verifies program eligibility against university entry criteria.',
    studentReceives: [
      'Unique tracking reference (MGP-YYYY-XXXX)',
      'Program eligibility check by an advisor'
    ],
    channelNote: 'Submitted online through Myers Global Pathways'
  },
  {
    step: '02',
    status: 'Documents Requested',
    shortLabel: 'Documents Requested',
    summary:
      'Our admissions committee sends an official email confirming receipt and listing the exact supporting documents needed.',
    deskAction: 'Official document request dispatched from admissions@myersglobalpathways.com.',
    studentReceives: [
      'Supporting documents request email with reference number',
      'Direct submission via email or WhatsApp (+231 889425645)'
    ],
    channelNote: 'Submit WAEC / WASSCE, transcripts, and passport copy'
  },
  {
    step: '03',
    status: 'Documents Received',
    shortLabel: 'Documents Received',
    summary:
      'Your certificates, transcripts, and identification files are logged into your applicant dossier.',
    deskAction: 'Desk confirms all pages are complete, clear, and readable.',
    studentReceives: [
      'Confirmation that your file is complete',
      'Status update reflected in Student Portal'
    ],
    channelNote: 'Recorded in your application activity history'
  },
  {
    step: '04',
    status: 'Documents Under Review',
    shortLabel: 'Under Review',
    summary:
      'Counselors format your credentials, check grade equivalencies, and verify English-medium documentation.',
    deskAction: 'Application dossier assembled to university admissions standards.',
    studentReceives: [
      'Transcript and prerequisite verification',
      'Confirmed tuition and hostel fee breakdown'
    ],
    channelNote: 'Monrovia and India desks coordinate review'
  },
  {
    step: '05',
    status: 'Application Submitted to University',
    shortLabel: 'Submitted',
    summary:
      'Your verified application package is submitted directly to the selected Indian university admissions office.',
    deskAction: 'Direct institutional follow-up until formal seat assessment completes.',
    studentReceives: [
      'University submission confirmation',
      'Direct liaison with institutional admissions staff'
    ],
    channelNote: 'Tracked continuously until offer issuance'
  },
  {
    step: '06',
    status: 'Offer Letter Received',
    shortLabel: 'Offer Letter',
    summary:
      'You receive your official provisional admission letter and move directly into Indian student visa preparation.',
    deskAction: 'Bona fide letter review, embassy checklist, and arrival planning.',
    studentReceives: [
      'Provisional University Admission Letter',
      'Embassy visa dossier checklist and campus arrival briefing'
    ],
    channelNote: 'Ready for Indian student visa filing and travel'
  }
];

export const EditorialTrustIntro: React.FC<EditorialTrustIntroProps> = ({
  onOpenApplication,
  onExploreServices,
  onTrackApplication
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(1);
  const [trackingInput, setTrackingInput] = useState('');

  const activeStage = WORKFLOW_STAGES[selectedStageIndex];

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onTrackApplication) {
      onTrackApplication(trackingInput);
    }
  };

  return (
    <section
      id="admissions-tracker"
      className="py-16 lg:py-24 bg-white text-[#0F172A] border-b border-slate-200/80 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
              Live Application Transparency
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0B1F3A] leading-[1.15] text-balance">
              Track Every Stage From Application Receipt to Offer Letter
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every applicant receives a tracking reference linked to our six-stage admissions pipeline. Select any stage below to see what happens next, or look up your active dossier directly in the Student Portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onExploreServices}
              className="px-4 py-2.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 text-[#0B1F3A] border border-slate-200 text-sm font-semibold transition-ui cursor-pointer min-h-[44px]"
            >
              Review Services
            </button>
            <button
              type="button"
              onClick={onOpenApplication}
              className="px-5 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Start Application</span>
              <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
            </button>
          </div>
        </div>

        {/* Elevated 6-Stage Admissions Status Tracker Card */}
        <div className="rounded-xl bg-[#F4F6F9] border border-slate-200/90 p-5 sm:p-8 lg:p-10 space-y-8 shadow-[0_4px_24px_rgba(11,31,58,0.05)]">
          {/* Interactive 6-Stage Horizontal/Grid Stepper */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5"
            role="tablist"
            aria-label="Six-stage admissions status tracker"
          >
            {WORKFLOW_STAGES.map((stage, index) => {
              const isActive = index === selectedStageIndex;
              const isCompleted = index < selectedStageIndex;
              return (
                <button
                  key={stage.status}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedStageIndex(index)}
                  className={`p-3.5 rounded-lg border text-left transition-ui cursor-pointer flex flex-col justify-between min-h-[76px] ${
                    isActive
                      ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-sm'
                      : isCompleted
                        ? 'bg-white border-[#C5922E]/45 text-[#0B1F3A] hover:border-[#0B1F3A]/40'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-[#0B1F3A]/35 hover:text-[#0B1F3A]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-mono font-semibold tabular-nums ${
                        isActive
                          ? 'text-[#F0C86E]'
                          : isCompleted
                            ? 'text-[#9A6D17]'
                            : 'text-slate-400'
                      }`}
                    >
                      Stage {stage.step}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5922E] shrink-0" aria-hidden="true" />
                    )}
                  </div>
                  <span className="block text-xs sm:text-[13px] font-semibold mt-2 leading-tight">
                    {stage.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Inspection Panel + Real Portal Lookup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Stage Detail Box */}
            <div className="lg:col-span-8 rounded-xl bg-white border border-slate-200/90 p-6 sm:p-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-mono font-bold text-[#9A6D17] tabular-nums">
                      {activeStage.step} / 06
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B1F3A]">
                      {activeStage.status}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">
                    {activeStage.channelNote}
                  </span>
                </div>

                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {activeStage.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-[#0B1F3A]">Admissions Desk Action</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeStage.deskAction}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#0B1F3A]">What You Receive</p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {activeStage.studentReceives.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#C5922E] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Verified Submission Channels Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0B1F3A]" aria-hidden="true" />
                  <span className="font-mono text-[#0B1F3A] font-medium">admissions@myersglobalpathways.com</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#9A6D17]" aria-hidden="true" />
                  <span className="font-mono text-[#0B1F3A] font-medium tabular-nums">WhatsApp +231 889425645</span>
                </span>
              </div>
            </div>

            {/* Live Student Portal Reference Lookup Panel */}
            <div className="lg:col-span-4 rounded-xl bg-[#0B1F3A] text-white p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-[#F0C86E]">
                  Already Submitted an Application?
                </p>
                <h3 className="font-display text-xl font-bold text-white leading-snug">
                  Check Your Live Application Status
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enter your reference code or registered email address to view your live admissions status and uploaded document checklist in the Student Portal.
                </p>
              </div>

              <form onSubmit={handleTrackingSubmit} className="space-y-3">
                <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-white/10 border border-white/20 focus-within:border-[#C5922E] focus-within:bg-white/15 transition-ui">
                  <Search className="w-4 h-4 text-[#F0C86E] shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Reference (e.g. MGP-2026-...) or email"
                    aria-label="Application tracking reference or email"
                    className="w-full bg-transparent focus:outline-none text-sm text-white placeholder:text-slate-300/80"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-lg bg-[#C5922E] hover:bg-[#D4A13B] text-[#081528] text-sm font-semibold transition-ui cursor-pointer inline-flex items-center justify-center gap-2 min-h-[46px]"
                >
                  <span>Open Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialTrustIntro;
