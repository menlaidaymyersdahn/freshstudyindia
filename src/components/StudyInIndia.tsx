import React from 'react';
import { 
  GraduationCap, 
  Layers, 
  DollarSign, 
  Users, 
  Briefcase, 
  Globe2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { STUDY_IN_INDIA_REASONS, getWhatsAppLink } from '../lib/constants';

interface StudyInIndiaProps {
  onOpenApplication: () => void;
}

const reasonIcons: Record<string, React.ReactNode> = {
  'quality-education': <GraduationCap className="w-5 h-5" />,
  'diverse-programs': <Layers className="w-5 h-5" />,
  'affordable-study': <DollarSign className="w-5 h-5" />,
  'international-environment': <Users className="w-5 h-5" />,
  'career-opportunities': <Briefcase className="w-5 h-5" />,
  'cultural-experience': <Globe2 className="w-5 h-5" />
};

export const StudyInIndia: React.FC<StudyInIndiaProps> = ({ onOpenApplication }) => {
  return (
    <section id="study-in-india" className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
            <span>Destination India</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why India is a Premier Higher Education Hub
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            India is home to one of the world's largest higher education systems, offering globally recognized degrees taught in English with cutting-edge laboratories, world-renowned technology hubs, and rich cultural immersion.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STUDY_IN_INDIA_REASONS.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-[#FAFCFF] border border-slate-200/90 hover:border-blue-300 hover:shadow-sm transition-all duration-200 space-y-4"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                {reasonIcons[item.id] || <GraduationCap className="w-5 h-5" />}
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Informative Strip with Clear Language of Instruction & Recognition */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs sm:text-sm text-slate-700">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">100% English Medium Instruction</p>
              <p className="text-slate-600 text-xs mt-0.5">
                All degree courses, lectures, exams, and textbooks are conducted entirely in English.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenApplication}
              className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Apply for 2026 Intake
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
