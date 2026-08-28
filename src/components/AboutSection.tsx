import React, { useState } from 'react';
import { CORE_PRINCIPLES, FOUNDER_PROFILE, COMPANY } from '../config/company';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  GraduationCap, 
  Globe, 
  Tv, 
  Film, 
  Cpu, 
  ShoppingBag, 
  Car, 
  Building2, 
  Sparkles, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase,
  Layers,
  ArrowUpRight,
  Quote
} from 'lucide-react';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem, TextScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>('/DSC_9367.jpeg');

  const ventureIcons: Record<string, any> = {
    'Myers Global Pathways': GraduationCap,
    'Fresh Updates News': Tv,
    'Myers FRESH Technologies': Cpu,
    'MyEdRives': Car,
    'Fresh Marketplace': ShoppingBag,
    'Classic Myers Filmwork': Film
  };

  return (
    <div id="about" className="text-slate-900 scroll-mt-24">
      
      {/* 1. FOUNDER SPOTLIGHT SECTION */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#DCEAFC] via-[#EBF3FD] to-[#E2EEFA] border-b border-sky-300/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <ScrollReveal className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Leadership & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              <TextScrollReveal text="About the Founder: Menlaiday Myers Dahn" />
            </h2>
            
            <p className="text-base sm:text-lg text-slate-700 mt-3 leading-relaxed font-normal">
              <TextScrollReveal delay={0.15} text="Liberian blogger, filmmaker, digital media entrepreneur, and technology professional whose work spans digital media, entertainment, technology, and entrepreneurship." />
            </p>
          </ScrollReveal>

          {/* Founder Hero Card: Photo + Biography Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Founder Visual Portrait Card */}
            <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 relative">
              <div className="rounded-3xl bg-white border-2 border-sky-200 shadow-xl p-6 sm:p-7 space-y-6 text-left relative overflow-hidden">
                
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Portrait Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-sky-200 bg-slate-100 shadow-md group">
                  <img
                    src={selectedPhoto}
                    alt="Menlaiday Myers Dahn - Founder & CEO"
                    className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={() => setSelectedPhoto('/DSC_9531.jpeg')}
                  />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-between gap-2 shadow-lg">
                    <div>
                      <p className="text-sm font-extrabold tracking-tight text-white">{FOUNDER_PROFILE.name}</p>
                      <p className="text-[11px] text-amber-300 font-semibold">{FOUNDER_PROFILE.title}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Photo Selector Switcher */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto('/DSC_9367.jpeg')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedPhoto === '/DSC_9367.jpeg'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-sky-100 text-slate-700 hover:bg-sky-200'
                    }`}
                  >
                    Convocation Portrait
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto('/DSC_9531.jpeg')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedPhoto === '/DSC_9531.jpeg'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-sky-100 text-slate-700 hover:bg-sky-200'
                    }`}
                  >
                    Campus Profile
                  </button>
                </div>

                {/* Academic Credential Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white space-y-2 shadow-md">
                  <div className="flex items-center gap-2 text-amber-400">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Academic Degree & Alma Mater
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    Bachelor of Science in Computer Science (B.Sc. CS)
                  </p>
                  <p className="text-xs text-sky-200 font-medium">
                    Shri Rawatpura Sarkar University, India (Graduated 2026)
                  </p>
                </div>

                {/* Key Metrics / Pillars */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                    <p className="text-xl font-extrabold text-blue-900">600,000+</p>
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Social Media Reach</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                    <p className="text-xl font-extrabold text-blue-900">India 2026</p>
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Alumnus & Technologist</p>
                  </div>
                </div>

                {/* Multidisciplinary Roles */}
                <div className="space-y-2 pt-2 border-t border-sky-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Areas of Expertise
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {FOUNDER_PROFILE.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded-md bg-sky-100/80 border border-sky-200 text-slate-800 text-[11px] font-semibold"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Right: Comprehensive Biography Narrative */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7 space-y-6 text-left">
              
              <div className="p-8 sm:p-9 rounded-3xl bg-white border border-sky-200 shadow-md space-y-6">
                
                <div className="border-b border-sky-100 pb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                    Founder Background & Journey
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                    Bridging Media, Technology, and Global Education
                  </h3>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  <p>
                    <strong>Menlaiday Myers Dahn</strong> is a Liberian blogger, filmmaker, digital media entrepreneur, and technology professional whose work spans digital media, entertainment, technology, and entrepreneurship. He is best known for his work in digital news and entertainment through <strong>Fresh Updates News</strong>, a media platform with a combined audience of more than <strong>600,000 followers</strong> across social media platforms. Through Fresh Updates News, Menlaiday has built a strong digital presence by covering breaking news, current affairs, entertainment, trending stories, and issues of interest to Liberian and African audiences.
                  </p>

                  <p>
                    Beyond digital publishing, Menlaiday has a background in film and visual production. Through <strong>Classic Myers Filmwork</strong>, he has been involved in filmmaking and music-video production, developing experience in visual storytelling and creative content. His work across blogging, digital media, and film reflects his interest in using modern media platforms to tell stories and reach audiences beyond traditional media.
                  </p>

                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 my-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-950">Higher Education in India (2026)</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        In 2026, Menlaiday graduated from <strong>Shri Rawatpura Sarkar University</strong> in India with a <strong>Bachelor of Science in Computer Science</strong>, adding a formal technology background to his experience in digital media and creative production. His combination of technology, media, and entrepreneurship has become an important part of his professional journey and the businesses he continues to develop.
                      </p>
                    </div>
                  </div>

                  <p>
                    Through these ventures, Menlaiday is building beyond his identity as a blogger and content creator, developing a broader entrepreneurial portfolio that connects media, technology, education, commerce, and digital innovation. His journey from digital media and filmmaking to completing a Computer Science degree and establishing multiple businesses reflects an expanding interest in building digital platforms and businesses that serve African and international audiences.
                  </p>

                  <p>
                    Today, Menlaiday Myers Dahn continues to work across media, technology, filmmaking, and entrepreneurship while developing the <strong>Myers Group of Companies</strong> and its individual ventures. His professional identity is increasingly defined not by one industry, but by the intersection of digital media, technology, creativity, education, and business development.
                  </p>
                </div>

                {/* Founder Quote Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white relative overflow-hidden shadow-md">
                  <Quote className="w-16 h-16 text-white/10 absolute -bottom-2 right-2 pointer-events-none" />
                  <p className="text-xs sm:text-sm font-medium italic text-sky-100 leading-relaxed relative z-10">
                    "My journey studying Computer Science in India opened my eyes to the incredible academic opportunities available here. With Myers Global Pathways, our mission is to ensure African and international students navigate this journey with absolute clarity, direct university partnerships, and unwavering support."
                  </p>
                  <p className="text-xs font-bold text-amber-300 mt-3 uppercase tracking-wider relative z-10">
                    — Menlaiday Myers Dahn, Founder
                  </p>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 2. MYERS GROUP OF COMPANIES PORTFOLIO */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#E2EEFA] via-[#EBF3FD] to-[#DCEAFC] border-b border-sky-300/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Corporate Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              <TextScrollReveal text="Myers Group of Companies" />
            </h2>
            
            <p className="text-base sm:text-lg text-slate-700 mt-2 leading-relaxed font-normal">
              <TextScrollReveal delay={0.15} text="A growing multidisciplinary business group established by Menlaiday Myers Dahn to develop high-impact ventures across education, media, technology, transportation, e-commerce, and creative storytelling." />
            </p>
          </ScrollReveal>

          {/* Group Ventures Grid */}
          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDER_PROFILE.groupCompanies.map((venture) => {
              const IconComponent = ventureIcons[venture.name] || Layers;
              const isFlagship = venture.name === 'Myers Global Pathways';

              return (
                <ScrollStaggerItem key={venture.name}>
                  <div className={`h-full p-6 sm:p-7 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                    isFlagship 
                      ? 'border-blue-400 ring-2 ring-blue-500/20 bg-gradient-to-b from-white to-blue-50/40' 
                      : 'border-sky-200 hover:border-blue-300'
                  }`}>
                    <div className="space-y-4">
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                          isFlagship 
                            ? 'bg-blue-600 text-white border-blue-700' 
                            : 'bg-sky-100 text-blue-900 border-sky-200'
                        }`}>
                          {venture.badge}
                        </span>

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                          isFlagship ? 'bg-blue-600 text-white' : 'bg-sky-100 text-blue-700'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                          {venture.name}
                        </h3>
                        <p className="text-xs font-bold text-blue-700 mt-0.5">
                          {venture.category}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {venture.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Myers Group Venture</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>

        </div>
      </section>

      {/* 3. MYERS GLOBAL PATHWAYS MISSION & 5 CORE PRINCIPLES */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#DCEAFC] via-[#EBF3FD] to-[#E2EFFD] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <ScrollReveal className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Advisory Framework</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              <TextScrollReveal text="Guidance Built Around Your Journey" />
            </h2>
            
            <p className="text-base sm:text-lg text-slate-700 mt-3 leading-relaxed font-normal">
              <TextScrollReveal delay={0.15} text="Myers Global Pathways is an international education consultancy committed to helping international students explore and access higher education opportunities in India through structured, transparent, and personalized advisory." />
            </p>
          </ScrollReveal>

          {/* Split: Mission Card + 5 Core Principles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Our Mission Highlight Card */}
            <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 relative">
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-lg text-left space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-sky-200 text-blue-700 flex items-center justify-center shadow-xs">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                    Our Mission
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mt-1.5 tracking-tight leading-snug">
                    Empowering Global Scholars with Clarity & Integrity
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed font-normal">
                    To provide accessible, honest, and comprehensive admissions guidance that empowers international students to pursue their academic ambitions with confidence.
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-100 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      Direct partnerships and verified admissions channels with recognized Indian universities.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      End-to-end assistance from initial qualification review to visa issuance and campus settlement.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: 5 Core Advisory Principles */}
            <ScrollStaggerContainer delayChildren={0.15} className="lg:col-span-7 space-y-3.5 text-left">
              {CORE_PRINCIPLES.map((principle, index) => (
                <ScrollStaggerItem key={principle.title}>
                  <div 
                    className="p-5 rounded-2xl bg-white border border-sky-200 hover:border-blue-400 hover:shadow-md transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-blue-800 text-xs font-bold shrink-0">
                        0{index + 1}
                      </div>
                      <h3 className="text-base font-bold text-slate-950">{principle.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 pl-10 leading-relaxed font-normal">
                      {principle.description}
                    </p>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStaggerContainer>

          </div>

        </div>
      </section>

    </div>
  );
};

