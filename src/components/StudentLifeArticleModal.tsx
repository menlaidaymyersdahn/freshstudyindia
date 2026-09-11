import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { getWhatsAppConfig } from '../config/company';
import { StudentLifeNewsletter } from './StudentLifeNewsletter';

interface StudentLifeArticleModalProps {
  article: BlogPost | null;
  onClose: () => void;
  onOpenArticle: (article: BlogPost) => void;
  allArticles: BlogPost[];
  onOpenApplication?: () => void;
}

export const StudentLifeArticleModal: React.FC<StudentLifeArticleModalProps> = ({
  article,
  onClose,
  onOpenArticle,
  allArticles,
  onOpenApplication
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (article) {
      setLiked(false);
      setLikeCount(article.likes || 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const handleShareLink = () => {
    try {
      const url = `${window.location.origin}/student-life?article=${article.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (_) {}
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this article on Student Life in India: "${article.title}" at Myers Global Pathways\n\n${window.location.origin}/student-life?article=${article.slug}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleToggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    }
  };

  // Filter related articles in same category or overall
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Campus Events':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Cultural Guides':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Success Stories':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-sky-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Share */}
            <button
              onClick={handleShareWhatsApp}
              title="Share via WhatsApp"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleShareLink}
              title="Copy article link"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-5 sm:px-8 md:px-10 py-6 space-y-8 flex-1">
          
          {/* Article Header Metadata */}
          <div className="space-y-4">
            <h1 
              id="article-modal-title" 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight"
            >
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author Profile Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 pb-4 border-y border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-sm shrink-0">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {article.author.name}
                  </div>
                  <div className="text-slate-500">
                    {article.author.role} {article.author.university ? `• ${article.author.university}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {article.publishedAt}
                </span>

                <button
                  onClick={handleToggleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer font-semibold ${
                    liked 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video max-h-[380px] w-full bg-slate-100">
            <img 
              src={article.coverImage} 
              alt={article.coverImageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Content Sections */}
          <div className="space-y-8 text-slate-800">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {section.heading}
                  </h2>
                )}

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {section.text}
                </p>

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 my-3 pl-1">
                    {section.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Quote Callout */}
                {section.quote && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-600 text-slate-800 italic my-4 shadow-xs">
                    <p className="text-base sm:text-lg leading-relaxed">
                      "{section.quote}"
                    </p>
                  </div>
                )}

                {/* Practical Tip Callout */}
                {section.tip && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3 text-sm sm:text-base my-3">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5 text-amber-900">Advisor Practical Tip:</span>
                      <span>{section.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 pb-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                Topics:
              </span>
              {article.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Admissions Counselor Direct Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-lg space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-300/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized University Guidance</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ready to write your own success story in India?
            </h3>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Myers Global Pathways assists international students through every step — university admission letters, scholarship assessments, student visa dossiers, and airport arrival support.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenApplication) onOpenApplication();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Start Your Application</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppConfig().url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat with Student Advisor</span>
              </a>
            </div>
          </div>

          {/* Compact Newsletter Subscription */}
          <StudentLifeNewsletter variant="compact" className="my-6" />

          {/* Related Articles Strip */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>More Guides & Stories on Student Life</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onOpenArticle(rel)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white flex flex-col justify-between group text-left"
                  >
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block mb-2 ${getCategoryColor(rel.category)}`}>
                        {rel.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{rel.readTime}</span>
                      <span className="text-blue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Read <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
