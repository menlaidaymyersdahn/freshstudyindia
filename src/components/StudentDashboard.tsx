import React, { useState, useEffect } from 'react';
import { 
  Application, 
  DocumentFile, 
  VisaStatus, 
  SupportTicket, 
  ChatMessage, 
  PaymentRecord,
  ActiveTab,
  UserProfile,
  Appointment,
  University,
  Course,
  Scholarship
} from '../types';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Upload, 
  Send, 
  MessageSquare, 
  Plus, 
  Download, 
  ShieldCheck,
  CreditCard,
  Building2,
  Calendar,
  Sparkles,
  AlertCircle,
  Mail,
  RefreshCw,
  UserCheck,
  User,
  Heart,
  Bell,
  BookOpen,
  Edit3,
  CheckCircle2,
  ExternalLink,
  MapPin,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Info,
  LifeBuoy
} from 'lucide-react';
import { 
  auth, 
  triggerEmailVerification, 
  updateUserProfileInFirestore, 
  saveAppointmentToFirestore, 
  fetchAppointmentsFromFirestore,
  saveSavedUniversitiesToFirestore,
  fetchSavedUniversitiesFromFirestore,
  saveNotificationToFirestore,
  fetchNotificationsFromFirestore,
  StudentNotification,
  saveApplicationToFirestore
} from '../lib/firebase';
import { mockAdmissionLetters, mockUniversities, mockScholarships, mockAppointments } from '../data/mockData';

interface StudentDashboardProps {
  applications?: Application[];
  documents?: DocumentFile[];
  visaStatus?: VisaStatus;
  tickets?: SupportTicket[];
  chatMessages?: ChatMessage[];
  payments?: PaymentRecord[];
  userProfile?: UserProfile | null;
  onUploadDocument: (file: DocumentFile) => void;
  onSendMessage: (text: string) => void;
  onCreateTicket: (subject: string, category: string, priority: 'Low' | 'Medium' | 'High' | 'Urgent') => void;
  setActiveTab: (tab: ActiveTab) => void;
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  applications = [],
  documents = [],
  visaStatus = {
    trackingNumber: 'FS-IN-984210',
    currentStage: 'Document Verification',
    stageNumber: 1,
    estimatedCompletion: 'In Progress',
    notes: 'All documents under verification.'
  },
  tickets = [],
  chatMessages = [],
  payments = [],
  userProfile = null,
  onUploadDocument,
  onSendMessage,
  onCreateTicket,
  setActiveTab,
  onProfileUpdate
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'overview' 
    | 'profile' 
    | 'online-app'
    | 'applications' 
    | 'documents' 
    | 'letters' 
    | 'visa' 
    | 'appointments' 
    | 'chat' 
    | 'tickets' 
    | 'payments'
    | 'notifications'
  >('overview');
  
