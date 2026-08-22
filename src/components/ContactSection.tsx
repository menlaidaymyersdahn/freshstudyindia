import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Globe2,
  Mail,
  Clock
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Liberia',
    program: 'Computer Science & AI',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const message = `*NEW CONTACT INQUIRY - Fresh Study India*%0A%0A*Name:* ${encodeURIComponent(formData.fullName)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Country:* ${encodeURIComponent(formData.country)}%0A*Target Program:* ${encodeURIComponent(formData.program)}%0A*Message:* ${encodeURIComponent(formData.message || 'I would like more information on admissions.')}`;
    
    // Open in WhatsApp
    window.open(`https://wa.me/${BRAND.contacts.india.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FFFFFF] text-slate-900 relative overflow-hidden bg-grid-light">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-400/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-400/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Phone className="w-3.5 h-3.5 text-rose-600" />
            <span>Direct Admissions Advisory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            SPEAK WITH OUR COUNSELORS.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Reach out directly to our Monrovia regional office or our India campus admissions team via phone, WhatsApp, or email.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Desk Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* India Desk */}
            <div className="rounded-3xl bg-slate-50 border border-sky-100 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      India Admissions Desk
                    </h3>
                    <p className="text-xs font-mono text-slate-500">University Liaison & Arrival</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  HEADQUARTERS
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`tel:${BRAND.contacts.india.phoneRaw}`} className="font-mono font-bold text-slate-900 hover:text-blue-700">
                    {BRAND.contacts.india.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-700 font-medium">{BRAND.contacts.india.address}</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink('india')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with India Desk</span>
              </a>
            </div>

            {/* Liberia Desk */}
            <div className="rounded-3xl bg-slate-50 border border-sky-100 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇱🇷</span>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Liberia & West Africa Desk
                    </h3>
                    <p className="text-xs font-mono text-slate-500">Student & Parent Consultations</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  REGIONAL DESK
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                  <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                  <a href={`tel:${BRAND.contacts.liberia.phoneRaw}`} className="font-mono font-bold text-slate-900 hover:text-rose-700">
                    {BRAND.contacts.liberia.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-slate-700 font-medium">{BRAND.contacts.liberia.address}</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink('liberia')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with Liberia Desk</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-sky-100 p-6 sm:p-9 shadow-lg">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Send Direct Admissions Inquiry
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                Fast Response
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">Inquiry Sent to Admissions Desk</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you. An admissions advisor has received your query and will follow up with you on WhatsApp and phone.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Emmanuel Kollie"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., +231 88 942 5645"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Country of Residence
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition cursor-pointer"
                    >
                      <option value="Liberia">Liberia 🇱🇷</option>
                      <option value="Sierra Leone">Sierra Leone 🇸🇱</option>
                      <option value="Ghana">Ghana 🇬🇭</option>
                      <option value="Nigeria">Nigeria 🇳🇬</option>
                      <option value="Gambia">Gambia 🇬🇲</option>
                      <option value="Guinea">Guinea 🇬🇳</option>
                      <option value="Kenya">Kenya 🇰🇪</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Target Degree Stream
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition cursor-pointer"
                  >
                    <option value="Computer Science & AI">Computer Science & AI (B.Tech / BCA)</option>
                    <option value="Nursing & Health Sciences">Nursing & Health Sciences (B.Sc Nursing / GNM)</option>
                    <option value="Pharmacy">Pharmacy (B.Pharm / Pharm.D)</option>
                    <option value="Engineering & Tech">Engineering (Mechanical / Civil / Robotics)</option>
                    <option value="Business & MBA">Business Management (BBA / MBA)</option>
                    <option value="Cyber Security">Cyber Security & Network Defense</option>
                    <option value="Microbiology">Microbiology & Biotechnology</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Your Questions or Transcripts Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your WAEC/WASSCE grades or any questions regarding tuition, hostels, and visa."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT INQUIRY TO ADMISSIONS DESK</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
