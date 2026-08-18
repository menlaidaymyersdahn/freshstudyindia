export type StudyField = 
  | 'COMPUTER SCIENCE'
  | 'BUSINESS'
  | 'ENGINEERING'
  | 'HEALTHCARE'
  | 'DATA & TECHNOLOGY'
  | 'OTHER';

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
