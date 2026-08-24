import React from 'react';
import { ArrowRight, CheckCircle2, Award, Users, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface EditorialIntroProps {
  onOpenApplication: () => void;
  onExploreServices: () => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({
  onOpenApplication,
  onExploreServices
}) => {
  return (
    <section 
      id="editorial-intro"
      className="relative py-24 sm:py-32 bg-[#FAFAF8] text-[#0A1120] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Headline */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D99B26]">
            <span>Who We Are</span>
            <span className="w-8 h-[1px] bg-[#D99B26]" />
          </div>

          <h2 
            id="intro-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]"
          >
            Your Journey to India Starts With the Right Guidance.
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed pt-2">
            Myers Global Pathways is an international higher education consultancy dedicated to guiding students from Africa and around the world into accredited universities across India.
          </p>
        </div>

        {/* Large Image and Text Composition (High-end Editorial Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Large Editorial Image Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              <ImageWithFallback
                src={IMAGES.convocation.src}
                fallbackSrc={IMAGES.convocation.publicUrl}
                alt="International Students Graduation Convocation Ceremony in India"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Real International Graduates in India
                </p>
                <p className="text-sm sm:text-base font-semibold text-slate-100">
                  Graduating with globally recognized degrees from accredited Indian faculties.
                </p>
              </div>
            </div>

            {/* Subtle floating accent pill */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D99B26] flex items-center justify-center shrink-0 border border-amber-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">100% Transparent</p>
                <p className="text-[11px] text-slate-500 font-medium">Direct admissions advisory without deceptive intermediaries.</p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Editorial Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Pursuing higher education abroad is one of the most transformative decisions of a student's life. Yet, navigating international admission prerequisites, credential equivalencies, visa regulations, and unfamiliar universities can be overwhelming.
              </p>

              <p>
                At <strong>Myers Global Pathways</strong>, we bridge this divide with end-to-end clarity. Founded with firsthand international student experience, our advisors walk alongside you at every juncture — from initial high school transcript review to your first day on campus in India.
              </p>
            </div>

            {/* 3 Key Editorial Pillars */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-[#D99B26] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Accredited Academic Options</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Every institution we recommend is fully recognized by UGC, AICTE, and NAAC.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-[#D99B26] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Document & Visa Verification</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Thorough assembly of your official embassy dossier and bonafide certification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-[#D99B26] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">On-Ground India Arrival Care</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Airport meet-and-greet, hostel check-in support, and local settlement assistance.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-4">
              <button
                id="intro-services-btn"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#D99B26] transition-colors cursor-pointer group"
              >
                <span>Discover How We Help</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
