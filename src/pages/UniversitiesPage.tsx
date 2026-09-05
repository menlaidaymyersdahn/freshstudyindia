import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { StudyInIndiaExplorer } from '../components/StudyInIndiaExplorer';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface UniversitiesPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const UniversitiesPage: React.FC<UniversitiesPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Indian Universities & Degree Programs Directory | Myers Global Pathways',
    description: 'Discover recognized degree programs and accredited higher education institutions in India across Engineering, Computer Science, Business, Health Sciences, and Law.',
    canonicalPath: '/universities',
    keywords: 'Universities in India, Indian Degree Programs, Top Universities in India for African Students, Study IT in India, Study Medicine in India'
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
        badge="Course & University Finder"
        title="Explore Recognized Degrees &"
        highlightedWord="Universities"
        description="Find the right academic match among top accredited universities in India across Engineering, Health Sciences, Business, IT, and Law."
        currentPage="Universities"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
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

export default UniversitiesPage;
