import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Mail,
  SendHorizontal,
  Eye,
  Edit3,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Loader2,
  Smartphone,
  Monitor,
  Clock,
  FileText,
  ShieldCheck,
  History,
  Link2
} from 'lucide-react';
import { ApplicationSubmission, CommunicationLog } from '../types';
import {
  buildSupportingDocumentsTemplate,
  renderSupportingDocumentsHtml
} from '../lib/supportingDocumentsEmail';
import { getAccessToken } from '../lib/googleAuth';

interface EmailServiceStatusResponse {
  configured: boolean;
  activeProvider: 'gmail_api' | 'smtp' | 'none';
  gmailOAuth: {
    connected: boolean;
    email: string;
    updatedAt: string | null;
  };
  smtp: {
    configured: boolean;
    host: string | null;
    from: string;
  };
  missingRequirements: string[];
}

interface RequestSupportingDocumentsModalProps {
  isOpen: boolean;
  app: ApplicationSubmission | null;
  onClose: () => void;
  isWorkspaceConnected: boolean;
  isConnectingWorkspace: boolean;
  workspaceEmail: string;
  onConnectWorkspace: () => Promise<void>;
  onSuccess: (updatedApp: ApplicationSubmission, message: string) => void;
  onAttemptLogged: (updatedApp: ApplicationSubmission) => void;
  onErrorNotification: (message: string) => void;
}

