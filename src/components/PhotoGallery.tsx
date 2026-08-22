import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Heart, 
  Maximize2, 
  Filter, 
  Search, 
  Sparkles, 
  Globe2, 
  Building2, 
  MapPin, 
  User, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { CommunityPhoto, PhotoCategory } from '../types';
import { 
  subscribeCommunityPhotos, 
  togglePhotoLike, 
  hasUserLikedPhoto 
} from '../lib/photoService';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PhotoLightboxModal } from './PhotoLightboxModal';

interface PhotoGalleryProps {
  onOpenApplication?: () => void;
}

const CATEGORY_TABS: PhotoCategory[] = [
  'All',
  'Graduation & Success',
  'Campus Life',
  'Labs & Classrooms',
  'Arrivals & Orientation',
  'Admissions Desks'
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onOpenApplication }) => {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<CommunityPhoto | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscribe to real-time photos from Firestore & Local Storage
  useEffect(() => {
    const unsubscribe = subscribeCommunityPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCardLike = async (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    const isNowLiked = await togglePhotoLike(photoId);
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          return {
            ...p,
            likesCount: Math.max(0, (p.likesCount || 0) + (isNowLiked ? 1 : -1))
          };
        }
        return p;
      })
    );
  };

  const handlePhotoUploaded = (newPhoto: CommunityPhoto) => {
    setPhotos((prev) => [newPhoto, ...prev.filter(p => p.id !== newPhoto.id)]);
    showToast('Photo uploaded successfully! Visible to all visitors permanently.');
  };

  // Filtered photos
  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      photo.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      photo.title.toLowerCase().includes(query) ||
      (photo.caption && photo.caption.toLowerCase().includes(query)) ||
      photo.uploaderName.toLowerCase().includes(query) ||
      photo.country.toLowerCase().includes(query) ||
      (photo.university && photo.university.toLowerCase().includes(query)) ||
      (photo.city && photo.city.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="gallery" className="py-20 relative bg-[#F4F7FB] border-t border-sky-100/80">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-blue-100/40 via-sky-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 text-xs font-bold mb-3 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus Life & Student Stories</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Real Students. Real Campuses.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-blue-600">
                Forever on Display.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Explore authentic moments uploaded by African and international students, alumni, and our on-ground admissions support desks across India and West Africa.
            </p>
          </div>

          {/* Upload Button Header Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="upload-photo-cta-btn"
              onClick={() => setIsUploadModalOpen(true)}
              className="group px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Upload Photo</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                {photos.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-md shadow-slate-950/5 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, country, university..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const isLiked = hasUserLikedPhoto(photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => setActiveLightboxPhoto(photo)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md shadow-slate-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                        <span>{photo.country}</span>
                      </span>

                      <span className="px-2.5 py-1 rounded-xl bg-blue-600/90 backdrop-blur-md text-[11px] font-extrabold text-white shadow-sm">
                        {photo.category}
                      </span>
                    </div>

                    {/* Hover Overlay with Action Buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4">
                      <div className="flex items-center gap-1.5 text-white text-xs font-semibold">
                        <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>View Fullscreen</span>
                      </div>

                      {/* Like button on card */}
                      <button
                        type="button"
                        onClick={(e) => handleCardLike(e, photo.id)}
                        className={`p-2 rounded-xl backdrop-blur-md border transition-transform duration-150 active:scale-125 flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                          isLiked
                            ? 'bg-rose-600/90 text-white border-rose-500 shadow-md shadow-rose-600/30'
                            : 'bg-black/60 text-white border-white/20 hover:bg-rose-600/80'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                        <span>{photo.likesCount || 0}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                        {photo.title}
                      </h3>
                      {photo.caption && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {photo.uploaderName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-700 truncate">
                          {photo.uploaderName}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          • {photo.uploaderRole}
                        </span>
                      </div>

                      {photo.university && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[120px]" title={photo.university}>
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{photo.university}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No photos found in this category
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Be the first to upload a photo for {selectedCategory}!
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo Now</span>
            </button>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Are you an African student or graduate in India?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Share your journey, campus memories, and inspire the next cohort of scholars. Photos stay live forever.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-red-600" />
              <span>Upload Your Photo</span>
            </button>

            {onOpenApplication && (
              <button
                onClick={onOpenApplication}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply to Study</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Upload Photo Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPhotoUploaded={handlePhotoUploaded}
      />

      {/* Lightbox Modal */}
      <PhotoLightboxModal
        photo={activeLightboxPhoto}
        isOpen={!!activeLightboxPhoto}
        onClose={() => setActiveLightboxPhoto(null)}
        onLikeChanged={(photoId, newCount) => {
          setPhotos((prev) =>
            prev.map((p) => (p.id === photoId ? { ...p, likesCount: newCount } : p))
          );
        }}
      />
    </section>
  );
};
