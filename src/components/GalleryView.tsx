import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Filter, CheckCircle2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { mockGalleryItems } from '../data/mockData';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Graduation', 'Cultural Festival', 'Lab & Tech Facilities'];

  const filteredItems = selectedCategory === 'All' 
    ? mockGalleryItems 
    : mockGalleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-100">
          <Camera className="w-4 h-4 text-emerald-600" />
          <span>Campus Life & Cultural Gallery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Campus Life in India
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          From top-tier research laboratories and historic convocation halls to Asia's largest youth cultural festivals — take a visual tour of Indian university life.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold rounded-lg">
                {item.category}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 block mb-0.5">
                  {item.universityName}
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 bg-slate-900">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    {activeImage.universityName} • {activeImage.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    {activeImage.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
