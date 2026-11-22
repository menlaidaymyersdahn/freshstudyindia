import React, { useState, useEffect, useRef } from 'react';
import { StudentDocument } from '../types';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileCheck2,
  FileText,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  UserCheck,
} from 'lucide-react';
import { syncApplicationToFirestore } from '../lib/firebase';
import { COMPANY, getWhatsAppConfig } from '../config/company';
import { PhoneInputField } from './PhoneInputField';
import { OfficialLogo } from './OfficialLogo';
import { validatePhoneNumber } from '../config/countryCodes';

export type WizardStep = 1 | 2 | 3 | 'review';

export interface ApplicationFormState {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  dateOfBirth: string;
  currentQualification: string;
  preferredStudyLevel: string;
  preferredCourse: string;
  preferredUniversity: string;
  academicBackground: string;
  message: string;
}

interface UploadingItem {
  id: string;
  name: string;
  size: number;
  formattedSize: string;
  category: StudentDocument['category'];
  progress: number;
}

interface SubmissionReceipt {
  trackingId: string;
  applicationId: string;
  fullName: string;
  email: string;
  documentsCount: number;
  confirmationEmailSent?: boolean;
}

interface ApplicationWizardFormProps {
  mode?: 'page' | 'modal';
  presetCourse?: string;
  presetStudyLevel?: string;
  onPortalRedirect?: (trackingId: string) => void;
  onCloseModal?: () => void;
}

const QUALIFICATION_OPTIONS = [
  'High School Diploma / WAEC / WASSCE',
  'Associate Degree / Diploma',
  'Bachelor’s Degree',
  'Master’s Degree',
  'Other Certification',
] as const;

const STUDY_LEVEL_OPTIONS = [
  {
    value: 'Undergraduate (Bachelor’s)',
    label: 'Undergraduate (Bachelor’s Degree — 3 or 4 Years)',
  },
  {
    value: 'Postgraduate (Master’s)',
    label: 'Postgraduate (Master’s Degree — 2 Years)',
  },
  {
    value: 'Doctoral (Ph.D.)',
    label: 'Doctoral (Ph.D. / Research)',
  },
  {
    value: 'Diploma / Polytechnic',
    label: 'Diploma / Polytechnic (1–3 Years)',
  },
] as const;

const DOCUMENT_CATEGORIES: Array<{
  value: StudentDocument['category'];
  label: string;
  hint: string;
}> = [
  {
    value: 'Academic Transcripts',
    label: 'Academic Transcripts',
    hint: 'High school or university grade sheets',
  },
  {
    value: 'Academic Certificates',
    label: 'Academic Certificates',
    hint: 'WAEC, WASSCE, Diploma, or Degree certificate',
  },
  {
    value: 'Passport',
    label: 'Passport',
    hint: 'Passport bio-data page or National ID',
  },
  {
    value: 'Other Supporting Documents',
    label: 'Other Supporting Documents',
    hint: 'Recommendation letters, CV, or English letter',
  },
];

const ACCEPTED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
]);

const ACCEPTED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function normalizeStudyLevel(input?: string): string {
  if (!input) return STUDY_LEVEL_OPTIONS[0].value;
  const trimmed = input.trim();
  const exact = STUDY_LEVEL_OPTIONS.find(
    (opt) => opt.value.toLowerCase() === trimmed.toLowerCase()
  );
  if (exact) return exact.value;
  const lower = trimmed.toLowerCase();
  if (lower.includes('postgrad') || lower.includes('master')) return STUDY_LEVEL_OPTIONS[1].value;
  if (lower.includes('doc') || lower.includes('phd') || lower.includes('ph.d'))
    return STUDY_LEVEL_OPTIONS[2].value;
  if (lower.includes('diploma') || lower.includes('polytechnic') || lower.includes('certificate'))
    return STUDY_LEVEL_OPTIONS[3].value;
  return STUDY_LEVEL_OPTIONS[0].value;
}

