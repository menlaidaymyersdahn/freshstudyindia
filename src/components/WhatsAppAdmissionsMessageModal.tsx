import React, { useState, useEffect, useMemo } from 'react';
import { ApplicationSubmission } from '../types';
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WhatsAppMessageOptionKey,
  generateWhatsAppAdmissionsMessage,
  cleanPhoneNumberForWhatsApp,
  buildWhatsAppUrl
} from '../lib/whatsappAdmissions';
import {
  X,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  RotateCcw,
  FileText,
  User,
  Hash,
  GraduationCap,
  Globe,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface WhatsAppAdmissionsMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications?: ApplicationSubmission[];
  initialApplication?: ApplicationSubmission | null;
  onMessageLogged?: (applicationId: string | undefined, phone: string, message: string) => Promise<void> | void;
}

export const WhatsAppAdmissionsMessageModal: React.FC<WhatsAppAdmissionsMessageModalProps> = ({
  isOpen,
  onClose,
  applications = [],
  initialApplication = null,
  onMessageLogged
}) => {
  // Selected student context (can be an existing applicant or 'manual')
  const [selectedAppId, setSelectedAppId] = useState<string>('manual');

  // Input fields specified by user
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicationId, setApplicationId] = useState<string>('');
  const [program, setProgram] = useState<string>('');
  const [countryOfStudy, setCountryOfStudy] = useState<string>('India');
  const [phone, setPhone] = useState<string>('');
  const [selectedOptionKey, setSelectedOptionKey] = useState<WhatsAppMessageOptionKey>('application_received');
  const [additionalMessage, setAdditionalMessage] = useState<string>('');

  // Editable output state
  const [isManualEditMode, setIsManualEditMode] = useState<boolean>(false);
  const [finalMessage, setFinalMessage] = useState<string>('');

  // UI state
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Initialize form whenever initialApplication or modal opens
  useEffect(() => {
    if (initialApplication) {
      setSelectedAppId(initialApplication.id || 'manual');
      setApplicantName(initialApplication.fullName || '');
      setApplicationId(initialApplication.trackingId || (initialApplication.id ? `MGP-${initialApplication.id.slice(0, 8).toUpperCase()}` : 'MGP-2026-APP'));
      setProgram(initialApplication.preferredCourse || 'Undergraduate / Postgraduate Program');
      setCountryOfStudy('India');
      setPhone(initialApplication.whatsapp || '');
      setSelectedOptionKey('application_received');
      setAdditionalMessage('');
      setIsManualEditMode(false);
    } else if (applications.length > 0 && selectedAppId !== 'manual') {
      const match = applications.find(a => a.id === selectedAppId);
      if (match) {
        populateFromApplicant(match);
      }
    } else {
      // Clean defaults
      setSelectedAppId('manual');
      setApplicantName('');
      setApplicationId('MGP-2026-APP');
      setProgram('Bachelor / Master Degree');
      setCountryOfStudy('India');
      setPhone('');
      setSelectedOptionKey('application_received');
      setAdditionalMessage('');
      setIsManualEditMode(false);
    }
  }, [initialApplication, isOpen]);

  // Helper to populate fields from a chosen applicant
  const populateFromApplicant = (app: ApplicationSubmission) => {
    setSelectedAppId(app.id || 'manual');
    setApplicantName(app.fullName || '');
    setApplicationId(app.trackingId || (app.id ? `MGP-${app.id.slice(0, 8).toUpperCase()}` : 'MGP-2026-APP'));
    setProgram(app.preferredCourse || 'Undergraduate / Postgraduate Program');
    setCountryOfStudy('India');
    setPhone(app.whatsapp || '');
    setIsManualEditMode(false);
  };

  // Handle switching applicant from top dropdown
  const handleSelectApplicantChange = (id: string) => {
    if (id === 'manual') {
      setSelectedAppId('manual');
      return;
    }
    const found = applications.find(a => a.id === id);
    if (found) {
      populateFromApplicant(found);
    }
  };

  // Re-generate message whenever inputs change unless manual edit mode is locked
  useEffect(() => {
    if (!isManualEditMode) {
      const generated = generateWhatsAppAdmissionsMessage({
        applicantName,
        applicationId,
        program,
        countryOfStudy,
        optionKey: selectedOptionKey,
        additionalMessage
      });
      setFinalMessage(generated);
    }
  }, [
    applicantName,
    applicationId,
    program,
    countryOfStudy,
    selectedOptionKey,
    additionalMessage,
    isManualEditMode
  ]);

  // Reset to freshly generated text
  const handleResetToGenerated = () => {
    setIsManualEditMode(false);
    const generated = generateWhatsAppAdmissionsMessage({
      applicantName,
      applicationId,
      program,
      countryOfStudy,
      optionKey: selectedOptionKey,
      additionalMessage
    });
    setFinalMessage(generated);
  };

  // 1-Click Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  // Send via WhatsApp and log communication
  const handleLaunchWhatsApp = async () => {
    setIsSending(true);
    try {
      if (onMessageLogged) {
        const targetAppId = selectedAppId !== 'manual' ? selectedAppId : initialApplication?.id;
        await onMessageLogged(targetAppId, phone, finalMessage);
      }
    } catch (err) {
      console.error('Failed to log WhatsApp message:', err);
    } finally {
      setIsSending(false);
      const url = buildWhatsAppUrl(phone, finalMessage);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Current active option metadata
  const currentOption = useMemo(() => {
    return WHATSAPP_MESSAGE_OPTIONS.find(o => o.key === selectedOptionKey) || WHATSAPP_MESSAGE_OPTIONS[0];
  }, [selectedOptionKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-fadeIn text-left">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-scaleUp">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#07132B] via-[#0D1F3D] to-[#07132B] text-white border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  WhatsApp Admissions Desk
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Official Template Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Automated applicant notifications, document requests, and admission updates
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-5">
          
          {/* Quick Select Existing Applicant (if multiple exist) */}
          {applications.length > 0 && (
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <User className="w-4 h-4 text-blue-600" />
                <span>Select Applicant from Database:</span>
              </div>
              <div className="flex-1 min-w-[240px] max-w-md">
                <select
                  value={selectedAppId}
                  onChange={(e) => handleSelectApplicantChange(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="manual">-- Manual / Custom Applicant Entry --</option>
                  {applications.map((app) => (
                    <option key={app.id || app.trackingId} value={app.id}>
                      {app.fullName} • {app.trackingId || 'No Ref'} ({app.preferredCourse || 'General'})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Grid Layout: Controls vs Live WhatsApp Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Step 1: Select Update Option */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Update / Message Option</span>
                  </label>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {currentOption.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WHATSAPP_MESSAGE_OPTIONS.map((opt) => {
                    const isSelected = selectedOptionKey === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setSelectedOptionKey(opt.key);
                          setIsManualEditMode(false);
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          opt.id === 5 ? 'sm:col-span-2' : ''
                        } ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 text-slate-900'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                            {opt.id}. {opt.label}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] shrink-0">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                          {opt.summary}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Applicant Details (All Editable) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Applicant & Program Information</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Applicant Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Applicant Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => {
                          setApplicantName(e.target.value);
                          setIsManualEditMode(false);
                        }}
                        placeholder="e.g. Emmanuel K. Tarnue"
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Application ID */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Application ID / Ref *
                    </label>
                    <div className="relative">
                      <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={applicationId}
                        onChange={(e) => {
                          setApplicationId(e.target.value);
                          setIsManualEditMode(false);
                        }}
                        placeholder="e.g. MGP-2026-8821"
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Program / Course */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Program / Course *
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => {
                          setProgram(e.target.value);
                          setIsManualEditMode(false);
                        }}
                        placeholder="e.g. BSc Computer Science"
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Country of Study */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Country of Study *
                    </label>
                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={countryOfStudy}
                        onChange={(e) => {
                          setCountryOfStudy(e.target.value);
                          setIsManualEditMode(false);
                        }}
                        placeholder="e.g. India"
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Phone Number */}
                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Applicant WhatsApp Number (Include Country Code) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +231 88 942 5645 or +234 80 123 4567"
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Must start with international calling code (e.g. +231 Liberia, +233 Ghana, +234 Nigeria, +91 India).
                  </span>
                </div>
              </div>

              {/* Step 3: Additional Message or Instructions */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Additional Message or Instructions</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">(Optional)</span>
                </div>

                <textarea
                  rows={3}
                  value={additionalMessage}
                  onChange={(e) => {
                    setAdditionalMessage(e.target.value);
                    setIsManualEditMode(false);
                  }}
                  placeholder="e.g. Kindly prepare your official WAEC scratch card details and high school transcripts for university registration."
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
                />

                {currentOption.suggestedNotes && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Quick Suggestion:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAdditionalMessage(currentOption.suggestedNotes || '');
                        setIsManualEditMode(false);
                      }}
                      className="text-blue-600 hover:text-blue-800 underline text-left cursor-pointer truncate max-w-xs sm:max-w-md"
                    >
                      "{currentOption.suggestedNotes}"
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live WhatsApp Smartphone Chat Bubble Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-time WhatsApp Preview</span>
                </span>
                
                {isManualEditMode && (
                  <button
                    type="button"
                    onClick={handleResetToGenerated}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Template</span>
                  </button>
                )}
              </div>

              {/* WhatsApp Smartphone Frame Mockup */}
              <div className="rounded-2xl bg-[#0C151D] p-3 sm:p-4 text-white shadow-xl border border-slate-800 space-y-3">
                
                {/* Chat Top Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-extrabold">
                      M
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 leading-none">
                        Myers Global Pathways
                      </h5>
                      <span className="text-[10px] text-emerald-400">Admissions Desk • Official</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {phone ? cleanPhoneNumberForWhatsApp(phone) : 'Direct'}
                  </span>
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="bg-[#1F2C34] text-slate-100 rounded-2xl rounded-tl-xs p-3.5 text-xs shadow-md border border-emerald-500/20 relative space-y-2">
                  <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-100">
                    {finalMessage}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
                    <span>Just now</span>
                    <span className="text-emerald-400 font-bold">✓✓</span>
                  </div>
                </div>

                {/* Custom Edit / Direct Text Overwrite Option */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold">Direct Editor:</span>
                    <span className="text-[10px] text-slate-500">
                      {isManualEditMode ? 'Custom Edited' : 'Synced to Form'}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={finalMessage}
                    onChange={(e) => {
                      setIsManualEditMode(true);
                      setFinalMessage(e.target.value);
                    }}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#17212B] border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-[11px] leading-relaxed"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Full Message</span>
                      </>
                    )}
                  </button>

                  {/* Launch in WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    disabled={isSending}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Verified Admissions Guarantee Badge */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Official Admissions Desk Format</p>
                  <p className="text-[10px] text-emerald-900 mt-0.5 leading-snug">
                    Standardized according to Myers Global Pathways international admissions guidelines for transparent communication.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Selected Option: <span className="font-bold text-slate-800">{currentOption.label}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              disabled={isSending}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via WhatsApp & Log</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppAdmissionsMessageModal;
