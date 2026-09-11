import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, Bell, ShieldCheck, ArrowRight, Calendar, BookOpen, Compass } from 'lucide-react';
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
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  // Check if current user already subscribed in this browser
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
      setFeedbackMessage('Please enter a valid email address (e.g. name@example.com).');
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
      setFeedbackMessage(result.message || 'Thank you for subscribing to weekly Student Life updates!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setFeedbackMessage(err?.message || 'Unable to subscribe at this moment. Please try again.');
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
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 shadow-xl text-white ${
        variant === 'compact' ? 'p-5 sm:p-6' : 'p-6 sm:p-8 md:p-10'
      } text-left ${className}`}
    >
      {/* Decorative ambient gradients */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {status === 'success' ? (
          <div className="py-6 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                You're On The VIP List!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                {feedbackMessage}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              We've registered <span className="font-semibold text-white underline">{savedEmail}</span>. You will receive our next Thursday edition covering upcoming university fests, city dining secrets, and scholar interviews.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer border border-white/10"
              >
                Subscribe Another Email
              </button>
            </div>
          </div>
        ) : variant === 'compact' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-300/30 text-amber-300 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Get Weekly Student Life in India Updates
                </h4>
                <p className="text-xs text-slate-300">
                  Campus event radars, cultural survival tips & graduate stories.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Joining...' : 'Subscribe'}</span>
                </button>
              </div>

              {status === 'error' && (
                <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs">
                  {feedbackMessage}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Saved securely in Firestore • Weekly digest only • No spam</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content / Value Proposition */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-300 text-xs font-bold">
                <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Weekly Campus Digest</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Subscribe to <span className="text-amber-400">Student Life</span> in India
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Join over 1,200+ international students and applicants receiving weekly dispatches on upcoming inter-university fests, food and grocery hacks, metro navigation, and career success stories.
              </p>

              {/* Value highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium">Campus Fests</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                  <Compass className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">Cultural Guides</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">Scholar Journeys</span>
                </div>
              </div>
            </div>

            {/* Right Side: Subscription Form */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/15 p-6 sm:p-7 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label htmlFor="newsletter-email-input" className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-inner"
                    />
                  </div>
                </div>

                {/* Primary Topic of Interest */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Primary Interest (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'All', label: 'All Updates' },
                      { id: 'Campus Events', label: 'Campus Fests' },
                      { id: 'Cultural Guides', label: 'Living Guides' },
                      { id: 'Success Stories', label: 'Success Stories' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setInterest(item.id as any)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all text-center cursor-pointer ${
                          interest === item.id 
                            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs' 
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </span>
                  ) : (
                    <>
                      <span>Get Weekly Student Life Updates</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Privacy & Anti-Spam Tagline */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Stored securely in Firestore • No spam • Unsubscribe anytime</span>
                </div>

              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
