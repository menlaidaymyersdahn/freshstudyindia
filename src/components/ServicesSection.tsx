import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Building2,
  Compass,
  FileCheck2,
  FileText,
  ShieldCheck,
  Plane,
  Users,
  HeartHandshake,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppLink } from '../lib/constants';

interface ServicesSectionProps {
  onOpenApplication: (serviceTitle?: string) => void;
  onNavigateHome?: () => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'university-course-selection': <Compass className="w-5 h-5" />,
  'admission-guidance': <Building2 className="w-5 h-5" />,
  'application-support': <FileText className="w-5 h-5" />,
  'documentation-assistance': <FileCheck2 className="w-5 h-5" />,
  'visa-guidance': <ShieldCheck className="w-5 h-5" />,
  'pre-departure-support': <Plane className="w-5 h-5" />,
  'student-arrival-orientation': <Users className="w-5 h-5" />,
  'ongoing-student-support': <HeartHandshake className="w-5 h-5" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenApplication,
  onNavigateHome
}) => {
  return (
    <div className="pt-32 pb-24 bg-[#FAFCFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            {onNavigateHome ? (
              <button 
                onClick={onNavigateHome}
                className="hover:text-blue-700 transition cursor-pointer"
              >
                Home
              </button>
            ) : (
              <span>Home</span>
            )}
            <span>/</span>
            <span className="text-blue-700">Our Services</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-800 border border-blue-100">
            <span>Advisory Services Overview</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Comprehensive Higher Education Advisory & Student Support
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Myers Global Pathways provides end-to-end guidance for international students wishing to study in India. From initial university selection and transcript verification to embassy visa filing and on-ground campus check-in, we guide you through every milestone.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with Icon and Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    {serviceIcons[service.id] || <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="pt-2 space-y-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                  {service.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenApplication(service.title)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href={getWhatsAppLink('india', `Hello Myers Global Pathways, I would like to inquire about ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-600 transition"
                  title="WhatsApp Enquiry"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Transparency & Code of Ethics */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Our Advisory Code of Ethics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Direct Institutional Invoicing</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                All official university tuition and hostel fees are paid directly to verified university bank accounts with zero unauthorized surcharges.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Accreditation Verification</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                We only recommend institutions registered with statutory bodies (UGC, AICTE, NAAC, NBA, PCI, INC) to safeguard degree validity internationally.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">On-Ground Support in India</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Our support does not end when your visa is approved. Our representative welcomes you at the airport in India and assists with hostel check-in.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
            <button
              onClick={() => onOpenApplication()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
            >
              Start Admission Consultation
            </button>
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask an Advisor on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
