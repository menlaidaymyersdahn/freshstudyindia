import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EditorialTrustIntro } from '../components/EditorialTrustIntro';
import { HomeFeatureHub } from '../components/HomeFeatureHub';
import { HomeStudentLifeSection } from '../components/HomeStudentLifeSection';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Myers Global Pathways | Study in India Admissions Advisory',
    description: 'Personalized educational consultancy assisting international students with university admissions, degree selection, documentation, student visas, and arrival support in India.',
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

  const handleTrackApplication = (trackingId?: string) => {
    const cleaned = trackingId?.trim();
    if (cleaned) {
      navigate(`/student-portal?trackingId=${encodeURIComponent(cleaned)}`);
    } else {
      navigate('/student-portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#181A1F]">
      {/* 1. Hero Section */}
      <Hero
        onOpenApplication={() => handleApply()}
        onExploreStudyInIndia={() => navigate('/study-in-india')}
        onExploreServices={() => navigate('/services')}
      />

      {/* 2. Advisory Overview & Live Admissions Workflow */}
      <EditorialTrustIntro
        onOpenApplication={() => handleApply()}
        onExploreServices={() => navigate('/services')}
        onTrackApplication={handleTrackApplication}
      />

      {/* 3. Dedicated Portals & Programs Index */}
      <HomeFeatureHub
        onSelectTab={(tab) => {
          if (tab === 'home') navigate('/');
          else navigate(`/${tab}`);
        }}
        onOpenApplication={() => handleApply()}
      />

      {/* 4. Student Life in India & Campus Blog */}
      <HomeStudentLifeSection
        onOpenApplication={() => handleApply()}
      />

      {/* 5. Closing Application CTA */}
      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default HomePage;
