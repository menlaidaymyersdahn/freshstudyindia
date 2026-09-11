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

  return (
    <div className="relative min-h-screen animate-fadeIn">
      {/* Full-bleed Fixed Background Image (Requested by user: https://i.ibb.co/zVbQCGqW/DSC-9531.jpg) */}
      <div 
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" 
        aria-hidden="true"
      >
        <img
          src="/images/home-background-web.jpg"
          srcSet="/images/home-background-web.jpg 1x, /images/home-background.jpg 2x"
          onError={(e) => {
            // Direct ImgBB online fallback
            (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/zVbQCGqW/DSC-9531.jpg';
          }}
          alt="Myers Global Pathways - Indian University Campus Atmosphere"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Subtle, crystal-clear overlay: preserves the image's original vibrancy and clarity while maintaining contrast */}
        <div className="absolute inset-0 bg-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-transparent to-slate-950/25" />
      </div>

      {/* Main Page Content Layer */}
      <div className="relative z-10">
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

        {/* Student Life in India & Campus Blog Spotlight */}
        <HomeStudentLifeSection
          onOpenApplication={() => handleApply()}
        />

        {/* Application CTA Banner */}
        <ApplicationCTA
          onOpenApplication={() => handleApply()}
          onContactClick={() => navigate('/contact')}
        />
      </div>
    </div>
  );
};

export default HomePage;
