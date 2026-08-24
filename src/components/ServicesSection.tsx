import React, { useState } from 'react';
import { CORE_SERVICES } from '../config/company';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenApplication: (service?: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApplication }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);

  const activeService = CORE_SERVICES.find(s => s.id === activeServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#060B19] text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Advisory Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Help
          </h2>
          <p className="text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
            From preliminary course selection and documentation attestation to visa guidance, arrival support, and ongoing student care in India.
          </p>
        </div>

        {/* Master-Detail Interactive Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Large Numbered Interactive Service Index (01 to 08) */}
          <div className="lg:col-span-5 space-y-2 text-left">
            {CORE_SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 border border-amber-500/50 shadow-md text-white' 
                      : 'bg-transparent border border-slate-800/60 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-xs sm:text-sm font-mono font-bold ${
                      isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {service.number}
                    </span>
                    <span className={`text-sm sm:text-base font-bold tracking-tight ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {service.title}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    isActive ? 'text-amber-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Service Detail & High-End Photography */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-left space-y-6">
              
              {/* Service Number & Header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    Service {activeService.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {activeService.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Tagline & Narrative Description */}
              <div>
                <p className="text-sm font-semibold text-amber-300/90 leading-relaxed">
                  {activeService.tagline}
                </p>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Editorial Photograph */}
              <div className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[280px] border border-slate-800">
                <img
                  src={activeService.image}
                  alt={activeService.imageAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 font-medium">
                  {activeService.imageAlt}
                </div>
              </div>

              {/* Key Deliverables Highlights */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What This Guidance Includes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeService.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action CTA */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400">
                  Ready to begin your journey with Myers Global Pathways?
                </span>
                <button
                  onClick={() => onOpenApplication(activeService)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Apply for {activeService.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
