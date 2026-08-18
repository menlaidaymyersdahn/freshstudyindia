import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FutureHeroBanner } from './components/FutureHeroBanner';
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
import { ShareModal } from './components/ShareModal';
import { AdmissionsPortal } from './components/AdmissionsPortal';
import { ScrollReveal } from './components/ScrollReveal';
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
      ? `Study ${presetStudyField} in India | Fresh Study India Admissions`
      : 'Fresh Study India | Study in India — International Admissions & Student Advisory',
    description: presetStudyField
      ? `Explore top accredited Indian universities for ${presetStudyField}. Complete admissions, visa filing, and arrival support with Fresh Study India.`
      : 'Helping students from Africa and around the world study in India. Dedicated guidance for university admissions, student visas, accommodation, and airport arrival assistance.',
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
    <div className="min-h-screen bg-[#F4F8FC] text-[#0B192C] selection:bg-sky-500 selection:text-white font-sans antialiased">
      {/* Top Fixed Header & Navigation */}
      <Navbar 
        onOpenApplication={() => handleOpenApplication()} 
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="overflow-hidden">
        {/* 1. Visually Powerful Hero Section */}
        <Hero onOpenApplication={() => handleOpenApplication()} />

        {/* 2. Visual Convocation Feature Section: YOUR FUTURE STARTS HERE */}
        <ScrollReveal>
          <FutureHeroBanner onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 3. Quick Trust Bar */}
        <ScrollReveal delay={50}>
          <TrustBar />
        </ScrollReveal>

        {/* 4. The Journey (From Home to Campus) */}
        <ScrollReveal delay={50}>
          <JourneyTimeline onOpenApplication={(step) => handleOpenApplication(step ? `Stage: ${step}` : undefined)} />
        </ScrollReveal>

        {/* 5. What We Actually Help With (4 Large Visual Services) */}
        <ScrollReveal delay={50}>
          <ServicesGrid onOpenApplication={(service) => handleOpenApplication(service)} />
        </ScrollReveal>

        {/* 6. Why Fresh Study India (Deep Navy High-Contrast Section) */}
        <ScrollReveal delay={50}>
          <WhyUs onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 7. Africa -> India Route Section */}
        <ScrollReveal delay={50}>
          <AfricaToIndia onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 8. Featured Study Options (Interactive Stream Picker) */}
        <ScrollReveal delay={50}>
          <StudyOptions onSelectOption={(field) => handleOpenApplication(field)} />
        </ScrollReveal>

        {/* 9. The Big Call to Action */}
        <ScrollReveal delay={50}>
          <BigCTA onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 10. Direct Contact & Enquiry Section */}
        <ScrollReveal delay={50}>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenApplication={() => handleOpenApplication()}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Express Application & Consultation Modal */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={handleCloseApplication}
        presetField={presetStudyField}
      />

      {/* Admissions Management & Document Verification Portal */}
      <AdmissionsPortal
        isOpen={isAdmissionsPortalOpen}
        onClose={() => setIsAdmissionsPortalOpen(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Social Share & OpenGraph Preview Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        customTitle={presetStudyField ? `Study ${presetStudyField} in India with Fresh Study India` : undefined}
      />

      {/* Floating Direct WhatsApp Access */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
