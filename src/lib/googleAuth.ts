import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Workspace OAuth Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => {
  provider.addScope(scope);
});
// Optional: specify prompt parameter to allow selecting the admissions@myersglobalpathways.com account
provider.setCustomParameters({
  prompt: 'select_account'
});

// In-memory cache for OAuth access token (as mandated by security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initializes the Firebase Auth listener. Call on app mount.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
        // Sync token to server in-memory workspace session
        syncTokenWithServer(cachedAccessToken, user.email || 'admissions@myersglobalpathways.com');
      } else if (!isSigningIn) {
        // User is logged into Firebase Auth, but token needs refresh or was cleared
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
      clearServerWorkspaceToken();
    }
  });
};

/**
 * Initiates Google OAuth Sign-in popup with Gmail API send scope.
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token.');
    }

    cachedAccessToken = credential.accessToken;
    
    // Sync with server-side email dispatch hub
    await syncTokenWithServer(cachedAccessToken, result.user.email || 'admissions@myersglobalpathways.com');

    return {
      user: result.user,
      accessToken: cachedAccessToken
    };
  } catch (error: any) {
    console.error('Google Workspace Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Returns currently cached Google OAuth access token.
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sets access token manually (e.g. after refresh or restore).
 */
export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  if (token) {
    syncTokenWithServer(token, auth.currentUser?.email || 'admissions@myersglobalpathways.com');
  }
};

/**
 * Syncs the active OAuth token with the server's private in-memory session.
 */
async function syncTokenWithServer(token: string, email: string) {
  try {
    await fetch('/api/auth/google-workspace-token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ token, email })
    });
  } catch (err) {
    console.warn('Could not sync workspace token to server:', err);
  }
}

/**
 * Clears the active token on the server when logged out.
 */
async function clearServerWorkspaceToken() {
  try {
    await fetch('/api/auth/google-workspace-token', {
      method: 'DELETE'
    });
  } catch (_) {}
}

/**
 * Signs out from Google & clears local and server cached tokens.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    cachedAccessToken = null;
    await clearServerWorkspaceToken();
  } catch (err) {
    console.error('Logout error:', err);
  }
};
