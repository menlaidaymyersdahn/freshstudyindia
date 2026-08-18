import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { 
  Application, 
  DocumentFile, 
  UserProfile, 
  UserRole, 
  Appointment, 
  University, 
  Course, 
  Scholarship, 
  BlogPost, 
  Testimonial, 
  Counselor, 
  PaymentRecord, 
  AuditLog, 
  VisaStatus, 
  SystemSettings,
  ChatMessage 
} from '../types';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with custom databaseId if specified
const configRecord = firebaseConfigJson as Record<string, any>;
const dbDatabaseId = configRecord.firestoreDatabaseId && configRecord.firestoreDatabaseId !== '(default)'
  ? configRecord.firestoreDatabaseId
  : undefined;

export const db = dbDatabaseId ? getFirestore(app, dbDatabaseId) : getFirestore(app);

// AUTH FUNCTIONS

// Fetch User Profile from Firestore
export const getUserProfileFromFirestore = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.error('Error fetching user profile from Firestore:', err);
    return null;
  }
};

// 1. Sign Up Student
export const registerStudentWithFirebase = async (
  email: string, 
  password: string, 
  name: string, 
  phone?: string, 
  county?: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update Auth Profile
  await updateProfile(user, { displayName: name });

  // Send Email Verification
  try {
    await sendEmailVerification(user);
  } catch (err) {
    console.warn('Email verification send warning:', err);
  }

  // Create User Document in Firestore
  const userProfile: UserProfile = {
    id: user.uid,
    name,
    email: user.email || email,
    role: 'student',
    phone: phone || '',
    targetCountry: 'India',
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });

  return { user, profile: userProfile };
};

// 1b. Sign Up Counselor / Staff (for production onboarding)
export const registerStaffWithFirebase = async (
  email: string,
  password: string,
  name: string,
  role: 'counselor' | 'admin' | 'superadmin' | 'super-admin'
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  try {
    await sendEmailVerification(user);
  } catch (err) {
    console.warn('Email verification send warning:', err);
  }

  const userProfile: UserProfile = {
    id: user.uid,
    name,
    email: user.email || email,
    role: role as UserRole,
    targetCountry: 'India',
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });

  return { user, profile: userProfile };
};

// 2. Sign In User
export const loginWithFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch or create profile
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userDoc.exists()) {
      profile = userDoc.data() as UserProfile;
    } else {
      // Fallback if profile doesn't exist
      let role: UserRole = 'student';
      if (email.toLowerCase().includes('superadmin')) {
        role = 'superadmin';
      } else if (email.toLowerCase().includes('admin')) {
        role = 'admin';
      } else if (email.toLowerCase().includes('counselor')) {
        role = 'counselor';
      }
      profile = {
        id: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email || email,
        role: role,
        targetCountry: 'India',
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, profile, { merge: true });
    }

    return { user, profile };
  } catch (err: any) {
    // If it's a standard demo email that hasn't been initialized yet, auto-provision it
    const isDemoAccount = email.toLowerCase().endsWith('@freshstudyindia.com') || email.toLowerCase().includes('demo');
    if ((err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') && isDemoAccount) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let role: UserRole = 'student';
        if (email.toLowerCase().includes('superadmin')) {
          role = 'superadmin';
        } else if (email.toLowerCase().includes('admin')) {
          role = 'admin';
        } else if (email.toLowerCase().includes('counselor')) {
          role = 'counselor';
        }
        const profile: UserProfile = {
          id: user.uid,
          name: email.split('@')[0].toUpperCase(),
          email: user.email || email,
          role,
          targetCountry: 'India',
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
        return { user, profile };
      } catch (createErr) {
        throw err; // throw original error
      }
    }
    throw err;
  }
};

// 2b. Sign In with Google
export const loginWithGoogle = async (targetRole: UserRole = 'student') => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if profile exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userDoc.exists()) {
      profile = userDoc.data() as UserProfile;
    } else {
      // Determine initial role
      let role: UserRole = targetRole;
      const emailLower = (user.email || '').toLowerCase();
      if (emailLower.includes('superadmin')) {
        role = 'superadmin';
      } else if (emailLower.includes('admin')) {
        role = 'admin';
      } else if (emailLower.includes('counselor')) {
        role = 'counselor';
      }

      profile = {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Student',
        email: user.email || '',
        role: role,
        targetCountry: 'India',
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, profile, { merge: true });
    }

    return { user, profile };
  } catch (err: any) {
    if (err?.code === 'auth/unauthorized-domain') {
      err.domain = typeof window !== 'undefined' ? window.location.hostname : '';
      err.projectId = firebaseConfigJson.projectId;
      err.firebaseConsoleUrl = `https://console.firebase.google.com/project/${firebaseConfigJson.projectId}/authentication/settings`;
    }
    throw err;
  }
};

// 3. Password Reset
export const triggerPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// 4. Send Email Verification manually
export const triggerEmailVerification = async (user: FirebaseUser) => {
  await sendEmailVerification(user);
};

// 5. Logout
export const logoutFirebase = async () => {
  await signOut(auth);
};

