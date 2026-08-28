import React from 'react';
import { NavTab } from '../types';
import { Globe, Sparkles, GraduationCap, HelpCircle, ArrowUpRight, CheckCircle2, BookOpen, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem, TextScrollReveal } from './ScrollReveal';
import { StarfieldButton } from './StarfieldButton';

interface HomeFeatureHubProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenApplication: () => void;
}

export const HomeFeatureHub: React.FC<HomeFeatureHubProps> = ({
  onSelectTab,
  onOpenApplication
}) => {
  const features = [
    {
      tab: 'study-in-india' as NavTab,
      badge: 'Destinations & Benefits',
      title: 'Study in India Guide',
      description: 'Explore why thousands of international students choose India: globally accredited degrees, modern tech campuses, and affordable tuition.',
      icon: Globe,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      actionText: 'Explore Study in India',
      highlights: ['Accredited Degrees', '100% English Medium', 'Affordable Tuition & Living']
    },
    {
      tab: 'services' as NavTab,
      badge: '01 to 08 Core Services',
      title: 'Our Complete Services',
      description: 'End-to-end guidance covering course selection, admission offers, document attestation, student visa dossiers, and airport arrival support.',
      icon: Sparkles,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      actionText: 'View All 8 Services',
      highlights: ['University Selection', 'Visa Dossier Guidance', 'Campus Arrival Welfare']
    },
    {
      tab: 'universities' as NavTab,
      badge: 'Degree & Program Finder',
      title: 'Academic Programs & Universities',
      description: 'Search Bachelor\'s and Master\'s degrees across Computer Science, Health Sciences, Business Administration, Engineering, and Law.',
      icon: GraduationCap,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      actionText: 'Browse Program Directory',
      highlights: ['Undergraduate & Master\'s', 'Top Academic Hubs', 'Prerequisite Check']
    },
    {
      tab: 'faq' as NavTab,
      badge: 'F&Q Knowledge Base',
      title: 'Frequently Asked Questions',
      description: 'Find answers on entry requirements, English proficiency exemptions (no IELTS required), fee schedules, and visa timelines.',
      icon: HelpCircle,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      actionText: 'Read FAQs & Answers',
      highlights: ['IELTS & TOEFL Policies', 'Visa Checklist', 'Hostel & Food Options']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#E5F1FC] via-[#EBF3FD] to-[#E2EEFA] text-slate-900 border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 text-blue-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Explore Dedicated Portals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              <TextScrollReveal text="Navigate Your Educational Journey" />
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 leading-relaxed font-normal">
              <TextScrollReveal delay={0.15} text="Select any section to explore in-depth information, programs, services, and admissions answers." />
            </p>
          </div>

          <div className="shrink-0">
            <StarfieldButton
              onClick={onOpenApplication}
              fill="#f59e0b"
              textColor="#0f172a"
              padding="12px 22px"
              rounded={100}
              glow={{ color: '#fbbf24', size: 14, opacity: 100 }}
              stroke={{ color: '#d97706', size: 75, count: 2, speed: 60, movement: 'continuous', direction: 'cw', thickness: 2 }}
              pixel={{ color: '#b45309', size: 3, density: 50, brightness: 100 }}
              border={{ borderColor: 'rgba(217, 119, 6, 0.4)', borderWidth: 1.5, borderStyle: 'solid' }}
            >
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">Apply Directly</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </StarfieldButton>
          </div>
        </ScrollReveal>

        {/* Feature Cards Grid with Staggered Scroll Animation */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <ScrollStaggerItem key={item.tab}>
                <div className="h-full p-7 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
                        {item.badge}
                      </span>
                      <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-sky-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectTab(item.tab);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-950 bg-sky-50 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-sky-200"
                    >
                      <span>{item.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>

        {/* Quick Links to About and Contact */}
        <ScrollReveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
          <button
            onClick={() => {
              onSelectTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-5 rounded-2xl bg-white text-slate-900 hover:bg-sky-50 border border-sky-300 shadow-sm transition-all flex items-center justify-between cursor-pointer group hover:border-blue-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950 group-hover:text-blue-700 transition-colors">About Myers Global Pathways</p>
                <p className="text-xs text-slate-600">Founder Menlaiday Myers Dahn & Vision</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-700 transition-colors" />
          </button>

          <button
            onClick={() => {
              onSelectTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-5 rounded-2xl bg-white text-slate-900 hover:bg-sky-50 border border-sky-300 shadow-sm transition-all flex items-center justify-between cursor-pointer group hover:border-blue-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">Admissions Desk & Directory</p>
                <p className="text-xs text-slate-600">WhatsApp & Direct Email Contacts</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
