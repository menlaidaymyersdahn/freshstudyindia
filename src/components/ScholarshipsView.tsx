import React, { useState } from 'react';
import { Scholarship, ActiveTab } from '../types';
import { Award, Calendar, CheckCircle2, Globe2, Sparkles, X, Check } from 'lucide-react';

interface ScholarshipsViewProps {
  scholarships: Scholarship[];
  setActiveTab: (tab: ActiveTab) => void;
  onApplyScholarship?: (title: string) => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  scholarships,
  setActiveTab,
  onApplyScholarship
}) => {
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (sch: Scholarship) => {
    if (onApplyScholarship) {
      onApplyScholarship(sch.title);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedScholarship(null);
      setActiveTab('student-dashboard');
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            100% Tuition + Living Stipends
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Fully Funded <span className="underline decoration-yellow-300 underline-offset-4">Scholarships</span>
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-2">
            Secure Chevening, DAAD, Fulbright, and MEXT government funding. Our counselors assist with essay editing and interview preps.
          </p>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${sch.badgeColor}`}>
                  {sch.coverage}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  Deadline: {sch.deadline}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {sch.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                {sch.provider} ({sch.country})
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 my-4 space-y-2">
                <div className="text-xs">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Coverage Details</span>
                  <span className="font-bold text-emerald-700 text-sm">{sch.amount}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Eligible Nationalities</span>
                  <span className="font-semibold text-slate-700">{sch.eligibleNationalities}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {sch.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
              <div className="flex gap-1">
                {sch.degreeLevels.map((lvl, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                    {lvl}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedScholarship(sch)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Award className="w-3.5 h-3.5" />
                Apply for Grant
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedScholarship(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <Check className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800">Scholarship Application Added!</h3>
                <p className="text-slate-500 text-xs">
                  Your counselor has been assigned to help review your essay for {selectedScholarship.title}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-slate-900">{selectedScholarship.title}</h3>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">{selectedScholarship.amount}</p>
                  <p className="text-[11px] opacity-80">Deadline: {selectedScholarship.deadline}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedScholarship.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-800">What happens next?</span>
                  <ul className="text-xs text-slate-500 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Free Essay & Recommendation Letter evaluation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Direct portal submission before deadline
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedScholarship(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApply(selectedScholarship)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Submit Scholarship Intent
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
