import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  ClipboardCheck,
  FileText,
  FolderCheck,
  Stamp,
  PlaneTakeoff,
  MapPinned,
  HeartHandshake
} from 'lucide-react';
import { CORE_SERVICES } from '../config/company';

interface HomeServicesSectionProps {
  onExploreServices: () => void;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'university-selection': GraduationCap,
  'admission-guidance': ClipboardCheck,
  'application-assistance': FileText,
  'document-preparation': FolderCheck,
  'visa-guidance': Stamp,
  'pre-departure-support': PlaneTakeoff,
  'arrival-orientation': MapPinned,
  'student-support': HeartHandshake
};

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({
  onExploreServices
}) => {
  return (
    <section
      id="our-services"
      className="py-16 lg:py-24 bg-white text-[#0F172A] border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
              Eight End-to-End Advisory Services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0B1F3A] leading-[1.15] text-balance">
              Comprehensive Admissions Consultancy From Inquiry to Campus Arrival
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every student receives structured, sequential guidance covering degree selection, university applications, documentation, Indian student visas, and ongoing support in India.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreServices}
            className="self-start lg:self-end px-5 py-3 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>View Full Service Guide</span>
            <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
          </button>
        </div>

        {/* 8-Service Premium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CORE_SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] || GraduationCap;
            return (
              <div
                key={service.id}
                className="group p-6 rounded-xl bg-[#F4F6F9]/60 hover:bg-white border border-slate-200/85 hover:border-[#0B1F3A]/30 flex flex-col justify-between gap-5 transition-ui hover:shadow-[0_6px_20px_rgba(11,31,58,0.06)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-[#0B1F3A] text-[#0B1F3A] group-hover:text-[#E5B95C] border border-slate-200 group-hover:border-[#0B1F3A] flex items-center justify-center transition-ui">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-base font-bold text-[#0B1F3A] leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70">
                  <button
                    type="button"
                    onClick={onExploreServices}
                    className="text-xs font-semibold text-[#0B1F3A] group-hover:text-[#9A6D17] inline-flex items-center gap-1.5 transition-ui cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

export default HomeServicesSection;
