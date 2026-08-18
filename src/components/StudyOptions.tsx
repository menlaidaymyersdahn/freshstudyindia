import React, { useState } from 'react';
import { 
  Laptop, 
  Briefcase, 
  Cpu, 
  Stethoscope, 
  Database, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { STUDY_OPTIONS, getWhatsAppLink } from '../lib/constants';
import { StudyField } from '../types';

interface StudyOptionsProps {
  onSelectOption: (fieldTitle: string) => void;
}

export const StudyOptions: React.FC<StudyOptionsProps> = ({ onSelectOption }) => {
  const [selectedField, setSelectedField] = useState<StudyField>('COMPUTER SCIENCE');

  const getIcon = (id: StudyField) => {
    switch (id) {
      case 'COMPUTER SCIENCE':
        return Laptop;
      case 'BUSINESS':
        return Briefcase;
      case 'ENGINEERING':
        return Cpu;
      case 'HEALTHCARE':
        return Stethoscope;
      case 'DATA & TECHNOLOGY':
        return Database;
      case 'OTHER':
      default:
        return Sparkles;
    }
  };

  const currentOption = STUDY_OPTIONS.find(opt => opt.id === selectedField) || STUDY_OPTIONS[0];

  return (
    <section id="study-options" className="py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span>Academic Streams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
            WHAT DO YOU WANT TO STUDY?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Select your discipline to see popular program options and speak with an advisor about suitable universities in India.
          </p>
        </div>

        {/* Large Selectable Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {STUDY_OPTIONS.map((opt) => {
            const Icon = getIcon(opt.id);
            const isSelected = selectedField === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedField(opt.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-36 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-lg scale-102 -translate-y-1'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className={`text-xs sm:text-sm font-extrabold tracking-tight uppercase leading-snug ${
                    isSelected ? 'text-white' : 'text-[#0B192C]'
                  }`}>
                    {opt.id}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Option Interactive Detail & Advisor Panel */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase">
                <span>Selected Field</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
                Looking for a course in {currentOption.title}?
              </h3>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Talk to our advisor and we'll help you explore suitable options in India.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Popular Specializations</p>
                  <ul className="text-xs text-slate-700 space-y-1 font-medium">
                    {currentOption.popularSpecializations.map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Typical Degree Levels</p>
                  <p className="text-xs text-slate-700 font-semibold">{currentOption.degreeTypes.join(' • ')}</p>
                  <p className="text-[11px] text-slate-500 pt-1">Standard Duration: {currentOption.duration}</p>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  Direct Guidance
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Discuss your {currentOption.title} options
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our counselors will match your academic records with eligible colleges offering {currentOption.title} in India.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onSelectOption(currentOption.title)}
                  className="w-full py-3.5 px-5 rounded-xl text-xs font-extrabold uppercase tracking-wide text-white bg-sky-500 hover:bg-sky-400 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>DISCUSS MY OPTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Fresh Study India, I am looking for course options in ${currentOption.title}. Please guide me on suitable universities.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp About {currentOption.title}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
