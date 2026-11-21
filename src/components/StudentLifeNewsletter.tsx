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
      className={`rounded-2xl bg-white border border-[#181A1F]/[0.08] text-[#181A1F] ${
        variant === 'compact' ? 'p-6' : 'p-6 lg:p-8'
      } text-left ${className}`}
    >
      {status === 'success' ? (
        <div className="py-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-[#181A1F] tracking-[-0.015em]">
              Subscription confirmed
            </h3>
            <p className="text-sm text-[#4F535C]">
              {feedbackMessage}
            </p>
          </div>

          <p className="text-sm text-[#4F535C] max-w-xl leading-relaxed">
            Updates will be sent to <span className="font-medium text-[#181A1F]">{savedEmail}</span> covering intake dates, campus guides, and student stories.
          </p>

          <div>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE4] text-sm font-medium text-[#181A1F] border border-[#181A1F]/[0.12] transition-ui cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      ) : variant === 'compact' ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-medium text-[#181A1F]">
              Weekly student life updates
            </h4>
            <p className="text-sm text-[#4F535C]">
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
                className="flex-1 px-3 py-2 rounded-lg bg-[#F7F5F0] border border-[#181A1F]/[0.12] focus:border-[#A63A24] focus:bg-white focus:outline-none text-sm text-[#181A1F] placeholder:text-[#6E727D] transition-ui"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[#181A1F] hover:bg-[#2C2F38] text-white text-sm font-medium transition-ui cursor-pointer disabled:opacity-50 shrink-0"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-[#A63A24]">
                {feedbackMessage}
              </p>
            )}

            <p className="text-xs text-[#6E727D]">
              Weekly digest only. Unsubscribe at any time.
            </p>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Content */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm text-[#A63A24] font-medium">
              Weekly campus digest
            </p>

            <h3 className="text-2xl sm:text-3xl font-medium text-[#181A1F] tracking-[-0.02em] leading-[1.18]">
              Receive student life and intake updates from India
            </h3>

            <p className="text-sm sm:text-base text-[#4F535C] leading-relaxed">
              Get practical notes on university intake calendars, hostel housing, daily living budgets, and graduate interviews directly from our admissions desk.
            </p>

            <div className="pt-2 border-t border-[#181A1F]/[0.08] flex flex-wrap gap-6 text-sm text-[#4F535C]">
              <span>Campus events</span>
              <span>Living and housing guides</span>
              <span>Graduate interviews</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6 rounded-xl bg-[#F7F5F0] border border-[#181A1F]/[0.08] p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="newsletter-email-input" className="block text-sm font-medium text-[#181A1F]">
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
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#181A1F]/[0.14] focus:border-[#A63A24] focus:outline-none text-sm text-[#181A1F] placeholder:text-[#6E727D] transition-ui"
                />
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-medium text-[#181A1F]">
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
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-ui text-left cursor-pointer ${
                        interest === item.id
                          ? 'bg-white text-[#A63A24] border-[#A63A24]'
                          : 'bg-transparent text-[#4F535C] border-[#181A1F]/[0.10] hover:bg-white hover:text-[#181A1F]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <p className="p-3 rounded-lg bg-white border border-[#A63A24]/30 text-[#A63A24] text-xs">
                  {feedbackMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#181A1F] hover:bg-[#2C2F38] text-white text-sm font-medium transition-ui inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe to weekly updates'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-xs text-[#6E727D]">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};
