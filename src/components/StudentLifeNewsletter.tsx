import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { subscribeToStudentLifeNewsletter } from '../lib/firebase';

interface StudentLifeNewsletterProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const StudentLifeNewsletter: React.FC<StudentLifeNewsletterProps> = ({
  className = '',
  variant = 'full'
}) => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'All' | 'Campus Events' | 'Cultural Guides' | 'Success Stories'>('All');
  const [frequency] = useState<'weekly' | 'monthly'>('weekly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    try {
      const alreadySubscribed = localStorage.getItem('myers_newsletter_subscribed');
      const cachedEmail = localStorage.getItem('myers_newsletter_email');
      if (alreadySubscribed === 'true' && cachedEmail) {
        setSavedEmail(cachedEmail);
      }
    } catch (_) {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setFeedbackMessage('');

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setFeedbackMessage('Enter a valid email address, such as name@example.com.');
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeToStudentLifeNewsletter(trimmed, {
        interest,
        frequency,
        source: 'student_life_blog_newsletter_card'
      });

      setStatus('success');
      setSavedEmail(trimmed);
      setFeedbackMessage(result.message || 'Your email has been added to our weekly student life updates.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setFeedbackMessage(err?.message || 'Unable to subscribe right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFeedbackMessage('');
  };

  return (
    <div
      id="student-life-newsletter"
      className={`rounded-xl bg-white border border-slate-200/90 text-[#0F172A] shadow-[0_2px_12px_rgba(11,31,58,0.04)] ${
        variant === 'compact' ? 'p-6' : 'p-6 lg:p-8'
      } text-left ${className}`}
    >
      {status === 'success' ? (
        <div className="py-4 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A] tracking-[-0.015em]">
              Subscription confirmed
            </h3>
            <p className="text-sm text-slate-600">
              {feedbackMessage}
            </p>
          </div>

          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            Updates will be sent to <span className="font-semibold text-[#0B1F3A]">{savedEmail}</span> covering intake dates, campus guides, and student stories.
          </p>

          <div>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-[#F4F6F9] hover:bg-slate-200/70 text-sm font-semibold text-[#0B1F3A] border border-slate-200 transition-ui cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      ) : variant === 'compact' ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-display text-base font-bold text-[#0B1F3A]">
              Weekly student life updates
            </h4>
            <p className="text-sm text-slate-600">
              Campus events, living guides, and admission intake reminders.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-200 focus:border-[#0B1F3A] focus:bg-white focus:outline-none text-sm text-[#0F172A] placeholder:text-slate-400 transition-ui"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui cursor-pointer disabled:opacity-50 shrink-0"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-700 font-medium">
                {feedbackMessage}
              </p>
            )}

            <p className="text-xs text-slate-500">
              Weekly digest only. Unsubscribe at any time.
            </p>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Content */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs sm:text-sm text-[#9A6D17] font-semibold">
              Weekly Campus Digest
            </p>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-[-0.02em] leading-[1.18]">
              Receive Student Life &amp; Intake Updates From India
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Get practical notes on university intake calendars, hostel housing, daily living budgets, and graduate interviews directly from our admissions desk.
            </p>

            <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600">
              <span>Campus events</span>
              <span className="text-[#C5922E]" aria-hidden="true">·</span>
              <span>Living and housing guides</span>
              <span className="text-[#C5922E]" aria-hidden="true">·</span>
              <span>Graduate stories</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6 rounded-xl bg-[#F4F6F9] border border-slate-200 p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="newsletter-email-input" className="block text-xs sm:text-sm font-semibold text-[#0B1F3A]">
                  Email address
                </label>
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#0B1F3A] focus:outline-none text-sm text-[#0F172A] placeholder:text-slate-400 transition-ui"
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs sm:text-sm font-semibold text-[#0B1F3A]">
                  Topic preference (optional)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'All', label: 'All updates' },
                    { id: 'Campus Events', label: 'Campus events' },
                    { id: 'Cultural Guides', label: 'Living guides' },
                    { id: 'Success Stories', label: 'Graduate stories' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInterest(item.id as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-ui text-left cursor-pointer ${
                        interest === item.id
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#0B1F3A]/40 hover:text-[#0B1F3A]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <p className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {feedbackMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[46px]"
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe to Weekly Updates'}</span>
                {!loading && <ArrowRight className="w-4 h-4 text-[#E5B95C]" />}
              </button>

              <p className="text-xs text-slate-500">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};
