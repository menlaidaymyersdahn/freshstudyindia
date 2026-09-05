import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { WhyStudyInIndia } from '../components/WhyStudyInIndia';
import { StudyInIndiaExplorer } from '../components/StudyInIndiaExplorer';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface StudyInIndiaPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const StudyInIndiaPage: React.FC<StudyInIndiaPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Study in India Guide & Higher Education Opportunities | Myers Global Pathways',
    description: 'Explore academic benefits, globally recognized degrees taught in English, and affordable tuition and living options for international students studying in India.',
    canonicalPath: '/study-in-india',
    keywords: 'Study in India, Higher Education in India, Indian Universities for International Students, Engineering in India, B.Sc Computer Science India, SRSU India'
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
        badge="Destination & Academic Landscape"
        title="Why Study Higher Education in"
        highlightedWord="India"
        description="India offers world-class academic rigor, recognized degrees, state-of-the-art technological hubs, and an affordable pathway to international career success."
        currentPage="Study in India"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
      />

      <WhyStudyInIndia
        onOpenApplication={() => handleApply()}
      />

      <StudyInIndiaExplorer
        onOpenApplication={(preset) => handleApply(preset)}
        onContactAdmissions={() => navigate('/contact')}
      />

      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default StudyInIndiaPage;
