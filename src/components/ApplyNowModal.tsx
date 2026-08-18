import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  UserPlus, 
  Upload, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  FileText, 
  Building2, 
  ShieldCheck,
  MapPin,
  GraduationCap,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';
import { DocumentFile, ActiveTab } from '../types';

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactAdminSubmit?: (name: string, phone: string, email: string, county: string, courseLevel: string, desiredCourse: string, message: string) => void;
  onCreateAccountSubmit?: (name: string, email: string, phone: string, targetUni: string) => void;
  onUploadDocSubmit?: (doc: DocumentFile) => void;
  onUploadDocument?: (doc: DocumentFile) => void;
  onCreateTicket?: (subject: string, category: string, priority: 'Low' | 'Medium' | 'High' | 'Urgent') => void;
  onLoginSuccess?: (role: 'student' | 'admin') => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const liberiaCounties = [
  'Montserrado',
  'Nimba',
  'Bong',
  'Lofa',
  'Grand Bassa',
  'Margibi',
  'Maryland',
  'Grand Gedeh',
  'Sinoe',
  'River Gee',
  'Grand Cape Mount',
  'Bomi',
  'Rivercess',
  'Grand Kru',
  'Gbarpolu'
];

export const ApplyNowModal: React.FC<ApplyNowModalProps> = ({
  isOpen,
  onClose,
  onContactAdminSubmit,
  onCreateAccountSubmit,
  onUploadDocSubmit,
  onUploadDocument,
  onCreateTicket,
  onLoginSuccess,
  setActiveTab
}) => {
  const [activeTab, setActiveTabTab] = useState<'contact' | 'account' | 'upload'>('contact');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states for Contact Admin
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCounty, setContactCounty] = useState('Montserrado');
  const [courseLevel, setCourseLevel] = useState('BSc / Undergraduate');
  const [desiredCourse, setDesiredCourse] = useState('');
  const [contactMessage, setContactMessage] = useState('I want to apply for admission in top Indian universities.');

  // Form states for Create Account
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Form states for Upload Doc
  const [docCategory, setDocCategory] = useState<DocumentFile['category']>('International Passport');
  const [docFile, setDocFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContactAdminSubmit) {
      onContactAdminSubmit(contactName, contactPhone, contactEmail, contactCounty, courseLevel, desiredCourse, contactMessage);
    } else if (onCreateTicket) {
      onCreateTicket(
        `Admission Inquiry for ${courseLevel} in ${desiredCourse || 'Specified Program'} (County: ${contactCounty})`,
        'Admission Support',
        'High'
      );
    }
    setSuccessMessage(`Inquiry sent to Fresh Study India Admin! Details saved for ${contactName} from ${contactCounty} County for ${courseLevel} (${desiredCourse || 'General'}). An admission counselor will contact you shortly.`);
    setSubmittedSuccess(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreateAccountSubmit) {
      onCreateAccountSubmit(regName, regEmail, regPhone, 'General Indian University');
    }
    if (onLoginSuccess) {
      onLoginSuccess('student');
    }
    setSuccessMessage('Student account created successfully! Redirecting to your Student Portal...');
    setSubmittedSuccess(true);
    setTimeout(() => {
      onClose();
      setActiveTab('student-dashboard');
    }, 1200);
  };

  const handleDocUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fileName = docFile ? docFile.name : `${docCategory.replace(/[^a-zA-Z0-9]/g, '_')}_Document.pdf`;
    const fileSize = docFile ? `${(docFile.size / (1024 * 1024)).toFixed(1)} MB` : '2.1 MB';

    const newDoc: DocumentFile = {
      id: `doc-${Date.now()}`,
      name: fileName,
      category: docCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      size: fileSize
    };

    if (onUploadDocSubmit) {
      onUploadDocSubmit(newDoc);
    } else if (onUploadDocument) {
      onUploadDocument(newDoc);
    }
    setSuccessMessage(`Document "${fileName}" (${docCategory}) uploaded successfully! Sent to Fresh Study India verification officers.`);
    setSubmittedSuccess(true);
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 relative shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Fresh Study India Admission Desk
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Apply Now to Universities in India
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Contact our admission counselors, create your student account, or upload required documents.
          </p>
        </div>

        {/* Action Options Selector Tabs */}
        {!submittedSuccess && (
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setActiveTabTab('contact'); handleReset(); }}
              className={`py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'contact' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>1. Contact Admin</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTabTab('account'); handleReset(); }}
              className={`py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'account' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Create Account</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTabTab('upload'); handleReset(); }}
              className={`py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'upload' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Upload Doc</span>
            </button>
          </div>
        )}

        {/* SUCCESS MESSAGE DISPLAY */}
        {submittedSuccess ? (
          <div className="text-center py-6 px-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Action Confirmed!</h4>
            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed font-medium">
              {successMessage}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Perform Another Action
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* TAB 1: CONTACT ADMIN */}
            {activeTab === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-[11px]">Direct Admin Helpline: +91 98765 43210</span>
                  </div>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Full Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emmanuel Johnson"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+231 88 000 0000"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> County in Liberia *
                    </label>
                    <select
                      value={contactCounty}
                      onChange={(e) => setContactCounty(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    >
                      {liberiaCounties.map(c => (
                        <option key={c} value={c}>{c} County</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Course Level / Category *
                    </label>
                    <select
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    >
                      <option value="BSc / Undergraduate">BSc / Bachelor's Degree (Undergraduate)</option>
                      <option value="Master / Postgraduate">Master's Degree (Postgraduate / MBA)</option>
                      <option value="PhD / Doctorate">PhD / Doctoral Research</option>
                      <option value="Diploma / Vocational">Diploma / Technical Vocational</option>
                      <option value="Certificate Course">Short-Term Certificate Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Specific Course Desired *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Computer Science, Nursing, Civil Engineering, Public Health, Cyber Security"
                      value={desiredCourse}
                      onChange={(e) => setDesiredCourse(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Additional Notes / Message for Admin</label>
                  <textarea
                    rows={2}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-emerald-100 focus:outline-none transition"
                    placeholder="Provide any extra details about your academic background or funding..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Send className="w-4 h-4" /> Send Application Inquiry to Admin
                </button>
              </form>
            )}

            {/* TAB 2: CREATE ACCOUNT */}
            {activeTab === 'account' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <p className="text-slate-700 text-[11px] bg-indigo-50 p-3 rounded-2xl border border-indigo-200 text-indigo-950 leading-relaxed font-semibold">
                  Register your account to access your personal student portal, upload marksheets, and track admission status.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Full Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Blessing Dennis"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+231 88 000 0000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Create Password *</label>
                    <div className="relative">
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="Create a strong password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full p-3 pr-11 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl text-slate-900 placeholder:text-slate-500 font-semibold shadow-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800 rounded-lg transition cursor-pointer"
                        title={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <UserPlus className="w-4 h-4" /> Create Student Account & Access Portal
                </button>
              </form>
            )}

            {/* TAB 3: UPLOAD DOCUMENT */}
            {activeTab === 'upload' && (
              <form onSubmit={handleDocUploadSubmit} className="space-y-4 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl text-amber-900 leading-relaxed">
                  <span className="font-bold text-xs block mb-1">Required Admission Documents:</span>
                  <p className="text-[11px] text-amber-800">
                    Upload your International Passport, High School Diploma, WASSCE Certificate, Transcripts (Grades 10-12), and Letters of Recommendation (LOR).
                  </p>
                </div>

                {/* Quick Category Selector */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Select Document Type to Upload *</label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as DocumentFile['category'])}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-amber-500 font-bold text-slate-800 text-xs"
                  >
                    <option value="International Passport">1. International Passport (Data Page)</option>
                    <option value="High School Diploma">2. High School Graduation Diploma</option>
                    <option value="WASSCE Certificate">3. WASSCE Certificate / WAEC Scratch Card</option>
                    <option value="Transcript (Grades 10 to 12)">4. High School Transcript (Grades 10 to 12)</option>
                    <option value="Letter of Recommendation (LOR)">5. Letter of Recommendation (LOR)</option>
                    <option value="Statement of Purpose (SOP)">6. Statement of Purpose (SOP) / Essay</option>
                    <option value="Birth Certificate / National ID">7. Birth Certificate / National ID Card</option>
                    <option value="Entrance Test Scorecard (JEE/NEET/CUET/CAT)">8. Entrance Scorecard (JEE / NEET / CUET / SAT)</option>
                    <option value="Other Certificate">9. Other Academic / Professional Certificate</option>
                  </select>
                </div>

                {/* Drag and Drop File Upload Area */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Choose File (PDF, PNG, JPG)</label>
                  <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-5 text-center bg-amber-50/40 hover:bg-amber-50/70 transition cursor-pointer relative">
                    <input
                      type="file"
                      required
                      onChange={(e) => setDocFile(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="font-bold text-slate-800 text-xs">
                      {docFile ? docFile.name : `Click here to attach ${docCategory}`}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Supports PDF, DOCX, JPG or PNG up to 15MB
                    </p>
                  </div>
                </div>

                {/* List of document slots overview */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block mb-2">
                    Checklist of Necessary Documents to Submit
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-600">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>International Passport</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>High School Diploma</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WASSCE Certificate</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Transcripts (Grades 10-12)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Recommendation Letter (LOR)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Statement of Purpose</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> Submit Document to Verification Officer
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};