// FIRESTORE FUNCTIONS FOR APPLICATIONS

// Save Application to Firestore
export const saveApplicationToFirestore = async (application: Omit<Application, 'id'> | Application) => {
  const appId = 'id' in application && application.id ? application.id : `APP-${Date.now()}`;
  const appData = {
    ...application,
    id: appId,
    updatedAt: serverTimestamp()
  };

  const appDocRef = doc(db, 'applications', appId);
  await setDoc(appDocRef, appData, { merge: true });
  return appData as Application;
};

// Get Applications from Firestore
export const fetchApplicationsFromFirestore = async (studentId?: string): Promise<Application[]> => {
  try {
    const appsRef = collection(db, 'applications');
    let q;
    if (studentId) {
      q = query(appsRef, where('studentId', '==', studentId));
    } else {
      q = appsRef;
    }
    const snapshot = await getDocs(q);
    const apps: Application[] = [];
    snapshot.forEach((docSnap) => {
      apps.push(docSnap.data() as Application);
    });
    return apps;
  } catch (err) {
    console.error('Error fetching applications from Firestore:', err);
    return [];
  }
};

// Delete Application from Firestore
export const deleteApplicationFromFirestore = async (appId: string) => {
  await deleteDoc(doc(db, 'applications', appId));
};

// FIRESTORE FUNCTIONS FOR DOCUMENTS

// Save Document to Firestore
export const saveDocumentToFirestore = async (document: DocumentFile, studentId: string) => {
  const docRef = doc(db, 'documents', document.id);
  const data = {
    ...document,
    studentId,
    createdAt: serverTimestamp()
  };
  await setDoc(docRef, data, { merge: true });
  return document;
};

// Fetch Documents from Firestore
export const fetchDocumentsFromFirestore = async (studentId?: string): Promise<DocumentFile[]> => {
  try {
    const docsRef = collection(db, 'documents');
    let q;
    if (studentId) {
      q = query(docsRef, where('studentId', '==', studentId));
    } else {
      q = docsRef;
    }
    const snapshot = await getDocs(q);
    const documents: DocumentFile[] = [];
    snapshot.forEach((docSnap) => {
      documents.push(docSnap.data() as DocumentFile);
    });
    return documents;
  } catch (err) {
    console.error('Error fetching documents from Firestore:', err);
    return [];
  }
};

// FIRESTORE FUNCTIONS FOR INQUIRIES / CONTACT ADMIN
export const saveInquiryToFirestore = async (inquiryData: {
  name: string;
  email: string;
  phone: string;
  county: string;
  courseLevel: string;
  desiredCourse: string;
  message: string;
  studentId?: string;
}) => {
  const inquiriesRef = collection(db, 'inquiries');
  const docRef = await addDoc(inquiriesRef, {
    ...inquiryData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

// FIRESTORE FUNCTIONS FOR PROFILE MANAGEMENT
export const updateUserProfileInFirestore = async (uid: string, profileData: Partial<UserProfile>) => {
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, { ...profileData, updatedAt: new Date().toISOString() }, { merge: true });
};

// FIRESTORE FUNCTIONS FOR APPOINTMENTS
export const saveAppointmentToFirestore = async (appointment: Appointment) => {
  const apptDocRef = doc(db, 'appointments', appointment.id);
  await setDoc(apptDocRef, { ...appointment, createdAt: new Date().toISOString() }, { merge: true });
  return appointment;
};

export const fetchAppointmentsFromFirestore = async (studentId?: string): Promise<Appointment[]> => {
  try {
    const apptsRef = collection(db, 'appointments');
    let q;
    if (studentId) {
      q = query(apptsRef, where('studentId', '==', studentId));
    } else {
      q = apptsRef;
    }
    const snapshot = await getDocs(q);
    const appointments: Appointment[] = [];
    snapshot.forEach((docSnap) => {
      appointments.push(docSnap.data() as Appointment);
    });
    return appointments;
  } catch (err) {
    console.error('Error fetching appointments from Firestore:', err);
    return [];
  }
};

// FIRESTORE FUNCTIONS FOR SAVED UNIVERSITIES (BOOKMARKS)
export const saveSavedUniversitiesToFirestore = async (uid: string, universityIds: string[]) => {
  const savedRef = doc(db, 'savedUniversities', uid);
  await setDoc(savedRef, { universityIds, updatedAt: new Date().toISOString() }, { merge: true });
};

export const fetchSavedUniversitiesFromFirestore = async (uid: string): Promise<string[]> => {
  try {
    const savedRef = doc(db, 'savedUniversities', uid);
    const snap = await getDoc(savedRef);
    if (snap.exists()) {
      return snap.data().universityIds || [];
    }
    return [];
  } catch (err) {
    console.error('Error fetching saved universities from Firestore:', err);
    return [];
  }
};

// FIRESTORE FUNCTIONS FOR ADMIN RESOURCES

export const saveUniversityToFirestore = async (uni: University) => {
  const ref = doc(db, 'universities', uni.id);
  await setDoc(ref, { ...uni, updatedAt: new Date().toISOString() }, { merge: true });
  return uni;
};

export const deleteUniversityFromFirestore = async (uniId: string) => {
  await deleteDoc(doc(db, 'universities', uniId));
};

export const fetchUniversitiesFromFirestore = async (): Promise<University[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'universities'));
    const list: University[] = [];
    snapshot.forEach((docSnap) => list.push(docSnap.data() as University));
    return list;
  } catch (err) {
    console.error('Error fetching universities from Firestore:', err);
    return [];
  }
};

