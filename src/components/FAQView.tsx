import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQViewProps {
  faqs?: FAQItem[];
}

export const FAQView: React.FC<FAQViewProps> = ({ faqs = [] }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(faqs?.[0]?.id || null);

  const categories = ['All', 'General', 'Application', 'Scholarship', 'Visa', 'Payment'];

  const filteredFaqs = (faqs || []).filter(
    f => activeCategory === 'All' || f.category === activeCategory
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center shadow-sm">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Help & Clarification
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked <span className="text-emerald-600">Questions</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Everything you need to know about processing timelines, fees, requirements, and visas.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left font-bold text-slate-800 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
