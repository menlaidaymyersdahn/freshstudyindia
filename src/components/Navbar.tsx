import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COMPANY } from '../config/company';
import { Menu, X } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenApplication?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: Array<{ path: string; label: string }> = [
    { path: '/study-in-india', label: 'Study in India' },
    { path: '/services', label: 'Services' },
    { path: '/universities', label: 'Universities' },
    { path: '/student-life', label: 'Student life' },
    { path: '/faq', label: 'FAQ' },
    { path: '/about', label: 'About' },
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
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-ui border-b ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-sm border-[#181A1F]/[0.10]'
            : 'bg-[#F7F5F0] border-[#181A1F]/[0.08]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-4">
          {/* Single-line Brand Wordmark */}
          <Link
            to="/"
            className="text-base font-medium tracking-[-0.015em] text-[#181A1F] hover:text-[#A63A24] transition-ui whitespace-nowrap shrink-0"
            aria-label="Myers Global Pathways — Home"
          >
            {COMPANY.shortName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = isCurrentPath(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 xl:px-3 py-2 rounded-lg text-sm font-normal whitespace-nowrap transition-ui ${
                    isActive
                      ? 'text-[#A63A24] bg-[#A63A24]/[0.07] font-medium'
                      : 'text-[#4F535C] hover:text-[#181A1F] hover:bg-[#181A1F]/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quiet Utility Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              to="/student-portal"
              className={`px-2 py-2 rounded-lg text-sm whitespace-nowrap transition-ui ${
                location.pathname.startsWith('/student-portal')
                  ? 'text-[#A63A24] font-medium'
                  : 'text-[#4F535C] hover:text-[#181A1F]'
              }`}
            >
              Student portal
            </Link>

            <Link
              to="/admin"
              className={`px-2 py-2 rounded-lg text-sm whitespace-nowrap transition-ui ${
                location.pathname === '/admin'
                  ? 'text-[#A63A24] font-medium'
                  : 'text-[#6E727D] hover:text-[#181A1F]'
              }`}
            >
              Admin
            </Link>

            <PWAInstallButton />

            <button
              type="button"
              onClick={handleApplyClick}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#181A1F] bg-white border border-[#181A1F]/[0.14] hover:border-[#A63A24] hover:text-[#A63A24] transition-ui cursor-pointer whitespace-nowrap"
            >
              Apply
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <PWAInstallButton compact />

            <button
              type="button"
              onClick={handleApplyClick}
              className="px-3 py-2 rounded-lg text-xs font-medium text-[#181A1F] bg-white border border-[#181A1F]/[0.14] hover:border-[#A63A24] hover:text-[#A63A24] transition-ui cursor-pointer"
            >
              Apply
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-[#181A1F] bg-white border border-[#181A1F]/[0.10] hover:border-[#181A1F]/[0.20] transition-ui cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-ui ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#181A1F]/30"
        />

        <div
          className={`fixed inset-y-0 right-0 max-w-sm w-full bg-[#F7F5F0] border-l border-[#181A1F]/[0.10] flex flex-col justify-between transition-ui z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-16 px-6 border-b border-[#181A1F]/[0.08] flex items-center justify-between bg-white">
            <span className="text-base font-medium text-[#181A1F]">{COMPANY.shortName}</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#4F535C] hover:text-[#181A1F] border border-[#181A1F]/[0.10] transition-ui cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleApplyClick}
                className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#A63A24] hover:bg-[#8C2F1C] transition-ui cursor-pointer text-center"
              >
                Start your application
              </button>
              <Link
                to="/download-app"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2 px-4 rounded-lg text-sm font-medium text-[#181A1F] bg-white border border-[#181A1F]/[0.14] text-center transition-ui"
              >
                Install app / Android APK
              </Link>
            </div>

            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-ui ${
                  location.pathname === '/'
                    ? 'bg-white text-[#A63A24] font-medium border border-[#181A1F]/[0.08]'
                    : 'text-[#4F535C] hover:bg-white hover:text-[#181A1F]'
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => {
                const isActive = isCurrentPath(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-ui ${
                      isActive
                        ? 'bg-white text-[#A63A24] font-medium border border-[#181A1F]/[0.08]'
                        : 'text-[#4F535C] hover:bg-white hover:text-[#181A1F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#181A1F]/[0.08] space-y-1">
              <Link
                to="/student-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-[#181A1F] hover:bg-white transition-ui"
              >
                Student portal
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-[#4F535C] hover:bg-white hover:text-[#181A1F] transition-ui"
              >
                Admissions admin
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#181A1F]/[0.08] space-y-2 text-sm text-[#4F535C]">
              <p className="font-medium text-[#181A1F]">Direct admissions desk</p>
              <p>Monrovia, Liberia: {COMPANY.primaryPhone}</p>
              <p>India desk: {COMPANY.alternativePhone}</p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-[#181A1F]/[0.08] bg-white text-xs text-[#6E727D] flex items-center justify-between">
            <span>© 2026 {COMPANY.shortName}</span>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#181A1F] hover:text-[#A63A24] transition-ui"
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
