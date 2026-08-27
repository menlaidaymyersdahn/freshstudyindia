import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EditorialTrustIntro } from './components/EditorialTrustIntro';
import { HomeFeatureHub } from './components/HomeFeatureHub';
import { WhyStudyInIndia } from './components/WhyStudyInIndia';
import { StudyInIndiaExplorer } from './components/StudyInIndiaExplorer';
import { ServicesSection } from './components/ServicesSection';
import { ApplicationJourney } from './components/ApplicationJourney';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { ApplicationCTA } from './components/ApplicationCTA';
import { ContactSection } from './components/ContactSection';
import { PageHeader } from './components/PageHeader';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdmissionsAdvisorChat } from './components/AdmissionsAdvisorChat';
import { ServiceItem, NavTab } from './types';

// Map URL hash to Tab
function getTabFromHash(): NavTab {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'services') return 'services';
  if (hash === 'study-in-india' || hash === 'why-india' || hash === 'india') return 'study-in-india';
  if (hash === 'universities' || hash === 'explorer' || hash === 'courses') return 'universities';
  if (hash === 'faq' || hash === 'faqs') return 'faq';
  if (hash === 'about') return 'about';
  if (hash === 'contact') return 'contact';
  return 'home';
}

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>(getTabFromHash());

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

  // Sync hash change
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash();
      setActiveTab(tab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenApplication={() => handleOpenApplication()}
        onOpenStudentPortal={() => handleOpenStudentPortal()}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* 2. Main Dedicated Viewport Based on Active Tab */}
      <main className="flex-1">

        {/* ========================================================================= */}
        {/* PAGE 1: HOME */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <Hero
              onOpenApplication={() => handleOpenApplication()}
              onExploreStudyInIndia={() => handleSelectTab('study-in-india')}
              onExploreServices={() => handleSelectTab('services')}
            />

            {/* Editorial Trust Intro */}
            <EditorialTrustIntro
              onOpenApplication={() => handleOpenApplication()}
              onExploreServices={() => handleSelectTab('services')}
            />

            {/* Home Dedicated Navigation Hub Cards */}
            <HomeFeatureHub
              onSelectTab={handleSelectTab}
              onOpenApplication={() => handleOpenApplication()}
            />

            {/* Application CTA Banner */}
            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: STUDY IN INDIA */}
        {/* ========================================================================= */}
        {activeTab === 'study-in-india' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="Destination & Academic Landscape"
              title="Why Study Higher Education in"
              highlightedWord="India"
              description="India offers world-class academic rigor, recognized degrees, state-of-the-art technological hubs, and an affordable pathway to international career success."
              currentPage="Study in India"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <WhyStudyInIndia
              onOpenApplication={() => handleOpenApplication()}
            />

            <StudyInIndiaExplorer
              onOpenApplication={(preset) => handleOpenApplication(preset)}
              onContactAdmissions={() => handleSelectTab('contact')}
            />

            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: SERVICES */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="01 to 08 Core Advisory Services"
              title="Our Complete End-to-End"
              highlightedWord="Services"
              description="Personalized guidance from your initial program discovery and documentation to university admission letters, student visas, and campus settlement in India."
              currentPage="Services"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <ServicesSection
              onOpenApplication={(service) => handleOpenApplication(service)}
            />

            <ApplicationJourney
              onOpenApplication={() => handleOpenApplication()}
            />

            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: UNIVERSITIES & COURSES EXPLORER */}
        {/* ========================================================================= */}
        {activeTab === 'universities' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="Course & University Finder"
              title="Explore Recognized Degrees &"
              highlightedWord="Universities"
              description="Find the right academic match among top accredited universities in India across Engineering, Health Sciences, Business, IT, and Law."
              currentPage="Universities"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <StudyInIndiaExplorer
              onOpenApplication={(preset) => handleOpenApplication(preset)}
              onContactAdmissions={() => handleSelectTab('contact')}
            />

            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: FAQ (FREQUENTLY ASKED QUESTIONS) */}
        {/* ========================================================================= */}
        {activeTab === 'faq' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="Admissions & Visa Knowledge Base"
              title="Frequently Asked"
              highlightedWord="Questions"
              description="Clear answers regarding academic entry qualifications, English proficiency (no IELTS needed for English medium), tuition costs, and Indian student visas."
              currentPage="Frequently Asked Questions (FAQ)"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <FAQSection
              onOpenApplication={() => handleOpenApplication()}
            />

            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: ABOUT US */}
        {/* ========================================================================= */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="Our Vision & Leadership"
              title="About Myers Global"
              highlightedWord="Pathways"
              description="Founded by Menlaiday Myers, Myers Global Pathways provides personalized, transparent guidance for international students pursuing higher education in India."
              currentPage="About Us"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <AboutSection />

            <ApplicationCTA
              onOpenApplication={() => handleOpenApplication()}
              onContactClick={() => handleSelectTab('contact')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: CONTACT US */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <PageHeader
              badge="Official Admissions Desk"
              title="Contact Myers Global"
              highlightedWord="Pathways"
              description="Connect directly with our admissions counselors via WhatsApp (+231 889425645), official email directory, or submit an enquiry form."
              currentPage="Contact Us"
              onNavigateHome={() => handleSelectTab('home')}
              onOpenApplication={() => handleOpenApplication()}
              bgImage="/DSC_9367.jpeg"
            />

            <ContactSection />
          </div>
        )}

      </main>

      {/* 3. Footer */}
      <Footer
        onSelectTab={handleSelectTab}
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

      {/* AI Admissions Counselor Drawer */}
      <AdmissionsAdvisorChat 
        onOpenApplication={() => handleOpenApplication()}
      />

    </div>
  );
}

export default App;