  // Profile Form state
  const [profileName, setProfileName] = useState(userProfile?.name || auth.currentUser?.displayName || '');
  const [profilePhone, setProfilePhone] = useState(userProfile?.phone || '');
  const [profileCounty, setProfileCounty] = useState(userProfile?.county || 'Montserrado');
  const [profileDegree, setProfileDegree] = useState(userProfile?.degreeLevel || 'Bachelor');
  const [profileMajor, setProfileMajor] = useState(userProfile?.desiredMajor || 'Computer Science & IT');
  const [profileGpa, setProfileGpa] = useState(userProfile?.gpa || '3.5 WASSCE Aggregate');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaveMsg, setProfileSaveMsg] = useState<string | null>(null);

  // Online Application Form State
  const [appUniName, setAppUniName] = useState('Sharda University');
  const [appCourseTitle, setAppCourseTitle] = useState('B.Tech in Computer Science & Artificial Intelligence');
  const [appDegree, setAppDegree] = useState('Bachelor');
  const [appIntake, setAppIntake] = useState('Fall 2025 Admissions');
  const [appSopText, setAppSopText] = useState('');
  const [submittingOnlineApp, setSubmittingOnlineApp] = useState(false);
  const [appSuccessMsg, setAppSuccessMsg] = useState<string | null>(null);

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [apptDate, setApptDate] = useState('2025-08-15');
  const [apptTime, setApptTime] = useState('10:00 AM UTC');
  const [apptTopic, setApptTopic] = useState('Scholarship & Fee Waiver Guidance');

  // Bookmarked / Saved Universities State
  const [savedUniIds, setSavedUniIds] = useState<string[]>([]);

  // Notifications State
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);

  // Document upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentFile['category']>('High School Diploma');

  // Ticket modal state
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Admission & Seat Allocation');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');

  // Chat message state
  const [chatInput, setChatInput] = useState('');

  // Email verification state
  const [resendVerifMsg, setResendVerifMsg] = useState<string | null>(null);
  const [loadingVerif, setLoadingVerif] = useState(false);

  const currentUser = auth.currentUser;
  const isEmailVerified = currentUser ? currentUser.emailVerified : true;

  // Sync profile details when userProfile prop changes
  useEffect(() => {
    if (userProfile) {
      setProfileName(userProfile.name || '');
      setProfilePhone(userProfile.phone || '');
      setProfileCounty(userProfile.county || 'Montserrado');
      setProfileDegree(userProfile.degreeLevel || 'Bachelor');
      setProfileMajor(userProfile.desiredMajor || 'Computer Science & IT');
      setProfileGpa(userProfile.gpa || '3.5 WASSCE Aggregate');
    }
  }, [userProfile]);

  // Fetch student appointments & saved universities from Firestore
  useEffect(() => {
    if (currentUser?.uid) {
      fetchAppointmentsFromFirestore(currentUser.uid).then(appts => {
        if (appts.length > 0) setAppointments(appts);
      });
      fetchSavedUniversitiesFromFirestore(currentUser.uid).then(ids => {
        if (ids.length > 0) setSavedUniIds(ids);
      });
      fetchNotificationsFromFirestore(currentUser.uid).then(notifs => {
        if (notifs.length > 0) setNotifications(notifs);
      });
    }
  }, [currentUser]);

  const handleResendEmail = async () => {
    if (!currentUser) return;
    try {
      setLoadingVerif(true);
      await triggerEmailVerification(currentUser);
      setResendVerifMsg(`Verification email resent to ${currentUser.email}! Check your inbox.`);
    } catch (err: any) {
      setResendVerifMsg(err.message || 'Could not resend email.');
    } finally {
      setLoadingVerif(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSavingProfile(true);
    setProfileSaveMsg(null);

    const updated: Partial<UserProfile> = {
      name: profileName,
      phone: profilePhone,
      county: profileCounty,
      degreeLevel: profileDegree,
      desiredMajor: profileMajor,
      gpa: profileGpa
    };

    try {
      await updateUserProfileInFirestore(currentUser.uid, updated);
      setProfileSaveMsg('Profile details successfully updated and saved in Firestore!');
      if (onProfileUpdate && userProfile) {
        onProfileUpdate({ ...userProfile, ...updated });
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setProfileSaveMsg('Error updating profile. Please try again.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleOnlineAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingOnlineApp(true);
    setAppSuccessMsg(null);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: currentUser?.uid || 'st-1',
      studentName: profileName || currentUser?.displayName || 'Student',
      universityName: appUniName,
      courseName: appCourseTitle,
      degree: appDegree,
      country: 'India',
      trackingId: `#FSI-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Submitted',
      progressPercentage: 25,
      submittedDate: new Date().toISOString().split('T')[0],
      intake: appIntake,
      notes: appSopText ? `Student SOP submitted: ${appSopText.slice(0, 80)}...` : 'Online application submitted via Student Portal.'
    };

    try {
      await saveApplicationToFirestore(newApp);
      setAppSuccessMsg(`Application for ${appCourseTitle} at ${appUniName} successfully submitted! Tracking ID: ${newApp.trackingId}`);
      setTimeout(() => {
        setActiveSubTab('applications');
      }, 1800);
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      setSubmittingOnlineApp(false);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      studentId: currentUser.uid,
      studentName: profileName || 'Student',
      counselorId: 'counselor-1',
      counselorName: 'Dr. Rajesh Sharma',
      date: apptDate,
      time: apptTime,
      topic: apptTopic,
      status: 'Scheduled',
      meetingLink: 'https://meet.google.com/fsi-counseling-desk'
    };

    setAppointments(prev => [newAppt, ...prev]);
    setBookingModalOpen(false);

    try {
      await saveAppointmentToFirestore(newAppt);
    } catch (err) {
      console.error('Error saving appointment:', err);
    }
  };

  const handleToggleSaveUni = async (uniId: string) => {
    const updated = savedUniIds.includes(uniId)
      ? savedUniIds.filter(id => id !== uniId)
      : [...savedUniIds, uniId];
    setSavedUniIds(updated);

    if (currentUser?.uid) {
      try {
        await saveSavedUniversitiesToFirestore(currentUser.uid, updated);
      } catch (err) {
        console.error('Error saving bookmarked universities:', err);
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const newDoc: DocumentFile = {
      id: `doc-${Date.now()}`,
      name: docName,
      category: docCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Verified',
      size: '2.4 MB',
      fileUrl: '#'
    };

    onUploadDocument(newDoc);
    setDocName('');
    setUploadModalOpen(false);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    onCreateTicket(ticketSubject, ticketCategory, ticketPriority);
    setTicketSubject('');
    setTicketModalOpen(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  const savedUniversities = mockUniversities.filter(u => savedUniIds.includes(u.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Secure Student Admissions Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            Welcome, <span className="text-emerald-300">{profileName || currentUser?.displayName || 'Student'}</span>!
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Student ID: #{currentUser?.uid ? currentUser.uid.slice(0, 8).toUpperCase() : 'FSI-88219'} • {profileCounty} County, Liberia • Intake 2025
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('gmail')}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white" /> Gmail Desk
          </button>
          <button
            onClick={() => setActiveSubTab('online-app')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold rounded-2xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Start Application
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" /> Browse Courses
          </button>
        </div>
      </div>

      {/* Email Verification Banner (If unverified) */}
      {!isEmailVerified && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-900 text-xs shadow-xs">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block text-sm">Please Verify Your Student Email</span>
              Your email ({currentUser?.email}) is pending verification. Verify to unlock official offer downloads.
            </div>
          </div>
          <button
            onClick={handleResendEmail}
            disabled={loadingVerif}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {loadingVerif ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
            Resend Email Link
          </button>
        </div>
      )}

      {resendVerifMsg && (
        <div className="p-3 bg-emerald-600 text-white font-bold text-xs rounded-2xl animate-in fade-in">
          {resendVerifMsg}
        </div>
      )}

      {/* PORTAL NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Overview', icon: BookOpen },
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'online-app', label: 'Online Application Form', icon: Plus },
          { id: 'applications', label: `Applications (${applications.length})`, icon: Clock },
          { id: 'documents', label: `Document Locker (${documents.length})`, icon: Upload },
          { id: 'letters', label: 'Admission Letters', icon: FileText },
          { id: 'visa', label: 'Visa & FRRO', icon: ShieldCheck },
          { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
          { id: 'chat', label: 'Counselor Chat', icon: MessageSquare },
          { id: 'tickets', label: `Support Tickets (${tickets.length})`, icon: Sparkles },
          { id: 'payments', label: `Fee Payments (${payments.length})`, icon: CreditCard },
          { id: 'notifications', label: `Notifications (${notifications.filter(n=>!n.read).length})`, icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: OVERVIEW DASHBOARD */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          
          {/* 9-STEP ADMISSION PROCESS CHECKLIST */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-800/40 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-emerald-800/50 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-emerald-400/30">
                  Student Admission Journey
                </span>
                <h3 className="text-lg font-black mt-1 text-white">9-Step Admission Execution Checklist</h3>
                <p className="text-xs text-slate-300">Complete these steps to reserve your seat at top Indian universities.</p>
              </div>
              <div className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Progress Tracking
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {/* Step 1: Account Created */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-emerald-500 text-slate-950 font-black rounded-xl flex items-center justify-center text-xs">1</div>
                  <div>
                    <h4 className="font-extrabold text-white">Create Account</h4>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Account Active ({userProfile?.email || auth.currentUser?.email})
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2: Fill Admission Form */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">2</div>
                  <div>
                    <h4 className="font-extrabold text-white">Fill Admission Form</h4>
                    <span className="text-[10px] text-slate-300">
                      {applications.length > 0 ? `${applications.length} Form(s) Submitted` : 'Pending Submission'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('online-app')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  {applications.length > 0 ? 'Fill Another' : 'Fill Form'}
                </button>
              </div>

              {/* Step 3: Upload Passport */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">3</div>
                  <div>
                    <h4 className="font-extrabold text-white">Upload Passport</h4>
                    <span className="text-[10px] text-slate-300">
                      {documents.some(d => d.category.toLowerCase().includes('passport') || d.name.toLowerCase().includes('passport')) ? 'Passport Uploaded' : 'Required for Visa'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveSubTab('documents'); setUploadModalOpen(true); }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Upload
                </button>
              </div>

              {/* Step 4: Upload Transcripts */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">4</div>
                  <div>
                    <h4 className="font-extrabold text-white">Upload Transcripts</h4>
                    <span className="text-[10px] text-slate-300">
                      {documents.some(d => d.category.toLowerCase().includes('transcript') || d.name.toLowerCase().includes('transcript')) ? 'Transcripts Uploaded' : 'Grades 10-12 / Bachelor'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveSubTab('documents'); setUploadModalOpen(true); }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Upload
                </button>
              </div>

              {/* Step 5: Upload WAEC/NECO Results */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">5</div>
                  <div>
                    <h4 className="font-extrabold text-white">WAEC / NECO Results</h4>
                    <span className="text-[10px] text-slate-300">
                      {documents.some(d => d.category.toLowerCase().includes('wassce') || d.category.toLowerCase().includes('waec') || d.category.toLowerCase().includes('neco') || d.name.toLowerCase().includes('waec') || d.name.toLowerCase().includes('neco') || d.name.toLowerCase().includes('wassce')) ? 'WAEC/NECO Synced' : 'Senior Secondary Exam'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveSubTab('documents'); setUploadModalOpen(true); }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Upload
                </button>
              </div>

              {/* Step 6: Track Application Status */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">6</div>
                  <div>
                    <h4 className="font-extrabold text-white">Track Application Status</h4>
                    <span className="text-[10px] text-slate-300">Live Status & Counselor Notes</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('applications')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Track Status
                </button>
              </div>

              {/* Step 7: Receive Admission Letter */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">7</div>
                  <div>
                    <h4 className="font-extrabold text-white">Receive Admission Letter</h4>
                    <span className="text-[10px] text-slate-300">
                      {applications.filter(a => a.status === 'Offer Issued' || a.status === 'Accepted' || a.status === 'Enrolled').length > 0
                        ? `${applications.filter(a => a.status === 'Offer Issued' || a.status === 'Accepted' || a.status === 'Enrolled').length} Offer Letter(s) Issued`
                        : 'Pending University Review'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('letters')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  View / PDF
                </button>
              </div>

              {/* Step 8: Pay Fees */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">8</div>
                  <div>
                    <h4 className="font-extrabold text-white">Pay Fees</h4>
                    <span className="text-[10px] text-slate-300">Seat Reservation & Tuition Fee Portal</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('payments')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Pay Online
                </button>
              </div>

              {/* Step 9: Chat with Counselor */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-700 text-white font-black rounded-xl flex items-center justify-center text-xs">9</div>
                  <div>
                    <h4 className="font-extrabold text-white">Chat with Counselor</h4>
                    <span className="text-[10px] text-slate-300">Direct Advisor Desk Support</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('chat')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Open Chat
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Applications</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{applications.length} Submitted</div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">In Admissions Process</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Verified Locker Docs</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{documents.length} Uploaded</div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Credential Sync Ready</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Scheduled Meetings</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{appointments.length} Booked</div>
              <span className="text-[11px] text-amber-600 font-bold mt-1 block">With Senior Counselor</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Offer Letters</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{mockAdmissionLetters.length} Issued</div>
              <span className="text-[11px] text-indigo-600 font-bold mt-1 block">Ready for Download</span>
            </div>
          </div>

          {/* Recent Applications & Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Active University Applications</h3>
                <button
                  onClick={() => setActiveSubTab('applications')}
                  className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                >
                  View All ({applications.length})
                </button>
              </div>

              <div className="space-y-3">
                {applications.slice(0, 2).map((app) => (
                  <div key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">{app.trackingId}</span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{app.universityName}</h4>
                        <p className="text-xs text-slate-500">{app.courseName} ({app.degree})</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold text-xs rounded-xl">
                        {app.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        <span>Admissions Desk Processing</span>
                        <span>{app.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${app.progressPercentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counselor Direct Access */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-6 border border-emerald-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  RS
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Dr. Rajesh Sharma</h4>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">Assigned Senior Counselor</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Need guidance with scholarship fee waivers, university selection, or Indian student visa requirements?
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setActiveSubTab('appointments')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" /> Book 1-on-1 Consultation
                </button>
                <button
                  onClick={() => setActiveSubTab('chat')}
                  className="w-full py-2.5 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Open Live Chat Desk
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: PROFILE MANAGEMENT */}
      {activeSubTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <User className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Student Academic Profile</h3>
              <p className="text-xs text-slate-500">Manage your profile details and preferences saved in Firestore.</p>
            </div>
          </div>

          {profileSaveMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profileSaveMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address (Auth)</label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+231 88 000 0000"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">County in Liberia</label>
                <select
                  value={profileCounty}
                  onChange={(e) => setProfileCounty(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium focus:outline-none focus:border-emerald-500"
                >
                  <option value="Montserrado">Montserrado</option>
                  <option value="Nimba">Nimba</option>
                  <option value="Bong">Bong</option>
                  <option value="Lofa">Lofa</option>
                  <option value="Grand Bassa">Grand Bassa</option>
                  <option value="Margibi">Margibi</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Grand Gedeh">Grand Gedeh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Desired Degree</label>
                <select
                  value={profileDegree}
                  onChange={(e) => setProfileDegree(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                >
                  <option value="Bachelor">Bachelor Degree</option>
                  <option value="Master">Master Degree</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="Diploma">Diploma / Certificate</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Major Interest</label>
                <input
                  type="text"
                  value={profileMajor}
                  onChange={(e) => setProfileMajor(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GPA / WASSCE Score</label>
                <input
                  type="text"
                  placeholder="e.g. 3.6 GPA or Grade A WASSCE"
                  value={profileGpa}
                  onChange={(e) => setProfileGpa(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {savingProfile && <RefreshCw className="w-4 h-4 animate-spin" />}
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 3: ONLINE APPLICATION FORM */}
      {activeSubTab === 'online-app' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Plus className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Online Application Portal</h3>
              <p className="text-xs text-slate-500">Apply for university seat allocation in India with instant Firestore logging.</p>
            </div>
          </div>

          {appSuccessMsg && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{appSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleOnlineAppSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target University *</label>
              <select
                value={appUniName}
                onChange={(e) => setAppUniName(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
              >
                {mockUniversities.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.city}, India)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech Computer Science"
                  value={appCourseTitle}
                  onChange={(e) => setAppCourseTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree Level *</label>
                <select
                  value={appDegree}
                  onChange={(e) => setAppDegree(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                >
                  <option value="Bachelor">Bachelor Degree</option>
                  <option value="Master">Master Degree</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Admission Intake</label>
              <select
                value={appIntake}
                onChange={(e) => setAppIntake(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
              >
                <option value="Fall 2025 Admissions">Fall 2025 Admissions (August Intake)</option>
                <option value="Spring 2026 Admissions">Spring 2026 Admissions (January Intake)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Statement of Purpose / Personal Statement (Optional)</label>
              <textarea
                rows={3}
                placeholder="Briefly explain your academic motivation for studying in India..."
                value={appSopText}
                onChange={(e) => setAppSopText(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={submittingOnlineApp}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {submittingOnlineApp && <RefreshCw className="w-4 h-4 animate-spin" />}
              Submit Online Application
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 4: APPLICATIONS TRACKER */}
      {activeSubTab === 'applications' && (
        <div className="space-y-6">
          {applications.length === 0 ? (
            <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">No Applications Submitted Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You haven't submitted any university applications yet. Fill out the online application form or browse partner Indian colleges to apply.
                </p>
              </div>
              <button 
                onClick={() => setActiveSubTab('online-app')} 
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> Start New Application
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app) => (
                <div key={app.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">{app.trackingId}</span>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">{app.universityName}</h3>
                      <p className="text-xs text-slate-500">{app.courseName} ({app.degree})</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-extrabold text-xs rounded-xl">
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>Admission Processing Progress</span>
                      <span>{app.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                        style={{ width: `${app.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">Counselor Updates:</span>
                    <p>{app.notes || 'Your application files are currently under review by the university admissions desk.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: DOCUMENT LOCKER */}
      {activeSubTab === 'documents' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Secure Document Locker</h3>
              <p className="text-xs text-slate-500">Only documents uploaded by your account are saved and displayed here.</p>
            </div>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              <Upload className="w-4 h-4" /> Upload Document
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="p-10 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <FileText className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Documents Uploaded Yet</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your document locker is empty. Click the button below to upload your international passport, high school marksheets (WASSCE/NECO), or transcripts for official evaluation.
                </p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4" /> Upload First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[150px]">{doc.name}</h4>
                      <span className="text-[10px] text-slate-500 block">{doc.category}</span>
                      <span className="text-[10px] font-bold text-emerald-600">{doc.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Document Modal */}
          {uploadModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Upload to Document Locker</h3>
                <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Document File Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WASSCE_Certificate_2024.pdf"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as any)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                    >
                      <option value="International Passport">International Passport</option>
                      <option value="WAEC / NECO / WASSCE Certificate">WAEC / NECO / WASSCE Exam Result & Certificate</option>
                      <option value="Transcript (Grades 10 to 12)">Academic Transcripts (Grades 10 to 12 / Bachelor)</option>
                      <option value="High School Diploma">High School Diploma</option>
                      <option value="Statement of Purpose (SOP)">Statement of Purpose (SOP)</option>
                      <option value="Entrance Test Scorecard (JEE/NEET/CUET/CAT)">Entrance Test Scorecard (JEE/NEET/CUET/CAT)</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="w-1/2 py-3 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 rounded-2xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl cursor-pointer"
                    >
                      Save File
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 6: ADMISSION LETTERS */}
      {activeSubTab === 'letters' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Official University Provisional Admission Letters</h3>
          {applications.filter(a => a.status === 'Offer Issued' || a.status === 'Accepted' || a.status === 'Enrolled').length === 0 ? (
            <div className="p-10 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <FileText className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Admission Letters Issued Yet</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Once your application dossier is reviewed and accepted by the university admission board, your official provisional admission offer letter PDF will be issued here for instant download.
                </p>
              </div>
              <button
                onClick={() => setActiveSubTab('applications')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                Check Application Status
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.filter(a => a.status === 'Offer Issued' || a.status === 'Accepted' || a.status === 'Enrolled').map((app) => (
                <div key={app.id} className="p-5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-3xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">OFFICIAL LETTER</span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{app.universityName}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{app.courseName}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-full">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Tracking: {app.trackingId} • Status: {app.status}
                  </div>
                  <button
                    onClick={() => alert(`Downloading official provisional admission letter for ${app.universityName}...`)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download Official Offer Letter (PDF)
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 7: VISA TRACKER */}
      {activeSubTab === 'visa' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Indian Visa & FRRO Clearance Tracker</h3>
              <p className="text-xs text-slate-500">Track official student visa endorsement and hostel allotment stages.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl">
              Stage 3 of 5
            </span>
          </div>

          {/* Timeline Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: 1, label: 'Document Verification', desc: 'Completed' },
              { num: 2, label: 'Scorecard Approved', desc: 'Completed' },
              { num: 3, label: 'Counseling & Seat Allocated', desc: 'Active Stage' },
              { num: 4, label: 'Provisional Admission Letter', desc: 'Pending' },
              { num: 5, label: 'FRRO & Hostel Allotment', desc: 'Pending' },
            ].map((stg) => (
              <div 
                key={stg.num}
                className={`p-4 rounded-2xl border text-center space-y-1 ${
                  stg.num <= 3
                    ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                  {stg.num}
                </div>
                <div className="text-xs font-bold">{stg.label}</div>
                <div className="text-[10px] text-slate-500">{stg.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: COUNSELING APPOINTMENTS */}
      {activeSubTab === 'appointments' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">1-on-1 Academic Counseling Sessions</h3>
              <p className="text-xs text-slate-500">Live video appointments with verified Indian admission officers.</p>
            </div>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              <Calendar className="w-4 h-4" /> Book New Session
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="p-10 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Calendar className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Appointments Scheduled Yet</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Book a free 1-on-1 video consultation with our admissions counselors to get personalized course, university, and scholarship guidance.
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" /> Schedule First Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{appt.topic}</h4>
                      <p className="text-xs text-slate-500">Counselor: {appt.counselorName}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                      {appt.status}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    📅 {appt.date} at {appt.time}
                  </div>

                  {appt.meetingLink && (
                    <a
                      href={appt.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Join Google Meet Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Book Appointment Modal */}
          {bookingModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Book Counseling Appointment</h3>
                <form onSubmit={handleBookAppointment} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Session Topic *</label>
                    <input
                      type="text"
                      required
                      value={apptTopic}
                      onChange={(e) => setApptTopic(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Date</label>
                      <input
                        type="date"
                        value={apptDate}
                        onChange={(e) => setApptDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Time Slot</label>
                      <select
                        value={apptTime}
                        onChange={(e) => setApptTime(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                      >
                        <option value="10:00 AM UTC">10:00 AM UTC</option>
                        <option value="02:00 PM UTC">02:00 PM UTC</option>
                        <option value="04:30 PM UTC">04:30 PM UTC</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="w-1/2 py-3 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 rounded-2xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 9: COUNSELOR CHAT */}
      {activeSubTab === 'chat' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Fresh Study India Senior Admissions Desk</h3>
              <span className="text-[10px] text-emerald-600 font-bold">Online • Responds promptly to your inquiries</span>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2 p-6">
                <MessageSquare className="w-8 h-8 text-emerald-500 opacity-60" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Live Counselor Support</p>
                <p className="text-[11px] text-slate-400 max-w-xs">Send a message below to ask about Indian university admissions, required documents, or scholarships.</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs font-medium ${
                    msg.sender === 'student' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-xs'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${
                      msg.sender === 'student' ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask our admission desk about your application or visa..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 10: SUPPORT TICKETS */}
      {activeSubTab === 'tickets' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Student Support Helpdesk</h3>
              <p className="text-xs text-slate-500">Open a ticket for official inquiries, fee receipts, or visa help.</p>
            </div>
            <button
              onClick={() => setTicketModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Create Support Ticket
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="p-10 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <LifeBuoy className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Support Tickets</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Have questions about fees, university selection, or embassy interviews? Click below to create a direct support ticket.
                </p>
              </div>
              <button
                onClick={() => setTicketModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Open New Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase">{t.ticketId} • {t.category}</span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{t.subject}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-[10px] rounded-full">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Ticket Modal */}
          {ticketModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Create Support Ticket</h3>
                <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Ticket Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WASSCE Transcript Verification Query"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                      <select
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                      >
                        <option value="Admission & Seat Allocation">Admission</option>
                        <option value="Scholarships & Fee Waivers">Scholarships</option>
                        <option value="Visa & Embassy Guidance">Visa</option>
                        <option value="Hostel & Travel">Hostel & Travel</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Priority</label>
                      <select
                        value={ticketPriority}
                        onChange={(e) => setTicketPriority(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-medium"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setTicketModalOpen(false)}
                      className="w-1/2 py-3 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 rounded-2xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-emerald-600 text-white font-bold rounded-2xl cursor-pointer"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 11: FEE PAYMENTS */}
      {activeSubTab === 'payments' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Fee Payments & Receipts</h3>
          {payments.length === 0 ? (
            <div className="p-10 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <CreditCard className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Payment Records Found</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Official university tuition fee invoices, seat reservation receipts, and hostel deposit receipts will appear here once processed.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white block">{p.description}</span>
                    <span className="text-[10px] text-slate-500">Invoice: {p.invoiceId} • {p.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-emerald-600 block">{p.amount}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 12: NOTIFICATIONS */}
      {activeSubTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-2xl mx-auto">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Real-Time Portal Alerts</h3>
          {notifications.length === 0 ? (
            <div className="p-8 text-center bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
              <p className="text-xs text-slate-500">No new notifications. Real-time updates regarding your document verification and application status will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
