import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Send, 
  FileText, 
  Plane, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface JourneyTimelineProps {
  onOpenApplication: (stepContext?: string) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ onOpenApplication }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      tag: 'DISCOVER',
      title: 'Tell us what you want to study',
      desc: 'Share your academic interests, career ambitions, and budget with our advisory team.',
      details: 'We listen to your background, review your high school or undergraduate transcripts, and clarify your preferred study field.',
      icon: Search,
      badge: 'First Step'
    },
    {
      num: '02',
      tag: 'CHOOSE',
      title: 'Explore suitable courses and universities',
      desc: 'Receive tailored options matching your criteria across India’s leading higher education hubs.',
      details: 'We present accredited institutions in Bengaluru, Delhi NCR, Pune, Chennai, and Hyderabad, comparing curricula, hostel facilities, and fee structures.',
      icon: BookOpen,
      badge: 'Academic Fit'
    },
    {
      num: '03',
      tag: 'APPLY',
      title: 'Prepare and submit your application',
      desc: 'Get hands-on support assembling admission dossiers, transcripts, and official university filings.',
      details: 'We facilitate your provisional admission offer letter, verify documentation criteria, and follow up directly with university admissions offices.',
      icon: Send,
      badge: 'Offer Letter'
    },
    {
      num: '04',
      tag: 'PREPARE',
      title: 'Get ready for your move to India',
      desc: 'Navigate student visa paperwork, bonafide letters, flight booking guidance, and essential packing lists.',
      details: 'We guide you through the Indian Embassy / Consular student visa submission checklist, flight connections, and currency briefing.',
      icon: Plane,
      badge: 'Visa & Logistics'
    },
    {
      num: '05',
      tag: 'ARRIVE',
      title: 'Begin your new academic journey',
      desc: 'Airport reception guidance, campus hostel check-in, local SIM setup, and orientation support.',
      details: 'Land in India with complete peace of mind. We help you connect to campus transport, settle into your dorm, and start your classes.',
      icon: GraduationCap,
      badge: 'Campus Life'
    }
  ];

  return (
    <section id="journey" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-50/60 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>The Student Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
            FROM HOME TO CAMPUS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A clear, structured, five-stage process designed to eliminate confusion and take you from your home country straight to your university in India.
          </p>
        </div>

        {/* Desktop Horizontal Step Navigation */}
        <div className="relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-0.5 bg-slate-200 z-0">
            <div 
              className="h-full bg-sky-600 transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                    isActive 
                      ? 'bg-[#0B192C] text-white shadow-xl ring-2 ring-sky-400 scale-102 sm:scale-105 -translate-y-1' 
                      : 'bg-[#F8FAFC] hover:bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                        isActive 
                          ? 'bg-sky-500 text-white shadow-md' 
                          : isPassed 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-white text-slate-700 border border-slate-200'
                      }`}>
                        {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>

                      <span className={`text-xs font-mono font-extrabold tracking-wider ${
                        isActive ? 'text-sky-300' : 'text-slate-400'
                      }`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Tag / Stage */}
                    <span className={`inline-block text-[11px] font-extrabold uppercase tracking-wider mb-2 ${
                      isActive ? 'text-sky-300' : 'text-sky-700'
                    }`}>
                      {step.tag}
                    </span>

                    {/* Step Title */}
                    <h3 className={`text-base font-bold tracking-tight leading-snug mb-2 ${
                      isActive ? 'text-white' : 'text-[#0B192C]'
                    }`}>
                      {step.title}
                    </h3>

                    {/* Short Description */}
                    <p className={`text-xs leading-relaxed ${
                      isActive ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Active Indicator Arrow */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold">
                    <span className={isActive ? 'text-sky-300' : 'text-slate-400'}>
                      {step.badge}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-sky-400 translate-x-0.5' : 'text-slate-300'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Step Expanded Spotlight Panel with Real Photographic Context */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#071322] text-white border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-sky-300 font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Stage {steps[activeStep].num} Breakdown • {steps[activeStep].tag}</span>
              </div>
              <h4 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {steps[activeStep].title}
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {steps[activeStep].details}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenApplication(steps[activeStep].tag)}
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white hover:bg-sky-50 text-[#071322] font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-xl hover:shadow-sky-400/20 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Apply with Stage {steps[activeStep].num} Guidance</span>
                  <ArrowRight className="w-4 h-4 text-sky-600" />
                </button>
              </div>
            </div>

            {/* Visual Photo Card in Spotlight */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl aspect-[16/10] relative group">
                <img
                  src={activeStep >= 3 ? "/DSC_9367.jpeg" : "/DSC_9531.jpeg"}
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith('.jpeg')) {
                      e.currentTarget.src = activeStep >= 3 ? '/DSC_9367.jpg' : '/DSC_9531.jpg';
                    }
                  }}
                  alt="Student Academic Journey in India"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {activeStep >= 3 ? "Convocation in India" : "Real Student Guidance"}
                    </span>
                    <p className="text-xs sm:text-sm font-black text-white mt-1">
                      {activeStep >= 3 ? "International Students Graduation Ceremony" : "Myers • From Liberia to Indian University"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
