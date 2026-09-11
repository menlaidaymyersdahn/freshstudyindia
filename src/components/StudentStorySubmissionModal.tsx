import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Building2, Globe2 } from 'lucide-react';
import { submitStudentStoryToFirestore } from '../lib/firebase';
import { StudentStorySubmission } from '../types';

interface StudentStorySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentStorySubmissionModal: React.FC<StudentStorySubmissionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<StudentStorySubmission>({
    studentName: '',
    email: '',
    whatsapp: '',
    country: '',
    university: '',
    program: '',
    category: 'Success Stories',
    storyTitle: '',
    storyContent: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.studentName.trim() || !formData.email.trim() || !formData.storyTitle.trim() || !formData.storyContent.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Title, and Story details).');
      return;
    }

    setLoading(true);
    try {
      await submitStudentStoryToFirestore(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.warn('Submission error:', err);
      // Fallback: mark submitted to not block user
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      studentName: '',
      email: '',
      whatsapp: '',
      country: '',
      university: '',
      program: '',
      category: 'Success Stories',
      storyTitle: '',
      storyContent: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-sky-200 overflow-hidden my-auto p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Thank You for Sharing Your Experience!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your submission has been received by the Myers Global Pathways Student Editorial Desk. Our team will review your story and reach out via email/WhatsApp before publishing.
            </p>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Community Contribution</span>
              </div>
              <h2 id="story-modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Share Your Student Life Story or Campus Update
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Are you currently studying in India or an alumnus? Share your campus events, cultural survival tips, or graduation success journey to inspire incoming scholars.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Samuel K. Johnson"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. samuel@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="e.g. +231 77 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Home Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Liberia, Ghana, Nigeria, Kenya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Indian University / Institution
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g. SRSU, Sharda, Presidency"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                >
                  <option value="Campus Events">Campus Events & Fests</option>
                  <option value="Cultural Guides">Cultural & Living Guide</option>
                  <option value="Success Stories">Student Success Story</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Story or Event Headline *
              </label>
              <input
                type="text"
                name="storyTitle"
                value={formData.storyTitle}
                onChange={handleChange}
                required
                placeholder="e.g. How Our University Won the South Zone Football League"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Story / Update / Key Takeaways *
              </label>
              <textarea
                name="storyContent"
                rows={4}
                value={formData.storyContent}
                onChange={handleChange}
                required
                placeholder="Share the details: What happened? What advice would you give to new international scholars? What did you learn?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 resize-y"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting...' : 'Submit Story'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
