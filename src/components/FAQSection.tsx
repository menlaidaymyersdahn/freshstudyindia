import React, { useState } from 'react';
import { FAQ_ITEMS } from '../config/company';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, ArrowUpRight, Search } from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';

interface FAQSectionProps {
  onOpenApplication: () => void;
  onOpenAdvisorChat?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenApplication,
  onOpenAdvisorChat
}) => {
  const whatsappConfig = getWhatsAppConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('faq-requirements');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Questions' },
    { id: 'Admissions', label: 'Admissions & Eligibility' },
    { id: 'Courses & Universities', label: 'Courses & Degrees' },
    { id: 'Fees & Living', label: 'Tuition & Costs' },
    { id: 'Visa & Travel', label: 'Student Visa' },
    { id: 'Student Support', label: 'Support & Contact' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F4F7FB] text-slate-900 scroll-mt-24 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-950 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18]">
            Clear Answers for Your <br className="hidden sm:inline" />
            <span className="text-amber-600">Study in India</span> Journey
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl leading-relaxed">
            Everything you need to know about Indian university admissions, degree programs, student visas, and life on campus.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0A1128] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Accordion Column */}
          <div className="lg:col-span-8 space-y-3.5 text-left">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500">
                <p className="text-sm font-semibold">No questions found matching your search.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-amber-700 font-bold hover:underline"
                >
                  Clear filters & show all questions
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                      isOpen
                        ? 'border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 pr-2">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'bg-amber-400 text-slate-950 rotate-180' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 animate-fadeIn">
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Callout Box */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0A1128] text-white border border-slate-800 shadow-xl space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Have a Specific Question?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Our admissions counselors and AI advisor are ready to answer any program, course, or visa inquiry.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Admissions</span>
                </a>

                <button
                  onClick={onOpenApplication}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Start Your Application</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Direct Contacts:</p>
                <p>Email: <a href="mailto:admissions@myersglobalpathways.com" className="text-amber-400 hover:underline">admissions@myersglobalpathways.com</a></p>
                <p>Primary Phone: <span className="text-slate-300 font-medium">+231 889425645</span></p>
                <p>Alternative: <span className="text-slate-300 font-medium">+91 93478 69324</span></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
