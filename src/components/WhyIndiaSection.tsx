import React from 'react';
import { 
  GraduationCap, 
  Wallet, 
  Layers, 
  TrendingUp, 
  Globe2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface WhyIndiaSectionProps {
  onOpenApplication: (field?: string) => void;
  onExplorePrograms: () => void;
}

export const WhyIndiaSection: React.FC<WhyIndiaSectionProps> = ({
  onOpenApplication,
  onExplorePrograms
}) => {
  return (
    <section 
      id="why-india"
      className="relative py-24 sm:py-32 bg-[#060D1A] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Editorial Typography */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span>Destination Insight</span>
            <span className="w-8 h-[1px] bg-amber-400" />
          </div>

          <h2 
            id="why-india-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]"
          >
            Why Study in India?
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            India has emerged as one of the world's most dynamic global education hubs, combining rigorous international standards, modern infrastructure, and unbeatable affordability.
          </p>
        </div>

        {/* Asymmetric Editorial Layout (Not 6 identical cards!) */}
        <div className="space-y-8">
          
          {/* Row 1: Large Featured Split (Quality Education & Affordable Opportunities) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Box 1: Quality Education (Large 7 cols with dark backdrop and photo snippet) */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Global Standards
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                  Quality Education & Accredited Universities
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                  Indian universities are globally recognized for excellence in Science, Technology, Medicine, and Management. Curricula are benchmarked to international standards and accredited by statutory bodies including UGC, AICTE, and NAAC with A++ institutional ratings.
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <span className="text-xs text-slate-400 font-mono">English-Medium Instruction</span>
                <button
                  onClick={() => onOpenApplication('Quality Education')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore universities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 2: Affordable Opportunities (5 cols, high-contrast gold highlight) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Wallet className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  High Return on Investment
                </span>

                <h3 className="text-2xl font-black text-white leading-snug">
                  Affordable Higher Education
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Earn a globally valid Bachelor’s, Master’s, or Ph.D. degree at a fraction of Western university costs, with affordable bundled hostel accommodation, meal plans, and campus living.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <p className="text-xs text-amber-200 font-medium">
                  Transparent fee structures with direct university tuition accounts.
                </p>
              </div>
            </div>

          </div>

          {/* Row 2: 3 Diverse Columns with Varied Visual Rhythm */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Box 3: Diverse Programs */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-sky-400 flex items-center justify-center border border-blue-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white">Diverse Programs</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                From Computer Science, AI, and Big Data to Pharmacy, Nursing, Law, and MBA — choose from over 500 accredited specializations tailored to global market demands.
              </p>
            </div>

            {/* Box 4: Growing Career Opportunities */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white">Career Opportunities</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                India is home to the world's premier tech clusters and pharma corridors. Gain real-world industrial capstone exposure, practical lab training, and project internships.
              </p>
            </div>

            {/* Box 5: International Student Environment */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-slate-700 transition-colors md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white">International Community</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Join a vibrant multicultural community of international students from across Africa, Asia, and the Middle East, with dedicated international student offices and student welfare cells.
              </p>
            </div>

          </div>

          {/* Row 3: Wide Cultural Experience Banner with Authentic Graduate Story */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Rich Cultural Experience</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Warm Hospitality & Enriching Campus Life
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience a welcoming, safe, and diverse environment that nurtures intellectual growth, cross-cultural friendships, and life-long professional networks.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4">
              <button
                id="why-india-explore-btn"
                onClick={onExplorePrograms}
                className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
              >
                <span>View Degree Programs</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
