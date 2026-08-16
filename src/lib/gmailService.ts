import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { GmailEmailMessage, GmailLabelItem, UserProfile } from '../types';

export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.insert',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.metadata',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing',
];

// Configure Google Auth Provider with Gmail Scopes
const gmailProvider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach((scope) => {
  gmailProvider.addScope(scope);
});
gmailProvider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline'
});

// IN-MEMORY TOKEN CACHE (Mandatory security policy - never localStorage)
let cachedGmailAccessToken: string | null = null;
let isSigningIn = false;

export const initGmailAuth = (
  onAuthSuccess?: (user: FirebaseUser, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
    if (user) {
      if (cachedGmailAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedGmailAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedGmailAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleGmail = async (): Promise<{ user: FirebaseUser; accessToken: string; profile?: UserProfile }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, gmailProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Google OAuth access token was not returned. Please ensure you authorize Gmail permissions in the popup.');
    }

    cachedGmailAccessToken = credential.accessToken;
    const user = result.user;

    // Create or update Firestore profile
    const profile: UserProfile = {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      role: 'student',
      avatarUrl: user.photoURL || undefined,
      targetCountry: 'India',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
    } catch (e) {
      console.warn('Firestore profile sync note:', e);
    }

    return { user, accessToken: cachedGmailAccessToken, profile };
  } catch (error: any) {
    console.error('Google Sign In Error with Gmail:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getGmailAccessToken = (): string | null => {
  return cachedGmailAccessToken;
};

export const setGmailAccessToken = (token: string | null) => {
  cachedGmailAccessToken = token;
};

export const disconnectGmail = async () => {
  cachedGmailAccessToken = null;
  await signOut(auth);
};

// ==========================================
// GMAIL REST API CLIENT CALLS
// ==========================================

const GMAIL_BASE_URL = 'https://gmail.googleapis.com/gmail/v1/users/me';

// Base64 helper for email bodies
const decodeBase64Url = (base64UrlStr: string): string => {
  try {
    const base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (err) {
    return atob(base64UrlStr.replace(/-/g, '+').replace(/_/g, '/'));
  }
};

const encodeBase64Url = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Parse email body from Gmail payload parts recursively
const parseMessageBody = (payload: any): { bodyText: string; bodyHtml: string } => {
  let bodyText = '';
  let bodyHtml = '';

  if (!payload) return { bodyText, bodyHtml };

  if (payload.body?.data) {
    const decoded = decodeBase64Url(payload.body.data);
    if (payload.mimeType === 'text/html') {
      bodyHtml = decoded;
    } else {
      bodyText = decoded;
    }
  }

  if (payload.parts && Array.isArray(payload.parts)) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        bodyText += decodeBase64Url(part.body.data);
      } else if (part.mimeType === 'text/html' && part.body?.data) {
        bodyHtml += decodeBase64Url(part.body.data);
      } else if (part.parts) {
        const nested = parseMessageBody(part);
        if (nested.bodyText) bodyText += nested.bodyText;
        if (nested.bodyHtml) bodyHtml += nested.bodyHtml;
      }
    }
  }

  return { bodyText, bodyHtml };
};

// 1. Fetch Gmail User Profile
export const fetchGmailProfile = async (accessToken: string) => {
  const response = await fetch(`${GMAIL_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch profile: ${response.status}`);
  }
  return await response.json();
};

