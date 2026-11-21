import React from 'react';
import { NavTab } from '../types';
import { ArrowRight } from 'lucide-react';

interface HomeFeatureHubProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenApplication: () => void;
}

export const HomeFeatureHub: React.FC<HomeFeatureHubProps> = ({
  onSelectTab
}) => {
  const goTo = (tab: NavTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const leadPortals = [
    {
      number: '01',
      tab: 'universities' as NavTab,
      title: 'Academic programs and universities',
      description:
        'Browse undergraduate and postgraduate degrees across Computer Science, Engineering, Health Sciences, Business Administration, and Law.',
      details: [
        'Bachelor’s and Master’s degree listings',
        'Prerequisite and grade equivalency overview',
        'English-taught programs at recognized institutions'
      ],
      actionText: 'Browse program directory'
    },
    {
      number: '02',
      tab: 'services' as NavTab,
      title: 'Eight end-to-end admissions services',
      description:
        'Structured support covering course selection, admission offers, document verification, student visa dossiers, and campus arrival.',
      details: [
        'University and course shortlisting',
        'Document preparation and attestation guidance',
        'Consular visa checklist and campus arrival support'
      ],
      actionText: 'View all 8 services'
    }
  ];

  const supportingPortals = [
    {
      number: '03',
      tab: 'study-in-india' as NavTab,
      title: 'Study in India guide',
      description:
        'Review academic recognition, English-medium instruction, realistic tuition ranges, and campus hostel living costs in India.',
      actionText: 'Explore Study in India'
    },
    {
      number: '04',
      tab: 'student-life' as NavTab,
      title: 'Student life and campus blog',
      description:
        'Read campus event dispatches, housing and dining guides, city transit notes, and stories from international graduates.',
      actionText: 'Open student life'
    },
    {
      number: '05',
      tab: 'faq' as NavTab,
      title: 'Frequently asked questions',
      description:
        'Direct answers on WAEC and WASSCE entry criteria, English proficiency exemptions without IELTS, fee schedules, and visa timelines.',
      actionText: 'Read FAQs'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#EFECE4] text-[#181A1F] border-b border-[#181A1F]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 text-left">

        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#181A1F] leading-[1.15]">
            Everything needed before you enroll
          </h2>
          <p className="text-base text-[#4F535C] leading-relaxed">
            Explore our degree directory, eight advisory services, country guide, student life dispatches, and admissions answers.
          </p>
        </div>

        {/* Asymmetric Top Row: Two Lead Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadPortals.map((item) => (
            <div
              key={item.tab}
              className="rounded-2xl bg-white border border-[#181A1F]/[0.08] hover:border-[#181A1F]/[0.18] p-6 lg:p-8 flex flex-col justify-between gap-6 transition-ui"
            >
              <div className="space-y-4">
                <span className="block text-xs font-mono text-[#A63A24] tabular-nums">
                  {item.number}
                </span>

                <h3 className="text-xl sm:text-2xl font-medium tracking-[-0.015em] text-[#181A1F]">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#4F535C] leading-relaxed">
                  {item.description}
                </p>

                <ul className="pt-2 space-y-2 border-t border-[#181A1F]/[0.08] text-sm text-[#4F535C]">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-baseline gap-2">
                      <span className="text-[#A63A24]" aria-hidden="true">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => goTo(item.tab)}
                  className="text-sm font-medium text-[#181A1F] hover:text-[#A63A24] inline-flex items-center gap-2 transition-ui cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Balanced Second Row: Three Supporting Portals (no orphan card) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportingPortals.map((item) => (
            <div
              key={item.tab}
              className="rounded-2xl bg-white border border-[#181A1F]/[0.08] hover:border-[#181A1F]/[0.18] p-6 flex flex-col justify-between gap-6 transition-ui"
            >
              <div className="space-y-3">
                <span className="block text-xs font-mono text-[#6E727D] tabular-nums">
                  {item.number}
                </span>

                <h3 className="text-lg font-medium tracking-[-0.01em] text-[#181A1F]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#4F535C] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => goTo(item.tab)}
                  className="text-sm font-medium text-[#181A1F] hover:text-[#A63A24] inline-flex items-center gap-2 transition-ui cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Directory Links for About and Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#181A1F]/[0.08]">
          <button
            type="button"
            onClick={() => goTo('about')}
            className="p-4 rounded-xl bg-[#F7F5F0] hover:bg-white border border-[#181A1F]/[0.08] hover:border-[#181A1F]/[0.18] flex items-center justify-between gap-4 text-left transition-ui cursor-pointer"
          >
            <div>
              <p className="text-sm font-medium text-[#181A1F]">About Myers Global Pathways</p>
              <p className="text-xs text-[#4F535C] mt-1">Founder Menlaiday Myers Dahn and advisory principles</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#6E727D] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => goTo('contact')}
            className="p-4 rounded-xl bg-[#F7F5F0] hover:bg-white border border-[#181A1F]/[0.08] hover:border-[#181A1F]/[0.18] flex items-center justify-between gap-4 text-left transition-ui cursor-pointer"
          >
            <div>
              <p className="text-sm font-medium text-[#181A1F]">Admissions desk and directory</p>
              <p className="text-xs text-[#4F535C] mt-1">Official department emails and WhatsApp contacts</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#6E727D] shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
};
