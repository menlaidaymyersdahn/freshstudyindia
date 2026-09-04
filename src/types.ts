export type ApplicationStatus = 
  | 'Application Submitted'
  | 'Documents Review'
  | 'University Review'
  | 'Admission Decision';

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

export interface CommunicationLog {
  id: string;
  type: 'whatsapp' | 'email' | 'call' | 'system';
  recipient: string;
  subject?: string;
  message: string;
  sentBy: string;
  timestamp: string;
}

export interface AdmissionDetails {
  approvedUniversity: string;
  approvedProgram: string;
  tuitionFeeUsd: string;
  scholarshipPercentage?: string;
  intakeSemester: string;
  decisionDate: string;
  counselorNotes?: string;
  offerLetterIssued: boolean;
  offerLetterId?: string;
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
  documentsCount?: number;
  status?: ApplicationStatus;
  notes?: { id: string; author: string; text: string; createdAt: string }[];
  admissionDetails?: AdmissionDetails;
  communicationLogs?: CommunicationLog[];
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
  assignedTo?: string;
  notes?: { id: string; text: string; createdAt: string }[];
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

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Courses & Universities' | 'Fees & Living' | 'Visa & Travel' | 'Student Support' | 'Accommodation & Student Life' | string;
}

export type NavTab = 'home' | 'study-in-india' | 'services' | 'universities' | 'faq' | 'about' | 'contact';

