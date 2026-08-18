import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Heart, Mail, Phone } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openAuthModal?: (portal?: 'student' | 'counselor' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openAuthModal }) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };
  return (
    <footer className="bg-white border-t border-[#D9EAF7] mt-12 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#102A43]">
              Fresh Study <span className="text-[#1677FF]">India</span>
            </span>
          </div>

          <p className="text-[#52667A] text-xs leading-relaxed max-w-sm font-medium">
            Empowering domestic and international students with transparent admissions across 15,000+ academic programs, student visa filing, and expert career counseling.
          </p>

          <div className="space-y-1.5 text-xs text-[#52667A] font-semibold pt-1">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
              <a href="mailto:freshstudyindia@gmail.com" className="hover:text-[#1677FF] transition">
                freshstudyindia@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
              <a href="tel:+231889425645" className="hover:text-[#1677FF] transition">
                +231 889425645
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#52667A] font-medium">
            <span>© 2024 - 2026 Fresh Study India. All rights reserved.</span>
            {openAuthModal && (
              <>
                <span>•</span>
                <button 
                  onClick={() => openAuthModal('counselor')}
                  className="hover:text-[#1677FF] transition cursor-pointer"
                  title="Restricted Staff Login Portal"
                >
                  Staff Portal
                </button>
                <span>•</span>
                <button 
                  onClick={() => openAuthModal('admin')}
                  className="hover:text-[#1677FF] transition cursor-pointer"
                  title="Restricted Administrator Console"
                >
                  Admin Console
                </button>
              </>
            )}
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-2 text-xs">
          <h4 className="font-extrabold text-[#102A43] uppercase text-[10px] tracking-wider mb-3">Explore Hub</h4>
          <ul className="space-y-2 text-[#52667A] font-medium">
            <li>
              <button onClick={() => setActiveTab('courses')} className="hover:text-[#1677FF] transition">
                Academic Programs & Courses
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gallery')} className="hover:text-[#1677FF] transition">
                Campus & Student Life
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('testimonials')} className="hover:text-[#1677FF] transition">
                Student Testimonials
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('blog')} className="hover:text-[#1677FF] transition">
                Admissions Blog & Advice
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-[#1677FF] transition">
                Contact & Support Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-4 space-y-3 text-xs">
          <h4 className="font-extrabold text-[#102A43] uppercase text-[10px] tracking-wider mb-2">Weekly Update Newsletter</h4>
          <p className="text-[#52667A] text-[11px] font-medium">
            Get admission deadlines, entrance guidance, and visa policy changes delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="p-3 bg-[#EBF5FE] border border-[#BFDBFE] text-[#1677FF] rounded-xl text-xs font-bold">
              ✓ Subscribed! You will receive weekly study abroad and student visa updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter student email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-[#F5FAFF] border border-[#D9EAF7] rounded-xl text-xs focus:outline-none focus:border-[#1677FF] text-[#102A43]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1677FF] hover:bg-[#005cd6] text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-xs"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>
    </footer>
  );
};
