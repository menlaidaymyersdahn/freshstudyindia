import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TrustCredibilityBar } from '../components/TrustCredibilityBar';
import { HomeUniversitiesSection } from '../components/HomeUniversitiesSection';
import { HomeServicesSection } from '../components/HomeServicesSection';
import { HomeProcessTimeline } from '../components/HomeProcessTimeline';
import { HomeStudentLifeSection } from '../components/HomeStudentLifeSection';
import { EditorialTrustIntro } from '../components/EditorialTrustIntro';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  onOpenApplication?: (preset?: any) => void;
  onOpenAdvisor?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenApplication,
  onOpenAdvisor
}) => {
  const navigate = useNavigate();

  useSEO({
    title: 'Myers Global Pathways | Study in India Admissions Advisory',
    description:
      'Personalized educational consultancy assisting international students with university admissions, degree selection, documentation, student visas, and arrival support in India.',
    canonicalPath: '/',
    keywords:
      'Myers Global Pathways, Study in India, International Student Admissions India, African Students in India, India Student Visa Guidance, SRSU India, Menlaiday Myers Dahn'
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
    <div className="min-h-screen bg-white text-[#0F172A] font-body">
      {/* 1. Full-Width Editorial Hero (Real Uploaded Group Graduation Photo) */}
      <Hero
        onOpenApplication={() => handleApply()}
        onExploreUniversities={() => navigate('/universities')}
      />

      {/* 2. Four-Pillar Trust & Credibility Bar */}
      <TrustCredibilityBar />

      {/* 3. Featured University, Indian Study Hubs & Popular Academic Fields */}
      <HomeUniversitiesSection
        onExploreUniversities={() => navigate('/universities')}
        onApplyWithPreset={(preset) => handleApply(preset)}
      />

      {/* 4. Eight Admissions Advisory Services */}
      <HomeServicesSection
        onExploreServices={() => navigate('/services')}
      />

      {/* 5. Four-Step Visual Admissions Timeline */}
      <HomeProcessTimeline
        onOpenApplication={() => handleApply()}
      />

      {/* 6. Graduate & Student Success Showcase + Live Firestore Student Stories */}
      <HomeStudentLifeSection
        onOpenApplication={(preset) => handleApply(preset)}
      />

      {/* 7. Interactive Six-Stage Admissions Status Tracker & Live Portal Lookup */}
      <EditorialTrustIntro
        onOpenApplication={() => handleApply()}
        onExploreServices={() => navigate('/services')}
        onTrackApplication={handleTrackApplication}
      />

      {/* 8. Closing Admissions Consultation Band */}
      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
        onOpenAdvisor={onOpenAdvisor}
      />
    </div>
  );
};

export default HomePage;
