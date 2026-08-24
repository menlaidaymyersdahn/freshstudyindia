import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { BRAND } from '../lib/constants';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 my-8 space-y-5 animate-in zoom-in-95 duration-200 text-slate-800">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B192C]">Privacy & Data Policy</h3>
              <p className="text-xs text-slate-500">Myers Global Pathway International Education Services</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <p>
            At <strong>{BRAND.name}</strong>, we respect the privacy of all student applicants and their families. This policy outlines how information is collected, used, and safeguarded.
          </p>

          <h4 className="text-sm font-bold text-[#0B192C] pt-2">1. Information We Collect</h4>
          <p>
            We collect information provided directly by you when submitting enquiries or application profiles, including your full name, phone number, WhatsApp details, country of residence, desired field of study, and academic background.
          </p>

          <h4 className="text-sm font-bold text-[#0B192C] pt-2">2. How We Use Your Information</h4>
          <p>
            Your information is strictly used for the purpose of educational counseling, assessing eligibility for Indian universities, facilitating communication with admissions counselors, and supporting visa and arrival documentation.
          </p>

          <h4 className="text-sm font-bold text-[#0B192C] pt-2">3. Third-Party Sharing</h4>
          <p>
            We do not sell, rent, or trade your personal data. Data is shared exclusively with accredited partner institutions in India strictly for the purpose of securing provisional admission offer letters upon your authorization.
          </p>

          <h4 className="text-sm font-bold text-[#0B192C] pt-2">4. Contact & Queries</h4>
          <p>
            If you have questions regarding your data or wish to update your records, you may contact our admissions desks in India ({BRAND.contacts.india.phoneDisplay}) or Liberia ({BRAND.contacts.liberia.phoneDisplay}).
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0B192C] text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
