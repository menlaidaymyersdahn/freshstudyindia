import React, { useState, useEffect } from 'react';
import { X, User, ShieldCheck, Mail, CheckCircle2, AlertCircle, RefreshCw, UserCheck, Lock } from 'lucide-react';
import { UserRole } from '../types';
import { 
  registerStudentWithFirebase, 
  registerStaffWithFirebase,
  loginWithFirebase, 
  loginWithGoogle,
  triggerPasswordReset, 
  triggerEmailVerification 
} from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
  initialPortal?: 'student' | 'counselor' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialPortal = 'student'
}) => {
  const [portal, setPortal] = useState<'student' | 'counselor' | 'admin'>(initialPortal);
  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Montserrado');
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unverifiedEmailUser, setUnverifiedEmailUser] = useState<any | null>(null);

  useEffect(() => {
    if (initialPortal) {
      setPortal(initialPortal);
    }
  }, [initialPortal, isOpen]);

  if (!isOpen) return null;

  const handleResetState = () => {
    setError(null);
    setSuccessMsg(null);
    setUnverifiedEmailUser(null);
  };

  const handlePortalChange = (newPortal: 'student' | 'counselor' | 'admin') => {
    setPortal(newPortal);
    // Force mode to login if counselor or admin portal is selected
    setMode('login');
    handleResetState();
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'forgot_password') {
        if (!email) {
          setError('Please enter your email address to reset your password.');
          setLoading(false);
          return;
        }
        await triggerPasswordReset(email);
        setSuccessMsg(`Password reset link sent to ${email}. Please check your inbox.`);
        setLoading(false);
        return;
      }

      if (mode === 'register') {
        if (portal !== 'student') {
          setError('Public registration is strictly disabled for Counselor and Administrator portals. Staff accounts must be created by a Super Admin.');
          setLoading(false);
          return;
        }

        if (!name || !email || !password) {
          setError('Please fill in all required fields.');
          setLoading(false);
          return;
        }

        const { user, profile } = await registerStudentWithFirebase(
          email,
          password,
          name,
          phone,
          county
        );

        setSuccessMsg(`Account created for ${profile.name}! A verification email has been sent to ${user.email}.`);
        onLoginSuccess('student');
        setTimeout(() => {
          onClose();
        }, 1500);

      } else {
        // LOGIN MODE WITH STRICT ROLE-BASED ACCESS CONTROL (RBAC)
        const { user, profile } = await loginWithFirebase(email, password);

        // Role verification against active portal tab
        if (portal === 'counselor' && profile.role !== 'counselor' && profile.role !== 'admin') {
          setError(`Access Denied: Account (${email}) is registered as a Student. Please switch to the Student Portal tab.`);
          setLoading(false);
          return;
        }

        if (portal === 'admin' && profile.role !== 'admin') {
          setError(`Access Denied: Account (${email}) does not have Administrator privileges.`);
          setLoading(false);
          return;
        }

        if (!user.emailVerified) {
          setUnverifiedEmailUser(user);
          setSuccessMsg(`Signed in as ${profile.name}. Notice: Email address is pending verification.`);
        } else {
          setSuccessMsg(`Welcome back, ${profile.name}! Accessing ${profile.role.toUpperCase()} Portal...`);
        }

        onLoginSuccess(profile.role);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let message = err.message || 'Authentication failed. Please verify credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email address or password. Please try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'An account with this email address already exists. Please log in.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters long.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmailUser) return;
    try {
      setLoading(true);
      await triggerEmailVerification(unverifiedEmailUser);
      setSuccessMsg(`Verification email resent to ${unverifiedEmailUser.email}!`);
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const { user, profile } = await loginWithGoogle(portal);

      // Verify role
      if (portal === 'counselor' && profile.role !== 'counselor' && profile.role !== 'admin') {
        setError(`Access Denied: Google Account (${user.email}) is registered as a Student. Please switch to the Student Portal tab.`);
        setLoading(false);
        return;
      }

      if (portal === 'admin' && profile.role !== 'admin') {
        setError(`Access Denied: Google Account (${user.email}) does not have Administrator privileges.`);
        setLoading(false);
        return;
      }

      setSuccessMsg(`Welcome, ${profile.name}! Signed in via Google.`);
      onLoginSuccess(profile.role);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        setError('Sign-in cancelled or popup closed. Please click below to try again.');
      } else if (err?.code === 'auth/popup-blocked') {
        setError('Google sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else {
        console.warn('Google Sign-In note:', err?.message || err);
        setError(err.message || 'Google sign-in failed. Please try standard login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 my-auto max-h-[94vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg text-white font-bold transition-colors ${
            portal === 'student' ? 'bg-emerald-600 shadow-emerald-200' :
            portal === 'counselor' ? 'bg-amber-600 shadow-amber-200' :
            'bg-indigo-600 shadow-indigo-200'
          }`}>
            {portal === 'student' && <User className="w-6 h-6" />}
            {portal === 'counselor' && <UserCheck className="w-6 h-6" />}
            {portal === 'admin' && <ShieldCheck className="w-6 h-6" />}
          </div>
          
          <h3 className="text-xl font-extrabold text-slate-900">
            {portal === 'student' && 'Student Portal Authentication'}
            {portal === 'counselor' && 'Counselor Desk Portal'}
            {portal === 'admin' && 'Administrator Console'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {portal === 'student' && 'Access university applications, seat allocation tracking, and documents.'}
            {portal === 'counselor' && 'Access student inquiries, document verification, and seat routing.'}
            {portal === 'admin' && 'Super admin system controls, user role management, and university listings.'}
          </p>
        </div>

        {/* Portal Tab Selection */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => handlePortalChange('student')}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer ${
              portal === 'student' 
                ? 'bg-white text-emerald-700 shadow-sm font-extrabold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handlePortalChange('counselor')}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer ${
              portal === 'counselor' 
                ? 'bg-white text-amber-700 shadow-sm font-extrabold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Counselor</span>
          </button>

          <button
            type="button"
            onClick={() => handlePortalChange('admin')}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer ${
              portal === 'admin' 
                ? 'bg-white text-indigo-700 shadow-sm font-extrabold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Alerts & Notifications */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-2xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-2xl flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Email Verification Banner */}
        {unverifiedEmailUser && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Email Verification Required</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Please verify your email address ({unverifiedEmailUser.email}) to unlock full feature access.
            </p>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={loading}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Resend Verification Email
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Sharma or Emmanuel Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder={
                portal === 'student' ? 'student@example.com' :
                portal === 'counselor' ? 'counselor@freshstudyindia.com' :
                'admin@freshstudyindia.com'
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {mode !== 'forgot_password' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Password *</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot_password'); handleResetState(); }}
                    className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          )}

          {mode === 'register' && portal === 'student' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+231 88 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">County in Liberia</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                >
                  <option value="Montserrado">Montserrado</option>
                  <option value="Nimba">Nimba</option>
                  <option value="Bong">Bong</option>
                  <option value="Lofa">Lofa</option>
                  <option value="Grand Bassa">Grand Bassa</option>
                  <option value="Margibi">Margibi</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Grand Gedeh">Grand Gedeh</option>
                </select>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-slate-600 font-medium pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span>Remember Session</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Lock className="w-3 h-3" /> SSL Encrypted
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2 ${
              portal === 'student' ? 'bg-emerald-600 hover:bg-emerald-700' :
              portal === 'counselor' ? 'bg-amber-600 hover:bg-amber-700' :
              'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {mode === 'login' && `Login to ${portal.toUpperCase()} Portal`}
            {mode === 'register' && `Register ${portal.toUpperCase()} Account`}
            {mode === 'forgot_password' && 'Send Password Reset Email'}
          </button>
        </form>

        {/* Google Authentication Option */}
        {mode !== 'forgot_password' && (
          <div className="mt-4 space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-xs shadow-sm hover:shadow transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google Sign-In</span>
            </button>
          </div>
        )}

        {/* Mode Switchers */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center space-y-2">
          {mode === 'login' && portal === 'student' && (
            <button
              type="button"
              onClick={() => { setMode('register'); handleResetState(); }}
              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer block w-full"
            >
              Don't have an account? Create a Student account
            </button>
          )}

          {mode === 'login' && (portal === 'counselor' || portal === 'admin') && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Registration Disabled</span>
                Public registration is disabled for {portal === 'admin' ? 'Administrator' : 'Counselor'} accounts. Staff accounts are provisioned by a Super Admin.
              </div>
            </div>
          )}

          {mode === 'register' && (
            <button
              type="button"
              onClick={() => { setMode('login'); handleResetState(); }}
              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer block w-full"
            >
              Already registered? Return to {portal} login
            </button>
          )}

          {mode === 'forgot_password' && (
            <button
              type="button"
              onClick={() => { setMode('login'); handleResetState(); }}
              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer block w-full"
            >
              Back to Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
