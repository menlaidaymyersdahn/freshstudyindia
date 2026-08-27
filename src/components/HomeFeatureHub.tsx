import React from 'react';
import { NavTab } from '../types';
import { Globe, Sparkles, GraduationCap, HelpCircle, ArrowUpRight, CheckCircle2, BookOpen, Mail } from 'lucide-react';

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
      color: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      actionText: 'Explore Study in India',
      highlights: ['Accredited Degrees', '100% English Medium', 'Affordable Tuition & Living']
    },
    {
      tab: 'services' as NavTab,
      badge: '01 to 08 Core Services',
      title: 'Our Complete Services',
      description: 'End-to-end guidance covering course selection, admission offers, document attestation, student visa dossiers, and airport arrival support.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-amber-600/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      actionText: 'View All 8 Services',
      highlights: ['University Selection', 'Visa Dossier Guidance', 'Campus Arrival Welfare']
    },
    {
      tab: 'universities' as NavTab,
      badge: 'Degree & Program Finder',
      title: 'Academic Programs & Universities',
      description: 'Search Bachelor\'s and Master\'s degrees across Computer Science, Health Sciences, Business Administration, Engineering, and Law.',
      icon: GraduationCap,
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      actionText: 'Browse Program Directory',
      highlights: ['Undergraduate & Master\'s', 'Top Academic Hubs', 'Prerequisite Check']
    },
    {
      tab: 'faq' as NavTab,
      badge: 'F&Q Knowledge Base',
      title: 'Frequently Asked Questions',
      description: 'Find answers on entry requirements, English proficiency exemptions (no IELTS required), fee schedules, and visa timelines.',
      icon: HelpCircle,
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      actionText: 'Read FAQs & Answers',
      highlights: ['IELTS & TOEFL Policies', 'Visa Checklist', 'Hostel & Food Options']
    }
  ];

  return (
    <section className="py-20 bg-[#F4F7FB] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Explore Dedicated Portals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Navigate Your Educational Journey
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed font-normal">
              Select any section to explore in-depth information, programs, services, and admissions answers.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenApplication}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tab}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                      {item.badge}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center ${item.iconColor} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-slate-100 hover:bg-amber-400 group-hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Footer Links to About and Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
          <button
            onClick={() => {
              onSelectTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">About Myers Global Pathways</p>
                <p className="text-xs text-slate-400">Founder Menlaiday Myers & Our Vision</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={() => {
              onSelectTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Admissions Desk & Directory</p>
                <p className="text-xs text-slate-400">WhatsApp & Direct Email Contacts</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
};
