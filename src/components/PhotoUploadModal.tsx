import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  MapPin, 
  User, 
  GraduationCap, 
  Building2, 
  Globe2,
  Camera
} from 'lucide-react';
import { compressImage, uploadCommunityPhoto } from '../lib/photoService';
import { CommunityPhoto } from '../types';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded: (photo: CommunityPhoto) => void;
}

const CATEGORIES = [
  'Campus Life',
  'Graduation & Success',
  'Labs & Classrooms',
  'Arrivals & Orientation',
  'Hostel & Dining',
  'Admissions Desks'
];

const COUNTRIES = [
  'Liberia 🇱🇷',
  'Ghana 🇬🇭',
  'Nigeria 🇳🇬',
  'Sierra Leone 🇸🇱',
  'Guinea 🇬🇳',
  'Ivory Coast 🇨🇮',
  'Rwanda 🇷🇼',
  'Kenya 🇰🇪',
  'Uganda 🇺🇬',
  'Zimbabwe 🇿🇼',
  'India 🇮🇳',
  'International 🌍'
];

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onPhotoUploaded
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [fileStats, setFileStats] = useState<{ sizeKb: number; width: number; height: number } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [uploaderRole, setUploaderRole] = useState<'Student' | 'Alumni' | 'Admissions Team' | 'Parent' | 'Visitor'>('Student');
  const [country, setCountry] = useState('Liberia 🇱🇷');
  const [category, setCategory] = useState('Campus Life');
  const [university, setUniversity] = useState('');
  const [city, setCity] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setSelectedFile(file);
    setIsCompressing(true);

    try {
      const result = await compressImage(file, 1400, 1400, 0.82);
      setCompressedDataUrl(result.dataUrl);
      setPreviewUrl(result.dataUrl);
      setFileStats({
        sizeKb: result.sizeKb,
        width: result.width,
        height: result.height
      });
      if (!title) {
        // Auto suggest title from file name
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err) {
      console.error('Image compression error:', err);
      setErrorMsg('Failed to process image. Please try another photo.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!compressedDataUrl) {
      setErrorMsg('Please choose or drop a photo to upload.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please provide a title or caption for your photo.');
      return;
    }

    if (!uploaderName.trim()) {
      setErrorMsg('Please enter your name or nickname.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newPhoto = await uploadCommunityPhoto({
        title: title.trim(),
        caption: caption.trim(),
        imageUrl: compressedDataUrl,
        uploaderName: uploaderName.trim(),
        uploaderRole,
        country,
        category,
        university: university.trim() || 'Accredited Indian University',
        city: city.trim() || 'India'
      });

      setUploadSuccess(true);
      onPhotoUploaded(newPhoto);

      setTimeout(() => {
        handleReset();
        onClose();
      }, 1600);
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMsg('Could not upload photo. Please check your network and try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCompressedDataUrl(null);
    setFileStats(null);
    setTitle('');
    setCaption('');
    setUploaderName('');
    setUniversity('');
    setCity('');
    setErrorMsg(null);
    setUploadSuccess(false);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        id="photo-upload-modal-container"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Upload Campus & Student Photo
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live & Forever
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Share moments with visitors, prospective African students, and families worldwide.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {uploadSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                Photo Published Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your photo is now permanently published in the Fresh Study India Campus Gallery and visible to visitors worldwide.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Photo Selector / Dropzone */}
              {!previewUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                      : 'border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-file-input"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    Drag & drop your photo here, or <span className="text-blue-600 underline">browse</span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Supports JPG, PNG, WEBP, HEIC (Auto-optimized for instant fast viewing)
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-[11px] font-semibold text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Instant permanent upload to website</span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img
                    src={previewUrl}
                    alt="Upload Preview"
                    className="w-full h-56 sm:h-64 object-cover object-center"
                  />
                  
                  {/* File meta tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span>{fileStats?.width}×{fileStats?.height}px</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-emerald-400 font-mono font-bold">{fileStats?.sizeKb} KB</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                        setCompressedDataUrl(null);
                      }}
                      className="pointer-events-auto bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>

                  {isCompressing && (
                    <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center gap-2 text-white text-xs font-bold">
                      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                      <span>Optimizing image for permanent cloud storage...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Photo Title / Main Caption <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Computer Science Lab in Chandigarh / Graduation Day 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>

                {/* Additional Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Story / Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Share what was happening, who was there, or words of encouragement for incoming students..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
                  />
                </div>

                {/* Uploader Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={uploaderName}
                      onChange={(e) => setUploaderName(e.target.value)}
                      placeholder="e.g. Myers Dahn / Blessing"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Role / Association <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={uploaderRole}
                      onChange={(e) => setUploaderRole(e.target.value as any)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer"
                    >
                      <option value="Student">Current Student in India</option>
                      <option value="Alumni">Graduate / Alumni</option>
                      <option value="Admissions Team">Admissions / Support Desk</option>
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Visitor">Visitor / Prospective Student</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Gallery Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country Tag */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Country Tag <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer font-medium"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* University (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Indian University / Campus
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Rawatpura Sarkar / Chandigarh"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                {/* City / Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    City / Location in India
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Raipur / New Delhi / Bangalore"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isCompressing || !previewUrl}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing Forever...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      <span>Publish Photo to Gallery</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
