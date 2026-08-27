import React from 'react';
import { ArrowUpRight, ChevronRight, Compass } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  highlightedWord?: string;
  description: string;
  currentPage: string;
  onNavigateHome: () => void;
  onOpenApplication: () => void;
  bgImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightedWord,
  description,
  currentPage,
  onNavigateHome,
  onOpenApplication,
  bgImage = '/DSC_9367.jpeg'
}) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 text-slate-900 overflow-hidden bg-gradient-to-b from-[#CDE2F8] via-[#E0EEFC] to-[#EBF3FC] border-b border-sky-300/80">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center opacity-15 filter scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#CDE2F8]/95 via-[#E0EEFC]/90 to-[#EBF3FC]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#CDE2F8] via-transparent to-[#EBF3FC]" />
      </div>

      {/* Ambient glowing orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-4 font-semibold">
          <button
            onClick={onNavigateHome}
            className="hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-800 font-bold">{currentPage}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-blue-900 text-xs font-bold tracking-wide backdrop-blur-sm shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {title}{' '}
              {highlightedWord && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-sky-700">
                  {highlightedWord}
                </span>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Action CTA on Right */}
          <div className="shrink-0 pt-2 lg:pt-0">
            <button
              onClick={onOpenApplication}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Start Application</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
