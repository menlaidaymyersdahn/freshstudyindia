import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCw, Lock, AlertCircle } from 'lucide-react';

export const LegalView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms' | 'refund'>('privacy');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3 border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Trust & Compliance Policy</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Legal & Governance Information
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Fresh Study India operates with full transparency regarding admission processing, student data security, and refund guarantees.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center gap-2 mb-8 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveSubTab('privacy')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'privacy'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          Privacy Policy
        </button>

        <button
          onClick={() => setActiveSubTab('terms')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'terms'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Terms & Conditions
        </button>

        <button
          onClick={() => setActiveSubTab('refund')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'refund'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Refund Policy
        </button>
      </div>

      {/* Policy Content Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        {activeSubTab === 'privacy' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" /> Privacy & Student Data Security Policy
            </h2>
            <p className="text-xs text-slate-500 font-medium">Last updated: August 2026</p>
            
            <h3 className="text-base font-bold text-slate-900 mt-4">1. Information We Collect</h3>
            <p>
              We collect personal identification information including student names, contact details, passports, academic transcripts (10th, 12th, WASSCE, Bachelor's degrees), and entrance test scorecards (JEE, NEET, CUET, CAT) strictly for processing university applications in India.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">2. Purpose of Data Processing</h3>
            <p>
              Your data is encrypted using SSL and stored securely in Firebase Firestore servers. It is strictly shared with authorized university admissions desks, JoSAA/CSAB counseling boards, and Ministry of External Affairs / FRRO visa authorities.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">3. Data Retention & Deletion Rights</h3>
            <p>
              Students reserve the right to request full export or complete deletion of their uploaded document locker at any time by contacting admissions@freshstudyindia.com.
            </p>
          </div>
        )}

        {activeSubTab === 'terms' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Student Terms & Service Agreement
            </h2>
            <p className="text-xs text-slate-500 font-medium">Last updated: August 2026</p>

            <h3 className="text-base font-bold text-slate-900 mt-4">1. Authorization for Admission Representation</h3>
            <p>
              By submitting an application through Fresh Study India, you authorize our designated education counselors to present your credentials to partnered Indian public and private universities.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">2. Accuracy of Credentials</h3>
            <p>
              Students must ensure all uploaded transcripts, certificates, and test scores are authentic. Any submission of forged or altered academic documents will result in immediate disqualification and revocation of provisional admission letters.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">3. Visa & FRRO Regulations</h3>
            <p>
              While Fresh Study India assists in obtaining provisional admission letters and embassy endorsement letters, final Student Visa issuance rests with the respective Indian Embassy / Consulate.
            </p>
          </div>
        )}

        {activeSubTab === 'refund' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600" /> Admission Guarantee & Refund Policy
            </h2>
            <p className="text-xs text-slate-500 font-medium">Last updated: August 2026</p>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-xs text-emerald-900">
              <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block">100% Seat Allocation Guarantee</span>
                If Fresh Study India fails to secure a valid university admission letter for an eligible candidate within the stipulated application window, all initial registration fees are 100% refundable.
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-4">1. University Tuition Deposit Refunds</h3>
            <p>
              Tuition fee deposits paid directly to university accounts follow the specific university's UGC refund guidelines (typically 100% refund if requested prior to commencement of classes).
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">2. Processing Timeline</h3>
            <p>
              Approved refunds are processed to the original bank account or mobile wallet within 5 to 7 business days.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
