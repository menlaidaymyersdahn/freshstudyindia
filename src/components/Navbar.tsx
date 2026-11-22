import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { Menu, X, ArrowRight, MessageCircle, MessageSquare } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

interface NavbarProps {
  onOpenApplication?: () => void;
  onOpenAdvisor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication, onOpenAdvisor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappConfig = getWhatsAppConfig();

  const navLinks: Array<{ path: string; label: string }> = [
    { path: '/', label: 'Home' },
    { path: '/study-in-india', label: 'Study in India' },
    { path: '/universities', label: 'Universities' },
    { path: '/services', label: 'Our Services' },
    { path: '/student-life', label: 'Student Life' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 h-16 font-body transition-ui border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/90 shadow-[0_4px_20px_rgba(11,31,58,0.06)]'
            : 'bg-white border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6">
          {/* Zone 1: Official Myers Global Pathways Logo */}
          <Link
            to="/"
            className="hover:opacity-90 transition-ui shrink-0 flex items-center"
            aria-label="Myers Global Pathways — Home"
          >
            <OfficialLogo variant="header" />
          </Link>

          {/* Zone 2: Clean Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = isCurrentPath(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2.5 xl:px-3 py-2 text-[13.5px] xl:text-sm whitespace-nowrap shrink-0 transition-ui ${
                    isActive
                      ? 'text-[#0B1F3A] font-semibold'
                      : 'text-slate-600 font-medium hover:text-[#0B1F3A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute left-2.5 right-2.5 bottom-0.5 h-[2px] bg-[#C5922E] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Prominent Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              onClick={handleApplyClick}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#132E54] transition-ui cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5922E]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleApplyClick}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#0B1F3A] hover:bg-[#132E54] transition-ui cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              Apply Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-lg text-[#0B1F3A] bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-ui cursor-pointer min-h-[40px] min-w-[40px] inline-flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-ui ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#071426]/55 backdrop-blur-[2px]"
        />

        <div
          className={`fixed inset-y-0 right-0 max-w-sm w-[88vw] bg-white border-l border-slate-200 flex flex-col justify-between transition-ui z-10 shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="min-h-[68px] py-2.5 px-5 border-b border-slate-200 flex items-center justify-between bg-[#0B1F3A] text-white shrink-0">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Myers Global Pathways — Home"
              className="inline-flex items-center"
            >
              <OfficialLogo variant="badge" size="sm" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-ui cursor-pointer min-h-[40px] min-w-[40px] inline-flex items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left">
            <button
              type="button"
              onClick={handleApplyClick}
              className="w-full py-3.5 px-4 rounded-lg text-sm font-semibold text-[#081528] bg-[#C5922E] hover:bg-[#D4A13B] transition-ui cursor-pointer flex items-center justify-center gap-2 min-h-[46px]"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <nav className="space-y-1" aria-label="Mobile Links">
              {navLinks.map((link) => {
                const isActive = isCurrentPath(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-3 rounded-lg text-sm transition-ui ${
                      isActive
                        ? 'bg-[#0B1F3A]/[0.06] text-[#0B1F3A] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A] font-medium'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 space-y-1">
              <Link
                to="/student-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50 transition-ui"
              >
                Student Portal (Track Application)
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0B1F3A] transition-ui"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-[#0B1F3A] transition-ui"
              >
                Admissions Admin
              </Link>
            </div>

            {/* Inline Mobile Contact & Advisor Actions (replaces intrusive floating buttons on mobile) */}
            <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200/80 space-y-3">
              <p className="font-display text-xs font-bold text-[#0B1F3A]">
                Direct Admissions Support
              </p>
              <div className="space-y-2">
                <a
                  href={whatsappConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] flex items-center justify-between transition-ui min-h-[44px]"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#C5922E]" />
                    <span>WhatsApp Desk</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-600 tabular-nums">{COMPANY.primaryPhone}</span>
                </a>

                {onOpenAdvisor && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdvisor();
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold hover:bg-[#132E54] flex items-center justify-center gap-2 transition-ui cursor-pointer min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#E5B95C]" />
                    <span>Ask Admissions Advisor</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500 tabular-nums">
                India Desk: {COMPANY.alternativePhone}
              </p>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between shrink-0">
            <span>© {COMPANY.year} {COMPANY.shortName}</span>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#0B1F3A] font-medium hover:text-[#9A6D17] transition-ui"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