// 2. Fetch User Labels
export const fetchGmailLabels = async (accessToken: string): Promise<GmailLabelItem[]> => {
  const response = await fetch(`${GMAIL_BASE_URL}/labels`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch labels: ${response.status}`);
  }
  const data = await response.json();
  return data.labels || [];
};

// 3. List Messages
export interface ListMessagesOptions {
  q?: string;
  labelIds?: string[];
  maxResults?: number;
  pageToken?: string;
}

export const listGmailMessages = async (
  accessToken: string,
  options: ListMessagesOptions = {}
): Promise<{ messages: GmailEmailMessage[]; nextPageToken?: string; resultSizeEstimate: number }> => {
  const params = new URLSearchParams();
  if (options.q) params.append('q', options.q);
  if (options.labelIds && options.labelIds.length > 0) {
    options.labelIds.forEach(lbl => params.append('labelIds', lbl));
  }
  params.append('maxResults', (options.maxResults || 25).toString());
  if (options.pageToken) params.append('pageToken', options.pageToken);

  const url = `${GMAIL_BASE_URL}/messages?${params.toString()}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to list messages: ${response.status}`);
  }

  const listData = await response.json();
  const rawList: { id: string; threadId: string }[] = listData.messages || [];

  // Fetch full details for the retrieved messages in parallel (chunked)
  const fullMessages: GmailEmailMessage[] = await Promise.all(
    rawList.slice(0, 20).map(async (item) => {
      try {
        return await getGmailMessage(accessToken, item.id);
      } catch (e) {
        return {
          id: item.id,
          threadId: item.threadId,
          snippet: 'Unable to load message preview',
          internalDate: Date.now().toString(),
          labelIds: [],
          from: 'Unknown',
          to: 'Me',
          subject: '(No Subject)',
          date: new Date().toLocaleDateString(),
          isUnread: false,
          isStarred: false,
          hasAttachments: false
        };
      }
    })
  );

  return {
    messages: fullMessages,
    nextPageToken: listData.nextPageToken,
    resultSizeEstimate: listData.resultSizeEstimate || fullMessages.length
  };
};

// 4. Get Message Details
export const getGmailMessage = async (accessToken: string, id: string): Promise<GmailEmailMessage> => {
  const response = await fetch(`${GMAIL_BASE_URL}/messages/${id}?format=full`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch message ${id}: ${response.status}`);
  }

  const data = await response.json();
  const headers: { name: string; value: string }[] = data.payload?.headers || [];

  const getHeader = (name: string) => {
    const found = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    return found ? found.value : '';
  };

  const rawFrom = getHeader('from');
  let fromName = rawFrom;
  let fromEmail = rawFrom;
  const match = rawFrom.match(/^(.*?)\s*<(.+?)>$/);
  if (match) {
    fromName = match[1].replace(/^"|"$/g, '').trim();
    fromEmail = match[2].trim();
  }

  const { bodyText, bodyHtml } = parseMessageBody(data.payload);

  const labelIds: string[] = data.labelIds || [];
  const isUnread = labelIds.includes('UNREAD');
  const isStarred = labelIds.includes('STARRED');

  let hasAttachments = false;
  if (data.payload?.parts) {
    hasAttachments = data.payload.parts.some((p: any) => p.filename && p.filename.length > 0);
  }

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet || '',
    historyId: data.historyId,
    internalDate: data.internalDate || Date.now().toString(),
    labelIds,
    from: fromEmail || 'me',
    fromName: fromName || fromEmail || 'me',
    to: getHeader('to'),
    subject: getHeader('subject') || '(No Subject)',
    date: getHeader('date') || new Date().toLocaleString(),
    bodyText,
    bodyHtml,
    isUnread,
    isStarred,
    hasAttachments
  };
};

// 5. Send Email Message (Requires explicit user confirmation before executing)
export interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
  threadId?: string;
  replyToMessageId?: string;
  senderName?: string;
}

export const sendGmailMessage = async (
  accessToken: string,
  params: SendEmailParams
): Promise<{ id: string; threadId: string; labelIds: string[] }> => {
  if (!params.to || !params.subject) {
    throw new Error('Recipient and Subject are required to send an email.');
  }

  // Construct RFC 2822 email format
  const lines: string[] = [
    `To: ${params.to}`,
    params.cc ? `Cc: ${params.cc}` : '',
    params.bcc ? `Bcc: ${params.bcc}` : '',
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    params.body.replace(/\n/g, '<br/>')
  ].filter(l => l !== '');

  const rawRfc2822 = lines.join('\r\n');
  const encodedRaw = encodeBase64Url(rawRfc2822);

  const payload: any = { raw: encodedRaw };
  if (params.threadId) {
    payload.threadId = params.threadId;
  }

  const response = await fetch(`${GMAIL_BASE_URL}/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to send email: ${response.status}`);
  }

  return await response.json();
};

