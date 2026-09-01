import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CursorRingField } from './components/CursorRingField';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdmissionsAdvisorChat } from './components/AdmissionsAdvisorChat';
import { ApplicationModal } from './components/ApplicationModal';
import { StudentPortalModal } from './components/StudentPortalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { StudyInIndiaPage } from './pages/StudyInIndiaPage';
import { ServicesPage } from './pages/ServicesPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { AdminPage } from './pages/AdminPage';
import { ServiceItem } from './types';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore path if redirected from 404 static fallback
  useEffect(() => {
    try {
      const redirectPath = sessionStorage.getItem('mgp_redirect_path');
      if (redirectPath) {
        sessionStorage.removeItem('mgp_redirect_path');
        if (redirectPath !== '/' && redirectPath !== location.pathname) {
          navigate(redirectPath, { replace: true });
        }
      }
    } catch (_) {}
  }, [navigate, location.pathname]);

  // Modal States
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  
  // Application Modal Preset
  const [applicationPreset, setApplicationPreset] = useState<{
    studyLevel?: string;
    field?: string;
    course?: string;
  } | undefined>(undefined);

  // Active tracking reference for portal redirect
  const [activeTrackingId, setActiveTrackingId] = useState<string | undefined>(undefined);

  const handleOpenApplication = (preset?: { studyLevel?: string; field?: string; course?: string } | ServiceItem) => {
    if (preset && 'title' in preset) {
      setApplicationPreset({ course: preset.title });
      navigate(`/apply?course=${encodeURIComponent(preset.title)}`);
    } else if (preset && !('title' in preset)) {
      setApplicationPreset(preset);
      const params = new URLSearchParams();
      if (preset.course) params.set('course', preset.course);
      if (preset.studyLevel) params.set('level', preset.studyLevel);
      navigate(`/apply?${params.toString()}`);
    } else {
      setApplicationPreset(undefined);
      navigate('/apply');
    }
  };

  const handleOpenStudentPortal = (trackingId?: string) => {
    if (trackingId) {
      setActiveTrackingId(trackingId);
      navigate(`/student-portal?trackingId=${encodeURIComponent(trackingId)}`);
    } else {
      navigate('/student-portal');
    }
  };

  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-[#EBF3FC] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 relative">
      
      {/* Scroll restoration on route changes */}
      <ScrollToTop />

      {/* Dynamic Cursor Ring Field Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
        <CursorRingField
          background="transparent"
          colors={["#38bdf8", "#3b82f6", "#1d4ed8", "#60a5fa", "#0369a1"]}
          density={260}
          dotSize={115}
          speed={6}
          ring={{ push: 45, width: 10, radius: 14, turbulence: 60 }}
        />
      </div>

      {/* 1. Header Navigation Bar (Hidden on full-screen Admin page) */}
      {!isAdminRoute && (
        <Navbar
          onOpenApplication={() => handleOpenApplication()}
        />
      )}

      {/* 2. Main Dedicated Viewport with Clean Routes */}
      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route 
            path="/" 
            element={<HomePage onOpenApplication={handleOpenApplication} />} 
          />

          {/* Study in India */}
          <Route 
            path="/study-in-india" 
            element={<StudyInIndiaPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/study-in-india/*" 
            element={<StudyInIndiaPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* Services */}
          <Route 
            path="/services" 
            element={<ServicesPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/services/*" 
            element={<ServicesPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* Universities */}
          <Route 
            path="/universities" 
            element={<UniversitiesPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/universities/*" 
            element={<UniversitiesPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* FAQ */}
          <Route 
            path="/faq" 
            element={<FAQPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/faq/*" 
            element={<FAQPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* About */}
          <Route 
            path="/about" 
            element={<AboutPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/about/*" 
            element={<AboutPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* Contact */}
          <Route 
            path="/contact" 
            element={<ContactPage onOpenApplication={handleOpenApplication} />} 
          />
          <Route 
            path="/contact/*" 
            element={<ContactPage onOpenApplication={handleOpenApplication} />} 
          />

          {/* Apply Portal & Common Direct Links */}
          <Route 
            path="/apply" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/apply/*" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/Apply" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/Apply/*" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/apply-now" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/apply-now/*" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/application" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/application/*" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/applications" 
            element={<ApplyPage />} 
          />
          <Route 
            path="/applications/*" 
            element={<ApplyPage />} 
          />

          {/* Student Portal & Tracking */}
          <Route 
            path="/student-portal" 
            element={<StudentPortalPage />} 
          />
          <Route 
            path="/student-portal/*" 
            element={<StudentPortalPage />} 
          />
          <Route 
            path="/portal" 
            element={<StudentPortalPage />} 
          />
          <Route 
            path="/portal/*" 
            element={<StudentPortalPage />} 
          />
          <Route 
            path="/track" 
            element={<StudentPortalPage />} 
          />
          <Route 
            path="/track/*" 
            element={<StudentPortalPage />} 
          />

          {/* Admin Management */}
          <Route 
            path="/admin" 
            element={<AdminPage />} 
          />
          <Route 
            path="/admin/*" 
            element={<AdminPage />} 
          />

          {/* Fallback redirect */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </main>

      {/* 3. Footer (Hidden on full-screen Admin page) */}
      {!isAdminRoute && (
        <Footer
          onOpenApplication={() => handleOpenApplication()}
        />
      )}

      {/* Interactive Quick Modals (for seamless popups if triggered) */}
      <ApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        presetData={applicationPreset}
        onSuccessRedirect={(trackingId) => {
          setIsApplicationOpen(false);
          handleOpenStudentPortal(trackingId);
        }}
      />

      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        initialTrackingId={activeTrackingId}
        onOpenNewApplication={() => {
          setIsStudentPortalOpen(false);
          handleOpenApplication();
        }}
      />

      {/* Floating WhatsApp Action Trigger */}
      {!isAdminRoute && <WhatsAppFloatingButton />}

      {/* AI Admissions Counselor Drawer */}
      {!isAdminRoute && (
        <AdmissionsAdvisorChat 
          onOpenApplication={() => handleOpenApplication()}
        />
      )}

    </div>
  );
}

export default App;
