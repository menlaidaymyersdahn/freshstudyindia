import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  increment, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { CommunityPhoto } from '../types';
import { IMAGES } from './images';

const STORAGE_KEY = 'fresh_study_community_photos_cache';
const LIKED_PHOTOS_KEY = 'fresh_study_liked_photos';

// Default curated campus and student life photos
export const INITIAL_COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    id: 'seed-photo-1',
    title: 'Liberian Graduate Convocation in India',
    caption: 'Myers Dahn celebrating academic graduation and honors at Shri Rawatpura Sarkar University, India with university officials and African student council.',
    imageUrl: IMAGES.graduate.src,
    uploaderName: 'Myers Dahn',
    uploaderRole: 'Alumni',
    country: 'Liberia 🇱🇷',
    category: 'Graduation & Success',
    university: 'Shri Rawatpura Sarkar University',
    city: 'Raipur, India',
    likesCount: 142,
    createdAt: '2026-06-15T10:30:00.000Z',
    isApproved: true,
    featured: true,
  },
  {
    id: 'seed-photo-2',
    title: 'International Student Convocation Day',
    caption: 'Official convocation ceremony for international graduates across Africa and Asia receiving accredited bachelor degrees in India.',
    imageUrl: IMAGES.convocation.src,
    uploaderName: 'Fresh Study Admissions Desk',
    uploaderRole: 'Admissions Team',
    country: 'International 🌍',
    category: 'Graduation & Success',
    university: 'Partner University Network',
    city: 'India 🇮🇳',
    likesCount: 98,
    createdAt: '2026-07-02T14:15:00.000Z',
    isApproved: true,
    featured: true,
  },
  {
    id: 'seed-photo-3',
    title: 'Computer Science & AI Research Lab',
    caption: 'West African students working on advanced machine learning algorithms and software architecture in university high-performance computing laboratory.',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    uploaderName: 'Emmanuel K.',
    uploaderRole: 'Student',
    country: 'Ghana 🇬🇭',
    category: 'Labs & Classrooms',
    university: 'Chandigarh / Tech Hub Campus',
    city: 'Punjab, India',
    likesCount: 84,
    createdAt: '2026-07-18T09:40:00.000Z',
    isApproved: true,
    featured: false,
  },
  {
    id: 'seed-photo-4',
    title: 'New Student Airport Arrival in Delhi',
    caption: 'Our dedicated student reception team welcoming new Liberian arrivals at Indira Gandhi International Airport with transport straight to campus hostels.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    uploaderName: 'Student Welfare Cell',
    uploaderRole: 'Admissions Team',
    country: 'Liberia 🇱🇷',
    category: 'Arrivals & Orientation',
    university: 'Delhi NCR University Hub',
    city: 'New Delhi, India',
    likesCount: 116,
    createdAt: '2026-07-29T16:20:00.000Z',
    isApproved: true,
    featured: true,
  },
  {
    id: 'seed-photo-5',
    title: 'Monrovia Physical Admissions & Verification Desk',
    caption: 'Parents and prospective students reviewing accredited university rosters and WASSCE/WAEC credit conversions at our Monrovia consultation center.',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    uploaderName: 'Monrovia Desk Liaison',
    uploaderRole: 'Admissions Team',
    country: 'Liberia 🇱🇷',
    category: 'Admissions Desks',
    university: 'Fresh Study West Africa Desk',
    city: 'Monrovia, Liberia',
    likesCount: 77,
    createdAt: '2026-08-05T11:00:00.000Z',
    isApproved: true,
    featured: false,
  },
  {
    id: 'seed-photo-6',
    title: 'Biomedical & Pharmacy Lab Practicals',
    caption: 'Hands-on practical training in microbiology, pharmacy compounding, and clinical diagnostics in state-of-the-art accredited medical college laboratories.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    uploaderName: 'Blessing T.',
    uploaderRole: 'Student',
    country: 'Nigeria 🇳🇬',
    category: 'Labs & Classrooms',
    university: 'Health Sciences Campus',
    city: 'Bengaluru, India',
    likesCount: 65,
    createdAt: '2026-08-12T13:45:00.000Z',
    isApproved: true,
    featured: false,
  }
];

// Helper to compress images on client side
export async function compressImage(
  file: File, 
  maxWidth = 1200, 
  maxHeight = 1200, 
  quality = 0.80
): Promise<{ dataUrl: string; sizeKb: number; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const head = 'data:image/jpeg;base64,';
        const sizeBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const sizeKb = Math.round(sizeBytes / 1024);

        resolve({ dataUrl, sizeKb, width, height });
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// Get cached photos from localStorage
export function getLocalCachedPhotos(): CommunityPhoto[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read cached photos:', e);
  }
  return INITIAL_COMMUNITY_PHOTOS;
}

// Save photos to local cache
export function setLocalCachedPhotos(photos: CommunityPhoto[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.warn('Could not cache photos locally:', e);
  }
}

// Check if user has liked a photo
export function hasUserLikedPhoto(photoId: string): boolean {
  try {
    const liked = JSON.parse(localStorage.getItem(LIKED_PHOTOS_KEY) || '[]');
    return liked.includes(photoId);
  } catch {
    return false;
  }
}

