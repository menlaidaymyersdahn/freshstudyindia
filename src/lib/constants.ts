import { StudyOptionDetail } from '../types';

export const BRAND = {
  name: 'Myers Global Pathways',
  shortName: 'MGP',
  tagline: 'Your Pathway to Global Education',
  subTagline: 'International Higher Education Advisory for India',
  description: 'A premium international education consultancy assisting students worldwide with university placement, admissions guidance, documentation, and the complete journey to studying in India.',
  mission: 'We guide ambitious international students through every stage of their higher education journey in India with transparent, personalized, and dependable advisory.',
  
  // Official Directory of verified email contacts
  emails: {
    info: 'info@myersglobalpathways.com',
    admissions: 'admissions@myersglobalpathways.com',
    applications: 'applications@myersglobalpathways.com',
    support: 'support@myersglobalpathways.com',
    partnerships: 'partnerships@myersglobalpathways.com',
    careers: 'careers@myersglobalpathways.com',
    collab: 'collab@myersglobalpathways.com',
    contact: 'contact@myersglobalpathways.com',
    founder: 'menlaiday@myersglobalpathways.com'
  },

  // Directory list for UI rendering with departments and descriptions
  emailDirectory: [
    {
      department: 'General Enquiries',
      email: 'info@myersglobalpathways.com',
      role: 'General questions, consultations, and guidance'
    },
    {
      department: 'Admissions',
      email: 'admissions@myersglobalpathways.com',
      role: 'Eligibility assessment and university selection'
    },
    {
      department: 'Applications',
      email: 'applications@myersglobalpathways.com',
      role: 'Application processing, review, and offer letters'
    },
    {
      department: 'Student Support',
      email: 'support@myersglobalpathways.com',
      role: 'Pre-departure, arrival, and ongoing on-campus assistance'
    },
    {
      department: 'Partnerships',
      email: 'partnerships@myersglobalpathways.com',
      role: 'University relations, institutional partnerships, and agencies'
    },
    {
      department: 'Careers',
      email: 'careers@myersglobalpathways.com',
      role: 'Join our international advisory and student counselor team'
    },
    {
      department: 'Collaborations',
      email: 'collab@myersglobalpathways.com',
      role: 'Education fairs, student outreach programs, and media'
    },
    {
      department: 'Contact',
      email: 'contact@myersglobalpathways.com',
      role: 'Direct correspondence and official inquiries'
    },
    {
      department: 'Founder / Administration',
      email: 'menlaiday@myersglobalpathways.com',
      role: 'Executive management and executive consultations'
    }
  ],

  contacts: {
    india: {
      country: 'India',
      flag: '🇮🇳',
      city: 'India Admissions & Student Support Desk',
      address: 'Admissions & International Desk, India',
      phoneDisplay: '+91 9201330946',
      phoneRaw: '+919201330946',
      whatsappNumber: '919201330946',
      email: 'admissions@myersglobalpathways.com',
      label: 'Headquarters & Student Support Desk',
      hours: 'Mon – Sat: 9:00 AM – 6:30 PM (IST)'
    },
    liberia: {
      country: 'Liberia',
      flag: '🇱🇷',
      city: 'Monrovia Regional Admissions Desk',
      address: 'West Africa Regional Desk, Monrovia, Liberia',
      phoneDisplay: '+231 889425645',
      phoneRaw: '+231889425645',
      whatsappNumber: '231889425645',
      email: 'info@myersglobalpathways.com',
      label: 'West Africa Admissions Desk',
      hours: 'Mon – Sat: 8:30 AM – 5:30 PM (GMT)'
    }
  }
};

