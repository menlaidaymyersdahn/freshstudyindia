import React, { useState } from 'react';
import { getWhatsAppConfig } from '../config/company';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappConfig = getWhatsAppConfig();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {showMenu && (
        <div className="p-4 rounded-xl bg-white text-[#181A1F] text-xs border border-[#181A1F]/[0.12] w-64 text-left space-y-3 shadow-[0_8px_24px_rgba(24,26,31,0.08)]">
          <div className="flex items-center justify-between border-b border-[#181A1F]/[0.08] pb-2">
            <span className="font-medium text-sm text-[#181A1F]">WhatsApp admissions</span>
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              className="text-[#6E727D] hover:text-[#181A1F] p-1 transition-ui cursor-pointer"
              aria-label="Close WhatsApp menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={whatsappConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE4] border border-[#181A1F]/[0.08] transition-ui"
            >
              <p className="font-medium text-xs text-[#181A1F]">Primary desk (Liberia)</p>
              <p className="text-xs font-mono text-[#A63A24] mt-1">+231 889425645</p>
            </a>

            <a
              href={whatsappConfig.altUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE4] border border-[#181A1F]/[0.08] transition-ui"
            >
              <p className="font-medium text-xs text-[#181A1F]">Alternative desk (India)</p>
              <p className="text-xs font-mono text-[#4F535C] mt-1">+91 93478 69324</p>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-3 rounded-[10px] bg-white hover:bg-[#EFECE4] text-[#181A1F] border border-[#181A1F]/[0.14] flex items-center gap-2 text-xs font-medium transition-ui cursor-pointer shadow-[0_2px_8px_rgba(24,26,31,0.06)]"
        aria-label="WhatsApp admissions desk"
        title="WhatsApp admissions (+231 889425645)"
      >
        <MessageCircle className="w-4 h-4 text-[#A63A24]" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
};
