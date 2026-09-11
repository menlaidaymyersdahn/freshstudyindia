import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  MessageSquarePlus,
  Flame,
  BookOpen,
  Send,
  Users
} from 'lucide-react';
import { BlogPost } from '../types';
import { fetchBlogPostsFromFirestore } from '../lib/firebase';
import { StudentLifeArticleModal } from './StudentLifeArticleModal';
import { StudentStorySubmissionModal } from './StudentStorySubmissionModal';
import { StudentLifeNewsletter } from './StudentLifeNewsletter';

interface HomeStudentLifeSectionProps {
  onOpenApplication?: (preset?: any) => void;
}

export const HomeStudentLifeSection: React.FC<HomeStudentLifeSectionProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch genuine articles published in Firestore
  useEffect(() => {
    let isMounted = true;
    async function loadRealArticles() {
      try {
        const posts = await fetchBlogPostsFromFirestore();
        if (isMounted && posts && posts.length > 0) {
          setArticles(posts);
        }
      } catch (err) {
        console.warn('Could not load blog posts:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRealArticles();
    return () => { isMounted = false; };
  }, []);

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Campus Events':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'Cultural Guides':
        return 'bg-blue-100 text-blue-950 border-blue-300';
      case 'Success Stories':
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const hasArticles = articles.length > 0;
  const featuredArticle = articles.find(p => p.featured) || articles[0];
  const otherArticles = articles.filter(p => p.id !== featuredArticle?.id).slice(0, 2);
  const spotlightArticles = featuredArticle ? [featuredArticle, ...otherArticles] : [];

  return (
    <section 
      id="student-life-blog-section"
      className="py-16 sm:py-20 bg-white/85 backdrop-blur-md border-y border-sky-200/80 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold">
              <Newspaper className="w-3.5 h-3.5 text-blue-700" />
              <span>Campus Life, Culture & Insights</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Student Life & <span className="text-blue-700">Campus Blog</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Stay connected with authentic dispatches from Indian universities: annual cultural festivals, authentic dining guides, hostel life, and international graduate success journeys.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSubmissionOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquarePlus className="w-4 h-4 text-blue-600" />
              <span>Share Story</span>
            </button>

            <button
              onClick={() => navigate('/student-life')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm group"
            >
              <span>Explore Blog Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Real Articles Grid (Rendered only when genuine articles exist in Firestore) */}
        {hasArticles ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {spotlightArticles.map((article, index) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group bg-white rounded-2xl border border-sky-200/90 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Cover Image */}
                  {article.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={article.coverImage}
                        alt={article.coverImageAlt || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(article.category)}`}>
                          {article.category}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-0.5 shadow-xs">
                            <Flame className="w-3 h-3 text-slate-950" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {article.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-700 transition-colors tracking-tight line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                      {article.author?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="text-xs text-slate-700 font-semibold truncate max-w-[130px]">
                      {article.author?.name || 'Myers Advisor'}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-700 group-hover:text-blue-900 inline-flex items-center gap-0.5">
                    <span>Read Story</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {/* Real Newsletter Subscription Component */}
        <div className="mt-4">
          <StudentLifeNewsletter />
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <StudentLifeArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onOpenArticle={(article) => setSelectedArticle(article)}
          allArticles={articles}
          onOpenApplication={onOpenApplication}
        />
      )}

      {/* Student Story Submission Modal */}
      <StudentStorySubmissionModal
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
      />
    </section>
  );
};
