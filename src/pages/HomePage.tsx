import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EditorialTrustIntro } from '../components/EditorialTrustIntro';
import { HomeFeatureHub } from '../components/HomeFeatureHub';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Myers Global Pathways | Study in India — International Admissions Advisory',
    description: 'Myers Global Pathways assists international students with university selection, admissions guidance, documentation, student visas, and arrival in India.',
    canonicalPath: '/',
    keywords: 'Myers Global Pathways, Study in India, International Student Admissions India, African Students in India, India Student Visa Guidance, SRSU India, Menlaiday Myers Dahn'
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
      {/* Hero Section */}
      <Hero
        onOpenApplication={() => handleApply()}
        onExploreStudyInIndia={() => navigate('/study-in-india')}
        onExploreServices={() => navigate('/services')}
      />

      {/* Editorial Trust Intro */}
      <EditorialTrustIntro
        onOpenApplication={() => handleApply()}
        onExploreServices={() => navigate('/services')}
      />

      {/* Home Dedicated Navigation Hub Cards */}
      <HomeFeatureHub
        onSelectTab={(tab) => {
          if (tab === 'home') navigate('/');
          else navigate(`/${tab}`);
        }}
        onOpenApplication={() => handleApply()}
      />

      {/* Application CTA Banner */}
      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default HomePage;
