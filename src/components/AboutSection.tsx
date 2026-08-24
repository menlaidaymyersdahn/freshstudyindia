import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Globe2, 
  Sparkles, 
  Users, 
  ArrowRight,
  MessageCircle,
  GraduationCap
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onOpenApplication: () => void;
  onNavigateHome?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenApplication,
  onNavigateHome
}) => {
  return (
    <section 
      id="about"
      className="py-24 sm:py-32 bg-[#FAFAF8] text-[#0A1120] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D99B26]">
            <span>Our Foundation & Values</span>
            <span className="w-8 h-[1px] bg-[#D99B26]" />
          </div>

          <h2 
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]"
          >
            About Myers Global Pathways
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Founded with a commitment to integrity and student success, Myers Global Pathways provides international students with trustworthy, end-to-end guidance for studying in India.
          </p>
        </div>

        {/* Story Section: Asymmetric Split with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 leading-snug">
              Built on Firsthand Experience and Unwavering Transparency
            </h3>

            <p>
              Applying to a university abroad can often feel daunting, filled with misinformation, opaque fee structures, and confusing documentation protocols.
            </p>

            <p>
              <strong>Myers Global Pathways</strong> was established to provide an honest, student-first alternative. We serve as a direct bridge connecting international students across Africa and globally with accredited, world-class universities in India.
            </p>

            <p>
              We believe that every aspiring scholar deserves honest counsel, clear expectations, and compassionate on-ground support before, during, and after their arrival.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onOpenApplication()}
                className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer shadow-md"
              >
                <span>Start Your Application</span>
              </button>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with Advisors</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 group">
              <ImageWithFallback
                src={IMAGES.students.src}
                fallbackSrc={IMAGES.students.publicUrl}
                alt="International students receiving admissions counseling and academic guidance"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  International Student Guidance
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  Dedicated counseling tailored to high school & postgraduate applicants.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Core Values Pillars (as requested by user) */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D99B26]">
              Our Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              What Defines Our Advisory
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: Personalized Guidance */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99B26] border border-amber-200 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Personalized Guidance</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Every student has distinct career aspirations and financial parameters. We tailor university recommendations specifically to your unique goals.
              </p>
            </div>

            {/* Pillar 2: Transparency */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99B26] border border-amber-200 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Absolute Transparency</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                No hidden charges or false assurances. All tuition fees are paid directly to official university bank accounts with clear documentation.
              </p>
            </div>

            {/* Pillar 3: Student Support */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99B26] border border-amber-200 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Dedicated Student Support</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                From embassy visa appointment prep to airport greeting, SIM card acquisition, and campus hostel check-in — we support you all the way.
              </p>
            </div>

            {/* Pillar 4: International Perspective */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99B26] border border-amber-200 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">International Perspective</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We understand the specific requirements for WAEC, WASSCE, GCE, and regional high school boards across West Africa, East Africa, and worldwide.
              </p>
            </div>

            {/* Pillar 5: Professional Service */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99B26] border border-amber-200 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Professional Institutional Service</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We maintain direct channels with accredited Indian universities, facilitating swift bonafide letter issuance, authentic fee estimates, and prompt processing of admission dossiers.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
