import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, Award } from 'lucide-react';

interface TestimonialsViewProps {
  testimonials?: Testimonial[];
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ testimonials = [] }) => {
  const list = testimonials || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          Student Success Stories
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Read Real Experiences from <span className="text-emerald-600">Alumni</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Over 4,200+ international students enrolled in their dream universities through Fresh Study India.
        </p>
      </div>

      {/* Testimonial Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(Math.max(1, Math.min(5, t.rating || 5)))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-200" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.studentName}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/30"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{t.studentName}</h4>
                <p className="text-[11px] font-semibold text-emerald-600">{t.university}</p>
                {t.scholarshipReceived && (
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                    <Award className="w-3 h-3 text-amber-500 shrink-0" />
                    {t.scholarshipReceived}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