export const EMAIL_DIRECTORY = BRAND.emailDirectory;

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
    subtitle: 'Strategic Academic Mapping',
    description: 'Personalized evaluation of your academic background, career ambitions, and budget to identify top-tier accredited Indian universities and degree programs.',
    details: [
      'Comprehensive transcript and academic history assessment',
      'Accreditation verification (UGC, NAAC ‘A++’, AICTE, NIRF)',
      'Budget planning, tuition transparency, and fee structuring'
    ],
    deliverable: 'Tailored Shortlist of 3–5 Ideal University Programs'
  },
  {
    id: 'admission-guidance',
    number: '02',
    title: 'Admission Guidance',
    subtitle: 'Direct University Admissions',
    description: 'Clear, step-by-step guidance navigating entry requirements, qualification equivalencies, prerequisites, and admissions timelines without intermediaries.',
    details: [
      'Eligibility evaluation across diverse international high school curricula',
      'Direct communication channel with university international admissions boards',
      'Intake deadline tracking and priority application processing'
    ],
    deliverable: 'Verified Admissions Eligibility & Direct Liaison'
  },
  {
    id: 'application-assistance',
    number: '03',
    title: 'Application Assistance',
    subtitle: 'End-to-End Submission Support',
    description: 'Thorough review, compilation, and formal submission of your application forms, statement of purpose, and supporting records.',
    details: [
      'Application form auditing to eliminate omissions or formatting errors',
      'Expedited submission to university registrars and department deans',
      'Provisional Admission Letter and official offer tracking'
    ],
    deliverable: 'Flawless Application Submission & Offer Tracking'
  },
  {
    id: 'document-preparation',
    number: '04',
    title: 'Document Preparation',
    subtitle: 'Credential Verification & Compliance',
    description: 'Expert verification of high school transcripts (WASSCE, WAEC, KCSE, CBSE, IB, A-Levels), identity credentials, and recommendation letters.',
    details: [
      'Transcript formatting according to Indian university standards',
      'Bonafide student certificate procurement for official bodies',
      'Apostille, notarization, and verification procedural guidance'
    ],
    deliverable: 'Complete, Compliant Academic Portfolio'
  },
  {
    id: 'visa-guidance',
    number: '05',
    title: 'Visa Guidance',
    subtitle: 'Indian Student Visa Advisory',
    description: 'Comprehensive assistance for your Indian Student Visa application, including bonafide letter verification, financial paperwork, and embassy interview preparation.',
    details: [
      'Complete embassy visa dossier checklist assembly',
      'Financial proof documentation and bank statement verification guidance',
      'One-on-one mock visa interview and consular Q&A briefing'
    ],
    deliverable: 'Ready-to-Submit Indian Student Visa Dossier'
  },
  {
    id: 'pre-departure-support',
    number: '06',
    title: 'Pre-Departure Support',
    subtitle: 'Travel, Health & Essentials Briefing',
    description: 'Detailed briefings before leaving your home country covering flight bookings, medical clearance, travel insurance, packing essentials, and cultural orientation.',
    details: [
      'Flight route optimization and transit guidelines to India',
      'Essential packing checklist (climate, electrical, academic supplies)',
      'Forex, international banking, and initial currency exchange guidance'
    ],
    deliverable: 'Pre-Departure Handout & Flight Coordination'
  },
  {
    id: 'arrival-orientation',
    number: '07',
    title: 'Arrival & Orientation',
    subtitle: 'Airport Reception & Campus Settlement',
    description: 'Dedicated airport meet-and-greet in India, escorted transportation directly to your university campus, hostel room handover, and initial settlement.',
    details: [
      'Airport reception and safe escort to your university campus',
      'Hostel accommodation check-in and room assignment support',
      'Local Indian SIM card setup, internet access, and campus orientation'
    ],
    deliverable: 'Stress-Free Airport Welcome & Campus Settlement'
  },
  {
    id: 'student-support',
    number: '08',
    title: 'Student Support',
    subtitle: 'Continuous Academic & Personal Welfare',
    description: 'Continuous on-ground support throughout your academic years, including FRRO police registration assistance, academic check-ins, and emergency guidance.',
    details: [
      'Mandatory Foreigners Regional Registration Office (FRRO) assistance',
      'Ongoing academic mentoring, exam support, and counselor check-ins',
      '24/7 dedicated international student welfare desk'
    ],
    deliverable: 'Ongoing Peace of Mind Throughout Your Degree'
  }
];

