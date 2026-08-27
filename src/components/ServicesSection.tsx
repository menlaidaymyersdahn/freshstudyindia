import React, { useState } from 'react';
import { CORE_SERVICES } from '../config/company';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Layers, Grid } from 'lucide-react';

interface ServicesSectionProps {
  onOpenApplication: (service?: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApplication }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');

  const activeService = CORE_SERVICES.find(s => s.id === activeServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#060B19] text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Comprehensive Advisory Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Complete Services
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl leading-relaxed">
              Every stage of your educational journey is fully supported — from course discovery and visa documentation to flight arrival and on-campus welfare in India.
            </p>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'interactive' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Interactive Detail</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>All Services Grid</span>
            </button>
          </div>
        </div>

        {/* View 1: Interactive Master-Detail */}
        {viewMode === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Numbered Service Index (01 to 08) */}
            <div className="lg:col-span-5 space-y-2.5 text-left">
              {CORE_SERVICES.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full p-4.5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900 border border-amber-400 shadow-xl text-white ring-1 ring-amber-400/30' 
                        : 'bg-slate-900/50 border border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${
                        isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {service.number}
                      </span>
                      <div>
                        <span className={`text-base font-bold tracking-tight block ${
                          isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {service.title}
                        </span>
                        <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                      isActive ? 'text-amber-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Selected Service Detailed Showcase */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-left space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Service {activeService.number} of 08
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {activeService.title}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                {/* Narrative Description */}
                <div>
                  <p className="text-base font-semibold text-amber-300/90 leading-relaxed">
                    {activeService.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What This Service Delivers:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Action Button */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm text-slate-400">
                    Ready to proceed with this service?
                  </span>
                  <button
                    onClick={() => onOpenApplication(activeService)}
                    className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for {activeService.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* View 2: All 8 Services Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between hover:border-amber-400/80 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                      {service.number}
                    </span>
                    <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.tagline}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    {service.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => onOpenApplication(service)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Select Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
