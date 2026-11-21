import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';

interface FooterProps {
  onOpenApplication?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const whatsappConfig = getWhatsAppConfig();

  const quickLinks: Array<{ label: string; path: string }> = [
    { label: 'Home', path: '/' },
    { label: 'Study in India', path: '/study-in-india' },
    { label: 'Services', path: '/services' },
    { label: 'Universities', path: '/universities' },
    { label: 'Student life and blog', path: '/student-life' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#EFECE4] text-[#4F535C] border-t border-[#181A1F]/[0.08] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#181A1F]/[0.08] text-left">

          {/* Brand & Overview */}
          <div className="lg:col-span-3 space-y-4">
            <Link
              to="/"
              className="inline-block text-lg font-medium tracking-[-0.015em] text-[#181A1F] hover:text-[#A63A24] transition-ui"
              aria-label="Myers Global Pathways — Home"
            >
              {COMPANY.shortName}
            </Link>

            <p className="text-sm text-[#4F535C] leading-relaxed">
              International education consultancy assisting students with university selection, admissions, documentation, Indian student visas, and arrival orientation.
            </p>

            <div className="pt-2 space-y-1 text-sm text-[#4F535C]">
              <p>Monrovia desk: <span className="text-[#181A1F] font-mono">{COMPANY.primaryPhone}</span></p>
              <p>India desk: <span className="text-[#181A1F] font-mono">{COMPANY.alternativePhone}</span></p>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-medium text-[#181A1F]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#4F535C]">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-[#A63A24] transition-ui block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-[#181A1F]/[0.08]">
                <Link
                  to="/student-portal"
                  className="text-[#181A1F] hover:text-[#A63A24] font-medium transition-ui block"
                >
                  Student portal (track application)
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Email Directory */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-sm font-medium text-[#181A1F]">
              Official email directory
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {OFFICIAL_EMAIL_DIRECTORY.slice(0, 6).map((contact) => (
                <div
                  key={contact.email}
                  className="p-3 rounded-xl bg-white border border-[#181A1F]/[0.08]"
                >
                  <span className="block text-[#6E727D]">{contact.department}</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block text-[#181A1F] hover:text-[#A63A24] font-mono text-[11px] truncate transition-ui"
                    title={contact.email}
                  >
                    {contact.email}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#181A1F] hover:text-[#A63A24] transition-ui"
              >
                WhatsApp admissions desk: +231 889425645
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E727D]">
          <p>© 2026 {COMPANY.shortName}. All rights reserved.</p>
          <Link
            to="/admin"
            className="text-[#4F535C] hover:text-[#A63A24] transition-ui"
          >
            Admissions admin
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
