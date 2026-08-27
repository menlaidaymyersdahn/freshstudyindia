import React from 'react';
import { COMPANY, OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';
import { NavTab } from '../types';
import { Compass, MessageCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenApplication: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenApplication,
  onOpenStudentPortal,
  onOpenAdminPortal
}) => {
  const whatsappConfig = getWhatsAppConfig();

  const quickLinks: Array<{ label: string; tab: NavTab }> = [
    { label: 'Home', tab: 'home' },
    { label: 'Study in India', tab: 'study-in-india' },
    { label: 'Services', tab: 'services' },
    { label: 'Universities', tab: 'universities' },
    { label: 'FAQ', tab: 'faq' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleLinkClick = (tab: NavTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060B19] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80 text-left">
          
          {/* Brand & Overview Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shrink-0">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-lg font-extrabold tracking-tight text-white">
                  {COMPANY.name}
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-amber-400">
                  {COMPANY.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              International education consultancy providing personalized guidance for students seeking university admissions, visa facilitation, and arrival support in India.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenApplication}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.tab)}
                    className="hover:text-amber-400 transition-colors cursor-pointer block py-0.5 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800">
                <button
                  onClick={onOpenStudentPortal}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left py-0.5 font-semibold text-slate-300 flex items-center gap-1"
                >
                  <span>Student Portal (Track Application)</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Official Email Directory Column */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Official Email Directory
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {OFFICIAL_EMAIL_DIRECTORY.slice(0, 6).map((contact) => (
                <div key={contact.email} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="block text-[10px] text-slate-400 font-medium">{contact.department}</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-amber-400/90 hover:text-amber-300 hover:underline break-all font-mono text-[11px]"
                  >
                    {contact.email}
                  </a>
                </div>
              ))}
            </div>

            {/* WhatsApp Direct Link */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Primary WhatsApp: +231 889425645</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {COMPANY.name}. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminPortal}
              className="text-slate-400 hover:text-slate-200 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admissions Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
