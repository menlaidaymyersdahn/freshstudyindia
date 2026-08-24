import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { StudyInIndiaSection } from './components/StudyInIndiaSection';
import { ServicesSection } from './components/ServicesSection';
import { ApplicationJourney } from './components/ApplicationJourney';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { AdmissionsPortal } from './components/AdmissionsPortal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { useDynamicSEO } from './hooks/useDynamicSEO';
import { NavTab } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [presetStudyField, setPresetStudyField] = useState<string | undefined>(undefined);
  const [isAdmissionsPortalOpen, setIsAdmissionsPortalOpen] = useState(false);

  // Sync activeTab with URL hash on initial load and on popstate/hashchange
  useEffect(() => {
    const parseHash = (): NavTab => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs: NavTab[] = [
        'home', 
        'study-in-india', 
        'services', 
        'universities', 
        'programs', 
        'about', 
        'why-us', 
        'process', 
        'contact'
      ];
      return validTabs.includes(hash as NavTab) ? (hash as NavTab) : 'home';
    };

    setActiveTab(parseHash());

    const handleHashChange = () => {
      setActiveTab(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic OpenGraph and Meta Description tags
  const getPageTitle = () => {
    if (presetStudyField) return `Study ${presetStudyField} in India | Myers Global Pathways`;
    switch (activeTab) {
      case 'study-in-india': return 'Study in India Guide | Myers Global Pathways';
      case 'services': return 'Our Advisory Services | Myers Global Pathways';
      case 'universities':
      case 'programs': return 'Academic Programs & Universities | Myers Global Pathways';
      case 'about':
      case 'why-us': return 'About Myers Global Pathways | International Admissions Advisory';
      case 'process': return 'Application Journey | Myers Global Pathways';
      case 'contact': return 'Contact Admissions Desks | Myers Global Pathways';
      default: return 'Myers Global Pathways | Your Pathway to Global Education';
    }
  };

  useDynamicSEO({
    title: getPageTitle(),
    description: 'Myers Global Pathways assists international students with university selection, admissions guidance, documentation, and the journey to studying in India.',
    image: '/og-image.svg'
  });

  const handleOpenApplication = (presetField?: string) => {
    setPresetStudyField(presetField);
    setIsAppModalOpen(true);
  };

  const handleCloseApplication = () => {
    setIsAppModalOpen(false);
    setPresetStudyField(undefined);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between">
      {/* 1. Header & Navigation */}
      <Navbar 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenApplication={() => handleOpenApplication()} 
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* 2. Main Tab View Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            onOpenApplication={(field) => handleOpenApplication(field)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'study-in-india' && (
          <div className="pt-20">
            <StudyInIndiaSection 
              onOpenApplication={(field) => handleOpenApplication(field)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="pt-20">
            <ServicesSection 
              onOpenApplication={(service) => handleOpenApplication(service)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {(activeTab === 'universities' || activeTab === 'programs') && (
          <div className="pt-20">
            <StudyInIndiaSection 
              onOpenApplication={(program) => handleOpenApplication(program)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {(activeTab === 'about' || activeTab === 'why-us') && (
          <div className="pt-20">
            <AboutSection 
              onOpenApplication={() => handleOpenApplication()}
              onNavigateHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {activeTab === 'process' && (
          <div className="pt-20">
            <ApplicationJourney 
              onOpenApplication={(step) => handleOpenApplication(step)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-20">
            <ContactSection 
              onNavigateHome={() => handleNavigate('home')}
              onOpenApplication={() => handleOpenApplication()}
            />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenApplication={() => handleOpenApplication()}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Modals & Interactive Overlays */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={handleCloseApplication}
        presetField={presetStudyField}
      />

      <AdmissionsPortal
        isOpen={isAdmissionsPortalOpen}
        onClose={() => setIsAdmissionsPortalOpen(false)}
      />

      <FloatingWhatsApp />
    </div>
  );
}

export default App;
