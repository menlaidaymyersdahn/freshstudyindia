import { 
  University, 
  Course, 
  Scholarship, 
  Testimonial, 
  BlogPost, 
  FAQItem, 
  Application,
  DocumentFile,
  VisaStatus,
  SupportTicket,
  ChatMessage,
  PaymentRecord
} from '../types';

export const mockUniversities: University[] = [
  {
    id: 'u1',
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    ranking: 1,
    acceptanceRate: '1.2%',
    tuitionRange: '₹2,20,000 - ₹2,80,000 / yr',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120',
    description: "India's premier engineering & technological research institute located in Powai, Mumbai. World-renowned for Computer Science, Electrical Engineering, and AI innovation.",
    topPrograms: ['Computer Science & AI', 'Electrical Engineering', 'Mechanical Engineering', 'Data Science', 'Aerospace Engineering'],
    featured: true
  },
  {
    id: 'u2',
    name: 'Indian Institute of Science (IISc Bangalore)',
    country: 'India',
    city: 'Bengaluru, Karnataka',
    ranking: 2,
    acceptanceRate: '2.5%',
    tuitionRange: '₹35,000 - ₹50,000 / yr',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=120',
    description: "India's highest-ranked research university specializing in advanced scientific research, quantum computing, biotechnology, and integrated PhD programs.",
    topPrograms: ['Research in Physics & Math', 'Biotechnology', 'Artificial Intelligence', 'Materials Science', 'Cybersecurity'],
    featured: true
  },
  {
    id: 'u3',
    name: 'Indian Institute of Management Ahmedabad (IIM Ahmedabad)',
    country: 'India',
    city: 'Ahmedabad, Gujarat',
    ranking: 3,
    acceptanceRate: '0.8%',
    tuitionRange: '₹12,50,000 - ₹25,000,00 / total',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=120',
    description: "Asia's leading management school producing global CEOs and entrepreneurs. Renowned for its PGP/MBA case-study pedagogy and top-tier placements.",
    topPrograms: ['PGP in Management (MBA)', 'Executive MBA', 'Agribusiness Management', 'Analytics & Finance'],
    featured: true
  },
  {
    id: 'u4',
    name: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
    country: 'India',
    city: 'New Delhi',
    ranking: 4,
    acceptanceRate: '0.1%',
    tuitionRange: '₹1,628 / yr (Govt Subsidized)',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=120',
    description: "The apex medical university and hospital in India, offering world-class medical training, surgery labs, and clinical healthcare research.",
    topPrograms: ['MBBS', 'MD / MS Surgery', 'B.Sc Nursing', 'Biomedical Genetics', 'Cardiology'],
    featured: true
  },
  {
    id: 'u5',
    name: 'University of Delhi (Delhi University - DU)',
    country: 'India',
    city: 'New Delhi',
    ranking: 11,
    acceptanceRate: '12%',
    tuitionRange: '₹15,000 - ₹45,000 / yr',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120',
    description: "India's iconic public university housing top colleges like St. Stephen's, SRCC, Hindu College, and Miranda House with vibrant campus culture.",
    topPrograms: ['B.Com (Hons)', 'Economics', 'Political Science', 'B.Sc Computer Science', 'Law (LL.B)'],
    featured: false
  },
  {
    id: 'u6',
    name: 'BITS Pilani (Birla Institute of Technology & Science)',
    country: 'India',
    city: 'Pilani, Rajasthan',
    ranking: 15,
    acceptanceRate: '8%',
    tuitionRange: '₹4,80,000 - ₹5,40,000 / yr',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=120',
    description: "Premier deemed private institute known for zero attendance policy, Practice School industrial internships, and high tech startup founders.",
    topPrograms: ['B.E. Computer Science', 'Electronics & Communication', 'Mechanical', 'M.Sc Economics'],
    featured: false
  }
];

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'B.Tech in Computer Science & Artificial Intelligence',
    university: 'IIT Bombay',
    country: 'India',
    level: 'Bachelor',
    duration: '4 Years Full-Time',
    tuitionFee: '₹2,20,000 / yr',
    deadline: 'Jun 15, 2025',
    discipline: 'Computer Science',
    mode: 'On-Campus'
  },
  {
    id: 'c2',
    title: 'PGP in Management (MBA Equivalent)',
    university: 'IIM Ahmedabad',
    country: 'India',
    level: 'Master',
    duration: '2 Years Full-Time',
    tuitionFee: '₹12,50,000 / yr',
    deadline: 'Jan 31, 2025',
    discipline: 'Business',
    mode: 'On-Campus'
  },
  {
    id: 'c3',
    title: 'Bachelor of Science (BS Research) - Interdisciplinary',
    university: 'IISc Bangalore',
    country: 'India',
    level: 'Bachelor',
    duration: '4 Years Full-Time',
    tuitionFee: '₹35,000 / yr',
    deadline: 'May 20, 2025',
    discipline: 'Data Science',
    mode: 'On-Campus'
  },
  {
    id: 'c4',
    title: 'MBBS - Bachelor of Medicine & Bachelor of Surgery',
    university: 'AIIMS New Delhi',
    country: 'India',
    level: 'Bachelor',
    duration: '5.5 Years Full-Time',
    tuitionFee: '₹1,628 / yr',
    deadline: 'Jul 10, 2025',
    discipline: 'Medicine',
    mode: 'On-Campus'
  },
  {
    id: 'c5',
    title: 'B.Com (Hons) in Financial Economics & Accounting',
    university: 'University of Delhi (SRCC)',
    country: 'India',
    level: 'Bachelor',
    duration: '3 Years Full-Time',
    tuitionFee: '₹45,000 / yr',
    deadline: 'Jun 30, 2025',
    discipline: 'Business',
    mode: 'On-Campus'
  },
  {
    id: 'c6',
    title: 'M.Tech in Robotics, Automation & AI',
    university: 'VIT Vellore',
    country: 'India',
    level: 'Master',
    duration: '2 Years Full-Time',
    tuitionFee: '₹1,80,000 / yr',
    deadline: 'May 15, 2025',
    discipline: 'Engineering',
    mode: 'Hybrid'
  }
];

