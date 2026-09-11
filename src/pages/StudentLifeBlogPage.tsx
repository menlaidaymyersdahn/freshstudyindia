import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ApplicationCTA } from '../components/ApplicationCTA';
import { useSEO } from '../hooks/useSEO';
import { 
  STUDENT_LIFE_BLOG_POSTS, 
  STUDENT_LIFE_QUICK_FACTS, 
  STUDENT_LIFE_FAQS 
} from '../data/studentLifeBlogData';
import { BlogPost, BlogCategory } from '../types';
import { StudentLifeArticleModal } from '../components/StudentLifeArticleModal';
import { StudentStorySubmissionModal } from '../components/StudentStorySubmissionModal';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Users, 
  Heart, 
  Flame, 
  MessageSquarePlus, 
  CheckCircle2, 
  Compass, 
  GraduationCap, 
  ShieldCheck,
  X
} from 'lucide-react';
import { fetchBlogPostsFromFirestore } from '../lib/firebase';

interface StudentLifeBlogPageProps {
  onOpenApplication?: (preset?: any) => void;
}

export const StudentLifeBlogPage: React.FC<StudentLifeBlogPageProps> = ({ onOpenApplication }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // SEO setup
  useSEO({
    title: 'Student Life in India | Campus Events, Cultural Guides & Success Stories',
    description: 'Explore authentic updates on Indian university campus events, cultural survival guides, hostel life, and international student success stories with Myers Global Pathways.',
    canonicalPath: '/student-life',
    keywords: 'Student Life in India, Campus Events India, African Students in India, Cultural Guides India, Indian University Fests, Study in India Success Stories, International Student Hostels India'
  });

  // Category and Search State
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Articles state (combines seed data + any Firestore dynamic updates)
  const [articles, setArticles] = useState<BlogPost[]>(STUDENT_LIFE_BLOG_POSTS);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Load custom blog posts from Firestore if available
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicPosts() {
      try {
        const dynamicPosts = await fetchBlogPostsFromFirestore();
        if (isMounted && dynamicPosts && dynamicPosts.length > 0) {
          // Merge dynamic posts on top of curated seed posts avoiding duplicates
          const dynamicIds = new Set(dynamicPosts.map(p => p.slug || p.id));
          const filteredSeed = STUDENT_LIFE_BLOG_POSTS.filter(p => !dynamicIds.has(p.slug) && !dynamicIds.has(p.id));
          setArticles([...dynamicPosts, ...filteredSeed]);
        }
      } catch (_) {}
    }
    loadDynamicPosts();
    return () => { isMounted = false; };
  }, []);

  // Check URL query param for direct article deep linking (?article=slug)
  useEffect(() => {
    const articleSlug = searchParams.get('article');
    if (articleSlug) {
      const match = articles.find(a => a.slug === articleSlug || a.id === articleSlug);
      if (match) {
        setSelectedArticle(match);
      }
    }
  }, [searchParams, articles]);

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
    setSearchParams({ article: article.slug });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setSearchParams({});
  };

  const handleApply = (preset?: any) => {
    if (onOpenApplication) {
      onOpenApplication(preset);
    } else {
      navigate('/apply');
    }
  };

  // Filtered list based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(t => t.toLowerCase().includes(query)) ||
        (article.author?.name && article.author.name.toLowerCase().includes(query)) ||
        (article.author?.university && article.author.university.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Lead featured article
  const featuredArticle = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery.trim()) {
      return articles.find(a => a.featured) || articles[0];
    }
    return null;
  }, [articles, activeCategory, searchQuery]);

  // Non-featured articles for the grid
  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter(a => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      All: articles.length,
      'Campus Events': articles.filter(a => a.category === 'Campus Events').length,
      'Cultural Guides': articles.filter(a => a.category === 'Cultural Guides').length,
      'Success Stories': articles.filter(a => a.category === 'Success Stories').length
    };
  }, [articles]);

  const getCategoryBadgeClass = (cat: string) => {
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
    <div className="animate-fadeIn pb-12">
      {/* 1. Page Header with Breadcrumb & Editorial Design */}
      <PageHeader
        badge="Campus Life, Culture & Journeys"
        title="Student Life in"
        highlightedWord="India"
        description="Real experiences, campus cultural festivals, dining guides, and inspiring graduate success stories from international scholars who made India their second home."
        currentPage="Student Life"
        onNavigateHome={() => navigate('/')}
        onOpenApplication={() => handleApply()}
        bgImage="/DSC_9531.jpeg"
      />

      {/* 2. Key Facts / Metrics Strip */}
      <section className="bg-white border-b border-sky-200 py-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STUDENT_LIFE_QUICK_FACTS.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
                  {idx === 0 && <Users className="w-5 h-5" />}
                  {idx === 1 && <GraduationCap className="w-5 h-5" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 3 && <Compass className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                    {fact.stat}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {fact.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {fact.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 text-left">
        
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Campus Events', 'Cultural Guides', 'Success Stories'] as BlogCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCategory === cat ? 'bg-blue-800 text-blue-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box & Submit Story Action */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, guides, stories..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsSubmissionModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              title="Share your student story or campus event"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span className="hidden sm:inline">Share Your Story</span>
            </button>
          </div>
        </div>

        {/* Active Filter Indicators if Search Query is entered */}
        {searchQuery && (
          <div className="mb-6 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span>
              Showing search results for: <strong>"{searchQuery}"</strong> ({filteredArticles.length} articles found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 4. Featured Hero Spotlight Card (Shown when on 'All' with no search filter) */}
        {featuredArticle && (
          <div className="mb-12">
            <div 
              onClick={() => handleSelectArticle(featuredArticle)}
              className="group relative bg-white rounded-2xl border border-sky-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 text-left"
            >
              {/* Image Side */}
              <div className="lg:col-span-7 relative overflow-hidden bg-slate-100 aspect-video lg:aspect-auto min-h-[280px]">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-slate-950" />
                    <span>Featured Story</span>
                  </span>
                </div>
              </div>

              {/* Text Content Side */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getCategoryBadgeClass(featuredArticle.category)}`}>
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-700 transition-colors tracking-tight leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                      {featuredArticle.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {featuredArticle.author.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {featuredArticle.author.country || 'India'}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-blue-700 group-hover:text-blue-900 inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Articles Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((post) => (
              <article
                key={post.id}
                onClick={() => handleSelectArticle(post)}
                className="group bg-white rounded-2xl border border-sky-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-700 transition-colors tracking-tight line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Strip with Author and CTA */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                      {post.author.name.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-700 font-semibold truncate max-w-[130px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-700 group-hover:text-blue-900 inline-flex items-center gap-0.5">
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching articles found
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              We couldn't find any articles matching "{searchQuery}" in category "{activeCategory}". Try clearing your filters or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 6. Community Invitation Banner: Share your campus experiences */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg relative overflow-hidden text-left">
          <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>International Student Voices</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you currently studying in India?
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Share your university campus fest photos, hostel culinary survival tips, or academic achievements with Myers Global Pathways. Help prospective scholars from across the globe take confident steps toward their education in India.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsSubmissionModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Submit a Story or Campus Update</span>
              </button>

              <button
                onClick={() => handleApply()}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Apply as an International Student</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 7. Practical Student Life Q&A Accordion */}
        <div className="mt-16 space-y-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Everyday Essentials</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Essential Student Life FAQs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Quick answers to the most common questions international students and parents ask about campus safety, accommodation, and daily life in India.
            </p>
          </div>

          <div className="space-y-3">
            {STUDENT_LIFE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-sky-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* 8. Conversion Application CTA Banner */}
      <ApplicationCTA
        onOpenApplication={() => handleApply()}
        onContactClick={() => navigate('/contact')}
      />

      {/* 9. Article Reader Modal */}
      <StudentLifeArticleModal
        article={selectedArticle}
        onClose={handleCloseArticle}
        onOpenArticle={(article) => handleSelectArticle(article)}
        allArticles={articles}
        onOpenApplication={() => handleApply()}
      />

      {/* 10. Student Story Contribution Modal */}
      <StudentStorySubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
};

export default StudentLifeBlogPage;
