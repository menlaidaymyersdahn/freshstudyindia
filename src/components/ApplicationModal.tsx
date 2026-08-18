import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetField?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  presetField 
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Liberia');
  const [studyField, setStudyField] = useState(presetField || 'Computer Science');
  const [qualification, setQualification] = useState('High School Diploma (WAEC / WASSCE)');
  const [intake, setIntake] = useState('2026 Academic Intake (August/September)');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (presetField) {
      setStudyField(presetField);
    }
  }, [presetField]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const countries = [
    'Liberia',
    'Ghana',
    'Nigeria',
    'Kenya',
    'Sierra Leone',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Zambia',
    'Zimbabwe',
    'Gambia',
    'Other International'
  ];

  const studyFields = [
    'Computer Science',
    'Business & Management',
    'Engineering & Technology',
    'Healthcare & Allied Sciences',
    'Data & Technology',
    'Law & Legal Studies',
    'Other Study Options'
  ];

  const qualifications = [
    'High School Diploma (WAEC / WASSCE)',
    'Currently in Senior High School',
    'Undergraduate / Bachelor’s Degree',
    'Diploma / Polytechnic Certificate',
    'Master’s / Postgraduate Degree'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-xl p-6 sm:p-9 shadow-2xl border border-slate-200 z-10 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
              Application Profile Created!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. Your profile for <strong className="text-slate-900">{studyField}</strong> has been received by our Admissions Committee.
            </p>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-900 space-y-1 text-left">
              <p className="font-bold">Next Steps:</p>
              <p>An educational counselor will review your eligibility and reach out via WhatsApp / Phone to discuss your shortlisted universities.</p>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLink('india', `Hello Fresh Study India, I have submitted my application profile for ${fullName} (${studyField}, ${country}). I would like to speak with an advisor.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl text-xs font-extrabold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect with Advisor on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[11px] font-bold uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Intake 2026</span>
              </div>
              <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
                Start Your India Application
              </h3>
              <p className="text-xs text-slate-600">
                Complete this initial profile to receive university options and admissions guidance.
              </p>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emmanuel Sayon Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                />
              </div>

              {/* Two Column: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp / Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +231 889425645"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                  />
                </div>
              </div>

              {/* Two Column: Country & Desired Study Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Desired Field <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                  >
                    {studyFields.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Highest Qualification */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Current / Highest Education Level
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                >
                  {qualifications.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Questions or Preferred Cities (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Interested in Bangalore or Delhi, need hostel options"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-[#0B192C] hover:bg-[#1E2E48] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Application Profile...</span>
                  ) : (
                    <>
                      <span>SUBMIT APPLICATION PROFILE</span>
                      <ArrowRight className="w-4 h-4 text-sky-400" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero obligation • Direct university guidance</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
