import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StudentDocument } from '../types';
import { 
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
  Compass,
  ChevronRight,
  GraduationCap,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { syncApplicationToFirestore } from '../lib/firebase';
import { useSEO } from '../hooks/useSEO';
import { COMPANY } from '../config/company';

export const ApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const presetCourse = searchParams.get('course') || searchParams.get('field') || '';
  const presetLevel = searchParams.get('level') || 'Undergraduate (Bachelor’s)';

  useSEO({
    title: 'Start Your University Application | Myers Global Pathways',
    description: 'Submit your international student admission application for top recognized universities in India. Free guidance and step-by-step document verification.',
    canonicalPath: '/apply',
    keywords: 'Apply Study in India, India University Application Form, International Student Admissions, Myers Global Pathways Apply'
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    dateOfBirth: '',
    academicBackground: '',
    currentQualification: 'High School Diploma / Secondary Certificate',
    preferredStudyLevel: presetLevel,
    preferredCourse: presetCourse,
    preferredUniversity: '',
    message: ''
  });

  // Update formData if query params change
  useEffect(() => {
    if (presetCourse || presetLevel) {
      setFormData(prev => ({
        ...prev,
        preferredCourse: presetCourse || prev.preferredCourse,
        preferredStudyLevel: presetLevel || prev.preferredStudyLevel
      }));
    }
  }, [presetCourse, presetLevel]);

  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [selectedDocCategory, setSelectedDocCategory] = useState<StudentDocument['category']>('Academic Transcripts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    trackingId: string;
    fullName: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      // 10MB limit per file
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
          category: selectedDocCategory,
          dataUrl: reader.result as string,
          verified: false,
          uploadedAt: new Date().toISOString()
        };

        setDocuments(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedTrackingId = `MGP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const applicationPayload = {
      trackingId: generatedTrackingId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: formData.whatsapp.trim(),
      country: formData.country.trim(),
      dateOfBirth: formData.dateOfBirth,
      academicBackground: formData.academicBackground.trim(),
      currentQualification: formData.currentQualification,
      preferredStudyLevel: formData.preferredStudyLevel,
      preferredCourse: formData.preferredCourse.trim(),
      preferredUniversity: formData.preferredUniversity.trim() || 'Best Recommended Accredited University',
      message: formData.message.trim(),
      status: 'Application Submitted' as const,
      documents: documents.map(d => ({
        id: d.id,
        name: d.name,
        size: d.size,
        formattedSize: d.formattedSize,
        type: d.type,
        category: d.category,
        dataUrl: d.dataUrl,
        verified: false,
        uploadedAt: d.uploadedAt
      })),
      documentsCount: documents.length,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      // 1. Sync to local Express storage and trigger automated notification
      let backendSuccess = false;
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationPayload)
        });
        if (response.ok) {
          backendSuccess = true;
        }
      } catch (err) {
        console.warn('Local express api submission error:', err);
      }

      // 2. Sync to Firebase Firestore cloud database
      let firestoreId = null;
      try {
        firestoreId = await syncApplicationToFirestore(applicationPayload);
      } catch (err) {
        console.warn('Firestore sync error:', err);
      }

      // 3. Store in client-side persistence as backup
      const localStore = JSON.parse(localStorage.getItem('mgp_applications') || '[]');
      localStore.push({ ...applicationPayload, id: firestoreId || generatedTrackingId });
      localStorage.setItem('mgp_applications', JSON.stringify(localStore));

      setSubmissionResult({
        trackingId: generatedTrackingId,
        fullName: formData.fullName
      });

    } catch (err: any) {
      console.error('Error submitting application:', err);
      setErrorMessage(err.message || 'Submission encountered an issue. Please check details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF3FC] text-slate-900 pt-28 pb-20">
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
          <span className="text-blue-800 font-bold">Start Your Application</span>
        </div>

        {/* Title Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-300 shadow-md mb-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-200">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Direct Admissions Intake 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Start Your University Application
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Submit your profile for recognized Indian universities. Our admissions desk verifies eligibility within 24–48 hours.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-sky-50 px-3 py-2 rounded-xl border border-sky-200 text-xs text-blue-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official Verification Guaranteed</span>
            </div>
          </div>

          {/* Success Submission State */}
          {submissionResult ? (
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl font-black text-slate-950">
                  Application Received Successfully!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Congratulations, <strong className="text-slate-900">{submissionResult.fullName}</strong>. Your application dossier has been securely recorded.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 max-w-md mx-auto space-y-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                  Your Official Application Reference ID
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-blue-900 block tracking-wider select-all">
                  {submissionResult.trackingId}
                </span>
                <p className="text-[11px] text-amber-900 font-medium">
                  Save this Tracking ID to check status and upload additional documents.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => navigate(`/student-portal?trackingId=${submissionResult.trackingId}`)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Open in Student Portal</span>
                </button>

                <button
                  onClick={() => {
                    setSubmissionResult(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      whatsapp: '',
                      country: '',
                      dateOfBirth: '',
                      academicBackground: '',
                      currentQualification: 'High School Diploma / Secondary Certificate',
                      preferredStudyLevel: 'Undergraduate (Bachelor’s)',
                      preferredCourse: '',
                      preferredUniversity: '',
                      message: ''
                    });
                    setDocuments([]);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-sky-300 text-slate-800 hover:text-blue-900 text-xs font-bold transition-all cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="pt-6 space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Applicant Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 pb-2 border-b border-sky-100">
                  <span>1. Applicant Personal Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Full Legal Name (as in Passport/ID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Emmanuel Flomo"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. applicant@gmail.com"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. +231 88 123 4567"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Country of Citizenship / Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Liberia, Ghana, Sierra Leone, Nigeria..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Current Highest Qualification *
                    </label>
                    <select
                      value={formData.currentQualification}
                      onChange={e => setFormData({ ...formData, currentQualification: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    >
                      <option value="High School Diploma / WAEC / WASSCE">High School Diploma / WAEC / WASSCE</option>
                      <option value="Associate Degree / Diploma">Associate Degree / Diploma</option>
                      <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                      <option value="Master’s Degree">Master’s Degree</option>
                      <option value="Other Certification">Other Certification</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Academic Interests & Course Preference */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 pb-2 border-b border-sky-100">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. Target Academic Program in India</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Preferred Study Level *
                    </label>
                    <select
                      value={formData.preferredStudyLevel}
                      onChange={e => setFormData({ ...formData, preferredStudyLevel: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    >
                      <option value="Undergraduate (Bachelor’s)">Undergraduate (Bachelor’s Degree - 3 or 4 Years)</option>
                      <option value="Postgraduate (Master’s)">Postgraduate (Master’s Degree - 2 Years)</option>
                      <option value="Doctoral (Ph.D.)">Doctoral (Ph.D. / Research)</option>
                      <option value="Diploma / Polytechnic">Diploma / Polytechnic (1-3 Years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Preferred Field / Course of Study *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.preferredCourse}
                      onChange={e => setFormData({ ...formData, preferredCourse: e.target.value })}
                      placeholder="e.g. B.Sc. Computer Science, MBA, Nursing, Civil Eng..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Previous School / College & Academic Background *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.academicBackground}
                      onChange={e => setFormData({ ...formData, academicBackground: e.target.value })}
                      placeholder="e.g. Monrovia Central High School (Graduated 2024, WAEC GPA 3.4)"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Special Questions or Notes for Admissions Officers (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention any specific university preferences, budget considerations, or scholarship inquiries..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-sky-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 transition-all font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Document Attachment Dropzone */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-sky-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>3. Attach Academic Documents (Optional / Can upload later)</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">PDF, JPG, PNG (Max 10MB)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] text-slate-600 font-bold mb-1">
                      Document Category
                    </label>
                    <select
                      value={selectedDocCategory}
                      onChange={e => setSelectedDocCategory(e.target.value as StudentDocument['category'])}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-sky-200 text-xs text-slate-900 font-medium"
                    >
                      <option value="Academic Transcripts">Academic Transcripts</option>
                      <option value="Academic Certificates">Academic Certificates (WAEC/Diploma)</option>
                      <option value="Passport">Passport Data Page</option>
                      <option value="Other Supporting Documents">Other Supporting Document</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-600 font-bold mb-1">
                      Select File(s)
                    </label>
                    <label className="border-2 border-dashed border-sky-300 hover:border-blue-500 rounded-xl p-3 bg-sky-50/50 hover:bg-sky-50 flex items-center justify-center gap-2 cursor-pointer transition-all text-xs font-semibold text-blue-800">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Click or Drag & Drop Documents</span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Attached Files ({documents.length}):
                    </span>
                    <div className="space-y-1.5">
                      {documents.map(doc => (
                        <div key={doc.id} className="p-2.5 rounded-xl bg-white border border-sky-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="font-semibold text-slate-900 truncate">{doc.name}</span>
                            <span className="text-[10px] text-slate-500 shrink-0">({doc.formattedSize})</span>
                            <span className="px-2 py-0.5 rounded-md bg-sky-100 text-blue-800 text-[10px] font-bold shrink-0">
                              {doc.category}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.id)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button & Assurance */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Application to Admissions Registry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Official Application Now</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 text-center">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>256-Bit Encrypted & Privacy Protected</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MailCheck className="w-3 h-3 text-blue-600" />
                    <span>Instant Confirmation Dispatch</span>
                  </span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default ApplyPage;