export const APPLICATION_JOURNEY_STEPS = [
  {
    step: 1,
    stepNumber: '01',
    title: 'Discover',
    subtitle: 'Initial Exploration',
    tagline: 'Initial Exploration',
    description: 'Share your academic background, career interests, and budget. Explore India’s top higher education opportunities.',
    desc: 'Share your academic background, career interests, and budget. Explore India’s top higher education opportunities.',
    highlights: ['Profile assessment', 'Academic consultation', 'Intake timeline review'],
    checklist: ['Academic background evaluation', 'Program eligibility screening', 'Initial budget planning']
  },
  {
    step: 2,
    stepNumber: '02',
    title: 'Consult',
    subtitle: 'Personalized Strategy',
    tagline: 'Personalized Strategy',
    description: 'Have a one-on-one consultation with an advisor who explains eligible programs, fee structures, and campus life.',
    desc: 'Have a one-on-one consultation with an advisor who explains eligible programs, fee structures, and campus life.',
    highlights: ['1-on-1 advisor matching', 'Fee structure transparency', 'Program comparison'],
    checklist: ['One-on-one counselor session', 'Verified fee breakdown review', 'University comparison shortlist']
  },
  {
    step: 3,
    stepNumber: '03',
    title: 'Choose',
    subtitle: 'Curated University Selection',
    tagline: 'Curated University Selection',
    description: 'Select the accredited Indian university and specialized degree program that best matches your future aspirations.',
    desc: 'Select the accredited Indian university and specialized degree program that best matches your future aspirations.',
    highlights: ['UGC & NAAC verified options', 'Curriculum review', 'Campus location selection'],
    checklist: ['Course curriculum review', 'Campus facilities & hostel verification', 'Final university choice selection']
  },
  {
    step: 4,
    stepNumber: '04',
    title: 'Apply',
    subtitle: 'Document Audit & Submission',
    tagline: 'Document Audit & Submission',
    description: 'Our team verifies your academic credentials and submits your formal application directly to the admissions board.',
    desc: 'Our team verifies your academic credentials and submits your formal application directly to the admissions board.',
    highlights: ['Credential verification', 'SOP assistance', 'Direct university filing'],
    checklist: ['High school / WASSCE transcript audit', 'Formal application filing', 'Application tracking ID receipt']
  },
  {
    step: 5,
    stepNumber: '05',
    title: 'Receive Admission',
    subtitle: 'Official Offer & Bonafide Letter',
    tagline: 'Official Offer & Bonafide Letter',
    description: 'Obtain your official University Provisional Admission Letter and Registrar Bonafide Certificate for visa issuance.',
    desc: 'Obtain your official University Provisional Admission Letter and Registrar Bonafide Certificate for visa issuance.',
    highlights: ['Provisional Admission Letter', 'Official Fee Receipt', 'Embassy Bonafide Certificate'],
    checklist: ['Provisional Admission Letter issuance', 'Tuition deposit receipt confirmation', 'Embassy Bonafide letter generation']
  },
  {
    step: 6,
    stepNumber: '06',
    title: 'Prepare for India',
    subtitle: 'Visa Dossier & Pre-Departure',
    tagline: 'Visa Dossier & Pre-Departure',
    description: 'Complete your Student Visa application with our step-by-step advisory, book flights, and attend pre-departure briefing.',
    desc: 'Complete your Student Visa application with our step-by-step advisory, book flights, and attend pre-departure briefing.',
    highlights: ['Visa dossier review', 'Flight booking advisory', 'Pre-departure packing guide'],
    checklist: ['Embassy visa appointment dossier review', 'Flight booking & transit coordination', 'Pre-departure packing & Forex briefing']
  },
  {
    step: 7,
    stepNumber: '07',
    title: 'Begin Your Journey',
    subtitle: 'Arrival, Campus & Orientation',
    tagline: 'Arrival, Campus & Orientation',
    description: 'Arrive in India with on-ground airport reception, campus escort, hostel check-in, FRRO support, and orientation.',
    desc: 'Arrive in India with on-ground airport reception, campus escort, hostel check-in, FRRO support, and orientation.',
    highlights: ['Airport meet & greet', 'Hostel check-in', 'FRRO registration assistance'],
    checklist: ['Airport meet and greet in India', 'Campus & hostel room check-in', 'Local SIM card setup & FRRO police registration']
  }
];

export const PROCESS_STEPS = APPLICATION_JOURNEY_STEPS;

