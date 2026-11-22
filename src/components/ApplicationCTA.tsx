import React from 'react';
import { ArrowRight, MessageCircle, MessageSquare } from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';

interface ApplicationCTAProps {
  onOpenApplication: () => void;
  onContactClick: () => void;
  onOpenAdvisor?: () => void;
}

export const ApplicationCTA: React.FC<ApplicationCTAProps> = ({
  onOpenApplication,
  onContactClick,
  onOpenAdvisor
}) => {
  const whatsappConfig = getWhatsAppConfig();

  return (
    <section
      id="apply-now"
      className="py-16 lg:py-20 bg-[#F4F6F9] text-[#0F172A] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white border border-slate-200/90 p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left shadow-[0_4px_20px_rgba(11,31,58,0.05)]">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
              Ready to Take the Next Step?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#0B1F3A] leading-[1.15] text-balance">
              Submit Your Academic Profile for Admissions Review
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Share your qualifications and preferred degree program. Our Monrovia and India admissions advisors will review your eligibility and respond with suitable university options, fee structures, and documentation steps.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:items-stretch xl:items-center lg:justify-end gap-3">
            <button
              type="button"
              onClick={onOpenApplication}
              className="px-6 py-3.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-h-[48px]"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
            </button>

            <a
              href={whatsappConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 text-[#0B1F3A] border border-slate-300 text-sm font-semibold transition-ui inline-flex items-center justify-center gap-2 whitespace-nowrap min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 text-[#9A6D17]" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Inline Secondary Support Bar (especially helpful on mobile with zero floating clutter) */}
          <div className="lg:col-span-12 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
            <p>
              Have questions about tuition fees, WAEC/WASSCE eligibility, or Indian student visas?
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {onOpenAdvisor && (
                <button
                  type="button"
                  onClick={onOpenAdvisor}
                  className="font-semibold text-[#0B1F3A] hover:text-[#9A6D17] inline-flex items-center gap-1.5 transition-ui cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5922E]" aria-hidden="true" />
                  <span>Ask Admissions Advisor</span>
                </button>
              )}
              <button
                type="button"
                onClick={onContactClick}
                className="font-semibold text-[#0B1F3A] hover:text-[#9A6D17] inline-flex items-center gap-1.5 transition-ui cursor-pointer"
              >
                <span>View Office &amp; Email Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTA;
