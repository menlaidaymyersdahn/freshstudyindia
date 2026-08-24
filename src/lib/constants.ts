import { StudyOptionDetail } from '../types';

export const BRAND = {
  name: 'Myers Global Pathways',
  shortName: 'MGP',
  tagline: 'Your Pathway to Study in India',
  description: 'A professional international education consultancy assisting students worldwide with university selection, admissions guidance, documentation, and the journey to studying in India.',
  mission: 'We guide ambitious international students through every stage of their higher education journey in India with transparent, personalized, and dependable advisory.',
  
  emails: {
    admissions: 'admissions@myersglobalpathways.com',
    info: 'info@myersglobalpathways.com',
    applications: 'applications@myersglobalpathways.com',
    support: 'support@myersglobalpathways.com'
  },

  contacts: {
    india: {
      country: 'India',
      flag: '🇮🇳',
      city: 'India Admissions & Support Center',
      phoneDisplay: '+91 9201330946',
      phoneRaw: '+919201330946',
      whatsappNumber: '919201330946',
      email: 'admissions@myersglobalpathways.com',
      label: 'Headquarters & Student Support',
      address: 'University Partner Liaison & Student Arrival Desk, India',
      hours: 'Mon – Sat: 9:00 AM – 6:30 PM (IST)'
    },
    liberia: {
      country: 'Liberia',
      flag: '🇱🇷',
      city: 'Monrovia Admissions Desk',
      phoneDisplay: '+231 889425645',
      phoneRaw: '+231889425645',
      whatsappNumber: '231889425645',
      email: 'info@myersglobalpathways.com',
      label: 'West Africa Admissions Desk',
      address: 'Monrovia Admissions Consultation Desk, Liberia',
      hours: 'Mon – Sat: 8:30 AM – 5:30 PM (GMT)'
    }
  }
};

export const DEFAULT_WHATSAPP_MESSAGE = 'Hello Myers Global Pathways, I am interested in studying in India. I would like to speak with an admissions advisor.';

