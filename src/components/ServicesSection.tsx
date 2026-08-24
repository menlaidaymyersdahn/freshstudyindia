import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Building2,
  Compass,
  FileCheck2,
  FileText,
  ShieldCheck,
  Plane,
  Users,
  HeartHandshake
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppLink } from '../lib/constants';

interface ServicesSectionProps {
  onOpenApplication: (serviceTitle?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'university-course-selection': <Compass className="w-5 h-5" />,
  'admission-guidance': <Building2 className="w-5 h-5" />,
  'application-support': <FileText className="w-5 h-5" />,
  'documentation-assistance': <FileCheck2 className="w-5 h-5" />,
  'visa-guidance': <ShieldCheck className="w-5 h-5" />,
  'pre-departure-support': <Plane className="w-5 h-5" />,
  'student-arrival-orientation': <Users className="w-5 h-5" />,
  'ongoing-student-support': <HeartHandshake className="w-5 h-5" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApplication }) => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
            <span>Our Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Comprehensive Support for International Students
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From initial university selection to graduation day in India, our dedicated advisors guide you through every academic, administrative, and logistical step.
          </p>
        </div>

        {/* Clean Editorial Layout for Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-[#FAFCFF] border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with Icon and Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {serviceIcons[service.id] || <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="pt-2 space-y-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                  {service.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenApplication(service.title)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Myers Global Pathways, I would like to inquire about ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-400 hover:text-emerald-700 font-medium transition"
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold">
              Need personalized guidance on university options?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our admissions team evaluates your transcripts and responds within 24 hours.
            </p>
          </div>

          <button
            onClick={() => onOpenApplication()}
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-100 transition shadow-xs shrink-0 cursor-pointer"
          >
            Request Free Assessment
          </button>
        </div>

      </div>
    </section>
  );
};
