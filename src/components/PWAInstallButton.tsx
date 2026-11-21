import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
  onActionComplete?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  compact = false,
  onActionComplete,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const navigate = useNavigate();

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      onActionComplete?.();
      return;
    }

    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    onActionComplete?.();
    navigate('/download-app');
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-[#181A1F]/[0.14] bg-transparent hover:bg-white text-[#181A1F] hover:border-[#A63A24] hover:text-[#A63A24] transition-ui cursor-pointer whitespace-nowrap ${
          compact ? 'px-3 py-2 text-xs font-medium' : 'px-3 py-2 text-sm font-medium'
        }`}
        title="Install Myers Global Pathways app"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{isInstallable ? 'Install app' : 'Get app'}</span>
      </button>

      {showIOSGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181A1F]/40 p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#181A1F]/[0.12] p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[#181A1F]/[0.08] pb-3">
              <h3 className="text-base font-medium text-[#181A1F]">
                Install on iPhone or iPad
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg text-[#6E727D] hover:text-[#181A1F] transition-ui cursor-pointer"
                aria-label="Close instructions"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="space-y-2 text-sm text-[#4F535C] list-decimal list-inside leading-relaxed">
              <li>Tap the <strong className="font-medium text-[#181A1F]">Share</strong> button in the Safari toolbar.</li>
              <li>Scroll down and tap <strong className="font-medium text-[#181A1F]">Add to Home Screen</strong>.</li>
              <li>Tap <strong className="font-medium text-[#181A1F]">Add</strong> to launch Myers Global Pathways as an app.</li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 px-4 rounded-lg bg-[#181A1F] hover:bg-[#2C2F38] text-white text-sm font-medium transition-ui cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
