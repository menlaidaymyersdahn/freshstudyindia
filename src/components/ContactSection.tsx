import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from '../lib/constants';
import { StudentEnquiry } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<StudentEnquiry>({
    fullName: '',
    country: 'Liberia',
    phone: '',
    studyField: 'Computer Science',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    
    // Simulate swift local persistence / dispatch
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
    'Computer Science & IT',
    'Business & Management (BBA/MBA)',
    'Engineering & Technology (B.Tech)',
    'Healthcare, Nursing & Pharmacy',
    'Data Science & Analytics',
    'Law & Legal Studies',
    'Humanities, Media & Arts',
    'Other Specialized Field'
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Admissions Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
            LET'S TALK ABOUT YOUR FUTURE.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Reach out directly via phone or WhatsApp, or fill out the short form below to receive personalized guidance from an advisor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Phone & WhatsApp Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* India Contact Card */}
            <div className="bg-gradient-to-br from-[#0B192C] to-[#132742] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-[11px] font-mono font-bold text-sky-300 uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-white/10">
                  Headquarters
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                India Admissions Desk
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-6">
                University liaison, visa document verification, and on-ground student arrivals.
              </p>

              <div className="text-2xl sm:text-3xl font-mono font-black text-sky-400 mb-6">
                {BRAND.contacts.india.phoneDisplay}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={getWhatsAppLink('india')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp India</span>
                </a>

                <a
                  href={`tel:${BRAND.contacts.india.phoneRaw}`}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call India</span>
                </a>
              </div>
            </div>

            {/* Liberia Contact Card */}
            <div className="bg-gradient-to-br from-[#0B192C] to-[#132742] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇱🇷</span>
                <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-white/10">
                  West Africa Desk
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Liberia Admissions Desk
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-6">
                Local in-person inquiries, WAEC / high school evaluations, and application guidance.
              </p>

              <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 mb-6">
                {BRAND.contacts.liberia.phoneDisplay}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={getWhatsAppLink('liberia')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Liberia</span>
                </a>

                <a
                  href={`tel:${BRAND.contacts.liberia.phoneRaw}`}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Liberia</span>
                </a>
              </div>
            </div>

            {/* Reassurance text */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>We do not require account creation or charge upfront fees to answer your initial questions.</span>
            </div>

          </div>

          {/* Right Column: Direct Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm">
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
                  Send a Direct Enquiry
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Fill out this quick form and an advisor will contact you within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-white rounded-2xl p-8 border border-emerald-200 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <h4 className="text-xl font-extrabold text-[#0B192C]">
                    Enquiry Received!
                  </h4>

                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our admissions counselor will review your interest in <strong className="text-slate-900">{formData.studyField}</strong> and contact you at <strong className="text-slate-900">{formData.phone}</strong>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink('india', `Hello Fresh Study India, I just submitted an enquiry for ${formData.fullName} (${formData.studyField}). Looking forward to connecting!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Immediately on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          country: 'Liberia',
                          phone: '',
                          studyField: 'Computer Science',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emmanuel Johnson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                    />
                  </div>

                  {/* Two Column Row: Country & WhatsApp Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Country */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +231 889425645"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                      />
                    </div>

                  </div>

                  {/* What do you want to study */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      What do you want to study? <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.studyField}
                      onChange={(e) => setFormData({ ...formData, studyField: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition"
                    >
                      {studyFields.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Message / Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your previous education, questions about courses, or budget preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-medium text-slate-900 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-[#0B192C] hover:bg-[#1E2E48] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Enquiry...</span>
                    ) : (
                      <>
                        <span>SEND ENQUIRY</span>
                        <Send className="w-4 h-4 text-sky-400" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    Your details remain private and are only used for official educational counseling.
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
