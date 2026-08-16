import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Trash2, 
  FileText, 
  Search, 
  RefreshCw, 
  Plus, 
  X, 
  ArrowLeft, 
  Paperclip, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Reply,
  Forward,
  User,
  LogOut,
  ChevronRight,
  Filter
} from 'lucide-react';
import { 
  signInWithGoogleGmail, 
  getGmailAccessToken, 
  setGmailAccessToken,
  disconnectGmail, 
  listGmailMessages, 
  getGmailMessage, 
  sendGmailMessage, 
  trashGmailMessage, 
  modifyGmailLabels,
  fetchGmailProfile,
  fetchGmailLabels,
  ADMISSION_EMAIL_TEMPLATES,
  GMAIL_SCOPES
} from '../lib/gmailService';
import { GmailEmailMessage, GmailLabelItem, UserProfile } from '../types';

interface GmailViewProps {
  userProfile?: UserProfile | null;
  onConnectSuccess?: (user: any) => void;
}

type MailFolder = 'INBOX' | 'STARRED' | 'SENT' | 'DRAFT' | 'TRASH' | 'ADMISSION';

export const GmailView: React.FC<GmailViewProps> = ({ userProfile, onConnectSuccess }) => {
  // Auth state
  const [accessToken, setAccessToken] = useState<string | null>(getGmailAccessToken());
  const [userEmail, setUserEmail] = useState<string>(userProfile?.email || '');
  const [userName, setUserName] = useState<string>(userProfile?.name || 'User');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Mailbox data
  const [currentFolder, setCurrentFolder] = useState<MailFolder>('INBOX');
  const [messages, setMessages] = useState<GmailEmailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailEmailMessage | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterQuery, setActiveFilterQuery] = useState<string | null>(null);

  // Compose State
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMsg, setSendSuccessMsg] = useState<string | null>(null);

  // Confirmation Modals (MANDATORY User Confirmation for Workspace Operations)
  const [confirmSendOpen, setConfirmSendOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize or check token
  useEffect(() => {
    const existing = getGmailAccessToken();
    if (existing) {
      setAccessToken(existing);
      loadInbox(existing, currentFolder, activeFilterQuery);
    }
  }, []);

  // Handle Google OAuth Sign-in
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await signInWithGoogleGmail();
      setAccessToken(result.accessToken);
      setUserEmail(result.user.email || '');
      setUserName(result.user.displayName || result.profile?.name || 'User');
      if (onConnectSuccess) {
        onConnectSuccess(result.user);
      }
      await loadInbox(result.accessToken, 'INBOX', null);
    } catch (err: any) {
      console.error('Sign-in failure:', err);
      setAuthError(err.message || 'Unable to connect to Google Account. Please check browser popups and try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Disconnect
  const handleDisconnect = async () => {
    await disconnectGmail();
    setAccessToken(null);
    setMessages([]);
    setSelectedMessage(null);
  };

  // Load emails
  const loadInbox = async (token: string, folder: MailFolder, customQuery: string | null = null) => {
    setIsLoadingMessages(true);
    setAuthError(null);
    try {
      let q = '';
      let labelIds: string[] = [];

      if (customQuery) {
        q = customQuery;
      } else {
        switch (folder) {
          case 'INBOX':
            labelIds = ['INBOX'];
            break;
          case 'STARRED':
            labelIds = ['STARRED'];
            break;
          case 'SENT':
            labelIds = ['SENT'];
            break;
          case 'DRAFT':
            labelIds = ['DRAFT'];
            break;
          case 'TRASH':
            labelIds = ['TRASH'];
            break;
          case 'ADMISSION':
            q = 'subject:(admission OR university OR visa OR "Fresh Study" OR scholarship OR bonafide OR application)';
            break;
        }
      }

      if (searchQuery.trim()) {
        q = q ? `${q} ${searchQuery.trim()}` : searchQuery.trim();
      }

      const res = await listGmailMessages(token, {
        labelIds: labelIds.length > 0 ? labelIds : undefined,
        q: q || undefined,
        maxResults: 20
      });

      setMessages(res.messages);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      if (err.message?.includes('401') || err.message?.includes('invalid_token')) {
        setAccessToken(null);
        setGmailAccessToken(null);
        setAuthError('Session expired. Please reconnect your Gmail account.');
      } else {
        setAuthError(err.message || 'Unable to fetch Gmail messages.');
      }
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Change folder
  const handleFolderChange = (folder: MailFolder) => {
    setCurrentFolder(folder);
    setSelectedMessage(null);
    setActiveFilterQuery(null);
    if (accessToken) {
      loadInbox(accessToken, folder, null);
    }
  };

  // Search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadInbox(accessToken, currentFolder, activeFilterQuery);
    }
  };

  // Toggle Star
  const handleToggleStar = async (msg: GmailEmailMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!accessToken) return;

    const newStarred = !msg.isStarred;
    // Optimistic UI update
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isStarred: newStarred } : m));
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage(prev => prev ? { ...prev, isStarred: newStarred } : null);
    }

    try {
      if (newStarred) {
        await modifyGmailLabels(accessToken, msg.id, ['STARRED'], []);
      } else {
        await modifyGmailLabels(accessToken, msg.id, [], ['STARRED']);
      }
    } catch (err) {
      console.error('Failed to toggle star:', err);
    }
  };

  // Apply Template into Compose
  const handleSelectTemplate = (template: typeof ADMISSION_EMAIL_TEMPLATES[0]) => {
    setComposeSubject(template.subject);
    setComposeBody(template.body);
  };

  // Click "Send" button -> opens user confirmation modal (MANDATORY User Confirmation)
  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject) {
      alert('Please fill in both Recipient and Subject.');
      return;
    }
    setConfirmSendOpen(true);
  };

  // Confirmed Send Execution
  const handleExecuteSend = async () => {
    if (!accessToken) return;
    setIsSending(true);
    try {
      await sendGmailMessage(accessToken, {
        to: composeTo,
        subject: composeSubject,
        body: composeBody
      });
      setConfirmSendOpen(false);
      setComposeOpen(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setSendSuccessMsg('Email sent successfully via Gmail!');
      setTimeout(() => setSendSuccessMsg(null), 5000);
      // Reload sent or current folder
      loadInbox(accessToken, currentFolder, activeFilterQuery);
    } catch (err: any) {
      console.error('Send failure:', err);
      alert('Failed to send email: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSending(false);
    }
  };

  // Click Delete/Trash -> opens user confirmation modal
  const handleInitiateDelete = (messageId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setItemToDeleteId(messageId);
    setConfirmDeleteOpen(true);
  };

  // Confirmed Delete Execution
  const handleExecuteDelete = async () => {
    if (!accessToken || !itemToDeleteId) return;
    setIsDeleting(true);
    try {
      await trashGmailMessage(accessToken, itemToDeleteId);
      setMessages(prev => prev.filter(m => m.id !== itemToDeleteId));
      if (selectedMessage?.id === itemToDeleteId) {
        setSelectedMessage(null);
      }
      setConfirmDeleteOpen(false);
      setItemToDeleteId(null);
    } catch (err: any) {
      console.error('Delete failure:', err);
      alert('Failed to move email to Trash: ' + (err.message || 'Unknown error'));
    } finally {
      setIsDeleting(false);
    }
  };

  // Open message & mark as read
  const handleOpenMessage = async (msg: GmailEmailMessage) => {
    setSelectedMessage(msg);
    if (msg.isUnread && accessToken) {
      // Mark as read in state & Gmail
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isUnread: false } : m));
      modifyGmailLabels(accessToken, msg.id, [], ['UNREAD']).catch(err => console.warn('Mark read error:', err));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-500/20 shadow-xs">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Official Gmail Desk
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Workspace Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Send university follow-ups, receive admission offers, and communicate directly with Indian institutions.
            </p>
          </div>
        </div>

        {accessToken && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setComposeTo('');
                setComposeSubject('');
                setComposeBody('');
                setComposeOpen(true);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Email</span>
            </button>
            <button
              onClick={() => loadInbox(accessToken, currentFolder, activeFilterQuery)}
              disabled={isLoadingMessages}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer"
              title="Refresh Inbox"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleDisconnect}
              className="px-3 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-900 transition flex items-center gap-1 cursor-pointer"
              title="Sign out of Gmail"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        )}
      </div>

      {/* Alert / Notification Bar */}
      {sendSuccessMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{sendSuccessMsg}</span>
        </div>
      )}

      {authError && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center justify-between gap-3 text-amber-800 dark:text-amber-200 text-xs font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{authError}</span>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700 cursor-pointer"
          >
            Reconnect
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      {!accessToken ? (
        /* CONNECT GOOGLE ACCOUNT HERO */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-xs">
          <div className="w-20 h-20 bg-red-500/10 text-red-600 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20 shadow-xs">
            <Mail className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-red-200 dark:border-red-900">
              Google Workspace OAuth Integration
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Connect Your Official Gmail Account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Link your Gmail to read official communication from Indian universities, submit visa documents, and receive acceptance letters in real time.
            </p>
          </div>

          {/* Official Google Sign In Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-300 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>{isAuthenticating ? 'Connecting to Google...' : 'Sign in with Google (Gmail)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Secure Token</span>
              <p className="text-[11px]">In-memory authentication caching without persistent secret exposure.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Real-time Inbox</span>
              <p className="text-[11px]">Synchronize application notifications, offer letters, and counselor updates.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Safe Confirmation</span>
              <p className="text-[11px]">Every sent email or deletion requires explicit user confirmation.</p>
            </div>
          </div>
        </div>
      ) : (
        /* CONNECTED MAILBOX INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: FOLDERS & TEMPLATES */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* User Profile Badge */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
              </div>
            </div>

            {/* Folder Navigation */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs space-y-1">
              {[
                { id: 'INBOX' as MailFolder, label: 'Inbox', icon: Inbox },
                { id: 'ADMISSION' as MailFolder, label: 'Admission Emails', icon: GraduationCap, highlight: true },
                { id: 'STARRED' as MailFolder, label: 'Starred', icon: Star },
                { id: 'SENT' as MailFolder, label: 'Sent', icon: Send },
                { id: 'DRAFT' as MailFolder, label: 'Drafts', icon: FileText },
                { id: 'TRASH' as MailFolder, label: 'Trash', icon: Trash2 },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentFolder === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleFolderChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : item.highlight
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fast Quick Templates */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Quick Admission Templates
              </span>
              <div className="space-y-1.5">
                {ADMISSION_EMAIL_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      handleSelectTemplate(tmpl);
                      setComposeOpen(true);
                    }}
                    className="w-full text-left p-2.5 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-100 dark:border-slate-800 transition flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{tmpl.title}</span>
                    <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT MAIN AREA: LIST OR MESSAGE VIEW */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Search and Filter bar */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in emails (sender, university, admission, visa...)"
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      if (accessToken) loadInbox(accessToken, currentFolder, activeFilterQuery);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>

            {/* Email Viewer OR Message List */}
            {selectedMessage ? (
              /* DETAIL READING VIEW */
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
                
                {/* Top Action Controls */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to list
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleStar(selectedMessage, e)}
                      className={`p-2 rounded-xl transition cursor-pointer ${
                        selectedMessage.isStarred 
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
                      }`}
                      title="Star email"
                    >
                      <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => {
                        setComposeTo(selectedMessage.from);
                        setComposeSubject(`Re: ${selectedMessage.subject.replace(/^Re:\s*/i, '')}`);
                        setComposeBody(`\n\n--- On ${selectedMessage.date}, ${selectedMessage.fromName} wrote: ---\n>${selectedMessage.bodyText || selectedMessage.snippet}`);
                        setComposeOpen(true);
                      }}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Reply className="w-3.5 h-3.5" /> Reply
                    </button>
                    <button
                      onClick={(e) => handleInitiateDelete(selectedMessage.id, e)}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                      title="Move to Trash"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Email Subject & Meta */}
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center text-xs">
                        {selectedMessage.fromName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white">
                          {selectedMessage.fromName}
                        </p>
                        <p className="text-[11px] text-slate-500">From: {selectedMessage.from}</p>
                      </div>
                    </div>
                    <div className="text-right text-[11px]">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">{selectedMessage.date}</p>
                      <p className="text-slate-400">To: {selectedMessage.to || 'me'}</p>
                    </div>
                  </div>
                </div>

                {/* Message Body Content */}
                <div className="pt-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed min-h-[220px] bg-white dark:bg-slate-900 rounded-2xl">
                  {selectedMessage.bodyHtml ? (
                    <div 
                      className="prose dark:prose-invert max-w-none break-words text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: selectedMessage.bodyHtml }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap font-sans">
                      {selectedMessage.bodyText || selectedMessage.snippet || 'No message content available.'}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* EMAIL LIST VIEW */
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                
                {isLoadingMessages ? (
                  <div className="p-16 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Loading messages from Gmail API...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-16 text-center space-y-4">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                      <Inbox className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">No Messages Found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        No emails found in this folder. Click Compose to write a new email or change your search filter.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => handleOpenMessage(msg)}
                        className={`p-4 sm:px-6 transition flex items-center gap-3 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                          msg.isUnread ? 'bg-emerald-50/40 dark:bg-emerald-950/20 font-bold' : ''
                        }`}
                      >
                        {/* Star Button */}
                        <button
                          onClick={(e) => handleToggleStar(msg, e)}
                          className="text-slate-300 hover:text-amber-400 transition cursor-pointer shrink-0"
                        >
                          <Star className={`w-4 h-4 ${msg.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>

                        {/* Unread Pill */}
                        {msg.isUnread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        )}

                        {/* Sender & Snippet */}
                        <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center">
                          <div className="sm:col-span-4 truncate">
                            <span className={`text-xs ${msg.isUnread ? 'font-black text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                              {msg.fromName || msg.from}
                            </span>
                          </div>

                          <div className="sm:col-span-8 truncate">
                            <span className={`text-xs ${msg.isUnread ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                              {msg.subject}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-normal ml-2 truncate">
                              — {msg.snippet}
                            </span>
                          </div>
                        </div>

                        {/* Date & Actions */}
                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {msg.date.split(',')[0]}
                          </span>
                          <button
                            onClick={(e) => handleInitiateDelete(msg.id, e)}
                            className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded-md transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}

      {/* COMPOSE EMAIL MODAL */}
      {composeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  New Gmail Message
                </h3>
              </div>
              <button
                onClick={() => setComposeOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiateSend} className="space-y-4">
              
              {/* To Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recipient Email (To):</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. admissions@university.ac.in, freshstudyindia@gmail.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Subject Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject:</label>
                <input
                  type="text"
                  required
                  placeholder="Application Inquiry, Visa Bonafide, etc."
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Quick Template Picker */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500">Insert Quick Template:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ADMISSION_EMAIL_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-[10px] font-bold rounded-lg transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      {tmpl.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message Content:</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write your email message here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 font-medium leading-relaxed"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setComposeOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Review & Send
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MANDATORY CONFIRMATION MODAL: SEND EMAIL */}
      {confirmSendOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Confirm Sending Email
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you sure you want to send this email message via your connected Gmail account?
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
              <p><strong className="text-slate-700 dark:text-slate-300">To:</strong> <span className="text-slate-900 dark:text-white">{composeTo}</span></p>
              <p><strong className="text-slate-700 dark:text-slate-300">Subject:</strong> <span className="text-slate-900 dark:text-white">{composeSubject}</span></p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmSendOpen(false)}
                disabled={isSending}
                className="w-1/2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteSend}
                disabled={isSending}
                className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Confirm & Send'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MANDATORY CONFIRMATION MODAL: DELETE EMAIL */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Move Email to Trash?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This action will remove the email from your active mailbox and move it to your Gmail Trash folder.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmDeleteOpen(false);
                  setItemToDeleteId(null);
                }}
                disabled={isDeleting}
                className="w-1/2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                disabled={isDeleting}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Moving...' : 'Yes, Move to Trash'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
