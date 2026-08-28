import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId and long-polling auto-detection for iframe sandbox resilience
let firestoreDb: any;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
    ignoreUndefinedProperties: true,
  }, firebaseConfig.firestoreDatabaseId);
} catch {
  firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = firestoreDb;

// Collection References
export const applicationsCollection = collection(db, 'applications');
export const enquiriesCollection = collection(db, 'enquiries');

/**
 * Save or sync an application document to Firestore
 */
export async function syncApplicationToFirestore(appData: any): Promise<boolean> {
  try {
    if (!appData || !appData.id) return false;
    const docRef = doc(db, 'applications', appData.id);
    await setDoc(docRef, {
      ...appData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firestore application sync notice:', error);
    return false;
  }
}

/**
 * Lookup an application in Firestore by tracking ID, ID, or email
 */
export async function lookupApplicationInFirestore(queryStr: string): Promise<any | null> {
  try {
    const qTrim = (queryStr || '').trim();
    if (!qTrim) return null;

    // 1. Direct ID lookup
    const directDoc = await getDoc(doc(db, 'applications', qTrim));
    if (directDoc.exists()) {
      return { id: directDoc.id, ...directDoc.data() };
    }

    // 2. Query by trackingId
    const trackingQuery = query(applicationsCollection, where('trackingId', '==', qTrim));
    const trackingSnap = await getDocs(trackingQuery);
    if (!trackingSnap.empty) {
      const docData = trackingSnap.docs[0];
      return { id: docData.id, ...docData.data() };
    }

    // 3. Query by email
    const emailQuery = query(applicationsCollection, where('email', '==', qTrim.toLowerCase()));
    const emailSnap = await getDocs(emailQuery);
    if (!emailSnap.empty) {
      const docData = emailSnap.docs[0];
      return { id: docData.id, ...docData.data() };
    }

    // 4. Query case-insensitive tracking ID match if upper/lowercase difference
    const upperTrack = query(applicationsCollection, where('trackingId', '==', qTrim.toUpperCase()));
    const upperSnap = await getDocs(upperTrack);
    if (!upperSnap.empty) {
      const docData = upperSnap.docs[0];
      return { id: docData.id, ...docData.data() };
    }

    return null;
  } catch (error) {
    console.warn('Firestore lookup warning:', error);
    return null;
  }
}

/**
 * Get all applications from Firestore (for Admin Dashboard)
 */
export async function getAllApplicationsFromFirestore(): Promise<any[]> {
  try {
    const snapshot = await getDocs(applicationsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('Firestore fetch all notice:', error);
    return [];
  }
}

/**
 * Save an enquiry to Firestore
 */
export async function saveEnquiryToFirestore(enquiryData: any): Promise<boolean> {
  try {
    if (!enquiryData || !enquiryData.id) return false;
    const docRef = doc(db, 'enquiries', enquiryData.id);
    await setDoc(docRef, {
      ...enquiryData,
      createdAt: enquiryData.createdAt || new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firestore enquiry save notice:', error);
    return false;
  }
}

/**
 * Delete an application from Firestore
 */
export async function deleteApplicationFromFirestore(id: string): Promise<boolean> {
  try {
    if (!id) return false;
    await deleteDoc(doc(db, 'applications', id));
    return true;
  } catch (error) {
    console.warn('Firestore application delete notice:', error);
    return false;
  }
}

/**
 * Delete an enquiry from Firestore
 */
export async function deleteEnquiryFromFirestore(id: string): Promise<boolean> {
  try {
    if (!id) return false;
    await deleteDoc(doc(db, 'enquiries', id));
    return true;
  } catch (error) {
    console.warn('Firestore enquiry delete notice:', error);
    return false;
  }
}

export { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
};
