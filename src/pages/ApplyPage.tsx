import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { ApplicationWizardForm } from '../components/ApplicationWizardForm';

export const ApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const whatsappConfig = getWhatsAppConfig();

  const presetCourse = searchParams.get('course') || searchParams.get('field') || '';
  const presetLevel = searchParams.get('level') || '';

  useSEO({
    title: 'Apply for University Admission in India | Myers Global Pathways',
    description:
      'Submit your international student admission application online to Myers Global Pathways. Receive personalized university guidance, fee transparency, and documentation support.',
    canonicalPath: '/apply',
    keywords:
      'Apply Study in India, India University Application Form, International Student Admissions, Myers Global Pathways Apply',
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-16 sm:pt-28 sm:pb-24 font-body overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#0B1F3A] transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-[#0B1F3A] font-semibold">Student Application Portal</span>
        </nav>

        {/* Three-Step + Review Admissions Wizard */}
        <ApplicationWizardForm
          mode="page"
          presetCourse={presetCourse}
          presetStudyLevel={presetLevel}
          onPortalRedirect={(trackingId) =>
            navigate(`/student-portal?trackingId=${encodeURIComponent(trackingId)}`)
          }
        />

        {/* Quiet Admissions Support Strip */}
        <div className="mt-8 rounded-xl bg-white border border-slate-200/90 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold text-[#0B1F3A]">
              Need assistance completing your application?
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Our admissions officers in Monrovia and India are available to help with course selection
              or document questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="mailto:admissions@myersglobalpathways.com"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] text-[#0B1F3A] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5922E]" />
              <span>admissions@myersglobalpathways.com</span>
            </a>

            <a
              href={whatsappConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] text-[#0B1F3A] transition-colors font-mono tabular-nums"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C5922E]" />
              <span>{COMPANY.primaryWhatsApp}</span>
            </a>

            <a
              href={whatsappConfig.altUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] text-[#0B1F3A] transition-colors font-mono tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5922E]" />
              <span>{COMPANY.alternativePhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
