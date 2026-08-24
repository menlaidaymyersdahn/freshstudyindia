import React from 'react';
import { Hero } from './Hero';
import { EditorialIntro } from './EditorialIntro';
import { WhyIndiaSection } from './WhyIndiaSection';
import { ServicesSection } from './ServicesSection';
import { StudyInIndiaSection } from './StudyInIndiaSection';
import { ApplicationJourney } from './ApplicationJourney';
import { AboutSection } from './AboutSection';
import { ApplicationCTABox } from './ApplicationCTABox';
import { ContactSection } from './ContactSection';
import { NavTab } from '../types';

interface HomeViewProps {
  onOpenApplication: (field?: string) => void;
  onNavigate: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onOpenApplication, 
  onNavigate 
}) => {
  return (
    <div className="w-full">
      {/* 1. Hero Section with 3D Pathway Globe & Core Headlines */}
      <Hero 
        onOpenApplication={(field) => onOpenApplication(field)}
        onExploreStudyInIndia={() => {
          const el = document.getElementById('study-in-india');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('study-in-india');
          }
        }}
      />

      {/* 2. Trust & Editorial Introduction (No 3-card clichés, large photography) */}
      <EditorialIntro 
        onOpenApplication={() => onOpenApplication()}
        onExploreServices={() => {
          const el = document.getElementById('services');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('services');
          }
        }}
      />

      {/* 3. Why Study in India? (Asymmetric Editorial Layout) */}
      <WhyIndiaSection 
        onOpenApplication={(field) => onOpenApplication(field)}
        onExplorePrograms={() => {
          const el = document.getElementById('study-in-india');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('universities');
          }
        }}
      />

      {/* 4. How We Help (Interactive 01-08 Master-Detail Service Index) */}
      <ServicesSection 
        onOpenApplication={(service) => onOpenApplication(service)}
      />

      {/* 5. Study in India (Program & University Disciplines Explorer) */}
      <StudyInIndiaSection 
        onOpenApplication={(course) => onOpenApplication(course)}
      />

      {/* 6. Application Journey (7-Step Interactive Timeline) */}
      <ApplicationJourney 
        onOpenApplication={(step) => onOpenApplication(step)}
      />

      {/* 7. About Myers Global Pathways (Authentic Narrative & 5 Core Principles) */}
      <AboutSection 
        onOpenApplication={() => onOpenApplication()}
      />

      {/* 8. Application CTA Box (High-Contrast Dual Action Banner) */}
      <ApplicationCTABox 
        onOpenApplication={() => onOpenApplication()}
        onOpenContact={() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('contact');
          }
        }}
      />

      {/* 9. Contact Section (Official 9 Inboxes Directory & Enquiry Form) */}
      <ContactSection 
        onOpenApplication={() => onOpenApplication()}
      />
    </div>
  );
};
