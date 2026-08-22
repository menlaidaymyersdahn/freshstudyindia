import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AdmissionsOverview } from './components/AdmissionsOverview';
import { JourneyTimeline } from './components/JourneyTimeline';
import { StudyOptions } from './components/StudyOptions';
import { EligibilityChecker } from './components/EligibilityChecker';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyUs } from './components/WhyUs';
import { AfricaToIndia } from './components/AfricaToIndia';
import { PhotoGallery } from './components/PhotoGallery';
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
  const [activeCourseForEligibility, setActiveCourseForEligibility] = useState<string>('Computer Science & AI');

  // Dynamic OpenGraph and Meta Description tags
  useDynamicSEO({
    title: presetStudyField 
      ? `Study ${presetStudyField} in India | Fresh Study India Admissions`
      : 'Fresh Study India | 2026 International Student Admissions Desk',
    description: presetStudyField
      ? `Explore top accredited Indian universities for ${presetStudyField}. Complete admissions, bonafide visa filing, and arrival support with Fresh Study India.`
      : 'We guide ambitious students from Africa and across the world into accredited Indian universities, providing verified admissions, bonafide visa documentation, and full airport arrival support.',
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

  const handleOpenEligibilityWithCourse = (courseName: string) => {
    setActiveCourseForEligibility(courseName);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900 selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Top Fixed Header & Navigation */}
      <Navbar 
        onOpenApplication={() => handleOpenApplication()} 
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenPortal={() => setIsAdmissionsPortalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="overflow-hidden">
        {/* 1. Visually Powerful Cinematic Hero Section (Light Blue & White) */}
        <Hero onOpenApplication={() => handleOpenApplication()} />

        {/* 2. Quick Animated Infinite Marquee Trust Strip */}
        <ScrollReveal delay={50}>
          <TrustBar />
        </ScrollReveal>

        {/* 3. Start Your Next Chapter & Admissions Overview */}
        <ScrollReveal delay={50}>
          <AdmissionsOverview onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 4. The Connected Visual Journey (4 Interactive Steps) */}
        <ScrollReveal delay={50}>
          <JourneyTimeline onOpenApplication={(step) => handleOpenApplication(step ? `Stage: ${step}` : undefined)} />
        </ScrollReveal>

        {/* 5. Featured Degree Streams (Interactive Hover Cards) */}
        <ScrollReveal delay={50}>
          <StudyOptions 
            onSelectOption={(field) => handleOpenApplication(field)}
            onOpenEligibilityWithCourse={handleOpenEligibilityWithCourse}
          />
        </ScrollReveal>

        {/* 6. Dedicated University Eligibility Calculator / Form */}
        <ScrollReveal delay={50}>
          <EligibilityChecker 
            initialCourse={activeCourseForEligibility}
            onOpenApplication={() => handleOpenApplication()}
          />
        </ScrollReveal>

        {/* 7. What We Actually Help With (Comprehensive Services Grid) */}
        <ScrollReveal delay={50}>
          <ServicesGrid onOpenApplication={(service) => handleOpenApplication(service)} />
        </ScrollReveal>

        {/* 8. West Africa to India Route Corridor */}
        <ScrollReveal delay={50}>
          <AfricaToIndia onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 9. Live Campus & Student Photo Gallery (Permanent Community Gallery) */}
        <ScrollReveal delay={50}>
          <PhotoGallery onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 10. Why Fresh Study India (Zero False Promises) */}
        <ScrollReveal delay={50}>
          <WhyUs onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 10. The Big Call to Action */}
        <ScrollReveal delay={50}>
          <BigCTA onOpenApplication={() => handleOpenApplication()} />
        </ScrollReveal>

        {/* 11. Direct Contact & Dual Desk Section */}
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
