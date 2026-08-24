import React from 'react';
import { 
  GraduationCap, 
  MessageCircle, 
  Lock,
  Share2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenPrivacy?: () => void;
  onOpenApplication?: () => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  onOpenPrivacy, 
  onOpenApplication,
  onOpenShare,
  onOpenPortal
}) => {
  const handleNavClick = (tab: NavTab) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Myers Global <span className="text-blue-400">Pathways</span>
              </span>
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              A professional international education consultancy assisting students worldwide with university selection, admissions guidance, documentation, and the journey to studying in India.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Admissions</span>
              </a>

              {onOpenShare && (
                <button
                  onClick={onOpenShare}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                  title="Share Website"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-white transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('study-in-india')} className="hover:text-white transition cursor-pointer">
                  Study in India
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-white transition cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition cursor-pointer">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-us')} className="hover:text-white transition cursor-pointer">
                  Why Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('process')} className="hover:text-white transition cursor-pointer">
                  Application Process
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white transition cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Emails */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Email Inquiries
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="text-[10px] text-slate-500 block uppercase">Admissions Desk</span>
                <a href={`mailto:${BRAND.emails.admissions}`} className="text-slate-300 hover:text-blue-400 transition">
                  {BRAND.emails.admissions}
                </a>
              </li>
              <li>
                <span className="text-[10px] text-slate-500 block uppercase">General Information</span>
                <a href={`mailto:${BRAND.emails.info}`} className="text-slate-300 hover:text-blue-400 transition">
                  {BRAND.emails.info}
                </a>
              </li>
              <li>
                <span className="text-[10px] text-slate-500 block uppercase">Applications & Verification</span>
                <a href={`mailto:${BRAND.emails.applications}`} className="text-slate-300 hover:text-blue-400 transition">
                  {BRAND.emails.applications}
                </a>
              </li>
              <li>
                <span className="text-[10px] text-slate-500 block uppercase">Student Support</span>
                <a href={`mailto:${BRAND.emails.support}`} className="text-slate-300 hover:text-blue-400 transition">
                  {BRAND.emails.support}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Locations & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Contact Desks
            </p>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-bold text-white text-[11px]">🇮🇳 India Admissions HQ</p>
                <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-semibold text-blue-400 block hover:underline">
                  {BRAND.contacts.india.phoneDisplay}
                </a>
                <p className="text-[11px] text-slate-500">{BRAND.contacts.india.address}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-bold text-white text-[11px]">🇱🇷 Liberia & West Africa Desk</p>
                <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-semibold text-blue-400 block hover:underline">
                  {BRAND.contacts.liberia.phoneDisplay}
                </a>
                <p className="text-[11px] text-slate-500">{BRAND.contacts.liberia.address}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Myers Global Pathways. All rights reserved.</span>
            {onOpenPrivacy && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-slate-300 transition underline cursor-pointer"
                >
                  Privacy Policy & Terms
                </button>
              </>
            )}
            {onOpenPortal && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-blue-400 transition flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-blue-400" />
                  <span>Counselor Portal</span>
                </button>
              </>
            )}
          </div>

          <p className="text-[11px] text-slate-500 text-center md:text-right">
            Official Higher Education Admissions Advisory & International Student Support
          </p>
        </div>

      </div>
    </footer>
  );
};
