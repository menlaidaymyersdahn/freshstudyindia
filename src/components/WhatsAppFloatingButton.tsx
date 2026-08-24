import React, { useState } from 'react';
import { getWhatsAppConfig } from '../config/company';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappConfig = getWhatsAppConfig();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover / view */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 animate-fadeIn">
          <span>{whatsappConfig.displayLabel}</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappConfig.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all transform duration-200 cursor-pointer"
        aria-label={whatsappConfig.displayLabel}
        title={whatsappConfig.displayLabel}
      >
        <MessageCircle className="w-6 h-6 text-slate-950 fill-current" />
      </a>
    </div>
  );
};
