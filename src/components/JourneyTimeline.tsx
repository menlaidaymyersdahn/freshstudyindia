import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck2, 
  Building2, 
  Stamp, 
  Plane, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  MessageCircle,
  FileText,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface JourneyTimelineProps {
  onOpenApplication: (stepName?: string) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ onOpenApplication }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      stepNumber: '01',
      id: 1,
      title: 'Course & Budget Evaluation',
      subtitle: 'Academic eligibility & program selection',
      tag: 'WAEC / WASSCE / Degree Check',
      tagColor: 'bg-red-50 text-rose-700 border-red-200',
      icon: <Building2 className="w-5 h-5 text-rose-600" />,
      desc: 'Our admissions counselors evaluate your high school (WAEC, WASSCE, NECO, GCE) or undergraduate transcripts against accredited university entrance criteria to match your academic goals and budget.',
      checklist: [
        'Free preliminary document evaluation',
        'Tuition fee & hostel budget planning',
        'Matching with top accredited UGC/NAAC universities',
        'Clear timeline breakdown for 2026 intake'
      ],
      timeframe: '1 - 2 Business Days',
      ctaText: 'Check Academic Eligibility'
    },
    {
      stepNumber: '02',
      id: 2,
      title: 'Direct Bonafide Admission Letter',
      subtitle: 'Official university registrar documentation',
      tag: 'Visa Bonafide Issued',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <FileCheck2 className="w-5 h-5 text-blue-600" />,
      desc: 'We secure your official bonafide admission letter directly from the university registrar. This document proves formal acceptance and is the mandatory requirement for your student visa dossier.',
      checklist: [
        'Direct registrar-signed admission letter',
        'Official fee structure & bonafide certificate',
        'Zero hidden agent fees on tuition quotes',
        'Direct university bank transfer details'
      ],
      timeframe: '3 - 7 Business Days',
      ctaText: 'Request Bonafide Letter'
    },
    {
      stepNumber: '03',
      id: 3,
      title: 'Indian Student Visa Dossier',
      subtitle: 'Embassy checklist, affidavit & appointment',
      tag: '100% Embassy Guidance',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Stamp className="w-5 h-5 text-purple-600" />,
      desc: 'Step-by-step guidance on compiling your visa application file for the Indian Embassy / High Commission. We provide document checklists, sponsor affidavit templates, and consular interview preparation.',
      checklist: [
        'Complete Indian Embassy visa checklist',
        'Financial sponsorship affidavit templates',
        'Medical fitness & yellow fever guidelines',
        'Consular interview preparation session'
      ],
      timeframe: '2 - 3 Weeks (Embassy processing)',
      ctaText: 'Prepare Visa Dossier'
    },
    {
      stepNumber: '04',
      id: 4,
      title: 'Airport Reception & Campus Check-in',
      subtitle: 'Hostel settlement, SIM card & FRRO',
      tag: 'On-Ground Support',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <Plane className="w-5 h-5 text-emerald-600" />,
      desc: 'You are met by our representative when you land in India. We arrange airport pickup, assist with transit to your university, assist with hostel room allocation, provide an Indian SIM card, and guide mandatory FRRO registration.',
      checklist: [
        'Airport pickup & campus transportation',
        'Hostel room check-in & essentials orientation',
        'Indian 5G mobile SIM card setup',
        'Mandatory Foreigners Registration (FRRO) assistance'
      ],
      timeframe: 'Arrival Day + 1st Week',
      ctaText: 'View Arrival Details'
    }
  ];

  return (
    <section id="journey" className="py-24 sm:py-32 bg-[#F1F6FB] text-slate-900 relative overflow-hidden bg-grid-dense">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-red-400/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-blue-400/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Structured Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            YOUR JOURNEY TO INDIA.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Four clear, transparent milestones from your initial eligibility review to landing on campus and settling into your university hostel.
          </p>
        </div>

        {/* Interactive Step Navigator Header */}
        <div className="relative mb-12 sm:mb-16">
          
          {/* Background Track Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
          
          {/* Active Glowing Line Segment */}
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
          />

          {/* 4 Interactive Step Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {steps.map((s) => {
              const isCurrent = activeStep === s.id;
              const isCompleted = activeStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-white border-red-500 shadow-md shadow-red-500/10 ring-2 ring-red-500/20'
                      : isCompleted
                      ? 'bg-white/90 border-slate-200 hover:border-slate-300 shadow-xs'
                      : 'bg-white/60 border-slate-200/80 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-black ${isCurrent ? 'text-rose-600' : 'text-slate-500'}`}>
                      {s.stepNumber}
                    </span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isCurrent 
                        ? 'bg-red-600 text-white' 
                        : isCompleted 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.icon}
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                    isCurrent ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                  }`}>
                    {s.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Interactive Presentation */}
        {(() => {
          const current = steps.find(s => s.id === activeStep) || steps[0];

          return (
            <div className="rounded-3xl bg-white border border-sky-100 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-300">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                    Stage {current.stepNumber} of 04
                  </span>
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold uppercase ${current.tagColor}`}>
                    {current.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {current.desc}
                </p>

                {/* Key Checklist Box */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    What we execute in this stage:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.checklist.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenApplication(current.title)}
                    className="px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 transition shadow-lg shadow-red-600/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppLink('india', `Hello Myers Global Pathway, I want to ask about Stage ${current.stepNumber}: ${current.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Ask Counselor</span>
                  </a>
                </div>

              </div>

              {/* Right Step Visual Graphic Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-sky-50 to-slate-50 rounded-2xl p-6 border border-sky-100 space-y-5 shadow-xs">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-mono font-bold text-slate-700">Typical Duration</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg border border-blue-200">
                      {current.timeframe}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                      <p className="font-bold text-slate-900 mb-1">Official Document Verification</p>
                      <p>All student transcripts are checked directly against recognized Indian university databases to prevent visa rejection.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                      <p className="font-bold text-slate-900 mb-1">Direct Bank Transactions</p>
                      <p>Myers Global Pathway never collects your tuition. You pay directly into the verified Indian University account.</p>
                    </div>
                  </div>

                  {/* Step Next Navigator */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => setActiveStep(prev => prev > 1 ? prev - 1 : 4)}
                      className="text-slate-500 hover:text-slate-900 transition cursor-pointer font-semibold"
                    >
                      ← Previous Stage
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => prev < 4 ? prev + 1 : 1)}
                      className="text-rose-600 font-bold hover:text-rose-700 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
