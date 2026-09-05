import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface AboutPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'About Us & Advisory Leadership | Myers Global Pathways',
    description: 'Learn about Myers Global Pathways, our mission, and founder Menlaiday Myers Dahn (B.Sc. Computer Science, SRSU India), dedicated to honest international student advisory.',
    canonicalPath: '/about',
    keywords: 'About Myers Global Pathways, Menlaiday Myers Dahn, SRSU India, Study in India Consultant, Liberia to India Education'
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
        badge="Our Vision & Leadership"
        title="About Myers Global"
        highlightedWord="Pathways"
        description="Founded by Menlaiday Myers Dahn (B.Sc. Computer Science, India), Myers Global Pathways provides personalized, transparent guidance for international students pursuing higher education in India."
        currentPage="About Us"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
      />

      <AboutSection />

      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default AboutPage;
