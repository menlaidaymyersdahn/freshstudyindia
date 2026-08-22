import React from 'react';
import { 
  Building2, 
  FileText, 
  Plane, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  FileCheck2,
  Users2,
  HeartHandshake
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface ServicesGridProps {
  onOpenApplication: (presetField?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenApplication }) => {
  const services = [
    {
      id: 'admissions',
      badge: 'Core Service',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <Building2 className="w-6 h-6 text-sky-400" />,
      iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-800 text-white',
      title: 'Direct University Admissions',
      tagline: 'Direct registrar applications — no middlemen or fake agents.',
      desc: 'We place students into recognized and accredited universities across India (Delhi NCR, Bangalore, Chennai, Punjab, Pune, Hyderabad, and Gujarat). We ensure you receive an official Bonafide Admission Letter directly from the registrar.',
      features: [
        'Accreditation Verification (UGC, AICTE, NAAC, PCI)',
        'Tuition fee discount & scholarship negotiation',
        'Official Bonafide & Visa eligibility letter issuance',
        'Course selection matching career objectives'
      ],
      actionLabel: 'Apply for Admission',
      whatsappContext: 'Hello, I want to learn more about Direct University Admissions in India.'
    },
    {
      id: 'visa',
      badge: 'Documentation',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: <FileText className="w-6 h-6 text-rose-400" />,
      iconBg: 'bg-gradient-to-br from-red-600 to-rose-800 text-white',
      title: 'Indian Student Visa Assistance',
      tagline: 'Comprehensive dossier preparation for Indian Embassy approval.',
      desc: 'Navigating student visa requirements can be difficult. We review all your documentation, sponsorship affidavits, financial proofs, and embassy interview preparation to ensure high visa success rates.',
      features: [
        'Embassy document checklist & verification',
        'Sponsorship affidavit & bank statements formatting',
        'Visa appointment scheduling assistance',
        'Mock student interview preparation'
      ],
      actionLabel: 'Get Visa Assistance',
      whatsappContext: 'Hello, I need assistance with the Indian Student Visa documentation process.'
    },
    {
      id: 'arrival',
      badge: 'On-Ground Care',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: <Plane className="w-6 h-6 text-indigo-400" />,
      iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-800 text-white',
      title: 'Airport Reception & Campus Transit',
      tagline: 'We meet you at the airport gate in India so you never feel alone.',
      desc: 'Landing in a new country for the first time is daunting. Our dedicated team in India greets you right at international airport arrivals, transports you to your university, and settles you into your hostel.',
      features: [
        'Airport pickup and direct vehicle transport',
        'Hostel room allocation and check-in support',
        'Local Indian mobile SIM card activation',
        'Immediate parent notification upon arrival'
      ],
      actionLabel: 'Learn About Arrival',
      whatsappContext: 'Hello, what does your Airport Pickup & Arrival Support service include?'
    },
    {
      id: 'frro',
      badge: 'Legal Compliance',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white',
      title: 'FRRO & Police Registration Support',
      tagline: 'Mandatory Foreigner Regional Registration Office filing in India.',
      desc: 'Every international student studying in India must complete formal FRRO registration within 14 days of landing. We handle the entire digital portal submission and university documentation to keep your stay 100% legal.',
      features: [
        'Online e-FRRO registration filing',
        'Residential certificate Form-C completion',
        'Student Visa extension & exit permit guidance',
        'Full legal compliance throughout your degree'
      ],
      actionLabel: 'Ask About FRRO',
      whatsappContext: 'Hello, can you explain the FRRO registration process for international students in India?'
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Comprehensive Student Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060F1E] tracking-tight leading-tight">
            EVERYTHING YOU NEED. ALL IN ONE PLACE.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From initial university application to airport pickup and police registration in India, we deliver end-to-end student support with complete transparency.
          </p>
        </div>

        {/* 4 Large Comprehensive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => (
            <div 
              key={svc.id}
              className="bg-[#F8FAFD] rounded-3xl p-8 sm:p-10 border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Row: Icon and Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${svc.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    {svc.icon}
                  </div>

                  <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${svc.badgeColor}`}>
                    {svc.badge}
                  </span>
                </div>

                {/* Title and Tagline */}
                <h3 className="text-xl sm:text-2xl font-black text-[#060F1E] tracking-tight mb-2">
                  {svc.title}
                </h3>
                
                <p className="text-xs font-bold text-rose-600 mb-4">
                  {svc.tagline}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {svc.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8 bg-white p-5 rounded-2xl border border-slate-200/80">
                  {svc.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 border-t border-slate-200">
                <button
                  onClick={() => onOpenApplication()}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#060F1E] hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{svc.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink('india', svc.whatsappContext)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                  <span>Ask a Question</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
