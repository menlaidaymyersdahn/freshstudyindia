import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Send, 
  Calendar, 
  MessageSquare, 
  ShieldAlert, 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  UserCheck,
  Plane,
  Plus,
  StickyNote,
  Bell,
  Check,
  X,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';
import { Application, DocumentFile, SupportTicket, ChatMessage, UserProfile, AdmissionLetter, VisaStatus, Appointment, ActiveTab } from '../types';
import { mockCounselors, mockAppointments, mockVisaStatuses } from '../data/mockData';
import { 
  saveVisaStatusToFirestore, 
  saveAppointmentToFirestore, 
  saveChatMessageToFirestore, 
  saveCounselorNoteToFirestore, 
  saveDocumentToFirestore, 
  saveNotificationToFirestore,
  saveApplicationToFirestore 
} from '../lib/firebase';

interface CounselorDashboardProps {
  applications?: Application[];
  documents?: DocumentFile[];
  tickets?: SupportTicket[];
  chatMessages?: ChatMessage[];
  onUpdateAppStatus: (appId: string, status: Application['status'], notes?: string) => void;
  onSendMessage: (text: string) => void;
  onUploadAdmissionLetter?: (letter: AdmissionLetter) => void;
  setActiveTab?: (tab: ActiveTab) => void;
}

interface CounselorInternalNote {
  id: string;
  studentId: string;
  counselorId: string;
  note: string;
  date: string;
  category: 'General' | 'WASSCE Verification' | 'Visa' | 'Financial';
}

