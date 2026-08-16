import React, { useState } from 'react';
import { Course, ActiveTab } from '../types';
import { Search, BookOpen, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

interface CoursesViewProps {
  courses?: Course[];
  setActiveTab: (tab: ActiveTab) => void;
  onApplyForCourse?: (courseName: string, uniName: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses = [],
  setActiveTab,
  onApplyForCourse
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedCourseId, setAppliedCourseId] = useState<string | null>(null);

  const categories = ['All', 'Technology', 'Engineering', 'Business', 'Health Sciences', 'Agriculture, Media & Hospitality'];
  const levels = ['All', 'Bachelor', 'Master', 'PhD'];

  const courseList = courses || [];

  const filteredCourses = courseList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Technology' && (c.discipline.includes('Tech') || c.discipline.includes('Computer') || c.discipline.includes('Data') || c.discipline.includes('AI') || c.discipline.includes('IT') || c.title.includes('BCA') || c.title.includes('MCA') || c.title.includes('Computer'))) ||
      (selectedCategory === 'Engineering' && (c.discipline.includes('Engineering') || c.title.includes('B.Tech') || c.title.includes('M.Tech'))) ||
      (selectedCategory === 'Business' && (c.discipline.includes('Business') || c.discipline.includes('Management') || c.title.includes('MBA') || c.title.includes('BBA') || c.title.includes('Commerce'))) ||
      (selectedCategory === 'Health Sciences' && (c.discipline.includes('Health') || c.discipline.includes('Medical') || c.discipline.includes('Medicine') || c.title.includes('MBBS') || c.title.includes('Pharmacy') || c.title.includes('Nursing'))) ||
      (selectedCategory === 'Agriculture, Media & Hospitality' && (c.discipline.includes('Agriculture') || c.discipline.includes('Media') || c.discipline.includes('Hospitality') || c.discipline.includes('Design') || c.discipline.includes('Arts')));

    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handleQuickApply = (course: Course) => {
    if (onApplyForCourse) {
      onApplyForCourse(course.title, course.university);
    }
    setAppliedCourseId(course.id);
    setTimeout(() => {
      setAppliedCourseId(null);
      setActiveTab('student-dashboard');
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-2xl relative z-10">
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            15,000+ Verified Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Find Your Dream <span className="text-emerald-400">Course</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Search top-tier degree programs with direct admission pathways, scholarship opportunities, and visa support.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AI, Data Science, Business, Engineering, Medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {levels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  selectedLevel === lvl
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Course Discipline Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Discipline:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Bento List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isApplied = appliedCourseId === course.id;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-full">
                    {course.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    {course.country}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mb-4">
                  {course.university}
                </p>

                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Duration:
                    </span>
                    <span className="font-semibold text-slate-800">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Mode:
                    </span>
                    <span className="font-semibold text-slate-800">{course.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Deadline:
                    </span>
                    <span className="font-semibold text-rose-600">{course.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Tuition Fee</span>
                  <span className="text-xs font-bold text-slate-900">{course.tuitionFee}</span>
                </div>

                <button
                  onClick={() => handleQuickApply(course)}
                  disabled={isApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isApplied 
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-900 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    <>
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
