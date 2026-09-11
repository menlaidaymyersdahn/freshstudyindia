import { BlogPost } from '../types';

/**
 * Curated student life blog posts.
 * All simulated and fake placeholder articles have been completely removed.
 * Genuine articles are stored in and retrieved dynamically from Firebase Firestore ('blog_posts' collection).
 */
export const STUDENT_LIFE_BLOG_POSTS: BlogPost[] = [];

export interface StudentLifeQuickFact {
  stat: string;
  label: string;
  desc: string;
}

export const STUDENT_LIFE_QUICK_FACTS: StudentLifeQuickFact[] = [
  {
    stat: '50,000+',
    label: 'International Students',
    desc: 'Scholars currently studying across Indian state & private universities'
  },
  {
    stat: '150+',
    label: 'Nationalities',
    desc: 'Diverse diaspora from Africa, South Asia, ASEAN & Middle East'
  },
  {
    stat: '100%',
    label: 'English Medium',
    desc: 'University classroom instruction, textbooks, and laboratory courses'
  },
  {
    stat: '24/7',
    label: 'Campus Security',
    desc: 'Guarded residential student hostels with biometric access'
  }
];

export interface StudentLifeFAQ {
  q: string;
  a: string;
}

export const STUDENT_LIFE_FAQS: StudentLifeFAQ[] = [
  {
    q: 'How do international students celebrate their national holidays on campus?',
    a: 'Most accredited Indian universities have dedicated International Student Divisions (ISD) that host annual Cultural Fests, Independence Day flags showcases, and African Unity days where students wear traditional clothing, prepare diaspora food, and perform cultural music.'
  },
  {
    q: 'What dining options exist for students with specific dietary needs?',
    a: 'Hostel mess committees offer both vegetarian and non-vegetarian menus (chicken, eggs, fish, mutton). In addition, campus gates feature grocery delivery services (Blinkit, Zepto, Swiggy) and kitchen facilities for self-catering home dishes.'
  },
  {
    q: 'How accessible is city transit for weekend trips and student exploration?',
    a: 'Major educational hubs (Delhi NCR, Bengaluru, Pune, Lucknow) have modern metro networks, affordable app-based rides (Uber, Ola, Rapido), and express trains connecting heritage landmarks and shopping hubs safely.'
  },
  {
    q: 'How can current international students submit their stories to this blog?',
    a: 'Students can use the "Share Your Story" button to submit their academic journey, internship successes, or festival photos. After editorial review by the Myers advisory board, approved stories are published to inspire incoming scholars.'
  }
];
