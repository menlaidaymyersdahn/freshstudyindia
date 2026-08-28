import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardModal } from '../components/AdminDashboardModal';
import { useSEO } from '../hooks/useSEO';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Admissions Admin Portal (Staff Only) | Myers Global Pathways',
    description: 'Authorized admissions administration portal for student dossier verification, offer letters, and applicant communication.',
    canonicalPath: '/admin',
    noIndex: true
  });

  return (
    <div className="min-h-screen bg-[#EBF3FC]">
      <AdminDashboardModal
        isOpen={true}
        onClose={() => navigate('/')}
        onOpenApplyModal={() => navigate('/apply')}
      />
    </div>
  );
};

export default AdminPage;
