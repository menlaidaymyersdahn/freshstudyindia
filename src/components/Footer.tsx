import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';
import { MapPin, Phone, MessageCircle, Globe, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenApplication?: () => void;
  onOpenAdvisor?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdvisor }) => {
  const whatsappConfig = getWhatsAppConfig();

  const quickLinks: Array<{ label: string; path: string }> = [
    { label: 'Home', path: '/' },
    { label: 'Study in India', path: '/study-in-india' },
    { label: 'Universities', path: '/universities' },
    { label: 'Our Services', path: '/services' },
    { label: 'Student Life', path: '/student-life' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const studyResources: Array<{ label: string; path: string }> = [
    { label: 'Start an Application', path: '/apply' },
    { label: 'Student Portal (Track Status)', path: '/student-portal' },
    { label: 'Frequently Asked Questions', path: '/faq' },
    { label: 'Mobile App & Android Kit', path: '/download-app' },
  ];

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t border-white/10 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/12 text-left">
          {/* Column 1: Brand, Short Intro & Verified Offices */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-[-0.015em] text-white hover:text-[#F0C86E] transition-ui"
              aria-label="Myers Global Pathways — Home"
            >
              <span
                className="w-8 h-8 rounded-md bg-[#C5922E] text-[#081528] font-display text-sm font-extrabold inline-flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                M
              </span>
              <span>{COMPANY.shortName}</span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              An international education consultancy operating between Liberia and India—guiding students and families through university selection, admissions, transparent fee planning, student visas, and campus arrival.
            </p>

            {/* Verified Office Contacts */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F0C86E] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Monrovia Office (Liberia)</p>
                  <a
                    href={`tel:${COMPANY.primaryPhone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:text-[#F0C86E] font-mono text-xs tabular-nums transition-ui"
                  >
                    {COMPANY.primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F0C86E] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">India Admissions Desk (Hyderabad)</p>
                  <a
                    href={`tel:${COMPANY.alternativePhone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:text-[#F0C86E] font-mono text-xs tabular-nums transition-ui"
                  >
                    {COMPANY.alternativePhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Official Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#C5922E] hover:bg-[#D4A13B] text-[#081528] text-xs font-semibold inline-flex items-center gap-1.5 transition-ui"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp (Liberia)</span>
              </a>

              <a
                href={whatsappConfig.altUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-ui"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#F0C86E]" aria-hidden="true" />
                <span>WhatsApp (India)</span>
              </a>

              {onOpenAdvisor && (
                <button
                  type="button"
                  onClick={onOpenAdvisor}
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-ui cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#F0C86E]" aria-hidden="true" />
                  <span>Ask Advisor</span>
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-[#F0C86E] transition-ui block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Study in India Resources & Connect */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold text-white">
                Study in India Resources
              </h3>
              <ul className="space-y-2.5 text-sm">
                {studyResources.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-slate-300 hover:text-[#F0C86E] transition-ui block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="font-display text-xs font-bold text-[#F0C86E]">
                Connect Online
              </h4>
              <div className="space-y-2 text-xs">
                <a
                  href="https://myersglobalpathways.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white inline-flex items-center gap-2 transition-ui"
                >
                  <Globe className="w-3.5 h-3.5 text-[#F0C86E]" aria-hidden="true" />
                  <span>myersglobalpathways.com</span>
                </a>
                <div>
                  <a
                    href="mailto:admissions@myersglobalpathways.com"
                    className="text-slate-300 hover:text-white inline-flex items-center gap-2 transition-ui"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F0C86E]" aria-hidden="true" />
                    <span>Admissions Desk Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Official Verified Email Directory (All 9 Official Emails) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-sm font-bold text-white">
              Official Email Directory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
              {OFFICIAL_EMAIL_DIRECTORY.map((contact) => (
                <a
                  key={contact.email}
                  href={`mailto:${contact.email}`}
                  title={`${contact.department}: ${contact.email}`}
                  className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#C5922E]/50 transition-ui block"
                >
                  <span className="block text-[11px] font-medium text-slate-400">
                    {contact.department}
                  </span>
                  <span className="mt-0.5 block text-white font-mono text-[11px] truncate">
                    {contact.email}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Admin Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {COMPANY.year} {COMPANY.shortName}. All rights reserved. · Monrovia, Liberia &amp; Hyderabad, India.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/student-portal"
              className="text-slate-300 hover:text-[#F0C86E] transition-ui"
            >
              Student Portal
            </Link>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-white transition-ui"
            >
              Admissions Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