export const WHY_INDIA_POINTS = [
  {
    id: 'quality-education',
    title: 'Quality Education',
    stat: 'Global Standards',
    description: 'India boasts premier institutions with internationally benchmarked curricula, state-of-the-art research laboratories, and globally recognized degrees.',
    highlight: 'Accredited by UGC, AICTE, and NAAC with global degree recognition.'
  },
  {
    id: 'affordable-opportunities',
    title: 'Affordable Opportunities',
    stat: 'High Value',
    description: 'Pursue world-class higher education and comfortable on-campus living at a fraction of the cost required in North America or Western Europe.',
    highlight: 'Transparent tuition with bundled hostel, dining, and lab access.'
  },
  {
    id: 'diverse-programs',
    title: 'Diverse Programs',
    stat: '500+ Degrees',
    description: 'Comprehensive degree pathways across Artificial Intelligence, Cloud Computing, Medicine & Allied Health, Pharmacy, Business, and Engineering.',
    highlight: 'Undergraduate, Postgraduate, Lateral Entry, and Doctoral tracks.'
  },
  {
    id: 'growing-career-opportunities',
    title: 'Growing Career Opportunities',
    stat: 'Tech & Industry',
    description: 'Study at the center of the world’s fastest-growing major economy, with unparalleled exposure to tech parks, pharmaceutical hubs, and multinational giants.',
    highlight: 'Practical internships, industrial capstone projects, and industry networking.'
  },
  {
    id: 'international-student-environment',
    title: 'International Student Environment',
    stat: 'Global Community',
    description: 'Vibrant, multicultural campus communities welcoming ambitious students from across Africa, Asia, the Middle East, and beyond.',
    highlight: 'Dedicated international student cells, international dining, and cultural festivals.'
  },
  {
    id: 'rich-cultural-experience',
    title: 'Rich Cultural Experience',
    stat: 'Historic & Modern',
    description: 'An enriching life experience combining timeless hospitality, rich heritage, safety, English-medium instruction, and modern urban infrastructure.',
    highlight: 'Warm hospitality, English-taught courses, and supportive student life.'
  }
];

export const STUDY_IN_INDIA_REASONS = WHY_INDIA_POINTS;

export const ABOUT_CORE_PILLARS = [
  {
    id: 'personalized-guidance',
    title: 'Personalized Guidance',
    subtitle: 'Tailored to your ambitions',
    description: 'We do not believe in one-size-fits-all education. Every student receives focused, 1-on-1 strategic consultation matching their exact academic qualifications, budget, and long-term career goals.',
    desc: 'We do not believe in one-size-fits-all education. Every student receives focused, 1-on-1 strategic consultation matching their exact academic qualifications, budget, and long-term career goals.'
  },
  {
    id: 'transparency',
    title: 'Absolute Transparency',
    subtitle: 'Honest, verifiable guidance',
    description: 'Zero hidden fees, zero inflated claims, and zero ambiguous promises. We provide clear, verifiable fee schedules directly from universities and realistic admissions criteria.',
    desc: 'Zero hidden fees, zero inflated claims, and zero ambiguous promises. We provide clear, verifiable fee schedules directly from universities and realistic admissions criteria.'
  },
  {
    id: 'student-support',
    title: 'Dedicated Student Support',
    subtitle: 'With you at every single step',
    description: 'Our commitment does not end when your offer letter arrives. We assist with visa dossiers, pre-departure briefings, airport arrival reception, and ongoing welfare on campus.',
    desc: 'Our commitment does not end when your offer letter arrives. We assist with visa dossiers, pre-departure briefings, airport arrival reception, and ongoing welfare on campus.'
  },
  {
    id: 'international-perspective',
    title: 'International Perspective',
    subtitle: 'Lived experience in global education',
    description: 'Founded with firsthand understanding of the journey international students take traveling from home countries across Africa and worldwide to study in India.',
    desc: 'Founded with firsthand understanding of the journey international students take traveling from home countries across Africa and worldwide to study in India.'
  },
  {
    id: 'professional-service',
    title: 'Professional Service',
    subtitle: 'Direct university liaison',
    description: 'We maintain professional, structured relationships with accredited universities, ensuring prompt evaluation, timely communications, and smooth documentation.',
    desc: 'We maintain professional, structured relationships with accredited universities, ensuring prompt evaluation, timely communications, and smooth documentation.'
  }
];

export const WHY_CHOOSE_US = ABOUT_CORE_PILLARS;

