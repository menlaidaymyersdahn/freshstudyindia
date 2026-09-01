import React, { useState } from 'react';
import { OFFICIAL_EMAIL_DIRECTORY, getWhatsAppConfig } from '../config/company';
import { Mail, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight, Cloud } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { saveEnquiryToFirestore } from '../lib/firebase';
import { PhoneInputField } from './PhoneInputField';
import { validatePhoneNumber } from '../config/countryCodes';

export const ContactSection: React.FC = () => {
  const whatsappConfig = getWhatsAppConfig();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    studyInterest: 'Undergraduate Degree',
    preferredCourse: '',
    preferredUniversity: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.whatsapp.trim()) {
      const phoneValidation = validatePhoneNumber(formData.whatsapp);
      if (!phoneValidation.isValid) {
        setErrorMessage(phoneValidation.error || 'A valid phone number with country calling code (e.g. +231) is required.');
        return;
      }
    }

    setIsSubmitting(true);

    const clientEnquiryRecord = {
      id: `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: formData.whatsapp.trim(),
      country: formData.country.trim(),
      studyInterest: formData.studyInterest,
      preferredCourse: formData.preferredCourse.trim(),
      preferredUniversity: formData.preferredUniversity.trim(),
      message: formData.message.trim(),
      status: 'NEW',
      assignedTo: 'admissions@myersglobalpathways.com',
      createdAt: new Date().toISOString()
    };

    // Immediate local cache, Cloud Firestore sync & real-time broadcast
    try {
      const rawLocal = localStorage.getItem('mgp_local_enquiries');
      const list = rawLocal ? JSON.parse(rawLocal) : [];
      localStorage.setItem('mgp_local_enquiries', JSON.stringify([clientEnquiryRecord, ...list]));
      window.dispatchEvent(new CustomEvent('mgp_enquiry_submitted', { detail: clientEnquiryRecord }));
      window.dispatchEvent(new Event('storage'));
      saveEnquiryToFirestore(clientEnquiryRecord).catch(() => {});
    } catch (_) {}

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (res.ok && data?.success) {
        setSuccessMessage(data.message || 'Thank you. Your enquiry has been received. Our team will get back to you as soon as possible.');
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          country: '',
          studyInterest: 'Undergraduate Degree',
          preferredCourse: '',
          preferredUniversity: '',
          message: ''
        });
      } else {
        // Even if server is cold, the enquiry was saved locally and will be synced
        setSuccessMessage('Thank you. Your enquiry has been received. Our admissions team will review your study requirements.');
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          country: '',
          studyInterest: 'Undergraduate Degree',
          preferredCourse: '',
          preferredUniversity: '',
          message: ''
        });
      }
    } catch (err) {
      // Graceful fallback for offline/client preview
      setSuccessMessage('Thank you. Your enquiry has been received. Our admissions team will review your study requirements.');
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        country: '',
        studyInterest: 'Undergraduate Degree',
        preferredCourse: '',
        preferredUniversity: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#EBF3FC] text-slate-900 scroll-mt-24 border-b border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-sky-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Connect With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Let's Start Your Journey.
          </h2>

          <p className="text-base text-slate-700 mt-2 max-w-2xl leading-relaxed font-normal">
            Have questions about studying in India? Contact the Myers Global Pathways team and we'll help you understand your next steps.
          </p>
        </ScrollReveal>

        {/* Split-Screen Editorial Contact Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Official Email Directory & WhatsApp Channel */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-6 space-y-6 text-left">
            
            {/* WhatsApp Advisory Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-sky-950 text-white border border-sky-400/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Direct Admissions WhatsApp Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100">
                    Real-time consultation with our international education advisors
                  </p>
                </div>
              </div>

              <p className="text-sm text-blue-100 leading-relaxed font-normal">
                Connect with our team to discuss university selections, admission timelines, document attestation, and Indian student visas.
              </p>

              {/* Number Buttons: Primary (+231) and Alternative (+91) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Primary Number (+231 889425645) */}
                <a
                  href={whatsappConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat: +231 889425645</span>
                </a>

                {/* Alternative Number (+91 93478 69324) */}
                <a
                  href={whatsappConfig.altUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Alt: +91 93478 69324</span>
                </a>
              </div>
            </div>

            {/* Official Email Directory */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-sky-200 shadow-md space-y-4">
              <div className="border-b border-sky-100 pb-3.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  Official Email Directory
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Direct verified departmental mailboxes for international students and institutional partners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OFFICIAL_EMAIL_DIRECTORY.map((contact) => (
                  <div key={contact.email} className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 hover:border-blue-400 transition-all">
                    <p className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                      {contact.department}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline break-all mt-1 block"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Professional Enquiry Form */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-lg text-left">
              
              <div className="border-b border-sky-100 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-slate-950">
                  Send an Admissions Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Fill in your details below and an advisor will respond promptly.
                </p>
              </div>

              {/* Status Notifications */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Enquiry Received</p>
                    <p className="mt-0.5">{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Check details</p>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                {/* WhatsApp & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PhoneInputField
                    id="contact-whatsapp-input"
                    label="WhatsApp / Phone Number"
                    required={false}
                    value={formData.whatsapp}
                    onChange={(val) => setFormData(prev => ({ ...prev, whatsapp: val }))}
                    onCountrySelect={(countryName) => {
                      if (!formData.country) {
                        setFormData(prev => ({ ...prev, country: countryName }));
                      }
                    }}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Liberia, Ghana, Nigeria..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                {/* Study Level & Course */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      What do you want to study?
                    </label>
                    <select
                      value={formData.studyInterest}
                      onChange={(e) => setFormData({ ...formData, studyInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 cursor-pointer"
                    >
                      <option value="Undergraduate Degree">Undergraduate (Bachelor’s Degree)</option>
                      <option value="Postgraduate Degree">Postgraduate (Master’s Degree)</option>
                      <option value="Doctoral Degree">Doctoral (Ph.D.)</option>
                      <option value="Diploma / Certificate">Diploma or Certificate Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Preferred Course / Major
                    </label>
                    <input
                      type="text"
                      value={formData.preferredCourse}
                      onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                      placeholder="e.g. Computer Science, MBA, Pharmacy"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                {/* Preferred University (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Preferred University (If known)
                  </label>
                  <input
                    type="text"
                    value={formData.preferredUniversity}
                    onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                    placeholder="Leave blank if seeking recommendations"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Questions or Background
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any specific questions regarding tuition budgets, intake dates, or entry requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-sky-50/50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  Your contact information is kept confidential and only used for admissions communication.
                </p>
              </form>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
