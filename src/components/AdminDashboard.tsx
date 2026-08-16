import React, { useState } from 'react';
import { 
  Application, 
  University, 
  Scholarship, 
  DocumentFile, 
  SupportTicket, 
  UserProfile, 
  UserRole,
  ActiveTab,
  Counselor, 
  Course, 
  BlogPost, 
  Testimonial, 
  VisaStatus, 
  PaymentRecord, 
  AuditLog, 
  SystemSettings 
} from '../types';
import { 
  Users, 
  GraduationCap, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  Building2, 
  Check, 
  X, 
  FileCheck, 
  Search, 
  UserCheck, 
  DollarSign, 
  Activity, 
  Settings, 
  Lock, 
  Mail, 
  Filter, 
  BookOpen, 
  Award, 
  FileText, 
  MessageSquare, 
  Plane, 
  BarChart3, 
  Bell, 
  Calendar as CalendarIcon, 
  ShieldAlert, 
  UserCog, 
  Edit3, 
  Trash2, 
  Eye, 
  Send, 
  CheckSquare, 
  Clock, 
  Download,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { 
  mockCounselors, 
  mockAuditLogs, 
  mockSystemSettings, 
  mockPayments, 
  mockCourses, 
  mockScholarships, 
  mockBlogPosts, 
  mockTestimonials, 
  mockVisaStatuses 
} from '../data/mockData';
import { 
  saveUniversityToFirestore, 
  deleteUniversityFromFirestore, 
  saveCourseToFirestore, 
  deleteCourseFromFirestore, 
  saveScholarshipToFirestore, 
  deleteScholarshipFromFirestore, 
  saveBlogPostToFirestore, 
  deleteBlogPostFromFirestore, 
  saveTestimonialToFirestore, 
  deleteTestimonialFromFirestore, 
  saveCounselorToFirestore, 
  savePaymentToFirestore, 
  saveAuditLogToFirestore, 
  saveVisaStatusToFirestore, 
  saveBroadcastNotificationToFirestore, 
  saveSystemSettingsToFirestore, 
  updateUserProfileInFirestore, 
  saveDocumentToFirestore,
  registerStaffWithFirebase
} from '../lib/firebase';

interface AdminDashboardProps {
  applications?: Application[];
  documents?: DocumentFile[];
  universities?: University[];
  tickets?: SupportTicket[];
  userRole?: UserRole;
  userProfile?: UserProfile | null;
  onUpdateAppStatus: (appId: string, newStatus: Application['status'], newNotes?: string) => void;
  onAddUniversity: (uni: University) => void;
  setActiveTab?: (tab: ActiveTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  applications = [],
  documents = [],
  universities = [],
  tickets = [],
  userRole = 'admin',
  userProfile = null,
  onUpdateAppStatus,
  onAddUniversity,
  setActiveTab: setNavActiveTab
}) => {
  const isSuperAdmin = userRole === 'superadmin' || userRole === 'super-admin' || userProfile?.role === 'superadmin' || userProfile?.role === 'super-admin';
  // 18 Requested Modules via Navigation
  type AdminTab = 
    | 'overview' 
    | 'students' 
    | 'counselors' 
    | 'universities' 
    | 'courses' 
    | 'applications' 
    | 'visa' 
    | 'scholarships' 
    | 'blogs' 
    | 'testimonials' 
    | 'documents' 
    | 'payments' 
    | 'analytics' 
    | 'notifications' 
    | 'calendar' 
    | 'audit' 
    | 'settings' 
    | 'roles';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Dynamic Data States
  const [localUniversities, setLocalUniversities] = useState<University[]>(universities);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogPosts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [counselors, setCounselors] = useState<Counselor[]>(mockCounselors);
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  const [visaList, setVisaList] = useState<VisaStatus[]>(mockVisaStatuses);
  const [auditTrail, setAuditTrail] = useState<AuditLog[]>(mockAuditLogs);
  const [sysSettings, setSysSettings] = useState<SystemSettings>(mockSystemSettings);
  const [docList, setDocList] = useState<DocumentFile[]>(documents);

  // Mock Students Directory State
  const [studentsList, setStudentsList] = useState<UserProfile[]>([
    {
      id: 's-101',
      name: 'Emanuel Osei',
      email: 'emanuel.osei@freshstudyindia.com',
      role: 'student',
      county: 'Greater Accra, Ghana',
      targetCountry: 'India',
      degreeLevel: 'Bachelor',
      desiredMajor: 'Computer Science & Software Engineering',
      gpa: '3.8 / 4.0 (WASSCE Grade A1)',
      phone: '+233 24 123 4567',
      assignedCounselorId: 'c-1',
      createdAt: '2026-01-15'
    },
    {
      id: 's-102',
      name: 'Amina Mansaray',
      email: 'amina.m@freshstudyindia.com',
      role: 'student',
      county: 'Freetown, Sierra Leone',
      targetCountry: 'India',
      degreeLevel: 'Master',
      desiredMajor: 'Public Health & Medicine',
      gpa: '3.6 / 4.0',
      phone: '+232 76 987 654',
      assignedCounselorId: 'c-2',
      createdAt: '2026-02-01'
    },
    {
      id: 's-103',
      name: 'Kofi Mensah',
      email: 'kofi.mensah@freshstudyindia.com',
      role: 'student',
      county: 'Kumasi, Ghana',
      targetCountry: 'India',
      degreeLevel: 'Bachelor',
      desiredMajor: 'Mechanical Engineering',
      gpa: '3.5 / 4.0',
      phone: '+233 20 555 1234',
      assignedCounselorId: 'c-1',
      createdAt: '2026-02-10'
    },
    {
      id: 's-104',
      name: 'Fatoumata Diallo',
      email: 'f.diallo@freshstudyindia.com',
      role: 'student',
      county: 'Conakry, Guinea',
      targetCountry: 'India',
      degreeLevel: 'Bachelor',
      desiredMajor: 'Business Administration (BBA)',
      gpa: '3.9 / 4.0',
      phone: '+224 620 112233',
      assignedCounselorId: 'c-3',
      createdAt: '2026-03-01'
    }
  ]);

  // Modals Local State
  const [showAddUni, setShowAddUni] = useState(false);
  const [newUni, setNewUni] = useState({ name: '', city: '', ranking: 5, tuition: '₹1,50,000 / yr', acceptance: '15%' });

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', university: 'Vellore Institute of Technology (VIT)', level: 'Bachelor' as const, duration: '4 Years', tuitionFee: '₹1,80,000 / yr', discipline: 'Engineering' });

  const [showAddScholarship, setShowAddScholarship] = useState(false);
  const [newScholarship, setNewScholarship] = useState({ title: '', provider: 'Study in India Scheme', coverage: 'Fully Funded' as const, amount: '₹2,50,000 / yr', deadline: '2026-11-30' });

  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', category: 'Visa & Immigration', author: 'Dr. Rahul Sharma', summary: '', content: '' });

  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ studentName: '', university: 'IIT Madras', course: 'B.Tech CSE', quote: '', rating: 5 });

  const [showAddCounselor, setShowAddCounselor] = useState(false);
  const [newCounselor, setNewCounselor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    staffRole: 'counselor' as 'counselor' | 'admin' | 'superadmin',
    specialization: 'Senior Student Advisor'
  });

  const [adminsList, setAdminsList] = useState<UserProfile[]>([
    {
      id: 'adm-001',
      name: 'Fresh Study Super Admin',
      email: 'freshstudyindia@gmail.com',
      role: 'superadmin',
      targetCountry: 'India',
      createdAt: '2025-01-01'
    },
    {
      id: 'adm-002',
      name: 'Rajesh Kumar (Regional Admin)',
      email: 'rajesh.admin@freshstudyindia.com',
      role: 'admin',
      targetCountry: 'India',
      createdAt: '2025-06-12'
    },
    {
      id: 'adm-003',
      name: 'Priya Sharma (Admissions Admin)',
      email: 'priya.admin@freshstudyindia.com',
      role: 'admin',
      targetCountry: 'India',
      createdAt: '2026-01-10'
    }
  ]);

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastNotif, setBroadcastNotif] = useState({ title: '', message: '', targetGroup: 'all' as const });

  // Helper notice banner
  const triggerSyncNotice = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  // 1. ADD UNIVERSITY
  const handleCreateUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUni.name.trim()) return;

    const uniObj: University = {
      id: `uni-${Date.now()}`,
      name: newUni.name,
      country: 'India',
      city: newUni.city || 'Mumbai / Delhi Campus',
      ranking: Number(newUni.ranking) || 1,
      acceptanceRate: newUni.acceptance,
      tuitionRange: newUni.tuition,
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120',
      description: 'Partnered Higher Education Institution in India.',
      topPrograms: ['Engineering & Computer Science', 'Business Administration', 'Medical Studies'],
      featured: true
    };

    onAddUniversity(uniObj);
    setLocalUniversities([uniObj, ...localUniversities]);
    await saveUniversityToFirestore(uniObj);
    setShowAddUni(false);
    setNewUni({ name: '', city: '', ranking: 5, tuition: '₹1,50,000 / yr', acceptance: '15%' });
    triggerSyncNotice('New University added & synced to Firebase in real time!');
  };

  // 2. ADD COURSE
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    const courseObj: Course = {
      id: `c-${Date.now()}`,
      title: newCourse.title,
      university: newCourse.university,
      country: 'India',
      level: newCourse.level,
      duration: newCourse.duration,
      tuitionFee: newCourse.tuitionFee,
      deadline: '2026-10-15',
      discipline: newCourse.discipline,
      mode: 'On-Campus'
    };

    setCourses([courseObj, ...courses]);
    await saveCourseToFirestore(courseObj);
    setShowAddCourse(false);
    setNewCourse({ title: '', university: 'Vellore Institute of Technology (VIT)', level: 'Bachelor', duration: '4 Years', tuitionFee: '₹1,80,000 / yr', discipline: 'Engineering' });
    triggerSyncNotice('Course program listed & synced to Firestore!');
  };

  // 3. ADD SCHOLARSHIP
  const handleCreateScholarship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScholarship.title.trim()) return;

    const schObj: Scholarship = {
      id: `sch-${Date.now()}`,
      title: newScholarship.title,
      provider: newScholarship.provider,
      country: 'India',
      coverage: newScholarship.coverage,
      amount: newScholarship.amount,
      degreeLevels: ['Bachelor', 'Master'],
      deadline: newScholarship.deadline,
      eligibleNationalities: 'African International Students',
      badgeColor: 'bg-emerald-600',
      description: 'Study in India Merit & Need-based Fellowship Grant.'
    };

    setScholarships([schObj, ...scholarships]);
    await saveScholarshipToFirestore(schObj);
    setShowAddScholarship(false);
    setNewScholarship({ title: '', provider: 'Study in India Scheme', coverage: 'Fully Funded', amount: '₹2,50,000 / yr', deadline: '2026-11-30' });
    triggerSyncNotice('Scholarship opportunity updated in real time on Firebase!');
  };

  // 4. ADD BLOG POST
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title.trim()) return;

    const blogObj: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlog.title,
      category: newBlog.category,
      date: new Date().toISOString().split('T')[0],
      readTime: '4 min read',
      author: newBlog.author,
      summary: newBlog.summary || 'Essential advice for international students pursuing higher education in India.',
      content: newBlog.content || 'Full editorial article details regarding university admissions, visas, and living in India.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
      badge: 'Admin Published'
    };

    setBlogs([blogObj, ...blogs]);
    await saveBlogPostToFirestore(blogObj);
    setShowAddBlog(false);
    setNewBlog({ title: '', category: 'Visa & Immigration', author: 'Dr. Rahul Sharma', summary: '', content: '' });
    triggerSyncNotice('Blog article published to platform!');
  };

  // 5. ADD TESTIMONIAL
  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.studentName.trim()) return;

    const testObj: Testimonial = {
      id: `test-${Date.now()}`,
      studentName: newTestimonial.studentName,
      university: newTestimonial.university,
      course: newTestimonial.course,
      country: 'India',
      scholarshipReceived: 'Study in India 100% Waiver',
      quote: newTestimonial.quote || 'Fresh Study India guided my visa, seat allocation, and hostel onboarding seamlessly!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: newTestimonial.rating
    };

    setTestimonials([testObj, ...testimonials]);
    await saveTestimonialToFirestore(testObj);
    setShowAddTestimonial(false);
    setNewTestimonial({ studentName: '', university: 'IIT Madras', course: 'B.Tech CSE', quote: '', rating: 5 });
    triggerSyncNotice('Student story added to testimonials!');
  };

  // 6. ADD COUNSELOR / STAFF ACCOUNT (Only Super Admin can create Admins)
  const handleCreateCounselor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCounselor.name.trim() || !newCounselor.email.trim()) return;

    // Security Check: Only Super Admin can create Admin or Super Admin accounts!
    if ((newCounselor.staffRole === 'admin' || newCounselor.staffRole === 'superadmin') && !isSuperAdmin) {
      triggerSyncNotice('Permission Denied: Only Super Admin can create or delete Admin accounts!');
      return;
    }

    try {
      if (newCounselor.password.length >= 6) {
        await registerStaffWithFirebase(
          newCounselor.email,
          newCounselor.password,
          newCounselor.name,
          newCounselor.staffRole
        );
      }

      if (newCounselor.staffRole === 'admin' || newCounselor.staffRole === 'superadmin') {
        const adminObj: UserProfile = {
          id: `adm-${Date.now()}`,
          name: newCounselor.name,
          email: newCounselor.email,
          role: newCounselor.staffRole as UserRole,
          targetCountry: 'India',
          createdAt: new Date().toISOString().split('T')[0]
        };
        setAdminsList(prev => [...prev, adminObj]);
        triggerSyncNotice(`Admin account created for ${newCounselor.name} (${newCounselor.staffRole.toUpperCase()})!`);
      } else {
        const counselorObj: Counselor = {
          id: `c-${Date.now()}`,
          name: newCounselor.name,
          email: newCounselor.email,
          phone: newCounselor.phone || '+91 98765 43210',
          specialization: newCounselor.specialization,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          assignedStudentsCount: 0,
          status: 'Active'
        };

        setCounselors(prev => [...prev, counselorObj]);
        await saveCounselorToFirestore(counselorObj);
        triggerSyncNotice(`Counselor account created for ${newCounselor.name} & registered in Firebase!`);
      }

      setShowAddCounselor(false);
      setNewCounselor({
        name: '',
        email: '',
        phone: '',
        password: '',
        staffRole: 'counselor',
        specialization: 'Senior Student Advisor'
      });
    } catch (err: any) {
      console.error('Error creating staff account:', err);
      triggerSyncNotice(`Notice: Staff profile saved. (${err.message || 'Firebase Auth response'})`);
    }
  };

  // 6b. DELETE ADMIN ACCOUNT (Super Admin Only)
  const handleDeleteAdmin = (adminId: string, adminEmail: string) => {
    if (!isSuperAdmin) {
      triggerSyncNotice('Permission Denied: Only Super Admin can delete Admin accounts!');
      return;
    }
    setAdminsList(prev => prev.filter(a => a.id !== adminId));
    triggerSyncNotice(`Admin account (${adminEmail}) successfully deleted by Super Admin.`);
  };

  // 7. BROADCAST NOTIFICATION
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastNotif.title.trim()) return;

    await saveBroadcastNotificationToFirestore({
      id: `bnotif-${Date.now()}`,
      title: broadcastNotif.title,
      message: broadcastNotif.message,
      targetGroup: broadcastNotif.targetGroup,
      date: new Date().toLocaleDateString()
    });

    setShowBroadcastModal(false);
    setBroadcastNotif({ title: '', message: '', targetGroup: 'all' });
    triggerSyncNotice('Broadcast notification dispatched to all target users!');
  };

  // 8. UPDATE VISA STAGE
  const handleUpdateVisaStage = async (visaId: string, newStageNum: number, newStageName: VisaStatus['currentStage']) => {
    const updated = visaList.map(v => v.id === visaId ? { ...v, stageNumber: newStageNum, currentStage: newStageName, updatedAt: new Date().toISOString() } : v);
    setVisaList(updated);
    const target = updated.find(v => v.id === visaId);
    if (target) {
      await saveVisaStatusToFirestore(target);
      triggerSyncNotice(`Visa Tracking updated for ${target.trackingId}`);
    }
  };

  // 9. UPDATE DOCUMENT VERIFICATION STATUS
  const handleUpdateDocStatus = async (docId: string, status: 'Verified' | 'Pending Review' | 'Action Needed') => {
    const updated = docList.map(d => d.id === docId ? { ...d, status } : d);
    setDocList(updated);
    const target = updated.find(d => d.id === docId);
    if (target) {
      await saveDocumentToFirestore(target, 'student-user');
      triggerSyncNotice(`Document status changed to ${status}`);
    }
  };

  // 10. SAVE SYSTEM SETTINGS
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSystemSettingsToFirestore(sysSettings);
    triggerSyncNotice('Global System Settings updated in Firestore!');
  };

  // 11. ASSIGN COUNSELOR TO STUDENT
  const handleAssignCounselor = async (studentId: string, counselorId: string) => {
    const updated = studentsList.map(s => s.id === studentId ? { ...s, assignedCounselorId: counselorId } : s);
    setStudentsList(updated);
    await updateUserProfileInFirestore(studentId, { assignedCounselorId: counselorId });
    triggerSyncNotice('Counselor assigned to student successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Admin Title Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          {isSuperAdmin ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Super Admin Console • Full Master Privileges
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Administrator Console • Standard Privileges
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Fresh Study <span className="text-emerald-400">India</span> Central Command
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSuperAdmin
              ? 'Super Admin Privileges Active: Full user management, create/delete Admin accounts, manage universities, counselors & settings.'
              : 'Administrator Privileges Active: Manage students, counselors, universities & applications. (Admin creation/deletion restricted to Super Admin).'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {setNavActiveTab && (
            <button
              onClick={() => setNavActiveTab('gmail')}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white" /> Gmail Desk
            </button>
          )}

          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <div className="font-bold text-slate-200">Firebase Firestore Live</div>
              <div className="text-[10px] text-slate-400">Project: ai-studio-freshstudyindia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Action Notification Banner */}
      {statusNotification && (
        <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-200" />
            <span>{statusNotification}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md font-mono">Firestore Updated</span>
        </div>
      )}

      {/* 18-Module Navigation Tabs */}
      <div className="bg-white p-2 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'students', label: `Students (${studentsList.length})`, icon: Users },
            { id: 'counselors', label: `Counselors (${counselors.length})`, icon: UserCheck },
            { id: 'universities', label: `Universities (${localUniversities.length})`, icon: Building2 },
            { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
            { id: 'applications', label: `Applications (${applications.length})`, icon: GraduationCap },
            { id: 'visa', label: `Visa Tracking (${visaList.length})`, icon: Plane },
            { id: 'scholarships', label: `Scholarships (${scholarships.length})`, icon: Award },
            { id: 'blogs', label: `Blogs (${blogs.length})`, icon: FileText },
            { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: MessageSquare },
            { id: 'documents', label: `Documents (${docList.length})`, icon: FileCheck },
            { id: 'payments', label: `Payments (${payments.length})`, icon: DollarSign },
            { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
            { id: 'audit', label: 'Audit Logs', icon: Clock },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'roles', label: 'Role Management', icon: UserCog },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 1: DASHBOARD OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-slate-400">Total Enrolled Students</span>
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{studentsList.length + 240}</div>
              <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">↑ +18.4% from West Africa Intake</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-slate-400">Active Seat Grants</span>
                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-2xl">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {applications.filter(a => a.status === 'Approved' || a.status === 'Unconditional Offer').length + 110}
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 mt-1 inline-block">Study in India Seats Verified</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-slate-400">Verified Locker Documents</span>
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
                  <FileCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{docList.length + 510}</div>
              <span className="text-[11px] font-semibold text-amber-600 mt-1 inline-block">Passports & Transcripts Approved</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-slate-400">Total Tuition Revenue</span>
                <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">₹64,20,000</div>
              <span className="text-[11px] font-semibold text-teal-600 mt-1 inline-block">Direct Bank & Card Receipts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Pipeline Stage Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { stage: 'Provisional Seat Allocated / Approved', pct: 72, color: 'bg-emerald-500' },
                  { stage: 'Visa & FRRO Endorsement', pct: 54, color: 'bg-indigo-500' },
                  { stage: 'Under Review at University Desk', pct: 85, color: 'bg-amber-500' },
                  { stage: 'WASSCE & Transcript Locker Submissions', pct: 40, color: 'bg-slate-400' },
                ].map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{p.stage}</span>
                      <span>{p.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${p.color} transition-all duration-500`} style={{ width: `${p.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Recent Administrative Action Log
              </h3>
              <div className="space-y-3 text-xs divide-y divide-slate-100">
                {auditTrail.slice(0, 4).map((log) => (
                  <div key={log.id} className="pt-2.5 flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{log.user}</span>
                      <p className="text-slate-600 text-[11px]">{log.action}: {log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: STUDENT MANAGEMENT */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Registered Student Directory</h3>
              <p className="text-xs text-slate-500">Manage student profiles, assign senior counselors, and view qualifications.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search students, country, major..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Student Name & Contact</th>
                  <th className="p-3">Home Region</th>
                  <th className="p-3">Level & Desired Major</th>
                  <th className="p-3">Academic Score / WASSCE</th>
                  <th className="p-3">Assigned Counselor</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentsList.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.county && s.county.toLowerCase().includes(searchTerm.toLowerCase()))).map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{std.name}</div>
                      <div className="text-[10px] text-slate-500">{std.email}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{std.county || 'Ghana / West Africa'}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-800 block">{std.degreeLevel}</span>
                      <span className="text-[10px] text-slate-500">{std.desiredMajor}</span>
                    </td>
                    <td className="p-3 font-semibold text-emerald-700">{std.gpa}</td>
                    <td className="p-3">
                      <select
                        value={std.assignedCounselorId || ''}
                        onChange={(e) => handleAssignCounselor(std.id, e.target.value)}
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                      >
                        <option value="">Unassigned</option>
                        {counselors.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => triggerSyncNotice(`Viewing profile details for ${std.name}`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold text-[10px] text-slate-700 rounded-xl cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: COUNSELOR MANAGEMENT */}
      {activeTab === 'counselors' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Fresh Study India Senior Counselors</h3>
              <p className="text-xs text-slate-500">Manage admission advisors, phone contacts, and student workloads.</p>
            </div>
            <button
              onClick={() => setShowAddCounselor(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Senior Counselor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counselors.map((c) => (
              <div key={c.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{c.name}</h4>
                    <span className="text-[11px] text-emerald-600 font-bold">{c.specialization}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Email: <span className="font-medium text-slate-800">{c.email}</span></div>
                  <div>Phone: <span className="font-medium text-slate-800">{c.phone}</span></div>
                  <div className="font-bold text-slate-900">Assigned Students: {c.assignedStudentsCount}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {c.status}
                  </span>
                  <button 
                    onClick={() => {
                      const updated = counselors.map(item => item.id === c.id ? { ...item, status: item.status === 'Active' ? 'On Leave' as const : 'Active' as const } : item);
                      setCounselors(updated);
                      triggerSyncNotice(`Updated counselor status for ${c.name}`);
                    }}
                    className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SYSTEM ADMINISTRATORS DIRECTORY SECTION */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" /> System Administrators Directory
                </h3>
                <p className="text-xs text-slate-500">
                  {isSuperAdmin
                    ? 'Super Admin Privileges: You have full authority to create or delete Admin accounts.'
                    : 'Standard Admin Notice: Only Super Admins can create or delete Administrator accounts.'}
                </p>
              </div>
              {isSuperAdmin ? (
                <button
                  onClick={() => setShowAddCounselor(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Provision Admin Account
                </button>
              ) : (
                <div className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-bold rounded-xl flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-600" /> Creation Restricted to Super Admin
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="p-3">Administrator Name</th>
                    <th className="p-3">Email Contact</th>
                    <th className="p-3">Role Tier</th>
                    <th className="p-3">Created Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {adminsList.map((adm) => {
                    const isSuper = adm.role === 'superadmin' || adm.role === 'super-admin';
                    return (
                      <tr key={adm.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{adm.name}</td>
                        <td className="p-3 text-slate-600">{adm.email}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full ${
                            isSuper
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {isSuper ? 'SUPER ADMIN' : 'ADMINISTRATOR'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{adm.createdAt || '2025-01-01'}</td>
                        <td className="p-3 text-right">
                          {isSuperAdmin && !isSuper ? (
                            <button
                              onClick={() => handleDeleteAdmin(adm.id, adm.email)}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] rounded-xl cursor-pointer transition border border-rose-200"
                            >
                              Delete Admin
                            </button>
                          ) : isSuper ? (
                            <span className="text-[10px] font-bold text-purple-600 italic">Root Authority</span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 italic">Super Admin Required</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: UNIVERSITY MANAGEMENT */}
      {activeTab === 'universities' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Partnered Higher Education Institutions</h3>
              <p className="text-xs text-slate-500">Manage Indian partner campuses, ranking credentials, and tuition ranges.</p>
            </div>
            <button
              onClick={() => setShowAddUni(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Partner University
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localUniversities.map((u) => (
              <div key={u.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={u.image} alt={u.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{u.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-700">{u.city} • Rank #{u.ranking}</span>
                    <div className="text-[11px] text-slate-500">{u.tuitionRange}</div>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setLocalUniversities(localUniversities.filter(item => item.id !== u.id));
                    await deleteUniversityFromFirestore(u.id);
                    triggerSyncNotice(`Deleted university ${u.name}`);
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
                  title="Remove University"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: COURSE MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Course & Degree Catalog Management</h3>
              <p className="text-xs text-slate-500">Manage Bachelor, Master, and PhD programs offered to international students.</p>
            </div>
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add New Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">University</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Tuition Fee</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{c.title}</td>
                    <td className="p-3 text-slate-700 font-medium">{c.university}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-bold text-[10px] rounded-md">{c.level}</span></td>
                    <td className="p-3 text-slate-600">{c.duration}</td>
                    <td className="p-3 font-bold text-emerald-700">{c.tuitionFee}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={async () => {
                          setCourses(courses.filter(item => item.id !== c.id));
                          await deleteCourseFromFirestore(c.id);
                          triggerSyncNotice(`Course ${c.title} removed.`);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 6: APPLICATION MANAGEMENT */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Student University Applications</h3>
              <p className="text-xs text-slate-500">Approve seats, issue offer letters, and update stage status in Firestore.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search student or tracking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Tracking ID</th>
                  <th className="p-3">University & Course</th>
                  <th className="p-3">Intake</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Update Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.filter(a => a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || a.trackingId.toLowerCase().includes(searchTerm.toLowerCase())).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{app.studentName}</td>
                    <td className="p-3 font-mono text-slate-500">{app.trackingId}</td>
                    <td className="p-3">
                      <div className="font-medium text-slate-900">{app.universityName}</div>
                      <div className="text-[10px] text-slate-500">{app.courseName}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{app.intake}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          onUpdateAppStatus(app.id, 'Approved', 'Approved by Super Admin');
                          triggerSyncNotice(`Application ${app.trackingId} marked Approved!`);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                      >
                        Approve Seat
                      </button>
                      <button
                        onClick={() => {
                          onUpdateAppStatus(app.id, 'Under Review', 'Further documentation requested');
                          triggerSyncNotice(`Application ${app.trackingId} put Under Review`);
                        }}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-bold text-[10px] text-slate-700 rounded-xl cursor-pointer"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 7: VISA TRACKING */}
      {activeTab === 'visa' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Student Visa & FRRO Process Tracker</h3>
          <p className="text-xs text-slate-500">Update stage progress from Stage 1 (Document Verification) to Stage 5 (FRRO & Onboarding).</p>

          <div className="space-y-4">
            {visaList.map((v) => (
              <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">Tracking: {v.trackingId}</span>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-bold text-[10px] rounded-md">Stage {v.stageNumber}/5</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Current Stage: <span className="font-bold text-slate-900">{v.currentStage}</span></div>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">{v.notes}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={v.stageNumber}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      const stages: VisaStatus['currentStage'][] = [
                        'Document Verification',
                        'Entrance Scorecard Approved',
                        'Counseling & Seat Allocated',
                        'Provisional Admission Letter',
                        'FRRO & Hostel Allotment'
                      ];
                      handleUpdateVisaStage(v.id, num, stages[num - 1]);
                    }}
                    className="p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value={1}>Stage 1: Document Verification</option>
                    <option value={2}>Stage 2: Scorecard Approved</option>
                    <option value={3}>Stage 3: Counseling & Seat Allocated</option>
                    <option value={4}>Stage 4: Provisional Admission Letter</option>
                    <option value={5}>Stage 5: FRRO & Hostel Allotment</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 8: SCHOLARSHIP MANAGEMENT */}
      {activeTab === 'scholarships' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Scholarships & Financial Aid Grants</h3>
              <p className="text-xs text-slate-500">Publish Government and Partner University fee waivers for African students.</p>
            </div>
            <button
              onClick={() => setShowAddScholarship(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Scholarship Grant
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarships.map((s) => (
              <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-md">{s.coverage}</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{s.title}</h4>
                  <div className="text-xs text-slate-600">{s.provider} • <span className="font-bold text-slate-900">{s.amount}</span></div>
                  <div className="text-[11px] text-slate-400 mt-1">Deadline: {s.deadline}</div>
                </div>
                <button
                  onClick={async () => {
                    setScholarships(scholarships.filter(item => item.id !== s.id));
                    await deleteScholarshipFromFirestore(s.id);
                    triggerSyncNotice(`Scholarship ${s.title} removed.`);
                  }}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 9: BLOG MANAGEMENT */}
      {activeTab === 'blogs' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Editorial & Blog Article Management</h3>
              <p className="text-xs text-slate-500">Publish guides on Indian visa, FRRO registration, and campus life.</p>
            </div>
            <button
              onClick={() => setShowAddBlog(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Publish Blog Article
            </button>
          </div>

          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.image} alt={b.title} className="w-16 h-12 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{b.category}</span>
                    <h4 className="font-bold text-xs text-slate-900">{b.title}</h4>
                    <span className="text-[10px] text-slate-500">By {b.author} • {b.date}</span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setBlogs(blogs.filter(item => item.id !== b.id));
                    await deleteBlogPostFromFirestore(b.id);
                    triggerSyncNotice(`Article ${b.title} deleted.`);
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 10: TESTIMONIAL MANAGEMENT */}
      {activeTab === 'testimonials' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Student Success Testimonials</h3>
              <p className="text-xs text-slate-500">Manage alumni quotes, star ratings, and student reviews.</p>
            </div>
            <button
              onClick={() => setShowAddTestimonial(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex justify-between items-start gap-3">
                <div className="flex items-start gap-3">
                  <img src={t.avatar} alt={t.studentName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{t.studentName}</h4>
                    <span className="text-[10px] text-emerald-700 font-bold">{t.university} • {t.course}</span>
                    <p className="text-xs text-slate-600 italic mt-1">"{t.quote}"</p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setTestimonials(testimonials.filter(item => item.id !== t.id));
                    await deleteTestimonialFromFirestore(t.id);
                    triggerSyncNotice(`Testimonial for ${t.studentName} removed.`);
                  }}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 11: DOCUMENT VERIFICATION */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Document Locker Verification Queue</h3>
          <p className="text-xs text-slate-500">Verify passports, WASSCE certificates, entrance scorecards, and transcripts.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Document Category</th>
                  <th className="p-3">File Name</th>
                  <th className="p-3">Upload Date</th>
                  <th className="p-3">Verification Status</th>
                  <th className="p-3 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {docList.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{d.category}</td>
                    <td className="p-3 text-slate-700 font-medium">{d.name}</td>
                    <td className="p-3 text-slate-500">{d.uploadDate}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 font-bold text-[10px] rounded-full ${
                        d.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                        d.status === 'Action Needed' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleUpdateDocStatus(d.id, 'Verified')}
                        className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateDocStatus(d.id, 'Action Needed')}
                        className="px-2.5 py-1 bg-rose-600 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 12: PAYMENT MANAGEMENT */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Invoices & Tuition Fee Receipts</h3>
              <p className="text-xs text-slate-500">Track seat reservation deposits and university tuition payments.</p>
            </div>
            <button
              onClick={() => {
                const newP: PaymentRecord = {
                  id: `p-${Date.now()}`,
                  invoiceId: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  description: 'Provisional Seat Deposit & Visa Courier Charge',
                  amount: '₹25,000',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Paid'
                };
                setPayments([newP, ...payments]);
                savePaymentToFirestore(newP);
                triggerSyncNotice('New invoice payment recorded & synced!');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Record New Payment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{p.invoiceId}</td>
                    <td className="p-3 font-medium text-slate-700">{p.description}</td>
                    <td className="p-3 font-bold text-emerald-700">{p.amount}</td>
                    <td className="p-3 text-slate-500">{p.date}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 font-bold text-[10px] rounded-full ${p.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 13: REPORTS & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <h3 className="font-extrabold text-base text-slate-900">Platform Reports & Analytics Intelligence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Visa Endorsement Pass Rate</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">98.5%</div>
              <p className="text-[11px] text-slate-500 mt-1">Based on 340+ international students in 2026</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Top Student Origin</span>
              <div className="text-3xl font-black text-indigo-600 mt-1">Ghana & W. Africa</div>
              <p className="text-[11px] text-slate-500 mt-1">Accra, Kumasi & Freetown Region Leader</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase">Most Popular Discipline</span>
              <div className="text-3xl font-black text-amber-600 mt-1">Engineering / B.Tech</div>
              <p className="text-[11px] text-slate-500 mt-1">CSE, AI & Mechanical Programs lead enrollment</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 14: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Broadcast Notifications & Announcements</h3>
              <p className="text-xs text-slate-500">Dispatch real-time alerts to students and counselors via Firebase.</p>
            </div>
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bell className="w-4 h-4" /> Send Broadcast Alert
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900">Recent Announcement Dispatched:</div>
            <p className="text-slate-700">"Study in India Seat Allocation Phase 2 is now OPEN! All registered students please upload Grade 12 transcripts before October 15."</p>
            <div className="text-[10px] text-slate-400">Target Group: All Registered Students • Sent Today</div>
          </div>
        </div>
      )}

      {/* MODULE 15: CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Academic & Admission Key Calendar</h3>
          <p className="text-xs text-slate-500">Important seat allocation dates, visa interview schedules, and university intake deadlines.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-800">Oct 15, 2026</span>
              <h4 className="font-extrabold text-slate-900">VIT & SRM Admission Deadline</h4>
              <p className="text-slate-600 text-[11px]">Last date to submit WASSCE transcripts for fall intake.</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1">
              <span className="font-bold text-indigo-800">Nov 01, 2026</span>
              <h4 className="font-extrabold text-slate-900">Scholarship Round 2 Announcement</h4>
              <p className="text-slate-600 text-[11px]">100% Tuition Waiver grant awards announced.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <span className="font-bold text-amber-800">Nov 20, 2026</span>
              <h4 className="font-extrabold text-slate-900">Embassy Visa Orientation Webinar</h4>
              <p className="text-slate-600 text-[11px]">Live counseling session with Senior Advisors.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 16: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Administrative Audit Trail Ledger</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {auditTrail.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-extrabold text-slate-900">{log.user}</span>
                  <span className="text-slate-400 font-medium"> ({log.role}): </span>
                  <span className="text-slate-700 font-medium">{log.action}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{log.details}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 17: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6 max-w-2xl">
          <h3 className="font-extrabold text-base text-slate-900">Platform System Configuration</h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={sysSettings.siteName}
                onChange={(e) => setSysSettings({ ...sysSettings, siteName: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">Allow New Student Registrations</span>
                <span className="text-[11px] text-slate-500">Enable self-service registration via Firebase Auth</span>
              </div>
              <input
                type="checkbox"
                checked={sysSettings.allowStudentRegistration}
                onChange={(e) => setSysSettings({ ...sysSettings, allowStudentRegistration: e.target.checked })}
                className="w-4 h-4 accent-emerald-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">Require Email Verification</span>
                <span className="text-[11px] text-slate-500">Enforce Firebase email verification before submitting seat choices</span>
              </div>
              <input
                type="checkbox"
                checked={sysSettings.requireEmailVerification}
                onChange={(e) => setSysSettings({ ...sysSettings, requireEmailVerification: e.target.checked })}
                className="w-4 h-4 accent-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition cursor-pointer"
            >
              Update Configuration Settings
            </button>
          </form>
        </div>
      )}

      {/* MODULE 18: ROLE MANAGEMENT */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Role-Based Access Control (RBAC) Matrix</h3>
          <p className="text-xs text-slate-500">Configure permission privileges for Super Admin, Admin, Counselor, and Student roles.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Permission Area</th>
                  <th className="p-3">Super Admin</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Counselor</th>
                  <th className="p-3">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { area: 'Approve Admission Letters & Seats', super: true, admin: true, counselor: false, student: false },
                  { area: 'Manage University & Course Catalog', super: true, admin: true, counselor: false, student: false },
                  { area: 'Assign Students to Counselors', super: true, admin: true, counselor: false, student: false },
                  { area: 'Upload & Verify Document Locker', super: true, admin: true, counselor: true, student: false },
                  { area: 'Update Visa Process Stage', super: true, admin: true, counselor: true, student: false },
                  { area: 'Submit University Applications', super: true, admin: false, counselor: true, student: true },
                  { area: 'Modify Global System Settings', super: true, admin: false, counselor: false, student: false },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.area}</td>
                    <td className="p-3 text-emerald-600">{row.super ? <Check className="w-4 h-4" /> : <X className="w-4 h-4 text-slate-300" />}</td>
                    <td className="p-3 text-emerald-600">{row.admin ? <Check className="w-4 h-4" /> : <X className="w-4 h-4 text-slate-300" />}</td>
                    <td className="p-3 text-emerald-600">{row.counselor ? <Check className="w-4 h-4" /> : <X className="w-4 h-4 text-slate-300" />}</td>
                    <td className="p-3 text-emerald-600">{row.student ? <Check className="w-4 h-4" /> : <X className="w-4 h-4 text-slate-300" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD UNIVERSITY */}
      {showAddUni && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Add Indian Partner University</h3>
            <form onSubmit={handleCreateUniversity} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vellore Institute of Technology (VIT)"
                  value={newUni.name}
                  onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">City / State</label>
                <input
                  type="text"
                  placeholder="e.g. Vellore, Tamil Nadu"
                  value={newUni.city}
                  onChange={(e) => setNewUni({ ...newUni, city: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUni(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Save University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COURSE */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Add New Program Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech Artificial Intelligence & Robotics"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tuition Fee</label>
                <input
                  type="text"
                  placeholder="e.g. ₹2,10,000 / yr"
                  value={newCourse.tuitionFee}
                  onChange={(e) => setNewCourse({ ...newCourse, tuitionFee: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SCHOLARSHIP */}
      {showAddScholarship && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Add Scholarship Grant</h3>
            <form onSubmit={handleCreateScholarship} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Grant Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SII African Leaders Fellowship"
                  value={newScholarship.title}
                  onChange={(e) => setNewScholarship({ ...newScholarship, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Award Amount</label>
                <input
                  type="text"
                  placeholder="e.g. ₹3,00,000 / yr Full Waiver"
                  value={newScholarship.amount}
                  onChange={(e) => setNewScholarship({ ...newScholarship, amount: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddScholarship(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Publish Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BLOG */}
      {showAddBlog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Publish Blog Article</h3>
            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete FRRO Guide for Students arriving in Delhi"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <input
                  type="text"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBlog(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TESTIMONIAL */}
      {showAddTestimonial && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Add Student Testimonial</h3>
            <form onSubmit={handleCreateTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Kalu"
                  value={newTestimonial.studentName}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, studentName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Quote</label>
                <textarea
                  rows={2}
                  placeholder="Their experience studying in India..."
                  value={newTestimonial.quote}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTestimonial(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROVISION STAFF / COUNSELOR ACCOUNT */}
      {showAddCounselor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Provision Staff Account</h3>
                <p className="text-[11px] text-slate-500">Super Admin Security: Create Counselor or Admin login credentials.</p>
              </div>
              <button onClick={() => setShowAddCounselor(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCounselor} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ananya Deshmukh"
                  value={newCounselor.name}
                  onChange={(e) => setNewCounselor({ ...newCounselor, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Staff Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ananya@freshstudyindia.com"
                  value={newCounselor.email}
                  onChange={(e) => setNewCounselor({ ...newCounselor, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Password (min 6 chars) *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newCounselor.password}
                  onChange={(e) => setNewCounselor({ ...newCounselor, password: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Role</label>
                  {isSuperAdmin ? (
                    <select
                      value={newCounselor.staffRole}
                      onChange={(e) => setNewCounselor({ ...newCounselor, staffRole: e.target.value as 'counselor' | 'admin' | 'superadmin' })}
                      className="w-full p-3 bg-purple-50 border border-purple-200 rounded-2xl font-bold text-purple-800"
                    >
                      <option value="counselor">Counselor Desk</option>
                      <option value="admin">Administrator</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  ) : (
                    <div>
                      <select
                        disabled
                        value="counselor"
                        className="w-full p-3 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-500 cursor-not-allowed"
                      >
                        <option value="counselor">Counselor Desk</option>
                      </select>
                      <span className="text-[10px] text-amber-600 font-bold block mt-1">
                        Only Super Admin can create Admin accounts.
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specialization / Dept</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering & Tech"
                    value={newCounselor.specialization}
                    onChange={(e) => setNewCounselor({ ...newCounselor, specialization: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCounselor(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BROADCAST ALERT */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Broadcast Alert to All Users</h3>
            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Notification Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Seat Allocation Deadline Update"
                  value={broadcastNotif.title}
                  onChange={(e) => setBroadcastNotif({ ...broadcastNotif, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Message Body</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Message content sent via Firebase live alert..."
                  value={broadcastNotif.message}
                  onChange={(e) => setBroadcastNotif({ ...broadcastNotif, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="w-1/2 py-3 bg-slate-100 font-bold text-slate-700 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
