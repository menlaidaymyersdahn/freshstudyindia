import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Compass,
  MessageCircle,
  BookOpen,
  Search
} from 'lucide-react';
import { STUDY_OPTIONS, getWhatsAppLink } from '../lib/constants';

interface StudyProgramsProps {
  onSelectProgram: (programTitle: string) => void;
  onNavigateHome?: () => void;
}

export const StudyPrograms: React.FC<StudyProgramsProps> = ({ 
  onSelectProgram,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrograms = STUDY_OPTIONS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.id === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.popularSpecializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.degreeTypes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-[#FAFCFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            {onNavigateHome ? (
              <button 
                onClick={onNavigateHome}
                className="hover:text-blue-700 transition cursor-pointer"
              >
                Home
              </button>
            ) : (
              <span>Home</span>
            )}
            <span>/</span>
            <span className="text-blue-700">Degree Programs</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
            <Compass className="w-3.5 h-3.5" />
            <span>Academic Programs Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Accredited University Degree Programs in India
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Explore accredited undergraduate, postgraduate, and doctoral degree pathways across high-demand disciplines in India. All curricula are taught in 100% English with state-of-the-art laboratory exposure.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Streams ({STUDY_OPTIONS.length})
              </button>
              {STUDY_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedCategory === item.id
                      ? 'bg-blue-700 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.title.split('&')[0].trim()}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search program or degree..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

          </div>
        </div>

        {/* Scalable Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
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
                      {program.popularSpecializations.map((spec, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProgram(program.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition cursor-pointer"
                  >
                    <span>Apply for {program.id}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppLink('india', `Hello Myers Global Pathways, I am interested in ${program.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No programs match your current filter.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
              >
                Clear Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Program Guidance Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Need Guidance on Course Prerequisites or Intake Timelines?</h4>
            <p className="text-xs text-slate-600">
              Our academic advisors can evaluate your high school (WASSCE / WAEC / CBSE) or Bachelor transcripts to recommend the exact university entry path.
            </p>
          </div>
          <button
            onClick={() => onSelectProgram('General Admission')}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shrink-0 transition cursor-pointer shadow-xs"
          >
            Request Transcript Evaluation
          </button>
        </div>

      </div>
    </div>
  );
};
