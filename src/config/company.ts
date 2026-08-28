import { ServiceItem, JourneyStep, EmailContact, FAQItem } from '../types';

export const COMPANY = {
  name: 'MYERS GLOBAL PATHWAYS',
  shortName: 'Myers Global Pathways',
  tagline: 'Your Pathway to Global Education',
  description: 'Personalized guidance for international students seeking quality education, university opportunities, and a smoother journey to India.',
  year: 2026,
  founder: 'Menlaiday Myers Dahn',
  founderTitle: 'Founder & Managing Director',
  founderDegree: 'B.Sc. in Computer Science (Shri Rawatpura Sarkar University, India)',
  primaryWhatsApp: '+231 889425645',
  primaryPhone: '+231 889425645',
  alternativePhone: '+91 93478 69324',
  alternativeWhatsApp: '+91 93478 69324',
  primaryLocation: 'Monrovia, Liberia & Hyderabad, India',
};

// Founder Full Biography and Background
export const FOUNDER_PROFILE = {
  name: 'Menlaiday Myers Dahn',
  title: 'Founder & CEO, Myers Group of Companies',
  roles: ['Digital Media Entrepreneur', 'Filmmaker & Visual Producer', 'Technology Professional (B.Sc. CS)', 'International Education Advisor'],
  university: 'Shri Rawatpura Sarkar University, India',
  degree: 'Bachelor of Science in Computer Science (Graduated 2026)',
  audience: '600,000+ Social Media Reach',
  bioParagraphs: [
    'Menlaiday Myers Dahn is a Liberian blogger, filmmaker, digital media entrepreneur, and technology professional whose work spans digital media, entertainment, technology, and entrepreneurship. He is best known for his work in digital news and entertainment through Fresh Updates News, a media platform with a combined audience of more than 600,000 followers across social media platforms. Through Fresh Updates News, Menlaiday has built a strong digital presence by covering breaking news, current affairs, entertainment, trending stories, and issues of interest to Liberian and African audiences.',
    'Beyond digital publishing, Menlaiday has a background in film and visual production. Through Classic Myers Filmwork, he has been involved in filmmaking and music-video production, developing experience in visual storytelling and creative content. His work across blogging, digital media, and film reflects his interest in using modern media platforms to tell stories and reach audiences beyond traditional media.',
    'In 2026, Menlaiday graduated from Shri Rawatpura Sarkar University in India with a Bachelor of Science in Computer Science, adding a formal technology background to his experience in digital media and creative production. His combination of technology, media, and entrepreneurship has become an important part of his professional journey and the businesses he continues to develop.',
    'Through these ventures, Menlaiday is building beyond his identity as a blogger and content creator, developing a broader entrepreneurial portfolio that connects media, technology, education, commerce, and digital innovation. His journey from digital media and filmmaking to completing a Computer Science degree and establishing multiple businesses reflects an expanding interest in building digital platforms and businesses that serve African and international audiences.',
    'Today, Menlaiday Myers Dahn continues to work across media, technology, filmmaking, and entrepreneurship while developing the Myers Group of Companies and its individual ventures. His professional identity is increasingly defined not by one industry, but by the intersection of digital media, technology, creativity, education, and business development.'
  ],
  groupCompanies: [
    {
      name: 'Myers Global Pathways',
      category: 'International Education & Student Support',
      description: 'An international education and student-support company helping students access educational opportunities in India, including university and course selection, admissions, document guidance, scholarship guidance, student visa guidance, accommodation, and pre-departure support.',
      badge: 'Flagship Education'
    },
    {
      name: 'Fresh Updates News',
      category: 'Digital News & Media Platform',
      description: 'The group\'s digital media platform focused on news, entertainment, current affairs, and trending stories, with a combined social-media audience of more than 600,000 followers.',
      badge: '600k+ Followers'
    },
    {
      name: 'Myers FRESH Technologies',
      category: 'Technology Solutions & Software',
      description: 'A technology venture focused on digital products, technology solutions, and innovative online services across modern web and mobile platforms.',
      badge: 'Tech & Innovation'
    },
    {
      name: 'MyEdRives',
      category: 'Education & Mobility Tech',
      description: 'A technology-driven platform focused on driving education and mobility-related services, designed to make access to driving-related learning and services more convenient.',
      badge: 'Mobility & Learning'
    },
    {
      name: 'Fresh Marketplace',
      category: 'E-Commerce & Digital Commerce',
      description: 'An e-commerce and marketplace platform created to connect buyers and sellers and make products and services accessible through a seamless digital marketplace.',
      badge: 'E-Commerce Hub'
    },
    {
      name: 'Classic Myers Filmwork',
      category: 'Film & Visual Media Production',
      description: 'Visual storytelling, film production, creative video direction, and music-video production using modern cinematography.',
      badge: 'Creative Media'
    }
  ]
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
// Default Primary: +231 889425645 | Alternative: +91 93478 69324
export const getWhatsAppConfig = () => {
  const envNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '231889425645').replace(/[^0-9]/g, '');
  const altNumber = '919347869324';
  
  return {
    isConfigured: true,
    number: envNumber || '231889425645',
    formattedNumber: '+231 889425645',
    altNumber: altNumber,
    altFormattedNumber: '+91 93478 69324',
    displayLabel: 'Chat with Myers Global Pathways',
    buttonText: 'CHAT ON WHATSAPP',
    url: `https://wa.me/${envNumber || '231889425645'}?text=${encodeURIComponent('Hello Myers Global Pathways, I would like to inquire about studying in India.')}`,
    altUrl: `https://wa.me/${altNumber}?text=${encodeURIComponent('Hello Myers Global Pathways, I would like to inquire about studying in India.')}`
  };
};

