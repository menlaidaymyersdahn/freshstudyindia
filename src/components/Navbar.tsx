import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COMPANY } from '../config/company';
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
  Phone,
  ShieldCheck
} from 'lucide-react';
import { StarfieldButton } from './StarfieldButton';

interface NavbarProps {
  onOpenApplication?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: Array<{ path: string; label: string; icon: React.ElementType; description: string }> = [
    { path: '/', label: 'Home', icon: Compass, description: 'Overview & introduction' },
    { path: '/study-in-india', label: 'Study in India', icon: Globe, description: 'Academic landscape & benefits' },
    { path: '/services', label: 'Services', icon: Sparkles, description: 'Our 8 end-to-end services' },
    { path: '/universities', label: 'Universities', icon: GraduationCap, description: 'Program directory & finder' },
    { path: '/faq', label: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
    { path: '/about', label: 'About', icon: BookOpen, description: 'Our mission & core principles' },
    { path: '/contact', label: 'Contact', icon: Mail, description: 'Admissions desk & directory' },
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

  const handleNavigate = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleApplyClick = () => {
    setMobileMenuOpen(false);
    if (onOpenApplication) {
      onOpenApplication();
    } else {
      navigate('/apply');
    }
  };

  const isCurrentPath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#E6F1FD]/95 backdrop-blur-md border-b border-sky-300 shadow-sm py-3' 
            : 'bg-[#EBF4FE]/90 backdrop-blur-sm border-b border-sky-200/90 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <Link 
              to="/"
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
              aria-label="Myers Global Pathways — Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0" aria-hidden="true">
                <Compass className="w-5 h-5 text-amber-300 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-slate-950 group-hover:text-blue-700 transition-colors">
                  {COMPANY.name}
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-bold text-blue-700">
                  {COMPANY.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-white/80 p-1.5 rounded-2xl border border-sky-200 shadow-xs backdrop-blur-sm" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = isCurrentPath(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                        : 'text-slate-700 hover:text-blue-900 hover:bg-sky-100/80'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {/* Admin Portal Trigger */}
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-xl text-xs font-bold border shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  location.pathname === '/admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'text-slate-800 bg-white/80 hover:bg-white hover:text-blue-900 border-sky-300'
                }`}
                title="Admissions Staff & Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="hidden xl:inline">Admin Portal</span>
              </Link>

              {/* Student Portal Trigger */}
              <Link
                to="/student-portal"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  location.pathname === '/student-portal'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'text-blue-900 bg-white/90 hover:bg-white border-sky-300'
                }`}
                title="View your submitted application status"
              >
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Student Portal</span>
              </Link>

              {/* Primary CTA Button */}
              <StarfieldButton
                onClick={handleApplyClick}
                fill="#f59e0b"
                textColor="#0f172a"
                padding="10px 18px"
                rounded={100}
                glow={{ color: '#fbbf24', size: 14, opacity: 100 }}
                stroke={{ color: '#d97706', size: 70, count: 2, speed: 60, movement: 'continuous', direction: 'cw', thickness: 2 }}
                pixel={{ color: '#b45309', size: 3, density: 50, brightness: 100 }}
                border={{ borderColor: 'rgba(217, 119, 6, 0.4)', borderWidth: 1.5, borderStyle: 'solid' }}
              >
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">Start Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </StarfieldButton>
            </div>

            {/* Mobile Menu & Quick Apply Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handleApplyClick}
                className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-xs"
              >
                Apply
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl text-slate-800 hover:text-blue-900 bg-white border border-sky-300 shadow-xs transition-colors cursor-pointer"
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
          className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-out Panel from Right */}
        <div 
          className={`fixed inset-y-0 right-0 max-w-sm w-[88vw] bg-[#EBF4FE] border-l border-sky-300 text-slate-900 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 overflow-hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-sky-200 flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-sm shrink-0">
                <Compass className="w-4.5 h-4.5 text-amber-300 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-sm font-extrabold tracking-tight text-slate-950 leading-tight">
                  {COMPANY.name}
                </span>
                <span className="block text-[9px] tracking-wider uppercase font-bold text-blue-700">
                  Navigation & Desk
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 bg-white border border-sky-300 transition-colors cursor-pointer shadow-xs"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5 text-left">
            
            {/* Primary Action Button (Prominent Orange/Gold CTA at the Top) */}
            <div>
              <button
                onClick={handleApplyClick}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-between shadow-md shadow-amber-500/25 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 mb-2">
                Pages & Portals
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isCurrentPath(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white font-bold shadow-sm' 
                        : 'hover:bg-white text-slate-800 bg-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-sky-100 text-blue-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="block text-sm leading-snug">{link.label}</span>
                        <span className={`block text-[11px] font-normal leading-none mt-0.5 ${
                          isActive ? 'text-blue-100 font-medium' : 'text-slate-500'
                        }`}>
                          {link.description}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Student & Admin Portal Options (Visually Separated) */}
            <div className="pt-3 border-t border-sky-200 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2">
                Restricted & Authenticated Access
              </div>

              <Link
                to="/student-portal"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer shadow-xs ${
                  location.pathname === '/student-portal'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-sky-300 hover:border-blue-500 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    location.pathname === '/student-portal' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold">Student Portal</span>
                    <span className={`block text-[11px] ${location.pathname === '/student-portal' ? 'text-blue-100' : 'text-slate-500'}`}>
                      Track application status & letters
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer shadow-xs ${
                  location.pathname === '/admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                    : 'bg-amber-50/80 border-amber-300 hover:border-amber-500 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-950">Admissions Admin Portal</span>
                    <span className="block text-[11px] text-amber-800 font-medium">Manage, review & approve students</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Direct Contact Phone & WhatsApp */}
            <div className="p-3.5 rounded-2xl bg-white border border-sky-300 shadow-xs text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Direct Admissions Desk</span>
              </div>
              <p className="text-[11px] text-slate-600">Monrovia, Liberia: <strong className="text-emerald-700">+231 889425645</strong></p>
              <p className="text-[11px] text-slate-600">India Desk: <strong className="text-blue-800">+91 93478 69324</strong></p>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-sky-200 bg-white/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>© 2026 {COMPANY.shortName}</span>
            <button
              onClick={() => handleNavigate('/admin')}
              className="text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Admin Portal
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
