import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  FileCheck2, 
  Plane, 
  MessageCircle, 
  Building2, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Users, 
  PhoneCall,
  Clock,
  Award
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { IMAGES } from '../lib/images';
import { NavTab } from '../types';

interface HomeViewProps {
  onOpenApplication: (field?: string) => void;
  onNavigate: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onOpenApplication, 
  onNavigate 
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 bg-[#FAFCFF] overflow-hidden">
        
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>2026 / 2027 Admissions Open • International Advisory</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                  Your Pathway to <br className="hidden sm:inline" />
                  <span className="text-blue-700">Study in India</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                  Myers Global Pathways assists international students with university selection, admissions guidance, documentation, and the journey to studying in India.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenApplication()}
                  className="px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Start Your Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-2xs flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Explore Degree Programs</span>
                </button>
              </div>

              {/* Verified Trust Checks */}
              <div className="pt-4 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accredited Universities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Visa Dossier Preparation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Airport Arrival & Check-In</span>
                </div>
              </div>

            </div>

            {/* Right Column: Editorial Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="rounded-2xl bg-white p-3 border border-slate-200 shadow-xl overflow-hidden">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                    <picture>
                      <source srcSet={IMAGES.convocation.webp} type="image/webp" />
                      <source srcSet={IMAGES.convocation.jpeg} type="image/jpeg" />
                      <img 
                        src={IMAGES.convocation.src} 
                        alt="International students celebrating graduation ceremony in India" 
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-bold leading-tight">
                        International Students Convocation in India
                      </p>
                      <p className="text-[11px] text-slate-200 mt-0.5">
                        Empowering African & international scholars through accredited degrees
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">2026 Admissions Open</p>
                        <p className="text-[11px] text-slate-500">Undergraduate & Postgraduate</p>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink('india')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* 4 Trust Value Pillars */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-8">
              End-to-End International Student Advisory
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">University Selection</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Objective evaluation of accredited institutions matching your subject preferences and budget.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Admission Guidance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct processing with faculty boards to secure official Provisional Letters & Bonafide certificates.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Visa Documentation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured dossier compilation for smooth Indian Embassy student visa appointments and verification.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Plane className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Arrival & Support</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Airport meet & greet in India, hostel accommodation handover, FRRO guidance, and ongoing support.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Explore Sections Navigator (Clean Editorial Directory) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Advisory Hub
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Explore All Key Sections
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Click on any section below or use the top navigation menu to access dedicated guides, full service details, and academic program directories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Study in India */}
          <div 
            onClick={() => onNavigate('study-in-india')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Study in India
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover why India is a premier destination for higher education — English-taught degrees, affordable living, and UGC/AICTE accredited institutions.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View Study in India Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Services */}
          <div 
            onClick={() => onNavigate('services')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Our 8 Core Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complete advisory scope from university selection, admission processing, transcript verification, embassy visa filing, to airport meet-and-greet.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View All 8 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Academic Programs */}
          <div 
            onClick={() => onNavigate('programs')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Degree Programs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore accredited undergraduate and postgraduate degrees in Computer Science, Business & MBA, Engineering, Healthcare, and Data Science.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Browse Academic Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Why Us */}
          <div 
            onClick={() => onNavigate('why-us')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Why Choose Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Transparent advisory with zero hidden charges, guidance led by former international students, and direct support teams located in India and Liberia.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Learn About Our Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Application Process */}
          <div 
            onClick={() => onNavigate('process')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Application Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Step-by-step 8-stage pathway from initial document evaluation to receiving your official admission letter, embassy visa filing, and arrival in India.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View 8-Step Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Contact Desks */}
          <div 
            onClick={() => onNavigate('contact')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Contact & Admissions Desks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with our India Headquarters or Liberia Desk via WhatsApp, phone, official department emails, or online inquiry form.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View Contact Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Fast Consultation Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Academic Eligibility Assessment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to begin your international education in India?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Submit your academic transcripts (WASSCE, High School Diploma, or Bachelor transcripts) for a comprehensive evaluation by our admissions advisors.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenApplication()}
                className="px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Transcripts for Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat with Advisor on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
