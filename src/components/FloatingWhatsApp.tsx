import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [selectedDesk, setSelectedDesk] = useState<'india' | 'liberia'>('india');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = customMsg.trim() || 'Hello Fresh Study India, I want to inquire about 2026 university admissions in India.';
    const link = getWhatsAppLink(selectedDesk, finalMsg);
    window.open(link, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white border border-sky-200 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-200 text-slate-900 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Admissions WhatsApp Desk
                </h4>
                <p className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online & Active
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Desk Switcher */}
          <div className="desk-selection-buttons grid grid-cols-2 gap-2.5 mb-4" id="desk-selection-container">
            <button
              id="desk-select-india-btn"
              type="button"
              onClick={() => setSelectedDesk('india')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative ${
                selectedDesk === 'india'
                  ? 'bg-gradient-to-b from-blue-50 to-blue-100/80 border-blue-600 text-blue-950 ring-2 ring-blue-500/30 shadow-[0_0_16px_rgba(37,99,235,0.22)] font-extrabold scale-[1.02]'
                  : 'bg-slate-50/90 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              <span className="text-base">🇮🇳</span>
              <span className="truncate">India HQ</span>
              {selectedDesk === 'india' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_#2563eb]" />
              )}
            </button>

            <button
              id="desk-select-liberia-btn"
              type="button"
              onClick={() => setSelectedDesk('liberia')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative ${
                selectedDesk === 'liberia'
                  ? 'bg-gradient-to-b from-rose-50 to-rose-100/80 border-rose-600 text-rose-950 ring-2 ring-rose-500/30 shadow-[0_0_16px_rgba(225,29,72,0.22)] font-extrabold scale-[1.02]'
                  : 'bg-slate-50/90 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              <span className="text-base">🇱🇷</span>
              <span className="truncate">Liberia Desk</span>
              {selectedDesk === 'liberia' && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-[0_0_6px_#e11d48]" />
              )}
            </button>
          </div>

          {/* Active Desk Info */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-4 flex items-center justify-between">
            <span className="text-slate-500">Target Contact:</span>
            <span className="font-mono font-bold text-slate-900">
              {selectedDesk === 'india' ? BRAND.contacts.india.phoneDisplay : BRAND.contacts.liberia.phoneDisplay}
            </span>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              rows={2}
              placeholder="Type your message or question..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all duration-200 flex items-center gap-2.5 cursor-pointer relative"
        title="WhatsApp Admissions Desk"
      >
        <span className="flex h-3 w-3 absolute -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider">
          WhatsApp Us
        </span>
      </button>

    </div>
  );
};
