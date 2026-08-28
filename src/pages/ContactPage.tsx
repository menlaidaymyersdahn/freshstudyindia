import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';
import { useSEO } from '../hooks/useSEO';

interface ContactPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Contact Admissions Desk & Directory | Myers Global Pathways',
    description: 'Connect directly with Myers Global Pathways admissions desk via WhatsApp (+231 889425645), official email directory, or submit an enquiry.',
    canonicalPath: '/contact',
    keywords: 'Contact Myers Global Pathways, Study in India Liberia Office, India Admissions Desk, International Education Contact'
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
        badge="Official Admissions Desk"
        title="Contact Myers Global"
        highlightedWord="Pathways"
        description="Connect directly with our admissions counselors via WhatsApp (+231 889425645), official email directory, or submit an enquiry form."
        currentPage="Contact Us"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9367.jpeg"
      />

      <ContactSection />
    </div>
  );
};

export default ContactPage;