export const mockScholarships: Scholarship[] = [
  {
    id: 's1',
    title: 'Study in India (SII) Govt Scholarship',
    provider: 'Ministry of Education, Govt of India',
    country: 'India',
    coverage: 'Fully Funded',
    amount: '100% Fee Waiver + ₹1,50,000/yr Stipend + Hostel',
    degreeLevels: ['Bachelor', 'Master', 'PhD'],
    deadline: 'Jul 15, 2025',
    eligibleNationalities: 'Domestic & SII Partner Countries',
    badgeColor: 'bg-orange-100 text-orange-800',
    description: 'Government of India flagship scholarship providing full financial support for meritorious students attending top Indian universities.'
  },
  {
    id: 's2',
    title: 'Prime Minister Research Fellowship (PMRF)',
    provider: 'Ministry of Education & IIT Council',
    country: 'India',
    coverage: 'Fully Funded',
    amount: '₹70,000 - ₹80,000/mo + ₹2 Lakhs Annual Grant',
    degreeLevels: ['PhD'],
    deadline: 'May 30, 2025',
    eligibleNationalities: 'Indian Citizens & NRI Scholars',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'Direct PhD fellowship for top students from IITs, IISc, NITs, and IISERs to pursue cutting-edge doctoral research.'
  },
  {
    id: 's3',
    title: 'AICTE Pragati & Saksham Scholarship',
    provider: 'All India Council for Technical Education',
    country: 'India',
    coverage: 'Stipend + Tuition',
    amount: '₹50,000 / year for Degree & Diploma',
    degreeLevels: ['Bachelor', 'Diploma'],
    deadline: 'Dec 31, 2024',
    eligibleNationalities: 'Indian Female Students',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    description: 'Scholarship scheme encouraging girl students to pursue technical engineering education across India.'
  },
  {
    id: 's4',
    title: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    country: 'India',
    coverage: 'Partial Tuition',
    amount: 'Up to ₹2,00,000 over duration of degree',
    degreeLevels: ['Bachelor'],
    deadline: 'Oct 06, 2025',
    eligibleNationalities: 'Indian Merit Students',
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Empowering promising young undergraduate students pursuing degrees in engineering, science, and commerce.'
  },
  {
    id: 's5',
    title: 'Aditya Birla Capital Higher Education Grant',
    provider: 'Aditya Birla Centre for Community Initiatives',
    country: 'India',
    coverage: 'Partial Tuition',
    amount: 'Up to ₹60,000 Fee Sponsorship',
    degreeLevels: ['Bachelor', 'Master'],
    deadline: 'Nov 30, 2024',
    eligibleNationalities: 'All Indian State Residents',
    badgeColor: 'bg-rose-100 text-rose-800',
    description: 'Financial assistance to deserving students facing financial hardships to complete higher education in India.'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    studentName: 'Aarav Sharma',
    university: 'IIT Bombay',
    course: 'B.Tech Computer Science & AI',
    country: 'India',
    scholarshipReceived: 'JoSAA Top 50 Ranker Grant',
    quote: 'Fresh Study India guided me through my JEE Advanced counseling, JoSAA choice filling, and document audit. The seat tracking portal kept my admission 100% stress-free!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 't2',
    studentName: 'David Omondi',
    university: 'University of Delhi (SRCC)',
    course: 'B.Com (Hons) Finance',
    country: 'India',
    scholarshipReceived: 'Study in India (SII) Scholar from Kenya',
    quote: 'Coming to India for my higher education was the best decision! Fresh Study India handled my SII portal approval, FRRO clearance, and Delhi hostel allocation seamlessly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 't3',
    studentName: 'Priya Nair',
    university: 'IISc Bangalore',
    course: 'BS Research in Biotechnology',
    country: 'India',
    scholarshipReceived: 'PMRF Fellow Candidate',
    quote: 'The document upload feature allowed me to get my 10th/12th marksheets and KVPY scorecard pre-verified before campus interview rounds. Highly recommended agency!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'CUET, JEE & NEET 2025: Complete Roadmap to Top Indian College Seats',
    category: 'Admission Strategy',
    date: 'Oct 02, 2024',
    readTime: '6 min read',
    author: 'Prof. Rajesh Kumar (Ex-IIT Admissions Panel)',
    summary: 'Master choice filling in JoSAA, CSAS Delhi University portal, and NEET counseling rounds to secure top seats in India.',
    content: `
Entering premier institutions like IITs, NITs, AIIMS, or DU requires strategic planning beyond entrance scores.

### Key Rules for Indian University Counseling:
1. **Accurate Document Audit**: Keep your 10th/12th marksheets, Category Certificate, and Entrance Scorecard verified.
2. **Smart Choice Filling**: Prioritize institution branch ranking over geographic distance.
3. **Scholarship Alignment**: Apply early for Study in India (SII) and state merit scholarships.
    `,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    badge: 'Popular'
  },
  {
    id: 'b2',
    title: 'Study in India (SII) Portal Step-by-Step Registration & Document Checklist',
    category: 'Government Grants',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    author: 'Fresh Study India Guidance Cell',
    summary: 'Everything you need to know about Ministry of Education 100% tuition waivers and hostel allotments across 250+ campuses.',
    content: `
The Study in India (SII) portal is the official gateway for international and domestic students to access subsidized education across premier Indian public & private universities.
    `,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
    badge: 'Essential'
  },
  {
    id: 'b3',
    title: 'Top 10 Indian Scholarships for B.Tech, Medical & MBA Students in 2025',
    category: 'Funding & Grants',
    date: 'Sep 20, 2024',
    readTime: '5 min read',
    author: 'Fresh Study India Research Wing',
    summary: 'Discover scholarships offered by AICTE, Reliance, Aditya Birla, and Central Sector Schemes.',
    content: `
Funding your Indian higher education is achievable with government and private foundation grants.
    `,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    badge: 'Scholarships'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'f1',
    category: 'General',
    question: 'How does Fresh Study India help me get admission into top Indian colleges?',
    answer: 'Fresh Study India provides end-to-end admission counseling, entrance scorecard evaluation (JEE, NEET, CUET, CAT), JoSAA/CSAS choice filling support, document verification, and scholarship matching for premier universities in India.'
  },
  {
    id: 'f2',
    category: 'Application',
    question: 'What documents are required to apply through Fresh Study India?',
    answer: 'You need your 10th and 12th Board Marksheets, Entrance Test Scorecard (JEE/NEET/CUET/CAT/GATE), Aadhaar Card or Passport, Statement of Purpose (SOP), LORs, and Category/Income Certificate if applicable.'
  },
  {
    id: 'f3',
    category: 'Scholarship',
    question: 'How do I apply for the Study in India (SII) Government Scholarship?',
    answer: 'Our counselors assist you in submitting your academic profile directly on the Ministry of Education SII portal, ensuring your college choices and transcripts qualify for 100% fee waivers.'
  },
  {
    id: 'f4',
    category: 'Visa',
    question: 'How does Fresh Study India assist international students studying in India?',
    answer: 'We assist international students with Provisional Admission Letters, Student Visa endorsement, e-FRRO registration upon arrival, and university hostel room allocation.'
  },
  {
    id: 'f5',
    category: 'Payment',
    question: 'Are admission counseling and document checks free with Fresh Study India?',
    answer: 'Yes! Initial college discovery, eligibility evaluation, and score verification are 100% free for all students.'
  }
];

