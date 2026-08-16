import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  GraduationCap, 
  Plane, 
  FileText, 
  Award, 
  Home, 
  UserCheck, 
  HeartHandshake, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Users, 
  PhoneCall, 
  MapPin, 
  Mail, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  Globe, 
  Building2, 
  Briefcase, 
  MessageCircle,
  ChevronDown,
  Star,
  Download
} from 'lucide-react';

interface BentoHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  openApplyModal?: () => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ setActiveTab, openApplyModal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeServiceFilter, setActiveServiceFilter] = useState<'all' | 'admission' | 'relocation'>('all');

  // Consultancy Services Data
  const services = [
    {
      id: 'admission',
      title: 'Academic Admission',
      category: 'admission',
      icon: GraduationCap,
      badge: 'Core Service',
      description: 'Direct seat allocation and application processing for B.Tech, MBBS, BBA, MBA, Nursing, BCA, and Master degrees across India.',
      features: ['Direct Program Allotment', 'Course & Major Selection', 'Fast-Track Offer Letters', 'WAEC / NECO Grade Conversion'],
      color: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    {
      id: 'visa',
      title: 'Visa Assistance',
      category: 'admission',
      icon: Plane,
      badge: '100% Approval Rate',
      description: 'End-to-end Student Visa (S-1/S-2) processing, document verification, embassy interview preparation, and official invitation letters.',
      features: ['Indian Embassy Filing Prep', 'VFS Appointment Scheduling', 'Visa Cover Letter Drafting', 'Document Attestation Guidance'],
      color: 'from-indigo-500/10 to-indigo-500/5',
      borderColor: 'border-indigo-500/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    {
      id: 'scholarship',
      title: 'Tuition & Fee Guidance',
      category: 'admission',
      icon: Award,
      badge: 'Affordable Options',
      description: 'Transparent tuition cost structures, fee installment planning, and direct financial clearance guidance for international students.',
      features: ['Transparent Fee Breakdown', 'Installment Payment Schedules', 'Cost of Living Estimation', 'Direct Payment Clearance'],
      color: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white'
    },
    {
      id: 'pickup',
      title: 'Airport Pickup',
      category: 'relocation',
      icon: Globe,
      badge: '24/7 On-Arrival',
      description: 'Warm, dedicated reception at major Indian international airports (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad) with private transport to campus.',
      features: ['Airport Meet & Greet', 'Luggage Assistance', 'Direct Campus Escort', 'Emergency Family Call Line'],
      color: 'from-cyan-500/10 to-cyan-500/5',
      borderColor: 'border-cyan-500/20',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      btnColor: 'bg-cyan-600 hover:bg-cyan-700 text-white'
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      category: 'relocation',
      icon: Home,
      badge: 'Safe & Verified',
      description: 'Guaranteed placement in safe, secure on-campus international student hostels or premium off-campus apartment rentals with meal plans.',
      features: ['AC & Non-AC Room Options', 'International Student Mess', '24/7 Security & High-Speed WiFi', 'Furnished Living Suites'],
      color: 'from-teal-500/10 to-teal-500/5',
      borderColor: 'border-teal-500/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white'
    },
    {
      id: 'frro',
      title: 'FRRO Registration',
      category: 'relocation',
      icon: ShieldCheck,
      badge: 'Legal Requirement',
      description: 'Complete Foreign Regional Registration Office (FRRO) assistance within 14 days of arrival in India, residential permit, and visa extensions.',
      features: ['Mandatory 14-Day FRRO Filing', 'Residential Permit (RP) Issuance', 'S-1 Visa Extension Support', 'Police Verification Escort'],
      color: 'from-slate-500/10 to-slate-500/5',
      borderColor: 'border-slate-500/20',
      iconColor: 'text-slate-700 dark:text-slate-300',
      btnColor: 'bg-slate-800 hover:bg-slate-900 text-white'
    },
    {
      id: 'support',
      title: 'Student Support',
      category: 'relocation',
      icon: HeartHandshake,
      badge: '24/7 Helpline',
      description: 'Continuous local guardianship, local SIM card activation, Indian bank account opening, medical insurance setup, and academic orientation.',
      features: ['Local Indian SIM Card Setup', 'Bank Account Opening', 'Medical Emergency Assistance', 'Cultural & City Orientation'],
      color: 'from-rose-500/10 to-rose-500/5',
      borderColor: 'border-rose-500/20',
      iconColor: 'text-rose-600 dark:text-rose-400',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white'
    },
    {
      id: 'counseling',
      title: 'Career Counseling',
      category: 'admission',
      icon: Compass,
      badge: 'One-on-One',
      description: 'Personalized academic profiling, career roadmap building, industry internship guidance, and post-graduation job placement counseling.',
      features: ['Academic Skill Profiling', 'Industry Career Roadmaps', 'Internship & Campus Placements', 'Global Post-Grad Pathways'],
      color: 'from-purple-500/10 to-purple-500/5',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white'
    }
  ];

  // Admission Process Steps
  const processSteps = [
    {
      step: '01',
      title: 'Free Career Consultation',
      desc: 'Speak with our senior admission counselors to evaluate your WAEC/NECO, High School, or Degree transcripts and select the ideal course.'
    },
    {
      step: '02',
      title: 'Form & Document Submission',
      desc: 'Fill out the online admission form and upload your passport bio-page, academic transcripts, and exam scorecards.'
    },
    {
      step: '03',
      title: 'Fast-Track Eligibility Review',
      desc: 'Our academic verification committee reviews your file directly with institutional admission boards within 24–48 hours.'
    },
    {
      step: '04',
      title: 'Provisional Offer Letter',
      desc: 'Receive your official provisional admission offer letter with course details, curriculum roadmap, and fee breakdown.'
    },
    {
      step: '05',
      title: 'Fee Confirmation & Seat Deposit',
      desc: 'Secure your academic seat deposit and complete institutional verification.'
    },
    {
      step: '06',
      title: 'Visa Filing & Embassy Prep',
      desc: 'Our visa team assists with your S-1 Student Visa documentation, embassy appointment, and interview preparation.'
    },
    {
      step: '07',
      title: 'Flight & Airport Reception',
      desc: 'Fly to India! Our team meets you directly at the airport with dedicated transportation to your student residence.'
    },
    {
      step: '08',
      title: 'FRRO & Campus Onboarding',
      desc: 'We complete your mandatory FRRO registration, SIM card activation, hostel check-in, and welcome you to your classes!'
    }
  ];

  // Popular Degree Programs
  const popularPrograms = [
    { title: 'Computer Science & AI', level: "Bachelor's / Master's", duration: '4 Years / 2 Years', code: 'CS', tag: 'High Demand' },
    { title: 'Information Technology & Cyber', level: "Bachelor's Degree", duration: '4 Years', code: 'IT', tag: 'Top Career' },
    { title: 'Medicine & Healthcare (MBBS/MD)', level: 'Professional Degree', duration: '5.5 Years', code: 'MED', tag: 'Clinical Prep' },
    { title: 'Pharmacy & Biotech (B.Pharm)', level: 'Bachelor of Pharmacy', duration: '4 Years', code: 'PHARM', tag: 'Accredited' },
    { title: 'Business Administration (BBA/MBA)', level: 'Undergrad & Postgrad', duration: '3 Years / 2 Years', code: 'MGMT', tag: 'Global Focus' },
    { title: 'Nursing & Allied Health Sciences', level: 'B.Sc Nursing', duration: '4 Years', code: 'NURS', tag: 'Hospital Attached' },
    { title: 'Data Science & Big Data Analytics', level: 'B.Sc / M.Sc', duration: '3-4 Years', code: 'DATA', tag: 'Emerging Tech' },
    { title: 'Civil & Mechanical Engineering', level: 'B.Tech Engineering', duration: '4 Years', code: 'ENGG', tag: 'Industry Certified' }
  ];

  // Student Testimonials
  const testimonials = [
    {
      name: 'Emanuel K. Johnson',
      country: 'Liberia 🇱🇷',
      university: 'Chandigarh University',
      course: 'B.Tech Computer Science & AI',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      quote: 'Fresh Study India handled everything from my WAEC result verification to my S-1 Visa and airport pickup in Delhi. I secured a 50% tuition scholarship and am now in my 2nd year of Computer Science!'
    },
    {
      name: 'Blessing Okafor',
      country: 'Nigeria 🇳🇬',
      university: 'Sharda University',
      course: 'Bachelor of Pharmacy (B.Pharm)',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      quote: 'I was worried about my visa and finding good hostel accommodation. The Fresh Study India team welcomed me at the airport, arranged my hostel room immediately, and completed my FRRO within 3 days.'
    },
    {
      name: 'Kwame Mensah',
      country: 'Ghana 🇬🇭',
      university: 'LPU India',
      course: 'MBA International Business',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      quote: 'The Study in India scholarship assistance was phenomenal. I got full fee waiver guidance and clear counseling. Their counselor desk supported me at every single step.'
    }
  ];

  // FAQ Accordion items
  const faqs = [
    {
      q: 'Are WAEC, NECO, and WASSCE results accepted for admission in India?',
      a: 'Yes! All top Indian universities accept WAEC, NECO, WASSCE, and High School Transcripts. Fresh Study India provides official grade conversion and equivalency mapping for direct B.Tech, BBA, B.Pharm, MBBS, and Nursing entry.'
    },
    {
      q: 'How long does the Student Visa (S-1) process take for India?',
      a: 'Once your official University Provisional Admission Letter and Ministry invitation are issued (usually 3–5 days), the Indian Embassy Student Visa process typically takes 5 to 10 business days.'
    },
    {
      q: 'What is FRRO registration, and why is it mandatory?',
      a: 'FRRO (Foreign Regional Registration Office) registration is mandatory by Indian law for all foreign nationals holding a student visa valid for more than 180 days. Fresh Study India completes your FRRO filing within 14 days of your arrival.'
    },
    {
      q: 'Can I apply for Study in India (SII) Government Scholarships?',
      a: 'Yes! Fresh Study India is an official counseling partner that guides international students through the Study in India (SII) portal, ICCR grants, and merit-based university fee waivers up to 100% tuition coverage.'
    },
    {
      q: 'Does Fresh Study India provide airport pickup and hostel booking?',
      a: 'Absolutely! Our relocation package includes dedicated 24/7 airport reception at Delhi, Mumbai, Bengaluru, Chennai, or Hyderabad airports, private escort to campus, and guaranteed hostel room check-in.'
    }
  ];

  const filteredServices = activeServiceFilter === 'all' 
    ? services 
    : services.filter(s => s.category === activeServiceFilter);

  return (
    <div className="w-full space-y-16 py-4">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 dark:bg-slate-900 text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Subtle Background Glow Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Education Consultancy for India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                Study in India's Premier <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                  Universities & IITs
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Your trusted bridge to top Indian higher education. We provide end-to-end university admissions, student visa filing, Study in India (SII) scholarships, airport pickup, hostel booking, and FRRO registration.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {openApplyModal && (
                  <button
                    onClick={openApplyModal}
                    className="px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    Apply for 2025/2026 Intake
                  </button>
                )}
                
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-2xl transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Free Counseling
                </button>

                <button
                  onClick={() => { setActiveTab('student-login'); window.history.pushState({}, '', '/login'); }}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 text-sm cursor-pointer border border-white/10"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Track Status
                </button>
              </div>

              {/* Key Trust Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-black text-emerald-400">250+</div>
                  <div className="text-xs text-slate-400 font-medium">Partner Campuses</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Visa Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">$1.5M+</div>
                  <div className="text-xs text-slate-400 font-medium">Scholarships Secured</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">8,500+</div>
                  <div className="text-xs text-slate-400 font-medium">Students Enrolled</div>
                </div>
              </div>

            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-xl">
                
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">Fresh Study India Hub</h3>
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        Admissions Open 2025/2026
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
                    Official Agency
                  </span>
                </div>

                {/* Quick Highlight Features */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-medium">Direct University Provisional Offers</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">24–48 Hrs</span>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-medium">Study in India (SII) 100% Waivers</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">Up to 100%</span>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-medium">Airport Reception & FRRO Desk</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Guaranteed</span>
                  </div>
                </div>

                {/* Direct Portal Quick Jump */}
                <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 rounded-2xl border border-emerald-800/40 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-300 font-semibold block">Have an existing application?</span>
                    <span className="text-emerald-400 font-bold">Track status & documents in Student Portal</span>
                  </div>
                  <button
                    onClick={() => { setActiveTab('student-login'); window.history.pushState({}, '', '/login'); }}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl shrink-0 cursor-pointer"
                  >
                    Login
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. OUR CONSULTANCY SERVICES SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                End-to-End Student Support
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Our Comprehensive Services
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mt-1">
                From academic profiling and university admission to visa stamping, airport reception, accommodation, and FRRO registration in India.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveServiceFilter('all')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                All Services (8)
              </button>
              <button
                onClick={() => setActiveServiceFilter('admission')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'admission' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Admissions & Visa
              </button>
              <button
                onClick={() => setActiveServiceFilter('relocation')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'relocation' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Relocation & Support
              </button>
            </div>
          </div>

          {/* Services Grid (All 8 requested services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-bl-full pointer-events-none`}></div>

                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border ${service.borderColor} flex items-center justify-center shrink-0`}>
                        <IconComp className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Action Button */}
                  <button
                    onClick={() => {
                      if (openApplyModal) openApplyModal();
                      else setActiveTab('contact');
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${service.btnColor}`}
                  >
                    <span>Request {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 3. WHY CHOOSE FRESH STUDY INDIA */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
              The Fresh Study India Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why 8,500+ Students Trust Fresh Study India
            </h2>
            <p className="text-slate-300 text-sm">
              We are not just an admissions agency — we are your official education guardians and facilitators throughout your academic journey in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Direct University Tie-ups</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct admission authorization with 250+ top Indian public, central, and private campuses. No middleman delays.
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">100% Visa & Doc Accuracy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flawless Student Visa filing, invitation letters, embassy interview prep, and WAEC/NECO equivalency mapping.
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 font-black">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">On-Ground Indian Desk</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our local Indian representatives welcome you at the airport, manage your FRRO registration, and settle you into campus.
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 font-black">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Transparent & Fee-Free</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No hidden charges or unexpected fees. Clear fee breakdowns and maximum scholarship discount application.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* 4. ADMISSION PROCESS ROADMAP */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Clear & Transparent Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Our 8-Step Admission Journey
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              How we take you from your initial inquiry to sitting in your university classroom in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform inline-block">
                      {s.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Step {idx + 1} of 8</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 5. POPULAR DEGREE PROGRAMS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Academic Programs
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Popular Degree Pathways
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mt-1">
                Explore accredited undergraduate, postgraduate, and professional study pathways in India.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('courses')}
              className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Explore All Courses</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularPrograms.map((prog, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 hover:border-emerald-500/30 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-slate-900 text-white font-black text-xs rounded-2xl flex items-center justify-center border border-slate-700">
                      {prog.code}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {prog.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{prog.duration}</span>
                  </p>

                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl">
                    {prog.level}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (openApplyModal) openApplyModal();
                    else setActiveTab('courses');
                  }}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. STUDENT TESTIMONIALS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              International Success Stories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Hear directly from international students who successfully journeyed from their home country to India with Fresh Study India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img 
                    src={t.image} 
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {t.name} <span className="text-xs">{t.country}</span>
                    </h4>
                    <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{t.university}</p>
                    <p className="text-[10px] text-slate-400">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('testimonials')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Read all student reviews and stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>


      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Student Helpdesk FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Everything you need to know about studying in India with Fresh Study India.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500">
              Have a custom question not answered here?{' '}
              <button
                onClick={() => setActiveTab('contact')}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Contact our counselors directly
              </button>
            </p>
          </div>

        </div>
      </section>


      {/* 8. CONTACT & FREE CONSULTATION CTA SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full border border-white/30">
              Start Your India Journey Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to Secure Your Seat at a Top Indian University?
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Contact our admission desk now for free eligibility evaluation, course selection, and scholarship allocation.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-emerald-100 pt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-white" /> freshstudyindia@gmail.com</span>
              <span className="flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-white" /> +231 889425645</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            {openApplyModal && (
              <button
                onClick={openApplyModal}
                className="px-6 py-4 bg-white hover:bg-slate-100 text-slate-900 font-black rounded-2xl transition shadow-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Apply Online Now</span>
              </button>
            )}

            <a
              href="https://wa.me/231889425645?text=Hello%20Fresh%20Study%20India%20Counselor,%20I%20would%20like%20to%20inquire%20about%20university%20admissions%20and%20scholarships."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition shadow-xl text-sm flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
              <span>WhatsApp Counseling</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
