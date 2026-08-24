import React from 'react';
import { 
  GraduationCap, 
  Layers, 
  DollarSign, 
  Users, 
  Briefcase, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  BookOpen, 
  HeartHandshake,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { STUDY_IN_INDIA_REASONS, getWhatsAppLink } from '../lib/constants';

interface StudyInIndiaProps {
  onOpenApplication: () => void;
  onNavigateHome?: () => void;
}

const reasonIcons: Record<string, React.ReactNode> = {
  'quality-education': <GraduationCap className="w-5 h-5" />,
  'diverse-programs': <Layers className="w-5 h-5" />,
  'affordable-study': <DollarSign className="w-5 h-5" />,
  'international-environment': <Users className="w-5 h-5" />,
  'career-opportunities': <Briefcase className="w-5 h-5" />,
  'cultural-experience': <Globe2 className="w-5 h-5" />
};

export const StudyInIndia: React.FC<StudyInIndiaProps> = ({ 
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
            <span className="text-blue-700">Study in India</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-800 border border-blue-100">
            <span>Premier Global Education Destination</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why India is a Global Hub for International Higher Education
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            India is home to the world's second-largest higher education network, hosting thousands of accredited universities and institutions. International students benefit from 100% English-medium instruction, cutting-edge technology infrastructure, globally recognized credentials, and welcoming multicultural campuses.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STUDY_IN_INDIA_REASONS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                {reasonIcons[item.id] || <GraduationCap className="w-6 h-6" />}
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accreditation & Regulatory Recognition Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Recognized University Accreditations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Myers Global Pathways partners exclusively with statutory-recognized, globally accredited institutions governed by India's apex academic bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                UGC
              </div>
              <h4 className="text-sm font-bold text-slate-900">University Grants Commission</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apex statutory body of the Government of India ensuring university standards and degree validity worldwide.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                AICTE
              </div>
              <h4 className="text-sm font-bold text-slate-900">All India Council for Technical Education</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                National regulator for Engineering, Technology, Computer Applications, Management, and Pharmacy colleges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                NAAC
              </div>
              <h4 className="text-sm font-bold text-slate-900">NAAC A / A+ / A++ Grade</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                National Assessment and Accreditation Council certifying highest teaching, lab facilities, and research metrics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                AIU
              </div>
              <h4 className="text-sm font-bold text-slate-900">Association of Indian Universities</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensures equivalence of degrees across international borders (West Africa, EAC, SADC, Europe, and Americas).
              </p>
            </div>
          </div>
        </div>

        {/* Campus Life & Student Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Living, Safety & International Hostels
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Indian universities provide secure, gated campuses with 24/7 security, dedicated international student hostels, diverse dining halls catering to global dietary preferences, high-speed Wi-Fi, modern sports complexes, and on-campus health clinics.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Secure Accommodation:</strong> On-campus hostels with round-the-clock wardens, biometric access, and separate facilities for male and female students.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>International Dining:</strong> Multicuisine cafeterias offering both continental and customized options, plus campus grocery outlets.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>English Medium Environment:</strong> 100% of coursework, examinations, textbooks, and campus communications are in English.
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-blue-900 text-white space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">2026 Intake Advisory Open</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Admissions for the upcoming 2026 / 2027 academic sessions are currently processing. Early applications ensure preferred hostel room allocations and guaranteed visa timeline buffers.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition cursor-pointer shadow-md"
              >
                Apply for India Admissions
              </button>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Advisor</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