export const mockApplications: Application[] = [];

export const mockDocuments: DocumentFile[] = [];

export const mockVisaStatus: VisaStatus = {
  id: 'v-default',
  studentId: 'st-user',
  trackingId: '#FSI-START',
  country: 'India',
  currentStage: 'Document Verification',
  stageNumber: 1,
  notes: 'Upload your academic certificates and passport to initiate document audit and seat allocation.',
  updatedAt: 'Active'
};

export const mockVisaStatuses: VisaStatus[] = [];

export const mockTickets: SupportTicket[] = [];

export const mockChatMessages: ChatMessage[] = [];

export const mockPayments: PaymentRecord[] = [];

export const mockCounselors = [
  {
    id: 'c-1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@freshstudyindia.com',
    phone: '+91 9201330946',
    specialization: 'Engineering & Technology (IITs, NITs, BITS)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    assignedStudentsCount: 42,
    status: 'Active' as const
  },
  {
    id: 'c-2',
    name: 'Priya Mukherjee',
    email: 'priya.m@freshstudyindia.com',
    phone: '+91 9201330946',
    specialization: 'Medical & Healthcare (AIIMS, JIPMER, CMC)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    assignedStudentsCount: 38,
    status: 'Active' as const
  },
  {
    id: 'c-3',
    name: 'Anand Varma',
    email: 'anand.v@freshstudyindia.com',
    phone: '+91 9201330946',
    specialization: 'Management & Humanities (IIMs, DU, Christ)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    assignedStudentsCount: 29,
    status: 'Active' as const
  }
];

