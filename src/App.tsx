import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudyInIndia } from './components/StudyInIndia';
import { ServicesSection } from './components/ServicesSection';
import { StudyPrograms } from './components/StudyPrograms';
import { WhyUs } from './components/WhyUs';
import { ApplicationProcess } from './components/ApplicationProcess';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ShareModal } from './components/ShareModal';
import { AdmissionsPortal } from './components/AdmissionsPortal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { useDynamicSEO } from './hooks/useDynamicSEO';

export function App() {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [presetStudyField, setPresetStudyField] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAdmissionsPortalOpen, setIsAdmissionsPortalOpen] = useState(false);

  // Dynamic OpenGraph and Meta Description tags
  useDynamicSEO({
    title: presetStudyField 
      ? `Study ${presetStudyField} in India | Myers Global Pathways`
      : 'Myers Global Pathways | International Admissions Advisory for India',
    description: presetStudyField
      ? `Explore accredited Indian universities for ${presetStudyField}. Complete admissions, document verification, visa guidance, and arrival support.`
      : 'Myers Global Pathways assists international students with university selection, admissions guidance, documentation, and the journey to studying in India.',
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
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar 
        onOpenApplication={() => handleOpenApplication()} 
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="overflow-hidden">
        {/* 2. Hero Section */}
        <Hero onOpenApplication={() => handleOpenApplication()} />

        {/* 3. Why Study in India */}
        <StudyInIndia onOpenApplication={() => handleOpenApplication()} />

        {/* 4. Services (Clean Editorial Layout) */}
        <ServicesSection onOpenApplication={(service) => handleOpenApplication(service)} />

        {/* 5. Degree Programs (Scalable Academic Opportunities) */}
        <StudyPrograms onSelectProgram={(program) => handleOpenApplication(program)} />

        {/* 6. Why Us (Trustworthy, Zero-Falsehood Guidance) */}
        <WhyUs onOpenApplication={() => handleOpenApplication()} />

        {/* 7. Application Process (8-Step Linear Pathway) */}
        <ApplicationProcess onOpenApplication={(step) => handleOpenApplication(step)} />

        {/* 8. Contact Section (Official Emails, WhatsApp & Form) */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer 
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenApplication={() => handleOpenApplication()}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Modals & Utilities */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={handleCloseApplication}
        presetField={presetStudyField}
      />

      <AdmissionsPortal
        isOpen={isAdmissionsPortalOpen}
        onClose={() => setIsAdmissionsPortalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        customTitle={presetStudyField ? `Study ${presetStudyField} in India with Myers Global Pathways` : undefined}
      />

      <FloatingWhatsApp />
    </div>
  );
}

export default App;
