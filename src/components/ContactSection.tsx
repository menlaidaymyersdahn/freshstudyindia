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

export const ContactSection: React.FC = () => {
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
    <section id="contact" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Contact & Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Connect with Our Admissions Team
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Have questions about university eligibility, courses, tuition, student visas, or arrival in India? Reach out directly to our official advisory desks.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Contact Methods & Desks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Official Email Channels Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Email Addresses
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
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp ({BRAND.contacts.liberia.phoneDisplay})</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean, Structured Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Send an Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your academic details below. An admissions counselor will respond with personalized options.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Enquiry Transmitted Successfully</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.fullName}. Your inquiry has been routed to our official admissions desk. An advisor will contact you on WhatsApp and email.
                  </p>
                  <div className="pt-2">
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
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emmanuel Dahn"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        WhatsApp / Phone <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +231 88 942 5645"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Country & Program */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Country of Residence
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition cursor-pointer"
                      >
                        <option value="Liberia">Liberia 🇱🇷</option>
                        <option value="Sierra Leone">Sierra Leone 🇸🇱</option>
                        <option value="Ghana">Ghana 🇬🇭</option>
                        <option value="Nigeria">Nigeria 🇳🇬</option>
                        <option value="Gambia">Gambia 🇬🇲</option>
                        <option value="Kenya">Kenya 🇰🇪</option>
                        <option value="Uganda">Uganda 🇺🇬</option>
                        <option value="Rwanda">Rwanda 🇷🇼</option>
                        <option value="Tanzania">Tanzania 🇹🇿</option>
                        <option value="Cameroon">Cameroon 🇨🇲</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Program / Course Interested In
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition cursor-pointer"
                      >
                        <option value="Computer Science & IT">Computer Science & Information Technology (BCA / B.Tech)</option>
                        <option value="Business & MBA">Business & Management (BBA / MBA / B.Com)</option>
                        <option value="Engineering & Tech">Engineering (Robotics / Mechanical / Civil / Electrical)</option>
                        <option value="Pharmacy (B.Pharm)">Pharmacy (B.Pharm / Pharm.D)</option>
                        <option value="Nursing & Allied Health">Nursing & Allied Health (B.Sc Nursing / MLT)</option>
                        <option value="Data Science & AI">Data Science & AI (B.Sc / M.Sc)</option>
                        <option value="Law & Humanities">Law & Humanities (BA LLB / Mass Comm / Hotel Mgmt)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred University (Optional) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Preferred University or City (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Any accredited institution in Delhi NCR, Bangalore, or Punjab"
                      value={formData.preferredUniversity}
                      onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Message / Academic Background
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly state your highest qualification (e.g. WAEC / WASSCE / High School Diploma) and any specific questions."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-75 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    Your details are kept strictly confidential and used solely for university admissions evaluation.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