function formatReadableDate(isoDate: string): string {
  if (!isoDate) return 'Not provided';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (Number.isNaN(dateObj.getTime())) return isoDate;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const INPUT_BASE =
  'w-full min-h-[46px] px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:bg-white';

const INPUT_NORMAL =
  'border-slate-200 hover:border-slate-300 focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10';

const INPUT_ERROR =
  'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/15';

export const ApplicationWizardForm: React.FC<ApplicationWizardFormProps> = ({
  mode = 'page',
  presetCourse = '',
  presetStudyLevel = '',
  onPortalRedirect,
  onCloseModal,
}) => {
  const wizardTopRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitLockRef = useRef(false);

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(0);
  const [hasVisitedReview, setHasVisitedReview] = useState(false);

  const [formData, setFormData] = useState<ApplicationFormState>({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    dateOfBirth: '',
    currentQualification: QUALIFICATION_OPTIONS[0],
    preferredStudyLevel: normalizeStudyLevel(presetStudyLevel),
    preferredCourse: presetCourse || '',
    preferredUniversity: '',
    academicBackground: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingItem[]>([]);
  const [selectedDocCategory, setSelectedDocCategory] =
    useState<StudentDocument['category']>('Academic Transcripts');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [declarationError, setDeclarationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const whatsappConfig = getWhatsAppConfig();
  const todayIso = new Date().toISOString().split('T')[0];

  // Sync URL/preset changes without clearing existing applicant progress
  useEffect(() => {
    if (presetCourse || presetStudyLevel) {
      setFormData((prev) => ({
        ...prev,
        preferredCourse: presetCourse || prev.preferredCourse,
        preferredStudyLevel: presetStudyLevel
          ? normalizeStudyLevel(presetStudyLevel)
          : prev.preferredStudyLevel,
      }));
    }
  }, [presetCourse, presetStudyLevel]);

  const scrollToWizardTop = () => {
    if (mode === 'page' && wizardTopRef.current) {
      const top = wizardTopRef.current.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else if (wizardTopRef.current) {
      wizardTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateField = <K extends keyof ApplicationFormState>(
    field: K,
    value: ApplicationFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full legal name as shown on your passport or ID.';
    }

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneCheck = validatePhoneNumber(formData.whatsapp);
    if (!phoneCheck.isValid) {
      errors.whatsapp =
        phoneCheck.error ||
        'Please enter a valid WhatsApp or phone number including country code (e.g. +231).';
    }

    if (!formData.country.trim()) {
      errors.country = 'Please enter your country of citizenship or residence.';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Please select your date of birth.';
    } else if (formData.dateOfBirth > todayIso) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }

    if (!formData.currentQualification.trim()) {
      errors.currentQualification = 'Please select your current highest qualification.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.preferredStudyLevel.trim()) {
      errors.preferredStudyLevel = 'Please select your preferred study level.';
    }

    if (!formData.preferredCourse.trim() || formData.preferredCourse.trim().length < 2) {
      errors.preferredCourse = 'Please enter your preferred field or course of study.';
    }

    if (!formData.academicBackground.trim() || formData.academicBackground.trim().length < 4) {
      errors.academicBackground =
        'Please provide your previous school or college and academic background.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (target: WizardStep) => {
    setSubmitError(null);
    setDeclarationError(null);

    if (target === 2 && currentStep === 1) {
      if (!validateStep1()) return;
      setMaxCompletedStep((prev) => Math.max(prev, 1));
    } else if (target === 3 && currentStep === 2) {
      if (!validateStep2()) return;
      setMaxCompletedStep((prev) => Math.max(prev, 2));
    } else if (target === 'review') {
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !validateStep2()) return;
      if (!validateStep1()) {
        setCurrentStep(1);
        return;
      }
      if (!validateStep2()) {
        setCurrentStep(2);
        return;
      }
      setMaxCompletedStep(3);
      setHasVisitedReview(true);
    } else if (typeof target === 'number' && typeof currentStep === 'number' && target > currentStep) {
      // Jumping ahead via top stepper
      if (currentStep === 1 && !validateStep1()) return;
      if (target >= 3 && !validateStep2()) {
        setCurrentStep(2);
        return;
      }
    }

    setCurrentStep(target);
    scrollToWizardTop();
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      goToStep(2);
    } else if (currentStep === 2) {
      goToStep(3);
    } else if (currentStep === 3) {
      goToStep('review');
    }
  };

  const handlePrevious = () => {
    setSubmitError(null);
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 'review') {
      setCurrentStep(3);
    }
    scrollToWizardTop();
  };

  const processFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;

    setUploadError(null);
    const errors: string[] = [];

    incoming.forEach((file) => {
      const lowerName = file.name.toLowerCase();
      const hasAllowedExt = ACCEPTED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      const hasAllowedMime = file.type ? ACCEPTED_MIME_TYPES.has(file.type.toLowerCase()) : false;

      if (!hasAllowedExt && !hasAllowedMime) {
        errors.push(`"${file.name}" is not a supported format. Please upload PDF, JPG, or PNG files.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`"${file.name}" exceeds the 10 MB maximum file size limit.`);
        return;
      }

      const uploadId = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const categorySnapshot = selectedDocCategory;
      const formattedSize = formatBytes(file.size);

      setUploadingFiles((prev) => [
        ...prev,
        {
          id: uploadId,
          name: file.name,
          size: file.size,
          formattedSize,
          category: categorySnapshot,
          progress: 12,
        },
      ]);

      const reader = new FileReader();

      reader.onprogress = (evt) => {
        if (evt.lengthComputable && evt.total > 0) {
          const percent = Math.min(95, Math.max(15, Math.round((evt.loaded / evt.total) * 100)));
          setUploadingFiles((prev) =>
            prev.map((item) => (item.id === uploadId ? { ...item, progress: percent } : item))
          );
        }
      };

      reader.onload = () => {
        const dataUrl = reader.result as string;
        setUploadingFiles((prev) =>
          prev.map((item) => (item.id === uploadId ? { ...item, progress: 100 } : item))
        );

        const completedDoc: StudentDocument = {
          id: uploadId,
          name: file.name,
          size: file.size,
          formattedSize,
          type: file.type || 'application/octet-stream',
          category: categorySnapshot,
          dataUrl,
          verified: false,
          uploadedAt: new Date().toISOString(),
        };

        // Brief transition so applicant sees 100% completion cleanly
        window.setTimeout(() => {
          setUploadingFiles((prev) => prev.filter((item) => item.id !== uploadId));
          setDocuments((prev) => [...prev, completedDoc]);
        }, 180);
      };

      reader.onerror = () => {
        setUploadingFiles((prev) => prev.filter((item) => item.id !== uploadId));
        setUploadError(`Could not read "${file.name}". Please try selecting the file again.`);
      };

      reader.readAsDataURL(file);
    });

    if (errors.length > 0) {
      setUploadError(errors.join(' '));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
  };

  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (submitLockRef.current || isSubmitting) return;

    setSubmitError(null);
    setDeclarationError(null);

    if (!validateStep1()) {
      setCurrentStep(1);
      scrollToWizardTop();
      return;
    }

    if (!validateStep2()) {
      setCurrentStep(2);
      scrollToWizardTop();
      return;
    }

    if (uploadingFiles.length > 0) {
      setSubmitError('Please wait a moment for your selected documents to finish attaching.');
      return;
    }

    if (!declarationAccepted) {
      setDeclarationError(
        'Please confirm the declaration checkbox to verify that your application details are accurate.'
      );
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    const requestBody = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: formData.whatsapp.trim(),
      country: formData.country.trim(),
      dateOfBirth: formData.dateOfBirth,
      currentQualification: formData.currentQualification.trim(),
      preferredStudyLevel: formData.preferredStudyLevel.trim(),
      preferredCourse: formData.preferredCourse.trim(),
      preferredUniversity: formData.preferredUniversity.trim(),
      academicBackground: formData.academicBackground.trim(),
      message: formData.message.trim(),
      documents: documents.map((d) => ({
        id: d.id,
        name: d.name,
        size: d.size,
        formattedSize: d.formattedSize,
        type: d.type,
        category: d.category,
        dataUrl: d.dataUrl,
        verified: false,
        uploadedAt: d.uploadedAt,
      })),
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data?.success || !data?.trackingId) {
        const serverMsg =
          data?.error ||
          data?.message ||
          `Submission could not be confirmed by the admissions server (HTTP ${response.status}). Please try again.`;
        setSubmitError(serverMsg);
        return;
      }

      const confirmedTrackingId: string = String(data.trackingId);
      const confirmedAppId: string = String(data.applicationId || data.record?.id || confirmedTrackingId);
      const nowIso = new Date().toISOString();

      // Build clean persisted metadata record (without raw base64 blobs so Firestore/localStorage stay fast & reliable)
      const confirmedRecord = {
        id: confirmedAppId,
        trackingId: confirmedTrackingId,
        fullName: requestBody.fullName,
        email: requestBody.email,
        whatsapp: requestBody.whatsapp,
        country: requestBody.country,
        dateOfBirth: requestBody.dateOfBirth,
        currentQualification: requestBody.currentQualification,
        preferredStudyLevel: requestBody.preferredStudyLevel,
        preferredCourse: requestBody.preferredCourse,
        preferredUniversity: requestBody.preferredUniversity || 'Best Recommended Accredited University',
        academicBackground: requestBody.academicBackground,
        message: requestBody.message,
        status: 'Application Received' as const,
        documentsCount: documents.length,
        documents: documents.map((d) => ({
          id: d.id,
          name: d.name,
          size: d.size,
          formattedSize: d.formattedSize,
          type: d.type,
          category: d.category,
          verified: false,
          uploadedAt: d.uploadedAt,
        })),
        submittedAt: nowIso,
        updatedAt: nowIso,
      };

      // Sync confirmed backend record to Cloud Firestore (non-blocking)
      syncApplicationToFirestore(confirmedRecord).catch((err) => {
        console.warn('Firestore post-confirmation sync notice:', err);
      });

      // Mirror confirmed record to client storage & broadcast live Admin Dashboard events
      try {
        const existingStd = JSON.parse(localStorage.getItem('mgp_applications') || '[]');
        const nextStd = [
          confirmedRecord,
          ...existingStd.filter(
            (item: any) => item.id !== confirmedAppId && item.trackingId !== confirmedTrackingId
          ),
        ];
        localStorage.setItem('mgp_applications', JSON.stringify(nextStd));

        const existingLocal = JSON.parse(localStorage.getItem('mgp_local_applications') || '[]');
        const nextLocal = [
          confirmedRecord,
          ...existingLocal.filter(
            (item: any) => item.id !== confirmedAppId && item.trackingId !== confirmedTrackingId
          ),
        ];
        localStorage.setItem('mgp_local_applications', JSON.stringify(nextLocal));
        localStorage.setItem('mgp_last_submitted_app', JSON.stringify(confirmedRecord));

        window.dispatchEvent(new CustomEvent('mgp_application_submitted', { detail: confirmedRecord }));
        window.dispatchEvent(new Event('storage'));
      } catch (storageErr) {
        console.warn('Client cache sync notice:', storageErr);
      }

      setReceipt({
        trackingId: confirmedTrackingId,
        applicationId: confirmedAppId,
        fullName: requestBody.fullName,
        email: requestBody.email,
        documentsCount: documents.length,
        confirmationEmailSent: Boolean(data?.confirmationEmail?.sent),
      });
      scrollToWizardTop();
    } catch (err: any) {
      console.error('Application submission error:', err);
      setSubmitError(
        'We could not reach the admissions server to confirm your submission. Your information and files are still saved on this page—please check your connection and try submitting again.'
      );
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setReceipt(null);
    setCurrentStep(1);
    setMaxCompletedStep(0);
    setHasVisitedReview(false);
    setFieldErrors({});
    setUploadError(null);
    setSubmitError(null);
    setDeclarationError(null);
    setDeclarationAccepted(false);
    setDocuments([]);
    setUploadingFiles([]);
    setFormData({
      fullName: '',
      email: '',
      whatsapp: '',
      country: '',
      dateOfBirth: '',
      currentQualification: QUALIFICATION_OPTIONS[0],
      preferredStudyLevel: STUDY_LEVEL_OPTIONS[0].value,
      preferredCourse: '',
      preferredUniversity: '',
      academicBackground: '',
      message: '',
    });
    scrollToWizardTop();
  };

  const handleCopyTrackingId = async () => {
    if (!receipt?.trackingId) return;
    try {
      await navigator.clipboard.writeText(receipt.trackingId);
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 2200);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  const activeNumericStep = currentStep === 'review' ? 3 : currentStep;
  const progressPercent =
    currentStep === 1 ? 33.33 : currentStep === 2 ? 66.66 : currentStep === 3 ? 88 : 100;

  const stepsMeta = [
    { num: 1 as const, code: 'STEP 01', title: 'Personal Information' },
    { num: 2 as const, code: 'STEP 02', title: 'Academic Information' },
    { num: 3 as const, code: 'STEP 03', title: 'Documents & Submission' },
  ];

  // Confirmation Screen (ONLY shown after verified backend response with trackingId)
  if (receipt) {
    return (
      <div
        ref={wizardTopRef}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(11,31,58,0.06)] overflow-hidden"
      >
        {/* Official Confirmation Top Band */}
        <div className={`bg-[#0B1F3A] px-6 sm:px-10 py-8 text-white border-b-2 border-[#C5922E] ${mode === 'modal' ? 'pr-16 sm:pr-20' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <OfficialLogo variant="badge" size="md" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E5B95C]">
                  Official Admissions Receipt
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white">
                  Application Received
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-400/25 px-3 py-1.5 rounded-lg self-start sm:self-center">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Confirmed by Admissions Registry</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          {/* Personalized Welcome */}
          <div className="space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1F3A] tracking-[-0.02em]">
              Thank you, {receipt.fullName}.
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              Your international student application has been officially logged with the Myers
              Global Pathways Admissions Desk
              {receipt.documentsCount > 0
                ? ` along with ${receipt.documentsCount} attached supporting document${
                    receipt.documentsCount === 1 ? '' : 's'
                  }.`
                : '. You may upload your supporting academic documents anytime in the Student Portal.'}
            </p>
          </div>

          {/* Backend-Confirmed Reference Number Box */}
          <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Official Application Reference Number
              </p>
              <p className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-[#0B1F3A] tabular-nums select-all">
                {receipt.trackingId}
              </p>
              <p className="text-xs text-slate-600">
                Keep this reference number safe to track your admission progress or add documents later.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyTrackingId}
              className="min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
            >
              {copiedId ? (
                <>
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                  <span>Reference Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Reference ID</span>
                </>
              )}
            </button>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
              What Happens Next
            </h4>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-1.5">
                <span className="font-mono text-xs font-bold text-[#C5922E] tabular-nums">01</span>
                <p className="text-sm font-semibold text-[#0B1F3A]">Eligibility & Course Review</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our admissions counselors review your qualifications, target study level, and
                  preferred field of study in India.
                </p>
              </li>
              <li className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-1.5">
                <span className="font-mono text-xs font-bold text-[#C5922E] tabular-nums">02</span>
                <p className="text-sm font-semibold text-[#0B1F3A]">Direct Counselor Contact</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We will contact you via email ({receipt.email}) and WhatsApp with matching
                  university options, fee structures, and document guidance.
                </p>
              </li>
              <li className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-1.5">
                <span className="font-mono text-xs font-bold text-[#C5922E] tabular-nums">03</span>
                <p className="text-sm font-semibold text-[#0B1F3A]">Track in Student Portal</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use your reference number anytime to check status updates or upload transcripts,
                  certificates, and your passport page.
                </p>
              </li>
            </ol>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            {onPortalRedirect && (
              <button
                type="button"
                onClick={() => onPortalRedirect(receipt.trackingId)}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#E5B95C]" />
                <span>Open Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleResetForm}
              className="min-h-[48px] px-5 py-3 rounded-lg bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-sm font-semibold transition-colors cursor-pointer"
            >
              Start Another Application
            </button>

            {mode === 'modal' && onCloseModal && (
              <button
                type="button"
                onClick={onCloseModal}
                className="min-h-[48px] px-5 py-3 rounded-lg text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 text-sm font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>

          {/* Admissions Contact Desk */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-3">
              Admissions Desk Contact Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <a
                href="mailto:admissions@myersglobalpathways.com"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] transition-colors text-slate-700"
              >
                <Mail className="w-4 h-4 text-[#C5922E] shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#0B1F3A]">Admissions Email</p>
                  <p className="truncate text-slate-600">admissions@myersglobalpathways.com</p>
                </div>
              </a>

              <a
                href={whatsappConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] transition-colors text-slate-700"
              >
                <MessageCircle className="w-4 h-4 text-[#C5922E] shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#0B1F3A]">Liberia / WhatsApp Desk</p>
                  <p className="font-mono tabular-nums text-slate-600">{COMPANY.primaryWhatsApp}</p>
                </div>
              </a>

              <a
                href={whatsappConfig.altUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#0B1F3A] transition-colors text-slate-700"
              >
                <Phone className="w-4 h-4 text-[#C5922E] shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#0B1F3A]">India Admissions Desk</p>
                  <p className="font-mono tabular-nums text-slate-600">{COMPANY.alternativePhone}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wizardTopRef} className="w-full">
      {/* Main Admissions Portal Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(11,31,58,0.06)] overflow-hidden">
        {/* Official Portal Top Header + 3-Step Progress Bar */}
        <div className="bg-[#0B1F3A] text-white px-5 sm:px-8 pt-6 pb-5 border-b border-[#1A355B]">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 ${mode === 'modal' ? 'pr-12 sm:pr-14' : ''}`}>
            <div className="flex items-center gap-4">
              <OfficialLogo variant="badge" size="md" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E5B95C]">
                  {COMPANY.shortName}
                </p>
                <h1 className="font-display text-lg sm:text-2xl font-semibold tracking-[-0.02em] text-white leading-tight">
                  International Student Admissions Portal
                </h1>
              </div>
            </div>

            {/* Step Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="text-left sm:text-right">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300 font-medium">
                  {currentStep === 'review' ? 'Final Verification' : 'Application Progress'}
                </p>
                <p className="font-display text-sm font-semibold text-[#E5B95C] tabular-nums">
                  {currentStep === 'review'
                    ? 'Step 3 of 3 · Review & Submit'
                    : `Step ${activeNumericStep} of 3`}
                </p>
              </div>
            </div>
          </div>

          {/* 3-Step Horizontal Indicator */}
          <div className="pt-5">
            <nav aria-label="Application steps">
              <ol className="grid grid-cols-3 gap-2 sm:gap-4">
                {stepsMeta.map((stepItem) => {
                  const isActive =
                    currentStep === stepItem.num ||
                    (currentStep === 'review' && stepItem.num === 3);
                  const isCompleted =
                    (typeof currentStep === 'number' && stepItem.num < currentStep) ||
                    (currentStep === 'review' && stepItem.num < 3);
                  const isClickable =
                    isCompleted ||
                    stepItem.num <= maxCompletedStep + 1 ||
                    (hasVisitedReview && stepItem.num <= 3);

                  return (
                    <li key={stepItem.num} className="min-w-0">
                      <button
                        type="button"
                        disabled={!isClickable}
                        onClick={() => {
                          if (isClickable) goToStep(stepItem.num);
                        }}
                        className={`w-full text-left rounded-lg px-2.5 py-2 sm:px-3.5 sm:py-2.5 transition-all duration-150 border ${
                          isActive
                            ? 'bg-white/10 border-[#C5922E] text-white'
                            : isCompleted
                            ? 'bg-white/[0.04] border-white/15 text-slate-200 hover:bg-white/[0.08] cursor-pointer'
                            : 'bg-transparent border-white/10 text-slate-400 cursor-default'
                        }`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold tabular-nums shrink-0 ${
                              isActive
                                ? 'bg-[#C5922E] text-[#0B1F3A]'
                                : isCompleted
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'bg-white/10 text-slate-300'
                            }`}
                          >
                            {isCompleted ? <Check className="w-3 h-3 stroke-[2.75]" /> : stepItem.num}
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] truncate ${
                              isActive ? 'text-[#E5B95C]' : 'text-slate-300'
                            }`}
                          >
                            {stepItem.code}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-xs sm:text-[13px] font-medium truncate ${
                            isActive ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                          }`}
                        >
                          {stepItem.title}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Continuous Progress Bar */}
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5922E] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === 'review') {
              handleFinalSubmit();
            } else {
              handleContinue();
            }
          }}
          noValidate
          className={`px-5 sm:px-8 lg:px-10 py-7 sm:py-9 ${
            mode === 'page' ? 'pb-28 md:pb-10' : 'pb-8'
          }`}
        >
          {/* STEP 01: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C5922E]">
                    Step 01 of 03
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1F3A] tracking-[-0.02em] mt-0.5">
                    Personal Information
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Tell us about yourself so our admissions team can understand your application.
                  </p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">
                  <span className="text-red-600">*</span> Required fields
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Legal Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-full-name"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Full Legal Name (as in Passport/ID) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-full-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. John Emmanuel Flomo"
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    className={`${INPUT_BASE} ${fieldErrors.fullName ? INPUT_ERROR : INPUT_NORMAL}`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-email"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="e.g. applicant@gmail.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className={`${INPUT_BASE} ${fieldErrors.email ? INPUT_ERROR : INPUT_NORMAL}`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp / Phone Number with searchable Country Code Selector (defaults to Liberia +231) */}
                <div className="md:col-span-2">
                  <PhoneInputField
                    id="mgp-whatsapp"
                    label="WhatsApp / Phone Number"
                    required
                    value={formData.whatsapp}
                    onChange={(val) => updateField('whatsapp', val)}
                    onCountrySelect={(countryName) => {
                      if (!formData.country.trim()) {
                        updateField('country', countryName);
                      }
                    }}
                    error={fieldErrors.whatsapp}
                  />
                </div>

                {/* Country of Citizenship / Residence */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-country"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Country of Citizenship / Residence <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-country"
                    type="text"
                    autoComplete="country-name"
                    required
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="e.g. Liberia, Ghana, Nigeria, Sierra Leone"
                    aria-invalid={Boolean(fieldErrors.country)}
                    className={`${INPUT_BASE} ${fieldErrors.country ? INPUT_ERROR : INPUT_NORMAL}`}
                  />
                  {fieldErrors.country && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.country}</span>
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-dob"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-dob"
                    type="date"
                    max={todayIso}
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.dateOfBirth)}
                    className={`${INPUT_BASE} tabular-nums ${
                      fieldErrors.dateOfBirth ? INPUT_ERROR : INPUT_NORMAL
                    }`}
                  />
                  {fieldErrors.dateOfBirth && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.dateOfBirth}</span>
                    </p>
                  )}
                </div>

                {/* Current Highest Qualification */}
                <div className="md:col-span-2 space-y-1.5">
                  <label
                    htmlFor="mgp-qualification"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Current Highest Qualification <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="mgp-qualification"
                    required
                    value={formData.currentQualification}
                    onChange={(e) => updateField('currentQualification', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.currentQualification)}
                    className={`${INPUT_BASE} cursor-pointer ${
                      fieldErrors.currentQualification ? INPUT_ERROR : INPUT_NORMAL
                    }`}
                  >
                    {QUALIFICATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.currentQualification && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.currentQualification}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 02: ACADEMIC INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C5922E]">
                    Step 02 of 03
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1F3A] tracking-[-0.02em] mt-0.5">
                    Academic Information
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Tell us what you want to study in India.
                  </p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">
                  <span className="text-red-600">*</span> Required fields
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Preferred Study Level */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-study-level"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Preferred Study Level <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="mgp-study-level"
                    required
                    value={formData.preferredStudyLevel}
                    onChange={(e) => updateField('preferredStudyLevel', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.preferredStudyLevel)}
                    className={`${INPUT_BASE} cursor-pointer ${
                      fieldErrors.preferredStudyLevel ? INPUT_ERROR : INPUT_NORMAL
                    }`}
                  >
                    {STUDY_LEVEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.preferredStudyLevel && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.preferredStudyLevel}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Field / Course of Study */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mgp-course"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Preferred Field / Course of Study <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-course"
                    type="text"
                    required
                    value={formData.preferredCourse}
                    onChange={(e) => updateField('preferredCourse', e.target.value)}
                    placeholder="e.g. B.Sc. Computer Science, Civil Engineering, MBA, Nursing"
                    aria-invalid={Boolean(fieldErrors.preferredCourse)}
                    className={`${INPUT_BASE} ${
                      fieldErrors.preferredCourse ? INPUT_ERROR : INPUT_NORMAL
                    }`}
                  />
                  {fieldErrors.preferredCourse ? (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.preferredCourse}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      Enter your exact degree program or general field of interest.
                    </p>
                  )}
                </div>

                {/* Previous School / College & Academic Background */}
                <div className="md:col-span-2 space-y-1.5">
                  <label
                    htmlFor="mgp-background"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Previous School / College & Academic Background{' '}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mgp-background"
                    type="text"
                    required
                    value={formData.academicBackground}
                    onChange={(e) => updateField('academicBackground', e.target.value)}
                    placeholder="e.g. Monrovia Central High School (Graduated 2024, WAEC / Science Track)"
                    aria-invalid={Boolean(fieldErrors.academicBackground)}
                    className={`${INPUT_BASE} ${
                      fieldErrors.academicBackground ? INPUT_ERROR : INPUT_NORMAL
                    }`}
                  />
                  {fieldErrors.academicBackground ? (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.academicBackground}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      Include your school or university name, graduation year, and exam board or GPA
                      if available.
                    </p>
                  )}
                </div>

                {/* Preferred University (Optional — preserved from existing schema) */}
                <div className="md:col-span-2 space-y-1.5">
                  <label
                    htmlFor="mgp-university"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Preferred University in India{' '}
                    <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="mgp-university"
                    type="text"
                    value={formData.preferredUniversity}
                    onChange={(e) => updateField('preferredUniversity', e.target.value)}
                    placeholder="e.g. Shri Rawatpura Sarkar University, or leave blank for counselor recommendations"
                    className={`${INPUT_BASE} ${INPUT_NORMAL}`}
                  />
                </div>

                {/* Special Questions or Notes */}
                <div className="md:col-span-2 space-y-1.5">
                  <label
                    htmlFor="mgp-notes"
                    className="block text-[13px] font-semibold text-[#0B1F3A]"
                  >
                    Special Questions or Notes for Admissions Officers{' '}
                    <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="mgp-notes"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Share your preferred intake month, hostel requirements, budget questions, or any specific guidance you need..."
                    className="w-full px-3.5 py-3 rounded-lg bg-[#F4F6F9] border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none resize-y"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 03: SUPPORTING DOCUMENTS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200/90">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C5922E]">
                  Step 03 of 03
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1F3A] tracking-[-0.02em] mt-0.5">
                  Supporting Documents
                </h2>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Upload your available academic documents. You can also submit your application and
                  provide documents later if permitted by the existing application process.
                </p>
              </div>

              {/* Document Category Selector */}
              <div className="space-y-2.5">
                <label className="block text-[13px] font-semibold text-[#0B1F3A]">
                  1. Select Document Category Before Uploading
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DOCUMENT_CATEGORIES.map((category) => {
                    const isSelected = selectedDocCategory === category.value;
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setSelectedDocCategory(category.value)}
                        className={`min-h-[56px] text-left px-3.5 py-2.5 rounded-xl border transition-all duration-150 flex items-start justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xs'
                            : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-[#0B1F3A]'
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`text-xs sm:text-[13px] font-semibold ${
                              isSelected ? 'text-white' : 'text-[#0B1F3A]'
                            }`}
                          >
                            {category.label}
                          </p>
                          <p
                            className={`text-[11px] mt-0.5 ${
                              isSelected ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {category.hint}
                          </p>
                        </div>
                        <span
                          className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#C5922E] bg-[#C5922E] text-[#0B1F3A]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drag and Drop Upload Area */}
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-[#0B1F3A]">
                  2. Attach Files ({selectedDocCategory})
                </label>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isDragging) setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  className={`rounded-xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 ${
                    isDragging
                      ? 'border-[#C5922E] bg-[#FDF8EC]'
                      : 'border-slate-300 bg-[#F8FAFC] hover:border-[#0B1F3A]/50 hover:bg-[#F4F6F9]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#E5B95C] flex items-center justify-center mx-auto mb-3.5">
                    <Upload className="w-5 h-5" />
                  </div>

                  <p className="text-sm font-semibold text-[#0B1F3A]">
                    Drag and drop files here, or{' '}
                    <span className="text-[#9E6E16] underline underline-offset-2">
                      browse from your device
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Uploading under: <strong className="text-[#0B1F3A]">{selectedDocCategory}</strong>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-slate-500">
                    <span>Supported formats: PDF, JPG, PNG</span>
                    <span>Maximum size: 10 MB per file</span>
                    <span>Multiple files allowed</span>
                  </div>
                </div>

                {uploadError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Active File Upload Progress List */}
              {uploadingFiles.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-[#0B1F3A]">Preparing files...</p>
                  {uploadingFiles.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <Loader2 className="w-4 h-4 animate-spin text-[#C5922E] shrink-0" />
                          <span className="font-semibold text-[#0B1F3A] truncate">{item.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-600 tabular-nums shrink-0">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C5922E] transition-all duration-150"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Attached Documents List */}
              {documents.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
                      Attached Documents ({documents.length})
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Ready for submission
                    </span>
                  </div>

                  <div className="divide-y divide-slate-200/80 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#F8FAFC] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-[#0B1F3A]/6 text-[#0B1F3A] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-[#C5922E]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0B1F3A] truncate">
                              {doc.name}
                            </p>
                            <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                              <span>{doc.category}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{doc.formattedSize}</span>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          aria-label={`Remove ${doc.name}`}
                          className="min-w-[40px] min-h-[40px] rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reassurance Notice for Later Upload */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0B1F3A]">
                    Documents not ready right now? You can still proceed.
                  </p>
                  <p className="mt-0.5">
                    You may review and submit your application today and upload additional
                    transcripts, certificates, or your passport later using your Reference Number in
                    the Student Portal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REVIEW & FINAL SUBMISSION SCREEN */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200/90">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C5922E]">
                  Final Step · Verification
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#0B1F3A] tracking-[-0.02em] mt-0.5">
                  Review Your Application
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Please check every section below before submitting your official application. You
                  can edit any section without losing your progress.
                </p>
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-red-900">Submission Could Not Be Confirmed</p>
                      <p className="leading-relaxed">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* 1. Personal Details */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC] border-b border-slate-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
                      <User className="w-3.5 h-3.5 text-[#C5922E]" />
                      <span>Personal Details</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="text-xs font-semibold text-[#0B1F3A] hover:text-[#9E6E16] inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500">Full Legal Name</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">{formData.fullName}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Date of Birth</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                        {formatReadableDate(formData.dateOfBirth)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Country of Citizenship / Residence</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">{formData.country}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Current Highest Qualification</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                        {formData.currentQualification}
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* 2. Contact Information */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC] border-b border-slate-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
                      <Phone className="w-3.5 h-3.5 text-[#C5922E]" />
                      <span>Contact Information</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="text-xs font-semibold text-[#0B1F3A] hover:text-[#9E6E16] inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500">Email Address</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5 break-all">
                        {formData.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">WhatsApp / Phone Number</dt>
                      <dd className="font-semibold text-[#0B1F3A] font-mono tabular-nums mt-0.5">
                        {formData.whatsapp}
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* 3. Academic Preferences & Educational Background */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC] border-b border-slate-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
                      <GraduationCap className="w-3.5 h-3.5 text-[#C5922E]" />
                      <span>Academic Preferences & Background</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="text-xs font-semibold text-[#0B1F3A] hover:text-[#9E6E16] inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500">Preferred Study Level</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                        {formData.preferredStudyLevel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Preferred Field / Course of Study</dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                        {formData.preferredCourse}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-slate-500">
                        Previous School / College & Academic Background
                      </dt>
                      <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                        {formData.academicBackground}
                      </dd>
                    </div>
                    {formData.preferredUniversity.trim() && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-slate-500">Preferred University</dt>
                        <dd className="font-semibold text-[#0B1F3A] mt-0.5">
                          {formData.preferredUniversity}
                        </dd>
                      </div>
                    )}
                    {formData.message.trim() && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-slate-500">
                          Special Questions / Notes for Admissions Officers
                        </dt>
                        <dd className="text-slate-700 mt-0.5 whitespace-pre-wrap leading-relaxed">
                          {formData.message}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>

                {/* 4. Uploaded Documents */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC] border-b border-slate-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]">
                      <FileText className="w-3.5 h-3.5 text-[#C5922E]" />
                      <span>Uploaded Documents ({documents.length})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="text-xs font-semibold text-[#0B1F3A] hover:text-[#9E6E16] inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <div className="p-4 sm:p-5">
                    {documents.length > 0 ? (
                      <ul className="space-y-2">
                        {documents.map((doc) => (
                          <li
                            key={doc.id}
                            className="flex items-center justify-between gap-3 text-sm py-1.5 border-b border-slate-100 last:border-b-0"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FileCheck2 className="w-4 h-4 text-[#C5922E] shrink-0" />
                              <span className="font-medium text-[#0B1F3A] truncate">{doc.name}</span>
                            </div>
                            <span className="text-xs text-slate-500 shrink-0 tabular-nums">
                              {doc.category} · {doc.formattedSize}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-600">
                        No documents uploaded yet. You may submit your application now and upload
                        documents later through the Student Portal.
                      </p>
                    )}
                  </div>
                </section>
              </div>

              {/* Mandatory Accuracy Declaration Checkbox */}
              <div
                className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                  declarationError
                    ? 'bg-red-50/40 border-red-300'
                    : declarationAccepted
                    ? 'bg-[#FDFBF5] border-[#C5922E]/60'
                    : 'bg-[#F8FAFC] border-slate-200'
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => {
                      setDeclarationAccepted(e.target.checked);
                      if (e.target.checked) setDeclarationError(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0B1F3A] focus:ring-[#0B1F3A] shrink-0 cursor-pointer accent-[#0B1F3A]"
                  />
                  <span className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    <strong className="text-[#0B1F3A]">Applicant Declaration:</strong> I confirm
                    that all personal, contact, and academic information provided in this
                    application is accurate and complete to the best of my knowledge, and I
                    authorize Myers Global Pathways to review my profile for university admissions
                    guidance in India.
                  </span>
                </label>

                {declarationError && (
                  <p
                    className="mt-2.5 text-xs text-red-600 font-medium flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{declarationError}</span>
                  </p>
                )}
              </div>

              {/* Submit Button Area (Desktop + Inline) */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                    className="min-h-[48px] px-5 py-3 rounded-lg bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Documents</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[52px] px-7 py-3.5 rounded-lg bg-[#D4A13B] hover:bg-[#C5922E] text-[#0B1F3A] text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center justify-center gap-2.5 transition-all shadow-[0_6px_20px_rgba(197,146,46,0.28)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT OFFICIAL APPLICATION</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-1 text-[11px] text-slate-500 pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#0B1F3A]" />
                    <span>Confidential Admissions Registry</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5922E]" />
                    <span>Reference ID issued upon server confirmation</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation Controls for Steps 1–3 */}
          {currentStep !== 'review' && (
            <div className="hidden md:flex items-center justify-between gap-4 pt-8 mt-8 border-t border-slate-200/90">
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="min-h-[46px] px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>
                ) : mode === 'modal' && onCloseModal ? (
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="min-h-[46px] px-5 py-2.5 rounded-lg text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#0B1F3A]" />
                    <span>Your entries are preserved as you move between steps</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {hasVisitedReview && (
                  <button
                    type="button"
                    onClick={() => goToStep('review')}
                    className="min-h-[46px] px-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Return to Review
                  </button>
                )}

                <button
                  type="submit"
                  className="min-h-[46px] px-6 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>
                    {currentStep === 1
                      ? 'Continue to Academic Information'
                      : currentStep === 2
                      ? 'Continue to Documents'
                      : 'Review Application'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Inline Controls for Modal Mode (Steps 1-3) */}
          {mode === 'modal' && currentStep !== 'review' && (
            <div className="flex md:hidden items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200/90">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="min-h-[46px] px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-[#0B1F3A] text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="min-h-[46px] px-4 py-2.5 rounded-lg text-slate-600 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="flex-1 min-h-[46px] px-5 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentStep === 3 ? 'Review Application' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (Page Mode Only, Steps 1–3) */}
      {mode === 'page' && currentStep !== 'review' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-6px_24px_rgba(11,31,58,0.08)]">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="min-h-[46px] px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-[#0B1F3A] text-sm font-semibold inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 min-h-[46px] px-5 py-2.5 rounded-lg bg-[#0B1F3A] active:bg-[#132E54] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentStep === 1
                  ? 'Continue · Step 2 of 3'
                  : currentStep === 2
                  ? 'Continue · Step 3 of 3'
                  : 'Review Application'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
