import React, { useState } from 'react';
import { 
  FileCheck2, 
  Send, 
  Stamp, 
  PlaneTakeoff, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface JourneyTimelineProps {
  onOpenApplication: () => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ onOpenApplication }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Course Selection & Verification',
      badge: 'Step 1 • Initial Evaluation',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      tagColor: 'text-sky-600',
      desc: 'We review your academic background (WAEC / WASSCE / Bachelor’s / Diploma) and match you to recognized universities in India fitting your preferred budget and career goals.',
      deliverables: [
        'Free transcript & certificate review',
        'Tuition fee breakdown & cost comparison',
        'Campus location & accreditation matching'
      ],
      timeframe: '24 - 48 Hours'
    },
    {
      step: '02',
      title: 'Official Bonafide Admission Letter',
      badge: 'Step 2 • Direct University Offer',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      tagColor: 'text-rose-600',
      desc: 'We process your formal university application directly with the registrar. You receive an official Bonafide Admission Letter and Visa Eligibility document on university letterhead.',
      deliverables: [
        'Direct registrar issuance (no middlemen)',
        'Clear scholarship & tuition discounts applied',
        'Official admission number for visa application'
      ],
      timeframe: '3 - 7 Working Days'
    },
    {
      step: '03',
      title: 'Indian Student Visa Filing & Approval',
      badge: 'Step 3 • Embassy Preparation',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      tagColor: 'text-indigo-600',
      desc: 'We assist with the complete student visa dossier for the Indian Embassy or High Commission in your region, verifying your financial sponsorship and documentation.',
      deliverables: [
        'Embassy document checklist review',
        'Sponsorship affidavit formatting guidance',
        'Visa appointment preparation and submission'
      ],
      timeframe: '2 - 4 Weeks (depending on embassy)'
    },
    {
      step: '04',
      title: 'Flight, Arrival & University Settlement',
      badge: 'Step 4 • On-Ground Transition',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tagColor: 'text-emerald-600',
      desc: 'Our ground team in India meets you at the airport, assists with transport to your campus hostel, helps you acquire a local SIM card, and completes mandatory FRRO registration.',
      deliverables: [
        'Airport reception & vehicle transport',
        'Hostel room check-in & campus orientation',
        'Indian SIM card setup & mandatory FRRO registration'
      ],
      timeframe: 'Day 1 of Arrival'
    }
  ];

  return (
    <section id="journey" className="py-24 sm:py-32 bg-[#F8FAFD] relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Clear 4-Stage Roadmap</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060F1E] tracking-tight leading-tight">
            FROM APPLICATION TO AIRPORT ARRIVAL.
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We manage the whole journey from your home country to your university dorm in India. Here is exactly how we work with you:
          </p>
        </div>

        {/* 4 Cards Grid with Stylish Hover & Progress Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((item, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`rounded-3xl p-7 transition-all duration-300 relative flex flex-col justify-between cursor-pointer border ${
                  isCurrent
                    ? 'bg-white border-red-400 shadow-xl shadow-red-500/10 ring-2 ring-red-500/20 -translate-y-1'
                    : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Card Header: Step & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                      {item.step}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.timeframe}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-[#060F1E] tracking-tight leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                {/* Key Deliverables Bullet Points */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {item.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Banner with Fast Action CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060F1E] via-[#0B1E38] to-[#060F1E] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-32 bg-red-600/15 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-32 bg-blue-600/15 blur-[60px] pointer-events-none" />
          
          <div className="space-y-1 text-center md:text-left relative z-10">
            <h4 className="text-lg sm:text-xl font-black text-white">
              Ready to start your step 1 evaluation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Send your certificates to our admissions counselors. We verify program eligibility and scholarship quota within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10">
            <button
              onClick={onOpenApplication}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:via-rose-500 hover:to-blue-500 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin Step 1 Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink('india', 'Hello, I would like to begin Step 1 course evaluation for studying in India.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask Advisor on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
