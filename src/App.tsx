import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyUs } from './components/WhyUs';
import { AfricaToIndia } from './components/AfricaToIndia';
import { StudyOptions } from './components/StudyOptions';
import { BigCTA } from './components/BigCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { PrivacyModal } from './components/PrivacyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [presetStudyField, setPresetStudyField] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleOpenApplication = (presetField?: string) => {
    setPresetStudyField(presetField);
    setIsAppModalOpen(true);
  };

  const handleCloseApplication = () => {
    setIsAppModalOpen(false);
    setPresetStudyField(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#0B192C] selection:bg-sky-500 selection:text-white font-sans antialiased">
      {/* Top Fixed Header & Navigation */}
      <Navbar onOpenApplication={() => handleOpenApplication()} />

      {/* Main Page Flow */}
      <main>
        {/* 1. Visually Powerful Hero Section */}
        <Hero onOpenApplication={() => handleOpenApplication()} />

        {/* 2. Quick Trust Bar */}
        <TrustBar />

        {/* 3. The Journey (From Home to Campus) */}
        <JourneyTimeline onOpenApplication={(step) => handleOpenApplication(step ? `Stage: ${step}` : undefined)} />

        {/* 4. What We Actually Help With (4 Large Visual Services) */}
        <ServicesGrid onOpenApplication={(service) => handleOpenApplication(service)} />

        {/* 5. Why Fresh Study India (Deep Navy High-Contrast Section) */}
        <WhyUs onOpenApplication={() => handleOpenApplication()} />

        {/* 6. Africa -> India Route Section */}
        <AfricaToIndia onOpenApplication={() => handleOpenApplication()} />

        {/* 7. Featured Study Options (Interactive Stream Picker) */}
        <StudyOptions onSelectOption={(field) => handleOpenApplication(field)} />

        {/* 8. The Big Call to Action */}
        <BigCTA onOpenApplication={() => handleOpenApplication()} />

        {/* 9. Direct Contact & Enquiry Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenApplication={() => handleOpenApplication()}
      />

      {/* Express Application & Consultation Modal */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={handleCloseApplication}
        presetField={presetStudyField}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Floating Direct WhatsApp Access */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
