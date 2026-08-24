import React, { useState, useEffect } from 'react';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Compass, 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  Mail, 
  ChevronRight, 
  GraduationCap, 
  Globe, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenApplication: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminPortal: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApplication,
  onOpenStudentPortal,
  onOpenAdminPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappConfig = getWhatsAppConfig();

  const navLinks = [
    { label: 'Home', href: '#home', icon: Compass, description: 'Overview & introduction' },
    { label: 'Study in India', href: '#why-india', icon: Globe, description: 'Academic landscape & benefits' },
    { label: 'Services', href: '#services', icon: Sparkles, description: 'End-to-end admission guidance' },
    { label: 'Universities', href: '#explorer', icon: GraduationCap, description: 'Program directory & finder' },
    { label: 'About', href: '#about', icon: BookOpen, description: 'Our mission & core principles' },
    { label: 'Contact', href: '#contact', icon: Mail, description: 'Admissions desk & enquiries' },
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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A1128]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md py-3' 
            : 'bg-[#0A1128] border-b border-slate-800/40 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Compass className="w-5 h-5 text-slate-950 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {COMPANY.name}
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-medium text-slate-400">
                  {COMPANY.tagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Student Portal Trigger */}
              <button
                onClick={onOpenStudentPortal}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
                title="View your submitted application status"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Student Portal</span>
              </button>

              {/* Primary CTA */}
              <button
                onClick={onOpenApplication}
                className="px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Mobile Menu & Quick Apply Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenApplication}
                className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
              >
                Apply
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700/60 transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Refined Slide-Out Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop Overlay with Gaussian Blur */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 ease-out ${
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
          <div className="p-4 sm:p-5 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
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
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700/80 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6 text-left">
            
            {/* Primary Action Button */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-between shadow-lg shadow-amber-500/20 cursor-pointer group"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">
                Main Menu
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:border-slate-700 shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                            {link.label}
                          </span>
                          <span className="block text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">
                            {link.description}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Portals & Self-Service Section */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                Student & Staff Portals
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStudentPortal();
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-200 group-hover:text-white">
                        Student Portal
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        Track submitted applications
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminPortal();
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 text-left flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-400 group-hover:text-slate-300">
                        Admissions Officer Desk
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        Counselor authentication
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Quick Contact Desk */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                Admissions Contact Desk
              </div>

              {whatsappConfig.isConfigured && (
                <a
                  href={whatsappConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Chat on WhatsApp Admissions Desk</span>
                </a>
              )}

              <a
                href="mailto:admissions@myersglobalpathways.com"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">admissions@myersglobalpathways.com</span>
              </a>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-800/90 bg-slate-900/80 text-[10px] text-slate-400 text-center flex items-center justify-between">
            <span>© 2026 {COMPANY.shortName}</span>
            <span className="text-amber-400 font-medium">Study in India</span>
          </div>
        </div>
      </div>
    </>
  );
};