export const PROGRAM_DISCIPLINES = [
  {
    id: 'cs-ai',
    name: 'Computer Science, Artificial Intelligence & Data Systems',
    title: 'Computer Science, Artificial Intelligence & Data Systems',
    category: 'Information Technology',
    duration: '3 to 4 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['B.Tech', 'BCA', 'B.Sc Data Science', 'MCA', 'M.Tech'],
    description: 'Cutting-edge engineering and computer applications with industry certifications in Cloud Computing, AI & Machine Learning, and Cybersecurity.',
    shortDesc: 'Cutting-edge engineering and computer applications with industry certifications in Cloud Computing, AI & Machine Learning, and Cybersecurity.',
    popularCourses: ['B.Tech Computer Science', 'BCA', 'B.Sc Data Science', 'MCA', 'M.Tech CSE'],
    popularSpecializations: ['Artificial Intelligence', 'Cloud Computing', 'Data Analytics', 'Cybersecurity', 'Software Systems']
  },
  {
    id: 'business-mba',
    name: 'Business Administration, International Finance & MBA',
    title: 'Business Administration, International Finance & MBA',
    category: 'Business & Management',
    duration: '2 to 3 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['BBA', 'B.Com', 'MBA', 'PGDM'],
    description: 'Globally benchmarked leadership and management degrees with deep specializations in Global Finance, Supply Chain, and Digital Strategy.',
    shortDesc: 'Globally benchmarked leadership and management degrees with deep specializations in Global Finance, Supply Chain, and Digital Strategy.',
    popularCourses: ['BBA', 'B.Com (Honours)', 'MBA in International Business', 'MBA in Finance', 'PGDM'],
    popularSpecializations: ['International Business', 'Corporate Finance', 'Supply Chain Management', 'Digital Marketing Strategy']
  },
  {
    id: 'engineering-tech',
    name: 'Core Engineering, Robotics & Sustainable Technologies',
    title: 'Core Engineering, Robotics & Sustainable Technologies',
    category: 'Engineering',
    duration: '3 to 4 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['B.Tech', 'M.Tech'],
    description: 'AICTE-approved engineering faculties with modern simulation labs in Mechatronics, Mechanical, Civil, and Electrical Systems.',
    shortDesc: 'AICTE-approved engineering faculties with modern simulation labs in Mechatronics, Mechanical, Civil, and Electrical Systems.',
    popularCourses: ['B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical', 'B.Tech Mechatronics', 'M.Tech'],
    popularSpecializations: ['Mechatronics & Robotics', 'Civil Infrastructure', 'Electrical Engineering', 'Mechanical Design']
  },
  {
    id: 'healthcare-pharmacy',
    name: 'Pharmacy, Allied Health & Laboratory Sciences',
    title: 'Pharmacy, Allied Health & Laboratory Sciences',
    category: 'Healthcare & Pharmacy',
    duration: '3 to 4.5 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['B.Pharm', 'B.Sc', 'BPT', 'Pharm.D'],
    description: 'PCI-recognized pharmaceutical and clinical sciences with affiliated multispecialty teaching hospitals and formulation research centers.',
    shortDesc: 'PCI-recognized pharmaceutical and clinical sciences with affiliated multispecialty teaching hospitals and formulation research centers.',
    popularCourses: ['B.Pharm', 'B.Sc Nursing', 'BPT Physiotherapy', 'B.Sc Medical Lab Tech', 'Pharm.D'],
    popularSpecializations: ['Clinical Pharmacy', 'Medical Laboratory Sciences', 'Physiotherapy', 'Hospital Management']
  },
  {
    id: 'applied-sciences-biotech',
    name: 'Applied Sciences, Microbiology & Biotechnology',
    title: 'Applied Sciences, Microbiology & Biotechnology',
    category: 'Applied Sciences',
    duration: '2 to 4 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['B.Sc', 'B.Tech', 'M.Sc'],
    description: 'Advanced laboratory research in molecular diagnostics, industrial fermentation, genetics, and food quality assurance.',
    shortDesc: 'Advanced laboratory research in molecular diagnostics, industrial fermentation, genetics, and food quality assurance.',
    popularCourses: ['B.Sc Microbiology', 'B.Sc Biotechnology', 'B.Tech Food Tech', 'M.Sc Microbiology', 'M.Sc Biotech'],
    popularSpecializations: ['Microbiology', 'Industrial Biotechnology', 'Food Technology', 'Genetics']
  },
  {
    id: 'law-humanities',
    name: 'Law, Media Studies & International Relations',
    title: 'Law, Media Studies & International Relations',
    category: 'Law & Humanities',
    duration: '3 to 5 Years',
    degrees: ['Undergraduate', 'Postgraduate'],
    degreeTypes: ['BA LLB', 'BBA LLB', 'BA', 'BHM'],
    description: 'Bar Council recognized law programs and state-of-the-art broadcast journalism studios preparing graduates for international practice.',
    shortDesc: 'Bar Council recognized law programs and state-of-the-art broadcast journalism studios preparing graduates for international practice.',
    popularCourses: ['BA LLB (5-Year Integrated)', 'BBA LLB', 'BA Journalism & Mass Comm', 'BHM Hotel Management'],
    popularSpecializations: ['International Law', 'Journalism & Mass Comm', 'Hotel Management', 'Diplomacy']
  }
];

export const STUDY_OPTIONS = PROGRAM_DISCIPLINES;
export const EXPLORE_PROGRAMS_DATA = PROGRAM_DISCIPLINES;
