import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { ApplicationJourney } from '../components/ApplicationJourney';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Our Complete 8 End-to-End Services | Myers Global Pathways',
    description: 'Personalized guidance from program discovery and documentation to university admission letters, student visas, and campus settlement in India.',
    canonicalPath: '/services',
    keywords: 'Study in India Services, Indian Student Visa Guidance, University Selection India, Document Attestation, International Student Support India'
  });

  const handleApply = (preset?: any) => {
    if (onOpenApplication) {
      onOpenApplication(preset);
    } else {
      navigate('/apply');
    }
  };

  return (
    <div className="animate-fadeIn">
      <PageHeader
        badge="01 to 08 Core Advisory Services"
        title="Our Complete End-to-End"
        highlightedWord="Services"
        description="Personalized guidance from your initial program discovery and documentation to university admission letters, student visas, and campus settlement in India."
        currentPage="Services"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
      />

      <ServicesSection
        onOpenApplication={(service: ServiceItem) => handleApply({ course: service.title })}
      />

      <ApplicationJourney
        onOpenApplication={() => handleApply()}
      />

      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default ServicesPage;
