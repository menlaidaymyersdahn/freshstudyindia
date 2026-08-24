import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  GraduationCap, 
  RefreshCw, 
  ChevronRight, 
  ExternalLink, 
  Trash2, 
  Plus, 
  Building2, 
  UserCheck, 
  FileCheck2, 
  Eye, 
  Sparkles,
  ArrowDownToLine,
  Calendar,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { ApplicationStatus, StudentApplicationProfile, ApplicationDocument, CounselorNote } from '../types';
import { getWhatsAppLink } from '../lib/constants';
import { BrandEmblem } from './BrandLogo';

interface AdmissionsPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionsPortal: React.FC<AdmissionsPortalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Dashboard Data State
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [countryFilter, setCountryFilter] = useState<string>('ALL');

  // Selected Application Dossier Modal
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<StudentApplicationProfile | null>(null);
  const [isLoadingDossier, setIsLoadingDossier] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [previewDocUrl, setPreviewDocUrl] = useState<{ url: string; name: string; type: string } | null>(null);

  // Check saved session auth
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('fsi_admissions_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch applications when authenticated and modal is open
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchApplications();
    }
  }, [isOpen, isAuthenticated, statusFilter, countryFilter]);

  // Real-time listener for new registrations across modals or tabs
  useEffect(() => {
    const handleNewSubmission = () => {
      fetchApplications();
    };
    window.addEventListener('fresh_application_submitted', handleNewSubmission);
    window.addEventListener('storage', handleNewSubmission);
    return () => {
      window.removeEventListener('fresh_application_submitted', handleNewSubmission);
      window.removeEventListener('storage', handleNewSubmission);
    };
  }, [statusFilter, countryFilter]);

  // Fetch single dossier when selectedAppId changes
  useEffect(() => {
    if (selectedAppId) {
      fetchApplicationDossier(selectedAppId);
    } else {
      setSelectedApp(null);
    }
  }, [selectedAppId]);

  // Default sample applicants seed if local database is newly initialized
  const getInitialSeedApplications = (): StudentApplicationProfile[] => [
    {
      id: 'app_myers_2026',
      trackingId: 'IND-2026-LR-8924',
      fullName: 'Myers Dahn',
      phone: '+231889425645',
      email: 'myers.dahn@freshstudyindia.com',
      country: 'Liberia',
      studyField: 'B.Sc Microbiology',
      qualification: 'High School Diploma / WAEC Senior Certificate',
      status: 'DOCUMENTS_VERIFIED',
      submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date().toISOString(),
      documents: [
        {
          id: 'doc_passport_01',
          name: 'Liberia_Passport_Myers_Dahn.pdf',
          size: 1450200,
          formattedSize: '1.45 MB',
          type: 'application/pdf',
          category: 'Passport',
          uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          verified: true
        },
        {
          id: 'doc_waec_02',
          name: 'WAEC_Senior_Secondary_Certificate.pdf',
          size: 2100400,
          formattedSize: '2.10 MB',
          type: 'application/pdf',
          category: 'Academic Certificate',
          uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          verified: true
        },
        {
          id: 'doc_photo_03',
          name: 'Myers_Graduation_Portrait.jpeg',
          size: 3200100,
          formattedSize: '3.20 MB',
          type: 'image/jpeg',
          category: 'Passport-size Photo',
          uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          dataUrl: '/DSC_9531.jpeg',
          verified: true
        }
      ],
      notes: [
        {
          id: 'note_01',
          text: 'Verified WAEC certificate grades. University offer letter processed for Shri Rawatpura Sarkar University.',
          author: 'Admissions Officer (India Desk)',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ]
    },
    {
      id: 'app_kofi_2026',
      trackingId: 'IND-2026-GH-5120',
      fullName: 'Kofi Mensah',
      phone: '+233241234567',
      email: 'kofi.mensah@gmail.com',
      country: 'Ghana',
      studyField: 'B.Tech Computer Science & AI',
      qualification: 'WASSCE Certificate',
      status: 'UNDER_REVIEW',
      submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date().toISOString(),
      documents: [
        {
          id: 'doc_wassce_gh',
          name: 'WASSCE_Official_Transcript_Kofi.pdf',
          size: 1840000,
          formattedSize: '1.84 MB',
          type: 'application/pdf',
          category: 'Academic Transcript',
          uploadedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          verified: false
        }
      ],
      notes: [
        {
          id: 'note_02',
          text: 'Student inquired regarding Bengaluru campus accommodation and scholarship slabs.',
          author: 'West Africa Counselor',
          createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
        }
      ]
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    const inputKey = passcode.trim().toLowerCase();
    const validPasskeys = ['fresh2026', 'admissions2026', 'myers2026', 'fsi2026', 'freshindia', 'freshstudy2026'];

    // 1. Try server backend authentication if available
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          sessionStorage.setItem('fsi_admissions_auth', 'true');
          setPasscode('');
          setIsAuthenticating(false);
          return;
        }
      }
    } catch {
      // Backend not running on static hosts like Vercel - proceed with client authorization
    }

    // 2. Validate client-side passkey (supports fresh2026, admissions2026, myers2026, Fresh2026!)
    if (validPasskeys.includes(inputKey) || passcode.trim() === 'Fresh2026!') {
      setIsAuthenticated(true);
      sessionStorage.setItem('fsi_admissions_auth', 'true');
      setPasscode('');
      setIsAuthenticating(false);
    } else {
      setAuthError('Invalid passkey. Please enter your authorized staff credentials.');
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('fsi_admissions_auth');
  };

  const getStoredApplications = (): StudentApplicationProfile[] => {
    try {
      const stored = localStorage.getItem('fresh_study_submitted_applications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    const seed = getInitialSeedApplications();
    try {
      localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(seed));
    } catch {
      // ignore
    }
    return seed;
  };

  const fetchApplications = async () => {
    setIsLoading(true);
    let serverApps: any[] = [];

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (countryFilter !== 'ALL') params.append('country', countryFilter);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/applications?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.applications)) {
          serverApps = data.applications;
        }
      }
    } catch {
      // server offline / static host
    }

    // Always retrieve local storage records
    const localApps = getStoredApplications();
    const combinedMap = new Map<string, any>();

    // 1. Put server apps first
    for (const app of serverApps) {
      combinedMap.set(app.id, {
        id: app.id,
        trackingId: app.trackingId || `IND-2026-${app.id.slice(-4).toUpperCase()}`,
        fullName: app.fullName,
        phone: app.phone,
        email: app.email,
        country: app.country,
        studyField: app.studyField,
        qualification: app.qualification,
        status: app.status || 'NEW',
        documentsCount: app.documentsCount ?? (app.documents?.length || 0),
        submittedAt: app.submittedAt || new Date().toISOString()
      });
    }

    // 2. Put local apps (any new student registration from browser storage will be included/updated)
    for (const a of localApps) {
      combinedMap.set(a.id, {
        id: a.id,
        trackingId: a.trackingId || `IND-2026-${a.id.slice(-4).toUpperCase()}`,
        fullName: a.fullName,
        phone: a.phone,
        email: a.email,
        country: a.country,
        studyField: a.studyField,
        qualification: a.qualification,
        status: a.status || 'NEW',
        documentsCount: (a as any).documentsCount ?? (a.documents?.length || 0),
        submittedAt: a.submittedAt || new Date().toISOString()
      });
    }

    let combinedList = Array.from(combinedMap.values());

    // Apply Filter by status
    if (statusFilter !== 'ALL') {
      combinedList = combinedList.filter(a => a.status === statusFilter);
    }
    // Apply Filter by country
    if (countryFilter !== 'ALL') {
      combinedList = combinedList.filter(a => a.country && a.country.toLowerCase() === countryFilter.toLowerCase());
    }
    // Apply Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      combinedList = combinedList.filter(a => 
        (a.fullName && a.fullName.toLowerCase().includes(q)) ||
        (a.trackingId && a.trackingId.toLowerCase().includes(q)) ||
        (a.phone && a.phone.toLowerCase().includes(q)) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        (a.studyField && a.studyField.toLowerCase().includes(q))
      );
    }

    // Sort newest submissions first
    combinedList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    setApplications(combinedList);
    setIsLoading(false);
  };

  const fetchApplicationDossier = async (id: string) => {
    setIsLoadingDossier(true);
    let dossier: StudentApplicationProfile | null = null;

    try {
      const res = await fetch(`/api/applications/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.application) {
          dossier = data.application;
        }
      }
    } catch {
      // server offline / static host
    }

    if (!dossier) {
      const allLocal = getStoredApplications();
      const match = allLocal.find(a => a.id === id);
      if (match) {
        dossier = {
          ...match,
          trackingId: match.trackingId || `IND-2026-${match.id.slice(-4).toUpperCase()}`,
          status: match.status || 'NEW',
          documents: match.documents || [],
          notes: match.notes || []
        };
      }
    }

    setSelectedApp(dossier);
    setIsLoadingDossier(false);
  };

  const handleUpdateStatus = async (newStatus: ApplicationStatus) => {
    if (!selectedApp) return;

    // 1. Try server update
    try {
      await fetch(`/api/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          noteText: `Admissions status marked as "${newStatus.replace('_', ' ')}"`
        })
      });
    } catch {
      // server offline
    }

    // 2. Resilient local update
    const updatedNotes: CounselorNote[] = [
      ...(selectedApp.notes || []),
      {
        id: `note_${Date.now()}`,
        text: `Admissions status marked as "${newStatus.replace('_', ' ')}"`,
        author: 'Admissions Officer',
        createdAt: new Date().toISOString()
      }
    ];

    const updatedApp: StudentApplicationProfile = {
      ...selectedApp,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      notes: updatedNotes
    };

    setSelectedApp(updatedApp);

    try {
      const allLocal = getStoredApplications();
      const index = allLocal.findIndex(a => a.id === selectedApp.id);
      if (index !== -1) {
        allLocal[index] = updatedApp;
      } else {
        allLocal.unshift(updatedApp);
      }
      localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(allLocal));
    } catch {
      // ignore
    }

    fetchApplications();
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !newNoteText.trim()) return;
    setIsAddingNote(true);

    const notePayload: CounselorNote = {
      id: `note_${Date.now()}`,
      text: newNoteText.trim(),
      author: 'Admissions Officer',
      createdAt: new Date().toISOString()
    };

    // 1. Try server update
    try {
      await fetch(`/api/applications/${selectedApp.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newNoteText.trim(),
          author: 'Admissions Officer'
        })
      });
    } catch {
      // server offline
    }

    // 2. Resilient local update
    const updatedNotes = [...(selectedApp.notes || []), notePayload];
    const updatedApp: StudentApplicationProfile = {
      ...selectedApp,
      notes: updatedNotes
    };

    setSelectedApp(updatedApp);
    setNewNoteText('');

    try {
      const allLocal = getStoredApplications();
      const index = allLocal.findIndex(a => a.id === selectedApp.id);
      if (index !== -1) {
        allLocal[index] = updatedApp;
        localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(allLocal));
      }
    } catch {
      // ignore
    }

    setIsAddingNote(false);
    fetchApplications();
  };

  const handleToggleDocVerification = async (docId: string, currentVerified: boolean) => {
    if (!selectedApp) return;

    // 1. Try server update
    try {
      await fetch(`/api/applications/${selectedApp.id}/documents/${docId}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !currentVerified })
      });
    } catch {
      // server offline
    }

    // 2. Resilient local update
    const updatedDocs = (selectedApp.documents || []).map(d => 
      d.id === docId ? { ...d, verified: !currentVerified } : d
    );

    const updatedApp: StudentApplicationProfile = {
      ...selectedApp,
      documents: updatedDocs
    };

    setSelectedApp(updatedApp);

    try {
      const allLocal = getStoredApplications();
      const index = allLocal.findIndex(a => a.id === selectedApp.id);
      if (index !== -1) {
        allLocal[index] = updatedApp;
        localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(allLocal));
      }
    } catch {
      // ignore
    }

    fetchApplications();
  };

  const handleDeleteApplication = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the application for ${name}?`)) return;

    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    } catch {
      // server offline
    }

    try {
      const allLocal = getStoredApplications().filter(a => a.id !== id);
      localStorage.setItem('fresh_study_submitted_applications', JSON.stringify(allLocal));
    } catch {
      // ignore
    }

    if (selectedAppId === id) {
      setSelectedAppId(null);
    }
    fetchApplications();
  };

  const handleDownloadDoc = (doc: ApplicationDocument) => {
    if (doc.dataUrl) {
      const link = document.createElement('a');
      link.href = doc.dataUrl;
      link.download = doc.name || 'student_document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const customDownloadUrl = (doc as any).downloadUrl;
    if (customDownloadUrl) {
      window.open(customDownloadUrl, '_blank');
      return;
    }

    // Direct blob download
    const blob = new Blob([
      `Myers Global Pathway Document Vault\n\n` +
      `Applicant: ${selectedApp?.fullName || 'Student'}\n` +
      `Tracking Ref: ${selectedApp?.trackingId || 'N/A'}\n` +
      `Document Name: ${doc.name}\n` +
      `Category: ${doc.category}\n` +
      `Size: ${doc.formattedSize || 'Unknown'}\n` +
      `Verification Status: ${doc.verified ? 'Verified ✓' : 'Pending Verification'}\n` +
      `Uploaded: ${doc.uploadedAt || new Date().toISOString()}`
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name || 'student_document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (applications.length === 0) return;
    const headers = ['Tracking ID', 'Full Name', 'Phone', 'Email', 'Country', 'Study Field', 'Qualification', 'Status', 'Docs Count', 'Submission Date'];
    const rows = applications.map(a => [
      `"${a.trackingId || a.id}"`,
      `"${a.fullName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.country}"`,
      `"${a.studyField}"`,
      `"${a.qualification}"`,
      `"${a.status}"`,
      a.documentsCount || 0,
      `"${new Date(a.submittedAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MyersGlobalPathway_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const statusColors: Record<ApplicationStatus | string, { bg: string; text: string; border: string }> = {
    NEW: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
    UNDER_REVIEW: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    DOCUMENTS_VERIFIED: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    OFFER_ISSUED: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
    VISA_PROCESSING: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    ADMITTED: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' },
    REJECTED: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
  };

  // Metrics Calculation
  const totalApps = applications.length;
  const newAppsCount = applications.filter(a => a.status === 'NEW').length;
  const verifiedCount = applications.filter(a => a.status === 'DOCUMENTS_VERIFIED' || a.status === 'OFFER_ISSUED' || a.status === 'ADMITTED').length;
  const totalDocsCount = applications.reduce((sum, a) => sum + (a.documentsCount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Main Window */}
      <div className="relative bg-slate-900 text-white rounded-3xl w-full max-w-7xl h-[94vh] shadow-2xl border border-slate-800 z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Navigation Bar */}
        <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shadow-xs">
              <BrandEmblem className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">
                  Myers Global Pathways Admissions Portal
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Live Vault
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Centralized Student Database & Document Verification Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <button
                  onClick={fetchApplications}
                  title="Refresh student applications list"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Log Out
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Counselors Passcode Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/40">
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center mx-auto shadow-inner">
                <BrandEmblem className="w-14 h-14" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Admissions Staff Access
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your admissions counselor passkey to access student profiles, download passports, and review academic transcripts.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Counselor Passkey
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter staff passkey"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-sm text-white font-mono placeholder:text-slate-600 transition"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white bg-sky-600 hover:bg-sky-500 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAuthenticating ? 'Authorizing Access...' : 'Unlock Admissions Portal'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admissions Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/30">
            
            {/* 1. Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 border-b border-slate-800/80 shrink-0 bg-slate-900/40">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Applications</p>
                  <p className="text-xl font-black text-white">{totalApps}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">New / Pending</p>
                  <p className="text-xl font-black text-amber-400">{newAppsCount}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified / In Process</p>
                  <p className="text-xl font-black text-emerald-400">{verifiedCount}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <ArrowDownToLine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Documents in Vault</p>
                  <p className="text-xl font-black text-indigo-400">{totalDocsCount}</p>
                </div>
              </div>
            </div>

            {/* 2. Controls & Search Bar */}
            <div className="p-4 sm:px-6 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0 bg-slate-900/60">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by student name, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-500 outline-none text-xs text-white placeholder:text-slate-500"
                />
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 outline-none focus:border-sky-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New Applications</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="DOCUMENTS_VERIFIED">Documents Verified</option>
                  <option value="OFFER_ISSUED">Offer Issued</option>
                  <option value="VISA_PROCESSING">Visa Processing</option>
                  <option value="ADMITTED">Admitted</option>
                </select>

                {/* Country Filter */}
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 outline-none focus:border-sky-500"
                >
                  <option value="ALL">All Countries</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={fetchApplications}
                  title="Refresh applications list"
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
                </button>

                {/* Export CSV */}
                <button
                  onClick={exportToCSV}
                  disabled={applications.length === 0}
                  className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* 3. Applications Table / List View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <RefreshCw className="w-8 h-8 animate-spin text-sky-500" />
                  <p className="text-xs font-semibold">Loading verified student submissions...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400 bg-slate-900/30 rounded-3xl border border-slate-800/80 p-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-300">No applications found</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      {searchQuery || statusFilter !== 'ALL' || countryFilter !== 'ALL'
                        ? 'Try clearing your search filters to see all student applications.'
                        : 'Submit a student profile using the application modal to test live cloud persistence.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      {/* Left: Student Basic Info */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-black text-sm">
                          {app.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-white group-hover:text-sky-300 transition truncate">
                              {app.fullName}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {app.trackingId || app.id}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                            <span className="text-slate-200 font-medium">{app.studyField}</span>
                            <span>•</span>
                            <span className="text-slate-300">📍 {app.country}</span>
                            <span>•</span>
                            <span>{app.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Document Attachments Pill */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                          <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>{app.documentsCount || 0} Attached Document{(app.documentsCount === 1) ? '' : 's'}</span>
                        </div>

                        {/* Status Tag */}
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide border ${statusColors[app.status]?.bg || 'bg-slate-800'} ${statusColors[app.status]?.text || 'text-slate-200'} ${statusColors[app.status]?.border || 'border-slate-700'}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAppId(app.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>Review Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteApplication(app.id, app.fullName);
                          }}
                          title="Delete application record"
                          className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* 4. APPLICATION DOSSIER SLIDEOVER / MODAL */}
        {selectedAppId && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-md flex items-center justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl overflow-hidden">
              
              {/* Dossier Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      Ref: {selectedApp?.trackingId || selectedApp?.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      Submitted: {selectedApp ? new Date(selectedApp.submittedAt).toLocaleDateString() : '...'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight mt-1">
                    {selectedApp?.fullName || 'Application Dossier'}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedAppId(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dossier Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isLoadingDossier || !selectedApp ? (
                  <div className="h-64 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-sky-500" />
                  </div>
                ) : (
                  <>
                    {/* Student Info Card */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-sky-400" />
                        <span>Academic Profile & Contact</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-slate-500">Target Major:</p>
                          <p className="font-bold text-white mt-0.5">{selectedApp.studyField}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Country of Origin:</p>
                          <p className="font-bold text-white mt-0.5">🇱🇷 {selectedApp.country}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Education Level:</p>
                          <p className="font-bold text-white mt-0.5">{selectedApp.qualification}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Email Address:</p>
                          <p className="font-bold text-white mt-0.5 truncate">{selectedApp.email || 'Not provided'}</p>
                        </div>
                      </div>

                      {/* Direct WhatsApp Action */}
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-mono">{selectedApp.phone}</span>
                        <a
                          href={getWhatsAppLink('india', `Hello ${selectedApp.fullName}, this is the Admissions Committee from Myers Global Pathway regarding your application (${selectedApp.studyField}, Ref: ${selectedApp.trackingId || selectedApp.id}).`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Applicant</span>
                        </a>
                      </div>
                    </div>

                    {/* Status Management */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>Admission Progress Status</span>
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {(['NEW', 'UNDER_REVIEW', 'DOCUMENTS_VERIFIED', 'OFFER_ISSUED', 'VISA_PROCESSING', 'ADMITTED'] as ApplicationStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide transition cursor-pointer border ${
                              selectedApp.status === st
                                ? 'bg-sky-600 text-white border-sky-500 shadow-md'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                            }`}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Uploaded Documents Vault */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-emerald-400" />
                          <span>Document Vault ({selectedApp.documents?.length || 0})</span>
                        </h4>
                        <span className="text-[11px] text-slate-500">Stored Permanently</span>
                      </div>

                      {(!selectedApp.documents || selectedApp.documents.length === 0) ? (
                        <p className="text-xs text-slate-500 italic py-2">No documents attached with this submission.</p>
                      ) : (
                        <div className="space-y-2.5">
                          {selectedApp.documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">{doc.name}</p>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                    <span className="text-sky-400 font-bold uppercase">{doc.category}</span>
                                    <span>•</span>
                                    <span className="font-mono">{doc.formattedSize || `${Math.round(doc.size / 1024)} KB`}</span>
                                    {doc.verified && (
                                      <>
                                        <span>•</span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                          <CheckCircle2 className="w-3 h-3" /> Verified
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {/* Verify Toggle */}
                                <button
                                  onClick={() => handleToggleDocVerification(doc.id, Boolean(doc.verified))}
                                  title={doc.verified ? "Mark as unverified" : "Mark as verified"}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                                    doc.verified
                                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                  }`}
                                >
                                  {doc.verified ? 'Verified ✓' : 'Verify'}
                                </button>

                                {/* Direct Download Stream */}
                                <button
                                  type="button"
                                  onClick={() => handleDownloadDoc(doc)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition cursor-pointer"
                                  title={`Download ${doc.name}`}
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Counselor Internal Notes & Activity Log */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Counselor Activity Notes & Log
                      </h4>

                      {/* Add Note Form */}
                      <form onSubmit={handleAddNote} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add internal counselor note (e.g. WAEC transcript verified)..."
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 outline-none focus:border-sky-500"
                        />
                        <button
                          type="submit"
                          disabled={isAddingNote || !newNoteText.trim()}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase transition disabled:opacity-40 shrink-0 cursor-pointer"
                        >
                          {isAddingNote ? 'Saving...' : 'Add Note'}
                        </button>
                      </form>

                      {/* Notes History */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {(selectedApp.notes || []).map((note) => (
                          <div key={note.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-850 text-xs space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span className="font-bold text-sky-400">{note.author}</span>
                              <span>{new Date(note.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
