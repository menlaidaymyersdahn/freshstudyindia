export type StudyField = 
  | 'COMPUTER SCIENCE'
  | 'BUSINESS'
  | 'ENGINEERING'
  | 'HEALTHCARE'
  | 'DATA & TECHNOLOGY'
  | 'OTHER';

export interface ApplicationDocument {
  id: string;
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  category: 'Passport' | 'Academic Certificate' | 'Academic Transcript' | 'Passport-size Photo' | 'Other Supporting Documents';
  dataUrl?: string;
}

export interface StudentApplicationProfile {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  country: string;
  studyField: string;
  qualification: string;
  documents: ApplicationDocument[];
  submittedAt?: string;
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
