import React, { useState } from 'react';
import { 
  Laptop, 
  Briefcase, 
  Stethoscope, 
  Cog, 
  Database, 
  Scale, 
  Palette, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface StudyOptionsProps {
  onOpenApplication: (presetField?: string) => void;
}

export const StudyOptions: React.FC<StudyOptionsProps> = ({ onOpenApplication }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const programs = [
    {
      id: 'cs',
      category: 'tech',
      title: 'Computer Science & AI',
      degrees: 'B.Tech / BCA / MCA / M.Tech',
      duration: '3 - 4 Years',
      badge: 'High Global Demand',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <Laptop className="w-5 h-5 text-sky-600" />,
      desc: 'Software development, artificial intelligence, machine learning, cloud computing, cybersecurity, and full-stack engineering.',
      careers: ['Software Engineer', 'Cloud Architect', 'Cybersecurity Analyst', 'AI Developer']
    },
    {
      id: 'business',
      category: 'business',
      title: 'Business & Management',
      degrees: 'BBA / MBA / B.Com',
      duration: '2 - 3 Years',
      badge: 'Leadership Track',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: <Briefcase className="w-5 h-5 text-rose-600" />,
      desc: 'International business, marketing, finance, human resource management, supply chain, and entrepreneurship.',
      careers: ['Business Analyst', 'Financial Manager', 'Marketing Director', 'Operations Lead']
    },
    {
      id: 'health',
      category: 'health',
      title: 'Healthcare & Allied Sciences',
      degrees: 'B.Pharm / B.Sc Nursing / M.Pharm',
      duration: '4 - 4.5 Years',
      badge: 'Clinical Practice',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      desc: 'Pharmacy, nursing, medical laboratory technology, physiotherapy, radiology, and public health systems.',
      careers: ['Registered Pharmacist', 'Healthcare Administrator', 'Clinical Nurse', 'Medical Lab Director']
    },
    {
      id: 'eng',
      category: 'tech',
      title: 'Engineering & Technology',
      degrees: 'B.Tech / M.Tech / Diploma',
      duration: '3 - 4 Years',
      badge: 'Core Industry',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: <Cog className="w-5 h-5 text-indigo-600" />,
      desc: 'Civil engineering, mechanical, electrical and electronics, robotics, renewable energy, and aerospace technology.',
      careers: ['Civil Project Engineer', 'Robotics Specialist', 'Electrical Designer', 'Quality Assurance']
    },
    {
      id: 'data',
      category: 'tech',
      title: 'Data Science & Analytics',
      degrees: 'B.Sc Data Science / M.Sc / MCA',
      duration: '2 - 3 Years',
      badge: 'Fast Emerging',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <Database className="w-5 h-5 text-amber-600" />,
      desc: 'Big data architecture, predictive statistical modeling, business intelligence, data engineering, and Python analytics.',
      careers: ['Data Scientist', 'BI Developer', 'Data Architect', 'Analytics Consultant']
    },
    {
      id: 'law',
      category: 'law',
      title: 'Law & International Legal Studies',
      degrees: 'BA LLB / BBA LLB / LLM',
      duration: '1 - 5 Years',
      badge: 'Corporate & Global Law',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: <Scale className="w-5 h-5 text-purple-600" />,
      desc: 'Corporate law, human rights, international trade law, cyber law, commercial arbitration, and constitutional jurisprudence.',
      careers: ['Legal Advisor', 'Compliance Officer', 'Corporate Counsel', 'Arbitration Specialist']
    }
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  return (
    <section id="study-options" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Programs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060F1E] tracking-tight leading-tight">
            EXPLORE STUDY OPTIONS IN INDIA.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Select your preferred field to view popular undergraduate and postgraduate degree tracks across accredited Indian universities.
          </p>
        </div>

        {/* Filter Tabs with Stylist Active Blue/Red States */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'tech', label: 'Technology & Engineering' },
            { id: 'business', label: 'Business & Management' },
            { id: 'health', label: 'Healthcare & Nursing' },
            { id: 'law', label: 'Law & Governance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-[#060F1E] text-white shadow-md'
                  : 'bg-[#F8FAFD] hover:bg-slate-200/80 text-slate-700 border border-slate-200/90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#F8FAFD] rounded-3xl p-7 border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {prog.icon}
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${prog.badgeColor}`}>
                    {prog.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-[#060F1E] tracking-tight mb-1">
                  {prog.title}
                </h3>

                {/* Degree & Duration */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 mb-3">
                  <span>{prog.degrees}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{prog.duration}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {prog.desc}
                </p>

                {/* Career Outcomes */}
                <div className="pt-3 border-t border-slate-200/80 mb-6">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Key Career Outcomes:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.careers.map((career, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenApplication(prog.title)}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#060F1E] hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Apply for {prog.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello, I want to learn about university options for ${prog.title} in India.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                  title="Ask on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
