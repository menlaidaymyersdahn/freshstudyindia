import React, { useState, useEffect } from 'react';
import { ApplicationStatus, ApplicationSubmission, StudentDocument } from '../types';
import { 
  X, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Loader2, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  FileCheck,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Building2,
  GraduationCap,
  CloudCheck,
  Upload,
  Trash2,
  Plus,
  Paperclip,
  Check
} from 'lucide-react';
import { lookupApplicationInFirestore, syncApplicationToFirestore } from '../lib/firebase';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingId?: string;
  onOpenNewApplication?: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  initialTrackingId,
  onOpenNewApplication
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [studentRecord, setStudentRecord] = useState<ApplicationSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedLocalApps, setSavedLocalApps] = useState<any[]>([]);

  // Document Upload Later State
  const [isUploadTrayOpen, setIsUploadTrayOpen] = useState(false);
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<StudentDocument['category']>('Academic Transcripts');
  const [pendingUploadDocs, setPendingUploadDocs] = useState<StudentDocument[]>([]);
  const [studentUploadNote, setStudentUploadNote] = useState('');
  const [isUploadingLaterDocs, setIsUploadingLaterDocs] = useState(false);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState<string | null>(null);
  const [uploadErrorNotice, setUploadErrorNotice] = useState<string | null>(null);

  const statusSteps: ApplicationStatus[] = [
    'Application Submitted',
    'Documents Review',
    'University Review',
    'Admission Decision'
  ];

  // On open: check for existing submissions and auto-load if available
  useEffect(() => {
    if (isOpen) {
      // 1. Read locally cached submissions
      let localList: any[] = [];
      try {
        const rawLocal = localStorage.getItem('mgp_local_applications');
        const rawLast = localStorage.getItem('mgp_last_submitted_app');
        if (rawLocal) {
          const parsed = JSON.parse(rawLocal);
          if (Array.isArray(parsed)) {
            localList = parsed;
          }
        }
        if (rawLast) {
          const parsedLast = JSON.parse(rawLast);
          if (parsedLast && !localList.some(item => (item.id && item.id === parsedLast.id) || (item.trackingId && item.trackingId === parsedLast.trackingId))) {
            localList.unshift(parsedLast);
          }
        }
        setSavedLocalApps(localList);
      } catch (_) {}

      // 2. Determine target lookup query
      if (initialTrackingId && initialTrackingId.trim()) {
        setSearchInput(initialTrackingId);
        performLookup(initialTrackingId);
      } else if (!studentRecord) {
        if (localList.length > 0) {
          const first = localList[0];
          const target = first.trackingId || first.email;
          if (target) {
            setSearchInput(target);
            performLookup(target);
          }
        }
      }
    }
  }, [isOpen, initialTrackingId]);

  if (!isOpen) return null;

  // Safe JSON Fetch helper that never throws on non-JSON or HTML 404
  const safeFetchLookup = async (queryParam: string) => {
    try {
      const encoded = encodeURIComponent(queryParam);
      const url = `/api/student/lookup?query=${encoded}&trackingId=${encoded}&email=${encoded}&q=${encoded}`;
      const res = await fetch(url);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { ok: res.ok, status: res.status, data: json };
      } catch {
        return { ok: false, status: res.status, data: null };
      }
    } catch (err: any) {
      return { ok: false, status: 0, error: err.message, data: null };
    }
  };

  // Resilient Local Finder across all client caches
  const findInLocalStorage = (q: string) => {
    try {
      const rawLocal = localStorage.getItem('mgp_local_applications');
      const rawLast = localStorage.getItem('mgp_last_submitted_app');
      const list: any[] = [];
      if (rawLast) {
        try { list.push(JSON.parse(rawLast)); } catch (_) {}
      }
      if (rawLocal) {
        try { 
          const parsed = JSON.parse(rawLocal);
          if (Array.isArray(parsed)) list.push(...parsed);
        } catch (_) {}
      }

      // Standardize search tokens
      const targetLower = q.toLowerCase().trim();
      const targetClean = targetLower.replace(/[^a-z0-9]/gi, '');
      const targetDigits = q.replace(/\D/g, '');

      return list.find((a: any) => {
        if (!a) return false;
        const aTrack = String(a.trackingId || '').toLowerCase().trim();
        const aCleanTrack = aTrack.replace(/[^a-z0-9]/gi, '');
        const aId = String(a.id || '').toLowerCase().trim();
        const aEmail = String(a.email || '').toLowerCase().trim();
        const aName = String(a.fullName || '').toLowerCase().trim();
        const aPhone = String(a.whatsapp || '').replace(/\D/g, '');

        // Exact match
        if (aTrack === targetLower || aId === targetLower || aEmail === targetLower || aName === targetLower) return true;
        // Clean tracking match (ignoring dashes/spaces)
        if (targetClean.length >= 4 && (aCleanTrack.includes(targetClean) || targetClean.includes(aCleanTrack))) return true;
        // Numeric suffix match
        if (targetDigits.length >= 4 && (aTrack.includes(targetDigits) || aId.includes(targetDigits))) return true;
        // Email & Name partial
        if (targetLower.length >= 3 && (aEmail.includes(targetLower) || aName.includes(targetLower))) return true;
        // Phone match
        if (targetDigits.length >= 6 && aPhone.includes(targetDigits)) return true;

        return false;
      });
    } catch (_) {
      return null;
    }
  };

  const performLookup = async (query: string) => {
    const q = (query || '').trim();
    if (!q) {
      setErrorMessage('Please enter your Application Reference Code (e.g. MGP-IND-123456) or registered Email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // 1. Try server API lookup first
    const { ok, data } = await safeFetchLookup(q);

    if (ok && data?.success && data?.application) {
      setStudentRecord(data.application);
      setIsLoading(false);

      // Save to local cache so user can re-access instantly and sync to Firestore
      try {
        const rawLocal = localStorage.getItem('mgp_local_applications');
        const list = rawLocal ? JSON.parse(rawLocal) : [];
        const updated = [data.application, ...list.filter((x: any) => x.id !== data.application.id && x.trackingId !== data.application.trackingId)];
        localStorage.setItem('mgp_local_applications', JSON.stringify(updated));
        setSavedLocalApps(updated);
        syncApplicationToFirestore(data.application).catch(() => {});
      } catch (_) {}
      return;
    }

    // 2. Direct Cloud Firestore Lookup fallback
    try {
      const cloudRecord = await lookupApplicationInFirestore(q);
      if (cloudRecord) {
        setStudentRecord(cloudRecord);
        setIsLoading(false);
        try {
          const rawLocal = localStorage.getItem('mgp_local_applications');
          const list = rawLocal ? JSON.parse(rawLocal) : [];
          const updated = [cloudRecord, ...list.filter((x: any) => x.id !== cloudRecord.id && x.trackingId !== cloudRecord.trackingId)];
          localStorage.setItem('mgp_local_applications', JSON.stringify(updated));
          setSavedLocalApps(updated);
        } catch (_) {}
        return;
      }
    } catch (_) {}

    // 3. Fallback to Local Browser Storage (for offline, static preview, or recently created apps)
    const localMatch = findInLocalStorage(q);
    if (localMatch) {
      setStudentRecord(localMatch);
      setIsLoading(false);
      // Attempt background Firestore sync for this found local item
      syncApplicationToFirestore(localMatch).catch(() => {});
      return;
    }

    // 4. Record not found
    setStudentRecord(null);
    setIsLoading(false);
    setErrorMessage(data?.error || `No application dossier found matching "${q}". Please verify your reference code or registered email.`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(searchInput);
  };

  const getCurrentStepIndex = (currentStatus?: ApplicationStatus) => {
    if (!currentStatus) return 0;
    const idx = statusSteps.indexOf(currentStatus);
    return idx === -1 ? 0 : idx;
  };

  // Document Upload Handlers
  const handlePendingFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadErrorNotice(null);
    setUploadSuccessNotice(null);

    Array.from(files).forEach((file: File) => {
      if (file.size > 10 * 1024 * 1024) {
        setUploadErrorNotice(`File "${file.name}" exceeds the 10MB limit.`);
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
          category: selectedUploadCategory,
          dataUrl,
          verified: false,
          uploadedAt: new Date().toISOString()
        };

        setPendingUploadDocs(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemovePendingDoc = (docId: string) => {
    setPendingUploadDocs(prev => prev.filter(d => d.id !== docId));
  };

  const handleUploadDocumentsSubmit = async () => {
    if (!studentRecord) return;
    if (pendingUploadDocs.length === 0) {
      setUploadErrorNotice('Please select at least one document file to upload.');
      return;
    }

    setIsUploadingLaterDocs(true);
    setUploadErrorNotice(null);
    setUploadSuccessNotice(null);

    try {
      const targetId = studentRecord.id || studentRecord.trackingId;
      const res = await fetch(`/api/applications/${encodeURIComponent(targetId || '')}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingId: studentRecord.trackingId,
          documents: pendingUploadDocs,
          studentNote: studentUploadNote.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.application) {
        const updatedApp = data.application;
        setStudentRecord(updatedApp);
        setUploadSuccessNotice(`Successfully uploaded ${pendingUploadDocs.length} document(s). Your admissions dossier has been updated.`);
        setPendingUploadDocs([]);
        setStudentUploadNote('');
        setIsUploadTrayOpen(false);

        // Update local browser cache
        try {
          const rawLocal = localStorage.getItem('mgp_local_applications');
          const list = rawLocal ? JSON.parse(rawLocal) : [];
          const updatedList = [updatedApp, ...list.filter((x: any) => x.id !== updatedApp.id && x.trackingId !== updatedApp.trackingId)];
          localStorage.setItem('mgp_local_applications', JSON.stringify(updatedList));
          setSavedLocalApps(updatedList);
          syncApplicationToFirestore(updatedApp).catch(() => {});
        } catch (_) {}
      } else {
        // Fallback local update
        const fallbackDocs = [...(studentRecord.documents || []), ...pendingUploadDocs];
        const updatedFallback: ApplicationSubmission = {
          ...studentRecord,
          documents: fallbackDocs,
          documentsCount: fallbackDocs.length,
          updatedAt: new Date().toISOString()
        };
        setStudentRecord(updatedFallback);
        setUploadSuccessNotice(`Uploaded ${pendingUploadDocs.length} document(s) to your dossier.`);
        setPendingUploadDocs([]);
        setStudentUploadNote('');
        setIsUploadTrayOpen(false);

        try {
          const rawLocal = localStorage.getItem('mgp_local_applications');
          const list = rawLocal ? JSON.parse(rawLocal) : [];
          const updatedList = [updatedFallback, ...list.filter((x: any) => x.id !== updatedFallback.id && x.trackingId !== updatedFallback.trackingId)];
          localStorage.setItem('mgp_local_applications', JSON.stringify(updatedList));
          setSavedLocalApps(updatedList);
          syncApplicationToFirestore(updatedFallback).catch(() => {});
        } catch (_) {}
      }
    } catch (err: any) {
      // Fallback
      const fallbackDocs = [...(studentRecord.documents || []), ...pendingUploadDocs];
      const updatedFallback: ApplicationSubmission = {
        ...studentRecord,
        documents: fallbackDocs,
        documentsCount: fallbackDocs.length,
        updatedAt: new Date().toISOString()
      };
      setStudentRecord(updatedFallback);
      setUploadSuccessNotice(`Uploaded ${pendingUploadDocs.length} document(s) to your dossier.`);
      setPendingUploadDocs([]);
      setStudentUploadNote('');
      setIsUploadTrayOpen(false);

      try {
        syncApplicationToFirestore(updatedFallback).catch(() => {});
      } catch (_) {}
    } finally {
      setIsUploadingLaterDocs(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0A1128] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Student Self-Service Desk
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Application Status & Portal
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-700/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-slate-900 space-y-6">
          
          {/* Lookup Input Bar */}
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Enter Your Application Reference Code or Email
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. MGP-IND-123456, samuel@example.com, or your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Look Up</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions from Local Storage if present */}
            {savedLocalApps.length > 0 && !studentRecord && (
              <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-semibold text-slate-500">Recent on this browser:</span>
                {savedLocalApps.slice(0, 3).map((appItem) => (
                  <button
                    key={appItem.id || appItem.trackingId}
                    type="button"
                    onClick={() => {
                      const code = appItem.trackingId || appItem.email;
                      setSearchInput(code);
                      performLookup(code);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 border border-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{appItem.fullName}</span>
                    <span className="font-mono text-[10px] text-slate-500">({appItem.trackingId})</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex flex-col gap-3 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-amber-950">Application Record Search Notice</p>
                  <p className="mt-0.5 text-amber-900 leading-relaxed">{errorMessage}</p>
                </div>
              </div>

              {/* If there are saved applications in browser, offer 1-click restore */}
              {savedLocalApps.length > 0 && (
                <div className="pt-2 border-t border-amber-200/70">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                    Found saved application(s) on your browser:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {savedLocalApps.slice(0, 4).map((appItem) => (
                      <button
                        key={appItem.id || appItem.trackingId}
                        type="button"
                        onClick={() => {
                          const target = appItem.trackingId || appItem.email;
                          setSearchInput(target);
                          performLookup(target);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-200/90 hover:bg-amber-300 text-amber-950 font-bold text-[11px] inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-amber-900" />
                        <span>Open {appItem.fullName}</span>
                        <span className="font-mono text-[10px] text-amber-800">({appItem.trackingId})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => performLookup(searchInput)}
                  className="px-3 py-1.5 rounded-xl bg-amber-950 text-amber-100 hover:bg-amber-900 font-semibold text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry Search</span>
                </button>
                {onOpenNewApplication && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenNewApplication();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 font-semibold text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Submit New Application</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Application Details View */}
          {studentRecord ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Applicant Name
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-950">
                      {studentRecord.fullName}
                    </h4>
                    <p className="text-xs text-slate-500">{studentRecord.email} {studentRecord.whatsapp ? `• ${studentRecord.whatsapp}` : ''}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Tracking Code
                    </span>
                    <p className="text-sm font-mono font-bold text-amber-800 bg-amber-100/60 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                      {studentRecord.trackingId}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => performLookup(studentRecord.trackingId || studentRecord.email)}
                        className="text-[11px] text-blue-700 hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Refresh</span>
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={() => {
                          setStudentRecord(null);
                          setErrorMessage(null);
                          setSearchInput('');
                        }}
                        className="text-[11px] text-slate-600 hover:text-slate-950 hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Search Another</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Target Program</span>
                    <p className="font-semibold text-slate-900">{studentRecord.preferredCourse || studentRecord.preferredStudyLevel || 'Undergraduate'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Preferred University</span>
                    <p className="font-semibold text-slate-900">{studentRecord.preferredUniversity || 'Indian University Partner'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Current Status</span>
                    <p className="font-bold text-amber-700">{studentRecord.status}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Attached Docs</span>
                    <p className="font-semibold text-slate-900">{studentRecord.documentsCount || studentRecord.documents?.length || 0} file(s)</p>
                  </div>
                </div>
              </div>

              {/* Official Admission Offer Letter Banner (If Approved) */}
              {(studentRecord.admissionDetails || studentRecord.status === 'Admission Decision') && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-slate-900 space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          Congratulations!
                        </span>
                        <h4 className="text-base font-extrabold text-emerald-950">
                          Provisional Letter of Admission Issued
                        </h4>
                      </div>
                    </div>

                    <a
                      href={`/api/applications/${studentRecord.id || studentRecord.trackingId}/offer-letter`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Download Official Offer Letter</span>
                    </a>
                  </div>

                  {studentRecord.admissionDetails && (
                    <div className="p-3.5 bg-white/95 rounded-xl border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-semibold">Approved University</p>
                        <p className="font-bold text-slate-900">{studentRecord.admissionDetails.approvedUniversity}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-semibold">Approved Program</p>
                        <p className="font-bold text-slate-900">{studentRecord.admissionDetails.approvedProgram}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-semibold">Annual Tuition (USD)</p>
                        <p className="font-bold text-slate-900">${studentRecord.admissionDetails.tuitionFeeUsd}/yr</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-semibold">Scholarship Grant</p>
                        <p className="font-bold text-emerald-800">{studentRecord.admissionDetails.scholarshipPercentage}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6-Stage Progress Tracker */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Admission Journey Progression
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {statusSteps.map((step, idx) => {
                    const currentIdx = getCurrentStepIndex(studentRecord.status);
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isCurrent
                            ? 'bg-amber-50 border-amber-300 shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50/60 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : isCurrent ? (
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-[9px] flex items-center justify-center font-mono shrink-0">
                              {idx + 1}
                            </span>
                          )}
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            isCurrent ? 'text-amber-800' : isCompleted ? 'text-emerald-800' : 'text-slate-400'
                          }`}>
                            Step 0{idx + 1}
                          </span>
                        </div>
                        <p className={`text-xs font-bold leading-tight ${
                          isCurrent ? 'text-slate-950' : isCompleted ? 'text-emerald-950' : 'text-slate-500'
                        }`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attached Documents Breakdown & Upload Later Tray */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Dossier Documents & Verification
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {studentRecord.documents?.length || 0} Attached
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload your required transcripts, certificates, or passport scan for admissions verification.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadTrayOpen(!isUploadTrayOpen);
                      setUploadErrorNotice(null);
                      setUploadSuccessNotice(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isUploadTrayOpen
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    }`}
                  >
                    {isUploadTrayOpen ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Close Uploader</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Documents Later</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Upload Success Notice */}
                {uploadSuccessNotice && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Documents Successfully Attached!</p>
                      <p className="text-emerald-800 text-[11px] mt-0.5">{uploadSuccessNotice}</p>
                    </div>
                  </div>
                )}

                {/* Upload Error Notice */}
                {uploadErrorNotice && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Upload Notice</p>
                      <p className="text-rose-800 text-[11px] mt-0.5">{uploadErrorNotice}</p>
                    </div>
                  </div>
                )}

                {/* Interactive Document Upload Later Panel */}
                {isUploadTrayOpen && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-amber-800" />
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                          Upload Required / Additional Documents
                        </h5>
                      </div>
                      <span className="text-[11px] text-amber-800 font-medium">PDF, JPG, PNG, DOCX (Max 10MB)</span>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Select Document Category
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {([
                          'Academic Transcripts',
                          'Academic Certificates',
                          'Passport',
                          'Other Supporting Documents'
                        ] as const).map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setSelectedUploadCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              selectedUploadCategory === cat
                                ? 'bg-slate-950 text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Dropzone */}
                    <label className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50/40 transition-colors cursor-pointer text-center group">
                      <Upload className="w-6 h-6 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-900">
                        Choose {selectedUploadCategory} File(s)
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5">
                        Click to browse from your device or phone
                      </span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handlePendingFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Pending Files Staged for Upload */}
                    {pendingUploadDocs.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Ready to Upload ({pendingUploadDocs.length} file{pendingUploadDocs.length > 1 ? 's' : ''}):
                        </p>
                        <div className="space-y-1.5">
                          {pendingUploadDocs.map((doc) => (
                            <div
                              key={doc.id}
                              className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 text-xs shadow-2xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                                <div className="truncate">
                                  <p className="font-semibold text-slate-900 truncate">{doc.name}</p>
                                  <p className="text-[10px] text-slate-500">{doc.category} • {doc.formattedSize}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemovePendingDoc(doc.id)}
                                className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                                title="Remove file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Optional Student Note */}
                        <div className="pt-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Note for Admissions Officer (Optional)
                          </label>
                          <input
                            type="text"
                            value={studentUploadNote}
                            onChange={(e) => setStudentUploadNote(e.target.value)}
                            placeholder="e.g. Attached my high school WAEC certificate and valid passport page"
                            className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                          />
                        </div>

                        {/* Upload CTA Button */}
                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setPendingUploadDocs([]);
                              setIsUploadTrayOpen(false);
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/80 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            disabled={isUploadingLaterDocs}
                            onClick={handleUploadDocumentsSubmit}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            {isUploadingLaterDocs ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Uploading Files...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Submit Documents to Admissions Officer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Existing Dossier Documents Grid */}
                {studentRecord.documents && studentRecord.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {studentRecord.documents.map((doc) => (
                      <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs shadow-2xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-slate-900 truncate" title={doc.name}>
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {doc.category} {doc.formattedSize ? `• ${doc.formattedSize}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {doc.storedFile && (
                            <a
                              href={`/api/documents/${doc.storedFile}`}
                              download={doc.name}
                              className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                              title="Download document"
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            doc.verified 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {doc.verified ? 'Verified' : 'Under Review'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <p className="text-xs text-slate-600">
                      No documents currently uploaded to your dossier.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsUploadTrayOpen(true)}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Your Required Documents Now</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Dedicated Counselor Desk */}
              <div className="p-4 rounded-2xl bg-[#0A1128] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Have questions regarding this application?</span>
                </div>
                <a
                  href={`mailto:applications@myersglobalpathways.com?subject=Inquiry%20Ref%20${studentRecord.trackingId}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
                >
                  Email Applications Desk
                </a>
              </div>

            </div>
          ) : (
            /* First Time Instructions */
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-slate-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Track Your University Application
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Enter the reference code you received upon submitting your application or your registered email to view progress updates and document status.
                </p>
              </div>

              {onOpenNewApplication && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenNewApplication();
                    }}
                    className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
                  >
                    Haven't applied yet? Start a new application →
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