// 6. Trash / Delete Email Message (Requires explicit confirmation before execution)
export const trashGmailMessage = async (accessToken: string, messageId: string) => {
  const response = await fetch(`${GMAIL_BASE_URL}/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to move message to trash: ${response.status}`);
  }

  return await response.json();
};

export const deleteGmailMessagePermanently = async (accessToken: string, messageId: string) => {
  const response = await fetch(`${GMAIL_BASE_URL}/messages/${messageId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to permanently delete message: ${response.status}`);
  }

  return true;
};

// 7. Modify Message Labels (e.g. Star, Mark Read/Unread)
export const modifyGmailLabels = async (
  accessToken: string,
  messageId: string,
  addLabelIds: string[] = [],
  removeLabelIds: string[] = []
) => {
  const response = await fetch(`${GMAIL_BASE_URL}/messages/${messageId}/modify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addLabelIds,
      removeLabelIds
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to update labels: ${response.status}`);
  }

  return await response.json();
};

// Pre-built Quick Admission Templates for Fresh Study India
export const ADMISSION_EMAIL_TEMPLATES = [
  {
    id: 'admission-inquiry',
    title: 'University Admission Status Inquiry',
    subject: 'Fresh Study India: Admission Application Status Inquiry - [Student Name]',
    body: `Dear Admissions Committee,\n\nI am writing on behalf of Fresh Study India to follow up on the provisional admission application for [Student Name] (Target Program: [Course Name]).\n\nAll academic credentials, including high school marksheets and identification certificates, have been submitted. Could you kindly provide the updated evaluation status or issue the formal acceptance letter at your earliest convenience?\n\nThank you for your prompt assistance.\n\nWarm regards,\nFresh Study India Admissions Team\nPhone: +91 9201330946\nEmail: freshstudyindia@gmail.com`
  },
  {
    id: 'visa-support',
    title: 'Indian Student Visa Support & Invitation Letter',
    subject: 'Request for Visa Invitation Letter & Bonafide Certificate - [Student Name]',
    body: `Dear International Student Cell / University Registrar,\n\nWe request the official Bonafide Letter and Visa Support Invitation for [Student Name] to facilitate the Indian Student Visa (e-FRRO / Embassy filing).\n\nPassport Details:\n- Full Name: [Student Name]\n- Passport Number: [Passport No]\n- Country: Liberia / International\n- Program: [Course Name]\n\nPlease expedite the verified visa document to enable the candidate to schedule their embassy biometric appointment.\n\nBest regards,\nFresh Study India Visa & Travel Desk`
  },
  {
    id: 'airport-hostel',
    title: 'Airport Reception & Hostel Allotment Request',
    subject: 'Arrival Notice & Campus Accommodation Coordination - [Student Name]',
    body: `Dear Campus Accommodation & Student Affairs Team,\n\nWe would like to confirm the travel schedule and arrival logistics for incoming international student [Student Name].\n\nFlight Details:\n- Arrival Airport: IGI New Delhi (DEL) / Mumbai (BOM) / Bangalore (BLR)\n- Arrival Date & Time: [Date & Time]\n- Flight Number: [Flight Number]\n\nOur Fresh Study India local reception staff will meet the student at the airport and accompany them to the campus hostel. Kindly ensure their room allocation is ready upon arrival.\n\nThank you,\nFresh Study India Student Support Services`
  },
  {
    id: 'fee-receipt',
    title: 'Tuition Fee Deposit Confirmation & Receipt Request',
    subject: 'Payment Confirmation & Official University Receipt Request - [Student Name]',
    body: `Dear University Finance Department,\n\nWe have successfully initiated the semester tuition fee deposit for [Student Name] for the [Course Name] program.\n\nPayment Reference ID: [Transaction/Swift Ref]\nAmount Paid: $[Amount]\n\nKindly confirm receipt of these funds and issue the official university stamped fee receipt for visa documentation and student records.\n\nSincerely,\nFresh Study India Finance & Accounts`
  }
];