export const CounselorDashboard: React.FC<CounselorDashboardProps> = ({
  applications = [],
  documents = [],
  tickets = [],
  chatMessages = [],
  onUpdateAppStatus,
  onSendMessage,
  setActiveTab: setNavActiveTab
}) => {
  // Navigation Tabs
  type CounselorTab = 'students' | 'applications' | 'admission_letters' | 'visa' | 'appointments' | 'chat' | 'notes' | 'notifications';
  const [activeTab, setActiveTab] = useState<CounselorTab>('students');

  // Active Counselor State (Allows switching between counselors to demonstrate RBAC assignment restriction!)
  const [activeCounselorId, setActiveCounselorId] = useState<string>('c-1'); // Default: Dr. Rajesh Sharma ('c-1')
  const currentCounselor = mockCounselors.find(c => c.id === activeCounselorId) || mockCounselors[0];

  // Assigned Students Data (Strictly isolated by counselor ID!)
  const allStudentsList: UserProfile[] = [
    {
      id: 's-101',
      name: 'Emanuel Osei',
      email: 'emanuel.osei@freshstudyindia.com',
      role: 'student',
      county: 'Accra, Ghana',
      targetCountry: 'India',
      degreeLevel: 'Bachelor',
      desiredMajor: 'Computer Science & Software Engineering',
      gpa: '3.8 / 4.0 (WASSCE A1 in Math & Physics)',
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
      desiredMajor: 'Public Health & Medical Biotechnology',
      gpa: '3.6 / 4.0',
      phone: '+232 76 987 654',
      assignedCounselorId: 'c-1',
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
      assignedCounselorId: 'c-2', // Assigned to Dr. Priya Patel
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
      assignedCounselorId: 'c-3', // Assigned to Ananya Verma
      createdAt: '2026-03-01'
    }
  ];

  // FILTERED STUDENT LIST (COUNSELORS MUST ONLY ACCESS STUDENTS ASSIGNED TO THEM)
  const assignedStudents = allStudentsList.filter(s => s.assignedCounselorId === activeCounselorId);
  const assignedStudentIds = assignedStudents.map(s => s.id);

  // Filter applications for assigned students
  const assignedApplications = applications.filter(a => assignedStudentIds.includes(a.studentId || 's-101') || a.studentName.includes(assignedStudents[0]?.name || 'Emanuel'));

  // Local Component States
  const [selectedStudent, setSelectedStudent] = useState<UserProfile>(assignedStudents[0] || allStudentsList[0]);
  const [selectedApp, setSelectedApp] = useState<Application>(assignedApplications[0] || applications[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Visa Statuses State
  const [visaList, setVisaList] = useState<VisaStatus[]>(mockVisaStatuses);

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showAddApptModal, setShowAddApptModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    studentId: assignedStudents[0]?.id || 's-101',
    topic: 'WASSCE Transcript & Seat Allocation Review',
    date: '2026-08-15',
    time: '14:00 GMT',
    meetingLink: 'https://meet.google.com/fsi-counseling-room'
  });

  // Chat State
  const [selectedChatStudentId, setSelectedChatStudentId] = useState<string>(assignedStudents[0]?.id || 's-101');
  const [chatInput, setChatInput] = useState('');
  const [messagesList, setMessagesList] = useState<ChatMessage[]>(chatMessages);

  // Internal Counselor Notes State
  const [notesList, setNotesList] = useState<CounselorInternalNote[]>([
    {
      id: 'n-1',
      studentId: 's-101',
      counselorId: 'c-1',
      note: 'Verified WASSCE A1 in Mathematics and Physics directly with WAEC digital portal. Eligible for 100% Study in India Merit Scholarship.',
      date: '2026-08-01 10:30',
      category: 'WASSCE Verification'
    },
    {
      id: 'n-2',
      studentId: 's-101',
      counselorId: 'c-1',
      note: 'Spoke with student’s guardian regarding international passport renewal. Expected completion by next Friday.',
      date: '2026-08-03 14:15',
      category: 'Visa'
    },
    {
      id: 'n-3',
      studentId: 's-102',
      counselorId: 'c-1',
      note: 'AIIMS Delhi Public Health department accepted preliminary research proposal. Provisional offer letter pending visa clearance.',
      date: '2026-08-02 11:00',
      category: 'General'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'General' | 'WASSCE Verification' | 'Visa' | 'Financial'>('General');

  // Admission Letter Upload Form State
  const [showAddLetterModal, setShowAddLetterModal] = useState(false);
  const [letterUni, setLetterUni] = useState('Vellore Institute of Technology (VIT)');
  const [letterCourse, setLetterCourse] = useState('B.Tech Computer Science & Engineering');
  const [letterGrant, setLetterGrant] = useState('Study in India 100% Tuition Waiver');

  // Counselor Notifications Feed
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Document Uploaded',
      message: 'Emanuel Osei uploaded International Passport (Scan & Certified Copy).',
      time: '10 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Counseling Session Requested',
      message: 'Amina Mansaray booked a 1-on-1 Visa & FRRO guidance call.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Chat Inquiry Received',
      message: 'Kofi Mensah sent a message regarding hostel room reservation at IIT Bombay.',
      time: '3 hours ago',
      read: true
    }
  ]);

  const triggerNotice = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  // 1. UPDATE VISA STAGE & SYNC TO FIRESTORE
  const handleUpdateVisaStage = async (visaId: string, stageNum: number, stageTitle: VisaStatus['currentStage']) => {
    const updated = visaList.map(v => v.id === visaId ? { ...v, stageNumber: stageNum, currentStage: stageTitle, updatedAt: new Date().toISOString() } : v);
    setVisaList(updated);
    const target = updated.find(v => v.id === visaId);
    if (target) {
      await saveVisaStatusToFirestore(target);
      triggerNotice(`Visa tracking updated to Stage ${stageNum}: ${stageTitle}`);
    }
  };

  // 2. SCHEDULE APPOINTMENT & SYNC TO FIRESTORE
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = assignedStudents.find(s => s.id === newAppt.studentId) || assignedStudents[0];
    const apptObj: Appointment = {
      id: `appt-${Date.now()}`,
      studentId: student ? student.id : 's-101',
      studentName: student ? student.name : 'Emanuel Osei',
      counselorId: currentCounselor.id,
      counselorName: currentCounselor.name,
      date: newAppt.date,
      time: newAppt.time,
      topic: newAppt.topic,
      status: 'Scheduled',
      meetingLink: newAppt.meetingLink
    };

    setAppointments([apptObj, ...appointments]);
    await saveAppointmentToFirestore(apptObj);
    
    // Also notify student
    await saveNotificationToFirestore(student.id, {
      id: `notif-${Date.now()}`,
      title: 'Counseling Appointment Confirmed',
      message: `Your counselor ${currentCounselor.name} scheduled a meeting for ${newAppt.date} at ${newAppt.time}.`,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'appointment'
    });

    setShowAddApptModal(false);
    triggerNotice(`Counseling session scheduled with ${student.name}! Real-time notification dispatched.`);
  };

  // 3. SEND REAL-TIME CHAT & SYNC TO FIRESTORE
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'counselor',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessagesList([...messagesList, newMsg]);
    onSendMessage(chatInput);
    await saveChatMessageToFirestore(newMsg);
    setChatInput('');
    triggerNotice('Message sent to student & saved to Firestore.');
  };

  // 4. ADD INTERNAL COUNSELOR NOTE & SYNC TO FIRESTORE
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const noteObj: CounselorInternalNote = {
      id: `note-${Date.now()}`,
      studentId: selectedStudent.id,
      counselorId: currentCounselor.id,
      note: newNoteText,
      date: new Date().toLocaleString(),
      category: newNoteCategory
    };

    setNotesList([noteObj, ...notesList]);
    await saveCounselorNoteToFirestore(selectedStudent.id, noteObj);
    setNewNoteText('');
    triggerNotice('Internal counselor note logged securely in Firestore!');
  };

  // 5. ISSUE / UPLOAD ADMISSION LETTER & SYNC TO FIRESTORE
  const handleUploadLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const docObj: DocumentFile = {
      id: `letter-${Date.now()}`,
      name: `Official Admission Letter - ${letterUni}`,
      category: 'Other Certificate',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Verified',
      size: '1.4 MB PDF',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };

    await saveDocumentToFirestore(docObj, selectedStudent.id);
    
    // Notify student in real time
    await saveNotificationToFirestore(selectedStudent.id, {
      id: `notif-${Date.now()}`,
      title: 'Official Admission Letter Issued!',
      message: `Congratulations! ${letterUni} issued your offer letter for ${letterCourse} (${letterGrant}).`,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'application'
    });

    setShowAddLetterModal(false);
    triggerNotice(`Official Admission Letter uploaded for ${selectedStudent.name}! Synced to Student Locker.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Counselor Profile Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentCounselor.avatar} 
              alt={currentCounselor.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Senior Admissions Counselor Portal
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Online
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{currentCounselor.name}</h1>
              <p className="text-xs text-slate-300 mt-1">{currentCounselor.specialization} • Direct Phone: {currentCounselor.phone}</p>
            </div>
          </div>

          {/* RBAC Counselor Switcher to test access restrictions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div>
              <label className="text-[10px] font-bold text-slate-300 uppercase block mb-1">Switch Active Counselor Profile (RBAC)</label>
              <select
                value={activeCounselorId}
                onChange={(e) => {
                  setActiveCounselorId(e.target.value);
                  const updatedAssigned = allStudentsList.filter(s => s.assignedCounselorId === e.target.value);
                  if (updatedAssigned.length > 0) {
                    setSelectedStudent(updatedAssigned[0]);
                  }
                  triggerNotice(`Switched to Counselor view: ${mockCounselors.find(c => c.id === e.target.value)?.name}`);
                }}
                className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                {mockCounselors.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.specialization})</option>
                ))}
              </select>
            </div>

            <div className="text-center px-3 border-l border-white/20">
              <span className="text-xl font-extrabold block text-emerald-300">{assignedStudents.length}</span>
              <span className="text-[10px] text-slate-300 font-semibold uppercase">Assigned Roster</span>
            </div>

            {setNavActiveTab && (
              <button
                onClick={() => setNavActiveTab('gmail')}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                title="Open Gmail Desk to email universities & students"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>Gmail Desk</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Status Alert Banner */}
      {statusNotification && (
        <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{statusNotification}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md font-mono">Firestore Updated</span>
        </div>
      )}

      {/* Counselor Portal Navigation Tabs */}
      <div className="bg-white p-2 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'students', label: `Assigned Students (${assignedStudents.length})`, icon: Users },
            { id: 'applications', label: `Applications Review (${assignedApplications.length})`, icon: Clock },
            { id: 'admission_letters', label: 'Issue Offer Letters', icon: FileText },
            { id: 'visa', label: 'Visa Tracking Desk', icon: Plane },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'chat', label: 'Live Student Chat', icon: MessageSquare },
            { id: 'notes', label: 'Internal Notes Ledger', icon: StickyNote },
            { id: 'notifications', label: `Notifications (${notifications.filter(n => !n.read).length})`, icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CounselorTab)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ASSIGNED STUDENTS (ISOLATED ROSTER) */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Strict Data Access Isolation:</strong> You are currently logged in as <strong>{currentCounselor.name}</strong>. Only students assigned directly to your counselor ID are visible in this view.
              </span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded-md text-[10px]">RBAC Active</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search assigned students by name or county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
            <span className="text-xs text-slate-500 font-bold">
              Showing {assignedStudents.length} assigned student profiles
            </span>
          </div>

          {assignedStudents.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">No Students Assigned</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No student profiles are currently mapped to {currentCounselor.name}. Use the counselor switch dropdown above or contact the Super Admin to assign student workloads.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {assignedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.county && s.county.toLowerCase().includes(searchTerm.toLowerCase()))).map((std) => (
                <div key={std.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center">
                        {std.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base">{std.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" /> {std.email}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                      Assigned to You
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Home Country / County</span>
                      <span className="font-bold text-slate-800">{std.county || 'Ghana'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Degree Level</span>
                      <span className="font-bold text-slate-800">{std.degreeLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Desired Field</span>
                      <span className="font-semibold text-slate-800 truncate block">{std.desiredMajor}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">WASSCE / Academic Score</span>
                      <span className="font-bold text-emerald-700">{std.gpa}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedStudent(std);
                        setActiveTab('notes');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <StickyNote className="w-3.5 h-3.5 text-slate-600" /> Internal Notes
                    </button>

                    <button
                      onClick={() => {
                        setSelectedChatStudentId(std.id);
                        setActiveTab('chat');
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Start Chat
                    </button>

                    <button
                      onClick={() => {
                        setSelectedStudent(std);
                        setShowAddLetterModal(true);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-600" /> Upload Letter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: APPLICATION REVIEW */}
      {activeTab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Assigned Student Applications</h3>
            {assignedApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  selectedApp?.id === app.id
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-slate-900">{app.studentName}</h4>
                  <span className="text-[10px] font-bold text-slate-500">{app.submittedDate}</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-1">{app.universityName}</p>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-700">{app.status}</span>
                  <span className="text-slate-400 font-mono">{app.trackingId}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{selectedApp.trackingId}</span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">{selectedApp.studentName}</h2>
                <p className="text-xs text-slate-500">{selectedApp.universityName} — {selectedApp.courseName}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl">
                {selectedApp.status}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="font-bold text-xs text-slate-900">Counselor Admission Status Actions</h4>
              <div className="flex flex-wrap gap-2">
                {(['Under Review', 'Conditional Offer', 'Unconditional Offer', 'Visa Processing', 'Approved'] as Application['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={async () => {
                      onUpdateAppStatus(selectedApp.id, st, `Status set to ${st} by counselor ${currentCounselor.name}`);
                      await saveApplicationToFirestore({ ...selectedApp, status: st });
                      setSelectedApp({ ...selectedApp, status: st });
                      triggerNotice(`Application status updated to "${st}" & saved to Firestore!`);
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition shadow-xs"
                  >
                    Set to "{st}"
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900">Application Internal Remarks</h4>
              <p className="text-xs text-slate-600 bg-amber-50/60 border border-amber-100 p-3 rounded-2xl italic">
                "{selectedApp.notes || 'Original transcripts verified against WAEC ledger. Recommended for 100% tuition waiver grant.'}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ISSUE ADMISSION LETTERS */}
      {activeTab === 'admission_letters' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Issue & Upload Official Admission Letters</h3>
              <p className="text-xs text-slate-500">Dispatch verified university offer letters directly to the student's document locker.</p>
            </div>
            <button
              onClick={() => setShowAddLetterModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Issue Offer Letter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedStudents.map((std) => (
              <div key={std.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{std.name}</h4>
                    <span className="text-[10px] text-slate-500">{std.county} • {std.degreeLevel}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-bold text-[10px] rounded-md">
                    Offer Pending
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-slate-100">
                  <div>Field: <span className="font-bold text-slate-800">{std.desiredMajor}</span></div>
                  <div>Target Institution: <span className="font-medium text-slate-800">Vellore Institute of Technology (VIT)</span></div>
                </div>

                <button
                  onClick={() => {
                    setSelectedStudent(std);
                    setShowAddLetterModal(true);
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Upload Official Admission Letter PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: VISA TRACKING DESK */}
      {activeTab === 'visa' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Student Visa & FRRO Process Desk</h3>
            <p className="text-xs text-slate-500">Update stage progress from Stage 1 (Doc Verification) to Stage 5 (FRRO & Onboarding).</p>
          </div>

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

      {/* TAB 5: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Counseling Appointments Schedule</h3>
              <p className="text-xs text-slate-500">Manage 1-on-1 virtual counseling sessions with assigned students.</p>
            </div>
            <button
              onClick={() => setShowAddApptModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Schedule New Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-slate-900">{apt.studentName}</h4>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                    {apt.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{apt.topic}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{apt.date} at {apt.time}</span>
                </div>
                {apt.meetingLink && (
                  <a 
                    href={apt.meetingLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block mt-2 px-3 py-1.5 bg-emerald-600 text-white font-bold text-[11px] rounded-xl hover:bg-emerald-700"
                  >
                    Join Google Meet Call
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: LIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border-r border-slate-100 pr-4 space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Select Student Thread</h4>
            {assignedStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedChatStudentId(s.id)}
                className={`p-3 rounded-2xl cursor-pointer border transition ${
                  selectedChatStudentId === s.id
                    ? 'bg-emerald-50 border-emerald-500 font-bold'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs text-slate-900 font-bold">{s.name}</div>
                <div className="text-[10px] text-slate-500">{s.county}</div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Direct Counselor Chat
            </h3>

            <div className="h-80 overflow-y-auto p-4 bg-slate-50 rounded-2xl space-y-3">
              {messagesList.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'counselor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs font-medium ${
                    msg.sender === 'counselor' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${
                      msg.sender === 'counselor' ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                placeholder="Type real-time message to student..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 7: INTERNAL NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Internal Counselor Confidential Notes</h3>
            <p className="text-xs text-slate-500">Log private observations, transcript verification notes, and visa comments (only visible to advisors & admins).</p>
          </div>

          <form onSubmit={handleAddNote} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Target Student</label>
                <select
                  value={selectedStudent.id}
                  onChange={(e) => {
                    const found = assignedStudents.find(s => s.id === e.target.value);
                    if (found) setSelectedStudent(found);
                  }}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                >
                  {assignedStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.county})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Category</label>
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="General">General Remark</option>
                  <option value="WASSCE Verification">WASSCE / Transcript Verification</option>
                  <option value="Visa">Visa & FRRO Process</option>
                  <option value="Financial">Financial Aid / Scholarship</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                placeholder="Type confidential note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Save Note to Firestore Ledger
            </button>
          </form>

          <div className="space-y-3">
            {notesList.filter(n => n.studentId === selectedStudent.id).map((note) => (
              <div key={note.id} className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[10px]">{note.category}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{note.date}</span>
                </div>
                <p className="text-xs text-slate-700 italic pt-1">"{note.note}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Counselor Real-Time Alert Feed</h3>
          
          <div className="divide-y divide-slate-100">
            {notifications.map((n) => (
              <div key={n.id} className="py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: SCHEDULE APPOINTMENT */}
      {showAddApptModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Schedule Student Counseling Session</h3>
              <button onClick={() => setShowAddApptModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Assigned Student</label>
                <select
                  value={newAppt.studentId}
                  onChange={(e) => setNewAppt({ ...newAppt, studentId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {assignedStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.county})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Meeting Topic</label>
                <input
                  type="text"
                  value={newAppt.topic}
                  onChange={(e) => setNewAppt({ ...newAppt, topic: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newAppt.date}
                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={newAppt.time}
                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl cursor-pointer shadow-md mt-2"
              >
                Dispatch Session Invite & Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ISSUE OFFER LETTER */}
      {showAddLetterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Issue Official Admission Offer</h3>
              <button onClick={() => setShowAddLetterModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadLetter} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Recipient</label>
                <div className="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-900">{selectedStudent.name} ({selectedStudent.county})</div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">University Name</label>
                <input
                  type="text"
                  value={letterUni}
                  onChange={(e) => setLetterUni(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Degree Program</label>
                <input
                  type="text"
                  value={letterCourse}
                  onChange={(e) => setLetterCourse(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Scholarship Award</label>
                <input
                  type="text"
                  value={letterGrant}
                  onChange={(e) => setLetterGrant(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl cursor-pointer shadow-md mt-2"
              >
                Generate & Upload Admission Letter PDF
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