export const mockAppointments = [];

export const mockAdmissionLetters = [];

export const mockAuditLogs = [
  {
    id: 'log-1',
    user: 'Dr. Rajesh Sharma',
    role: 'Counselor',
    action: 'Approved WASSCE & Transcripts for Student Aarav Sharma',
    timestamp: '2026-08-04 14:22',
    details: 'Verified against CBSE / WAEC authentic database'
  },
  {
    id: 'log-2',
    user: 'Admin Desk',
    role: 'Super Admin',
    action: 'Updated Scholarship Criteria for Study In India Grant',
    timestamp: '2026-08-04 11:05',
    details: 'Increased maximum tuition fee waiver to 100%'
  },
  {
    id: 'log-3',
    user: 'System Bot',
    role: 'System',
    action: 'Generated Provisional Admission Letter #ADM-101',
    timestamp: '2026-08-03 09:12',
    details: 'Dispatched to student portal and email inbox'
  }
];

export const mockGalleryItems = [
  {
    id: 'gal-1',
    title: 'IIT Bombay Campus & Lake View',
    universityName: 'IIT Bombay',
    category: 'Campus' as const,
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    caption: 'Serene view of Powai Lake near the Main Building at IIT Bombay.'
  },
  {
    id: 'gal-2',
    title: 'IISc Bangalore Supercomputing & Quantum Lab',
    universityName: 'IISc Bangalore',
    category: 'Lab & Tech Facilities' as const,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    caption: 'State-of-the-art supercomputing facilities for advanced AI research.'
  },
  {
    id: 'gal-3',
    title: 'Annual Convocation Ceremony at DU',
    universityName: 'University of Delhi',
    category: 'Graduation' as const,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    caption: 'Graduating batch celebrating at Delhi University Viceregal Lodge.'
  },
  {
    id: 'gal-4',
    title: 'Mood Indigo Cultural Fest - IIT Bombay',
    universityName: 'IIT Bombay',
    category: 'Cultural Festival' as const,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    caption: "Asia's largest college cultural festival hosted at IIT Bombay campus."
  }
];

export const mockSystemSettings = {
  siteName: 'Fresh Study India',
  maintenanceMode: false,
  allowStudentRegistration: true,
  requireEmailVerification: true,
  supportPhone: '+91 9201330946',
  supportEmail: 'freshstudyindia@gmail.com',
  whatsappNumber: '+919201330946'
};
