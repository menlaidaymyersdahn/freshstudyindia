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
    <section id="explorer" className="py-20 lg:py-28 bg-[#EBF3FC] text-slate-900 border-b border-sky-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Find Your Path in India
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed font-normal">
            Filter by qualification level and academic discipline to explore potential study pathways with our admissions advisors.
          </p>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-800 mb-1.5 text-left">
                Course or Specialization
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Computer Science, MBA, Pharmacy..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            {/* Study Level Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 text-left">
                Study Level
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 cursor-pointer"
                >
                  {studyLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field of Study Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 text-left">
                Field of Study
              </label>
              <div className="relative">
                <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 cursor-pointer"
                >
                  {studyFields.map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Quick Selection Tags */}
          <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-sky-100">
            <span className="text-[11px] font-bold text-slate-600">Popular Queries:</span>
            {['Computer Science', 'B.Tech Engineering', 'MBA / Management', 'Pharmacy', 'Data Analytics', 'Nursing'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 hover:bg-blue-600 hover:text-white text-blue-900 border border-sky-200 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Advisory Guidance Box */}
        <div className="mt-8 p-8 sm:p-12 rounded-3xl bg-white border border-sky-200 text-center max-w-3xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-sky-300 text-blue-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Building2 className="w-7 h-7" />
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
            Personalized Program Advisory
          </h3>

          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed font-normal">
            University and program matchmaking is conducted individually by our admissions team based on your transcripts, interests, and budget.
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
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-blue-950 hover:bg-sky-50 border border-sky-300 transition-colors cursor-pointer bg-white"
            >
              Submit Profile for Evaluation
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-sky-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Advisors respond with tailored course recommendations based on your transcript.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
