import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  ChevronRight,
  Globe2
} from 'lucide-react';
import { BRAND, getWhatsAppLink, EMAIL_DIRECTORY } from '../lib/constants';
import { NavTab } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenApplication: () => void;
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenApplication,
  onOpenPortal
}) => {
  const quickLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'study-in-india', label: 'Study in India' },
    { id: 'services', label: 'Services' },
    { id: 'universities', label: 'Universities' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer 
      id="main-footer"
      className="bg-[#030710] text-white border-t border-slate-900 pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Tier: Brand, Tagline, Quick Nav, and Official WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="lg" variant="horizontal" theme="light" showTagline={false} />

            <p className="text-sm text-slate-400 font-serif italic text-amber-200/90 text-lg">
              "{BRAND.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Myers Global Pathways is an international education consultancy dedicated to guiding students worldwide into accredited universities across India.
            </p>

            {/* Direct WhatsApp Action */}
            <div className="pt-2">
              <a
                id="footer-wa-btn"
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Chat on WhatsApp (+91 9201330946)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              {onOpenPortal && (
                <li>
                  <button
                    onClick={onOpenPortal}
                    className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    <span>Track Application Status</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Official Inboxes Overview */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Official Email Directory
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">General Enquiries</span>
                <a href="mailto:info@myersglobalpathways.com" className="text-slate-200 hover:text-amber-400 font-mono">
                  info@myersglobalpathways.com
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Admissions Desk</span>
                <a href="mailto:admissions@myersglobalpathways.com" className="text-slate-200 hover:text-amber-400 font-mono">
                  admissions@myersglobalpathways.com
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Applications</span>
                <a href="mailto:applications@myersglobalpathways.com" className="text-slate-200 hover:text-amber-400 font-mono">
                  applications@myersglobalpathways.com
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Student Support</span>
                <a href="mailto:support@myersglobalpathways.com" className="text-slate-200 hover:text-amber-400 font-mono">
                  support@myersglobalpathways.com
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Institutional Collab</span>
                <a href="mailto:partnerships@myersglobalpathways.com" className="text-slate-200 hover:text-amber-400 font-mono">
                  partnerships@myersglobalpathways.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Myers Global Pathways. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Direct University Admissions Advisory</span>
            <span>•</span>
            <span>UGC & NAAC Verified Guidance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
