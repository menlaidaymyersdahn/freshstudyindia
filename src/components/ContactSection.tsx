import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  Mail, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface ContactSectionProps {
  onNavigateHome?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Liberia',
    program: 'Computer Science & Information Technology',
    preferredUniversity: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setErrorMessage('Please provide at least an email address or WhatsApp/phone number.');
      return;
    }

    setIsSubmitting(true);

    // Format WhatsApp message payload
    const textLines = [
      `*NEW ADMISSIONS ENQUIRY - Myers Global Pathways*`,
      ``,
      `*Full Name:* ${formData.fullName.trim()}`,
      `*Email:* ${formData.email.trim() || 'Not provided'}`,
      `*WhatsApp/Phone:* ${formData.phone.trim() || 'Not provided'}`,
      `*Country of Residence:* ${formData.country}`,
      `*Program / Field of Interest:* ${formData.program}`,
      formData.preferredUniversity.trim() ? `*Preferred University:* ${formData.preferredUniversity.trim()}` : null,
      formData.message.trim() ? `*Message / Background:* ${formData.message.trim()}` : null,
      ``,
      `_Sent via official website enquiry form_`
    ].filter(Boolean);

    const fullMessage = encodeURIComponent(textLines.join('\n'));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open WhatsApp directly to official India admissions desk
      window.open(`https://wa.me/${BRAND.contacts.india.phoneRaw}?text=${fullMessage}`, '_blank');
    }, 600);
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAFCFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            {onNavigateHome ? (
              <button 
                onClick={onNavigateHome}
                className="hover:text-blue-700 transition cursor-pointer"
              >
                Home
              </button>
            ) : (
              <span>Home</span>
            )}
            <span>/</span>
            <span className="text-blue-700">Contact & Inquiries</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800">
            <Mail className="w-3.5 h-3.5" />
            <span>Admissions & Support Desks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Connect with Our Admissions Advisory Team
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Have questions about university eligibility, courses, tuition fees, student visas, or arrival in India? Reach out directly through our official desks or send an inquiry below.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Contact Methods & Desks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Official Email Channels Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Email Channels
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Admissions Department</span>
                    <a 
                      href={`mailto:${BRAND.emails.admissions}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 transition"
                    >
                      {BRAND.emails.admissions}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">General Information & Inquiries</span>
                    <a 
                      href={`mailto:${BRAND.emails.info}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 transition"
                    >
                      {BRAND.emails.info}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Applications & Document Verification</span>
                    <a 
                      href={`mailto:${BRAND.emails.applications}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 transition"
                    >
                      {BRAND.emails.applications}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Student Support & Arrival Assistance</span>
                    <a 
                      href={`mailto:${BRAND.emails.support}`}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 transition"
                    >
                      {BRAND.emails.support}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* India Desk Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇳</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">India Admissions Headquarters</h3>
                    <p className="text-[11px] text-slate-500">University Liaison & Student Arrival</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
                  Headquarters
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-semibold text-slate-900 hover:text-blue-700">
                    {BRAND.contacts.india.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{BRAND.contacts.india.hours}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{BRAND.contacts.india.address}</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({BRAND.contacts.india.phoneDisplay})</span>
              </a>
            </div>

            {/* Liberia & West Africa Desk Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇱🇷</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Liberia & West Africa Desk</h3>
                    <p className="text-[11px] text-slate-500">Student & Parent Consultations</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Regional Desk
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-semibold text-slate-900 hover:text-blue-700">
                    {BRAND.contacts.liberia.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{BRAND.contacts.liberia.hours}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{BRAND.contacts.liberia.address}</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink('liberia')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({BRAND.contacts.liberia.phoneDisplay})</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Admissions Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Submit an Admissions Enquiry
                </h3>
                <p className="text-xs text-slate-600">
                  Fill in your details to receive customized university options, fee structure breakdowns, and eligibility verification.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-emerald-900">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Enquiry Submitted Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you! Your information has been forwarded to our admissions desk. If WhatsApp did not open automatically, you can message us directly at <strong>{BRAND.contacts.india.phoneDisplay}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        country: 'Liberia',
                        program: 'Computer Science & Information Technology',
                        preferredUniversity: '',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John K. Myers"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Email and Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+231..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Country & Program */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Country of Residence
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                      >
                        <option value="Liberia">Liberia (🇱🇷)</option>
                        <option value="Ghana">Ghana (🇬🇭)</option>
                        <option value="Nigeria">Nigeria (🇳🇬)</option>
                        <option value="Sierra Leone">Sierra Leone (🇸🇱)</option>
                        <option value="Kenya">Kenya (🇰🇪)</option>
                        <option value="Uganda">Uganda (🇺🇬)</option>
                        <option value="Tanzania">Tanzania (🇹🇿)</option>
                        <option value="Rwanda">Rwanda (🇷🇼)</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Desired Study Discipline
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                      >
                        <option value="Computer Science & Information Technology">Computer Science / IT (BCA, B.Tech, MCA)</option>
                        <option value="Business & Management">Business & Management (BBA, MBA)</option>
                        <option value="Engineering & Technology">Engineering (Mechanical, Civil, Electrical)</option>
                        <option value="Healthcare & Pharmacy">Healthcare, Pharmacy & Nursing</option>
                        <option value="Data Science & Applied Technologies">Data Science & AI</option>
                        <option value="Humanities & Law">Law, Media & Humanities</option>
                        <option value="Other">Other Discipline</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Academic Background & Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention your highest qualification (e.g., WASSCE / High School Diploma / Bachelor's) and any specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admissions Enquiry'}</span>
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2">
                      Your enquiry is forwarded directly to our admissions desk with immediate WhatsApp receipt.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
