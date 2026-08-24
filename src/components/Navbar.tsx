import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { NavTab } from '../types';

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
  onOpenApplication
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'study-in-india', label: 'Study in India' },
    { id: 'services', label: 'Services' },
    { id: 'programs', label: 'Programs' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tab: NavTab) => {
    setIsMobileMenuOpen(false);
    onNavigate(tab);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5' 
          : 'bg-white/90 backdrop-blur-xs border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-900 transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                Myers Global <span className="text-blue-700">Pathways</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500">
                International Admissions Advisory
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`text-xs xl:text-sm font-semibold px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors border border-slate-200/80 hover:border-emerald-200"
              title="Chat with Admissions Advisor on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenApplication()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl py-6 px-6 max-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="space-y-4">
            <nav className="space-y-1 border-b border-slate-100 pb-4">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleTabClick(link.id)}
                    className={`w-full text-left block px-3.5 py-2.5 text-sm font-semibold rounded-lg transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-800 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp (+91 9201330946)</span>
              </a>

              <a
                href={`mailto:${BRAND.emails.admissions}`}
                className="w-full py-2.5 text-xs text-center text-slate-600 hover:text-slate-900 block font-medium"
              >
                {BRAND.emails.admissions}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

