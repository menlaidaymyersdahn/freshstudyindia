import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function useDynamicSEO({
  title = 'Fresh Study India | Study in India — International Admissions & Student Advisory',
  description = 'Helping students from Africa and around the world study in India. Dedicated guidance for university admissions, student visas, accommodation, and airport arrival assistance.',
  keywords = 'Study in India, International Student Admissions India, African Students in India, Study in India Liberia Desk, Indian University Admissions, India Student Visa Guidance, Computer Science Engineering India, MBA in India for International Students, Fresh Study India',
  image = '/og-image.svg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://freshstudyindia.com',
  type = 'website'
}: SEOProps = {}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'keywords', keywords);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:site_name', 'Fresh Study India');

    // Ensure absolute image URL if available
    const resolvedImage = image.startsWith('http') 
      ? image 
      : `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`;
    
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:image:secure_url', resolvedImage);
    setMetaTag('property', 'og:image:alt', title);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', resolvedImage);
    setMetaTag('name', 'twitter:image:alt', title);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, keywords, image, url, type]);
}