export const saveCourseToFirestore = async (course: Course) => {
  const ref = doc(db, 'courses', course.id);
  await setDoc(ref, { ...course, updatedAt: new Date().toISOString() }, { merge: true });
  return course;
};

export const deleteCourseFromFirestore = async (courseId: string) => {
  await deleteDoc(doc(db, 'courses', courseId));
};

export const saveScholarshipToFirestore = async (scholarship: Scholarship) => {
  const ref = doc(db, 'scholarships', scholarship.id);
  await setDoc(ref, { ...scholarship, updatedAt: new Date().toISOString() }, { merge: true });
  return scholarship;
};

export const deleteScholarshipFromFirestore = async (scholarshipId: string) => {
  await deleteDoc(doc(db, 'scholarships', scholarshipId));
};

export const saveBlogPostToFirestore = async (post: BlogPost) => {
  const ref = doc(db, 'blogPosts', post.id);
  await setDoc(ref, { ...post, updatedAt: new Date().toISOString() }, { merge: true });
  return post;
};

export const deleteBlogPostFromFirestore = async (postId: string) => {
  await deleteDoc(doc(db, 'blogPosts', postId));
};

export const saveTestimonialToFirestore = async (testimonial: Testimonial) => {
  const ref = doc(db, 'testimonials', testimonial.id);
  await setDoc(ref, { ...testimonial, updatedAt: new Date().toISOString() }, { merge: true });
  return testimonial;
};

export const deleteTestimonialFromFirestore = async (testimonialId: string) => {
  await deleteDoc(doc(db, 'testimonials', testimonialId));
};

export const saveCounselorToFirestore = async (counselor: Counselor) => {
  const ref = doc(db, 'counselors', counselor.id);
  await setDoc(ref, { ...counselor, updatedAt: new Date().toISOString() }, { merge: true });
  return counselor;
};

export const savePaymentToFirestore = async (payment: PaymentRecord) => {
  const ref = doc(db, 'payments', payment.id);
  await setDoc(ref, { ...payment, updatedAt: new Date().toISOString() }, { merge: true });
  return payment;
};

export const saveAuditLogToFirestore = async (log: AuditLog) => {
  const ref = doc(db, 'auditLogs', log.id);
  await setDoc(ref, { ...log, createdAt: new Date().toISOString() }, { merge: true });
  return log;
};

export const saveVisaStatusToFirestore = async (visa: VisaStatus) => {
  const ref = doc(db, 'visaStatuses', visa.id);
  await setDoc(ref, { ...visa, updatedAt: new Date().toISOString() }, { merge: true });
  return visa;
};

export const saveBroadcastNotificationToFirestore = async (notification: {
  id: string;
  title: string;
  message: string;
  targetGroup: 'all' | 'students' | 'counselors';
  date: string;
}) => {
  const ref = doc(db, 'broadcastNotifications', notification.id);
  await setDoc(ref, { ...notification, createdAt: new Date().toISOString() }, { merge: true });
};

export const saveSystemSettingsToFirestore = async (settings: SystemSettings) => {
  const ref = doc(db, 'systemSettings', 'global');
  await setDoc(ref, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
};

// FIRESTORE FUNCTIONS FOR NOTIFICATIONS
export const saveChatMessageToFirestore = async (message: ChatMessage) => {
  const chatRef = doc(db, 'chatMessages', message.id);
  await setDoc(chatRef, { ...message, createdAt: new Date().toISOString() }, { merge: true });
  return message;
};

export const saveCounselorNoteToFirestore = async (studentId: string, noteData: { id: string; counselorId: string; note: string; date: string }) => {
  const noteRef = doc(db, 'counselorNotes', `${studentId}_${noteData.id}`);
  await setDoc(noteRef, { ...noteData, studentId, createdAt: new Date().toISOString() }, { merge: true });
};

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'application' | 'document' | 'appointment' | 'scholarship' | 'general';
}

export const saveNotificationToFirestore = async (uid: string, notification: StudentNotification) => {
  const notifRef = doc(db, 'notifications', `${uid}_${notification.id}`);
  await setDoc(notifRef, { ...notification, uid, createdAt: new Date().toISOString() }, { merge: true });
};

export const fetchNotificationsFromFirestore = async (uid: string): Promise<StudentNotification[]> => {
  try {
    const notifsRef = collection(db, 'notifications');
    const q = query(notifsRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    const notifications: StudentNotification[] = [];
    snapshot.forEach((docSnap) => {
      notifications.push(docSnap.data() as StudentNotification);
    });
    return notifications;
  } catch (err) {
    console.error('Error fetching notifications from Firestore:', err);
    return [];
  }
};


