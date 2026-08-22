import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Building2, 
  Calendar, 
  User, 
  Check, 
  Download, 
  Sparkles,
  Globe2
} from 'lucide-react';
import { CommunityPhoto } from '../types';
import { togglePhotoLike, hasUserLikedPhoto } from '../lib/photoService';

interface PhotoLightboxModalProps {
  photo: CommunityPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  onLikeChanged?: (photoId: string, newCount: number) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  isOpen,
  onClose,
  onLikeChanged
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(() => photo ? hasUserLikedPhoto(photo.id) : false);
  const [likesCount, setLikesCount] = useState(() => photo ? photo.likesCount : 0);

  if (!isOpen || !photo) return null;

  const handleLike = async () => {
    const nextIsLiked = !isLiked;
    setIsLiked(nextIsLiked);
    const newCount = Math.max(0, likesCount + (nextIsLiked ? 1 : -1));
    setLikesCount(newCount);
    await togglePhotoLike(photo.id);
    if (onLikeChanged) {
      onLikeChanged(photo.id, newCount);
    }
  };

  const handleShare = () => {
    const url = window.location.origin + '#gallery';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const formattedDate = new Date(photo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden max-h-[94vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        id="photo-lightbox-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close photo view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Top: High-Res Image View */}
        <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px] max-h-[55vh] md:max-h-full overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[75vh]"
          />

          {/* Badge over photo */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
              <span>{photo.country}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-xs font-bold text-white shadow-sm">
              {photo.category}
            </span>
          </div>
        </div>

        {/* Right / Bottom: Photo Info & Details Sidebar */}
        <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col justify-between bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 overflow-y-auto">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-lg font-black text-white leading-snug">
                {photo.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Caption */}
            {photo.caption && (
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50">
                "{photo.caption}"
              </p>
            )}

            {/* Meta Attributes */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Posted By</p>
                  <p className="font-semibold text-white">{photo.uploaderName} <span className="text-slate-400 font-normal">({photo.uploaderRole})</span></p>
                </div>
              </div>

              {photo.university && (
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">University</p>
                    <p className="font-semibold text-white">{photo.university}</p>
                  </div>
                </div>
              )}

              {photo.city && (
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Campus Location</p>
                    <p className="font-semibold text-white">{photo.city}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions: Likes, Share, Download */}
          <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handleLike}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLiked
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : 'text-rose-400'}`} />
              <span>{likesCount} Likes</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Share photo link"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <a
              href={photo.imageUrl}
              download={`${photo.title.toLowerCase().replace(/\s+/g, '_')}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Open full resolution"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