// Comprehensive FAQs (F&Q) for International Students
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-requirements',
    category: 'Admissions',
    question: 'What are the minimum academic requirements to study in India?',
    answer: 'For Undergraduate (Bachelor\'s) degrees, students need completed Senior High School certificates (such as WAEC, WASSCE, O-Levels, A-Levels, High School Diploma, or national equivalent) with acceptable passing grades in relevant subjects. For Postgraduate (Master\'s) programs, a recognized Bachelor\'s degree in a related field is required. Our counselors assess your specific transcripts to recommend the best matching institutions.'
  },
  {
    id: 'faq-ielts',
    category: 'Admissions',
    question: 'Do I need to take IELTS or TOEFL to apply to universities in India?',
    answer: 'In most cases, NO. If your previous education was taught in the English language, Indian universities accept an English Medium of Instruction certificate or standard high school English grades. IELTS or TOEFL is not mandatory for the vast majority of international applicants.'
  },
  {
    id: 'faq-courses',
    category: 'Courses & Universities',
    question: 'Which popular courses and degree programs are available?',
    answer: 'Indian universities offer recognized programs across all fields including Engineering (B.Tech/M.Tech in Computer Science, Artificial Intelligence, Cyber Security, Civil, Mechanical, Robotics), Health Sciences (MBBS, B.Sc Nursing, Pharmacy, Medical Lab Technology), Management (BBA, MBA, Finance, Marketing), Information Technology (BCA, MCA, Data Science), Law, Agriculture, and Biotechnology.'
  },
  {
    id: 'faq-costs',
    category: 'Fees & Living',
    question: 'How affordable is tuition and the cost of living in India?',
    answer: 'Tuition fees in India are significantly lower than Western countries, typically ranging from $1,500 to $4,500 USD per academic year depending on the institution and course. Living expenses, including university hostel accommodation and meal plans, typically range between $150 to $250 USD per month.'
  },
  {
    id: 'faq-visa',
    category: 'Visa & Travel',
    question: 'How does Myers Global Pathways assist with the Indian Student Visa?',
    answer: 'Once you receive your official Provisional Admission Letter and Bona Fide Certificate from the university, our team provides step-by-step guidance on preparing the visa documentation dossier, booking the consular appointment at the Indian Embassy or VFS Global center, and fulfilling all immigration prerequisites.'
  },
  {
    id: 'faq-intakes',
    category: 'Admissions',
    question: 'When are the university intake periods in India?',
    answer: 'The primary intake is the Fall/Monsoon semester (starting in July / August / September). A secondary Spring intake (January / February) is also available for selected undergraduate and postgraduate programs. We recommend starting your application 2 to 4 months in advance.'
  },
  {
    id: 'faq-accommodation',
    category: 'Accommodation & Student Life',
    question: 'What accommodation options are available on campus?',
    answer: 'Most partner universities provide dedicated, secure on-campus international hostels with furnished rooms (single, twin-sharing, or AC options), high-speed Wi-Fi, 24/7 security, laundry facilities, and diverse cafeteria options catering to international dietary preferences.'
  },
  {
    id: 'faq-contact-channels',
    category: 'Student Support',
    question: 'How can I get in touch with the admissions desk directly?',
    answer: 'You can email our admissions desk directly at admissions@myersglobalpathways.com, reach us on WhatsApp at +231 889425645 (or alternative +91 93478 69324), or submit your application profile directly on this website for immediate evaluation.'
  }
];


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
