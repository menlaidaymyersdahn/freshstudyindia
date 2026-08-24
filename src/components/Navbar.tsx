import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle,
  FileCheck2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { NavTab } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenApplication: (field?: string) => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab,
  onNavigate,
  onOpenApplication,
  onOpenPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Requested Center/right navigation items exactly:
  // Home, Study in India, Services, Universities, About, Contact
  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'study-in-india', label: 'Study in India' },
    { id: 'services', label: 'Services' },
    { id: 'universities', label: 'Universities' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tab: NavTab) => {
    setIsMobileMenuOpen(false);
    onNavigate(tab);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050B14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' 
          : 'bg-[#050B14]/85 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <button 
            id="nav-logo-btn"
            onClick={() => handleTabClick('home')}
            className="flex items-center group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 -ml-1"
            aria-label="Myers Global Pathways - Home"
          >
            <BrandLogo size="md" variant="horizontal" theme="light" />
          </button>

          {/* Center / Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id || 
                (link.id === 'universities' && activeTab === 'programs') ||
                (link.id === 'about' && (activeTab === 'why-us' || activeTab === 'process'));
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleTabClick(link.id)}
                  className={`text-xs xl:text-[13px] font-medium tracking-wide px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-amber-400 font-semibold border border-amber-400/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Student Portal Tracker Button */}
            {onOpenPortal && (
              <button
                id="nav-portal-btn"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-slate-800"
                title="Track Application Status"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Track Status</span>
              </button>
            )}

            {/* Direct WhatsApp Quick Contact */}
            <a
              id="nav-whatsapp-btn"
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors border border-emerald-500/30 hover:border-emerald-500/50"
              title="Chat with Myers Global Pathways on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary CTA: START YOUR APPLICATION */}
            <button
              id="nav-apply-btn"
              onClick={() => onOpenApplication()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-md hover:shadow-amber-500/20 cursor-pointer active:scale-98"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              id="nav-mobile-whatsapp-btn"
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#050B14]/98 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-6 px-6 max-h-[calc(100vh-65px)] overflow-y-auto"
        >
          <div className="space-y-4">
            <nav className="space-y-1.5 border-b border-slate-800/80 pb-4">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id || 
                  (link.id === 'universities' && activeTab === 'programs') ||
                  (link.id === 'about' && (activeTab === 'why-us' || activeTab === 'process'));
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleTabClick(link.id)}
                    className={`w-full text-left block px-4 py-3 text-sm font-medium rounded-xl transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 space-y-3">
              <button
                id="mobile-nav-apply-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="mobile-nav-wa-btn"
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (+91 9201330946)</span>
              </a>

              {onOpenPortal && (
                <button
                  id="mobile-nav-portal-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800/80 bg-slate-950/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Student Portal / Track Application</span>
                </button>
              )}

              <div className="pt-2 text-center">
                <a
                  href={`mailto:${BRAND.emails.admissions}`}
                  className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-mono"
                >
                  {BRAND.emails.admissions}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