// Real-time photo subscription from Firestore with local fallback
export function subscribeCommunityPhotos(
  callback: (photos: CommunityPhoto[]) => void
): () => void {
  // 1. Immediately provide cached photos to prevent any layout delay
  const cached = getLocalCachedPhotos();
  callback(cached);

  try {
    const photosCol = collection(db, 'communityPhotos');
    const q = query(photosCol, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const remotePhotos: CommunityPhoto[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || 'Campus Moment',
              caption: data.caption || '',
              imageUrl: data.imageUrl || '',
              uploaderName: data.uploaderName || 'Student',
              uploaderRole: data.uploaderRole || 'Student',
              country: data.country || 'International',
              category: data.category || 'Campus Life',
              university: data.university || 'Indian University',
              city: data.city || 'India',
              likesCount: typeof data.likesCount === 'number' ? data.likesCount : 0,
              createdAt: data.createdAt || new Date().toISOString(),
              isApproved: data.isApproved !== false,
              featured: !!data.featured
            };
          });

          // Merge with initial seed photos if remote has only a few
          const existingIds = new Set(remotePhotos.map(p => p.id));
          const missingSeeds = INITIAL_COMMUNITY_PHOTOS.filter(s => !existingIds.has(s.id));
          const combined = [...remotePhotos, ...missingSeeds];

          setLocalCachedPhotos(combined);
          callback(combined);
        } else {
          // If Firestore is empty, seed it with the default initial community photos
          seedInitialPhotosIfEmpty();
          callback(cached);
        }
      },
      (error) => {
        console.warn('Firestore community photos listener note:', error.message);
        // On error, we still have cached/seed photos
        callback(getLocalCachedPhotos());
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn('Firestore subscription failed, using local storage mode:', error);
    return () => {};
  }
}

// Seed initial photos to Firestore if first time
async function seedInitialPhotosIfEmpty() {
  try {
    const photosCol = collection(db, 'communityPhotos');
    for (const photo of INITIAL_COMMUNITY_PHOTOS) {
      await setDoc(doc(photosCol, photo.id), {
        ...photo,
        seeded: true
      }, { merge: true });
    }
  } catch (e) {
    console.warn('Could not seed initial community photos to Firestore:', e);
  }
}

// Upload a new photo to Firestore and local cache
export async function uploadCommunityPhoto(photo: {
  title: string;
  caption?: string;
  imageUrl: string;
  uploaderName: string;
  uploaderRole: 'Student' | 'Alumni' | 'Admissions Team' | 'Parent' | 'Visitor';
  country: string;
  category: string;
  university?: string;
  city?: string;
}): Promise<CommunityPhoto> {
  const photoId = `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newPhoto: CommunityPhoto = {
    id: photoId,
    title: photo.title.trim(),
    caption: photo.caption?.trim() || '',
    imageUrl: photo.imageUrl,
    uploaderName: photo.uploaderName.trim() || 'Anonymous Student',
    uploaderRole: photo.uploaderRole || 'Student',
    country: photo.country || 'Liberia 🇱🇷',
    category: photo.category || 'Campus Life',
    university: photo.university?.trim() || 'Accredited Indian University',
    city: photo.city?.trim() || 'India',
    likesCount: 1,
    createdAt: new Date().toISOString(),
    isApproved: true,
    featured: false,
  };

  // Update local cache immediately
  const current = getLocalCachedPhotos();
  const updated = [newPhoto, ...current.filter(p => p.id !== photoId)];
  setLocalCachedPhotos(updated);

  // Attempt to write to Firestore
  try {
    const docRef = doc(db, 'communityPhotos', photoId);
    await setDoc(docRef, newPhoto);
  } catch (err) {
    console.warn('Could not write photo to remote Firestore, saved in persistent local storage:', err);
  }

  return newPhoto;
}

// Toggle like on a photo
export async function togglePhotoLike(photoId: string): Promise<boolean> {
  let likedList: string[] = [];
  try {
    likedList = JSON.parse(localStorage.getItem(LIKED_PHOTOS_KEY) || '[]');
  } catch {
    likedList = [];
  }

  const isLiked = likedList.includes(photoId);
  const newLikedList = isLiked 
    ? likedList.filter(id => id !== photoId)
    : [...likedList, photoId];

  try {
    localStorage.setItem(LIKED_PHOTOS_KEY, JSON.stringify(newLikedList));
  } catch {
    // Ignore storage issues
  }

  // Update in local cache
  const cached = getLocalCachedPhotos();
  const delta = isLiked ? -1 : 1;
  const updated = cached.map(p => {
    if (p.id === photoId) {
      return { ...p, likesCount: Math.max(0, (p.likesCount || 0) + delta) };
    }
    return p;
  });
  setLocalCachedPhotos(updated);

  // Update in Firestore
  try {
    const docRef = doc(db, 'communityPhotos', photoId);
    await updateDoc(docRef, {
      likesCount: increment(delta)
    });
  } catch (e) {
    console.warn('Like count update in Firestore skipped:', e);
  }

  return !isLiked;
}

// Delete photo (Admissions staff / admin)
export async function deleteCommunityPhoto(photoId: string): Promise<void> {
  const cached = getLocalCachedPhotos();
  const updated = cached.filter(p => p.id !== photoId);
  setLocalCachedPhotos(updated);

  try {
    const docRef = doc(db, 'communityPhotos', photoId);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn('Delete in Firestore skipped:', e);
  }
}
