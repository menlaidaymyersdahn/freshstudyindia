export type ActiveTab = 
  | 'home' 
  | 'universities' 
  | 'courses' 
  | 'scholarships' 
  | 'ai-advisor'
  | 'testimonials' 
  | 'blog' 
  | 'gallery'
  | 'faq' 
  | 'contact' 
  | 'privacy'
  | 'gmail'
  | 'student-login'
  | 'counselor-login'
  | 'admin-login'
  | 'student-dashboard'
  | 'counselor-dashboard' 
  | 'admin-dashboard';

export type UserRole = 'guest' | 'student' | 'counselor' | 'admin' | 'superadmin' | 'super-admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  county?: string;
  targetCountry?: string;
  degreeLevel?: string;
  desiredMajor?: string;
  gpa?: string;
  englishTestScore?: string;
  assignedCounselorId?: string;
  createdAt?: string;
}

export interface Counselor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  avatar: string;
  assignedStudentsCount: number;
  status: 'Active' | 'On Leave';
}

export interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  counselorId: string;
  counselorName: string;
  date: string;
  time: string;
  topic: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  meetingLink?: string;
}

export interface AdmissionLetter {
  id: string;
  studentId: string;
  studentName: string;
  universityName: string;
  courseName: string;
  issueDate: string;
  expiryDate: string;
  status: 'Verified' | 'Pending Download';
  fileUrl: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  universityName: string;
  category: 'Campus' | 'Graduation' | 'Cultural Festival' | 'Lab & Tech Facilities';
  imageUrl: string;
  caption: string;
}

export interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  allowStudentRegistration: boolean;
  requireEmailVerification: boolean;
  supportPhone: string;
  supportEmail: string;
  whatsappNumber: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  universityName: string;
  universityLogo?: string;
  courseName: string;
  degree: string;
  country: string;
  trackingId: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Conditional Offer' | 'Unconditional Offer' | 'Visa Processing' | 'Approved' | 'Rejected';
  progressPercentage: number;
  submittedDate: string;
  intake: string;
  notes?: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  acceptanceRate: string;
  tuitionRange: string;
  image: string;
  logo: string;
  description: string;
  topPrograms: string[];
  featured?: boolean;
}

export interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  level: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  duration: string;
  tuitionFee: string;
  deadline: string;
  discipline: string;
  mode: 'On-Campus' | 'Online' | 'Hybrid';
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  country: string;
  coverage: 'Fully Funded' | 'Partial Tuition' | 'Stipend + Tuition';
  amount: string;
  degreeLevels: string[];
  deadline: string;
  eligibleNationalities: string;
  badgeColor: string;
  description: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  university: string;
  course: string;
  country: string;
  scholarshipReceived?: string;
  quote: string;
  avatar: string;
  videoUrl?: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string;
  image: string;
  badge: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Visa' | 'Scholarship' | 'Application' | 'Payment';
}

export interface DocumentFile {
  id: string;
  name: string;
  category: 
    | 'International Passport'
    | 'High School Diploma'
    | 'WASSCE Certificate'
    | 'Transcript (Grades 10 to 12)'
    | 'Letter of Recommendation (LOR)'
    | 'Statement of Purpose (SOP)'
    | 'Birth Certificate / National ID'
    | 'Entrance Test Scorecard (JEE/NEET/CUET/CAT)'
    | 'Aadhaar / Identity Proof'
    | '10th & 12th Marksheets'
    | 'Transcript / Degree'
    | 'Income Certificate'
    | 'Other Certificate';
  uploadDate: string;
  status: 'Verified' | 'Pending Review' | 'Action Needed';
  size: string;
  fileUrl?: string;
}

export interface VisaStatus {
  id: string;
  studentId: string;
  trackingId: string;
  country: string;
  currentStage: 'Document Verification' | 'Entrance Scorecard Approved' | 'Counseling & Seat Allocated' | 'Provisional Admission Letter' | 'FRRO & Hostel Allotment';
  stageNumber: number; // 1 to 5
  interviewDate?: string;
  embassyCity?: string;
  notes: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  messages: { sender: string; text: string; timestamp: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'counselor';
  text: string;
  timestamp: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  description: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  receiptUrl?: string;
}

export interface GmailEmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  historyId?: string;
  internalDate: string;
  labelIds: string[];
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  date: string;
  bodyText?: string;
  bodyHtml?: string;
  isUnread: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
}

export interface GmailLabelItem {
  id: string;
  name: string;
  type: string;
  unreadCount?: number;
  totalCount?: number;
}

export interface GmailDraftPayload {
  to: string;
  subject: string;
  body: string;
}

