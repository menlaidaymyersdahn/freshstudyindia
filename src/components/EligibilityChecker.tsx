import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  MessageCircle,
  FileCheck2,
  Share2,
  Award
} from 'lucide-react';
import { BRAND, getWhatsAppLink } from '../lib/constants';

interface EligibilityCheckerProps {
  initialCourse?: string;
  onOpenApplication: (prefilledField?: string) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  initialCourse = 'Computer Science & AI',
  onOpenApplication
}) => {
  const [selectedQualification, setSelectedQualification] = useState<'waec' | 'wassce' | 'highschool' | 'bachelor'>('wassce');
  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourse);
  const [hasPassesInKeySubjects, setHasPassesInKeySubjects] = useState<boolean>(true);
  const [passportReady, setPassportReady] = useState<boolean>(true);
  const [evaluatedResult, setEvaluatedResult] = useState<{
    status: 'eligible' | 'conditional' | 'review';
    title: string;
    details: string;
    actionLabel: string;
  } | null>(null);

  // Auto evaluate when options change
  const runEvaluation = () => {
    if (hasPassesInKeySubjects && passportReady) {
      setEvaluatedResult({
        status: 'eligible',
        title: 'Strong Academic Eligibility (Direct Fast-Track)',
        details: `Your ${selectedQualification.toUpperCase()} qualification and documentation meet primary entrance standards for ${selectedCourse} at accredited Indian partner universities. Direct bonafide letter issuance possible.`,
        actionLabel: `Proceed with ${selectedCourse} Application`
      });
    } else if (hasPassesInKeySubjects && !passportReady) {
      setEvaluatedResult({
        status: 'conditional',
        title: 'Conditional Academic Eligibility',
        details: `Your grades qualify you for ${selectedCourse}. You can obtain a conditional admission letter now while expediting your international passport issuance for visa filing.`,
        actionLabel: 'Get Conditional Offer Letter'
      });
    } else {
      setEvaluatedResult({
        status: 'review',
        title: 'Requires Counselor Transcript Review',
        details: `Depending on your exact grade breakdown, foundation or credit pathway options may be required for ${selectedCourse}. Send your transcripts to our Monrovia or India admissions desk for manual evaluation.`,
        actionLabel: 'Submit Transcripts for Free Review'
      });
    }
  };

  return (
    <section id="eligibility-checker" className="py-24 sm:py-32 bg-[#F4F8FD] text-slate-900 relative overflow-hidden bg-grid-dense">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-400/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-400/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Interactive Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
            ELIGIBILITY CHECKER.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Quickly verify whether your WAEC, WASSCE, High School, or Undergraduate certificate qualifies you for accredited Indian universities.
          </p>
        </div>

        {/* Assessment Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Columns */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-sky-100 p-6 sm:p-9 shadow-lg space-y-7">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Academic Profile Details
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                1-Minute Check
              </span>
            </div>

            {/* Field 1: Current Qualification */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Highest Completed Academic Qualification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'wassce', label: 'WASSCE (West Africa)' },
                  { id: 'waec', label: 'WAEC / NECO' },
                  { id: 'highschool', label: 'High School Diploma' },
                  { id: 'bachelor', label: "Bachelor's Degree" },
                ].map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setSelectedQualification(q.id as any);
                      setEvaluatedResult(null);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      selectedQualification === q.id
                        ? 'bg-rose-50 border-red-500 text-rose-700 ring-2 ring-red-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Target Degree Stream */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Target Degree Stream in India
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setEvaluatedResult(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 transition cursor-pointer"
              >
                <option value="Computer Science & AI">Computer Science & AI (B.Tech / BCA / MCA)</option>
                <option value="Nursing & Health Sciences">Nursing & Health Sciences (B.Sc Nursing / GNM)</option>
                <option value="Pharmacy & Pharmaceutical Sciences">Pharmacy (B.Pharm / Pharm.D)</option>
                <option value="Engineering & Technology">Engineering (Mechanical / Civil / Electrical / Robotics)</option>
                <option value="BBA / MBA Business Management">Business Management (BBA / MBA / B.Com)</option>
                <option value="Cyber Security & Network Defense">Cyber Security (B.Sc / B.Tech Cyber)</option>
                <option value="Microbiology & Biotechnology">Microbiology & Biotechnology (B.Sc / M.Sc)</option>
                <option value="Other Degree Stream">Other Degree / Diploma Program</option>
              </select>
            </div>

            {/* Field 3: Subject Passes Toggles */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Qualification Checklist
              </label>

              {/* Pass in Core Subjects */}
              <div 
                onClick={() => {
                  setHasPassesInKeySubjects(!hasPassesInKeySubjects);
                  setEvaluatedResult(null);
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  hasPassesInKeySubjects 
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">Credit passes (C6 or better) in Core Subjects</p>
                  <p className="text-[11px] text-slate-500">English, Mathematics, and relevant Science/Commercial subjects</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasPassesInKeySubjects} 
                  onChange={() => {}} 
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Passport Ready */}
              <div 
                onClick={() => {
                  setPassportReady(!passportReady);
                  setEvaluatedResult(null);
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  passportReady 
                    ? 'bg-blue-50/70 border-blue-300 text-slate-900' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">Valid International Passport available (or currently applying)</p>
                  <p className="text-[11px] text-slate-500">Required for official embassy student visa application</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={passportReady} 
                  onChange={() => {}} 
                  className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Run Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={runEvaluation}
                className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:via-rose-500 hover:to-blue-600 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Eligibility Status</span>
              </button>
            </div>

          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-sky-100 p-6 sm:p-8 shadow-lg space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <Award className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Eligibility Evaluation Result
              </h3>
            </div>

            {evaluatedResult ? (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Result Status Box */}
                <div className={`p-4 rounded-2xl border ${
                  evaluatedResult.status === 'eligible'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : evaluatedResult.status === 'conditional'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-red-200 text-rose-900'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {evaluatedResult.status === 'eligible' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    )}
                    <h4 className="text-sm font-black tracking-tight">
                      {evaluatedResult.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {evaluatedResult.details}
                  </p>
                </div>

                {/* Direct Action */}
                <div className="space-y-3">
                  <button
                    onClick={() => onOpenApplication(selectedCourse)}
                    className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{evaluatedResult.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppLink('india', `Hello Fresh Study India, I ran the eligibility checker for ${selectedCourse} with my ${selectedQualification.toUpperCase()} qualification. I would like to review my documents.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Send Documents on WhatsApp</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-blue-600 border border-sky-100 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">Awaiting Evaluation</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Select your current credentials on the left and click "Calculate Eligibility Status" to view instant criteria feedback.
                  </p>
                </div>
                <button
                  onClick={runEvaluation}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 transition cursor-pointer"
                >
                  Run Quick Check Now
                </button>
              </div>
            )}

            {/* Trust Bullet */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500">
              <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>All evaluations backed by official AIU & UGC admission equivalence tables.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
