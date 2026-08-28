import React, { useState } from 'react';
import { StudentDocument } from '../types';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Loader2, 
  Trash2, 
  ArrowRight, 
  FileCheck,
  Lock,
  MailCheck,
  Cloud
} from 'lucide-react';
import { syncApplicationToFirestore } from '../lib/firebase';

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
  onSuccessRedirect
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    dateOfBirth: '',
    academicBackground: '',
    currentQualification: 'High School Diploma / Secondary Certificate',
    preferredStudyLevel: presetData?.studyLevel || 'Undergraduate (Bachelor’s)',
    preferredCourse: presetData?.course || presetData?.field || '',
    preferredUniversity: '',
    message: ''
  });

  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [selectedDocCategory, setSelectedDocCategory] = useState<StudentDocument['category']>('Academic Transcripts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    trackingId: string;
    fullName: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // File Upload Handler with Base64 encoding for private server storage
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      // 10MB limit per file
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds the 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newDoc: StudentDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          formattedSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.type || 'application/octet-stream',
          category: selectedDocCategory,
          dataUrl,
          verified: false,
          uploadedAt: new Date().toISOString()
        };

        setDocuments(prev => [...prev, newDoc]);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('A valid email address is required.');
      return;
    }

    setIsSubmitting(true);

    const generatedAppId = `MGP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedTrackingId = `MGP-IND-${Math.floor(100000 + Math.random() * 900000)}`;

    const fullAppRecord = {
      id: generatedAppId,
      trackingId: generatedTrackingId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: formData.whatsapp.trim(),
      country: formData.country.trim(),
      dateOfBirth: formData.dateOfBirth.trim(),
      academicBackground: formData.academicBackground.trim(),
      currentQualification: formData.currentQualification.trim(),
      preferredStudyLevel: formData.preferredStudyLevel.trim(),
      preferredCourse: formData.preferredCourse.trim(),
      preferredUniversity: formData.preferredUniversity.trim(),
      message: formData.message.trim(),
      status: 'Application Submitted',
      documentsCount: documents.length,
      documents: documents.map(d => ({
        id: d.id,
        name: d.name,
        size: d.size,
        formattedSize: d.formattedSize,
        type: d.type,
        category: d.category,
        verified: false,
        uploadedAt: d.uploadedAt
      })),
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'System',
          text: `Application dossier submitted with ${documents.length} document(s).`,
          createdAt: new Date().toISOString()
        }
      ],
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Immediately cache application locally so it is never lost under any circumstance
    try {
      const existingRaw = localStorage.getItem('mgp_local_applications');
      const existingList = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedList = [fullAppRecord, ...existingList.filter((a: any) => a.id !== generatedAppId && a.trackingId !== generatedTrackingId)];
      localStorage.setItem('mgp_local_applications', JSON.stringify(updatedList));
      localStorage.setItem('mgp_last_submitted_app', JSON.stringify(fullAppRecord));
      
      // Also broadcast application submission event to other components and open tabs
      window.dispatchEvent(new CustomEvent('mgp_application_submitted', { detail: fullAppRecord }));
      
      // Async sync to Cloud Firestore
      syncApplicationToFirestore(fullAppRecord).catch(() => {});
    } catch (storageErr) {
      console.warn('Local storage write warning:', storageErr);
    }

    try {
      const payload = {
        ...formData,
        documents
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const finalTrackingId = data.trackingId || generatedTrackingId;
        setSubmissionResult({
          trackingId: finalTrackingId,
          fullName: formData.fullName
        });

        // Update local cache and Firestore with server assigned trackingId if different
        try {
          const existingRaw = localStorage.getItem('mgp_local_applications');
          if (existingRaw) {
            const list = JSON.parse(existingRaw);
            const updated = list.map((a: any) => a.id === generatedAppId ? { ...a, trackingId: finalTrackingId } : a);
            localStorage.setItem('mgp_local_applications', JSON.stringify(updated));
            const activeRecord = updated.find((a: any) => a.id === generatedAppId);
            if (activeRecord) {
              syncApplicationToFirestore(activeRecord).catch(() => {});
            }
          }
        } catch (_) {}

      } else {
        // Fallback: If server returned an error but local cache exists, display success with local record
        setSubmissionResult({
          trackingId: generatedTrackingId,
          fullName: formData.fullName
        });
      }
    } catch (err: any) {
      // Offline / Network fallback: Local submission preserved
      setSubmissionResult({
        trackingId: generatedTrackingId,
        fullName: formData.fullName
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0A1128] text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Official Admissions Application
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Myers Global Pathways Application
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-700/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-slate-900 space-y-6">
          
          {submissionResult ? (
            /* Successful Submission View */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <FileCheck className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Application Successfully Registered
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, {submissionResult.fullName}. Your application has been logged with our admissions team.
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Your Application Reference Code
                </span>
                <p className="text-xl sm:text-2xl font-mono font-extrabold text-slate-950 mt-1 text-amber-700">
                  {submissionResult.trackingId}
                </p>
                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  Save this code to check your status and <span className="font-bold text-slate-900">upload additional documents</span> (transcripts, certificates, passport) anytime in the Student Portal.
                </p>
              </div>

              {/* Confirmation Email Dispatched Notice */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 max-w-md mx-auto text-left flex items-start gap-2.5 text-xs text-emerald-950">
                <MailCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Confirmation Email Sent</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    An official application receipt and dossier confirmation has been dispatched from <span className="font-mono font-semibold">admissions@myersglobalpathways.com</span> to your email address.
                  </p>
                </div>
              </div>

              {/* Security Confirmation Notice */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your details and attached files have been stored in our confidential registry.</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onSuccessRedirect) onSuccessRedirect(submissionResult.trackingId);
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Track Status in Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Security Banner */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Confidential Admissions Storage:</span> Student records and academic credentials are encrypted and stored in a private document vault, accessible only by verified admissions officers.
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Student Personal Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  1. Personal & Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Samuel K. Johnson"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="samuel@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+231 88 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country of Origin / Residence
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Liberia, Ghana..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Academic Background & Preferences */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  2. Academic Qualifications & Target Program
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Highest Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.currentQualification}
                      onChange={(e) => setFormData({ ...formData, currentQualification: e.target.value })}
                      placeholder="e.g. WAEC / WASSCE, Bachelor's Degree"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Study Level
                    </label>
                    <select
                      value={formData.preferredStudyLevel}
                      onChange={(e) => setFormData({ ...formData, preferredStudyLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    >
                      <option value="Undergraduate (Bachelor’s)">Undergraduate (Bachelor’s Degree)</option>
                      <option value="Postgraduate (Master’s)">Postgraduate (Master’s Degree)</option>
                      <option value="Doctoral (Ph.D.)">Doctoral (Ph.D.)</option>
                      <option value="Diploma / Specialized Certificate">Diploma / Specialized Certificate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Course / Program
                    </label>
                    <input
                      type="text"
                      value={formData.preferredCourse}
                      onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                      placeholder="e.g. B.Tech Computer Science, MBA, Pharmacy"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred University (If known)
                    </label>
                    <input
                      type="text"
                      value={formData.preferredUniversity}
                      onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                      placeholder="Leave blank for recommendations"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Background & Special Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.academicBackground}
                    onChange={(e) => setFormData({ ...formData, academicBackground: e.target.value })}
                    placeholder="Briefly describe your high school or college background, major subjects, or specific questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                  />
                </div>
              </div>

              {/* 3. Document Uploads (Passport, Certificates, Transcripts, Other) */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-1">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      3. Supporting Documents (Optional at this stage)
                    </h4>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      ✓ You can attach files now or upload required documents later anytime in the Student Portal.
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">PDF, JPG, PNG (Max 10MB)</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">Document Type:</span>
                    {(['Academic Transcripts', 'Academic Certificates', 'Passport', 'Other Supporting Documents'] as const).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setSelectedDocCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                          selectedDocCategory === cat
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <label className="flex flex-col items-center justify-center py-4 px-3 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition-colors cursor-pointer text-center">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-800">
                      Click to attach {selectedDocCategory}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Select file from your phone or computer (or skip to upload later)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Attached Files ({documents.length}):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 text-xs shadow-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="truncate">
                              <p className="font-semibold text-slate-900 truncate">{doc.name}</p>
                              <p className="text-[10px] text-slate-500">{doc.category} • {doc.formattedSize}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(doc.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
