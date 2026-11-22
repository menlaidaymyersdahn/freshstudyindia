import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ApplicationWizardForm } from './ApplicationWizardForm';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetData?: {
    studyLevel?: string;
    field?: string;
    course?: string;
  };
  onSuccessRedirect?: (trackingId: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  presetData,
  onSuccessRedirect,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Myers Global Pathways Admissions Application"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0B1F3A]/75 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-[0_24px_64px_rgba(11,31,58,0.35)] my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <ApplicationWizardForm
          mode="modal"
          presetCourse={presetData?.course || presetData?.field || ''}
          presetStudyLevel={presetData?.studyLevel || ''}
          onCloseModal={onClose}
          onPortalRedirect={(trackingId) => {
            onClose();
            if (onSuccessRedirect) onSuccessRedirect(trackingId);
          }}
        />
      </div>
    </div>
  );
};
