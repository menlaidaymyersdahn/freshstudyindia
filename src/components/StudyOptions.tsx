import React, { useState } from 'react';
import { 
  Laptop, 
  Stethoscope, 
  Pill, 
  Cog, 
  Briefcase, 
  ShieldAlert, 
  Microscope,
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  MessageCircle
} from 'lucide-react';
import { getWhatsAppLink } from '../lib/constants';
import { TiltCard3D } from './TiltCard3D';

interface StudyOptionsProps {
  onSelectOption: (programTitle: string) => void;
}

export const StudyOptions: React.FC<StudyOptionsProps> = ({ 
  onSelectOption
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const programs = [
    {
      id: 'cs-ai',
      title: 'Computer Science & AI',
      category: 'tech',
      degrees: 'B.Tech / BCA / MCA / M.Tech',
      duration: '3 - 4 Years',
      badge: 'High Global Demand',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <Laptop className="w-5 h-5 text-blue-600" />,
      desc: 'Artificial intelligence, machine learning, cloud architecture, full-stack software development, and big data systems.',
      careers: ['AI Engineer', 'Software Architect', 'Cloud Specialist', 'Full-Stack Developer'],
      accentGradient: 'from-blue-50/80 via-sky-50/40 to-transparent'
    },
    {
      id: 'nursing-health',
      title: 'Nursing & Health Sciences',
      category: 'health',
      degrees: 'B.Sc Nursing / GNM / M.Sc Nursing',
      duration: '3.5 - 4 Years',
      badge: 'Hospital Clinical Training',
      badgeClass: 'bg-red-50 text-rose-700 border-red-200',
      icon: <Stethoscope className="w-5 h-5 text-rose-600" />,
      desc: 'Patient care, clinical nursing in multi-specialty teaching hospitals, critical care, pediatric medicine, and community health.',
      careers: ['Registered Clinical Nurse', 'Hospital Supervisor', 'Critical Care Nurse', 'Public Health Lead'],
      accentGradient: 'from-rose-50/80 via-red-50/40 to-transparent'
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy & Pharmaceutical Sciences',
      category: 'health',
      degrees: 'B.Pharm / Pharm.D / M.Pharm',
      duration: '4 - 6 Years',
      badge: 'PCI Approved',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <Pill className="w-5 h-5 text-emerald-600" />,
      desc: 'Pharmacology, drug formulation, pharmaceutical chemistry, clinical trials, toxicology, and pharmaceutical manufacturing.',
      careers: ['Licensed Pharmacist', 'Drug Safety Officer', 'Formulation Chemist', 'Quality Assurance'],
      accentGradient: 'from-emerald-50/80 via-teal-50/40 to-transparent'
    },
    {
      id: 'engineering',
      title: 'Engineering & Technology',
      category: 'tech',
      degrees: 'B.Tech / M.Tech / Diploma',
      duration: '3 - 4 Years',
      badge: 'Core Industries',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: <Cog className="w-5 h-5 text-indigo-600" />,
      desc: 'Robotics, mechanical systems, civil infrastructure, electrical & electronics, aerospace design, and renewable energy.',
      careers: ['Robotics Engineer', 'Civil Project Lead', 'Electrical Designer', 'Automation Specialist'],
      accentGradient: 'from-indigo-50/80 via-blue-50/40 to-transparent'
    },
    {
      id: 'business',
      title: 'BBA / MBA Business Management',
      category: 'business',
      degrees: 'BBA / MBA / B.Com / PGDM',
      duration: '2 - 3 Years',
      badge: 'Corporate Leadership',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      desc: 'International business, corporate finance, digital marketing, human resource analytics, supply chain, and venture management.',
      careers: ['Business Development Manager', 'Financial Analyst', 'Operations Director', 'Marketing Strategist'],
      accentGradient: 'from-amber-50/80 via-orange-50/40 to-transparent'
    },
    {
      id: 'cybersecurity',
      title: 'Cyber Security & Network Defense',
      category: 'tech',
      degrees: 'B.Sc / B.Tech Cyber Security / MCA',
      duration: '3 - 4 Years',
      badge: 'High Security Track',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-600" />,
      desc: 'Ethical hacking, threat intelligence, network architecture security, cryptography, digital forensics, and compliance frameworks.',
      careers: ['Cybersecurity Analyst', 'Security Operations Lead', 'Penetration Tester', 'Network Defender'],
      accentGradient: 'from-cyan-50/80 via-sky-50/40 to-transparent'
    },
    {
      id: 'microbiology',
      title: 'Microbiology & Biotechnology',
      category: 'science',
      degrees: 'B.Sc / M.Sc Microbiology / Bio-Tech',
      duration: '3 - 5 Years',
      badge: 'Research & Labs',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Microscope className="w-5 h-5 text-purple-600" />,
      desc: 'Molecular biology, genetic engineering, industrial fermentation, immunology, virology, and medical laboratory diagnostics.',
      careers: ['Microbiologist', 'Biotech Researcher', 'Clinical Lab Director', 'Quality Control Scientist'],
      accentGradient: 'from-purple-50/80 via-pink-50/40 to-transparent'
    }
  ];

  const filtered = selectedFilter === 'all' 
    ? programs 
    : programs.filter(p => p.category === selectedFilter);

  return (
    <section id="study-options" className="py-24 sm:py-32 bg-[#FFFFFF] text-slate-900 relative overflow-hidden bg-grid-light">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-400/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5">
            <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
            <span>Academic Specializations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            CHOOSE YOUR FUTURE.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Explore popular undergraduate and postgraduate degree streams across accredited Indian universities for international students.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Degrees (7)' },
            { id: 'tech', label: 'Technology & AI' },
            { id: 'health', label: 'Health & Pharmacy' },
            { id: 'business', label: 'Business & Management' },
            { id: 'science', label: 'Science & Bio-Tech' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 text-white shadow-md shadow-red-500/20 border border-transparent'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filtered.map((prog) => (
            <TiltCard3D key={prog.id} maxTilt={8} perspective={1000} className="h-full">
              <div
                className="group relative rounded-3xl bg-white hover:bg-slate-50/50 border border-sky-100 hover:border-sky-300 p-7 sm:p-8 transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-2xl flex flex-col justify-between overflow-hidden h-full"
              >
                {/* Subtle top inner gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prog.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  
                  {/* Header: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-110 group-hover:border-slate-300 transition-all duration-300 shadow-2xs">
                      {prog.icon}
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${prog.badgeClass}`}>
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Degrees */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-all duration-200">
                    {prog.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 mt-1 mb-4">
                    <span>{prog.degrees}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{prog.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {prog.desc}
                  </p>

                  {/* Key Careers Tag List */}
                  <div className="pt-4 border-t border-slate-100 mb-6">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Career Outcomes:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.careers.map((career, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200/60"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Buttons */}
                <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectOption(prog.title)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/20"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={getWhatsAppLink('india', `Hello Myers Global Pathway, I want to learn more about the ${prog.title} degree in India.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition"
                    title="WhatsApp Questions"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </TiltCard3D>
          ))}
        </div>

      </div>
    </section>
  );
};
