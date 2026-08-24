import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Building2, 
  FileText, 
  FileCheck2, 
  ShieldCheck, 
  Plane, 
  Users, 
  HeartHandshake,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppLink } from '../lib/constants';

interface ServicesSectionProps {
  onOpenApplication: (serviceTitle?: string) => void;
  onNavigateHome?: () => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'university-course-selection': <Compass className="w-6 h-6" />,
  'admission-guidance': <Building2 className="w-6 h-6" />,
  'application-assistance': <FileText className="w-6 h-6" />,
  'document-preparation': <FileCheck2 className="w-6 h-6" />,
  'visa-guidance': <ShieldCheck className="w-6 h-6" />,
  'pre-departure-support': <Plane className="w-6 h-6" />,
  'arrival-orientation': <Users className="w-6 h-6" />,
  'student-support': <HeartHandshake className="w-6 h-6" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenApplication,
  onNavigateHome
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_LIST[0].id);

  const activeService = SERVICES_LIST.find((s) => s.id === activeServiceId) || SERVICES_LIST[0];

  return (
    <section 
      id="services"
      className="py-24 sm:py-32 bg-[#FAFAF8] text-[#0A1120] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D99B26]">
            <span>Advisory Services</span>
            <span className="w-8 h-[1px] bg-[#D99B26]" />
          </div>

          <h2 
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]"
          >
            How We Help
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From initial university discovery to graduation and airport arrival, Myers Global Pathways provides personalized, transparent guidance for international students.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Large Numbered Service Index (01 through 08) */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select an Advisory Stage
            </p>

            <div className="space-y-2">
              {SERVICES_LIST.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    id={`service-item-${service.id}`}
                    onClick={() => setActiveServiceId(service.id)}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-900/10'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number */}
                      <span className={`text-sm font-mono font-bold ${
                        isActive ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {service.number}
                      </span>

                      {/* Title */}
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`text-xs font-normal ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-amber-400 translate-x-1' : 'text-slate-300'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Deep Service Showcase */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
              
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#D99B26] flex items-center justify-center">
                    {serviceIcons[activeService.id] || <Compass className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D99B26] uppercase tracking-wider">
                      Stage {activeService.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                      {activeService.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {activeService.description}
                </p>

                {/* Key Deliverable Box */}
                {activeService.deliverable && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#D99B26] shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Official Deliverable
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {activeService.deliverable}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Checklist details */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What This Stage Includes
                </p>
                <div className="space-y-2.5">
                  {activeService.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-[#D99B26] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-normal">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="service-apply-btn"
                  onClick={() => onOpenApplication(activeService.title)}
                  className="flex-1 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all text-center cursor-pointer shadow-md"
                >
                  Apply for this Service
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Myers Global Pathways, I would like to learn more about the ${activeService.title} service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
