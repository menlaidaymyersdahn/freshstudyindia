import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';

interface ContactViewProps {
  chatMessages?: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  chatMessages = [],
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatInput, setChatInput] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-block px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            Study in India Admissions Desk
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact <span className="text-emerald-600">Fresh Study India</span> Counselors
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Dedicated support offices in New Delhi, India and Monrovia, Liberia. Get instant seat guidance.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'form'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inquiry Form
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Live Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Information Box */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg space-y-6">
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">Global Offices</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We guide students with full admission letters, scholarship endorsement, and Indian visa processing.
            </p>

            <div className="space-y-4 mt-6 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-200">India Head Office (New Delhi)</span>
                  <span className="text-slate-400">Plot 45, Connaught Place, New Delhi 110001, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-200">Liberia Liaison Office (Monrovia)</span>
                  <span className="text-slate-400">Broad Street, Opposite Ministry of Foreign Affairs, Monrovia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-200">Official Admissions Email</span>
                  <a href="mailto:freshstudyindia@gmail.com" className="text-slate-300 hover:text-emerald-400 font-medium transition">
                    freshstudyindia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-200">Direct Phone & WhatsApp Support</span>
                  <a href="tel:+231889425645" className="text-slate-300 hover:text-emerald-400 font-medium transition block">
                    +231 889425645 (Liberia Desk)
                  </a>
                  <span className="text-slate-400 text-[11px] block mt-0.5">+91 98765 43210 (India Desk)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-200">Office Working Hours</span>
                  <span className="text-slate-400">Mon - Sat: 08:30 AM - 06:30 PM (IST / GMT)</span>
                </div>
              </div>
            </div>
          </div>

          <a 
            href="https://wa.me/231889425645?text=Hello%20Fresh%20Study%20India,%20I%20would%20like%20to%20inquire%20about%20university%20admissions." 
            target="_blank" 
            rel="noreferrer"
            className="p-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition cursor-pointer shadow-md"
          >
            <span>Chat Directly on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Form or Live Chat Box */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {activeTab === 'form' ? (
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Submit Student Inquiry</h3>
              <p className="text-xs text-slate-500 mb-6">Send us your academic details and desired course in India.</p>

              {formSent ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-800">Inquiry Received!</h4>
                  <p className="text-xs text-slate-500">A counselor will contact you via WhatsApp or Email within 1 hour.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Full Student Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Joseph Mulbah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Your Message or Course Questions *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Specify course level (BSc, B.Tech, Master, PhD), county, and target program..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <Send className="w-4 h-4" />
                    Submit Admission Inquiry
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-[400px]">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                  <span className="font-bold text-xs text-slate-800">Fresh Study India Live Chat</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                        msg.sender === 'student'
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-60 block text-right mt-1 font-mono">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  placeholder="Type message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs cursor-pointer shadow-sm"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Google Maps Locations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" /> Interactive Google Maps Navigation
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Visit Our Global Counseling Hubs</h3>
          </div>
          <div className="flex gap-2">
            <a
              href="https://maps.google.com/?q=Connaught+Place+New+Delhi+India"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" /> New Delhi Directions
            </a>
            <a
              href="https://maps.google.com/?q=Monrovia+Foreign+Affairs+Liberia"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" /> Monrovia Directions
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Delhi Map Card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between">
            <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-slate-900 block">India Head Office (New Delhi)</span>
                <span className="text-[11px] text-slate-500">Connaught Place, Central Delhi 110001</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold">Primary Hub</span>
            </div>
            <div className="h-64 relative bg-slate-200">
              <iframe
                title="Google Maps New Delhi Head Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.992224724888!2d77.2167213!3d28.629995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3714b8d963%3A0xe54d6f1618a804a9!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              ></iframe>
            </div>
          </div>

          {/* Monrovia Map Card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between">
            <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-slate-900 block">Liberia Liaison Office (Monrovia)</span>
                <span className="text-[11px] text-slate-500">Broad Street, Opp. Ministry of Foreign Affairs</span>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-extrabold">West Africa Desk</span>
            </div>
            <div className="h-64 relative bg-slate-200">
              <iframe
                title="Google Maps Monrovia Liaison Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15878.530325439486!2d-10.8038928!3d6.3130556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfa0a24896e7efc9%3A0x6b4fb24e656d22d!2sMonrovia%2C%20Liberia!5e0!3m2!1sen!2slr!4v1700000000000!5m2!1sen!2slr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
