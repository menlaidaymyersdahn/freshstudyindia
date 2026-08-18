import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  UserCheck, 
  Lock, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { UserRole } from '../types';
import { 
  registerStudentWithFirebase, 
  loginWithFirebase, 
  loginWithGoogle,
  triggerPasswordReset, 
  triggerEmailVerification 
} from '../lib/firebase';
import firebaseConfigJson from '../../firebase-applet-config.json';

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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unverifiedEmailUser, setUnverifiedEmailUser] = useState<any | null>(null);

  // Unauthorized Domain specific state
  const [unauthorizedDomainState, setUnauthorizedDomainState] = useState<{
    domain: string;
    projectId: string;
  } | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

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
    setUnauthorizedDomainState(null);
  };

  const handlePortalChange = (newPortal: 'student' | 'counselor' | 'admin') => {
    setPortal(newPortal);
    setMode('login');
    handleResetState();
  };

  const handleCopyDomain = (domainToCopy: string) => {
    navigator.clipboard.writeText(domainToCopy);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2500);
  };

  const handleFillDemoCredentials = (roleType: 'student' | 'counselor' | 'admin') => {
    handlePortalChange(roleType);
    setMode('login');
    if (roleType === 'student') {
      setEmail('student@freshstudyindia.com');
      setPassword('student123456');
    } else if (roleType === 'counselor') {
      setEmail('counselor@freshstudyindia.com');
      setPassword('counselor123456');
    } else {
      setEmail('admin@freshstudyindia.com');
      setPassword('admin123456');
    }
    setError(null);
    setUnauthorizedDomainState(null);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    setUnauthorizedDomainState(null);

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
        message = 'Invalid email address or password. If you do not have an account yet, click "Create a Student account" below.';
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
    setUnauthorizedDomainState(null);

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
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        setUnauthorizedDomainState({
          domain: currentHost,
          projectId: firebaseConfigJson.projectId || 'project'
        });
      } else if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        setError('Google sign-in popup was closed before completing. Click below to try again.');
      } else if (err?.code === 'auth/popup-blocked') {
        setError('Google sign-in popup was blocked by your browser. Please allow popups for this website.');
      } else {
        console.warn('Google Sign-In note:', err?.message || err);
        setError(err.message || 'Google sign-in failed. Please use email/password login below.');
      }
    } finally {
      setLoading(false);
    }
  };

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

  return (
    <div className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#D9EAF7] my-auto max-h-[94vh] overflow-y-auto text-[#102A43]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#52667A] hover:text-[#102A43] rounded-full hover:bg-[#F5FAFF] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg text-white font-bold transition-colors ${
            portal === 'student' ? 'bg-gradient-to-tr from-[#1677FF] to-[#38BDF8] shadow-blue-500/20' :
            portal === 'counselor' ? 'bg-gradient-to-tr from-[#0284C7] to-[#06B6D4] shadow-cyan-500/20' :
            'bg-[#102A43] shadow-slate-500/20'
          }`}>
            {portal === 'student' && <User className="w-6 h-6" />}
            {portal === 'counselor' && <UserCheck className="w-6 h-6" />}
            {portal === 'admin' && <ShieldCheck className="w-6 h-6" />}
          </div>
          
          <h3 className="text-xl font-black text-[#102A43]">
            {portal === 'student' && 'Student Portal Authentication'}
            {portal === 'counselor' && 'Counselor Desk Portal'}
            {portal === 'admin' && 'Administrator Console'}
          </h3>
          <p className="text-xs text-[#52667A] mt-1 font-medium">
            {portal === 'student' && 'Access university applications, seat allocation tracking, and documents.'}
            {portal === 'counselor' && 'Access student inquiries, document verification, and seat routing.'}
            {portal === 'admin' && 'Super admin system controls, user role management, and university listings.'}
          </p>
        </div>

        {/* Portal Tab Selection */}
        <div className="grid grid-cols-3 gap-1 bg-[#F5FAFF] p-1 rounded-2xl mb-4 text-xs font-bold border border-[#D9EAF7]">
          <button
            type="button"
            onClick={() => handlePortalChange('student')}
            className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer ${
              portal === 'student' 
                ? 'bg-[#1677FF] text-white shadow-xs font-black' 
                : 'text-[#52667A] hover:text-[#102A43]'
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
                ? 'bg-[#0284C7] text-white shadow-xs font-black' 
                : 'text-[#52667A] hover:text-[#102A43]'
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
                ? 'bg-[#102A43] text-white shadow-xs font-black' 
                : 'text-[#52667A] hover:text-[#102A43]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* UNAUTHORIZED DOMAIN INSTRUCTIONAL BANNER */}
        {unauthorizedDomainState && (
          <div className="mb-4 p-4 bg-[#FFF8E6] border border-[#FDE68A] rounded-2xl text-[#92400E] text-xs space-y-2.5 shadow-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-[#78350F] block">
                  Google Auth Domain Authorization Required
                </span>
                <p className="text-[11px] leading-relaxed text-[#92400E] mt-0.5">
                  Firebase Authentication requires this domain to be added to Authorized Domains in your Firebase Console before Google Sign-In can execute.
                </p>
              </div>
            </div>

            {/* Current Domain Box with Copy */}
            <div className="bg-white p-2.5 rounded-xl border border-[#FCD34D] flex items-center justify-between gap-2">
              <div className="truncate font-mono text-[11px] font-bold text-[#78350F] select-all">
                {unauthorizedDomainState.domain || currentHost}
              </div>
              <button
                type="button"
                onClick={() => handleCopyDomain(unauthorizedDomainState.domain || currentHost)}
                className="px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-[10px] rounded-lg transition shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedDomain ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedDomain ? 'Copied!' : 'Copy Domain'}
              </button>
            </div>

            {/* Steps Guide */}
            <div className="text-[10px] text-[#78350F] bg-amber-100/50 p-2 rounded-lg space-y-1">
              <span className="font-bold block">How to enable in Firebase:</span>
              <div>1. Go to <strong>Firebase Console → Authentication → Settings</strong></div>
              <div>2. Scroll to <strong>Authorized domains</strong> → click <strong>Add domain</strong></div>
              <div>3. Paste the copied domain and click <strong>Save</strong></div>
            </div>

            {/* Direct Console Link & Email Login Bypass */}
            <div className="pt-1 flex flex-col gap-1.5">
              <a
                href={`https://console.firebase.google.com/project/${unauthorizedDomainState.projectId}/authentication/settings`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border border-[#FCD34D] rounded-xl text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition"
              >
                Open Firebase Auth Settings <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={() => handleFillDemoCredentials(portal)}
                className="w-full py-1.5 bg-[#1677FF] hover:bg-[#005cd6] text-white rounded-xl text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Zap className="w-3 h-3" /> Fill Instant Test Account ({portal})
              </button>
            </div>
          </div>
        )}

        {/* Regular Alerts & Notifications */}
        {error && !unauthorizedDomainState && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-[#EBF5FE] border border-[#BFDBFE] text-[#1677FF] text-xs rounded-2xl flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
            <span className="font-bold leading-relaxed">{successMsg}</span>
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

        {/* Quick 1-Click Demo Accounts Tray */}
        <div className="mb-4 p-2.5 bg-[#F5FAFF] border border-[#D9EAF7] rounded-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52667A] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#1677FF]" /> 1-Click Test Accounts:
            </span>
            <span className="text-[10px] text-[#1677FF] font-semibold">Instant Access</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleFillDemoCredentials('student')}
              className={`py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                portal === 'student'
                  ? 'bg-[#1677FF] text-white border-[#1677FF]'
                  : 'bg-white text-[#52667A] hover:bg-[#EBF5FE] border-[#D9EAF7]'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleFillDemoCredentials('counselor')}
              className={`py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                portal === 'counselor'
                  ? 'bg-[#0284C7] text-white border-[#0284C7]'
                  : 'bg-white text-[#52667A] hover:bg-[#EBF5FE] border-[#D9EAF7]'
              }`}
            >
              Counselor
            </button>
            <button
              type="button"
              onClick={() => handleFillDemoCredentials('admin')}
              className={`py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                portal === 'admin'
                  ? 'bg-[#102A43] text-white border-[#102A43]'
                  : 'bg-white text-[#52667A] hover:bg-[#EBF5FE] border-[#D9EAF7]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-[#102A43] block mb-1 text-xs">
                Full Name <span className="text-[#1677FF]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Emmanuel Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-[#F5FAFF] border border-[#D9EAF7] focus:bg-white focus:border-[#1677FF] rounded-2xl text-[#102A43] placeholder:text-[#52667A]/60 font-semibold shadow-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-[#102A43] block mb-1 text-xs">
              Email Address <span className="text-[#1677FF]">*</span>
            </label>
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
              className="w-full p-3 bg-[#F5FAFF] border border-[#D9EAF7] focus:bg-white focus:border-[#1677FF] rounded-2xl text-[#102A43] placeholder:text-[#52667A]/60 font-semibold shadow-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
            />
          </div>

          {mode !== 'forgot_password' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#102A43] text-xs">
                  Password <span className="text-[#1677FF]">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot_password'); handleResetState(); }}
                    className="text-[11px] font-bold text-[#1677FF] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-11 bg-[#F5FAFF] border border-[#D9EAF7] focus:bg-white focus:border-[#1677FF] rounded-2xl text-[#102A43] placeholder:text-[#52667A]/60 font-semibold shadow-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#52667A] hover:text-[#102A43] rounded-lg transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && portal === 'student' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#102A43] block mb-1 text-xs">Phone Number / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+231 88 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-[#F5FAFF] border border-[#D9EAF7] focus:bg-white focus:border-[#1677FF] rounded-2xl text-[#102A43] placeholder:text-[#52667A]/60 font-semibold shadow-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="font-bold text-[#102A43] block mb-1 text-xs">County in Liberia</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full p-3 bg-[#F5FAFF] border border-[#D9EAF7] focus:bg-white focus:border-[#1677FF] rounded-2xl text-[#102A43] font-semibold shadow-xs focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
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
            <div className="flex items-center justify-between text-[#52667A] font-semibold pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1677FF] focus:ring-[#1677FF] border-[#D9EAF7]"
                />
                <span className="text-xs">Remember Session</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-[#52667A]">
                <Lock className="w-3 h-3 text-[#1677FF]" /> SSL Encrypted
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 text-white font-extrabold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2 ${
              portal === 'student' ? 'bg-gradient-to-r from-[#1677FF] to-[#38BDF8] hover:from-[#005cd6] hover:to-[#0284c7] shadow-blue-500/20' :
              portal === 'counselor' ? 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369a1] hover:to-[#0891b2] shadow-cyan-500/20' :
              'bg-[#102A43] hover:bg-[#1e3a5f]'
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
              <div className="border-t border-[#D9EAF7] w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-[#52667A] uppercase tracking-wider">or</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-[#F5FAFF] hover:bg-[#EBF5FE] border border-[#D9EAF7] text-[#102A43] rounded-2xl font-bold text-xs shadow-xs hover:shadow transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
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
        <div className="mt-5 pt-4 border-t border-[#D9EAF7] text-center space-y-2">
          {mode === 'login' && portal === 'student' && (
            <button
              type="button"
              onClick={() => { setMode('register'); handleResetState(); }}
              className="text-xs text-[#1677FF] font-bold hover:underline cursor-pointer block w-full"
            >
              Don't have an account? Create a Student account
            </button>
          )}

          {mode === 'login' && (portal === 'counselor' || portal === 'admin') && (
            <div className="p-3 bg-[#F5FAFF] border border-[#D9EAF7] rounded-2xl text-[11px] text-[#52667A] text-left flex items-start gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A43] block mb-0.5">Registration Disabled</span>
                Public registration is disabled for {portal === 'admin' ? 'Administrator' : 'Counselor'} accounts. Staff accounts are provisioned by a Super Admin.
              </div>
            </div>
          )}

          {mode === 'register' && (
            <button
              type="button"
              onClick={() => { setMode('login'); handleResetState(); }}
              className="text-xs text-[#1677FF] font-bold hover:underline cursor-pointer block w-full"
            >
              Already registered? Return to {portal} login
            </button>
          )}

          {mode === 'forgot_password' && (
            <button
              type="button"
              onClick={() => { setMode('login'); handleResetState(); }}
              className="text-xs text-[#1677FF] font-bold hover:underline cursor-pointer block w-full"
            >
              Back to Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
