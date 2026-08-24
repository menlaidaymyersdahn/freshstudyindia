import { ServiceItem, JourneyStep, EmailContact } from '../types';

export const COMPANY = {
  name: 'MYERS GLOBAL PATHWAYS',
  shortName: 'Myers Global Pathways',
  tagline: 'Your Pathway to Global Education',
  description: 'Personalized guidance for international students seeking quality education, university opportunities, and a smoother journey to India.',
  year: 2026,
};

// Official Myers Global Pathways Email Directory
// Exactly 9 verified emails
export const OFFICIAL_EMAIL_DIRECTORY: EmailContact[] = [
  {
    department: 'General Enquiries',
    email: 'info@myersglobalpathways.com',
    purpose: 'General consultation, initial overview, and advisory inquiries'
  },
  {
    department: 'Admissions Desk',
    email: 'admissions@myersglobalpathways.com',
    purpose: 'Course guidance, admission requirements, and university options'
  },
  {
    department: 'Applications',
    email: 'applications@myersglobalpathways.com',
    purpose: 'Application submission, document review, and status updates'
  },
  {
    department: 'Student Support',
    email: 'support@myersglobalpathways.com',
    purpose: 'Pre-departure assistance, arrival orientation, and ongoing guidance'
  },
  {
    department: 'Institutional Partnerships',
    email: 'partnerships@myersglobalpathways.com',
    purpose: 'University relations, institutional collaboration, and academic desks'
  },
  {
    department: 'Careers',
    email: 'careers@myersglobalpathways.com',
    purpose: 'Academic counselor positions and regional representative opportunities'
  },
  {
    department: 'Collaborations',
    email: 'collab@myersglobalpathways.com',
    purpose: 'Outreach programs, educational initiatives, and global workshops'
  },
  {
    department: 'Direct Contact',
    email: 'contact@myersglobalpathways.com',
    purpose: 'Direct communications and general correspondence'
  },
  {
    department: 'Founder / Administration',
    email: 'menlaiday@myersglobalpathways.com',
    purpose: 'Executive leadership, administrative oversight, and principal advisory'
  }
];

// WhatsApp Configuration Helper
// Checks environment variable VITE_WHATSAPP_NUMBER or NEXT_PUBLIC_WHATSAPP_NUMBER
export const getWhatsAppConfig = () => {
  const envNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
  const isConfigured = Boolean(envNumber && envNumber.length >= 8);
  
  return {
    isConfigured,
    number: envNumber || '',
    displayLabel: 'Chat With Myers Global Pathways',
    buttonText: 'CHAT ON WHATSAPP',
    url: isConfigured 
      ? `https://wa.me/${envNumber}?text=${encodeURIComponent('Hello Myers Global Pathways, I would like to inquire about studying in India.')}`
      : 'mailto:admissions@myersglobalpathways.com?subject=WhatsApp%20Admissions%20Inquiry'
  };
};

