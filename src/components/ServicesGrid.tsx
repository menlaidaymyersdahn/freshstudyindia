import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  Stamp, 
  Plane, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  PhoneCall,
  BedDouble,
  ShieldAlert
} from 'lucide-react';
import { getWhatsAppLink } from '../lib/constants';

interface ServicesGridProps {
  onOpenApplication: (serviceTitle?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenApplication }) => {
  const services = [
    {
      id: 'selection',
      icon: <Building2 className="w-5 h-5 text-rose-600" />,
      tag: 'Accreditation',
      tagClass: 'bg-red-50 text-rose-700 border-red-200',
      title: 'University & Course Selection',
      desc: 'We match your academic background, preferred location (Bangalore, Punjab, Delhi NCR, Chennai, Pune), and budget with accredited Indian universities.',
      actionText: 'Find Matching University'
    },
    {
      id: 'bonafide',
      icon: <FileCheck2 className="w-5 h-5 text-blue-600" />,
      tag: 'Embassy Requirement',
      tagClass: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Official Bonafide Letters',
      desc: 'Direct processing of registrar-signed bonafide acceptance letters, scholarship certificates, and transparent fee breakdown documents.',
      actionText: 'Request Bonafide Support'
    },
    {
      id: 'visa',
      icon: <Stamp className="w-5 h-5 text-purple-600" />,
      tag: 'Embassy Guidance',
      tagClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Student Visa Filing Support',
      desc: 'Comprehensive document checklist compilation, sponsor affidavits, statement of purpose (SOP) guidance, and mock embassy interview prep.',
      actionText: 'Get Visa Assistance'
    },
    {
      id: 'airport',
      icon: <Plane className="w-5 h-5 text-emerald-600" />,
      tag: 'On-Ground Safety',
      tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Airport Reception & Transit',
      desc: 'Direct meeting at the airport upon arrival in India, safe transit to your campus city, and guidance through initial orientation.',
      actionText: 'Book Airport Arrival'
    },
    {
      id: 'hostel',
      icon: <BedDouble className="w-5 h-5 text-amber-600" />,
      tag: 'Comfortable Living',
      tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Hostel & Meal Allocation',
      desc: 'Securing safe campus accommodation with meal options (international student friendly), Wi-Fi, 24/7 campus security, and laundry.',
      actionText: 'View Hostel Options'
    },
    {
      id: 'frro',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-600" />,
      tag: 'Mandatory Compliance',
      tagClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      title: 'FRRO & Legal Registration',
      desc: 'Assisting international students with the mandatory Foreigners Regional Registration Officer (e-FRRO) filing within the initial 14-day window.',
      actionText: 'Learn FRRO Process'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] text-slate-900 relative overflow-hidden bg-grid-light">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-400/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-400/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Compass className="w-3.5 h-3.5 text-rose-600" />
            <span>End-to-End Support</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            WHAT WE ACTUALLY HELP WITH.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From your hometown to your Indian university dorm room, Fresh Study India provides dedicated guidance at every milestone.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="group rounded-3xl bg-white hover:bg-slate-50/50 border border-sky-100 hover:border-sky-300 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-105 group-hover:border-slate-300 transition shadow-2xs">
                    {srv.icon}
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${srv.tagClass}`}>
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors mb-3">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenApplication(srv.title)}
                  className="text-xs font-black uppercase tracking-wider text-rose-600 hover:text-rose-700 flex items-center gap-1.5 group-hover:gap-2 transition-all cursor-pointer"
                >
                  <span>{srv.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Fresh Study India, I want to inquire about your ${srv.title} service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-slate-400 hover:text-emerald-600 transition"
                  title="Direct WhatsApp"
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
