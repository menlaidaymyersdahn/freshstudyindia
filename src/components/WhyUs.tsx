import React from 'react';
import { 
  UserCheck, 
  Globe2, 
  FileCheck2, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { WHY_CHOOSE_US, getWhatsAppLink } from '../lib/constants';

interface WhyUsProps {
  onOpenApplication: () => void;
}

const iconsMap: Record<string, React.ReactNode> = {
  'personalized-guidance': <UserCheck className="w-5 h-5 text-blue-700" />,
  'international-student-support': <Globe2 className="w-5 h-5 text-blue-700" />,
  'clear-admission-guidance': <FileCheck2 className="w-5 h-5 text-blue-700" />,
  'assistance-throughout': <Sparkles className="w-5 h-5 text-blue-700" />,
  'student-focused-service': <HeartHandshake className="w-5 h-5 text-blue-700" />
};

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenApplication }) => {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Core Statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Why Myers Global Pathways</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Honest, Transparent Guidance for Your Education
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Choosing to study abroad is a life-defining milestone. We ensure international students and their families have reliable, verified, and caring support at every step.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Our Commitment to You
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct university billing with zero arbitrary markups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real guidance from advisors with lived international student experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full on-ground support upon your arrival in India</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenApplication}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Speak with an Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Focused Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {WHY_CHOOSE_US.map((item, index) => (
              <div 
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    {iconsMap[item.id] || <CheckCircle2 className="w-5 h-5 text-blue-700" />}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
