import React, { useState } from 'react';
import { getWhatsAppConfig } from '../config/company';
import { MessageCircle, X, PhoneCall, ChevronUp } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappConfig = getWhatsAppConfig();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Contact Menu */}
      {showMenu && (
        <div className="p-4 rounded-3xl bg-[#0A1128] text-white text-xs shadow-2xl border border-slate-700 w-64 animate-fadeIn text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200">WhatsApp Admissions</span>
            <button
              onClick={() => setShowMenu(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={whatsappConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-emerald-300 hover:text-emerald-200"
            >
              <p className="font-bold text-xs text-white">Primary Desk (Liberia)</p>
              <p className="text-[11px] font-mono text-emerald-400 mt-0.5">+231 889425645</p>
            </a>

            <a
              href={whatsappConfig.altUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all text-slate-300 hover:text-white"
            >
              <p className="font-bold text-xs text-white">Alternative Desk (India)</p>
              <p className="text-[11px] font-mono text-amber-400 mt-0.5">+91 93478 69324</p>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all transform duration-200 cursor-pointer relative"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp (+231 889425645)"
        >
          <MessageCircle className="w-7 h-7 text-slate-950 fill-current" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950" />
        </button>
      </div>
    </div>
  );
};
