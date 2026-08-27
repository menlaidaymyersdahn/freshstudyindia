import React, { useState, useEffect } from 'react';
import { ApplicationStatus, ApplicationSubmission } from '../types';
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
  GraduationCap
} from 'lucide-react';

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

  const statusSteps: ApplicationStatus[] = [
    'Application Submitted',
    'Documents Review',
    'University Review',
    'Admission Decision',
    'Visa Preparation',
    'Ready for India'
  ];

  // On open: check for existing submissions and auto-load if available
  useEffect(() => {
    if (isOpen) {
      // 1. Read locally cached submissions
      let localList: any[] = [];
      try {
        const rawLocal = localStorage.getItem('mgp_local_applications');
        if (rawLocal) {
          const parsed = JSON.parse(rawLocal);
          if (Array.isArray(parsed)) {
            localList = parsed;
            setSavedLocalApps(parsed);
          }
        }
      } catch (_) {}

      // 2. Determine target lookup query
      if (initialTrackingId && initialTrackingId.trim()) {
        setSearchInput(initialTrackingId);
        performLookup(initialTrackingId);
      } else if (!studentRecord) {
        // Check if there is a recently submitted app
        try {
          const rawLast = localStorage.getItem('mgp_last_submitted_app');
          if (rawLast) {
            const parsedLast = JSON.parse(rawLast);
            if (parsedLast && (parsedLast.trackingId || parsedLast.email)) {
              const target = parsedLast.trackingId || parsedLast.email;
              setSearchInput(target);
              performLookup(target);
              return;
            }
          }
        } catch (_) {}

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

  const performLookup = async (query: string) => {
    const q = (query || '').trim();
    if (!q) {
      setErrorMessage('Please enter your Application Reference Code (e.g. MGP-IND-123456) or registered Email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Check local storage for quick match
    const findInLocalStorage = () => {
      try {
        const rawLocal = localStorage.getItem('mgp_local_applications');
        const rawLast = localStorage.getItem('mgp_last_submitted_app');
        const list: any[] = [];
        if (rawLast) list.push(JSON.parse(rawLast));
        if (rawLocal) list.push(...JSON.parse(rawLocal));

        const targetLower = q.toLowerCase();
        const targetDigits = q.replace(/\D/g, '');

        return list.find((a: any) => {
          if (!a) return false;
          const aTrack = String(a.trackingId || '').toLowerCase().trim();
          const aId = String(a.id || '').toLowerCase().trim();
          const aEmail = String(a.email || '').toLowerCase().trim();
          const aName = String(a.fullName || '').toLowerCase().trim();

          if (aTrack === targetLower || aId === targetLower || aEmail === targetLower || aName === targetLower) return true;
          if (targetDigits.length >= 4 && aTrack.includes(targetDigits)) return true;
          if (aEmail.includes(targetLower) || aName.includes(targetLower)) return true;
          return false;
        });
      } catch (_) {
        return null;
      }
    };

    try {
      const encoded = encodeURIComponent(q);
      const url = `/api/student/lookup?query=${encoded}&trackingId=${encoded}&email=${encoded}&q=${encoded}`;
      
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success && data.application) {
        setStudentRecord(data.application);
      } else {
        const localMatch = findInLocalStorage();
        if (localMatch) {
          setStudentRecord(localMatch);
        } else {
          setStudentRecord(null);
          setErrorMessage(data.error || `No application dossier found matching "${q}". Please verify your reference code or registered email.`);
        }
      }
    } catch (err) {
      // Local fallback in case of connection lag or offline mode
      const localMatch = findInLocalStorage();
      if (localMatch) {
        setStudentRecord(localMatch);
      } else {
        setStudentRecord(null);
        setErrorMessage(`Unable to connect to the admissions database. Please check your connection or search by the email you used when applying.`);
      }
    } finally {
      setIsLoading(false);
    }
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
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Admissions Record Search Notice</p>
                <p className="mt-0.5">{errorMessage}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => performLookup(searchInput)}
                    className="px-3 py-1 rounded-md bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
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
                      className="px-3 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Submit New Application</span>
                    </button>
                  )}
                </div>
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

                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Tracking Code
                    </span>
                    <p className="text-sm font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md border border-amber-200/80 mt-0.5">
                      {studentRecord.trackingId}
                    </p>
                    <button
                      type="button"
                      onClick={() => performLookup(studentRecord.trackingId || studentRecord.email)}
                      className="mt-1.5 text-[10px] text-blue-700 hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Refresh Status</span>
                    </button>
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
              {(studentRecord.admissionDetails || studentRecord.status === 'Admission Decision' || studentRecord.status === 'Ready for India' || studentRecord.status === 'Visa Preparation') && (
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

              {/* Attached Documents Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Dossier Document Verification
                </h4>

                {studentRecord.documents && studentRecord.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {studentRecord.documents.map((doc) => (
                      <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                          <div className="truncate">
                            <p className="font-semibold text-slate-900 truncate">{doc.name}</p>
                            <p className="text-[10px] text-slate-500">{doc.category}</p>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          doc.verified 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.verified ? 'Verified' : 'Under Review'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                    No documents currently uploaded. You can submit transcripts to admissions@myersglobalpathways.com
                  </p>
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

