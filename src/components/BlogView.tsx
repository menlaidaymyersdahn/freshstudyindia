import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, User, ArrowRight, X } from 'lucide-react';

interface BlogViewProps {
  posts?: BlogPost[];
  blogPosts?: BlogPost[];
}

export const BlogView: React.FC<BlogViewProps> = ({ posts, blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const displayPosts = posts || blogPosts || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
          Knowledge & Guides
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Admissions & <span className="text-emerald-400">Visa Masterclass</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-xl">
          Expert articles from ex-admissions directors and visa compliance specialists.
        </p>
      </div>

      {/* Posts Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <User className="w-3 h-3 text-emerald-600" />
                {post.author.split(' ')[0]}
              </span>

              <button
                onClick={() => setSelectedPost(post)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                Read <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-52 rounded-2xl overflow-hidden">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-6">
                <div>
                  <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md mb-2 inline-block">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-xl font-bold text-white">{selectedPost.title}</h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium border-b border-slate-100 pb-3">
              <span>Author: <strong className="text-slate-800">{selectedPost.author}</strong></span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="prose prose-xs max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
