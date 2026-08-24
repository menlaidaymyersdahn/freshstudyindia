export type NavTab = 
  | 'home'
  | 'study-in-india'
  | 'services'
  | 'programs'
  | 'why-us'
  | 'process'
  | 'contact';

export type StudyField = 
  | 'COMPUTER SCIENCE'
  | 'BUSINESS'
  | 'ENGINEERING'
  | 'HEALTHCARE'
  | 'DATA & TECHNOLOGY'
  | 'OTHER';

export type ApplicationStatus = 
  | 'NEW'
  | 'UNDER_REVIEW'
  | 'DOCUMENTS_VERIFIED'
  | 'OFFER_ISSUED'
  | 'VISA_PROCESSING'
  | 'ADMITTED'
  | 'REJECTED';

export interface ApplicationDocument {
  id: string;
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  category: 'Passport' | 'Academic Certificate' | 'Academic Transcript' | 'Passport-size Photo' | 'Other Supporting Documents';
  dataUrl?: string;
  verified?: boolean;
  uploadedAt?: string;
}

export interface CounselorNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface StudentApplicationProfile {
  id: string;
  trackingId?: string;
  fullName: string;
  phone: string;
  email?: string;
  country: string;
  studyField: string;
  qualification: string;
  status: ApplicationStatus;
  documents: ApplicationDocument[];
  notes?: CounselorNote[];
  submittedAt: string;
  updatedAt?: string;
}

export interface StudentEnquiry {
  fullName: string;
  country: string;
  phone: string;
  studyField: string;
  message: string;
  highestQualification?: string;
  targetIntake?: string;
  createdAt?: string;
}

export interface StudyOptionDetail {
  id: StudyField;
  title: string;
  shortDesc: string;
  popularSpecializations: string[];
  duration: string;
  degreeTypes: string[];
}

export type PhotoCategory =
  | 'All'
  | 'Campus Life'
  | 'Graduation & Success'
  | 'Labs & Classrooms'
  | 'Arrivals & Orientation'
  | 'Hostel & Dining'
  | 'Admissions Desks';

export interface CommunityPhoto {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  uploaderName: string;
  uploaderRole: 'Student' | 'Alumni' | 'Admissions Team' | 'Parent' | 'Visitor';
  country: string;
  category: string;
  university?: string;
  city?: string;
  likesCount: number;
  likedBy?: string[];
  createdAt: string;
  isApproved?: boolean;
  featured?: boolean;
}

