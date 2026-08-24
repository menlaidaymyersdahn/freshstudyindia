import React from 'react';
import { 
  UserCheck, 
  Globe2, 
  FileCheck2, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Award,
  MessageCircle
} from 'lucide-react';
import { WHY_CHOOSE_US, BRAND, getWhatsAppLink } from '../lib/constants';

interface WhyUsProps {
  onOpenApplication: () => void;
  onNavigateHome?: () => void;
}

const iconsMap: Record<string, React.ReactNode> = {
  'personalized-guidance': <UserCheck className="w-5 h-5 text-blue-700" />,
  'international-student-support': <Globe2 className="w-5 h-5 text-blue-700" />,
  'clear-admission-guidance': <FileCheck2 className="w-5 h-5 text-blue-700" />,
  'assistance-throughout': <Sparkles className="w-5 h-5 text-blue-700" />,
  'student-focused-service': <HeartHandshake className="w-5 h-5 text-blue-700" />
};

export const WhyUs: React.FC<WhyUsProps> = ({ 
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
            <span className="text-blue-700">Why Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why Myers Global Pathways</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Honest, Transparent & Dedicated International Student Advisory
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Choosing to study abroad is a transformative life decision. Myers Global Pathways was founded on the principles of absolute transparency, personalized guidance, and authentic on-ground student care.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Core Statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900">
                Our Advisory Guarantees
              </h3>
              
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Hidden Costs:</strong> Direct institutional tuition invoicing with no undisclosed markup fees.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Lived Experience:</strong> Led by advisors who personally navigated the international student journey from Africa to India.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>On-Ground Presence:</strong> Dedicated student reception and welfare teams in India and West Africa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Verified Accreditations:</strong> UGC, NAAC, and AICTE compliance for every recommended university.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={onOpenApplication}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
              <p className="text-xs font-bold text-blue-950 uppercase tracking-wider">Direct WhatsApp Advisory</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect instantly with our student desk to ask questions regarding admission eligibility, hostel facilities, or visa procedures.
              </p>
              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with Head of Admissions</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5 Focused Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {WHY_CHOOSE_US.map((item) => (
              <div 
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-200 hover:shadow-xs transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    {iconsMap[item.id] || <CheckCircle2 className="w-5 h-5 text-blue-700" />}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
