import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight,
  LogOut,
  Mail,
  ShieldAlert
} from 'lucide-react';
import { ActiveTab, UserRole, UserProfile } from '../types';
import { 
  registerStudentWithFirebase, 
  loginWithFirebase, 
  loginWithGoogle,
  triggerPasswordReset, 
  triggerEmailVerification 
} from '../lib/firebase';

interface LoginPortalViewProps {
  portal: 'student' | 'counselor' | 'admin';
  onLoginSuccess: (role: UserRole) => void;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  userProfile: UserProfile | null;
  onLogout: () => Promise<void>;
}

export const LoginPortalView: React.FC<LoginPortalViewProps> = ({
  portal,
  onLoginSuccess,
  setActiveTab,
  userRole,
  userProfile,
  onLogout
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Montserrado');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unverifiedEmailUser, setUnverifiedEmailUser] = useState<any | null>(null);

  // Reset errors when portal or mode changes
  useEffect(() => {
    setError(null);
    setSuccessMsg(null);
    setUnverifiedEmailUser(null);
    // Force mode to login if counselor or admin portal
    if (portal !== 'student' && mode === 'register') {
      setMode('login');
    }
  }, [portal, mode]);

  const handlePortalSwitch = (targetPortal: 'student' | 'counselor' | 'admin') => {
    setError(null);
    setSuccessMsg(null);
    if (targetPortal === 'student') {
      setActiveTab('student-login');
      window.history.pushState({}, '', '/login');
    } else if (targetPortal === 'counselor') {
      setActiveTab('counselor-login');
      window.history.pushState({}, '', '/counselor/login');
    } else {
      setActiveTab('admin-login');
      window.history.pushState({}, '', '/admin/login');
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'forgot_password') {
        if (!email.trim()) {
          setError('Please enter your email address to reset password.');
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
          setError('Public registration is strictly disabled for staff portals. Staff accounts must be provisioned by an Administrator.');
          setLoading(false);
          return;
        }

        if (!name.trim() || !email.trim() || !password) {
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

        setSuccessMsg(`Student account created for ${profile.name}! Redirecting to Student Dashboard...`);
        onLoginSuccess('student');
        setTimeout(() => {
          setActiveTab('student-dashboard');
          window.history.pushState({}, '', '/student-dashboard');
        }, 1200);

      } else {
        // LOGIN MODE
        const { user, profile } = await loginWithFirebase(email, password);

        // Check Firestore Role against current login portal route
        if (portal === 'admin' && profile.role !== 'admin' && profile.role !== 'superadmin' && profile.role !== 'super-admin') {
          setError(`Access Denied: Account (${email}) is registered as ${profile.role.toUpperCase()} and does not have Administrator privileges.`);
          setLoading(false);
          return;
        }

        if (portal === 'counselor' && profile.role !== 'counselor' && profile.role !== 'admin' && profile.role !== 'superadmin' && profile.role !== 'super-admin') {
          setError(`Access Denied: Account (${email}) is registered as ${profile.role.toUpperCase()} and does not have Counselor Desk authorization.`);
          setLoading(false);
          return;
        }

        if (!user.emailVerified) {
          setUnverifiedEmailUser(user);
          setSuccessMsg(`Signed in as ${profile.name}. Email verification is pending.`);
        } else {
          setSuccessMsg(`Welcome back, ${profile.name}! Redirecting to ${profile.role.toUpperCase()} Dashboard...`);
        }

        onLoginSuccess(profile.role);

        setTimeout(() => {
          if (profile.role === 'admin' || profile.role === 'superadmin' || profile.role === 'super-admin') {
            setActiveTab('admin-dashboard');
            window.history.pushState({}, '', '/admin-dashboard');
          } else if (profile.role === 'counselor') {
            setActiveTab('counselor-dashboard');
            window.history.pushState({}, '', '/counselor-dashboard');
          } else {
            setActiveTab('student-dashboard');
            window.history.pushState({}, '', '/student-dashboard');
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let message = err.message || 'Authentication failed. Please check credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please try again.';
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

      if (portal === 'admin' && profile.role !== 'admin' && profile.role !== 'superadmin' && profile.role !== 'super-admin') {
        setError(`Access Denied: Google Account (${user.email}) is registered as ${profile.role.toUpperCase()} and does not have Administrator privileges.`);
        setLoading(false);
        return;
      }

      if (portal === 'counselor' && profile.role !== 'counselor' && profile.role !== 'admin' && profile.role !== 'superadmin' && profile.role !== 'super-admin') {
        setError(`Access Denied: Google Account (${user.email}) is registered as ${profile.role.toUpperCase()} and does not have Counselor Desk authorization.`);
        setLoading(false);
        return;
      }

      setSuccessMsg(`Welcome, ${profile.name}! Signed in via Google.`);
      onLoginSuccess(profile.role);

      setTimeout(() => {
        if (profile.role === 'admin' || profile.role === 'superadmin' || profile.role === 'super-admin') {
          setActiveTab('admin-dashboard');
          window.history.pushState({}, '', '/admin-dashboard');
        } else if (profile.role === 'counselor') {
          setActiveTab('counselor-dashboard');
          window.history.pushState({}, '', '/counselor-dashboard');
        } else {
          setActiveTab('student-dashboard');
          window.history.pushState({}, '', '/student-dashboard');
        }
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

  // Render Already Logged In State
  const isLoggedIn = userRole !== 'guest' && userProfile;
  const isUnauthorizedRole = isLoggedIn && (
    (portal === 'admin' && userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'super-admin') ||
    (portal === 'counselor' && userRole !== 'counselor' && userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'super-admin')
  );

  return (
    <div className="max-w-xl mx-auto my-8 px-4 sm:px-6">
      
      {/* Route Header Banner */}
      <div className="text-center mb-8 space-y-2">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-xl text-white font-bold transition-transform hover:scale-105 ${
          portal === 'student' ? 'bg-emerald-600 shadow-emerald-200' :
          portal === 'counselor' ? 'bg-amber-600 shadow-amber-200' :
          'bg-indigo-600 shadow-indigo-200'
        }`}>
          {portal === 'student' && <User className="w-8 h-8" />}
          {portal === 'counselor' && <UserCheck className="w-8 h-8" />}
          {portal === 'admin' && <ShieldCheck className="w-8 h-8" />}
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {portal === 'student' && 'Student Portal Authentication'}
          {portal === 'counselor' && 'Counselor Desk Authentication'}
          {portal === 'admin' && 'Administrator Console Sign-In'}
        </h1>

        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          {portal === 'student' && 'Official portal for university application tracking, document uploads, and Study in India (SII) scholarship status.'}
          {portal === 'counselor' && 'Authorized personnel access for student dossier reviews, document verification, and university placement.'}
          {portal === 'admin' && 'Restricted super admin system controls, staff provision management, and institutional settings.'}
        </p>
      </div>

      {/* Login Portal Selector Navigation */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm mb-6 grid grid-cols-3 gap-1 text-xs font-extrabold">
        <button
          onClick={() => handlePortalSwitch('student')}
          className={`py-3 px-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            portal === 'student'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="truncate">Student (/login)</span>
        </button>

        <button
          onClick={() => handlePortalSwitch('counselor')}
          className={`py-3 px-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            portal === 'counselor'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span className="truncate">Counselor (/counselor/login)</span>
        </button>

        <button
          onClick={() => handlePortalSwitch('admin')}
          className={`py-3 px-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            portal === 'admin'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="truncate">Admin (/admin/login)</span>
        </button>
      </div>

      {/* Card Wrapper */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">

        {/* State A: Logged in user with Role Mismatch (Access Denied) */}
        {isUnauthorizedRole ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">Access Denied - Role Restriction</h2>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              You are currently signed in as <span className="font-bold text-slate-900">{userProfile?.email}</span> with the <span className="font-black uppercase text-emerald-600">{userRole}</span> role. You do not have permissions to access the <span className="font-bold capitalize">{portal}</span> portal.
            </p>

            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs text-left space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Security Notice:</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Staff portals require authenticated staff credentials. If you are a staff member, please sign out and log in with your counselor or administrator email.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('student-dashboard');
                  window.history.pushState({}, '', '/student-dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                Go to My Student Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLogout}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out to Switch Account
              </button>
            </div>
          </div>
        ) : isLoggedIn ? (
          /* State B: Logged in user with Matching Role */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">Already Authenticated</h2>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              You are signed in as <span className="font-bold text-slate-900">{userProfile?.name}</span> (<span className="font-semibold text-slate-700">{userProfile?.email}</span>) with <span className="font-black uppercase text-emerald-600">{userRole}</span> privileges.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (userRole === 'admin') {
                    setActiveTab('admin-dashboard');
                    window.history.pushState({}, '', '/admin-dashboard');
                  } else if (userRole === 'counselor') {
                    setActiveTab('counselor-dashboard');
                    window.history.pushState({}, '', '/counselor-dashboard');
                  } else {
                    setActiveTab('student-dashboard');
                    window.history.pushState({}, '', '/student-dashboard');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                Proceed to {userRole.toUpperCase()} Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLogout}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* State C: Guest Login / Register Form */
          <>
            {/* Mode Selector for Student Portal */}
            {portal === 'student' ? (
              <div className="flex border-b border-slate-100 mb-6 font-bold text-xs">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`pb-3 px-4 border-b-2 transition cursor-pointer ${
                    mode === 'login'
                      ? 'border-emerald-600 text-emerald-600 font-black'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Sign In to Student Account
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`pb-3 px-4 border-b-2 transition cursor-pointer ${
                    mode === 'register'
                      ? 'border-emerald-600 text-emerald-600 font-black'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Create Student Account
                </button>
              </div>
            ) : (
              /* Public Registration Disabled Banner for Counselor & Admin */
              <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block text-slate-900">Public Registration Disabled</span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Staff and Counselor accounts cannot be self-registered publicly. Log-in credentials are issued directly by Super Administrators.
                  </p>
                </div>
              </div>
            )}

            {/* Error & Success Messages */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{successMsg}</span>
              </div>
            )}

            {unverifiedEmailUser && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Email Verification Notice</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Please verify your email address ({unverifiedEmailUser.email}) to ensure complete application access.
                </p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition"
                >
                  <RefreshCw className="w-3 h-3" /> Resend Verification Email
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              {mode === 'register' && portal === 'student' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emmanuel Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Email Address *
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
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {mode !== 'forgot_password' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-700">Password *</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot_password')}
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
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              )}

              {mode === 'register' && portal === 'student' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+231 889425645"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">County in Liberia</label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
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
                      defaultChecked
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <span>Remember Login Session</span>
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Lock className="w-3 h-3" /> SSL Encrypted
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-white font-extrabold rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-3 ${
                  portal === 'student' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                  portal === 'counselor' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' :
                  'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                {mode === 'login' && `Sign In to ${portal.toUpperCase()} Portal`}
                {mode === 'register' && `Register Student Account`}
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
                  className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-xs shadow-sm hover:shadow transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
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

            {mode === 'forgot_password' && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
                >
                  ← Back to Login
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
