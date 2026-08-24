import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  FileText,
  Trash2,
  Paperclip,
  FileCheck
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';
import { ApplicationDocument, StudentApplicationProfile } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetField?: string;
}

interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  category: 'Passport' | 'Academic Certificate' | 'Academic Transcript' | 'Passport-size Photo' | 'Other Supporting Documents';
  dataUrl?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  presetField 
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Liberia');
  const [studyField, setStudyField] = useState(presetField || 'Computer Science');
  const [qualification, setQualification] = useState('High School Diploma (WAEC / WASSCE)');
  
  // Document Upload State
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string>('');

  useEffect(() => {
    if (presetField) {
      setStudyField(presetField);
    }
  }, [presetField]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDocTypeCategory = (fileName: string): UploadedFileItem['category'] => {
    const lower = fileName.toLowerCase();
    if (lower.includes('passport') && !lower.includes('photo')) return 'Passport';
    if (lower.includes('photo') || lower.includes('pic') || lower.includes('avatar') || lower.includes('face')) return 'Passport-size Photo';
    if (lower.includes('transcript') || lower.includes('grade') || lower.includes('result') || lower.includes('wassce') || lower.includes('waec')) return 'Academic Transcript';
    if (lower.includes('cert') || lower.includes('diploma') || lower.includes('degree')) return 'Academic Certificate';
    return 'Other Supporting Documents';
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files: FileList | File[]) => {
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
    const filesArray = Array.from(files);
    const validFiles = filesArray.filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      return allowedExtensions.includes(extension) || file.type.startsWith('image/') || file.type === 'application/pdf';
    });

    const newItems: UploadedFileItem[] = [];

    for (const file of validFiles) {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      let dataUrl: string | undefined = undefined;
      
      try {
        dataUrl = await readFileAsDataUrl(file);
      } catch (e) {
        console.error('Error reading file data URL:', e);
      }

      newItems.push({
        id,
        file,
        name: file.name,
        size: file.size,
        formattedSize: formatFileSize(file.size),
        type: extension.toUpperCase() || 'FILE',
        category: getDocTypeCategory(file.name),
        dataUrl
      });
    }

    if (newItems.length > 0) {
      setUploadedFiles(prev => [...prev, ...newItems]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so same files can be re-selected if removed
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (idToRemove: string) => {
    setUploadedFiles(prev => prev.filter(item => item.id !== idToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);

    const documentsPayload: ApplicationDocument[] = uploadedFiles.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      formattedSize: doc.formattedSize,
      type: doc.type,
      category: doc.category,
      dataUrl: doc.dataUrl
    }));

    const countryCode = country === 'Liberia' ? 'LR' : country === 'Ghana' ? 'GH' : country === 'Nigeria' ? 'NG' : 'INT';
    const trackingRef = `IND-2026-${countryCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    let generatedId = `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const applicationPayload: StudentApplicationProfile = {
      id: generatedId,
      trackingId: trackingRef,
      fullName,
      phone,
      email,
      country,
      studyField,
      qualification,
      status: 'NEW',
      documents: documentsPayload,
      notes: [
        {
          id: `note_${Date.now()}`,
          text: `Application submitted online by student from ${country}.`,
          author: 'System Intake Engine',
          createdAt: new Date().toISOString()
        }
      ],
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      // 1. Submit to backend API endpoint if online
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationPayload)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.applicationId) {
          generatedId = result.applicationId;
          applicationPayload.id = generatedId;
        }
        if (result.trackingId) {
          applicationPayload.trackingId = result.trackingId;
        }
      }
    } catch {
      // static host fallback
    }

    setSubmittedAppId(applicationPayload.trackingId || generatedId);

    // 2. Persist to localStorage client records for Admissions Portal
    try {
      const existing = JSON.parse(localStorage.getItem('fresh_study_submitted_applications') || '[]');
      const filtered = existing.filter((item: any) => item.id !== applicationPayload.id);
      filtered.unshift(applicationPayload);
      localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('fresh_application_submitted'));
    } catch {
      // ignore localStorage full
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const countries = [
    'Liberia',
    'Ghana',
    'Nigeria',
    'Kenya',
    'Sierra Leone',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Zambia',
    'Zimbabwe',
    'Gambia',
    'Other International'
  ];

  const studyFields = [
    'Computer Science',
    'Business & Management',
    'Engineering & Technology',
    'Healthcare & Allied Sciences',
    'Data & Technology',
    'Law & Legal Studies',
    'Other Study Options'
  ];

  const qualifications = [
    'High School Diploma (WAEC / WASSCE)',
    'Currently in Senior High School',
    'Undergraduate / Bachelor’s Degree',
    'Diploma / Polytechnic Certificate',
    'Master’s / Postgraduate Degree'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-xl p-6 sm:p-9 shadow-2xl border border-slate-200 z-10 my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
              Application Profile Created!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. Your profile for <strong className="text-slate-900">{studyField}</strong> with <strong className="text-slate-900">{uploadedFiles.length} uploaded document{uploadedFiles.length === 1 ? '' : 's'}</strong> has been received by our Admissions Committee.
            </p>

            {uploadedFiles.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Submitted Documents ({uploadedFiles.length})</span>
                </p>
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {uploadedFiles.map((doc, idx) => (
                    <div key={doc.id || idx} className="text-xs text-slate-600 flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="truncate max-w-[220px] font-medium text-slate-800">{doc.name}</span>
                      <span className="text-[11px] text-slate-600 font-mono shrink-0">{doc.formattedSize}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-900 space-y-1 text-left">
              <p className="font-bold">Next Steps:</p>
              <p>An educational counselor will review your academic documents, verify eligibility, and reach out via WhatsApp / Phone to discuss your shortlisted universities in India.</p>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLink('india', `Hello Myers Global Pathway, I have submitted my application profile for ${fullName} (${studyField}, ${country}) with ${uploadedFiles.length} document(s). Reference: ${submittedAppId || 'MGP-APP'}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl text-xs font-extrabold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect with Advisor on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-rose-800 border border-red-200/80 text-[11px] font-bold uppercase">
                <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
                <span>Student Intake 2026</span>
              </div>
              <h3 className="text-2xl font-black text-[#060F1E] tracking-tight">
                Start Your India Application
              </h3>
              <p className="text-xs text-slate-600">
                Complete this initial profile to receive university options and admissions guidance.
              </p>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emmanuel Sayon Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                />
              </div>

              {/* Two Column: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp / Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +231 889425645"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                  />
                </div>
              </div>

              {/* Two Column: Country & Desired Study Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Desired Field <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                  >
                    {studyFields.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Highest Qualification */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Current / Highest Education Level
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 transition"
                >
                  {qualifications.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              {/* 2. ADD DOCUMENT UPLOAD SECTION (Replacing Preferred City) */}
              <div className="pt-1">
                <div className="flex flex-col gap-0.5 mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    UPLOAD YOUR DOCUMENTS
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Upload clear copies of your academic and identification documents.
                  </p>
                </div>

                {/* Document Type Helper Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    'Passport',
                    'Academic Certificate',
                    'Academic Transcript',
                    'Passport-size Photo',
                    'Other Supporting Documents'
                  ].map((docType) => (
                    <span 
                      key={docType}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600"
                    >
                      {docType}
                    </span>
                  ))}
                </div>

                {/* Drag and Drop Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
                    isDragging 
                      ? 'border-red-600 bg-rose-50/80 scale-[1.01]' 
                      : 'border-slate-300 hover:border-red-400 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-red-100/70 text-rose-700 flex items-center justify-center shadow-xs">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Drag & drop your documents here
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        or <span className="text-rose-700 font-bold hover:underline">Choose Files</span>
                      </p>
                    </div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mt-0.5">
                      PDF, JPG, JPEG, PNG (Multiple files allowed)
                    </p>
                  </div>
                </div>

                {/* Selected Files List Underneath */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-bold px-1">
                      <span>Attached Files ({uploadedFiles.length})</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFiles([]);
                        }}
                        className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                      {uploadedFiles.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs hover:border-slate-300 transition"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="w-7 h-7 rounded-lg bg-red-100 text-rose-700 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate text-xs leading-tight">
                                {doc.name}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                <span className="font-bold text-rose-700 uppercase px-1.5 py-0.2 rounded bg-rose-50 border border-rose-200/60">
                                  {doc.type}
                                </span>
                                <span className="font-mono text-slate-600">{doc.formattedSize}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600 truncate">{doc.category}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(doc.id);
                            }}
                            title="Remove file"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                            aria-label={`Remove ${doc.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: SUBMIT APPLICATION PROFILE → */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-gradient-to-r from-red-600 via-rose-600 to-[#060F1E] hover:from-red-500 hover:via-rose-500 hover:to-[#0B1E38] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Application Profile...</span>
                  ) : (
                    <>
                      <span>SUBMIT APPLICATION PROFILE</span>
                      <ArrowRight className="w-4 h-4 text-rose-200" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero obligation • Direct university guidance</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
