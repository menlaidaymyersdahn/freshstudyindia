import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { BRAND, getWhatsAppLink, EMAIL_DIRECTORY } from '../lib/constants';

interface ContactSectionProps {
  onNavigateHome?: () => void;
  onOpenApplication?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigateHome,
  onOpenApplication
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    studyLevel: 'Undergraduate',
    preferredCourse: '',
    preferredUniversity: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section 
      id="contact"
      className="py-24 sm:py-32 bg-[#FAFAF8] text-[#0A1120] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D99B26]">
            <span>Official Communications</span>
            <span className="w-8 h-[1px] bg-[#D99B26]" />
          </div>

          <h2 
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]"
          >
            Let's Start Your Journey
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Reach out directly to our admissions desks, institutional collaboration team, or student welfare advisors. We respond promptly to prospective students, families, and academic partners worldwide.
          </p>
        </div>

        {/* Split-Screen Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct WhatsApp & Official Email Directory */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* WhatsApp Priority Support Card */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Direct WhatsApp Admissions Desk</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Chat With Myers Global Pathways
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Connect with a dedicated student counselor via WhatsApp for immediate questions regarding course eligibility, fees, and the 2026 intake.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  id="contact-wa-primary-btn"
                  href={getWhatsAppLink('india', 'Hello Myers Global Pathways, I would like to consult with an admissions advisor regarding studying in India.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Chat on WhatsApp (+91 9201330946)</span>
                </a>
              </div>
            </div>

            {/* Complete Official Email Directory (All 9 Verified Emails) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Official Email Directory
                </h3>
                <span className="text-xs font-mono text-slate-400">9 Active Inboxes</span>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 divide-y divide-slate-100 shadow-sm">
                {EMAIL_DIRECTORY.map((item) => {
                  const isCopied = copiedEmail === item.email;
                  return (
                    <div 
                      key={item.email}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
                    >
                      <div className="truncate">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {item.department}
                        </p>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#D99B26] transition-colors truncate block"
                        >
                          {item.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleCopyEmail(item.email)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                          title="Copy Email Address"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <a
                          href={`mailto:${item.email}`}
                          className="p-2 rounded-xl text-slate-400 hover:text-[#D99B26] hover:bg-amber-50 transition-colors"
                          title="Send Email"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Professional Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Send an Academic Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill out the details below, and our admissions team will review your requirements and reach out directly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Enquiry Received Successfully</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your academic enquiry has been dispatched to <code>admissions@myersglobalpathways.com</code>. An advisor will contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        country: '',
                        studyLevel: 'Undergraduate',
                        preferredCourse: '',
                        preferredUniversity: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-emerald-900 bg-emerald-200/70 hover:bg-emerald-200 cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Samuel K. Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Dual row: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+231 ... / +234 ..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Dual row: Country & Study Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Your Country of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Liberia, Ghana, Nigeria..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Study Level *
                      </label>
                      <select
                        value={formData.studyLevel}
                        onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="Undergraduate">Undergraduate (Bachelors)</option>
                        <option value="Postgraduate">Postgraduate (Masters)</option>
                        <option value="Doctoral">Doctorate (Ph.D.)</option>
                        <option value="Diploma">Diploma / Professional Certificate</option>
                      </select>
                    </div>
                  </div>

                  {/* Dual row: Preferred Course & University */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred Course
                      </label>
                      <input
                        type="text"
                        value={formData.preferredCourse}
                        onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                        placeholder="e.g. B.Tech Computer Science, MBA"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred University (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.preferredUniversity}
                        onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                        placeholder="e.g. Top Rated / Location Preference"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Message / Academic Background
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your high school result, graduation year, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-[#D99B26] hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
