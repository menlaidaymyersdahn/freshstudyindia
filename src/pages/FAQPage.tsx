import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { FAQSection } from '../components/FAQSection';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface FAQPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Frequently Asked Questions (FAQ) | Myers Global Pathways',
    description: 'Clear answers on Indian university entry qualifications, English medium exemptions (no IELTS required), fee schedules, and Indian student visas.',
    canonicalPath: '/faq',
    keywords: 'Study in India FAQ, Indian Student Visa Requirements, Do I need IELTS for India, Tuition Fees in India, Cost of Living India'
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
        badge="Admissions & Visa Knowledge Base"
        title="Frequently Asked"
        highlightedWord="Questions"
        description="Clear answers regarding academic entry qualifications, English proficiency (no IELTS needed for English medium), tuition costs, and Indian student visas."
        currentPage="Frequently Asked Questions (FAQ)"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
      />

      <FAQSection
        onOpenApplication={() => handleApply()}
      />

      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default FAQPage;
