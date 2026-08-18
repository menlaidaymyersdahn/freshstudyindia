import React, { useState } from 'react';
import { MessageCircle, X, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover Options */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 w-72 space-y-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-[#0B192C]">Admissions Advisors Online</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            Choose your preferred country desk to chat directly on WhatsApp:
          </p>

          <div className="space-y-2">
            {/* India WhatsApp */}
            <a
              href={getWhatsAppLink('india')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🇮🇳</span>
                <div>
                  <p className="text-xs font-bold text-[#0B192C] group-hover:text-emerald-800">India Desk</p>
                  <p className="text-[10px] text-slate-500 font-mono">{BRAND.contacts.india.phoneDisplay}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </a>

            {/* Liberia WhatsApp */}
            <a
              href={getWhatsAppLink('liberia')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🇱🇷</span>
                <div>
                  <p className="text-xs font-bold text-[#0B192C] group-hover:text-emerald-800">Liberia Desk</p>
                  <p className="text-[10px] text-slate-500 font-mono">{BRAND.contacts.liberia.phoneDisplay}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2.5 font-bold text-xs uppercase tracking-wide cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Chat With Advisor</span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};
