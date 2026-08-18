import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { motion } from 'motion/react';
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
  ChevronDown,
  Star,
  Check
} from 'lucide-react';

interface BentoHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  openApplyModal?: () => void;
}

// Interactive Count-Up Component for Hero Stats
const StatCounter: React.FC<{ end: number; suffix?: string; prefix?: string; duration?: number }> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 1800
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

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
      color: 'from-[#1677FF]/10 to-[#38BDF8]/5',
      borderColor: 'border-[#1677FF]/30',
      iconBg: 'bg-[#EBF5FE]',
      iconColor: 'text-[#1677FF]',
      btnColor: 'bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:from-[#005cd6] hover:to-[#0284c7] text-white shadow-sm shadow-blue-500/20'
    },
    {
      id: 'visa',
      title: 'Visa Assistance',
      category: 'admission',
      icon: Plane,
      badge: '100% Approval Rate',
      description: 'End-to-end Student Visa (S-1/S-2) processing, document verification, embassy interview preparation, and official invitation letters.',
      features: ['Indian Embassy Filing Prep', 'VFS Appointment Scheduling', 'Visa Cover Letter Drafting', 'Document Attestation Guidance'],
      color: 'from-[#0284C7]/10 to-[#06B6D4]/5',
      borderColor: 'border-[#0284C7]/30',
      iconBg: 'bg-[#F0F9FF]',
      iconColor: 'text-[#0284C7]',
      btnColor: 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369a1] hover:to-[#0891b2] text-white shadow-sm shadow-cyan-500/20'
    },
    {
      id: 'scholarship',
      title: 'Tuition & Fee Guidance',
      category: 'admission',
      icon: Award,
      badge: 'Affordable Options',
      description: 'Transparent tuition cost structures, fee installment planning, and direct financial clearance guidance for international students.',
      features: ['Transparent Fee Breakdown', 'Installment Payment Schedules', 'Cost of Living Estimation', 'Direct Payment Clearance'],
      color: 'from-[#0EA5E9]/10 to-[#38BDF8]/5',
      borderColor: 'border-[#0EA5E9]/30',
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
      btnColor: 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-sm'
    },
    {
      id: 'pickup',
      title: 'Airport Pickup',
      category: 'relocation',
      icon: Globe,
      badge: '24/7 On-Arrival',
      description: 'Warm, dedicated reception at major Indian international airports (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad) with private transport to campus.',
      features: ['Airport Meet & Greet', 'Luggage Assistance', 'Direct Campus Escort', 'Emergency Family Call Line'],
      color: 'from-[#06B6D4]/10 to-[#38BDF8]/5',
      borderColor: 'border-[#06B6D4]/30',
      iconBg: 'bg-[#ECFEFF]',
      iconColor: 'text-[#0891B2]',
      btnColor: 'bg-[#0891B2] hover:bg-[#0e7490] text-white shadow-sm'
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      category: 'relocation',
      icon: Home,
      badge: 'Safe & Verified',
      description: 'Guaranteed placement in safe, secure on-campus international student hostels or premium off-campus apartment rentals with meal plans.',
      features: ['AC & Non-AC Room Options', 'International Student Mess', '24/7 Security & High-Speed WiFi', 'Furnished Living Suites'],
      color: 'from-[#38BDF8]/10 to-[#1677FF]/5',
      borderColor: 'border-[#38BDF8]/30',
      iconBg: 'bg-[#F0F7FF]',
      iconColor: 'text-[#1677FF]',
      btnColor: 'bg-gradient-to-r from-[#1677FF] to-[#38BDF8] text-white shadow-sm'
    },
    {
      id: 'frro',
      title: 'FRRO Registration',
      category: 'relocation',
      icon: ShieldCheck,
      badge: 'Legal Requirement',
      description: 'Complete Foreign Regional Registration Office (FRRO) assistance within 14 days of arrival in India, residential permit, and visa extensions.',
      features: ['Mandatory 14-Day FRRO Filing', 'Residential Permit (RP) Issuance', 'S-1 Visa Extension Support', 'Police Verification Escort'],
      color: 'from-[#102A43]/10 to-[#1677FF]/5',
      borderColor: 'border-[#102A43]/30',
      iconBg: 'bg-[#EBF5FE]',
      iconColor: 'text-[#102A43]',
      btnColor: 'bg-[#102A43] hover:bg-[#1e3a5f] text-white shadow-sm'
    },
    {
      id: 'support',
      title: 'Student Support',
      category: 'relocation',
      icon: HeartHandshake,
      badge: '24/7 Helpline',
      description: 'Continuous local guardianship, local SIM card activation, Indian bank account opening, medical insurance setup, and academic orientation.',
      features: ['Local Indian SIM Card Setup', 'Bank Account Opening', 'Medical Emergency Assistance', 'Cultural & City Orientation'],
      color: 'from-[#1677FF]/10 to-[#06B6D4]/5',
      borderColor: 'border-[#1677FF]/30',
      iconBg: 'bg-[#EBF5FE]',
      iconColor: 'text-[#1677FF]',
      btnColor: 'bg-gradient-to-r from-[#1677FF] to-[#06B6D4] text-white shadow-sm'
    },
    {
      id: 'counseling',
      title: 'Career Counseling',
      category: 'admission',
      icon: Compass,
      badge: 'One-on-One',
      description: 'Personalized academic profiling, career roadmap building, industry internship guidance, and post-graduation job placement counseling.',
      features: ['Academic Skill Profiling', 'Industry Career Roadmaps', 'Internship & Campus Placements', 'Global Post-Grad Pathways'],
      color: 'from-[#38BDF8]/10 to-[#1677FF]/5',
      borderColor: 'border-[#38BDF8]/30',
      iconBg: 'bg-[#F0F7FF]',
      iconColor: 'text-[#0284C7]',
      btnColor: 'bg-gradient-to-r from-[#1677FF] to-[#38BDF8] text-white shadow-sm'
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
      
      {/* 1. HERO SECTION (Bright, Clean, Modern Blue & White Palette) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-b from-[#FFFFFF] via-[#F5FAFF] to-[#EBF5FE] text-[#102A43] rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl border border-[#D9EAF7]"
        >
          
          {/* Subtle Glowing Blue Ambient Circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1677FF]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Floating Educational Background Elements */}
          <div className="absolute top-10 right-1/3 text-[#38BDF8]/20 animate-float-slow pointer-events-none hidden md:block">
            <GraduationCap className="w-16 h-16" />
          </div>
          <div className="absolute bottom-12 right-1/4 text-[#06B6D4]/20 animate-float-reverse pointer-events-none hidden md:block">
            <Plane className="w-14 h-14" />
          </div>
          <div className="absolute top-1/2 left-4 text-[#1677FF]/15 animate-float-gentle pointer-events-none hidden lg:block">
            <Compass className="w-12 h-12" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5FE] border border-[#BFDBFE] text-[#1677FF] text-xs font-extrabold uppercase tracking-wider shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>Official Education Consultancy for India</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#102A43]"
              >
                Study in India's Premier <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1677FF] via-[#0284C7] to-[#06B6D4]">
                  Universities & IITs
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[#52667A] text-base sm:text-lg leading-relaxed max-w-2xl font-medium"
              >
                Your trusted bridge to top Indian higher education. We provide end-to-end university admissions, student visa filing, Study in India (SII) scholarships, airport pickup, hostel booking, and FRRO registration.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                {openApplyModal && (
                  <button
                    onClick={openApplyModal}
                    className="px-6 py-3.5 bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:from-[#005cd6] hover:to-[#0284c7] text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    Apply for 2025/2026 Intake
                  </button>
                )}

                <button
                  onClick={() => { setActiveTab('ai-advisor'); window.history.pushState({}, '', '/ai-advisor'); }}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369a1] hover:to-[#0891b2] text-white font-bold rounded-2xl transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  Ask AI Advisor (Gemini)
                </button>
                
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3.5 bg-white hover:bg-[#F0F7FF] border border-[#D9EAF7] text-[#102A43] font-bold rounded-2xl transition-all flex items-center gap-2 text-sm cursor-pointer shadow-xs hover:border-[#BFDBFE]"
                >
                  <PhoneCall className="w-4 h-4 text-[#1677FF]" />
                  Free Counseling
                </button>

                <button
                  onClick={() => { setActiveTab('student-login'); window.history.pushState({}, '', '/login'); }}
                  className="px-6 py-3.5 bg-[#EBF5FE] hover:bg-[#D9EAF7] text-[#1677FF] font-bold rounded-2xl transition-all flex items-center gap-2 text-sm cursor-pointer border border-[#BFDBFE]"
                >
                  <UserCheck className="w-4 h-4 text-[#1677FF]" />
                  Track Status
                </button>
              </motion.div>

              {/* Key Trust Metrics Row (with animated stats counters) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D9EAF7]"
              >
                <div className="bg-white/80 p-3 rounded-2xl border border-[#D9EAF7]/80 shadow-xs">
                  <div className="text-2xl font-black text-[#1677FF]">
                    <StatCounter end={250} suffix="+" />
                  </div>
                  <div className="text-xs text-[#52667A] font-semibold mt-0.5">Partner Campuses</div>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#D9EAF7]/80 shadow-xs">
                  <div className="text-2xl font-black text-[#102A43]">
                    <StatCounter end={100} suffix="%" />
                  </div>
                  <div className="text-xs text-[#52667A] font-semibold mt-0.5">Visa Success Rate</div>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#D9EAF7]/80 shadow-xs">
                  <div className="text-2xl font-black text-[#0284C7]">
                    <StatCounter end={1500} prefix="$" suffix="k+" />
                  </div>
                  <div className="text-xs text-[#52667A] font-semibold mt-0.5">Scholarships Secured</div>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#D9EAF7]/80 shadow-xs">
                  <div className="text-2xl font-black text-[#102A43]">
                    <StatCounter end={8500} suffix="+" />
                  </div>
                  <div className="text-xs text-[#52667A] font-semibold mt-0.5">Students Enrolled</div>
                </div>
              </motion.div>

            </div>

            {/* Right Card / Visual Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="bg-white border border-[#D9EAF7] rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 backdrop-blur-xl relative">
                
                {/* Floating badge */}
                <div className="flex items-center justify-between border-b border-[#D9EAF7] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#102A43]">Fresh Study India Hub</h3>
                      <p className="text-xs text-[#1677FF] font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#1677FF] rounded-full animate-pulse"></span>
                        Admissions Open 2025/2026
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#EBF5FE] text-[#1677FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                    Official Agency
                  </span>
                </div>

                {/* Quick Highlight Features */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-[#F5FAFF] rounded-2xl border border-[#D9EAF7] flex items-center justify-between hover:border-[#1677FF]/40 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#EBF5FE] flex items-center justify-center text-[#1677FF]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-[#102A43] font-semibold">Direct University Provisional Offers</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#1677FF] bg-white px-2 py-0.5 rounded-md border border-[#D9EAF7]">24–48 Hrs</span>
                  </div>

                  <div className="p-3 bg-[#F5FAFF] rounded-2xl border border-[#D9EAF7] flex items-center justify-between hover:border-[#1677FF]/40 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0284C7]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-[#102A43] font-semibold">Study in India (SII) 100% Waivers</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0284C7] bg-white px-2 py-0.5 rounded-md border border-[#D9EAF7]">Up to 100%</span>
                  </div>

                  <div className="p-3 bg-[#F5FAFF] rounded-2xl border border-[#D9EAF7] flex items-center justify-between hover:border-[#1677FF]/40 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#ECFEFF] flex items-center justify-center text-[#0891B2]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-[#102A43] font-semibold">Airport Reception & FRRO Desk</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0891B2] bg-white px-2 py-0.5 rounded-md border border-[#D9EAF7]">Guaranteed</span>
                  </div>
                </div>

                {/* Direct Portal Quick Jump */}
                <div className="p-4 bg-gradient-to-r from-[#EBF5FE] via-[#F0F7FF] to-[#E0F2FE] rounded-2xl border border-[#BFDBFE] text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[#102A43] font-bold block">Have an existing application?</span>
                    <span className="text-[#52667A] text-[11px] font-medium">Track status & documents in Student Portal</span>
                  </div>
                  <button
                    onClick={() => { setActiveTab('student-login'); window.history.pushState({}, '', '/login'); }}
                    className="px-3.5 py-2 bg-[#1677FF] hover:bg-[#005cd6] text-white font-extrabold rounded-xl shrink-0 cursor-pointer shadow-xs transition"
                  >
                    Login
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>


      {/* 2. OUR CONSULTANCY SERVICES SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9EAF7] pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-[#EBF5FE] px-3 py-1 rounded-full border border-[#BFDBFE]">
                End-to-End Student Support
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] mt-2 tracking-tight">
                Our Comprehensive Services
              </h2>
              <p className="text-[#52667A] text-sm max-w-2xl mt-1">
                From academic profiling and university admission to visa stamping, airport reception, accommodation, and FRRO registration in India.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#D9EAF7] text-xs font-bold shadow-xs">
              <button
                onClick={() => setActiveServiceFilter('all')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'all' ? 'bg-[#1677FF] text-white shadow-xs' : 'text-[#52667A] hover:text-[#102A43]'}`}
              >
                All Services (8)
              </button>
              <button
                onClick={() => setActiveServiceFilter('admission')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'admission' ? 'bg-[#1677FF] text-white shadow-xs' : 'text-[#52667A] hover:text-[#102A43]'}`}
              >
                Admissions & Visa
              </button>
              <button
                onClick={() => setActiveServiceFilter('relocation')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeServiceFilter === 'relocation' ? 'bg-[#1677FF] text-white shadow-xs' : 'text-[#52667A] hover:text-[#102A43]'}`}
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
                  className="bg-white rounded-3xl border border-[#D9EAF7] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-bl-full pointer-events-none`}></div>

                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${service.iconBg} border border-[#D9EAF7] flex items-center justify-center shrink-0`}>
                        <IconComp className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#F5FAFF] text-[#102A43] px-2.5 py-1 rounded-full border border-[#D9EAF7]">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#102A43] mb-2 group-hover:text-[#1677FF] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[#52667A] text-xs leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 border-t border-[#D9EAF7] pt-4 mb-6">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-[#52667A]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
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
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${service.btnColor}`}
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
        <div className="bg-gradient-to-br from-[#EBF5FE] via-[#F0F7FF] to-[#E0F2FE] text-[#102A43] rounded-3xl p-8 sm:p-12 border border-[#BFDBFE] shadow-lg space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-white px-3 py-1 rounded-full border border-[#BFDBFE] shadow-xs">
              The Fresh Study India Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#102A43]">
              Why 8,500+ Students Trust Fresh Study India
            </h2>
            <p className="text-[#52667A] text-sm">
              We are not just an admissions agency — we are your official education guardians and facilitators throughout your academic journey in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-[#D9EAF7] space-y-3 shadow-sm hover:border-[#1677FF]/40 transition">
              <div className="w-10 h-10 bg-[#EBF5FE] rounded-xl flex items-center justify-center text-[#1677FF] font-black border border-[#BFDBFE]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#102A43]">Direct University Tie-ups</h3>
              <p className="text-xs text-[#52667A] leading-relaxed font-medium">
                Direct admission authorization with 250+ top Indian public, central, and private campuses. No middleman delays.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D9EAF7] space-y-3 shadow-sm hover:border-[#1677FF]/40 transition">
              <div className="w-10 h-10 bg-[#E0F2FE] rounded-xl flex items-center justify-center text-[#0284C7] font-black border border-[#BFDBFE]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#102A43]">100% Visa & Doc Accuracy</h3>
              <p className="text-xs text-[#52667A] leading-relaxed font-medium">
                Flawless Student Visa filing, invitation letters, embassy interview prep, and WAEC/NECO equivalency mapping.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D9EAF7] space-y-3 shadow-sm hover:border-[#1677FF]/40 transition">
              <div className="w-10 h-10 bg-[#ECFEFF] rounded-xl flex items-center justify-center text-[#0891B2] font-black border border-[#BFDBFE]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#102A43]">On-Ground Indian Desk</h3>
              <p className="text-xs text-[#52667A] leading-relaxed font-medium">
                Our local Indian representatives welcome you at the airport, manage your FRRO registration, and settle you into campus.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D9EAF7] space-y-3 shadow-sm hover:border-[#1677FF]/40 transition">
              <div className="w-10 h-10 bg-[#EBF5FE] rounded-xl flex items-center justify-center text-[#1677FF] font-black border border-[#BFDBFE]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#102A43]">Transparent & Fee-Free</h3>
              <p className="text-xs text-[#52667A] leading-relaxed font-medium">
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
            <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-[#EBF5FE] px-3 py-1 rounded-full border border-[#BFDBFE]">
              Clear & Transparent Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Our 8-Step Admission Journey
            </h2>
            <p className="text-[#52667A] text-sm">
              How we take you from your initial inquiry to sitting in your university classroom in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#D9EAF7] shadow-sm hover:border-[#1677FF] transition flex flex-col justify-between space-y-3 group hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-[#1677FF] group-hover:scale-110 transition-transform inline-block">
                      {s.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#1677FF]"></span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#102A43] group-hover:text-[#1677FF] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[#52667A] text-xs leading-relaxed mt-2 font-medium">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D9EAF7] text-[10px] font-bold text-[#52667A] uppercase tracking-wider flex items-center justify-between">
                  <span>Step {idx + 1} of 8</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1677FF]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 5. POPULAR DEGREE PROGRAMS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9EAF7] pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-[#EBF5FE] px-3 py-1 rounded-full border border-[#BFDBFE]">
                Academic Programs
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] mt-2 tracking-tight">
                Popular Degree Pathways
              </h2>
              <p className="text-[#52667A] text-sm max-w-xl mt-1">
                Explore accredited undergraduate, postgraduate, and professional study pathways in India.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('courses')}
              className="px-5 py-2.5 bg-[#1677FF] hover:bg-[#005cd6] text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <BookOpen className="w-4 h-4 text-white" />
              <span>Explore All Courses</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularPrograms.map((prog, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#D9EAF7] shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#1677FF]/40 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-[#EBF5FE] text-[#1677FF] font-black text-xs rounded-2xl flex items-center justify-center border border-[#BFDBFE]">
                      {prog.code}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#F5FAFF] text-[#1677FF] px-2 py-0.5 rounded-md border border-[#D9EAF7]">
                      {prog.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#102A43]">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-[#52667A] flex items-center gap-1.5 mt-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
                    <span>{prog.duration}</span>
                  </p>

                  <p className="text-xs font-semibold text-[#1677FF] mt-2 bg-[#EBF5FE] p-2 rounded-xl border border-[#BFDBFE]">
                    {prog.level}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (openApplyModal) openApplyModal();
                    else setActiveTab('courses');
                  }}
                  className="w-full py-2 bg-[#F5FAFF] hover:bg-[#1677FF] hover:text-white text-[#102A43] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-[#D9EAF7]"
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
        <div className="bg-[#EBF5FE] rounded-3xl p-8 sm:p-12 border border-[#BFDBFE] space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-white px-3 py-1 rounded-full border border-[#BFDBFE]">
              International Success Stories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-[#52667A] text-sm">
              Hear directly from international students who successfully journeyed from their home country to India with Fresh Study India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#D9EAF7] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-[#52667A] italic leading-relaxed font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#D9EAF7]">
                  <img 
                    src={t.image} 
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#1677FF]"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#102A43] flex items-center gap-1.5">
                      {t.name} <span className="text-xs">{t.country}</span>
                    </h4>
                    <p className="text-[11px] font-bold text-[#1677FF]">{t.university}</p>
                    <p className="text-[10px] text-[#52667A]">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('testimonials')}
              className="text-xs font-bold text-[#1677FF] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Read all student reviews and stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>


      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 border border-[#D9EAF7] shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#1677FF] bg-[#EBF5FE] px-3 py-1 rounded-full border border-[#BFDBFE]">
              Student Helpdesk FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#52667A] text-xs">
              Everything you need to know about studying in India with Fresh Study India.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-[#D9EAF7] rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-sm text-[#102A43] flex items-center justify-between gap-4 bg-[#F5FAFF] hover:bg-[#EBF5FE] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#1677FF] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#52667A] transition-transform ${isOpen ? 'rotate-180 text-[#1677FF]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs text-[#52667A] leading-relaxed bg-white border-t border-[#D9EAF7] font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4 border-t border-[#D9EAF7]">
            <p className="text-xs text-[#52667A]">
              Have a custom question not answered here?{' '}
              <button
                onClick={() => setActiveTab('contact')}
                className="text-[#1677FF] font-bold hover:underline cursor-pointer"
              >
                Contact our counselors directly
              </button>
            </p>
          </div>

        </div>
      </section>


      {/* 8. CONTACT & FREE CONSULTATION CTA SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#1677FF] via-[#0284C7] to-[#06B6D4] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
              Start Your India Journey Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to Secure Your Seat at a Top Indian University?
            </h2>
            <p className="text-blue-50 text-sm leading-relaxed">
              Contact our admission desk now for free eligibility evaluation, course selection, and scholarship allocation.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-blue-50 pt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-white" /> freshstudyindia@gmail.com</span>
              <span className="flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-white" /> +231 889425645</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-white" /> Monrovia, Liberia / New Delhi, India</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            {openApplyModal && (
              <button
                onClick={openApplyModal}
                className="px-8 py-4 bg-white hover:bg-blue-50 text-[#1677FF] font-black rounded-2xl transition shadow-xl text-center text-sm cursor-pointer hover:scale-105"
              >
                Apply Online Now
              </button>
            )}
            <button
              onClick={() => setActiveTab('contact')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl transition text-center text-sm cursor-pointer"
            >
              Contact Counselors
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
