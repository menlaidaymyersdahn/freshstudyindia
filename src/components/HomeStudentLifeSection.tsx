import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      }
    }
    loadRealArticles();
    return () => { isMounted = false; };
  }, []);

  const hasArticles = articles.length > 0;
  const featuredArticle = articles.find((p) => p.featured) || articles[0];
  const otherArticles = articles.filter((p) => p.id !== featuredArticle?.id).slice(0, 2);
  const spotlightArticles = featuredArticle ? [featuredArticle, ...otherArticles] : [];

  return (
    <section
      id="student-life-blog-section"
      className="py-16 lg:py-24 bg-[#F7F5F0] text-[#181A1F] border-b border-[#181A1F]/[0.08] text-left"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#181A1F] leading-[1.15]">
              Student life and campus blog
            </h2>
            <p className="text-base text-[#4F535C] leading-relaxed">
              Dispatches from Indian universities covering campus festivals, hostel housing, daily living costs, and stories from international graduates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSubmissionOpen(true)}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#EFECE4] text-[#181A1F] border border-[#181A1F]/[0.14] text-sm font-medium transition-ui cursor-pointer"
            >
              Share a story
            </button>

            <button
              type="button"
              onClick={() => navigate('/student-life')}
              className="px-4 py-2 rounded-lg bg-transparent hover:bg-white text-[#181A1F] border border-[#181A1F]/[0.14] text-sm font-medium transition-ui inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Visit blog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real Articles Grid (Rendered only when genuine articles exist in Firestore) */}
        {hasArticles && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightArticles.map((article, index) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group bg-white rounded-2xl border border-[#181A1F]/[0.08] hover:border-[#181A1F]/[0.20] transition-ui flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {article.coverImage && (
                    <div className="aspect-video w-full overflow-hidden bg-[#EFECE4] border-b border-[#181A1F]/[0.08]">
                      <img
                        src={article.coverImage}
                        alt={article.coverImageAlt || article.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E727D]">
                      <span className="text-[#A63A24] font-medium">
                        {article.category}
                      </span>
                      {index === 0 && <span>· Featured</span>}
                      <span>· {article.publishedAt}</span>
                      <span>· {article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-medium text-[#181A1F] group-hover:text-[#A63A24] transition-ui tracking-[-0.01em] line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-[#4F535C] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-[#181A1F]/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[#4F535C] truncate max-w-[160px]">
                    {article.author?.name || 'Myers Advisor'}
                  </span>
                  <span className="font-medium text-[#181A1F] group-hover:text-[#A63A24] inline-flex items-center gap-1 transition-ui">
                    <span>Read story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Real Newsletter Subscription Component */}
        <StudentLifeNewsletter />

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
