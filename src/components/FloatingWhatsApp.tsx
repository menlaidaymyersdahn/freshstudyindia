import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
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
    const finalMsg = customMsg.trim() || 'Hello Myers Global Pathways, I would like to inquire about university admissions in India.';
    const link = getWhatsAppLink(selectedDesk, finalMsg);
    window.open(link, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-200 text-slate-900 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Admissions WhatsApp Desk
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
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
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              type="button"
              onClick={() => setSelectedDesk('india')}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedDesk === 'india'
                  ? 'bg-blue-50 border-blue-500 text-blue-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🇮🇳</span>
              <span>India HQ</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedDesk('liberia')}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedDesk === 'liberia'
                  ? 'bg-blue-50 border-blue-500 text-blue-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🇱🇷</span>
              <span>Liberia Desk</span>
            </button>
          </div>

          {/* Active Desk Info */}
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-3 flex items-center justify-between">
            <span className="text-slate-500">Number:</span>
            <span className="font-mono font-bold text-slate-900">
              {selectedDesk === 'india' ? BRAND.contacts.india.phoneDisplay : BRAND.contacts.liberia.phoneDisplay}
            </span>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              rows={2}
              placeholder="Type your question or program interest..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open WhatsApp Chat</span>
            </button>
          </form>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer relative"
        title="WhatsApp Admissions Desk"
      >
        <span className="flex h-2.5 w-2.5 absolute -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-bold">
          Chat on WhatsApp
        </span>
      </button>

    </div>
  );
};
