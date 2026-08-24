import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  Compass,
  MessageCircle
} from 'lucide-react';
import { STUDY_OPTIONS, getWhatsAppLink } from '../lib/constants';

interface StudyProgramsProps {
  onSelectProgram: (programTitle: string) => void;
}

export const StudyPrograms: React.FC<StudyProgramsProps> = ({ onSelectProgram }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPrograms = selectedCategory === 'all' 
    ? STUDY_OPTIONS 
    : STUDY_OPTIONS.filter(p => p.id === selectedCategory);

  return (
    <section id="programs" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800 mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Academic Opportunities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Explore Degree Programs
            </h2>

            <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
              Discover accredited undergraduate, postgraduate, and doctoral degree pathways across high-demand disciplines in India.
            </p>
          </div>

          {/* Quick Stats or Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Streams
            </button>
            {STUDY_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === item.id
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {item.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Scalable Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {program.duration}
                  </span>
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                </div>

                {/* Program Title */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {program.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {program.shortDesc}
                </p>

                {/* Degrees Awarded */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Common Degree Awards
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.degreeTypes.map((deg, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Specializations */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Key Specializations
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {program.popularSpecializations.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProgram(program.title)}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Myers Global Pathways, I would like more information on the ${program.title} program.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-emerald-700 font-medium transition"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Looking for a specific degree, research program, or diploma? Contact our admissions desk for customized program matching.
        </div>

      </div>
    </section>
  );
};
