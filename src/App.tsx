import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EditorialTrustIntro } from './components/EditorialTrustIntro';
import { WhyStudyInIndia } from './components/WhyStudyInIndia';
import { StudyInIndiaExplorer } from './components/StudyInIndiaExplorer';
import { ServicesSection } from './components/ServicesSection';
import { ApplicationJourney } from './components/ApplicationJourney';
import { AboutSection } from './components/AboutSection';
import { ApplicationCTA } from './components/ApplicationCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdmissionsAdvisorChat } from './components/AdmissionsAdvisorChat';
import { ServiceItem } from './types';

export function App() {
  // Modal States
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  
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
      // It's a ServiceItem
      setApplicationPreset({
        course: preset.title
      });
    } else if (preset) {
      setApplicationPreset(preset);
    } else {
      setApplicationPreset(undefined);
    }
    setIsApplicationOpen(true);
  };

  const handleOpenStudentPortal = (trackingId?: string) => {
    if (trackingId) {
      setActiveTrackingId(trackingId);
    }
    setIsStudentPortalOpen(true);
  };

  const handleScrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Sticky Editorial Navigation */}
      <Navbar
        onOpenApplication={() => handleOpenApplication()}
        onOpenStudentPortal={() => handleOpenStudentPortal()}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Cinematic Editorial with high-res photography, NO 3D) */}
        <Hero
          onOpenApplication={() => handleOpenApplication()}
          onExploreClick={() => handleScrollToSection('#why-india')}
        />

        {/* 3. Editorial Trust Introduction */}
        <EditorialTrustIntro
          onOpenApplication={() => handleOpenApplication()}
          onExploreServices={() => handleScrollToSection('#services')}
        />

        {/* 4. Why Study in India */}
        <WhyStudyInIndia
          onOpenApplication={() => handleOpenApplication()}
        />

        {/* 5. Study in India Explorer */}
        <StudyInIndiaExplorer
          onOpenApplication={(preset) => handleOpenApplication(preset)}
          onContactAdmissions={() => handleScrollToSection('#contact')}
        />

        {/* 6. How We Help (01 to 08 Interactive Editorial Services Master-Detail) */}
        <ServicesSection
          onOpenApplication={(service) => handleOpenApplication(service)}
        />

        {/* 7. Application Journey (7-Step Visual Timeline) */}
        <ApplicationJourney
          onOpenApplication={() => handleOpenApplication()}
        />

        {/* 8. About Myers Global Pathways (Core Principles) */}
        <AboutSection />

        {/* 9. Start Your Application Callout */}
        <ApplicationCTA
          onOpenApplication={() => handleOpenApplication()}
          onContactClick={() => handleScrollToSection('#contact')}
        />

        {/* 10. Contact Section & Official Email Directory */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenApplication={() => handleOpenApplication()}
        onOpenStudentPortal={() => handleOpenStudentPortal()}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Interactive Modals */}
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

      <AdminDashboardModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Floating WhatsApp Action Trigger */}
      <WhatsAppFloatingButton />

      {/* Discreet AI Admissions Counselor Drawer */}
      <AdmissionsAdvisorChat 
        onOpenApplication={() => handleOpenApplication()}
      />

    </div>
  );
}

export default App;
