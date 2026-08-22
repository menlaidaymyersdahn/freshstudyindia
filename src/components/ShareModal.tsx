import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  ExternalLink,
  Sparkles,
  Globe
} from 'lucide-react';
import { BRAND } from '../lib/constants';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  customTitle?: string;
  customDesc?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  customTitle,
  customDesc
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://freshstudyindia.com';
  const shareTitle = customTitle || 'Fresh Study India — Study in India International Admissions';
  const shareDesc = customDesc || 'Direct admissions, university placement, student visa guidance, and arrival support for international students studying in India.';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Pre-configured social share links
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n\n${shareDesc}\n\n👉 ${shareUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Hi,\n\nI wanted to share Fresh Study India with you for studying at accredited universities in India:\n\n${shareDesc}\n\nVisit: ${shareUrl}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-[#060F1E] text-white flex items-center justify-center shadow-md">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#060F1E]">Share Fresh Study India</h3>
            <p className="text-xs text-slate-500">
              Share with prospective students, parents, or sponsors
            </p>
          </div>
        </div>

        {/* OpenGraph Social Media Live Preview Card */}
        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              Social Media OpenGraph Preview
            </span>
            <span className="text-[10px] bg-red-50 text-rose-800 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
              Live Card
            </span>
          </div>

          {/* Card Graphic */}
          <div className="bg-[#060F1E] p-4 text-white relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Fresh Study India
              </span>
              <span className="text-[11px]">🇱🇷 ➡️ 🇮🇳</span>
            </div>
            <p className="font-extrabold text-sm text-white line-clamp-1 leading-snug">
              {shareTitle}
            </p>
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
              {shareDesc}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-sky-300/80 font-mono">
              <Globe className="w-3 h-3" />
              <span>freshstudyindia.com</span>
            </div>
          </div>
        </div>

        {/* Direct Sharing Channels */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Quick Share
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* WhatsApp */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 flex flex-col items-center justify-center gap-1 text-center transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 flex flex-col items-center justify-center gap-1 text-center transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">Facebook</span>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 flex flex-col items-center justify-center gap-1 text-center transition-all group"
            >
              <span className="text-sm font-black leading-none">𝕏</span>
              <span className="text-xs font-bold">Twitter</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 flex flex-col items-center justify-center gap-1 text-center transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-sky-700 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Copy Page URL
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-mono focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0B192C] text-white hover:bg-slate-800'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