export const getWhatsAppLink = (
  country: 'india' | 'liberia' = 'india',
  customMessage: string = DEFAULT_WHATSAPP_MESSAGE
) => {
  const number = country === 'liberia' 
    ? BRAND.contacts.liberia.whatsappNumber 
    : BRAND.contacts.india.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(customMessage)}`;
};

export const SERVICES_LIST = [
  {
    id: 'university-course-selection',
    number: '01',
    title: 'University & Course Selection',
    description: 'Personalized evaluation of your academic background, career goals, and budget to select the best accredited Indian universities and degree programs.',
    details: ['Curriculum analysis', 'Accreditation verification (UGC / NAAC / AICTE)', 'Budget planning & scholarship guidance']
  },
  {
    id: 'admission-guidance',
    number: '02',
    title: 'Admission Guidance',
    description: 'Direct step-by-step guidance through university entry requirements, entrance exemptions, eligibility criteria, and admissions timelines.',
    details: ['Eligibility evaluation', 'Intake deadline tracking', 'Direct university communications']
  },
  {
    id: 'application-support',
    number: '03',
    title: 'Application Support',
    description: 'Thorough review and processing of your application forms, statement of purpose, academic credentials, and official submission to partner faculties.',
    details: ['Application review & error checks', 'Fast-track document forwarding', 'Official provisional offer tracking']
  },
  {
    id: 'documentation-assistance',
    number: '04',
    title: 'Documentation Assistance',
    description: 'Expert verification of high school transcripts (WASSCE, WAEC, KCSE, CBSE, A-Levels), identity credentials, and recommendation letters.',
    details: ['Transcript authentication', 'Bonafide letter procurement', 'Apostille & notary guidance']
  },
  {
    id: 'visa-guidance',
    number: '05',
    title: 'Visa Guidance',
    description: 'Comprehensive assistance for your Indian Student Visa application, including bonafide letter verification, financial paperwork, and embassy interview preparation.',
    details: ['Embassy dossier preparation', 'Financial documentation checklist', 'Visa interview advisory']
  },
  {
    id: 'pre-departure-support',
    number: '06',
    title: 'Pre-Departure Support',
    description: 'Detailed briefings before leaving your home country covering flight bookings, medical clearance, travel insurance, packing essentials, and cultural orientation.',
    details: ['Flight route recommendations', 'Checklist for essentials & documents', 'Currency & banking guidance']
  },
  {
    id: 'student-arrival-orientation',
    number: '07',
    title: 'Student Arrival & Orientation',
    description: 'Dedicated airport meet-and-greet in India, escorted transportation to campus, hostel check-in assistance, and local SIM card setup.',
    details: ['Airport reception & transport', 'Hostel room handover', 'Campus registration support']
  },
  {
    id: 'ongoing-student-support',
    number: '08',
    title: 'Ongoing Student Support',
    description: 'Continuous on-ground support throughout your academic years, including FRRO police registration assistance, academic check-ins, and emergency guidance.',
    details: ['FRRO clearance assistance', 'Academic liaison', '24/7 student welfare advisory']
  }
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Submit an Enquiry',
    desc: 'Share your academic background and preferred field of study through our website or direct WhatsApp desk.'
  },
  {
    step: 2,
    title: 'Personal Consultation',
    desc: 'Speak directly with an experienced advisor who evaluates your goals, qualifications, and budget.'
  },
  {
    step: 3,
    title: 'Choose University & Program',
    desc: 'Review curated options of accredited Indian universities tailored to your career aspirations.'
  },
  {
    step: 4,
    title: 'Prepare Documents',
    desc: 'Our documentation team reviews your transcripts, certificates, and passport to ensure 100% compliance.'
  },
  {
    step: 5,
    title: 'Submit Application',
    desc: 'We submit your application directly to the university admissions board for expedited evaluation.'
  },
  {
    step: 6,
    title: 'Admission Decision',
    desc: 'Receive your official Provisional Admission Letter and Registrar Bonafide Certificate.'
  },
  {
    step: 7,
    title: 'Visa Guidance',
    desc: 'We assist with compiling the complete student visa dossier for submission at the Indian Embassy.'
  },
  {
    step: 8,
    title: 'Prepare for India',
    desc: 'Receive pre-departure briefing, book flights, and prepare for airport reception and hostel check-in.'
  }
];

export const STUDY_IN_INDIA_REASONS = [
  {
    id: 'quality-education',
    title: 'Quality Education',
    description: 'World-recognized universities with rigorous academic standards, modern laboratories, and internationally aligned curricula.'
  },
  {
    id: 'diverse-programs',
    title: 'Diverse Programs',
    description: 'Hundreds of undergraduate, postgraduate, and doctoral degree programs across engineering, medicine, computing, and management.'
  },
  {
    id: 'affordable-study',
    title: 'Affordable Study Options',
    description: 'Global standard higher education and comfortable campus living at a fraction of the cost of Western universities.'
  },
  {
    id: 'international-environment',
    title: 'International Student Environment',
    description: 'Vibrant, multicultural campus communities welcoming tens of thousands of international students each academic year.'
  },
  {
    id: 'career-opportunities',
    title: 'Career & Industry Exposure',
    description: 'Close integration with booming technology, pharmaceutical, manufacturing, and business hubs for internships and practical training.'
  },
  {
    id: 'cultural-experience',
    title: 'Rich Cultural Experience',
    description: 'A warm, diverse, and hospitable society offering an enriching international student lifestyle and safe campus living.'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'personalized-guidance',
    title: 'Personalized Guidance',
    desc: 'Every student receives dedicated one-on-one attention tailored to their unique academic history, interests, and career ambitions.'
  },
  {
    id: 'international-student-support',
    title: 'International Student Support',
    desc: 'Founded and managed by advisors who have personally navigated the international student journey from Africa to India.'
  },
  {
    id: 'clear-admission-guidance',
    title: 'Clear Admission Guidance',
    desc: 'Transparent advice on entry criteria, course prerequisites, official fee structures, and genuine university credentials.'
  },
  {
    id: 'assistance-throughout',
    title: 'Assistance Throughout the Process',
    desc: 'We stay by your side from the first enquiry until you graduate — including visa documentation and airport arrival.'
  },
  {
    id: 'student-focused-service',
    title: 'Student-Focused Service',
    desc: 'Our priority is your academic success and long-term wellbeing in India with zero hidden fees and no false promises.'
  }
];

export const STUDY_OPTIONS: StudyOptionDetail[] = [
  {
    id: 'COMPUTER SCIENCE',
    title: 'Computer Science & Information Technology',
    shortDesc: 'Software engineering, AI, cybersecurity, cloud architecture, and data systems.',
    popularSpecializations: ['Artificial Intelligence & ML', 'Software Engineering', 'Cybersecurity', 'Cloud Computing & DevOps'],
    duration: '3 - 4 Years (UG) / 2 Years (PG)',
    degreeTypes: ['BCA', 'B.Tech / B.Sc Computer Science', 'MCA', 'M.Tech']
  },
  {
    id: 'BUSINESS',
    title: 'Business & Management',
    shortDesc: 'Strategic management, corporate finance, international trade, and digital marketing.',
    popularSpecializations: ['International Business', 'Corporate Finance & Banking', 'Digital Marketing', 'Supply Chain Management'],
    duration: '3 Years (BBA) / 2 Years (MBA)',
    degreeTypes: ['BBA', 'B.Com (Hons)', 'MBA', 'PGDM']
  },
  {
    id: 'ENGINEERING',
    title: 'Engineering & Technology',
    shortDesc: 'Practical technical disciplines with hands-on lab work and industrial project training.',
    popularSpecializations: ['Mechanical & Mechatronics', 'Civil & Structural Engineering', 'Electrical & Electronics', 'Robotics & Automation'],
    duration: '4 Years (B.Tech) / 2 Years (M.Tech)',
    degreeTypes: ['B.Tech / B.E', 'M.Tech', 'Lateral Entry Diploma-to-Degree']
  },
  {
    id: 'HEALTHCARE',
    title: 'Healthcare & Allied Medical Sciences',
    shortDesc: 'Clinical training, pharmacology, and laboratory sciences linked to major teaching hospitals.',
    popularSpecializations: ['Pharmacy (B.Pharm)', 'Nursing & Patient Care', 'Medical Laboratory Technology', 'Physiotherapy (BPT)'],
    duration: '3 - 4.5 Years',
    degreeTypes: ['B.Pharm', 'B.Sc Nursing', 'BPT', 'B.Sc MLT']
  },
  {
    id: 'DATA & TECHNOLOGY',
    title: 'Data Science & Applied Technologies',
    shortDesc: 'Mathematical modeling, big data infrastructure, business analytics, and machine learning.',
    popularSpecializations: ['Data Science & Analytics', 'Big Data Engineering', 'Artificial Intelligence', 'IoT Systems'],
    duration: '3 - 4 Years',
    degreeTypes: ['B.Sc Data Science', 'B.Tech IT', 'M.Sc Data Analytics']
  },
  {
    id: 'OTHER',
    title: 'Humanities, Law & Applied Arts',
    shortDesc: 'Legal studies, media communications, design, hospitality, and social sciences.',
    popularSpecializations: ['Law (BA LLB / BBA LLB)', 'Journalism & Mass Communication', 'Hotel & Hospitality Management', 'Interior & Fashion Design'],
    duration: '3 - 5 Years',
    degreeTypes: ['BA / B.Sc', 'LLB / LLM', 'B.Des', 'BHM']
  }
];
