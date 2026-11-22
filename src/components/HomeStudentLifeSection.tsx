import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchBlogPostsFromFirestore } from '../lib/firebase';
import { StudentLifeArticleModal } from './StudentLifeArticleModal';
import { StudentStorySubmissionModal } from './StudentStorySubmissionModal';
import { StudentLifeNewsletter } from './StudentLifeNewsletter';

interface HomeStudentLifeSectionProps {
  onOpenApplication?: (preset?: any) => void;
}

export const HomeStudentLifeSection: React.FC<HomeStudentLifeSectionProps> = ({
  onOpenApplication
}) => {
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
    return () => {
      isMounted = false;
    };
  }, []);

  const hasArticles = articles.length > 0;
  const featuredArticle = articles.find((p) => p.featured) || articles[0];
  const otherArticles = articles.filter((p) => p.id !== featuredArticle?.id).slice(0, 2);
  const spotlightArticles = featuredArticle ? [featuredArticle, ...otherArticles] : [];

  return (
    <section
      id="student-life-blog-section"
      className="py-16 lg:py-24 bg-[#F4F6F9] text-[#0F172A] border-b border-slate-200/80 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#9A6D17]">
              Student Success &amp; Graduate Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0B1F3A] leading-[1.15] text-balance">
              Real International Graduates and Campus Milestones in India
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our consultancy is grounded in firsthand academic experience in India—supporting students from Liberia and across Africa through graduation and beyond.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSubmissionOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#0B1F3A] border border-slate-300 text-sm font-semibold transition-ui cursor-pointer min-h-[44px]"
            >
              Share Your Student Story
            </button>

            <button
              type="button"
              onClick={() => navigate('/student-life')}
              className="px-4 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132E54] text-white text-sm font-semibold transition-ui inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Explore Student Life</span>
              <ArrowRight className="w-4 h-4 text-[#E5B95C]" />
            </button>
          </div>
        </div>

        {/* Authentic Graduate Photograph Showcase (Real Uploaded Photos — Zero Invented Testimonials) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Primary Vertical Graduate Portrait Card */}
          <figure className="lg:col-span-5 rounded-xl bg-white border border-slate-200/90 overflow-hidden flex flex-col shadow-[0_2px_12px_rgba(11,31,58,0.04)]">
            <div className="aspect-[3/4] sm:aspect-[4/5] w-full bg-[#0B1F3A] overflow-hidden">
              <img
                src="/assets/aistudio/DSC_9531_web.jpg"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.fallbackUsed) {
                    target.dataset.fallbackUsed = 'true';
                    target.src = '/assets/aistudio/DSC_9531_2b32754d.jpeg';
                  }
                }}
                alt="Menlaiday Myers Dahn graduating with a B.Sc. in Computer Science at Shri Rawatpura Sarkar University, India (Class of 2026)"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <figcaption className="p-6 space-y-2 flex-1 flex flex-col justify-between bg-white">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9A6D17]">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  <span>Class of 2026 · Shri Rawatpura Sarkar University</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                  Menlaiday Myers Dahn — Founder &amp; Managing Director
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bachelor of Science in Computer Science graduate in Raipur, Chhattisgarh, India. Built Myers Global Pathways from direct personal experience navigating international university admissions, visas, and campus life in India.
                </p>
              </div>
            </figcaption>
          </figure>

          {/* Right Column: Cohort Ceremony Photo + Factual Student Journey Context */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <figure className="rounded-xl bg-white border border-slate-200/90 overflow-hidden flex-1 flex flex-col shadow-[0_2px_12px_rgba(11,31,58,0.04)]">
              <div className="aspect-[16/10] w-full bg-[#0B1F3A] overflow-hidden">
                <img
                  src="/assets/aistudio/DSC_9367_web.jpg"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.dataset.fallbackUsed) {
                      target.dataset.fallbackUsed = 'true';
                      target.src = '/assets/aistudio/DSC_9367_95782880.jpeg';
                    }
                  }}
                  alt="International graduating class seated together in graduation regalia during convocation in India"
                  className="w-full h-full object-cover object-[50%_26%]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <figcaption className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#9A6D17]">
                    Graduation Convocation · Raipur, India
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-[-0.015em]">
                    International Graduates Completing Degrees in Computer Science, IT &amp; Sciences
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    From arriving as first-year international students to walking across the convocation stage in graduation regalia, our advisory focuses on practical preparation, verified university enrollment, and sustained support across every semester.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Are you a current student or graduate in India? Contribute your story to guide future applicants.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmissionOpen(true)}
                    className="text-xs font-semibold text-[#0B1F3A] hover:text-[#9A6D17] inline-flex items-center gap-1.5 transition-ui cursor-pointer whitespace-nowrap"
                  >
                    <span>Submit a graduate story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Live Firestore Published Student Life Articles (Shown only when real published posts exist) */}
        {hasArticles && (
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              Latest Dispatches From Student Life
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlightArticles.map((article, index) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-[#0B1F3A]/35 transition-ui flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_1px_6px_rgba(11,31,58,0.03)]"
                >
                  <div>
                    {article.coverImage && (
                      <div className="aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-200/70">
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
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="text-[#9A6D17] font-semibold">
                          {article.category}
                        </span>
                        {index === 0 && <span>· Featured</span>}
                        <span>· {article.publishedAt}</span>
                        <span>· {article.readTime}</span>
                      </div>

                      <h4 className="font-display text-lg font-bold text-[#0B1F3A] group-hover:text-[#9A6D17] transition-ui tracking-[-0.01em] line-clamp-2 leading-snug">
                        {article.title}
                      </h4>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[160px]">
                      {article.author?.name || 'Myers Advisor'}
                    </span>
                    <span className="font-semibold text-[#0B1F3A] group-hover:text-[#9A6D17] inline-flex items-center gap-1 transition-ui">
                      <span>Read story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Preserved Newsletter Subscription */}
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

export default HomeStudentLifeSection;