export const RequestSupportingDocumentsModal: React.FC<RequestSupportingDocumentsModalProps> = ({
  isOpen,
  app,
  onClose,
  isWorkspaceConnected,
  isConnectingWorkspace,
  workspaceEmail,
  onConnectWorkspace,
  onSuccess,
  onAttemptLogged,
  onErrorNotification
}) => {
  const [activeTab, setActiveTab] = useState<'compose' | 'preview' | 'history'>('compose');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');

  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyText, setBodyText] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [confirmResend, setConfirmResend] = useState(false);
  const [emailServiceStatus, setEmailServiceStatus] = useState<EmailServiceStatusResponse | null>(null);
  const [isCheckingService, setIsCheckingService] = useState(false);

  const [sendFeedback, setSendFeedback] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
    details?: string;
    missingConfig?: string[];
  } | null>(null);

  const [localAppState, setLocalAppState] = useState<ApplicationSubmission | null>(app);
  const submitLockRef = useRef(false);

  // Sync latest app snapshot & reset template whenever a new student application is opened
  useEffect(() => {
    if (isOpen && app) {
      setLocalAppState(app);
      const template = buildSupportingDocumentsTemplate(app);
      setRecipientEmail(template.recipientEmail);
      setSubject(template.subject);
      setBodyText(template.bodyText);
      setConfirmResend(false);
      setSendFeedback(null);
      setActiveTab('compose');
      submitLockRef.current = false;
      fetchEmailServiceStatus();
    }
  }, [isOpen, app?.id, app?.trackingId]);

  // Re-check email service status whenever workspace connection toggles
  useEffect(() => {
    if (isOpen) {
      fetchEmailServiceStatus();
    }
  }, [isWorkspaceConnected, isOpen]);

  const fetchEmailServiceStatus = async () => {
    setIsCheckingService(true);
    try {
      const token = await getAccessToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch('/api/email/status', { headers });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailServiceStatus(data);
      }
    } catch (err) {
      console.warn('Could not fetch email service status:', err);
    } finally {
      setIsCheckingService(false);
    }
  };

  const currentApp = localAppState || app;

  const studentName = currentApp?.fullName || 'Applicant';
  const applicationId = currentApp?.trackingId || currentApp?.id || 'MGP-REF';
  const courseName =
    currentApp?.preferredCourse || currentApp?.preferredStudyLevel || 'your selected program';

  // Filter previous supporting document request email attempts from activity history
  const docRequestLogs: CommunicationLog[] = useMemo(() => {
    if (!currentApp?.communicationLogs) return [];
    return currentApp.communicationLogs.filter(
      (log) =>
        log.type === 'email' &&
        (log.templateType === 'supporting_documents_request' ||
          String(log.subject || '')
            .toLowerCase()
            .includes('submission of supporting documents'))
    );
  }, [currentApp?.communicationLogs]);

  const previousSuccessfulSend = useMemo(() => {
    return docRequestLogs.find((log) => log.deliveryStatus === 'sent' || !log.deliveryStatus);
  }, [docRequestLogs]);

  const alreadyRequested = Boolean(
    previousSuccessfulSend ||
      currentApp?.documentsRequestedAt ||
      currentApp?.status === 'Documents Requested'
  );

  const lastRequestedTimestamp =
    previousSuccessfulSend?.timestamp || currentApp?.documentsRequestedAt || null;

  // Live branded HTML preview reflecting officer edits immediately
  const previewHtml = useMemo(() => {
    return renderSupportingDocumentsHtml({
      studentName,
      applicationId,
      courseName,
      subject,
      bodyText
    });
  }, [studentName, applicationId, courseName, subject, bodyText]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim());
  const isDeliveryConfigured = Boolean(
    isWorkspaceConnected || emailServiceStatus?.configured
  );

  const handleResetTemplate = () => {
    if (!currentApp) return;
    const template = buildSupportingDocumentsTemplate(currentApp);
    setSubject(template.subject);
    setBodyText(template.bodyText);
    setRecipientEmail(template.recipientEmail);
    setSendFeedback(null);
  };

  const handleSendEmail = async () => {
    if (!currentApp) return;
    if (submitLockRef.current || isSending) return;

    if (!isEmailValid) {
      setSendFeedback({
        type: 'error',
        title: 'Invalid Student Email Address',
        message: 'Please provide a valid recipient email address before sending.'
      });
      return;
    }

    if (!subject.trim() || !bodyText.trim()) {
      setSendFeedback({
        type: 'error',
        title: 'Incomplete Email Content',
        message: 'Both the email subject and message body are required.'
      });
      return;
    }

    if (alreadyRequested && !confirmResend) {
      setSendFeedback({
        type: 'error',
        title: 'Duplicate Send Protection',
        message:
          'This student has already received a Supporting Documents Request email. Please tick the confirmation checkbox to send another copy.'
      });
      return;
    }

    submitLockRef.current = true;
    setIsSending(true);
    setSendFeedback(null);

    try {
      const token = await getAccessToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const targetId = currentApp.id || currentApp.trackingId || '';
      const res = await fetch(
        `/api/applications/${encodeURIComponent(targetId)}/request-documents-email`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            application: currentApp,
            recipientEmail: recipientEmail.trim(),
            subject: subject.trim(),
            bodyText: bodyText.trim(),
            author: 'Admissions Committee (Admin Dashboard)',
            allowResend: alreadyRequested ? confirmResend : false
          })
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success && data.delivered) {
        const updatedApp: ApplicationSubmission = data.application || {
          ...currentApp,
          status: 'Documents Requested',
          documentsRequestedAt: new Date().toISOString()
        };

        setLocalAppState(updatedApp);
        setConfirmResend(false);

        const deliveryChannel =
          data.emailResult?.mode === 'gmail_api'
            ? 'Google Workspace Gmail API'
            : 'SMTP Mail Server';

        const successMsg = `Supporting Documents Request email sent to ${recipientEmail.trim()} and status updated to "Documents Requested".`;

        setSendFeedback({
          type: 'success',
          title: 'Email Sent & Status Updated to "Documents Requested"',
          message: successMsg,
          details: `Delivered via ${deliveryChannel}${
            data.emailResult?.messageId ? ` • Message ID: ${data.emailResult.messageId}` : ''
          } • Recorded in student activity history.`
        });

        onSuccess(updatedApp, successMsg);
      } else {
        // Record failed attempt in parent state & Firestore if backend returned updated application logs
        if (data.application) {
          setLocalAppState(data.application);
          onAttemptLogged(data.application);
        }

        const errMsg =
          data.error ||
          'Failed to send the Supporting Documents Request email. Please check your email configuration and try again.';

        setSendFeedback({
          type: 'error',
          title:
            data.code === 'EMAIL_NOT_CONFIGURED'
              ? 'Email Service Not Connected'
              : data.code === 'DUPLICATE_REQUEST' || data.code === 'COOLDOWN_ACTIVE'
              ? 'Duplicate Submission Prevented'
              : 'Email Delivery Failed',
          message: errMsg,
          details:
            data.code === 'EMAIL_NOT_CONFIGURED'
              ? 'Application status was NOT changed. Connect Google Workspace above or configure SMTP to send.'
              : 'This delivery attempt has been recorded in the student activity history. Application status remains unchanged.',
          missingConfig: data.missingConfig
        });

        onErrorNotification(errMsg);
      }
    } catch (err: any) {
      const netErr =
        err?.message || 'Network error while attempting to send email. Please try again.';
      setSendFeedback({
        type: 'error',
        title: 'Connection Error',
        message: netErr
      });
      onErrorNotification(netErr);
    } finally {
      setIsSending(false);
      submitLockRef.current = false;
    }
  };

  if (!isOpen || !currentApp) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-scaleUp">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#0b192c] via-slate-900 to-[#112645] text-white flex items-center justify-between gap-3 border-b-2 border-amber-400 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                  Application Received – Supporting Documents Request
                </h3>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Official Myers Global Pathways Admissions Email &bull; Auto-updates status to{' '}
                <span className="text-amber-300 font-bold">Documents Requested</span> on send
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-left flex-1">
          {/* Student Auto-Populated Summary Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Student Name
              </span>
              <span className="font-bold text-slate-950 truncate block mt-0.5">{studentName}</span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Application Ref
              </span>
              <span className="font-mono font-bold text-blue-700 truncate block mt-0.5">
                {applicationId}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Selected Course
              </span>
              <span className="font-semibold text-slate-900 truncate block mt-0.5" title={courseName}>
                {courseName}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Current Status
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-100 text-blue-900 border border-blue-200 mt-0.5 truncate max-w-full">
                {currentApp.status || 'Application Received'}
              </span>
            </div>
          </div>

          {/* Email Delivery Service Status Banner */}
          {isCheckingService && !emailServiceStatus ? (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Checking Myers Global Pathways email service connection...</span>
            </div>
          ) : isDeliveryConfigured ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Email Service Active:</strong> Ready to send via{' '}
                  {emailServiceStatus?.activeProvider === 'smtp' && !isWorkspaceConnected
                    ? `SMTP (${emailServiceStatus.smtp.host})`
                    : `Google Workspace Gmail API (${workspaceEmail || 'admissions@myersglobalpathways.com'})`}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-200 text-emerald-900">
                Connected
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-950">
                      Email Service Requires Connection Before Sending
                    </p>
                    <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed">
                      Connect your official Google Workspace account (<strong>admissions@myersglobalpathways.com</strong>) to send directly via Gmail API, or configure server SMTP variables (<code className="font-mono bg-amber-100 px-1 rounded">SMTP_HOST</code>, <code className="font-mono bg-amber-100 px-1 rounded">SMTP_USER</code>, <code className="font-mono bg-amber-100 px-1 rounded">SMTP_PASS</code>).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onConnectWorkspace}
                  disabled={isConnectingWorkspace}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 disabled:opacity-60"
                >
                  {isConnectingWorkspace ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Link2 className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>Connect Google Workspace</span>
                </button>
              </div>
            </div>
          )}

          {/* Duplicate Prevention Guard Banner */}
          {alreadyRequested && (
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs space-y-2">
              <div className="flex items-start gap-2 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold">
                    Duplicate Email Protection Active
                  </p>
                  <p className="text-[11px] text-amber-900 mt-0.5">
                    {lastRequestedTimestamp
                      ? `A Supporting Documents Request email was already sent to this student on ${new Date(lastRequestedTimestamp).toLocaleString()}.`
                      : 'This application already has status "Documents Requested".'}{' '}
                    To prevent accidental duplicate emails, please confirm below if you intentionally want to send another copy.
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-2 pt-1 pl-6 font-bold text-amber-950 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmResend}
                  onChange={(e) => setConfirmResend(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <span>I confirm I want to re-send this Supporting Documents Request email</span>
              </label>
            </div>
          )}

          {/* Inline Success / Failure Notification */}
          {sendFeedback && (
            <div
              className={`p-3.5 rounded-2xl border text-xs space-y-1.5 animate-fadeIn ${
                sendFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-2">
                {sendFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-extrabold">{sendFeedback.title}</p>
                  <p className="leading-relaxed">{sendFeedback.message}</p>
                  {sendFeedback.details && (
                    <p className="text-[11px] opacity-85">{sendFeedback.details}</p>
                  )}
                  {sendFeedback.missingConfig && sendFeedback.missingConfig.length > 0 && (
                    <ul className="list-disc pl-4 text-[11px] pt-1 space-y-0.5">
                      {sendFeedback.missingConfig.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation: Compose / Branded HTML Preview / Delivery History */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('compose')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'compose'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Edit &amp; Compose</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Branded Email Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <History className="w-3.5 h-3.5 text-slate-600" />
                <span>Activity Log ({docRequestLogs.length})</span>
              </button>
            </div>

            {activeTab === 'compose' && (
              <button
                type="button"
                onClick={handleResetTemplate}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                title="Restore default Myers Global Pathways template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Official Template</span>
              </button>
            )}

            {activeTab === 'preview' && (
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewViewport('desktop')}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer ${
                    previewViewport === 'desktop'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewViewport('mobile')}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer ${
                    previewViewport === 'mobile'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: COMPOSE & EDIT */}
          {activeTab === 'compose' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    To (Registered Student Email)
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="student@example.com"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border focus:outline-none focus:ring-2 text-slate-900 font-semibold ${
                      isEmailValid
                        ? 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                        : 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    From (Admissions Desk)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Myers Global Pathways <admissions@myersglobalpathways.com>"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-100 border border-slate-200 text-slate-600 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-950 font-bold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Email Body (Pre-filled &amp; Editable)
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Edits automatically update the branded HTML email
                  </span>
                </div>
                <textarea
                  rows={13}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full p-3.5 rounded-2xl text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 leading-relaxed font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 2: BRANDED HTML PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500 font-semibold">Subject: </span>
                  <strong className="text-slate-950">{subject}</strong>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  To: {recipientEmail || 'No email'}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-200/80 border border-slate-300 p-3 sm:p-4 flex justify-center overflow-hidden">
                <iframe
                  title="Branded Supporting Documents Email Preview"
                  srcDoc={previewHtml}
                  sandbox=""
                  className={`bg-white rounded-xl shadow-md border border-slate-200 transition-all duration-200 ${
                    previewViewport === 'mobile' ? 'w-[375px] h-[520px]' : 'w-full h-[520px]'
                  }`}
                />
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITY LOG / DELIVERY HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-2.5">
              {docRequestLogs.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                  <Mail className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">
                    No Supporting Documents Request emails sent yet
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Every send attempt (successful or failed) for this student will be logged here with timestamp and delivery status.
                  </p>
                </div>
              ) : (
                docRequestLogs.map((log) => {
                  const isFailed = log.deliveryStatus === 'failed';
                  return (
                    <div
                      key={log.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                        isFailed
                          ? 'bg-rose-50/70 border-rose-200'
                          : 'bg-emerald-50/60 border-emerald-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              isFailed
                                ? 'bg-rose-200 text-rose-900'
                                : 'bg-emerald-200 text-emerald-900'
                            }`}
                          >
                            {isFailed ? 'Failed Attempt' : 'Sent Successfully'}
                          </span>
                          <span className="font-mono text-[11px] text-slate-700 font-semibold">
                            To: {log.recipient}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {log.subject && (
                        <p className="font-bold text-slate-900">{log.subject}</p>
                      )}
                      <p className="text-[11px] text-slate-600">
                        <strong>Officer / Channel:</strong> {log.sentBy}
                        {log.messageId ? ` • Message ID: ${log.messageId}` : ''}
                      </p>
                      {log.error && (
                        <p className="text-[11px] text-rose-800 bg-white/80 p-2 rounded-lg border border-rose-200">
                          <strong>Error:</strong> {log.error}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Automated Workflow Status Notice */}
          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-blue-950 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <strong>Status Workflow:</strong> When this email is successfully sent, the application status will update to{' '}
              <strong>Documents Requested</strong> and the delivery record will be saved to the student&apos;s activity history. Documents will <em>not</em> be marked as received or submitted to the University automatically.
            </span>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {activeTab === 'compose' && (
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Preview Email</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSendEmail}
              disabled={
                isSending ||
                !isEmailValid ||
                !subject.trim() ||
                !bodyText.trim() ||
                (alreadyRequested && !confirmResend)
              }
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Email...</span>
                </>
              ) : (
                <>
                  <SendHorizontal className="w-4 h-4" />
                  <span>{alreadyRequested ? 'Re-send Email' : 'Send Email'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
