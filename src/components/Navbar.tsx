import React, { useState } from 'react';
import { ActiveTab, UserRole, UserProfile } from '../types';
import { 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Moon, 
  Sun, 
  UserCheck,
  LogOut,
  LayoutDashboard,
  Mail,
  Phone
} from 'lucide-react';
import { mockUniversities, mockCourses, mockScholarships } from '../data/mockData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  userProfile?: UserProfile | null;
  openAuthModal: (portal?: 'student' | 'counselor' | 'admin') => void;
  openApplyModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  userProfile,
  openAuthModal,
  openApplyModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Global Search State
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks: { label: string; tab: ActiveTab; highlight?: boolean }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'AI Advisor', tab: 'ai-advisor', highlight: true },
    { label: 'Courses', tab: 'courses' },
    { label: 'Gmail Desk', tab: 'gmail' },
    { label: 'Gallery', tab: 'gallery' },
    { label: 'Testimonials', tab: 'testimonials' },
    { label: 'Blog', tab: 'blog' },
    { label: 'FAQ', tab: 'faq' },
    { label: 'Contact', tab: 'contact' },
    { label: 'Legal & Policy', tab: 'privacy' },
  ];

  // Search Results Filter
  const filteredCourses = searchQuery ? mockCourses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.discipline.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const getUserDashboardTab = (): ActiveTab => {
    if (userRole === 'admin') return 'admin-dashboard';
    if (userRole === 'counselor') return 'counselor-dashboard';
    return 'student-dashboard';
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Official Helpdesk Top Bar */}
      <div className="bg-[#EBF5FE] text-[#102A43] text-[11px] px-4 sm:px-8 py-1.5 flex flex-wrap justify-between items-center border-b border-[#D9EAF7]">
        <div className="flex items-center gap-4 font-semibold">
          <span className="hidden md:inline-block text-[#1677FF] font-extrabold uppercase tracking-wider">
            Official Study in India Helpdesk
          </span>
          <a href="mailto:freshstudyindia@gmail.com" className="flex items-center gap-1.5 text-[#52667A] hover:text-[#1677FF] transition">
            <Mail className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>freshstudyindia@gmail.com</span>
          </a>
          <a href="tel:+231889425645" className="flex items-center gap-1.5 text-[#52667A] hover:text-[#1677FF] transition">
            <Phone className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>+231 889425645</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px] text-[#52667A] font-bold">
          <button 
            onClick={() => { setActiveTab('gmail'); window.history.pushState({}, '', '/gmail'); }}
            className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer bg-red-50 px-2 py-0.5 rounded border border-red-200"
          >
            <Mail className="w-3 h-3 text-red-500" />
            <span>Gmail Desk (/gmail)</span>
          </button>
          <span>•</span>
          <button 
            onClick={() => { setActiveTab('student-login'); window.history.pushState({}, '', '/login'); }}
            className="text-[#1677FF] hover:underline cursor-pointer"
          >
            Student Login (/login)
          </button>
          <span>•</span>
          <button 
            onClick={() => { setActiveTab('counselor-login'); window.history.pushState({}, '', '/counselor/login'); }}
            className="text-amber-700 hover:underline cursor-pointer"
          >
            Counselor Desk (/counselor/login)
          </button>
          <span>•</span>
          <button 
            onClick={() => { setActiveTab('admin-login'); window.history.pushState({}, '', '/admin/login'); }}
            className="text-indigo-700 hover:underline cursor-pointer"
          >
            Admin Portal (/admin/login)
          </button>
        </div>
      </div>

      <nav className="h-16 bg-white/95 backdrop-blur-md border-b border-[#D9EAF7] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 transition-colors shadow-xs">
      
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => setActiveTab('home')}
      >
        <div className="w-9 h-9 bg-gradient-to-tr from-[#1677FF] via-[#0284C7] to-[#38BDF8] rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20 transition-transform hover:scale-105">
          <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
        </div>
        <span className="font-extrabold text-xl tracking-tight text-[#102A43]">
          Fresh Study <span className="text-[#1677FF]">India</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden xl:flex items-center gap-5 text-xs font-semibold text-[#52667A]">
        {navLinks.map((link) => {
          const isActive = activeTab === link.tab;
          return (
            <button
              key={link.tab}
              onClick={() => setActiveTab(link.tab)}
              className={`transition-colors duration-150 relative py-1 flex items-center gap-1.5 cursor-pointer ${
                isActive 
                  ? 'text-[#1677FF] font-bold' 
                  : 'hover:text-[#102A43] text-[#52667A]'
              }`}
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#1677FF] animate-pulse" />}
              <span>{link.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1677FF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action Controls & Utilities */}
      <div className="hidden lg:flex items-center gap-2.5">
        
        {/* Global Search Button */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="p-2 text-[#52667A] hover:text-[#102A43] rounded-full hover:bg-[#F0F7FF] transition cursor-pointer border border-[#D9EAF7]"
          title="Search Universities & Courses"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* APPLY NOW Button */}
        <button
          onClick={openApplyModal}
          className="px-4 py-2 bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:from-[#005cd6] hover:to-[#0284c7] text-white font-bold rounded-full text-xs shadow-md shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply Now</span>
        </button>

        {/* SECURE AUTHENTICATION STATE */}
        {userRole !== 'guest' ? (
          <div className="flex items-center gap-2 ml-1">
            
            {/* Dashboard Badge Link */}
            <button
              onClick={() => setActiveTab(getUserDashboardTab())}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition cursor-pointer ${
                userRole === 'admin' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100' 
                  : userRole === 'counselor'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  : 'bg-blue-50 text-[#1677FF] border border-[#BFDBFE] hover:bg-blue-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{userProfile?.name ? userProfile.name.split(' ')[0] : 'My'} Portal</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white shadow-xs">
                {userRole}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 text-[#52667A] hover:text-red-600 rounded-full hover:bg-red-50 transition cursor-pointer"
              title="Sign Out of Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-1.5 ml-1">
            <button
              onClick={() => {
                setActiveTab('student-login');
                window.history.pushState({}, '', '/login');
              }}
              className="text-xs font-bold px-3.5 py-2 text-[#1677FF] bg-[#EBF5FE] hover:bg-[#1677FF] hover:text-white border border-[#D9EAF7] rounded-full transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal Login</span>
            </button>
          </div>
        )}

      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-[#52667A] hover:text-[#102A43] rounded-xl border border-[#D9EAF7] bg-white shadow-xs"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#D9EAF7] p-6 shadow-2xl flex flex-col gap-4 z-50 max-h-[85vh] overflow-y-auto">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openApplyModal();
            }}
            className="w-full py-3 bg-gradient-to-r from-[#1677FF] to-[#38BDF8] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Apply Now
          </button>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => {
                  setActiveTab(link.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-xl text-xs font-semibold transition ${
                  activeTab === link.tab
                    ? 'bg-[#EBF5FE] text-[#1677FF] font-bold border border-[#BFDBFE]'
                    : 'text-[#52667A] hover:bg-[#F5FAFF] hover:text-[#102A43]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <hr className="border-[#D9EAF7]" />

          {/* Mobile Auth Actions */}
          {userRole !== 'guest' ? (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-[#52667A] uppercase">Authenticated Session</div>
              <button
                onClick={() => {
                  setActiveTab(getUserDashboardTab());
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-[#1677FF] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Access {userRole.toUpperCase()} Dashboard
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 bg-[#F0F7FF] text-[#102A43] rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-[#52667A] uppercase">Student Access</div>
              <button
                onClick={() => {
                  openAuthModal('student');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-[#1677FF] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <User className="w-4 h-4" /> Student Portal Sign In / Register
              </button>
            </div>
          )}
        </div>
      )}

      {/* Global Search Modal Overlay */}
      {globalSearchOpen && (
        <div 
          className="fixed inset-0 bg-[#102A43]/40 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4"
          onClick={() => setGlobalSearchOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-5 border border-[#D9EAF7] shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="w-5 h-5 text-[#52667A] absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoFocus
                placeholder="Search degree programs, engineering, medicine, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#F5FAFF] border border-[#D9EAF7] rounded-2xl text-xs font-medium focus:outline-none focus:border-[#1677FF] text-[#102A43]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-[#52667A] hover:text-[#102A43] text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Output */}
            <div className="max-h-80 overflow-y-auto space-y-3">
              {searchQuery && filteredCourses.length === 0 && (
                <p className="text-xs text-[#52667A] text-center py-6">
                  No matching course or academic program found for "{searchQuery}".
                </p>
              )}

              {filteredCourses.length > 0 && (
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-[#52667A] mb-1">Academic Programs & Courses ({filteredCourses.length})</div>
                  {filteredCourses.map((c) => (
                    <div 
                      key={c.id}
                      onClick={() => {
                        setActiveTab('courses');
                        setGlobalSearchOpen(false);
                      }}
                      className="p-2.5 hover:bg-[#F0F7FF] rounded-xl cursor-pointer flex justify-between items-center text-xs transition"
                    >
                      <div>
                        <span className="font-bold text-[#102A43] block">{c.title}</span>
                        <span className="text-[10px] text-[#52667A]">{c.level} • {c.discipline}</span>
                      </div>
                      <span className="text-[10px] text-[#1677FF] font-bold px-2 py-0.5 bg-[#EBF5FE] rounded-md border border-[#D9EAF7]">View Program</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#D9EAF7] flex justify-between items-center text-[11px] text-[#52667A]">
              <span>Press ESC or click outside to close</span>
              <button 
                onClick={() => setGlobalSearchOpen(false)}
                className="font-bold text-[#1677FF] hover:underline cursor-pointer"
              >
                Close Search
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
    </header>
  );
};
