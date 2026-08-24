import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { PROGRAM_DISCIPLINES, getWhatsAppLink } from '../lib/constants';

interface StudyInIndiaSectionProps {
  onOpenApplication: (courseName?: string) => void;
  onNavigateHome?: () => void;
}

export const StudyInIndiaSection: React.FC<StudyInIndiaSectionProps> = ({
  onOpenApplication,
  onNavigateHome
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'Undergraduate' | 'Postgraduate'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDisciplines = PROGRAM_DISCIPLINES.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || d.degrees.includes(selectedLevel);
    const matchesSearch = searchQuery === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.popularCourses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <section 
      id="study-in-india"
      className="py-24 sm:py-32 bg-[#050B14] text-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-800 pb-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <span>Academic Opportunities</span>
              <span className="w-8 h-[1px] bg-amber-400" />
            </div>

            <h2 
              id="study-india-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]"
            >
              Study in India
            </h2>

            <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
              Explore internationally recognized degree tracks across accredited Indian universities. All programs are delivered in English with comprehensive lab and industry training.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-6 text-left">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">English Instruction</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-2xl font-black text-white">UGC / NAAC</p>
              <p className="text-xs text-slate-400 font-medium">Accredited Degrees</p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses (e.g., AI, MBA, Pharmacy)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Degree Level Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Degree Level:</span>
              {(['all', 'Undergraduate', 'Postgraduate'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl === 'all' ? 'All Degrees' : lvl}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDisciplines.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Popular Specializations */}
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Popular Specializations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.popularCourses.map((c, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Intakes: <strong className="text-white">July & Nov</strong></span>
                <button
                  onClick={() => onOpenApplication(item.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>Apply for track</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Talk to Admissions Banner Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-left">
            <h3 className="text-2xl font-bold text-white">
              Not sure which degree fits your career goal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with a Myers Global Pathways academic counselor for customized university recommendations and credential screening.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={getWhatsAppLink('india', 'Hello Myers Global Pathways, I would like academic counseling on which degree in India is best for me.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to Admissions on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
