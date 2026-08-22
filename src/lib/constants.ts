import { StudyOptionDetail } from '../types';

export const BRAND = {
  name: 'Fresh Study India',
  tagline: 'Your Journey. Your Degree. Your Future.',
  mission: 'We help you get from your home country to your university in India.',
  contacts: {
    india: {
      country: 'India',
      flag: '🇮🇳',
      phoneDisplay: '+91 9201330946',
      phoneRaw: '+919201330946',
      whatsappNumber: '919201330946',
      label: 'Headquarters & Student Support',
      address: 'University Partner Liaison & Student Arrival Desk, India'
    },
    liberia: {
      country: 'Liberia',
      flag: '🇱🇷',
      phoneDisplay: '+231 889425645',
      phoneRaw: '+231889425645',
      whatsappNumber: '231889425645',
      label: 'West Africa Admissions Desk',
      address: 'Monrovia Admissions Consultation Desk, Liberia'
    }
  }
};

export const DEFAULT_WHATSAPP_MESSAGE = 'Hello Fresh Study India, I am interested in studying in India. I would like to speak with an advisor.';

export const getWhatsAppLink = (
  country: 'india' | 'liberia' = 'india',
  customMessage: string = DEFAULT_WHATSAPP_MESSAGE
) => {
  const number = country === 'liberia' 
    ? BRAND.contacts.liberia.whatsappNumber 
    : BRAND.contacts.india.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(customMessage)}`;
};

export const STUDY_OPTIONS: StudyOptionDetail[] = [
  {
    id: 'COMPUTER SCIENCE',
    title: 'Computer Science',
    shortDesc: 'World-class software, cybersecurity, and cloud computing curricula recognized globally.',
    popularSpecializations: ['Artificial Intelligence & ML', 'Software Engineering', 'Cybersecurity', 'Cloud Computing'],
    duration: '3 - 4 Years (UG) / 2 Years (PG)',
    degreeTypes: ['BCA', 'B.Tech / B.Sc Computer Science', 'MCA', 'M.Tech']
  },
  {
    id: 'BUSINESS',
    title: 'Business & Management',
    shortDesc: 'Practical management degrees with industry internships, international finance, and entrepreneurship.',
    popularSpecializations: ['International Business', 'Finance & Banking', 'Digital Marketing', 'Supply Chain Management'],
    duration: '3 Years (BBA) / 2 Years (MBA)',
    degreeTypes: ['BBA', 'B.Com', 'MBA', 'PGDM']
  },
  {
    id: 'ENGINEERING',
    title: 'Engineering & Technology',
    shortDesc: 'Hands-on laboratories, technical excellence, and modern engineering standards across major domains.',
    popularSpecializations: ['Civil & Structural Engineering', 'Mechanical & Robotics', 'Electrical & Electronics', 'Biomedical'],
    duration: '4 Years (B.Tech) / 2 Years (M.Tech)',
    degreeTypes: ['B.Tech / B.E', 'M.Tech', 'Diploma to Degree']
  },
  {
    id: 'HEALTHCARE',
    title: 'Healthcare & Allied Sciences',
    shortDesc: 'Affordable, accredited clinical, pharmacy, and medical laboratory sciences in top teaching hospitals.',
    popularSpecializations: ['Pharmacy (B.Pharm)', 'Nursing & Patient Care', 'Medical Laboratory Technology', 'Physiotherapy (BPT)'],
    duration: '3 - 4.5 Years',
    degreeTypes: ['B.Pharm', 'B.Sc Nursing', 'BPT', 'B.Sc Allied Health']
  },
  {
    id: 'DATA & TECHNOLOGY',
    title: 'Data Science & Technology',
    shortDesc: 'Fast-growing high-demand disciplines combining statistical modeling, Big Data, and business analytics.',
    popularSpecializations: ['Data Science & Analytics', 'Big Data Engineering', 'Information Technology', 'IoT & Robotics'],
    duration: '3 - 4 Years',
    degreeTypes: ['B.Sc Data Science', 'B.Tech IT', 'M.Sc Data Analytics']
  },
  {
    id: 'OTHER',
    title: 'Other Fields & Humanities',
    shortDesc: 'Wide array of professional arts, media, law, fashion, architecture, hospitality, and social sciences.',
    popularSpecializations: ['Law (BA LLB / BBA LLB)', 'Journalism & Mass Comm', 'Hospitality & Tourism', 'Fashion & Interior Design'],
    duration: '3 - 5 Years',
    degreeTypes: ['BA / B.Sc', 'LLB / LLM', 'B.Des', 'BHM']
  }
];
