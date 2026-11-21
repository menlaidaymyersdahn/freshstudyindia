import React, { useState } from 'react';
import { ArrowRight, Mail, MessageSquare, FileText, Search } from 'lucide-react';
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
    summary: 'Your academic profile, degree preference, and contact details are logged with a unique tracking reference.',
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
    shortLabel: 'Docs requested',
    summary: 'Our admissions committee sends an official email confirming receipt and listing the exact supporting documents needed.',
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
    shortLabel: 'Docs received',
    summary: 'Your certificates, transcripts, and identification files are logged into your applicant dossier.',
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
    shortLabel: 'Under review',
    summary: 'Counselors format your credentials, check grade equivalencies, and verify English-medium documentation.',
    deskAction: 'Application dossier assembled to university admissions standards.',
    studentReceives: [
      'Transcript and prerequisite verification',
      'Confirmed tuition and hostel fee breakdown'
    ],
    channelNote: 'Monrovia and Hyderabad desks coordinate review'
  },
  {
    step: '05',
    status: 'Application Submitted to University',
    shortLabel: 'Submitted',
    summary: 'Your verified application package is submitted directly to the selected Indian university admissions office.',
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
    shortLabel: 'Offer letter',
    summary: 'You receive your official provisional admission letter and move directly into Indian student visa preparation.',
    deskAction: 'Bona fide letter review, embassy checklist, and arrival planning.',
    studentReceives: [
      'Provisional University Admission Letter',
      'Embassy visa dossier checklist and campus arrival briefing'
    ],
    channelNote: 'Ready for Indian student visa filing and travel'
  }
];

const COMMITMENTS = [
  {
    number: '01',
    title: 'Direct institutional matching',
    detail: 'Aligning your academic credentials and career goals with recognized, accredited university options in India.'
  },
  {
    number: '02',
    title: 'Transparent tuition and housing',
    detail: 'Upfront clarity on international tuition schedules, campus hostel fees, and monthly living expenses.'
  },
  {
    number: '03',
    title: 'Official visa guidance',
    detail: 'Document checks, bona fide verification, and preparation for consular appointments.'
  },
  {
    number: '04',
    title: 'Arrival and campus settlement',
    detail: 'Pre-departure briefings, hostel check-in guidance, and initial orientation upon arrival.'
  }
];

export const EditorialTrustIntro: React.FC<EditorialTrustIntroProps> = ({
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
      id="overview"
      className="py-16 lg:py-24 bg-[#F7F5F0] text-[#181A1F] border-b border-[#181A1F]/[0.08] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Advisory Narrative & The Four Commitments */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#181A1F] leading-[1.15]">
              How we move an application from inquiry to university offer
            </h2>

            <p className="text-base text-[#4F535C] leading-relaxed">
              International applicants face unfamiliar academic calendars, varying grade equivalencies, document formatting rules, and embassy visa procedures. Myers Global Pathways manages each step in sequence so nothing is missed.
            </p>

            {/* The Myers Student Commitment — Hairline Editorial List */}
            <div className="pt-2 border-t border-[#181A1F]/[0.08] divide-y divide-[#181A1F]/[0.08]">
              {COMMITMENTS.map((item) => (
                <div key={item.number} className="py-4 grid grid-cols-12 gap-3 items-baseline">
                  <span className="col-span-2 text-xs font-medium text-[#A63A24] tabular-nums">
                    {item.number}
                  </span>
                  <div className="col-span-10 space-y-1">
                    <h3 className="text-sm font-medium text-[#181A1F]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4F535C] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreServices}
                className="text-sm font-medium text-[#A63A24] hover:text-[#8C2F1C] inline-flex items-center gap-2 transition-ui cursor-pointer"
              >
                <span>Review all 8 advisory services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Bright Product Moment — Interactive 6-Stage Admissions Dossier & Live Tracker */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-[#181A1F]/[0.08] p-6 lg:p-8 text-left space-y-6">
              {/* Top Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#181A1F]/[0.08]">
                <div>
                  <h3 className="text-lg font-medium text-[#181A1F] tracking-[-0.01em]">
                    Admissions status tracker
                  </h3>
                  <p className="text-sm text-[#6E727D] mt-1">
                    Select any stage below to inspect how your dossier progresses in our portal.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#4F535C] bg-[#F7F5F0] border border-[#181A1F]/[0.08] px-3 py-1 rounded-lg self-start sm:self-center whitespace-nowrap shrink-0">
                  6 tracked stages
                </span>
              </div>

              {/* Interactive 6-Stage Stepper */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                role="tablist"
                aria-label="Admissions pipeline stages"
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
                      className={`p-3 rounded-lg border text-left transition-ui cursor-pointer ${
                        isActive
                          ? 'bg-[#A63A24]/[0.07] border-[#A63A24] text-[#181A1F]'
                          : isCompleted
                            ? 'bg-[#F7F5F0] border-[#181A1F]/[0.10] text-[#181A1F] hover:border-[#181A1F]/[0.20]'
                            : 'bg-white border-[#181A1F]/[0.08] text-[#4F535C] hover:border-[#181A1F]/[0.20] hover:text-[#181A1F]'
                      }`}
                    >
                      <span
                        className={`block text-xs tabular-nums ${
                          isActive ? 'text-[#A63A24] font-medium' : 'text-[#6E727D]'
                        }`}
                      >
                        Stage {stage.step}
                      </span>
                      <span className="block text-sm font-medium mt-1 truncate">
                        {stage.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Inspection Panel */}
              <div className="rounded-xl bg-[#F7F5F0] border border-[#181A1F]/[0.08] p-6 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-[#A63A24] font-medium">
                      {activeStage.step} / 06
                    </span>
                    <h4 className="text-base font-medium text-[#181A1F]">
                      {activeStage.status}
                    </h4>
                  </div>
                  <span className="text-xs text-[#6E727D]">
                    {activeStage.channelNote}
                  </span>
                </div>

                <p className="text-sm text-[#4F535C] leading-relaxed">
                  {activeStage.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#181A1F]/[0.08]">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#181A1F]">Admissions desk action</p>
                    <p className="text-sm text-[#4F535C] leading-relaxed">
                      {activeStage.deskAction}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#181A1F]">What you receive</p>
                    <ul className="space-y-2 text-sm text-[#4F535C]">
                      {activeStage.studentReceives.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#A63A24] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Official Submission Channels Bar */}
                <div className="pt-3 border-t border-[#181A1F]/[0.08] flex flex-wrap items-center gap-4 text-xs text-[#4F535C]">
                  <span className="inline-flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#A63A24]" />
                    <span className="font-mono text-[#181A1F]">admissions@myersglobalpathways.com</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#A63A24]" />
                    <span className="font-mono text-[#181A1F]">WhatsApp +231 889425645</span>
                  </span>
                </div>
              </div>

              {/* Real Working Application Reference Lookup */}
              <form
                onSubmit={handleTrackingSubmit}
                className="pt-4 border-t border-[#181A1F]/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F7F5F0] border border-[#181A1F]/[0.12] focus-within:border-[#A63A24] focus-within:bg-white transition-ui">
                  <Search className="w-4 h-4 text-[#6E727D] shrink-0" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Already applied? Enter reference (e.g. MGP-2026-...)"
                    aria-label="Application tracking reference"
                    className="w-full bg-transparent focus:outline-none text-sm text-[#181A1F] placeholder:text-[#6E727D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#181A1F] hover:bg-[#2C2F38] text-white text-sm font-medium transition-ui cursor-pointer whitespace-nowrap"
                >
                  Open student portal
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
