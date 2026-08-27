import React, { useState } from 'react';
import { CORE_SERVICES } from '../config/company';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Layers, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from './ScrollReveal';

interface ServicesSectionProps {
  onOpenApplication: (service?: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApplication }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');

  const activeService = CORE_SERVICES.find(s => s.id === activeServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-[#E2EFFD] via-[#EAF3FD] to-[#E2EEFA] text-slate-900 scroll-mt-24 border-b border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Comprehensive Advisory Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Our Complete Services
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-3 max-w-2xl leading-relaxed font-normal">
              Every stage of your educational journey is fully supported — from course discovery and visa documentation to flight arrival and on-campus welfare in India.
            </p>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-sky-300 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'interactive' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-blue-950'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Interactive Detail</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-blue-950'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>All Services Grid</span>
            </button>
          </div>
        </ScrollReveal>

        {/* View 1: Interactive Master-Detail */}
        {viewMode === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Numbered Service Index (01 to 08) */}
            <ScrollReveal direction="left" className="lg:col-span-5 space-y-2.5 text-left">
              {CORE_SERVICES.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full p-4.5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-xs ${
                      isActive 
                        ? 'bg-blue-600 border border-blue-700 shadow-md text-white' 
                        : 'bg-white border border-sky-200 hover:bg-sky-50/80 hover:border-blue-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${
                        isActive ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-blue-900 group-hover:bg-blue-100'
                      }`}>
                        {service.number}
                      </span>
                      <div>
                        <span className={`text-base font-bold tracking-tight block ${
                          isActive ? 'text-white' : 'text-slate-900 group-hover:text-blue-900'
                        }`}>
                          {service.title}
                        </span>
                        <span className={`text-xs line-clamp-1 mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                      isActive ? 'text-amber-300 translate-x-1' : 'text-slate-400 group-hover:text-blue-600'
                    }`} />
                  </button>
                );
              })}
            </ScrollReveal>

            {/* Right Column: Selected Service Detailed Showcase */}
            <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-lg text-left space-y-6"
                >
                  
                  {/* Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-sky-100 pb-5">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">
                        Service {activeService.number} of 08
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                        {activeService.title}
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-sky-300 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <div>
                    <p className="text-base font-bold text-blue-900 leading-relaxed">
                      {activeService.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed font-normal">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      What This Service Delivers:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Action Button */}
                  <div className="pt-6 border-t border-sky-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-slate-600 font-medium">
                      Ready to proceed with this service?
                    </span>
                    <button
                      onClick={() => onOpenApplication(activeService)}
                      className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Apply for {activeService.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </ScrollReveal>

          </div>
        )}

        {/* View 2: All 8 Services Grid */}
        {viewMode === 'grid' && (
          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CORE_SERVICES.map((service) => (
              <ScrollStaggerItem key={service.id}>
                <div
                  className="h-full p-6 rounded-3xl bg-white border border-sky-200 shadow-sm flex flex-col justify-between hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-900 bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200">
                        {service.number}
                      </span>
                      <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {service.tagline}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-sky-100">
                    <button
                      onClick={() => onOpenApplication(service)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Select Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        )}

      </div>
    </section>
  );
};
