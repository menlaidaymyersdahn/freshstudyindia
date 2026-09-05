import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApplicationStatus, ApplicationSubmission, StudentDocument } from '../types';
import { 
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
  Upload,
  Trash2,
  Compass,
  ChevronRight,
  MessageCircle,
  Phone
} from 'lucide-react';
import { lookupApplicationInFirestore, syncApplicationToFirestore } from '../lib/firebase';
import { useSEO } from '../hooks/useSEO';
import { getWhatsAppConfig, COMPANY } from '../config/company';

export const StudentPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialParamId = searchParams.get('trackingId') || '';

  useSEO({
    title: 'Student Portal & Application Status Tracker | Myers Global Pathways',
    description: 'Track your university application status in real-time, view verified admission letters, and upload supplementary academic documents.',
    canonicalPath: '/student-portal',
    keywords: 'Student Portal, Application Status Tracker, Myers Global Pathways Student Portal, Study in India Tracker',
    noIndex: true
  });

  const [searchInput, setSearchInput] = useState(initialParamId);
  const [isLoading, setIsLoading] = useState(false);
  const [studentRecord, setStudentRecord] = useState<ApplicationSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedLocalApps, setSavedLocalApps] = useState<any[]>([]);

  // Document Upload Tray State
  const [isUploadTrayOpen, setIsUploadTrayOpen] = useState(false);
  const [selectedUploadCategory, setSelectedUploadCategory] = useState<StudentDocument['category']>('Academic Transcripts');
  const [pendingUploadDocs, setPendingUploadDocs] = useState<StudentDocument[]>([]);
  const [studentUploadNote, setStudentUploadNote] = useState('');
  const [isUploadingLaterDocs, setIsUploadingLaterDocs] = useState(false);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState<string | null>(null);
  const [uploadErrorNotice, setUploadErrorNotice] = useState<string | null>(null);

  const whatsappConfig = getWhatsAppConfig();

  const statusSteps: ApplicationStatus[] = [
    'Application Submitted',
    'Documents Review',
    'University Review',
    'Admission Decision'
  ];

  // Load saved local applications on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mgp_applications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedLocalApps(parsed);
        }
      }
    } catch (e) {
      console.warn('Error reading local applications:', e);
    }
  }, []);

  // Automatic lookup if param provided
  useEffect(() => {
    if (initialParamId) {
      handleLookup(initialParamId);
    }
  }, [initialParamId]);

  const handleLookup = async (idToSearch?: string) => {
    const query = (idToSearch || searchInput).trim();
    if (!query) return;

    setIsLoading(true);
    setErrorMessage(null);
    setUploadSuccessNotice(null);
    setUploadErrorNotice(null);

    try {
      // 1. Try Express API Endpoint
      let foundRecord: ApplicationSubmission | null = null;
      try {
        const response = await fetch(`/api/applications/track/${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          if (data && (data.trackingId || data.id)) {
            foundRecord = data;
          }
        }
      } catch (err) {
        console.warn('Express tracking lookup error:', err);
      }

      // 2. Try Firestore lookup
      if (!foundRecord) {
        try {
          const firestoreRecord = await lookupApplicationInFirestore(query);
          if (firestoreRecord) {
            foundRecord = firestoreRecord as ApplicationSubmission;
          }
        } catch (err) {
          console.warn('Firestore lookup error:', err);
        }
      }

      // 3. Try LocalStorage
      if (!foundRecord) {
        try {
          const stored = localStorage.getItem('mgp_applications');
          if (stored) {
            const parsed: ApplicationSubmission[] = JSON.parse(stored);
            const match = parsed.find(app => 
              app.trackingId?.toLowerCase() === query.toLowerCase() ||
              app.id?.toLowerCase() === query.toLowerCase() ||
              app.email?.toLowerCase() === query.toLowerCase()
            );
            if (match) {
              foundRecord = match;
            }
          }
        } catch (err) {
          console.warn('Local storage lookup error:', err);
        }
      }

      if (foundRecord) {
        setStudentRecord(foundRecord);
      } else {
        setStudentRecord(null);
        setErrorMessage(`No application found for "${query}". Please check your Tracking ID or Email address.`);
      }

    } catch (err: any) {
      console.error('Error during student lookup:', err);
      setErrorMessage('Failed to search records. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePendingFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newDoc: StudentDocument = {
          id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          name: file.name,
          size: file.size,
          formattedSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.type || 'application/octet-stream',
          category: selectedUploadCategory,
          dataUrl: reader.result as string,
          verified: false,
          uploadedAt: new Date().toISOString()
        };

        setPendingUploadDocs(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleUploadSupplementaryDocs = async () => {
    if (!studentRecord || pendingUploadDocs.length === 0) return;

    setIsUploadingLaterDocs(true);
    setUploadSuccessNotice(null);
    setUploadErrorNotice(null);

    const trackingId = studentRecord.trackingId || studentRecord.id || '';

    try {
      const response = await fetch('/api/applications/upload-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingId: trackingId,
          documents: pendingUploadDocs,
          studentNote: studentUploadNote.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Server rejected document upload');
      }

      const result = await response.json();
      const updatedRecord = result.application || {
        ...studentRecord,
        documents: [...(studentRecord.documents || []), ...pendingUploadDocs],
        documentsCount: (studentRecord.documentsCount || 0) + pendingUploadDocs.length
      };

      setStudentRecord(updatedRecord);
      setPendingUploadDocs([]);
      setStudentUploadNote('');
      setIsUploadTrayOpen(false);
      setUploadSuccessNotice(`Successfully uploaded ${pendingUploadDocs.length} supplementary document(s)!`);

      // Update LocalStorage
      const localStore = JSON.parse(localStorage.getItem('mgp_applications') || '[]');
      const updatedLocal = localStore.map((app: any) => 
        (app.trackingId === trackingId || app.id === trackingId) ? updatedRecord : app
      );
      localStorage.setItem('mgp_applications', JSON.stringify(updatedLocal));

    } catch (err: any) {
      console.error('Error uploading supplementary documents:', err);
      setUploadErrorNotice('Could not upload documents. Please verify your connection and try again.');
    } finally {
      setIsUploadingLaterDocs(false);
    }
  };

  const getStepIndex = (status?: ApplicationStatus) => {
    if (!status) return 0;
    const idx = statusSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="min-h-screen bg-[#EBF3FC] text-slate-900 pt-28 pb-20 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-6 font-semibold">
          <button
            onClick={() => navigate('/')}
            className="hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-800 font-bold">Student Portal</span>
        </div>

        {/* Portal Search & Welcome Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-300 shadow-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-200">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold">
                <UserCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Student Application Status Desk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Student Portal & Application Tracker
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Enter your Tracking ID (e.g. <strong className="text-slate-900 font-mono">MGP-2026-XXXX</strong>) or registered email address to view live admission updates.
              </p>
            </div>

            <button
              onClick={() => navigate('/apply')}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Start New Application
            </button>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="pt-6"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Tracking ID (MGP-2026-XXXX) or registered email..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-900 text-xs sm:text-sm font-mono tracking-wide"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !searchInput.trim()}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Track Status</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Saved Applications Quick Links */}
          {savedLocalApps.length > 0 && !studentRecord && (
            <div className="mt-6 pt-4 border-t border-sky-100">
              <span className="text-xs font-bold text-slate-600 block mb-2">
                Recent Submissions on this Device:
              </span>
              <div className="flex flex-wrap gap-2">
                {savedLocalApps.map((app: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const id = app.trackingId || app.id;
                      setSearchInput(id);
                      handleLookup(id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-mono font-semibold text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{app.trackingId || app.id}</span>
                    <span className="text-[10px] text-slate-500 font-sans">({app.fullName})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success / Notice */}
          {uploadSuccessNotice && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{uploadSuccessNotice}</span>
            </div>
          )}
        </div>

        {/* Student Record Content */}
        {studentRecord && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-300 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-700">
                    Official Student File
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                    {studentRecord.fullName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                    <span>Tracking ID: <strong className="font-mono text-blue-900">{studentRecord.trackingId || studentRecord.id}</strong></span>
                    <span>•</span>
                    <span>Country: <strong className="text-slate-900">{studentRecord.country}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-600">Current Phase</span>
                  <span className="block text-sm font-black text-blue-950">{studentRecord.status || 'Application Submitted'}</span>
                </div>
              </div>

              {/* Status Timeline Stepper */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                  Admission Journey Milestones
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {statusSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(studentRecord.status);
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isCurrent
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-black ${isCurrent ? 'text-blue-100' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                            0{idx + 1}
                          </span>
                          {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {isCurrent && <Clock className="w-3.5 h-3.5 text-white animate-spin" />}
                        </div>
                        <span className="block text-xs font-bold leading-tight">
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Target Program & Admission Offer Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Program Applied For */}
              <div className="bg-white rounded-3xl p-6 border border-sky-300 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 pb-2 border-b border-sky-100">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Target Academic Program</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">Target Course / Major</span>
                    <span className="text-sm font-bold text-slate-900">{studentRecord.preferredCourse}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">Study Level</span>
                    <span className="font-semibold text-slate-800">{studentRecord.preferredStudyLevel}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">Preferred / Allocated University</span>
                    <span className="font-semibold text-slate-800">{studentRecord.preferredUniversity || 'SRSU / Top Recommended Hub'}</span>
                  </div>
                </div>
              </div>

              {/* Verified Admission Letter / Decision Details */}
              <div className="bg-white rounded-3xl p-6 border border-sky-300 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 pb-2 border-b border-emerald-100">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Official University Decision</span>
                </h4>

                {studentRecord.admissionDetails ? (
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold block">Approved University</span>
                      <span className="text-sm font-black text-emerald-950">{studentRecord.admissionDetails.approvedUniversity}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block">Tuition / Year</span>
                        <span className="font-bold text-slate-900 font-mono">{studentRecord.admissionDetails.tuitionFeeUsd || 'Eligible for Grant'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block">Scholarship</span>
                        <span className="font-bold text-emerald-700">{studentRecord.admissionDetails.scholarshipPercentage || 'Granted'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Intake Session</span>
                      <span className="font-semibold text-slate-800">{studentRecord.admissionDetails.intakeSemester || 'Fall 2026'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center space-y-2">
                    <Clock className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
                    <p className="text-xs text-slate-600 font-medium">
                      Your documents are currently under evaluation with university academic admissions committees.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Document Verification & Upload Tray */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-300 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sky-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-950">
                    Uploaded Documents ({studentRecord.documents?.length || 0})
                  </h4>
                  <p className="text-xs text-slate-500">
                    WAEC/WASSCE transcripts, passport pages, and certification records.
                  </p>
                </div>

                <button
                  onClick={() => setIsUploadTrayOpen(!isUploadTrayOpen)}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploadTrayOpen ? 'Close Upload Tray' : 'Upload More Documents'}</span>
                </button>
              </div>

              {/* Supplementary Document Upload Tray */}
              {isUploadTrayOpen && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-300 space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Document Type</label>
                      <select
                        value={selectedUploadCategory}
                        onChange={e => setSelectedUploadCategory(e.target.value as StudentDocument['category'])}
                        className="w-full p-2.5 rounded-xl bg-white border border-sky-200 text-xs font-medium"
                      >
                        <option value="Academic Transcripts">Academic Transcripts</option>
                        <option value="Academic Certificates">Academic Certificates (WAEC/Diploma)</option>
                        <option value="Passport">Passport Data Page</option>
                        <option value="Other Supporting Documents">Other Supporting Document</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Select File</label>
                      <label className="border-2 border-dashed border-sky-300 hover:border-blue-500 rounded-xl p-3 bg-white flex items-center justify-center gap-2 cursor-pointer transition-all text-xs font-semibold text-blue-800">
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span>Choose File(s) to Upload</span>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handlePendingFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {pendingUploadDocs.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800 block">Pending Queue ({pendingUploadDocs.length}):</span>
                      {pendingUploadDocs.map(doc => (
                        <div key={doc.id} className="p-2 rounded-xl bg-white border border-sky-200 flex items-center justify-between text-xs">
                          <span className="truncate font-medium text-slate-900">{doc.name} ({doc.formattedSize})</span>
                          <button
                            onClick={() => setPendingUploadDocs(prev => prev.filter(d => d.id !== doc.id))}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={handleUploadSupplementaryDocs}
                        disabled={isUploadingLaterDocs}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                      >
                        {isUploadingLaterDocs ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading to Registry...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Confirm & Upload Files to Admissions Team</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {uploadErrorNotice && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      {uploadErrorNotice}
                    </div>
                  )}
                </div>
              )}

              {/* Documents List */}
              {studentRecord.documents && studentRecord.documents.length > 0 ? (
                <div className="space-y-2">
                  {studentRecord.documents.map(doc => (
                    <div key={doc.id} className="p-3 rounded-2xl bg-slate-50 border border-sky-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-bold text-slate-900 truncate">{doc.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-blue-900 text-[10px] font-bold shrink-0">
                          {doc.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {doc.verified ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Under Review</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
                  No documents attached yet. Click "Upload More Documents" to submit your transcripts or passport copy.
                </div>
              )}
            </div>

            {/* Direct WhatsApp Contact Card */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-emerald-950">
                    Have Questions Regarding Your Status?
                  </span>
                  <span className="block text-xs text-emerald-800 font-normal">
                    Chat directly with your assigned admissions counselor on WhatsApp.
                  </span>
                </div>
              </div>

              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Admissions</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default StudentPortalPage;
