import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  Compass, 
  PlaneTakeoff, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ServicesGridProps {
  onOpenApplication: (serviceTitle?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenApplication }) => {
  const services = [
    {
      id: 'university-guidance',
      title: 'UNIVERSITY & COURSE GUIDANCE',
      desc: 'Find programs that match your academic goals and budget.',
      icon: Building2,
      points: [
        'Curriculum evaluation & eligibility match',
        'Tuition fee clarity & living budget estimation',
        'Recognized degree verification across India'
      ],
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      accent: 'from-sky-500/10 to-transparent'
    },
    {
      id: 'application-support',
      title: 'APPLICATION SUPPORT',
      desc: 'Guidance with documents, applications and admissions.',
      icon: FileCheck2,
      points: [
        'Transcript & identification dossier preparation',
        'Official university submission tracking',
        'Provisional admission & bonafide letter retrieval'
      ],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
      accent: 'from-indigo-500/10 to-transparent'
    },
    {
      id: 'student-visa-guidance',
      title: 'STUDENT VISA GUIDANCE',
      desc: 'General guidance through the student visa preparation process.',
      icon: Compass,
      points: [
        'Embassy submission checklist review',
        'Bonafide documentation validation',
        'Interview readiness & consulate protocol briefing'
      ],
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
      accent: 'from-blue-500/10 to-transparent'
    },
    {
      id: 'india-arrival-support',
      title: 'INDIA ARRIVAL SUPPORT',
      desc: 'Guidance to help students prepare for life and studies in India.',
      icon: PlaneTakeoff,
      points: [
        'Pre-departure packing & cultural briefing',
        'Airport reception & campus hostel check-in',
        'Local connectivity, banking & onboarding tips'
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      accent: 'from-teal-500/10 to-transparent'
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Consultancy Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
            WE MAKE THE PROCESS EASIER.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Four core guidance areas designed to remove stress, clarify every requirement, and support you from your first question to your arrival in India.
          </p>
        </div>

        {/* 4 Large Visual Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-sky-400" />
                    </div>

                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                      SERVICE
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight leading-snug mb-3">
                    {svc.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-base text-slate-600 font-medium leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  {/* Structured Points */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {svc.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => onOpenApplication(svc.title)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0B192C] hover:text-sky-600 transition-colors group-hover:translate-x-1 cursor-pointer"
                  >
                    <span>Request Guidance on this Service</span>
                    <ArrowRight className="w-4 h-4 text-sky-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
