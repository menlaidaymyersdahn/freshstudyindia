import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenApplication: () => void;
  onExploreStudyInIndia: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenApplication,
  onExploreServices
}) => {
  return (
    <section
      id="home"
      className="pt-24 pb-16 lg:pt-24 lg:pb-24 bg-[#F7F5F0] text-[#181A1F] border-b border-[#181A1F]/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Concrete Headline, Copy & Restrained Two-Button Hierarchy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <p className="text-sm text-[#4F535C]">
              International higher education advisory — Monrovia and Hyderabad
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.025em] text-[#181A1F] leading-[1.08]">
              Study in India with direct admissions support
            </h1>

            <p className="text-base sm:text-lg text-[#4F535C] max-w-xl leading-relaxed font-normal">
              Myers Global Pathways guides international students through university selection, document verification, direct admissions, Indian student visa filings, and campus arrival.
            </p>

            {/* One Primary Button + One Quiet Secondary Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenApplication}
                className="px-6 py-3 rounded-lg bg-[#A63A24] hover:bg-[#8C2F1C] text-white text-sm font-medium transition-ui inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start your application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="px-6 py-3 rounded-lg bg-transparent hover:bg-white text-[#181A1F] border border-[#181A1F]/[0.14] hover:border-[#181A1F]/[0.24] text-sm font-medium transition-ui cursor-pointer"
              >
                Explore our services
              </button>
            </div>

            {/* Quiet Factual Scope Line */}
            <div className="pt-6 border-t border-[#181A1F]/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#4F535C]">
              <div>
                <p className="font-medium text-[#181A1F]">Personalized advising</p>
                <p className="text-xs text-[#6E727D] mt-1">Course and budget matching</p>
              </div>
              <div>
                <p className="font-medium text-[#181A1F]">Transparent process</p>
                <p className="text-xs text-[#6E727D] mt-1">Clear tuition and hostel costs</p>
              </div>
              <div>
                <p className="font-medium text-[#181A1F]">End-to-end visa support</p>
                <p className="text-xs text-[#6E727D] mt-1">Offer letter to campus arrival</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Unobstructed Authentic Graduation Photograph */}
          <div className="lg:col-span-6">
            <figure className="rounded-2xl bg-white border border-[#181A1F]/[0.08] p-2">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EFECE4]">
                <img
                  src="/images/hero-founder-campus-web.jpg"
                  srcSet="/images/hero-founder-campus-web.jpg 1x, /images/hero-founder-campus.jpg 2x"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/b5cNtHG2/DSC-9367.jpg';
                  }}
                  alt="International graduates guided by Myers Global Pathways at Shri Rawatpura Sarkar University in India"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>

              <figcaption className="px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#4F535C]">
                <span>Graduates in India — Shri Rawatpura Sarkar University</span>
                <span className="text-[#6E727D]">2026–2027 intakes open</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
};
