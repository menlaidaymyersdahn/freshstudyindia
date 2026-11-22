import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

interface HeroProps {
  onOpenApplication: () => void;
  onExploreUniversities: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenApplication,
  onExploreUniversities
}) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[78vh] lg:min-h-[86vh] flex items-end lg:items-center overflow-hidden bg-[#071426] pt-24 pb-12 sm:pb-16 lg:pt-28 lg:pb-20"
    >
      {/* Full-Width Real Uploaded Graduation Photograph (web-optimized for fast mobile load) */}
      <img
        src="/assets/aistudio/DSC_9367_web.jpg"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.dataset.fallbackUsed) {
            target.dataset.fallbackUsed = 'true';
            target.src = '/assets/aistudio/DSC_9367_95782880.jpeg';
          }
        }}
        alt="International graduating students in academic regalia in India guided by Myers Global Pathways"
        className="absolute inset-0 w-full h-full object-cover object-[50%_26%] sm:object-[50%_24%] lg:object-[62%_26%]"
        referrerPolicy="no-referrer"
        loading="eager"
      />

      {/* Calibrated Deep Navy Editorial Scrim for Crisp White Text Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071426]/95 via-[#0B1F3A]/78 to-[#0B1F3A]/35 lg:hidden"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          background:
            'linear-gradient(96deg, rgba(7, 20, 38, 0.94) 0%, rgba(11, 31, 58, 0.84) 44%, rgba(11, 31, 58, 0.42) 72%, rgba(7, 20, 38, 0.28) 100%)'
        }}
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071426]/70 to-transparent"
        aria-hidden="true"
      />

      {/* Editorial Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left space-y-6">
          {/* Clean Trust Statement (Unboxed Editorial Line) */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#C5922E] shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-semibold text-[#F0C86E] tracking-[0.01em]">
              Your International Education Journey, Guided Every Step of the Way.
            </p>
          </div>

          {/* Primary Display Headline */}
          <h1
            className="font-display font-bold text-white tracking-[-0.025em] leading-[1.08] text-balance"
            style={{ fontSize: 'clamp(2.125rem, 4.3vw, 3.75rem)' }}
          >
            Your Journey to Quality Education in India Starts Here.
          </h1>

          {/* Supporting Description */}
          <p className="font-body text-base sm:text-lg text-slate-200 leading-[1.65] max-w-xl font-normal">
            Myers Global Pathways helps international students access university admissions in India through personalized academic guidance, transparent fee information, documentation assistance, student visa guidance, and arrival support.
          </p>

          {/* Two Prominent CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              type="button"
              onClick={onOpenApplication}
              className="px-7 py-3.5 rounded-lg bg-[#C5922E] hover:bg-[#D4A13B] text-[#081528] font-semibold text-sm sm:text-[15px] transition-ui inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreUniversities}
              className="px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/35 backdrop-blur-xs font-semibold text-sm sm:text-[15px] transition-ui inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5922E]"
            >
              <Building2 className="w-4 h-4 text-[#F0C86E]" />
              <span>Explore Universities</span>
            </button>
          </div>

          {/* Subtle Operational Anchor Line */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] text-slate-300">
            <span>Monrovia, Liberia &amp; India Advisory Desks</span>
            <span className="text-[#C5922E]" aria-hidden="true">·</span>
            <span>English-Medium University Programs</span>
            <span className="text-[#C5922E]" aria-hidden="true">·</span>
            <span>Direct Student Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
