import React, { useState, useEffect } from 'react';
import { ApplicationStatus, ApplicationSubmission, EnquirySubmission, StudentDocument, CommunicationLog, AdmissionDetails } from '../types';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { 
  X, 
  Search, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Loader2, 
  Eye, 
  RefreshCw,
  MessageSquare,
  Sparkles,
  Mail,
  Phone,
  Download,
  Check,
  Award,
  ExternalLink,
  Send,
  Printer,
  ChevronRight,
  Globe,
  HelpCircle,
  Building2,
  Calendar,
  DollarSign,
  Trash2,
  CheckSquare,
  Square,
  MinusSquare,
  AlertTriangle,
  Layers,
  Filter,
  CheckCheck,
  UserPlus,
  Zap,
  Copy,
  Share2,
  Bell
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyModal?: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenApplyModal
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Admin View Tab: 'applications' | 'enquiries' | 'approvals'
  const [adminTab, setAdminTab] = useState<'applications' | 'enquiries' | 'approvals'>('applications');

  // Applications State
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Bulk Selection State
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [selectedEnquiryIds, setSelectedEnquiryIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkApproving, setIsBulkApproving] = useState(false);
  const [isBulkUpdatingStatus, setIsBulkUpdatingStatus] = useState(false);
  const [bulkApproveModalOpen, setBulkApproveModalOpen] = useState(false);
  const [bulkDeleteConfirmModalOpen, setBulkDeleteConfirmModalOpen] = useState(false);
  const [bulkDeleteTargetType, setBulkDeleteTargetType] = useState<'applications' | 'enquiries'>('applications');
  const [singleDeleteConfirmId, setSingleDeleteConfirmId] = useState<{ id: string; name: string; type: 'app' | 'enquiry' } | null>(null);
  const [isSingleDeleting, setIsSingleDeleting] = useState(false);

  // Bulk Approve Form State
  const [bulkUniversity, setBulkUniversity] = useState('SRM Institute of Science & Technology / Anna University');
  const [bulkScholarship, setBulkScholarship] = useState('20% Global Excellence Merit Waiver');
  const [bulkTuitionUsd, setBulkTuitionUsd] = useState('2,800');
  const [bulkIntakeSemester, setBulkIntakeSemester] = useState('Fall Intake 2026');
  const [bulkCounselorNotes, setBulkCounselorNotes] = useState('Batch approval granted after academic credential verification.');

  // Active Selected Application Dossier
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedAppDossier, setSelectedAppDossier] = useState<ApplicationSubmission | null>(null);

  // Internal Notes State
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Modals inside Admin
  // 1. WhatsApp Launcher Modal
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [whatsappTemplate, setWhatsappTemplate] = useState('offer');
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState('');
  const [isLoggingWhatsApp, setIsLoggingWhatsApp] = useState(false);

  // 2. Email Composer Modal
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isLoggingEmail, setIsLoggingEmail] = useState(false);

  // 3. Document Preview Modal
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);

  // 4. Application Approval Modal
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approvedUniversity, setApprovedUniversity] = useState('');
  const [approvedProgram, setApprovedProgram] = useState('');
  const [tuitionFeeUsd, setTuitionFeeUsd] = useState('2,800');
  const [scholarshipPercentage, setScholarshipPercentage] = useState('20% Global Excellence Merit Waiver');
  const [intakeSemester, setIntakeSemester] = useState('Fall Intake 2026');
  const [counselorRemarks, setCounselorRemarks] = useState('Applicant credentials verified and meeting university admission criteria.');
  const [isApproving, setIsApproving] = useState(false);
  const [autoTriggerOnApprove, setAutoTriggerOnApprove] = useState(true);

  // 5. Automated Student Notification Trigger Modal (Email / WhatsApp Dispatcher)
  const [instantNotifyModal, setInstantNotifyModal] = useState<{
    open: boolean;
    app: ApplicationSubmission;
    admissionInfo?: {
      approvedUniversity: string;
      approvedProgram: string;
      tuitionFeeUsd: string;
      scholarshipPercentage: string;
      intakeSemester: string;
      offerLetterId?: string;
    };
    channelTab: 'whatsapp' | 'email' | 'both';
    whatsappText: string;
    emailSubjectText: string;
    emailBodyText: string;
  } | null>(null);
  const [isTriggeringNotification, setIsTriggeringNotification] = useState(false);
  const [copiedChannel, setCopiedChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [autoLogCommunication, setAutoLogCommunication] = useState(true);

  // Success Feedback Banner
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const statusOptions: ApplicationStatus[] = [
    'Application Submitted',
    'Documents Review',
    'University Review',
    'Admission Decision',
    'Visa Preparation',
    'Ready for India'
  ];

  const universitySuggestions = [
    'SRM Institute of Science & Technology, Chennai / Delhi NCR',
    'Anna University Affiliated Institutions, Tamil Nadu',
    'Manipal Academy of Higher Education (MAHE), Karnataka',
    'Vellore Institute of Technology (VIT), Vellore / Chennai',
    'Amity University, Noida / Delhi NCR',
    'Chandigarh University, Punjab',
    'Symbiosis International University, Pune',
    'JSS Academy of Higher Education & Research, Mysuru',
    'Osmania University Affiliated Colleges, Hyderabad',
    'Bangalore University Affiliated Health & Tech Institutes'
  ];

  // Auto-fetch data on open or authentication
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchApplications();
      fetchEnquiries();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 4500);
  };

  // Handle Passcode Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchApplications();
        fetchEnquiries();
      } else {
        setAuthError(data.error || 'Invalid admissions passkey. (Use: myers2026)');
      }
    } catch (err) {
      if (passcode.trim() === 'myers2026' || passcode.trim() === 'admissions2026') {
        setIsAuthenticated(true);
        fetchApplications();
        fetchEnquiries();
      } else {
        setAuthError('Authentication service unreachable. Check passkey.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Quick Demo Login for instant testing
  const handleQuickUnlock = () => {
    setPasscode('myers2026');
    setIsAuthenticated(true);
    fetchApplications();
    fetchEnquiries();
  };

  // Fetch real applications from API
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (res.ok && data.success) {
        setApplications(data.applications || []);
        // Refresh active dossier if one is open
        if (selectedAppId) {
          const updated = (data.applications || []).find((a: any) => a.id === selectedAppId);
          if (updated) {
            openDossier(selectedAppId);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch enquiries
  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    }
  };

  // Fetch single application details
  const openDossier = async (id: string) => {
    setSelectedAppId(id);
    try {
      const res = await fetch(`/api/applications/${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedAppDossier(data.application);
      }
    } catch (err) {
      console.error('Error loading application dossier:', err);
    }
  };

  // Update Application Status
  const handleStatusChange = async (newStatus: string) => {
    if (!selectedAppId) return;

    try {
      const res = await fetch(`/api/applications/${selectedAppId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          noteText: `Application status updated to "${newStatus}" by Admissions Officer.`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedApp = data.application;
        setSelectedAppDossier(updatedApp);
        fetchApplications();
        showNotification(`Status updated to "${newStatus}"`);

        // Automated Trigger: If status is set to 'Admission Decision' or 'Ready for India', auto-trigger notification modal
        if (newStatus === 'Admission Decision' || newStatus === 'Ready for India') {
          handleOpenInstantNotificationTrigger(updatedApp);
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // Toggle Document Verification
  const handleToggleDocVerification = async (docId: string, currentStatus: boolean) => {
    if (!selectedAppId) return;

    try {
      const res = await fetch(`/api/applications/${selectedAppId}/documents/${docId}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !currentStatus })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (selectedAppDossier) {
          const updatedDocs = (selectedAppDossier.documents || []).map(doc => 
            doc.id === docId ? { ...doc, verified: !currentStatus } : doc
          );
          setSelectedAppDossier({ ...selectedAppDossier, documents: updatedDocs });
        }
        showNotification(`Document ${!currentStatus ? 'Verified' : 'Unverified'}`);
      }
    } catch (err) {
      console.error('Document verification toggle failed:', err);
    }
  };

  // Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await fetch(`/api/applications/${selectedAppId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNoteText.trim(), author: 'Menlaiday Myers (Counselor)' })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewNoteText('');
        if (selectedAppDossier) {
          setSelectedAppDossier({
            ...selectedAppDossier,
            notes: data.notes
          });
        }
        showNotification('Counselor review note saved.');
      }
    } catch (err) {
      console.error('Note creation failed:', err);
    } finally {
      setIsAddingNote(false);
    }
  };

  // Open WhatsApp Composer
  const handleOpenWhatsApp = (app: ApplicationSubmission) => {
    setSelectedAppDossier(app);
    setSelectedAppId(app.id || null);
    
    // Default message template
    const cleanPhone = (app.whatsapp || '').replace(/[^0-9+]/g, '');
    const templateMsg = `Hello ${app.fullName}, greetings from Myers Global Pathways admissions desk. Regarding your university application (${app.trackingId}) for ${app.preferredCourse || 'your program'} in India: We are pleased to assist you with the next stage of your admission. Please let us know if you have any questions!`;
    setCustomWhatsAppMsg(templateMsg);
    setWhatsappModalOpen(true);
  };

  // Change WhatsApp Template
  const handleSelectWhatsAppTemplate = (type: string) => {
    setWhatsappTemplate(type);
    if (!selectedAppDossier) return;
    const name = selectedAppDossier.fullName;
    const ref = selectedAppDossier.trackingId;
    const course = selectedAppDossier.preferredCourse || 'Degree Program';

    if (type === 'offer') {
      setCustomWhatsAppMsg(`🎉 Congratulations ${name}! Myers Global Pathways has approved your university application (${ref}) for ${course} in India. Your official Provisional Letter of Admission has been generated. Please contact us to receive your visa preparation checklist.`);
    } else if (type === 'documents') {
      setCustomWhatsAppMsg(`Hello ${name}, this is the Admissions Desk at Myers Global Pathways. Regarding your application (${ref}), we require a clear copy of your passport/transcripts to finalize university submission. Please reply to this WhatsApp message with your files.`);
    } else if (type === 'visa') {
      setCustomWhatsAppMsg(`Hello ${name}, great news! Your admission documents are ready for your Indian Student Visa application. Our team is preparing your Bonafide Admission Letter and Embassy Appointment packet.`);
    } else {
      setCustomWhatsAppMsg(`Hello ${name}, greetings from Myers Global Pathways. We are following up regarding your study in India application (${ref}). How can we assist you today?`);
    }
  };

  // Send & Log WhatsApp
  const handleSendWhatsApp = async () => {
    if (!selectedAppDossier) return;
    const rawPhone = selectedAppDossier.whatsapp || '';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

    setIsLoggingWhatsApp(true);
    try {
      // Log to server communication history
      await fetch(`/api/applications/${selectedAppDossier.id}/communication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp',
          recipient: rawPhone,
          message: customWhatsAppMsg,
          sentBy: 'Admissions Desk WhatsApp'
        })
      });

      // Launch WhatsApp Web / Mobile app link
      const waUrl = cleanPhone 
        ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWhatsAppMsg)}`
        : `https://wa.me/?text=${encodeURIComponent(customWhatsAppMsg)}`;
      
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setWhatsappModalOpen(false);
      showNotification(`WhatsApp message launched and logged for ${selectedAppDossier.fullName}.`);
      openDossier(selectedAppDossier.id!);
      fetchApplications();
    } catch (err) {
      console.error('Error logging WhatsApp:', err);
    } finally {
      setIsLoggingWhatsApp(false);
    }
  };

  // Open Email Composer
  const handleOpenEmail = (app: ApplicationSubmission) => {
    setSelectedAppDossier(app);
    setSelectedAppId(app.id || null);

    setEmailSubject(`Myers Global Pathways: Update on Application [${app.trackingId}] - ${app.fullName}`);
    setEmailBody(`Dear ${app.fullName},

Greetings from the Admissions Desk at Myers Global Pathways.

We are writing to provide an official update on your application (Reference: ${app.trackingId}) for ${app.preferredCourse || 'your academic program'} in India.

Our admissions team and partner university faculty in India have completed the preliminary evaluation of your submitted documents. 

Next Steps:
1. Please confirm your passport validity and contact details.
2. Our counselors in Monrovia and India are standing by to guide you through tuition settlement, scholarship verification, and student visa processing.

If you have any questions or require immediate assistance, please reply directly to this email or reach us on WhatsApp at +231 889425645.

Warm regards,

Admissions Committee
Myers Global Pathways
Email: admissions@myersglobalpathways.com
Web: https://myersglobalpathways.com`);

    setEmailModalOpen(true);
  };

  // Send & Log Email
  const handleSendEmail = async () => {
    if (!selectedAppDossier) return;

    setIsLoggingEmail(true);
    try {
      await fetch(`/api/applications/${selectedAppDossier.id}/communication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email',
          recipient: selectedAppDossier.email,
          subject: emailSubject,
          message: emailBody,
          sentBy: 'admissions@myersglobalpathways.com'
        })
      });

      // Launch default mailto client
      const mailtoUrl = `mailto:${selectedAppDossier.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;

      setEmailModalOpen(false);
      showNotification(`Email communication logged for ${selectedAppDossier.fullName}.`);
      openDossier(selectedAppDossier.id!);
      fetchApplications();
    } catch (err) {
      console.error('Error logging email:', err);
    } finally {
      setIsLoggingEmail(false);
    }
  };

  // Build admission approval WhatsApp & Email templates
  const buildAdmissionNotificationTemplates = (
    app: ApplicationSubmission,
    admissionInfo?: {
      approvedUniversity?: string;
      approvedProgram?: string;
      tuitionFeeUsd?: string;
      scholarshipPercentage?: string;
      intakeSemester?: string;
      offerLetterId?: string;
    }
  ) => {
    const name = app.fullName || 'Student';
    const trackingId = app.trackingId || 'MGP-OFFICIAL';
    const university = admissionInfo?.approvedUniversity || app.admissionDetails?.approvedUniversity || app.preferredUniversity || 'SRM Institute of Science & Technology / Anna University';
    const program = admissionInfo?.approvedProgram || app.admissionDetails?.approvedProgram || app.preferredCourse || app.preferredStudyLevel || 'Degree Program';
    const tuition = admissionInfo?.tuitionFeeUsd || app.admissionDetails?.tuitionFeeUsd || '2,800';
    const scholarship = admissionInfo?.scholarshipPercentage || app.admissionDetails?.scholarshipPercentage || '20% Global Excellence Merit Waiver';
    const intake = admissionInfo?.intakeSemester || app.admissionDetails?.intakeSemester || 'Fall Intake 2026';

    const waText = `🎉 CONGRATULATIONS ${name}! 🎓\n\nWe are delighted to inform you that your university application (${trackingId}) for higher education in India has been officially APPROVED by Myers Global Pathways!\n\n📋 OFFICIAL ADMISSION DECISION SUMMARY:\n• Institution: ${university}\n• Degree Program: ${program}\n• Merit Scholarship: ${scholarship}\n• Estimated Annual Tuition: $${tuition} USD/year\n• Target Intake: ${intake}\n\n📄 Your Official Provisional Letter of Admission has been generated and filed in our admissions portal.\n\n🚀 IMMEDIATE NEXT STEPS FOR YOUR INDIAN STUDENT VISA:\n1. Confirm your acceptance of this provisional admission offer.\n2. Our admissions office in Monrovia & India will issue your Bonafide Certificate for Visa.\n3. We will guide you through your Indian Embassy biometric filing and pre-departure arrival checklist.\n\nPlease reply directly to this WhatsApp message to connect with your designated admissions advisor!\n\nAdmissions Committee | Myers Global Pathways\nMonrovia WhatsApp: +231 889425645\nIndia Office: +91 9444147777\nPortal: https://myersglobalpathways.com`;

    const emailSub = `🎉 Official Admission Decision: Admission Offer for ${name} (Ref: ${trackingId}) - ${program} in India`;

    const emailBody = `Dear ${name},

Congratulations! We are pleased to formally inform you that following academic evaluation by our Admissions Board, your application for higher education in India has been officially APPROVED.

==================================================
OFFICIAL PROVISIONAL ADMISSION DECISION
==================================================
• Applicant Name: ${name}
• Application Reference: ${trackingId}
• Admitted Institution: ${university}
• Admitted Academic Program: ${program}
• Merit Scholarship Award: ${scholarship}
• Annual Subsidized Tuition: $${tuition} USD / Year
• Target Intake: ${intake}
==================================================

Your official Provisional Letter of Admission has been registered in the Myers Global Pathways admissions database.

NEXT STEPS FOR YOUR INDIAN STUDENT VISA & ENROLLMENT:
1. Acceptance Confirmation: Reply directly to this email to confirm your acceptance of this admission seat.
2. Bonafide Letter & Visa Application: Our liaison team in India will issue your institutional Bonafide Certificate required for the Indian Student Visa (e-FRRO / Embassy filing).
3. Pre-Departure & Hostel Arrangement: We will guide you through airport reception, campus accommodation reservation, and foreign student registration (FRRO).

If you have any questions or require immediate counselor assistance, please contact us:
• Monrovia Office WhatsApp: +231 889425645
• India Admissions Office: +91 9444147777
• Email: admissions@myersglobalpathways.com

Congratulations once again on taking this decisive step toward your global academic future in India!

Warm regards,

Admissions Committee & Academic Placement Board
Myers Global Pathways
Email: admissions@myersglobalpathways.com
Website: https://myersglobalpathways.com`;

    return { waText, emailSub, emailBody, university, program, tuition, scholarship, intake };
  };

  // Open Automated Instant Notification Trigger Modal
  const handleOpenInstantNotificationTrigger = (
    app: ApplicationSubmission, 
    admissionInfo?: {
      approvedUniversity?: string;
      approvedProgram?: string;
      tuitionFeeUsd?: string;
      scholarshipPercentage?: string;
      intakeSemester?: string;
      offerLetterId?: string;
    },
    defaultChannel: 'whatsapp' | 'email' | 'both' = 'whatsapp'
  ) => {
    const templates = buildAdmissionNotificationTemplates(app, admissionInfo);
    setInstantNotifyModal({
      open: true,
      app,
      admissionInfo: {
        approvedUniversity: templates.university,
        approvedProgram: templates.program,
        tuitionFeeUsd: templates.tuition,
        scholarshipPercentage: templates.scholarship,
        intakeSemester: templates.intake,
        offerLetterId: admissionInfo?.offerLetterId || app.admissionDetails?.offerLetterId
      },
      channelTab: defaultChannel,
      whatsappText: templates.waText,
      emailSubjectText: templates.emailSub,
      emailBodyText: templates.emailBody
    });
  };

  // Dispatch Instant WhatsApp Notification
  const handleDispatchWhatsAppNotification = async () => {
    if (!instantNotifyModal) return;
    const { app, whatsappText } = instantNotifyModal;
    const rawPhone = app.whatsapp || '';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

    setIsTriggeringNotification(true);
    try {
      if (autoLogCommunication && app.id) {
        await fetch(`/api/applications/${app.id}/communication`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'whatsapp',
            recipient: rawPhone || 'Applicant WhatsApp',
            message: whatsappText,
            sentBy: 'Automated Approval Notification (WhatsApp)'
          })
        });
      }

      // Launch WhatsApp Web / Mobile URL
      const waUrl = cleanPhone 
        ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`
        : `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
      
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      showNotification(`🚀 Instant WhatsApp notification dispatched for ${app.fullName}!`);
      
      if (app.id) {
        openDossier(app.id);
        fetchApplications();
      }
    } catch (err) {
      console.error('Error dispatching WhatsApp notification:', err);
    } finally {
      setIsTriggeringNotification(false);
    }
  };

  // Dispatch Instant Email Notification
  const handleDispatchEmailNotification = async () => {
    if (!instantNotifyModal) return;
    const { app, emailSubjectText, emailBodyText } = instantNotifyModal;

    setIsTriggeringNotification(true);
    try {
      if (autoLogCommunication && app.id) {
        await fetch(`/api/applications/${app.id}/communication`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'email',
            recipient: app.email,
            subject: emailSubjectText,
            message: emailBodyText,
            sentBy: 'Automated Approval Notification (Email)'
          })
        });
      }

      // Launch Default Mail Client
      const mailtoUrl = `mailto:${app.email}?subject=${encodeURIComponent(emailSubjectText)}&body=${encodeURIComponent(emailBodyText)}`;
      window.location.href = mailtoUrl;

      showNotification(`✉️ Instant Email admission notification launched for ${app.fullName}!`);
      
      if (app.id) {
        openDossier(app.id);
        fetchApplications();
      }
    } catch (err) {
      console.error('Error dispatching email notification:', err);
    } finally {
      setIsTriggeringNotification(false);
    }
  };

  // Dispatch Dual Notification (WhatsApp + Email)
  const handleDispatchDualNotification = async () => {
    await handleDispatchWhatsAppNotification();
    setTimeout(() => {
      handleDispatchEmailNotification();
    }, 800);
  };

  // Copy Notification Content
  const handleCopyNotificationContent = (channel: 'whatsapp' | 'email') => {
    if (!instantNotifyModal) return;
    const textToCopy = channel === 'whatsapp' 
      ? instantNotifyModal.whatsappText 
      : `${instantNotifyModal.emailSubjectText}\n\n${instantNotifyModal.emailBodyText}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedChannel(channel);
    showNotification(`📋 ${channel === 'whatsapp' ? 'WhatsApp' : 'Email'} notification copied to clipboard!`);
    setTimeout(() => {
      setCopiedChannel(null);
    }, 3000);
  };

  // Open Application Approval Modal
  const handleOpenApproveModal = (app: ApplicationSubmission) => {
    setSelectedAppDossier(app);
    setSelectedAppId(app.id || null);
    setApprovedUniversity(app.preferredUniversity || 'SRM Institute of Science & Technology, Chennai / Delhi NCR');
    setApprovedProgram(app.preferredCourse || 'B.Tech in Artificial Intelligence & Computer Science');
    setTuitionFeeUsd(app.preferredStudyLevel === 'Postgraduate' ? '3,400' : '2,800');
    setScholarshipPercentage('20% Global Excellence Merit Waiver');
    setIntakeSemester('Fall Intake 2026');
    setCounselorRemarks(`Approved by Admissions Board. Academic qualifications and prerequisite coursework meet direct entry standards.`);
    setApproveModalOpen(true);
  };

  // Submit Official Application Approval
  const handleConfirmApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppDossier) return;

    setIsApproving(true);
    try {
      const res = await fetch(`/api/applications/${selectedAppDossier.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approvedUniversity,
          approvedProgram,
          tuitionFeeUsd,
          scholarshipPercentage,
          intakeSemester,
          counselorNotes: counselorRemarks,
          author: 'Menlaiday Myers (Executive Director)'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setApproveModalOpen(false);
        const updatedApp = data.application || {
          ...selectedAppDossier,
          status: 'Admission Decision',
          admissionDetails: {
            approvedUniversity,
            approvedProgram,
            tuitionFeeUsd,
            scholarshipPercentage,
            intakeSemester,
            offerLetterIssued: true
          }
        };

        showNotification(`🎉 Application for ${selectedAppDossier.fullName} successfully APPROVED! Offer Letter generated.`);
        setSelectedAppDossier(updatedApp);
        openDossier(selectedAppDossier.id!);
        fetchApplications();

        // Automated Instant Notification Trigger: Prompt or open immediately
        if (autoTriggerOnApprove) {
          handleOpenInstantNotificationTrigger(updatedApp, {
            approvedUniversity,
            approvedProgram,
            tuitionFeeUsd,
            scholarshipPercentage,
            intakeSemester
          }, 'whatsapp');
        }
      }
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setIsApproving(false);
    }
  };

  // =========================================================================
  // BULK CHECKBOX SELECTION & ACTION HANDLERS
  // =========================================================================

  // Toggle single application checkbox
  const handleToggleSelectApp = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedAppIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle select all visible filtered applications
  const handleToggleSelectAllApps = () => {
    const validFilteredIds = filteredApps.map(a => a.id).filter(Boolean) as string[];
    if (validFilteredIds.length === 0) return;

    const allSelected = validFilteredIds.every(id => selectedAppIds.includes(id));
    if (allSelected) {
      // Unselect only the filtered ones
      setSelectedAppIds(prev => prev.filter(id => !validFilteredIds.includes(id)));
    } else {
      // Select all filtered ones
      setSelectedAppIds(prev => Array.from(new Set([...prev, ...validFilteredIds])));
    }
  };

  // Toggle single enquiry checkbox
  const handleToggleSelectEnquiry = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedEnquiryIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle select all visible filtered enquiries
  const handleToggleSelectAllEnquiries = () => {
    const validFilteredIds = filteredEnquiries.map(enq => enq.id).filter(Boolean) as string[];
    if (validFilteredIds.length === 0) return;

    const allSelected = validFilteredIds.every(id => selectedEnquiryIds.includes(id));
    if (allSelected) {
      setSelectedEnquiryIds(prev => prev.filter(id => !validFilteredIds.includes(id)));
    } else {
      setSelectedEnquiryIds(prev => Array.from(new Set([...prev, ...validFilteredIds])));
    }
  };

  // Deselect all items in current view
  const handleDeselectAll = () => {
    setSelectedAppIds([]);
    setSelectedEnquiryIds([]);
  };

  // Open Bulk Approve Dialog
  const handleOpenBulkApprove = () => {
    if (selectedAppIds.length === 0) return;
    setBulkApproveModalOpen(true);
  };

  // Submit Bulk Approval for Selected Applications
  const handleBulkApproveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAppIds.length === 0) return;

    setIsBulkApproving(true);
    try {
      const res = await fetch('/api/applications/bulk-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedAppIds,
          approvedUniversity: bulkUniversity,
          scholarshipPercentage: bulkScholarship,
          tuitionFeeUsd: bulkTuitionUsd,
          intakeSemester: bulkIntakeSemester,
          counselorNotes: bulkCounselorNotes,
          author: 'Menlaiday Myers (Admissions Director)'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBulkApproveModalOpen(false);
        showNotification(`🎉 ${data.message || `Approved ${selectedAppIds.length} application(s)`}`);
        setSelectedAppIds([]);
        fetchApplications();
        if (selectedAppId) {
          openDossier(selectedAppId);
        }
      } else {
        alert(data.error || 'Failed to complete bulk approval');
      }
    } catch (err: any) {
      console.error('Bulk approve error:', err);
      alert('Error connecting to server for bulk approval.');
    } finally {
      setIsBulkApproving(false);
    }
  };

  // Bulk Status Update Handler
  const handleBulkStatusChange = async (targetStatus: ApplicationStatus) => {
    if (selectedAppIds.length === 0 || !targetStatus) return;

    setIsBulkUpdatingStatus(true);
    try {
      const res = await fetch('/api/applications/bulk-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedAppIds,
          status: targetStatus,
          author: 'Menlaiday Myers (Admissions Desk)'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(`Updated status to "${targetStatus}" for ${data.updatedCount} applications.`);
        setSelectedAppIds([]);
        fetchApplications();
        if (selectedAppId) {
          openDossier(selectedAppId);
        }
      } else {
        alert(data.error || 'Failed to update status in bulk');
      }
    } catch (err) {
      console.error('Bulk status update error:', err);
    } finally {
      setIsBulkUpdatingStatus(false);
    }
  };

  // Open Bulk Delete Confirmation
  const handleOpenBulkDeleteConfirm = (target: 'applications' | 'enquiries') => {
    setBulkDeleteTargetType(target);
    setBulkDeleteConfirmModalOpen(true);
  };

  // Confirm and Execute Bulk Delete
  const handleBulkDeleteSubmit = async () => {
    setIsBulkDeleting(true);
    try {
      if (bulkDeleteTargetType === 'applications') {
        const res = await fetch('/api/applications/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedAppIds })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          showNotification(`🗑️ Deleted ${data.deletedCount} student application(s).`);
          if (selectedAppId && selectedAppIds.includes(selectedAppId)) {
            setSelectedAppId(null);
            setSelectedAppDossier(null);
          }
          setSelectedAppIds([]);
          fetchApplications();
        } else {
          alert(data.error || 'Failed to delete applications');
        }
      } else {
        const res = await fetch('/api/enquiries/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedEnquiryIds })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          showNotification(`🗑️ Deleted ${data.deletedCount} enquiry lead(s).`);
          setSelectedEnquiryIds([]);
          fetchEnquiries();
        } else {
          alert(data.error || 'Failed to delete enquiries');
        }
      }
    } catch (err) {
      console.error('Bulk delete failed:', err);
    } finally {
      setIsBulkDeleting(false);
      setBulkDeleteConfirmModalOpen(false);
    }
  };

  // Single Item Delete Confirmation Prompt
  const handlePromptSingleDelete = (id: string, name: string, type: 'app' | 'enquiry', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSingleDeleteConfirmId({ id, name, type });
  };

  // Execute Single Delete
  const handleExecuteSingleDelete = async () => {
    if (!singleDeleteConfirmId) return;
    setIsSingleDeleting(true);

    try {
      if (singleDeleteConfirmId.type === 'app') {
        const res = await fetch(`/api/applications/${singleDeleteConfirmId.id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showNotification(`Application for ${singleDeleteConfirmId.name} deleted.`);
          if (selectedAppId === singleDeleteConfirmId.id) {
            setSelectedAppId(null);
            setSelectedAppDossier(null);
          }
          setSelectedAppIds(prev => prev.filter(i => i !== singleDeleteConfirmId.id));
          fetchApplications();
        }
      } else {
        const res = await fetch(`/api/enquiries/${singleDeleteConfirmId.id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showNotification(`Enquiry from ${singleDeleteConfirmId.name} deleted.`);
          setSelectedEnquiryIds(prev => prev.filter(i => i !== singleDeleteConfirmId.id));
          fetchEnquiries();
        }
      }
    } catch (err) {
      console.error('Single delete failed:', err);
    } finally {
      setIsSingleDeleting(false);
      setSingleDeleteConfirmId(null);
    }
  };

  // Clear all data (applications or enquiries)
  const handleClearAllData = async (target: 'applications' | 'enquiries' | 'all') => {
    const confirmMessage = target === 'all' 
      ? 'Are you sure you want to completely clear ALL student applications and inquiries from the admin board? This cannot be undone.'
      : `Are you sure you want to clear all ${target}? This cannot be undone.`;

    if (!window.confirm(confirmMessage)) return;

    try {
      const res = await fetch('/api/admin/clear-all-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(data.message || 'Data cleared successfully.');
        setSelectedAppIds([]);
        setSelectedEnquiryIds([]);
        setSelectedAppId(null);
        setSelectedAppDossier(null);
        fetchApplications();
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Error clearing data:', err);
    }
  };

  // Filtered applications list
  const filteredApps = applications.filter(app => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      app.fullName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.trackingId?.toLowerCase().includes(q) ||
      app.country?.toLowerCase().includes(q) ||
      app.whatsapp?.toLowerCase().includes(q) ||
      app.preferredCourse?.toLowerCase().includes(q) ||
      app.preferredUniversity?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Filtered enquiries list
  const filteredEnquiries = enquiries.filter(enq => {
    const q = searchQuery.toLowerCase().trim();
    return !q ||
      enq.fullName?.toLowerCase().includes(q) ||
      enq.email?.toLowerCase().includes(q) ||
      enq.country?.toLowerCase().includes(q) ||
      enq.preferredCourse?.toLowerCase().includes(q) ||
      enq.message?.toLowerCase().includes(q);
  });

  // Export Data to CSV
  const handleExportCSV = () => {
    const headers = ['Tracking ID', 'Full Name', 'Email', 'WhatsApp', 'Country', 'Study Level', 'Course', 'Status', 'Submitted At'];
    const rows = applications.map(a => [
      `"${a.trackingId || ''}"`,
      `"${a.fullName || ''}"`,
      `"${a.email || ''}"`,
      `"${a.whatsapp || ''}"`,
      `"${a.country || ''}"`,
      `"${a.preferredStudyLevel || ''}"`,
      `"${a.preferredCourse || ''}"`,
      `"${a.status || ''}"`,
      `"${a.submittedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Myers_Global_Pathways_Student_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Applications exported to CSV successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#F8FAFC] rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden my-auto text-left">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-[#07132B] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {COMPANY.name}
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Admissions Officer Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                International Applicant Dossiers, Direct WhatsApp & Email Desks, Document Vault & Approvals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleExportCSV}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="Export database to CSV"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Success Alert Notification */}
        {actionSuccessMsg && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-200 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-900 bg-slate-50/50">
          
          {!isAuthenticated ? (
            /* ========================================================================= */
            /* 1. PASSKEY AUTHENTICATION GATE */
            /* ========================================================================= */
            <div className="max-w-md mx-auto py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-950 tracking-tight">Admissions Staff Access</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Enter your counselor passkey to review international student credentials, contact students via WhatsApp and email, and grant admission approvals.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter counselor passkey (e.g. myers2026)"
                    className="w-full px-4 py-3.5 rounded-xl text-sm bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-slate-900 text-center font-mono tracking-widest shadow-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Authorized counselor passkey: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-bold font-mono">myers2026</code>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAuthenticating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-slate-950" />
                        <span>Unlock Admin Portal</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickUnlock}
                    className="py-3 px-4 rounded-xl text-xs font-bold text-blue-800 bg-white hover:bg-blue-50 border border-blue-200 shadow-xs transition-colors cursor-pointer"
                  >
                    1-Click Fast Unlock
                  </button>
                </div>
              </form>

              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-left text-xs text-blue-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Admissions Officer Privileges</p>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Access includes full student identity dossiers, WAEC/Degree transcripts, 1-click WhatsApp messaging, direct email dispatch, document downloads, and official provisional admission letters.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* 2. AUTHENTICATED ADMIN DASHBOARD */
            /* ========================================================================= */
            <div className="space-y-6">
              
              {/* Navigation Sub-Tabs & Database Stats Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                {/* View Switcher Tabs */}
                <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                  <button
                    onClick={() => { setAdminTab('applications'); setSelectedAppDossier(null); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      adminTab === 'applications'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>All Student Applications</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      adminTab === 'applications' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {applications.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setAdminTab('enquiries'); setSelectedAppDossier(null); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      adminTab === 'enquiries'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Website Leads & Inquiries</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      adminTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {enquiries.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setAdminTab('approvals'); setSelectedAppDossier(null); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      adminTab === 'approvals'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Approved Admissions</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      adminTab === 'approvals' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {applications.filter(a => a.status === 'Admission Decision' || a.status === 'Ready for India' || a.admissionDetails?.offerLetterIssued).length}
                    </span>
                  </button>
                </div>

                {/* Real-time Quick Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                  <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-500 block">Total Students</span>
                    <span className="text-base font-extrabold text-slate-950 font-mono">{applications.length}</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-amber-800 block">Reviewing</span>
                    <span className="text-base font-extrabold text-amber-900 font-mono">
                      {applications.filter(a => a.status === 'Documents Review' || a.status === 'University Review').length}
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-emerald-800 block">Approved</span>
                    <span className="text-base font-extrabold text-emerald-900 font-mono">
                      {applications.filter(a => a.status === 'Admission Decision' || a.status === 'Ready for India').length}
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-indigo-50/80 border border-indigo-200 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-indigo-800 block">Visa Stage</span>
                    <span className="text-base font-extrabold text-indigo-900 font-mono">
                      {applications.filter(a => a.status === 'Visa Preparation').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={adminTab === 'enquiries' ? "Search inquiries by student, course, email..." : "Search applicant name, ref, email, phone, country..."}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 shadow-2xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {adminTab === 'applications' && (
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs bg-white border border-slate-200 text-slate-900 focus:outline-none cursor-pointer shadow-2xs font-medium"
                    >
                      <option value="ALL">All Application Statuses ({applications.length})</option>
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={() => { fetchApplications(); fetchEnquiries(); }}
                    className="p-2 rounded-xl text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    title="Refresh database records"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>

              {/* ===================================================================== */}
              {/* TAB 1: ALL STUDENT APPLICATIONS */}
              {/* ===================================================================== */}
              {adminTab === 'applications' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Column: Applications Master List */}
                  <div className={`space-y-2.5 ${selectedAppDossier ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                    
                    {/* Master Checkbox & Bulk Actions Toolbar */}
                    {filteredApps.length > 0 && (
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5 transition-all">
                        {/* Select All Checkbox & Count */}
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={handleToggleSelectAllApps}
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                              filteredApps.length > 0 && filteredApps.every(a => selectedAppIds.includes(a.id!))
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : selectedAppIds.some(id => filteredApps.some(a => a.id === id))
                                ? 'bg-blue-100 border-blue-500 text-blue-800'
                                : 'bg-white border-slate-300 hover:border-blue-400'
                            }`}
                            title="Select / Deselect all visible applications"
                          >
                            {filteredApps.length > 0 && filteredApps.every(a => selectedAppIds.includes(a.id!)) ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : selectedAppIds.some(id => filteredApps.some(a => a.id === id)) ? (
                              <div className="w-2.5 h-0.5 bg-blue-700 rounded-full" />
                            ) : null}
                          </button>
                          
                          <span className="text-xs font-bold text-slate-700">
                            {selectedAppIds.length > 0 ? (
                              <span className="text-blue-700 font-extrabold">{selectedAppIds.length} of {filteredApps.length} selected</span>
                            ) : (
                              <span>Select All ({filteredApps.length})</span>
                            )}
                          </span>
                        </div>

                        {/* Bulk Action Controls Trigger Bar */}
                        {selectedAppIds.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-1.5 animate-fadeIn">
                            {/* Bulk Approve */}
                            <button
                              type="button"
                              onClick={handleOpenBulkApprove}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 border border-amber-500/40 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                              title="Approve all selected student applications"
                            >
                              <Award className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Bulk Approve ({selectedAppIds.length})</span>
                            </button>

                            {/* Bulk Status Dropdown */}
                            <div className="relative inline-block">
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleBulkStatusChange(e.target.value as ApplicationStatus);
                                    e.target.value = '';
                                  }
                                }}
                                defaultValue=""
                                disabled={isBulkUpdatingStatus}
                                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
                                title="Change status for selected applications"
                              >
                                <option value="" disabled>Set Status ({selectedAppIds.length})...</option>
                                {statusOptions.map(st => (
                                  <option key={st} value={st}>Move to: {st}</option>
                                ))}
                              </select>
                            </div>

                            {/* Bulk Delete */}
                            <button
                              type="button"
                              onClick={() => handleOpenBulkDeleteConfirm('applications')}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                              title="Delete selected applications"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                              <span>Delete ({selectedAppIds.length})</span>
                            </button>

                            {/* Deselect All */}
                            <button
                              type="button"
                              onClick={handleDeselectAll}
                              className="px-2 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                            <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span>Check boxes to perform bulk approve, status updates, or delete</span>
                          </div>
                        )}
                      </div>
                    )}

                    {filteredApps.length === 0 ? (
                      <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
                          <FileText className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900">Admin Board Ready (0 Fake Data)</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                            {searchQuery 
                              ? 'No applications match your current search criteria or status filter.' 
                              : 'All mock and demo data has been cleaned up. Real student applications submitted through the website portal will appear here in real-time.'}
                          </p>
                        </div>
                        {onOpenApplyModal && (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => { onClose(); onOpenApplyModal(); }}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>Submit a Test Student Application</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                        {filteredApps.map((app) => {
                          const isSelected = selectedAppId === app.id;
                          const isChecked = selectedAppIds.includes(app.id!);
                          const docsCount = app.documents?.length || app.documentsCount || 0;
                          const isApproved = app.status === 'Admission Decision' || app.status === 'Ready for India' || app.admissionDetails?.offerLetterIssued;

                          return (
                            <div
                              key={app.id}
                              className={`p-4 rounded-2xl border transition-all text-left relative ${
                                isChecked
                                  ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-300 shadow-xs'
                                  : isSelected
                                  ? 'bg-slate-50 border-blue-500 shadow-md ring-1 ring-blue-400'
                                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-xs'
                              }`}
                            >
                              {/* Top Bar of Student Card */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  {/* Checkbox */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleToggleSelectApp(app.id!, e)}
                                    className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                                      isChecked
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-white border-slate-300 hover:border-blue-500'
                                    }`}
                                    aria-label={`Select ${app.fullName}`}
                                  >
                                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </button>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                                        {app.trackingId}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-semibold">
                                        {app.country}
                                      </span>
                                    </div>
                                    <h4 className="text-base font-extrabold text-slate-950 mt-1">
                                      {app.fullName}
                                    </h4>
                                  </div>
                                </div>

                                <div className="text-right flex items-center gap-2">
                                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-block ${
                                    isApproved 
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      : app.status === 'Documents Review'
                                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                      : app.status === 'Visa Preparation'
                                      ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                                  }`}>
                                    {app.status}
                                  </span>
                                </div>
                              </div>

                              {/* Student Details Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100">
                                <p className="truncate">
                                  <strong className="text-slate-800">Target:</strong> {app.preferredCourse || app.preferredStudyLevel}
                                </p>
                                <p className="truncate">
                                  <strong className="text-slate-800">Institution:</strong> {app.preferredUniversity || 'Indian University'}
                                </p>
                                <p className="truncate text-slate-600">
                                  <strong className="text-slate-800">Email:</strong> {app.email}
                                </p>
                                <p className="truncate text-slate-600">
                                  <strong className="text-slate-800">WhatsApp:</strong> {app.whatsapp || 'Registered'}
                                </p>
                              </div>

                              {/* Document & Quick Communication Bar */}
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                                    <span>{docsCount} document(s)</span>
                                  </span>
                                  {isApproved && (
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                                      <Award className="w-3 h-3 text-emerald-600" />
                                      <span>Offer Issued</span>
                                    </span>
                                  )}
                                </div>

                                {/* Direct Action Buttons */}
                                <div className="flex items-center gap-1.5">
                                  {/* Direct WhatsApp Contact Button */}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenWhatsApp(app); }}
                                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                    title="Contact student via WhatsApp"
                                  >
                                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                  </button>

                                  {/* Direct Email Contact Button */}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenEmail(app); }}
                                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                    title="Send official email to student"
                                  >
                                    <Mail className="w-3.5 h-3.5 text-blue-700" />
                                    <span className="hidden sm:inline">Email</span>
                                  </button>

                                  {/* One-Click Approve Button (If not already approved) */}
                                  {!isApproved ? (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleOpenApproveModal(app); }}
                                      className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                      title="Approve student application and issue offer"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      <span className="hidden sm:inline">Approve</span>
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleOpenInstantNotificationTrigger(app); }}
                                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs animate-pulse"
                                        title="Trigger automated WhatsApp/Email notification for approved student"
                                      >
                                        <Zap className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                                        <span className="hidden sm:inline">Notify</span>
                                      </button>
                                      <a
                                        href={`/api/applications/${app.id}/offer-letter`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1.5 sm:px-2 sm:py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                                        title="Print or view offer letter"
                                      >
                                        <Printer className="w-3 h-3" />
                                        <span className="hidden sm:inline">Offer</span>
                                      </a>
                                    </>
                                  )}

                                  {/* Single Delete Button */}
                                  <button
                                    onClick={(e) => handlePromptSingleDelete(app.id!, app.fullName, 'app', e)}
                                    className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                                    title="Delete this application"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* View Full Dossier Button */}
                                  <button
                                    onClick={() => openDossier(app.id!)}
                                    className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{isSelected ? 'Viewing' : 'Dossier'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Full Student Application Dossier Review */}
                  {selectedAppDossier && (
                    <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-white border border-slate-300 text-left space-y-5 shadow-lg">
                      
                      {/* Dossier Header */}
                      <div className="flex items-start justify-between border-b border-slate-200 pb-3.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                              {selectedAppDossier.trackingId}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              Applied: {new Date(selectedAppDossier.submittedAt || '').toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-slate-950 mt-1">
                            {selectedAppDossier.fullName}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedAppDossier(null)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            title="Close dossier view"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Automated Notification Hub Banner (When application is approved / admission decision) */}
                      {(selectedAppDossier.status === 'Admission Decision' || selectedAppDossier.status === 'Ready for India' || selectedAppDossier.admissionDetails) && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                              <Zap className="w-5 h-5 fill-slate-950" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-950">
                                  Automated Student Notification Trigger Hub
                                </h4>
                                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                                  Approved
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                Official Admission Offer issued for <strong>{selectedAppDossier.admissionDetails?.approvedUniversity || selectedAppDossier.preferredUniversity || 'Indian University'}</strong>. Instantly trigger custom WhatsApp and Email acceptance notices.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenInstantNotificationTrigger(selectedAppDossier, undefined, 'whatsapp')}
                              className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Instantly notify student via WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-950" />
                              <span>⚡ WhatsApp Student</span>
                            </button>

                            <button
                              onClick={() => handleOpenInstantNotificationTrigger(selectedAppDossier, undefined, 'email')}
                              className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-blue-950 bg-blue-100 hover:bg-blue-200 border border-blue-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Instantly notify student via Official Email"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-800" />
                              <span>✉️ Email Decision</span>
                            </button>

                            <a
                              href={`/api/applications/${selectedAppDossier.id}/offer-letter`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="View & Print Official Provisional Offer Letter"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-600" />
                              <span>Offer Letter</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Quick Communication & Approval Action Toolbar */}
                      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                          <span>Direct Counselor Actions:</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Automated Notify Trigger Button (Always available in dossier) */}
                          <button
                            onClick={() => handleOpenInstantNotificationTrigger(selectedAppDossier)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Open Automated Instant Student Notification Trigger"
                          >
                            <Zap className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                            <span>⚡ Instant Notify Hub</span>
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={() => handleOpenWhatsApp(selectedAppDossier)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-950" />
                            <span>WhatsApp</span>
                          </button>

                          {/* Email */}
                          <button
                            onClick={() => handleOpenEmail(selectedAppDossier)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-900 bg-white hover:bg-blue-100 border border-blue-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5 text-blue-700" />
                            <span>Email</span>
                          </button>

                          {/* Approve */}
                          {selectedAppDossier.status !== 'Admission Decision' && selectedAppDossier.status !== 'Ready for India' && (
                            <button
                              onClick={() => handleOpenApproveModal(selectedAppDossier)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Approve Application</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Student Profile Information Details */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Student Profile & Background
                        </h4>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                            <span className="font-semibold text-slate-900 break-all">{selectedAppDossier.email}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">WhatsApp / Phone</span>
                            <span className="font-semibold text-slate-900">{selectedAppDossier.whatsapp || 'Not provided'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Nationality / Country</span>
                            <span className="font-semibold text-slate-900">{selectedAppDossier.country || 'Liberia'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth</span>
                            <span className="font-semibold text-slate-900">{selectedAppDossier.dateOfBirth || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Study Level</span>
                            <span className="font-semibold text-slate-900">{selectedAppDossier.preferredStudyLevel}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Course / Major</span>
                            <span className="font-semibold text-blue-900 font-bold">{selectedAppDossier.preferredCourse || 'General'}</span>
                          </div>
                        </div>

                        {/* Academic Qualifications & Motivation Message */}
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Academic Credentials & Qualifications</span>
                            <p className="font-medium text-slate-800 mt-0.5">
                              {selectedAppDossier.currentQualification || selectedAppDossier.academicBackground || 'High School Diploma / Secondary Certifications'}
                            </p>
                          </div>

                          {selectedAppDossier.message && (
                            <div className="pt-2 border-t border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicant Statement & Goals</span>
                              <p className="text-slate-700 italic mt-0.5 text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                                "{selectedAppDossier.message}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Official Admission Offer Details (If Approved) */}
                      {selectedAppDossier.admissionDetails && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <Award className="w-4 h-4 text-emerald-700" />
                              <span>Official Provisional Admission Granted</span>
                            </div>
                            <a
                              href={`/api/applications/${selectedAppDossier.id}/offer-letter`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1 shadow-xs"
                            >
                              <Printer className="w-3 h-3" />
                              <span>Print / Download Offer Letter</span>
                            </a>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-slate-800 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                            <p><strong>Institution:</strong> {selectedAppDossier.admissionDetails.approvedUniversity}</p>
                            <p><strong>Program:</strong> {selectedAppDossier.admissionDetails.approvedProgram}</p>
                            <p><strong>Tuition:</strong> ${selectedAppDossier.admissionDetails.tuitionFeeUsd}/year</p>
                            <p><strong>Scholarship:</strong> {selectedAppDossier.admissionDetails.scholarshipPercentage}</p>
                          </div>
                        </div>
                      )}

                      {/* Status Selector */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Update Application Stage & Status
                        </label>
                        <div className="flex items-center gap-2">
                          <select
                            value={selectedAppDossier.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-white border border-slate-300 font-bold text-slate-900 cursor-pointer shadow-xs focus:ring-2 focus:ring-blue-500/20"
                          >
                            {statusOptions.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Attached Documents Vault & Downloader */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                            Uploaded Student Documents ({selectedAppDossier.documents?.length || 0})
                          </h4>
                          <span className="text-[10px] text-slate-500">Click to preview or download</span>
                        </div>

                        {selectedAppDossier.documents && selectedAppDossier.documents.length > 0 ? (
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {selectedAppDossier.documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="p-3 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 flex items-center justify-between text-xs transition-all shadow-2xs"
                              >
                                <div className="flex items-center gap-2.5 truncate pr-2">
                                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div className="truncate">
                                    <p className="font-bold text-slate-900 truncate">{doc.name}</p>
                                    <p className="text-[10px] text-slate-500">{doc.category} • {doc.formattedSize || 'Document'}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {/* Verification Badge & Toggle */}
                                  <button
                                    onClick={() => handleToggleDocVerification(doc.id, doc.verified)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                                      doc.verified 
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    }`}
                                    title="Toggle verification status"
                                  >
                                    {doc.verified ? '✓ Verified' : 'Mark Verified'}
                                  </button>

                                  {/* Preview File */}
                                  <button
                                    onClick={() => setPreviewDoc(doc)}
                                    className="p-1.5 rounded-lg text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
                                    title="View document preview"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Download File */}
                                  <a
                                    href={doc.dataUrl || `/api/documents/${doc.storedFile || doc.name}`}
                                    download={doc.name}
                                    className="p-1.5 rounded-lg text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 transition-colors"
                                    title="Download document file"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                            No physical files attached to this student record.
                          </p>
                        )}
                      </div>

                      {/* Counselor Internal Review Notes & Timeline */}
                      <div className="pt-3 border-t border-slate-200 space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Counselor Review Notes & Communication Trail
                        </h4>

                        <form onSubmit={handleAddNote} className="flex gap-2">
                          <input
                            type="text"
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            placeholder="Type internal counselor review note..."
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                          />
                          <button
                            type="submit"
                            disabled={isAddingNote || !newNoteText.trim()}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
                          >
                            Save Note
                          </button>
                        </form>

                        {selectedAppDossier.notes && selectedAppDossier.notes.length > 0 && (
                          <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs pr-1">
                            {selectedAppDossier.notes.map((note) => (
                              <div key={note.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                <p className="text-slate-800">{note.text}</p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {note.author} • {new Date(note.createdAt).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ===================================================================== */}
              {/* TAB 2: WEBSITE LEADS & INQUIRIES */}
              {/* ===================================================================== */}
              {adminTab === 'enquiries' && (
                <div className="space-y-3">
                  {/* Master Checkbox & Toolbar for Enquiries */}
                  {filteredEnquiries.length > 0 && (
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={handleToggleSelectAllEnquiries}
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                            filteredEnquiries.length > 0 && filteredEnquiries.every(e => selectedEnquiryIds.includes(e.id!))
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : selectedEnquiryIds.some(id => filteredEnquiries.some(e => e.id === id))
                              ? 'bg-blue-100 border-blue-500 text-blue-800'
                              : 'bg-white border-slate-300 hover:border-blue-400'
                          }`}
                          title="Select / Deselect all inquiries"
                        >
                          {filteredEnquiries.length > 0 && filteredEnquiries.every(e => selectedEnquiryIds.includes(e.id!)) ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : selectedEnquiryIds.some(id => filteredEnquiries.some(e => e.id === id)) ? (
                            <div className="w-2.5 h-0.5 bg-blue-700 rounded-full" />
                          ) : null}
                        </button>
                        
                        <span className="text-xs font-bold text-slate-700">
                          {selectedEnquiryIds.length > 0 ? (
                            <span className="text-blue-700 font-extrabold">{selectedEnquiryIds.length} of {filteredEnquiries.length} selected</span>
                          ) : (
                            <span>Select All ({filteredEnquiries.length})</span>
                          )}
                        </span>
                      </div>

                      {selectedEnquiryIds.length > 0 ? (
                        <div className="flex items-center gap-2 animate-fadeIn">
                          <button
                            type="button"
                            onClick={() => handleOpenBulkDeleteConfirm('enquiries')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span>Delete Selected ({selectedEnquiryIds.length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedEnquiryIds([])}
                            className="px-2 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Select multiple enquiries to perform bulk actions
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pb-1">
                    <h4 className="text-sm font-bold text-slate-800">
                      Prospective Student Inquiries ({filteredEnquiries.length})
                    </h4>
                    <span className="text-xs text-slate-500">Direct questions from website contact desk</span>
                  </div>

                  {filteredEnquiries.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">No Inquiries Found</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {searchQuery ? 'No inquiries match your search filter.' : 'Inquiries sent from the website contact forms will appear here in real-time.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
                      {filteredEnquiries.map((enq) => {
                        const isEnqChecked = selectedEnquiryIds.includes(enq.id!);
                        return (
                          <div 
                            key={enq.id} 
                            className={`p-4 rounded-2xl border shadow-2xs space-y-2 text-left transition-all ${
                              isEnqChecked ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-300' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2.5">
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleSelectEnquiry(enq.id!, e)}
                                  className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                                    isEnqChecked
                                      ? 'bg-blue-600 border-blue-600 text-white'
                                      : 'bg-white border-slate-300 hover:border-blue-500'
                                  }`}
                                  aria-label={`Select enquiry from ${enq.fullName}`}
                                >
                                  {isEnqChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>

                                <div>
                                  <h5 className="text-sm font-extrabold text-slate-950">{enq.fullName}</h5>
                                  <p className="text-xs text-slate-500">{enq.country} • {enq.email}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                                  {enq.studyInterest || 'General Inquiry'}
                                </span>

                                <button
                                  onClick={(e) => handlePromptSingleDelete(enq.id!, enq.fullName, 'enquiry', e)}
                                  className="p-1 rounded-md text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                  title="Delete enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
                              "{enq.message || 'Interested in learning about university options in India.'}"
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                              <span className="text-[11px] text-slate-400">
                                {new Date(enq.createdAt || '').toLocaleDateString()}
                              </span>

                              <div className="flex items-center gap-2">
                                {enq.whatsapp && (
                                  <a
                                    href={`https://wa.me/${enq.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.fullName}, this is Myers Global Pathways admissions team following up on your study in India inquiry.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-emerald-700" />
                                    <span>WhatsApp</span>
                                  </a>
                                )}

                                <a
                                  href={`mailto:${enq.email}?subject=${encodeURIComponent('Myers Global Pathways: Response to your Study in India Inquiry')}`}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1"
                                >
                                  <Mail className="w-3 h-3 text-blue-700" />
                                  <span>Email Reply</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===================================================================== */}
              {/* TAB 3: APPROVED ADMISSIONS */}
              {/* ===================================================================== */}
              {adminTab === 'approvals' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Official Admission Decision Registry
                      </h4>
                      <p className="text-xs text-slate-500">
                        Students who have received verified provisional university admission offers
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.filter(a => a.status === 'Admission Decision' || a.status === 'Ready for India' || a.admissionDetails?.offerLetterIssued).map((app) => (
                      <div key={app.id} className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-xs space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {app.trackingId}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Approved
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-slate-950">{app.fullName}</h4>
                          <p className="text-xs text-slate-500">{app.country} • {app.email}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <p><strong>Approved Program:</strong> {app.admissionDetails?.approvedProgram || app.preferredCourse}</p>
                          <p><strong>Institution:</strong> {app.admissionDetails?.approvedUniversity || app.preferredUniversity}</p>
                          <p><strong>Tuition:</strong> ${app.admissionDetails?.tuitionFeeUsd || '2,800'}/yr ({app.admissionDetails?.scholarshipPercentage || 'Scholarship Applied'})</p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <a
                            href={`/api/applications/${app.id}/offer-letter`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Download Official Offer</span>
                          </a>

                          <button
                            onClick={() => handleOpenWhatsApp(app)}
                            className="p-2 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            title="WhatsApp student about offer"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL: WHATSAPP COMPOSER & LAUNCHER */}
      {/* ========================================================================= */}
      {whatsappModalOpen && selectedAppDossier && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">WhatsApp Applicant</h4>
                  <p className="text-xs text-slate-500">Direct message to: {selectedAppDossier.fullName} ({selectedAppDossier.whatsapp || 'Registered'})</p>
                </div>
              </div>

              <button
                onClick={() => setWhatsappModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Templates */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Quick Message Templates:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectWhatsAppTemplate('offer')}
                  className={`p-2 rounded-xl border text-left font-semibold cursor-pointer ${
                    whatsappTemplate === 'offer' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  🎉 Offer Letter Approval
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectWhatsAppTemplate('documents')}
                  className={`p-2 rounded-xl border text-left font-semibold cursor-pointer ${
                    whatsappTemplate === 'documents' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  📄 Document Verification
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectWhatsAppTemplate('visa')}
                  className={`p-2 rounded-xl border text-left font-semibold cursor-pointer ${
                    whatsappTemplate === 'visa' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  ✈️ Visa Preparation Packet
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectWhatsAppTemplate('general')}
                  className={`p-2 rounded-xl border text-left font-semibold cursor-pointer ${
                    whatsappTemplate === 'general' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  💬 General Follow-up
                </button>
              </div>
            </div>

            {/* Editable WhatsApp Text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message Content
              </label>
              <textarea
                rows={5}
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 leading-relaxed font-sans"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWhatsappModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                disabled={isLoggingWhatsApp || !customWhatsAppMsg.trim()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp & Log Message</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: EMAIL COMPOSER & LAUNCHER */}
      {/* ========================================================================= */}
      {emailModalOpen && selectedAppDossier && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">Send Official Email</h4>
                  <p className="text-xs text-slate-500">Recipient: {selectedAppDossier.fullName} ({selectedAppDossier.email})</p>
                </div>
              </div>

              <button
                onClick={() => setEmailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Body</label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-sans leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isLoggingEmail || !emailBody.trim()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Email & Record Log</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: APPLICATION APPROVAL & OFFER GENERATOR */}
      {/* ========================================================================= */}
      {approveModalOpen && selectedAppDossier && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">Approve Student Application</h4>
                  <p className="text-xs text-slate-500">Applicant: {selectedAppDossier.fullName} ({selectedAppDossier.trackingId})</p>
                </div>
              </div>

              <button
                onClick={() => setApproveModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmApproval} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recommended Indian Institution
                </label>
                <input
                  type="text"
                  required
                  value={approvedUniversity}
                  onChange={(e) => setApprovedUniversity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
                />
                {/* Suggestions Pills */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {universitySuggestions.slice(0, 3).map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setApprovedUniversity(u)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors"
                    >
                      + {u.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Approved Degree Program
                </label>
                <input
                  type="text"
                  required
                  value={approvedProgram}
                  onChange={(e) => setApprovedProgram(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Tuition (USD)
                  </label>
                  <input
                    type="text"
                    required
                    value={tuitionFeeUsd}
                    onChange={(e) => setTuitionFeeUsd(e.target.value)}
                    placeholder="e.g. 2,800"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Intake Semester
                  </label>
                  <input
                    type="text"
                    required
                    value={intakeSemester}
                    onChange={(e) => setIntakeSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Scholarship & Merit Grant
                </label>
                <input
                  type="text"
                  value={scholarshipPercentage}
                  onChange={(e) => setScholarshipPercentage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admissions Officer Evaluation Remarks
                </label>
                <textarea
                  rows={2}
                  value={counselorRemarks}
                  onChange={(e) => setCounselorRemarks(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-amber-950">Automated Student Notification Trigger</p>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      Approving this application generates the <strong>Official Provisional Admission Letter</strong>. The automated notification trigger will immediately launch the WhatsApp & Email dispatch hub to notify <strong>{selectedAppDossier?.fullName}</strong>.
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 pt-2 border-t border-amber-200 text-amber-950 font-bold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoTriggerOnApprove}
                    onChange={(e) => setAutoTriggerOnApprove(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-amber-400 cursor-pointer"
                  />
                  <span className="text-xs">⚡ Launch automated WhatsApp & Email notification trigger upon approval</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApproveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isApproving}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isApproving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Confirm & Issue Admission Offer</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: DOCUMENT PREVIEW */}
      {/* ========================================================================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-slate-950">{previewDoc.name}</h4>
                <p className="text-xs text-slate-500">{previewDoc.category} • {previewDoc.formattedSize}</p>
              </div>

              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Content View */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 min-h-[220px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
                <FileText className="w-8 h-8" />
              </div>

              <div>
                <h5 className="text-sm font-bold text-slate-900">{previewDoc.name}</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Verified Academic Document File • Category: {previewDoc.category}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-3 bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authenticated for Myers Global Pathways Admissions Review</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={previewDoc.dataUrl || `/api/documents/${previewDoc.storedFile || previewDoc.name}`}
                  download={previewDoc.name}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document File</span>
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: BULK APPLICATION APPROVAL */}
      {/* ========================================================================= */}
      {bulkApproveModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">Bulk Approve Student Applications</h4>
                  <p className="text-xs text-slate-500 font-medium">Batch issuing official admission offers to {selectedAppIds.length} selected students</p>
                </div>
              </div>

              <button
                onClick={() => setBulkApproveModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Students Chips Preview */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Selected Applicants ({selectedAppIds.length}):
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                {applications.filter(a => selectedAppIds.includes(a.id!)).map(a => (
                  <span key={a.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-semibold text-[11px]">
                    <span>{a.fullName}</span>
                    <span className="text-[9px] text-blue-700 font-mono">({a.trackingId})</span>
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleBulkApproveSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default Indian Partner Institution
                </label>
                <input
                  type="text"
                  required
                  value={bulkUniversity}
                  onChange={(e) => setBulkUniversity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Standard Annual Tuition (USD)
                  </label>
                  <input
                    type="text"
                    required
                    value={bulkTuitionUsd}
                    onChange={(e) => setBulkTuitionUsd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Intake Semester
                  </label>
                  <input
                    type="text"
                    required
                    value={bulkIntakeSemester}
                    onChange={(e) => setBulkIntakeSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Merit Scholarship / Tuition Waiver
                </label>
                <input
                  type="text"
                  value={bulkScholarship}
                  onChange={(e) => setBulkScholarship(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admissions Evaluation Notes
                </label>
                <textarea
                  rows={2}
                  value={bulkCounselorNotes}
                  onChange={(e) => setBulkCounselorNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Bulk approval will generate individualized official provisional admission letters for all <strong>{selectedAppIds.length} students</strong> and set their status to <em>Admission Decision</em>.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBulkApproveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isBulkApproving}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isBulkApproving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      <span>Confirm & Batch Approve ({selectedAppIds.length})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: BULK DELETE CONFIRMATION */}
      {/* ========================================================================= */}
      {bulkDeleteConfirmModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-rose-200 text-left space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-950">Confirm Bulk Deletion</h4>
                <p className="text-xs text-rose-700 font-semibold">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900">
                {bulkDeleteTargetType === 'applications' ? `${selectedAppIds.length} student application(s)` : `${selectedEnquiryIds.length} inquiry lead(s)`}
              </strong>{' '}
              from the system? All associated documents, notes, and records will be removed.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBulkDeleteConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBulkDeleteSubmit}
                disabled={isBulkDeleting}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                {isBulkDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Permanently Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODAL: SINGLE ITEM DELETE CONFIRMATION */}
      {/* ========================================================================= */}
      {singleDeleteConfirmId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-rose-200 text-left space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-950">Delete Record</h4>
                <p className="text-xs text-slate-500">{singleDeleteConfirmId.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Are you sure you want to delete the {singleDeleteConfirmId.type === 'app' ? 'application' : 'inquiry'} for{' '}
              <strong className="text-slate-900">{singleDeleteConfirmId.name}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSingleDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleExecuteSingleDelete}
                disabled={isSingleDeleting}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                {isSingleDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. MODAL: AUTOMATED INSTANT STUDENT NOTIFICATION TRIGGER (WHATSAPP & EMAIL) */}
      {/* ========================================================================= */}
      {instantNotifyModal && instantNotifyModal.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-amber-300 text-left space-y-4 animate-scaleUp my-8 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-950">
                      Automated Student Notification Trigger
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      Offer Approved
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Instantly notify <strong>{instantNotifyModal.app.fullName}</strong> of their university admission decision via WhatsApp and Email.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInstantNotifyModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close notification trigger"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              
              {/* Applicant & Admission Offer Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Applicant</span>
                    <strong className="text-slate-950 text-sm">{instantNotifyModal.app.fullName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Tracking Reference</span>
                    <span className="font-mono font-bold text-blue-700">{instantNotifyModal.app.trackingId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500">Institution:</span>{' '}
                    <strong className="text-slate-800">{instantNotifyModal.admissionInfo?.approvedUniversity || instantNotifyModal.app.preferredUniversity || 'Indian University'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Admitted Program:</span>{' '}
                    <strong className="text-slate-800">{instantNotifyModal.admissionInfo?.approvedProgram || instantNotifyModal.app.preferredCourse || 'Degree Program'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Merit Scholarship:</span>{' '}
                    <strong className="text-emerald-700">{instantNotifyModal.admissionInfo?.scholarshipPercentage || '20% Global Excellence Waiver'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Annual Tuition:</span>{' '}
                    <strong className="text-slate-800">${instantNotifyModal.admissionInfo?.tuitionFeeUsd || '2,800'} USD/yr</strong>
                  </div>
                </div>
              </div>

              {/* Notification Channel Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setInstantNotifyModal(prev => prev ? { ...prev, channelTab: 'whatsapp' } : null)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    instantNotifyModal.channelTab === 'whatsapp'
                      ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>📱 WhatsApp Notice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInstantNotifyModal(prev => prev ? { ...prev, channelTab: 'email' } : null)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    instantNotifyModal.channelTab === 'email'
                      ? 'bg-white text-blue-900 shadow-xs border border-blue-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>✉️ Official Email Notice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInstantNotifyModal(prev => prev ? { ...prev, channelTab: 'both' } : null)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    instantNotifyModal.channelTab === 'both'
                      ? 'bg-white text-amber-950 shadow-xs border border-amber-300 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>⚡ Multi-Channel Dispatch</span>
                </button>
              </div>

              {/* 1. WHATSAPP TAB VIEW */}
              {instantNotifyModal.channelTab === 'whatsapp' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className="font-semibold">Recipient WhatsApp:</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {instantNotifyModal.app.whatsapp || 'No phone number provided'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyNotificationContent('whatsapp')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                    >
                      {copiedChannel === 'whatsapp' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      WhatsApp Message Template (Auto-Generated & Editable)
                    </label>
                    <textarea
                      rows={8}
                      value={instantNotifyModal.whatsappText}
                      onChange={(e) => setInstantNotifyModal(prev => prev ? { ...prev, whatsappText: e.target.value } : null)}
                      className="w-full p-3 rounded-2xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono leading-relaxed"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Ready to trigger WhatsApp notification via browser/desktop WhatsApp client.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. EMAIL TAB VIEW */}
              {instantNotifyModal.channelTab === 'email' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className="font-semibold">Recipient Email:</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {instantNotifyModal.app.email}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyNotificationContent('email')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                    >
                      {copiedChannel === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Email Subject Line
                    </label>
                    <input
                      type="text"
                      value={instantNotifyModal.emailSubjectText}
                      onChange={(e) => setInstantNotifyModal(prev => prev ? { ...prev, emailSubjectText: e.target.value } : null)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Official Email Body Template
                    </label>
                    <textarea
                      rows={8}
                      value={instantNotifyModal.emailBodyText}
                      onChange={(e) => setInstantNotifyModal(prev => prev ? { ...prev, emailBodyText: e.target.value } : null)}
                      className="w-full p-3 rounded-2xl text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* 3. MULTI-CHANNEL DISPATCH TAB VIEW */}
              {instantNotifyModal.channelTab === 'both' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-300 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-700 fill-amber-700" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Simultaneous Multi-Channel Notification Workflow
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600">
                      Triggering multi-channel dispatch will launch both WhatsApp and your default email client with all admission offer details and next steps pre-filled for <strong>{instantNotifyModal.app.fullName}</strong>.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                        <span className="font-bold text-emerald-900 block flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" /> Step 1: WhatsApp
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Direct chat window with formatted decision breakdown.
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-blue-200">
                        <span className="font-bold text-blue-900 block flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-blue-600" /> Step 2: Email Client
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Formal admission award notice with visa steps.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Audit Trail Option */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoLogCommunication}
                    onChange={(e) => setAutoLogCommunication(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <span>Automatically log this notification dispatch to the applicant's internal timeline</span>
                </label>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 shrink-0">
              <button
                type="button"
                onClick={() => setInstantNotifyModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close & Return
              </button>

              <div className="flex items-center gap-2">
                {instantNotifyModal.channelTab === 'whatsapp' && (
                  <button
                    type="button"
                    onClick={handleDispatchWhatsAppNotification}
                    disabled={isTriggeringNotification}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-emerald-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    {isTriggeringNotification ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-emerald-950 text-emerald-950" />
                        <span>⚡ Trigger & Send WhatsApp Now</span>
                      </>
                    )}
                  </button>
                )}

                {instantNotifyModal.channelTab === 'email' && (
                  <button
                    type="button"
                    onClick={handleDispatchEmailNotification}
                    disabled={isTriggeringNotification}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-500 hover:to-blue-600 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    {isTriggeringNotification ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-white" />
                        <span>✉️ Launch Email Client & Send</span>
                      </>
                    )}
                  </button>
                )}

                {instantNotifyModal.channelTab === 'both' && (
                  <button
                    type="button"
                    onClick={handleDispatchDualNotification}
                    disabled={isTriggeringNotification}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    {isTriggeringNotification ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                        <span>🚀 Launch Both Notifications Now</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
