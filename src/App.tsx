import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  UserRole, 
  UserProfile,
  Application, 
  DocumentFile, 
  University, 
  Course, 
  Scholarship, 
  Testimonial, 
  BlogPost, 
  FAQItem, 
  VisaStatus, 
  SupportTicket, 
  ChatMessage, 
  PaymentRecord 
} from './types';
import { 
  mockApplications, 
  mockDocuments, 
  mockUniversities, 
  mockCourses, 
  mockScholarships, 
  mockTestimonials, 
  mockBlogPosts, 
  mockFAQs, 
  mockVisaStatus, 
  mockTickets, 
  mockChatMessages, 
  mockPayments 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { BentoHero } from './components/BentoHero';
import { CoursesView } from './components/CoursesView';
import { TestimonialsView } from './components/TestimonialsView';
import { BlogView } from './components/BlogView';
import { FAQView } from './components/FAQView';
import { ContactView } from './components/ContactView';
import { GalleryView } from './components/GalleryView';
import { LegalView } from './components/LegalView';
import { GmailView } from './components/GmailView';
import { StudentDashboard } from './components/StudentDashboard';
import { CounselorDashboard } from './components/CounselorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPortalView } from './components/LoginPortalView';
import { AuthModal } from './components/AuthModal';
import { ApplyNowModal } from './components/ApplyNowModal';
import { Footer } from './components/Footer';

// Firebase & Auth imports
import { 
  auth, 
  getUserProfileFromFirestore, 
  logoutFirebase,
  saveApplicationToFirestore, 
  fetchApplicationsFromFirestore, 
  saveDocumentToFirestore, 
  fetchDocumentsFromFirestore, 
  saveInquiryToFirestore 
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Lock, User, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalPortal, setAuthModalPortal] = useState<'student' | 'counselor' | 'admin'>('student');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Dynamic state store
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [documents, setDocuments] = useState<DocumentFile[]>(mockDocuments);
  const [universities, setUniversities] = useState<University[]>(mockUniversities);
  const [courses] = useState<Course[]>(mockCourses);
  const [scholarships] = useState<Scholarship[]>(mockScholarships);
  const [testimonials] = useState<Testimonial[]>(mockTestimonials);
  const [blogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [faqs] = useState<FAQItem[]>(mockFAQs);
  const [visaStatus, setVisaStatus] = useState<VisaStatus>(mockVisaStatus);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [payments] = useState<PaymentRecord[]>(mockPayments);

  // Sync auth state & User Profile with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        const profile = await getUserProfileFromFirestore(user.uid);
        if (profile) {
          setUserProfile(profile);
          setUserRole(profile.role);
        } else {
          let role: UserRole = 'student';
          if (user.email?.toLowerCase().includes('admin')) role = 'admin';
          else if (user.email?.toLowerCase().includes('counselor')) role = 'counselor';
          
          const newProfile: UserProfile = {
            id: user.uid,
            name: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            role,
            targetCountry: 'India'
          };
          setUserProfile(newProfile);
          setUserRole(role);
        }
      } else {
        setCurrentUserId(null);
        setUserProfile(null);
        setUserRole('guest');
        
        // Automatic Session Expiration or Logout Redirect:
        // If session expires or user logs out while viewing a protected dashboard, redirect to login portal
        setActiveTab((prevTab) => {
          if (prevTab === 'student-dashboard') {
            window.history.pushState({}, '', '/login');
            return 'student-login';
          } else if (prevTab === 'counselor-dashboard') {
            window.history.pushState({}, '', '/counselor/login');
            return 'counselor-login';
          } else if (prevTab === 'admin-dashboard') {
            window.history.pushState({}, '', '/admin/login');
            return 'admin-login';
          }
          return prevTab;
        });
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Protect dashboard routes for unauthenticated visitors
  useEffect(() => {
    if (authLoading) return;

    if (userRole === 'guest' || !currentUserId) {
      if (activeTab === 'student-dashboard') {
        setActiveTab('student-login');
        window.history.pushState({}, '', '/login');
      } else if (activeTab === 'counselor-dashboard') {
        setActiveTab('counselor-login');
        window.history.pushState({}, '', '/counselor/login');
      } else if (activeTab === 'admin-dashboard') {
        setActiveTab('admin-login');
        window.history.pushState({}, '', '/admin/login');
      }
    }
  }, [activeTab, userRole, currentUserId, authLoading]);

  // Sync URL Path Routing (/login, /admin/login, /counselor/login, dashboards, /apply, /about, /services, etc.)
  useEffect(() => {
    const syncRouteFromPath = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/login' || path === '/student/login' || path === '/student-login') {
        if (currentUserId && userRole === 'student') {
          setActiveTab('student-dashboard');
          window.history.replaceState({}, '', '/student-dashboard');
        } else {
          setActiveTab('student-login');
        }
      } else if (path === '/admin/login' || path === '/admin-login') {
        if (currentUserId && (userRole === 'admin' || userRole === 'superadmin' || userRole === 'super-admin')) {
          setActiveTab('admin-dashboard');
          window.history.replaceState({}, '', '/admin-dashboard');
        } else {
          setActiveTab('admin-login');
        }
      } else if (path === '/counselor/login' || path === '/counselor-login') {
        if (currentUserId && userRole === 'counselor') {
          setActiveTab('counselor-dashboard');
          window.history.replaceState({}, '', '/counselor-dashboard');
        } else {
          setActiveTab('counselor-login');
        }
      } else if (path === '/student-dashboard' || path === '/student/dashboard') {
        setActiveTab('student-dashboard');
      } else if (path === '/counselor-dashboard' || path === '/counselor/dashboard') {
        setActiveTab('counselor-dashboard');
      } else if (path === '/admin-dashboard' || path === '/admin/dashboard') {
        setActiveTab('admin-dashboard');
      } else if (path === '/universities' || path === '/scholarships') {
        setActiveTab('courses');
        window.history.replaceState({}, '', '/courses');
      } else if (path === '/courses') {
        setActiveTab('courses');
      } else if (path === '/testimonials') {
        setActiveTab('testimonials');
      } else if (path === '/blog') {
        setActiveTab('blog');
      } else if (path === '/gallery') {
        setActiveTab('gallery');
      } else if (path === '/gmail' || path === '/email' || path === '/inbox' || path === '/mail') {
        setActiveTab('gmail');
      } else if (path === '/faq' || path === '/faqs') {
        setActiveTab('faq');
      } else if (path === '/contact' || path === '/contact-us' || path === '/student-support') {
        setActiveTab('contact');
      } else if (path === '/privacy' || path === '/privacy-policy' || path === '/terms') {
        setActiveTab('privacy');
      } else if (path === '/apply' || path === '/how-to-apply') {
        setApplyModalOpen(true);
      } else if (path === '/about' || path === '/about-us' || path === '/services' || path === '/study-in-india') {
        setActiveTab('home');
      }
    };

    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, [currentUserId, userRole]);

  // Dynamic SEO Page Title & Meta Tags based on Active Tab
  useEffect(() => {
    const pageTitles: Record<ActiveTab, string> = {
      'home': 'Fresh Study India - Admissions & Academic Counseling',
      'universities': 'Course & Degree Programs | Fresh Study India',
      'courses': 'Course Database - B.Tech, MBBS, MBA, BSc, MCA in India | Fresh Study India',
      'scholarships': 'Course Database & Financial Planning | Fresh Study India',
      'gallery': 'Campus Life & Campus Gallery | Study in India Experience',
      'testimonials': 'Student Success Stories & Verified Alumni Reviews | Fresh Study India',
      'blog': 'Study in India Blog - Visa Guidance, Entrance Exams & Admission Advice',
      'faq': 'Frequently Asked Questions - Indian Admissions & Visa Processing',
      'contact': 'Contact Admissions Desk & Counseling Offices (New Delhi & Monrovia)',
      'privacy': 'Privacy Policy & Terms of Service | Fresh Study India',
      'gmail': 'Official Gmail Inbox & University Communications | Fresh Study India',
      'student-login': 'Student Portal Sign-In & Registration | Fresh Study India',
      'counselor-login': 'Counselor Desk Portal Sign-In | Fresh Study India',
      'admin-login': 'Administrator Console Sign-In | Fresh Study India',
      'student-dashboard': 'Student Portal - My Applications & Documents | Fresh Study India',
      'counselor-dashboard': 'Counselor Desk - Application Dossiers | Fresh Study India',
      'admin-dashboard': 'Administrator Console - Fresh Study India Management'
    };

    document.title = pageTitles[activeTab] || 'Fresh Study India - Admissions Platform';
  }, [activeTab]);
  useEffect(() => {
    const loadFirestoreData = async () => {
      // Don't attempt user-specific Firestore queries if guest or unauthenticated
      if (!currentUserId || userRole === 'guest') {
        return;
      }

      try {
        const isStaffUser = userRole === 'admin' || userRole === 'superadmin' || userRole === 'super-admin' || userRole === 'counselor';
        const filterStudentId = isStaffUser ? undefined : currentUserId;

        const firestoreApps = await fetchApplicationsFromFirestore(filterStudentId);
        if (firestoreApps.length > 0) {
          setApplications(prev => {
            const map = new Map();
            [...firestoreApps, ...prev].forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }

        const firestoreDocs = await fetchDocumentsFromFirestore(filterStudentId);
        if (firestoreDocs.length > 0) {
          setDocuments(prev => {
            const map = new Map();
            [...firestoreDocs, ...prev].forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('Could not load Firestore data:', err);
      }
    };

    loadFirestoreData();
  }, [currentUserId, userRole]);

  // Handlers
  const handleOpenAuthModal = (portal: 'student' | 'counselor' | 'admin' = 'student') => {
    setAuthModalPortal(portal);
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutFirebase();
      setUserRole('guest');
      setUserProfile(null);
      setCurrentUserId(null);
      setActiveTab('home');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleApplyForUniversity = async (uniName: string) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: currentUserId || 'st-1',
      studentName: auth.currentUser?.displayName || userProfile?.name || 'Student',
      universityName: uniName,
      courseName: 'General Undergraduate / Postgraduate Seat',
      degree: 'Bachelor',
      country: 'India',
      trackingId: `#FSI-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Submitted',
      progressPercentage: 25,
      submittedDate: new Date().toISOString().split('T')[0],
      intake: '2025 Admissions',
      notes: 'Initial registration verified. Routing to university admission desk.'
    };

    setApplications(prev => [newApp, ...prev]);

    try {
      await saveApplicationToFirestore(newApp);
    } catch (err) {
      console.error('Error saving application to Firestore:', err);
    }
  };

  const handleApplyForCourse = async (courseTitle: string, uniName: string) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: currentUserId || 'st-1',
      studentName: auth.currentUser?.displayName || userProfile?.name || 'Student',
      universityName: uniName,
      courseName: courseTitle,
      degree: 'Bachelor / Master',
      country: 'India',
      trackingId: `#FSI-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Submitted',
      progressPercentage: 30,
      submittedDate: new Date().toISOString().split('T')[0],
      intake: '2025 Admissions',
      notes: 'Course preference logged in Firestore. Review in progress.'
    };

    setApplications(prev => [newApp, ...prev]);

    try {
      await saveApplicationToFirestore(newApp);
    } catch (err) {
      console.error('Error saving course application to Firestore:', err);
    }
  };

  const handleApplyScholarship = (title: string) => {
    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: `Scholarship Application Intent: ${title}`,
      category: 'Scholarships',
      priority: 'High',
      status: 'In Progress',
      createdAt: new Date().toISOString().split('T')[0],
      messages: [
        { sender: 'Student', text: `Hi! I would like to apply for ${title}. Please verify my credentials.`, timestamp: 'Just now' },
        { sender: 'FSI Counselor', text: 'Application intent logged! Your scholarship counselor will get in touch shortly.', timestamp: 'Just now' }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleUploadDocument = async (doc: DocumentFile) => {
    setDocuments(prev => [doc, ...prev]);
    try {
      await saveDocumentToFirestore(doc, currentUserId || 'guest-student');
    } catch (err) {
      console.error('Error saving document to Firestore:', err);
    }
  };

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const counselorMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'counselor',
        text: `Thanks for reaching out! Dr. Rajesh Sharma has received your message regarding "${text.slice(0, 30)}..." and will assist you.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, counselorMsg]);
    }, 1000);
  };

  const handleCreateTicket = (subject: string, category: string, priority: 'Low' | 'Medium' | 'High' | 'Urgent') => {
    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      messages: [
        { sender: 'Student', text: subject, timestamp: 'Just now' }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: Application['status'], newNotes?: string) => {
    let updatedApp: Application | null = null;
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        let progress = app.progressPercentage;
        if (newStatus === 'Under Review') progress = 50;
        if (newStatus === 'Unconditional Offer') progress = 70;
        if (newStatus === 'Visa Processing') progress = 85;
        if (newStatus === 'Approved') progress = 100;

        updatedApp = {
          ...app,
          status: newStatus,
          progressPercentage: progress,
          notes: newNotes !== undefined ? newNotes : app.notes
        };
        return updatedApp;
      }
      return app;
    }));

    if (updatedApp) {
      try {
        await saveApplicationToFirestore(updatedApp);
      } catch (err) {
        console.error('Error updating application status in Firestore:', err);
      }
    }
  };

  const handleAddUniversity = (uni: University) => {
    setUniversities(prev => [uni, ...prev]);
  };

  const handleContactAdminSubmit = async (
    name: string, 
    phone: string, 
    email: string, 
    county: string, 
    courseLevel: string, 
    desiredCourse: string, 
    message: string
  ) => {
    try {
      await saveInquiryToFirestore({
        name,
        email,
        phone,
        county,
        courseLevel,
        desiredCourse,
        message,
        studentId: currentUserId || undefined
      });
    } catch (err) {
      console.error('Error saving contact inquiry to Firestore:', err);
    }
  };

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') {
      setActiveTab('admin-dashboard');
    } else if (role === 'counselor') {
      setActiveTab('counselor-dashboard');
    } else {
      setActiveTab('student-dashboard');
    }
  };

  // Reusable Route Guard Component
  const ProtectedGuard = ({ 
    portalTitle, 
    requiredPortal, 
    description 
  }: { 
    portalTitle: string; 
    requiredPortal: 'student' | 'counselor' | 'admin'; 
    description: string;
  }) => {
    if (authLoading) {
      return (
        <div className="max-w-lg mx-auto my-16 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Authenticating session with Firebase...</p>
        </div>
      );
    }

    const isUnauthorizedLoggedInUser = userRole !== 'guest' && userRole !== requiredPortal && userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'super-admin';
    const loginRoutePath = requiredPortal === 'admin' ? '/admin/login' : requiredPortal === 'counselor' ? '/counselor/login' : '/login';
    const loginTab: ActiveTab = requiredPortal === 'admin' ? 'admin-login' : requiredPortal === 'counselor' ? 'counselor-login' : 'student-login';

    return (
      <div className="max-w-lg mx-auto my-16 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
        {isUnauthorizedLoggedInUser ? (
          <>
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-200 dark:border-red-800">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Access Denied</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Your account (<span className="font-bold text-slate-800 dark:text-slate-200">{userProfile?.email}</span>) is assigned the <span className="font-extrabold uppercase text-emerald-600">{userRole}</span> role and does not have permission to access the {portalTitle}.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (userRole === 'student') {
                    setActiveTab('student-dashboard');
                    window.history.pushState({}, '', '/student-dashboard');
                  } else if (userRole === 'counselor') {
                    setActiveTab('counselor-dashboard');
                    window.history.pushState({}, '', '/counselor-dashboard');
                  } else {
                    setActiveTab('admin-dashboard');
                    window.history.pushState({}, '', '/admin-dashboard');
                  }
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer"
              >
                Go to My Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 font-bold rounded-2xl text-xs transition cursor-pointer"
              >
                Sign Out to Switch
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Protected Portal Access</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              {description}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab(loginTab);
                  window.history.pushState({}, '', loginRoutePath);
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer inline-flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In at {loginRoutePath}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900 transition-colors">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        userProfile={userProfile}
        openAuthModal={handleOpenAuthModal}
        openApplyModal={() => setApplyModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'home' && (
          <BentoHero 
            setActiveTab={setActiveTab} 
            openApplyModal={() => setApplyModalOpen(true)} 
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            setActiveTab={setActiveTab}
            onApplyForCourse={handleApplyForCourse}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsView testimonials={testimonials} />
        )}

        {activeTab === 'blog' && (
          <BlogView posts={blogPosts} blogPosts={blogPosts} />
        )}

        {activeTab === 'faq' && (
          <FAQView faqs={faqs} />
        )}

        {activeTab === 'contact' && (
          <ContactView 
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'privacy' && (
          <LegalView />
        )}

        {activeTab === 'gmail' && (
          <GmailView 
            userProfile={userProfile}
            onConnectSuccess={(user) => {
              // Update user profile if needed
              if (!userProfile) {
                setUserProfile({
                  id: user.uid,
                  name: user.displayName || user.email?.split('@')[0] || 'User',
                  email: user.email || '',
                  role: 'student',
                  targetCountry: 'India'
                });
              }
            }}
          />
        )}

        {/* LOGIN ROUTES (/login, /counselor/login, /admin/login) */}
        {activeTab === 'student-login' && (
          <LoginPortalView
            portal="student"
            onLoginSuccess={handleLoginSuccess}
            setActiveTab={setActiveTab}
            userRole={userRole}
            userProfile={userProfile}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'counselor-login' && (
          <LoginPortalView
            portal="counselor"
            onLoginSuccess={handleLoginSuccess}
            setActiveTab={setActiveTab}
            userRole={userRole}
            userProfile={userProfile}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'admin-login' && (
          <LoginPortalView
            portal="admin"
            onLoginSuccess={handleLoginSuccess}
            setActiveTab={setActiveTab}
            userRole={userRole}
            userProfile={userProfile}
            onLogout={handleLogout}
          />
        )}

        {/* PROTECTED STUDENT DASHBOARD ROUTE */}
        {activeTab === 'student-dashboard' && (
          userRole === 'student' || userRole === 'admin' || userRole === 'superadmin' || userRole === 'super-admin' ? (
            <StudentDashboard
              applications={applications}
              documents={documents}
              visaStatus={visaStatus}
              tickets={tickets}
              chatMessages={chatMessages}
              payments={payments}
              userProfile={userProfile}
              onUploadDocument={handleUploadDocument}
              onSendMessage={handleSendMessage}
              onCreateTicket={handleCreateTicket}
              setActiveTab={setActiveTab}
              onProfileUpdate={(updated) => setUserProfile(updated)}
            />
          ) : (
            <ProtectedGuard 
              portalTitle="Student Portal" 
              requiredPortal="student" 
              description="Please sign in with your student account to view university application status, uploaded credentials, and visa progress."
            />
          )
        )}

        {/* PROTECTED COUNSELOR DASHBOARD ROUTE */}
        {activeTab === 'counselor-dashboard' && (
          userRole === 'counselor' || userRole === 'admin' || userRole === 'superadmin' || userRole === 'super-admin' ? (
            <CounselorDashboard
              applications={applications}
              documents={documents}
              tickets={tickets}
              chatMessages={chatMessages}
              onUpdateAppStatus={handleUpdateAppStatus}
              onSendMessage={handleSendMessage}
              setActiveTab={setActiveTab}
            />
          ) : (
            <ProtectedGuard 
              portalTitle="Counselor Desk" 
              requiredPortal="counselor" 
              description="Counselor Desk access requires staff authentication. Please log in with counselor credentials to review student dossiers."
            />
          )
        )}

        {/* PROTECTED ADMIN DASHBOARD ROUTE */}
        {activeTab === 'admin-dashboard' && (
          userRole === 'admin' || userRole === 'superadmin' || userRole === 'super-admin' ? (
            <AdminDashboard
              applications={applications}
              documents={documents}
              universities={universities}
              tickets={tickets}
              userRole={userRole}
              userProfile={userProfile}
              onUpdateAppStatus={handleUpdateAppStatus}
              onAddUniversity={handleAddUniversity}
              setActiveTab={setActiveTab}
            />
          ) : (
            <ProtectedGuard 
              portalTitle="Administrator Console" 
              requiredPortal="admin" 
              description="Super Admin Console is restricted to system administrators. Please sign in with administrator credentials."
            />
          )
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} openAuthModal={handleOpenAuthModal} />

      {/* Auth Modal (Firebase Login, Register, Verification, Reset) */}
      <AuthModal
        isOpen={authModalOpen}
        initialPortal={authModalPortal}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Apply Now Modal (Save to Firestore) */}
      <ApplyNowModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onContactAdminSubmit={handleContactAdminSubmit}
        onUploadDocument={handleUploadDocument}
        onCreateTicket={handleCreateTicket}
        onLoginSuccess={handleLoginSuccess}
        setActiveTab={setActiveTab}
      />

      {/* Floating WhatsApp Quick Chat Badge */}
      <a
        href="https://wa.me/231889425645?text=Hello%20Fresh%20Study%20India%20Counselor,%20I%20would%20like%20to%20inquire%20about%20university%20admissions%20and%20scholarships."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group border-2 border-white/20"
        title="Chat live on WhatsApp with Fresh Study India (+231 889425645)"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
        </div>
        <span className="text-xs font-extrabold hidden sm:inline-block tracking-tight">WhatsApp Helpdesk</span>
      </a>
    </div>
  );
}
