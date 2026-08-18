import React from 'react';
import { 
  Users2, 
  CheckCircle, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface WhyUsProps {
  onOpenApplication: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenApplication }) => {
  const points = [
    {
      num: '01',
      title: 'PERSONAL GUIDANCE',
      desc: 'Real people helping you understand the process.',
      detail: 'You are never speaking to an automated bot or dealing with generic paperwork. Our dedicated counselors walk you through course requirements, university nuances, and real campus realities.',
      icon: Users2
    },
    {
      num: '02',
      title: 'CLEAR INFORMATION',
      desc: 'Straightforward guidance without unnecessary confusion.',
      detail: 'We provide transparent estimates for tuition fees, hostel expenses, admission timelines, and visa criteria—so you and your family can plan with absolute confidence.',
      icon: CheckCircle
    },
    {
      num: '03',
      title: 'SUPPORT BEYOND APPLICATION',
      desc: 'We help students prepare for the transition to studying in India.',
      detail: 'Our responsibility doesn’t end with an offer letter. From flight connections and arrival guidance to settling into your campus accommodation, we support your full transition.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#0B192C] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Large Typography Headline */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
            <span>The Fresh Study India Promise</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            INDIA IS A BIG MOVE.
            <span className="block text-sky-400 mt-1 sm:mt-2">
              YOU DON'T HAVE TO FIGURE IT OUT ALONE.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            Studying internationally is one of the most significant investments of your life. We are dedicated to providing the clarity, integrity, and personal guidance you need.
          </p>
        </div>

        {/* 3 Strong Points with Large Typography (Not traditional boxy cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14 pt-8 border-t border-white/15">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div key={pt.num} className="space-y-4 group">
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-sky-400/60 group-hover:text-sky-400 transition-colors">
                    {pt.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {pt.title}
                </h3>

                {/* Primary Short Description */}
                <p className="text-base sm:text-lg font-bold text-sky-200 leading-snug">
                  {pt.desc}
                </p>

                {/* Extended Supporting Text */}
                <p className="text-sm text-slate-400 leading-relaxed pt-2">
                  {pt.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner for Parents & Students */}
        <div className="mt-20 sm:mt-24 p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Questions about universities, safety, or costs?
            </h4>
            <p className="text-sm text-slate-300 max-w-xl">
              Connect directly with our India or Liberia admissions desks for straightforward, factual counsel.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md"
            >
              WhatsApp India Desk
            </a>

            <button
              onClick={onOpenApplication}
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wide text-[#0B192C] bg-white hover:bg-slate-100 transition shadow-md cursor-pointer"
            >
              Start Application
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
