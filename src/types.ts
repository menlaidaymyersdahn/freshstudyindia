export type ApplicationStatus = 
  | 'Application Submitted'
  | 'Documents Review'
  | 'University Review'
  | 'Admission Decision'
  | 'Visa Preparation'
  | 'Ready for India';

export interface StudentDocument {
  id: string;
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  category: 'Passport' | 'Academic Certificates' | 'Academic Transcripts' | 'Other Supporting Documents';
  dataUrl?: string;
  storedFile?: string;
  verified: boolean;
  uploadedAt: string;
}

export interface ApplicationSubmission {
  id?: string;
  trackingId?: string;
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  dateOfBirth: string;
  academicBackground: string;
  currentQualification: string;
  preferredStudyLevel: string;
  preferredCourse: string;
  preferredUniversity: string;
  message?: string;
  documents?: StudentDocument[];
  status?: ApplicationStatus;
  notes?: { id: string; author: string; text: string; createdAt: string }[];
  submittedAt?: string;
  updatedAt?: string;
}

export interface EnquirySubmission {
  id?: string;
  fullName: string;
  email: string;
  whatsapp?: string;
  country?: string;
  studyInterest?: string;
  preferredCourse?: string;
  preferredUniversity?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface JourneyStep {
  step: string;
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface EmailContact {
  department: string;
  email: string;
  purpose: string;
}
