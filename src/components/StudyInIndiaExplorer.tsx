import React, { useState } from 'react';
import { Search, Filter, BookOpen, Building2, MapPin, GraduationCap, MessageSquare, Info } from 'lucide-react';

interface StudyInIndiaExplorerProps {
  onOpenApplication: (preset?: { studyLevel?: string; field?: string }) => void;
  onContactAdmissions: () => void;
}

export const StudyInIndiaExplorer: React.FC<StudyInIndiaExplorerProps> = ({
  onOpenApplication,
  onContactAdmissions
}) => {
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedField, setSelectedField] = useState('All Disciplines');
  const [searchQuery, setSearchQuery] = useState('');

  const studyLevels = [
    'All Levels',
    'Undergraduate (Bachelor’s)',
    'Postgraduate (Master’s)',
    'Doctoral (Ph.D.)',
    'Diploma & Specialized Certifications'
  ];

  const studyFields = [
    'All Disciplines',
    'Engineering & Technology',
    'Computer Science & Information Technology',
    'Business Administration & Management',
    'Pharmacy & Allied Health Sciences',
    'Biotechnology & Life Sciences',
    'Humanities, Media & Design'
  ];

  return (
    <section id="explorer" className="py-20 lg:py-28 bg-[#FAFCFF] text-slate-900 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Academic Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Find Your Path in India
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Filter by qualification level and academic discipline to explore potential study pathways with our admissions advisors.
          </p>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-left">
                Course or Specialization
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Computer Science, MBA, Pharmacy..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                />
              </div>
            </div>

            {/* Study Level Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-left">
                Study Level
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 cursor-pointer"
                >
                  {studyLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field of Study Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-left">
                Field of Study
              </label>
              <div className="relative">
                <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 cursor-pointer"
                >
                  {studyFields.map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Quick Selection Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500">Popular Queries:</span>
            {['Computer Science', 'B.Tech Engineering', 'MBA / Management', 'Pharmacy', 'Data Analytics', 'Nursing'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Professional Empty State as explicitly specified */}
        <div className="mt-8 p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-950">
            Personalized Program Advisory
          </h3>

          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
            University and program information is being prepared. Speak with our admissions team to explore your options.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onContactAdmissions}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Admissions</span>
            </button>

            <button
              onClick={() => onOpenApplication({
                studyLevel: selectedLevel !== 'All Levels' ? selectedLevel : undefined,
                field: selectedField !== 'All Disciplines' ? selectedField : undefined
              })}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
            >
              Submit Profile for Evaluation
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Advisors respond with tailored course recommendations based on your transcript.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
