import React, { useState, useEffect } from 'react';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { NavTab } from '../types';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Compass, 
  UserCheck, 
  GraduationCap, 
  Globe, 
  Sparkles,
  BookOpen,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenApplication: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenApplication,
  onOpenStudentPortal,
  onOpenAdminPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappConfig = getWhatsAppConfig();

  const navLinks: Array<{ id: NavTab; label: string; icon: React.ElementType; description: string }> = [
    { id: 'home', label: 'Home', icon: Compass, description: 'Overview & introduction' },
    { id: 'study-in-india', label: 'Study in India', icon: Globe, description: 'Academic landscape & benefits' },
    { id: 'services', label: 'Services', icon: Sparkles, description: 'Our 8 end-to-end services' },
    { id: 'universities', label: 'Universities', icon: GraduationCap, description: 'Program directory & finder' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
    { id: 'about', label: 'About', icon: BookOpen, description: 'Our mission & core principles' },
    { id: 'contact', label: 'Contact', icon: Mail, description: 'Admissions desk & directory' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (tabId: NavTab) => {
    setMobileMenuOpen(false);
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A1128]/95 backdrop-blur-md border-b border-slate-800/90 shadow-lg py-3' 
            : 'bg-[#0A1128] border-b border-slate-800/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <button 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Compass className="w-5 h-5 text-slate-950 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {COMPANY.name}
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-amber-400">
                  {COMPANY.tagline}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md ring-1 ring-amber-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Student Portal Trigger */}
              <button
                onClick={onOpenStudentPortal}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title="View your submitted application status"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Student Portal</span>
              </button>

              {/* Primary CTA (Larger, more prominent button) */}
              <button
                onClick={onOpenApplication}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Mobile Menu & Quick Apply Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenApplication}
                className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
              >
                Apply
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Out Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop Overlay */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-out Panel from Right */}
        <div 
          className={`fixed inset-y-0 right-0 max-w-sm w-[88vw] bg-[#0A1128] border-l border-slate-800 text-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 overflow-hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-sm shrink-0">
                <Compass className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-sm font-extrabold tracking-tight text-white leading-tight">
                  {COMPANY.name}
                </span>
                <span className="block text-[9px] tracking-wider uppercase font-semibold text-amber-400">
                  Navigation & Desk
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5 text-left">
            
            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-between shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">
                Pages & Portals
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md' 
                        : 'hover:bg-slate-800/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="block text-sm leading-snug">{link.label}</span>
                        <span className={`block text-[11px] font-normal leading-none mt-0.5 ${
                          isActive ? 'text-slate-800 font-medium' : 'text-slate-400'
                        }`}>
                          {link.description}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Student Portal Option in Mobile Drawer */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentPortal();
                }}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/80 text-slate-200 flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Student Portal</span>
                    <span className="block text-[11px] text-slate-400">Track application status</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Direct Contact Phone & WhatsApp */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Admissions Desk</span>
              </div>
              <p className="text-[11px] text-slate-400">Monrovia, Liberia: <strong className="text-emerald-400">+231 889425645</strong></p>
              <p className="text-[11px] text-slate-400">India Desk: <strong className="text-slate-200">+91 93478 69324</strong></p>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-[11px] text-slate-400 flex items-center justify-between">
            <span>© 2026 {COMPANY.shortName}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPortal();
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Admin Portal
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
