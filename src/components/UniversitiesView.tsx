import React, { useState } from 'react';
import { University, ActiveTab } from '../types';
import { Search, MapPin, Award, ArrowUpRight, Filter, GraduationCap, X, CheckCircle } from 'lucide-react';

interface UniversitiesViewProps {
  universities: University[];
  setActiveTab: (tab: ActiveTab) => void;
  onApplyForUniversity?: (uniName: string) => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  universities,
  setActiveTab,
  onApplyForUniversity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const countries = ['All', 'Maharashtra', 'Karnataka', 'Gujarat', 'Delhi NCR', 'Rajasthan', 'Tamil Nadu'];

  const filteredUnis = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.topPrograms.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCountry = selectedCountry === 'All' || uni.city.toLowerCase().includes(selectedCountry.toLowerCase());
    return matchesSearch && matchesCountry;
  });

  const handleApply = (uni: University) => {
    if (onApplyForUniversity) {
      onApplyForUniversity(uni.name);
    }
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedUni(null);
      setActiveTab('student-dashboard');
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header Banner in Bento Styling */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" /> Study in India
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Premier Indian <span className="text-emerald-600">Universities & IITs</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Explore 250+ top-ranked institutions across India (IITs, IIMs, AIIMS, DU, BITS) with guaranteed counseling support.
          </p>
        </div>

        {/* Quick Search & Filters */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search university or major..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold px-3 py-2.5 text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* University Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnis.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner & Rank Tag */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  QS Rank #{uni.ranking}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Acceptance: {uni.acceptanceRate}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition">
                    {uni.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{uni.city}, {uni.country}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {uni.description}
                </p>

                {/* Top Programs Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {uni.topPrograms.slice(0, 3).map((prog, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                    >
                      {prog}
                    </span>
                  ))}
                  {uni.topPrograms.length > 3 && (
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-400 px-2 py-1 rounded-lg">
                      +{uni.topPrograms.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tuition Fee</span>
                <span className="text-xs font-bold text-slate-800">{uni.tuitionRange}</span>
              </div>

              <button
                onClick={() => setSelectedUni(uni)}
                className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* University Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedUni(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {applySuccess ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-800">Application Submitted!</h3>
                <p className="text-slate-500 text-sm">
                  We have added <span className="font-bold text-slate-800">{selectedUni.name}</span> to your Student Portal tracking list. Redirecting...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <img src={selectedUni.image} alt={selectedUni.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                    <div>
                      <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full mb-2 inline-block">
                        QS Rank #{selectedUni.ranking}
                      </span>
                      <h2 className="text-2xl font-bold text-white">{selectedUni.name}</h2>
                      <p className="text-slate-200 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {selectedUni.city}, {selectedUni.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Tuition Range</span>
                    <span className="text-xs font-bold text-slate-800">{selectedUni.tuitionRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Acceptance Rate</span>
                    <span className="text-xs font-bold text-slate-800">{selectedUni.acceptanceRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Admissions Status</span>
                    <span className="text-xs font-bold text-emerald-600">Open for 2024/2025</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-800 mb-2">Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedUni.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-800 mb-2">Top Programs Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUni.topPrograms.map((p, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedUni(null)}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleApply(selectedUni)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    Start Free Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
