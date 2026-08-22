import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Share2,
  Lock,
  Globe2
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenApplication?: () => void;
  onOpenShare?: () => void;
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPrivacy, 
  onOpenApplication,
  onOpenShare,
  onOpenPortal
}) => {
  return (
    <footer className="bg-[#EBF3FC] text-slate-900 border-t border-sky-200/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-400/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-sky-200">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-700 border border-white/40 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Fresh Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-600">India</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Official international student admissions desk connecting ambitious students from Africa and around the globe with accredited Indian universities. Direct bonafide letters, visa dossiers, and airport arrival support.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Admissions</span>
              </a>

              {onOpenShare && (
                <button
                  onClick={onOpenShare}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
                  title="Share Website"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#hero" className="hover:text-rose-600 transition">Home Desk</a></li>
              <li><a href="#study-in-india" className="hover:text-rose-600 transition">Why Study in India</a></li>
              <li><a href="#study-options" className="hover:text-rose-600 transition">Degree Programs</a></li>
              <li><a href="#gallery" className="hover:text-rose-600 transition">Campus Photo Gallery</a></li>
              <li><a href="#journey" className="hover:text-rose-600 transition">How It Works</a></li>
              <li><a href="#eligibility-checker" className="hover:text-rose-600 transition">Eligibility Checker</a></li>
              <li><a href="#contact" className="hover:text-rose-600 transition">Contact Desk</a></li>
            </ul>
          </div>

          {/* Col 3: Degree Streams */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Accredited Streams
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Computer Science & Artificial Intelligence</li>
              <li>B.Sc Nursing & Health Sciences</li>
              <li>Pharmacy (B.Pharm / Pharm.D)</li>
              <li>Engineering (Robotics, Mechanical, Civil)</li>
              <li>Business Management (BBA / MBA)</li>
              <li>Cyber Security & Network Defense</li>
              <li>Microbiology & Biotechnology</li>
            </ul>
          </div>

          {/* Col 4: Dual Desks Contact */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Direct Contact Desks
            </p>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl bg-white border border-sky-200">
                <p className="font-bold text-slate-900">🇮🇳 India Admissions HQ</p>
                <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-mono text-blue-700 font-bold block mt-0.5">
                  {BRAND.contacts.india.phoneDisplay}
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-sky-200">
                <p className="font-bold text-slate-900">🇱🇷 Monrovia, Liberia Desk</p>
                <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-mono text-rose-700 font-bold block mt-0.5">
                  {BRAND.contacts.liberia.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Fresh Study India. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={onOpenPrivacy}
              className="text-slate-600 hover:text-slate-900 transition underline cursor-pointer"
            >
              Privacy Policy & Terms
            </button>
            {onOpenPortal && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenPortal}
                  className="text-slate-600 hover:text-rose-600 transition flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-rose-600" />
                  <span>Counselor Portal</span>
                </button>
              </>
            )}
          </div>

          <div className="text-slate-500 text-[11px] text-center md:text-right">
            <span>Accredited Indian University Admissions & Visa Support Advisory</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