// 01 to 08 Core Services for Interactive Master-Detail Section
export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'university-selection',
    number: '01',
    title: 'University & Course Selection',
    tagline: 'Matching academic ambitions with the right institutions and degree programs.',
    description: 'Every student has distinct career goals and educational backgrounds. We carefully assess your academic qualifications, preferred field of study, and budget to identify suitable universities and accredited degree programs across India.',
    highlights: [
      'Comprehensive profile and credential assessment',
      'Curriculum and career pathway alignment',
      'Guidance on recognized, accredited institutions',
      'Budget and tuition fee transparency'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'University students walking through a modern academic campus'
  },
  {
    id: 'admission-guidance',
    number: '02',
    title: 'Admission Guidance',
    tagline: 'Step-by-step clarity on eligibility criteria and university prerequisites.',
    description: 'University admission systems can vary widely by discipline and institution. We guide international applicants through specific eligibility criteria, grade equivalencies, application calendars, and intake schedules for Indian universities.',
    highlights: [
      'Clear evaluation of entry prerequisites',
      'Guidance on academic calendar and deadlines',
      'Verification of degree recognition and pathways',
      'Personalized consultation with admissions advisors'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'International university students in discussion during a campus seminar'
  },
  {
    id: 'application-assistance',
    number: '03',
    title: 'Application Assistance',
    tagline: 'Accurate preparation and timely submission of university applications.',
    description: 'Submitting a complete and well-organized application minimizes delays and maximizes consideration. We assist you in completing official university forms, compiling necessary attachments, and submitting error-free application packages.',
    highlights: [
      'Structured application form completion',
      'Review of statements of purpose and resumes',
      'Liaison with university admissions departments',
      'Application progress tracking from start to finish'
    ],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Student carefully preparing academic documents and application papers'
  },
  {
    id: 'document-preparation',
    number: '04',
    title: 'Document Preparation',
    tagline: 'Organizing and formatting required certificates, transcripts, and credentials.',
    description: 'International admissions require specific document formatting, attested certificates, and accurate transcript translations where applicable. We help students assemble a complete, organized documentation dossier ready for university verification.',
    highlights: [
      'Checklist of required certificates and transcripts',
      'Guidance on academic transcript attestation',
      'Passport and identification formatting checks',
      'Secure, confidential document organization'
    ],
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Organized folders and official educational credential documents on a clean desk'
  },
  {
    id: 'visa-guidance',
    number: '05',
    title: 'Visa Guidance',
    tagline: 'Navigating student visa requirements and embassy documentation procedures.',
    description: 'Securing an Indian Student Visa requires strict adherence to consular guidelines, valid provisional admission letters, and financial proof. We provide systematic guidance to help students prepare for their visa applications smoothly.',
    highlights: [
      'Step-by-step student visa documentation checklist',
      'Understanding university bonafide and admission letters',
      'Consular appointment and submission preparation',
      'Guidance on immigration compliance regulations'
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'International traveler passport and boarding documents ready for departure'
  },
  {
    id: 'pre-departure-support',
    number: '06',
    title: 'Pre-Departure Support',
    tagline: 'Essential briefings and practical preparation before traveling to India.',
    description: 'Traveling to study in a new country is an exciting transition. Our pre-departure guidance prepares students for travel logistics, packing essentials, campus dress codes, currency exchange, and medical documentation before boarding.',
    highlights: [
      'Comprehensive pre-departure packing and travel guide',
      'Flight routing and travel schedule coordination',
      'Health, insurance, and medical advice',
      'Introduction to living in India and campus life'
    ],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Traveler preparing luggage and travel journal for an international journey'
  },
  {
    id: 'arrival-orientation',
    number: '07',
    title: 'Arrival & Orientation',
    tagline: 'Welcoming students upon arrival and assisting with campus settlement.',
    description: 'The first few days in India are crucial. We provide guidance on airport transit, campus arrival coordination, hostel check-in procedures, local SIM card acquisition, and initial orientation to university facilities.',
    highlights: [
      'Arrival coordination and transit guidance',
      'Campus registration and hostel check-in steps',
      'Local communication and connectivity setup',
      'Introduction to campus amenities and student communities'
    ],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'University graduates smiling at an open-air graduation ceremony'
  },
  {
    id: 'student-support',
    number: '08',
    title: 'Student Support',
    tagline: 'Ongoing guidance throughout your academic journey in India.',
    description: 'Our commitment does not end at campus admission. Myers Global Pathways remains an accessible point of guidance for students, offering support on academic adjustments, local registration requirements, and day-to-day student inquiries.',
    highlights: [
      'Dedicated student advisory contact channel',
      'Guidance on FRRO / local registration processes',
      'Academic transition and wellness support',
      'Continuous communication for parents and guardians'
    ],
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Diverse group of university students collaborating at a library work table'
  }
];

// 01 to 07 Step Visual Application Journey
export const APPLICATION_JOURNEY: JourneyStep[] = [
  {
    step: '01',
    number: '01',
    title: 'DISCOVER',
    description: 'Understand your study options.',
    details: 'Explore degree programs, fields of study, and higher education opportunities available in India that align with your career goals.'
  },
  {
    step: '02',
    number: '02',
    title: 'CONSULT',
    description: 'Speak with our admissions team.',
    details: 'Connect with a Myers Global Pathways counselor for personalized evaluation of your academic qualifications and timeline.'
  },
  {
    step: '03',
    number: '03',
    title: 'CHOOSE',
    description: 'Select your preferred course and university.',
    details: 'Identify and confirm the most suitable university options, specific degree specializations, and campus locations.'
  },
  {
    step: '04',
    number: '04',
    title: 'APPLY',
    description: 'Prepare and submit your application.',
    details: 'Assemble your required transcripts, certificates, and personal statements to submit a complete, verified application package.'
  },
  {
    step: '05',
    number: '05',
    title: 'ADMISSION',
    description: 'Receive and review your admission outcome.',
    details: 'Obtain your official provisional offer letter, review program specifics, and confirm your university acceptance.'
  },
  {
    step: '06',
    number: '06',
    title: 'PREPARE',
    description: 'Complete the necessary preparation before travel.',
    details: 'Receive step-by-step student visa documentation guidance, pre-departure briefings, and travel coordination.'
  },
  {
    step: '07',
    number: '07',
    title: 'ARRIVE',
    description: 'Begin your journey in India.',
    details: 'Arrive at your campus, complete your hostel check-in and registration, and start your international higher education experience.'
  }
];

// Why Study in India - 6 Key Editorial Pillars (Fact-based, no invented stats)
export const WHY_STUDY_IN_INDIA = [
  {
    id: 'quality-education',
    title: 'Quality Education',
    subtitle: 'Globally recognized curricula and academic rigor',
    description: 'India is home to renowned institutes of higher learning with rigorous academic standards in engineering, management, sciences, technology, and humanities, taught in English.',
    icon: 'GraduationCap'
  },
  {
    id: 'affordable-options',
    title: 'Affordable Education Options',
    subtitle: 'High-value education with manageable living costs',
    description: 'Tuition fees and overall living expenses in India are significantly more accessible compared to many Western destinations, making international degrees attainable.',
    icon: 'BadgeCheck'
  },
  {
    id: 'wide-range-programs',
    title: 'Wide Range of Programs',
    subtitle: 'From cutting-edge technology to traditional sciences',
    description: 'Students can choose from an extensive variety of undergraduate, postgraduate, and diploma programs across emerging disciplines and classic academic fields.',
    icon: 'BookOpen'
  },
  {
    id: 'growing-opportunities',
    title: 'Growing Career Opportunities',
    subtitle: 'A booming global knowledge and tech ecosystem',
    description: 'Studying in one of the world\'s fastest-growing economies provides exposure to leading innovation hubs, dynamic industries, and a vast professional landscape.',
    icon: 'TrendingUp'
  },
  {
    id: 'international-environment',
    title: 'International Student Environment',
    subtitle: 'A diverse and welcoming multinational campus culture',
    description: 'Campuses host students from Asia, Africa, the Middle East, and beyond, creating a rich multicultural atmosphere where international students connect and collaborate.',
    icon: 'Users'
  },
  {
    id: 'cultural-experience',
    title: 'Cultural Experience',
    subtitle: 'Rich heritage, warm hospitality, and historic depth',
    description: 'Living in India offers a transformative cultural experience, combining deep historical traditions, varied regional cuisines, vibrant festivals, and warm hospitality.',
    icon: 'Globe'
  }
];

// About Myers Global Pathways Core Principles
export const CORE_PRINCIPLES = [
  {
    title: 'Personalized Guidance',
    description: 'Every student has a unique academic background and ambition. We provide one-on-one advising tailored to your specific strengths, timeline, and goals.'
  },
  {
    title: 'Transparency',
    description: 'We believe in straightforward, honest advice regarding admission criteria, estimated costs, documentation requirements, and university expectations.'
  },
  {
    title: 'Dedicated Student Support',
    description: 'Our guidance extends from initial program discovery all the way through visa preparation, campus arrival, and ongoing transition support.'
  },
  {
    title: 'International Perspective',
    description: 'We understand the practical questions and concerns international students and their families navigate when planning education abroad.'
  },
  {
    title: 'Professional Service',
    description: 'We uphold the highest ethical standards, prioritizing student privacy, document integrity, and reliable communication at every stage.'
  }
];
