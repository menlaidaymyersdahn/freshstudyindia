import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
}

export function useSEO({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/og-image.svg',
  keywords,
  noIndex = false
}: SEOProps) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Description & Keywords
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Robots
    if (noIndex) {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // 4. Open Graph Meta Tags
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : (canonicalPath ? `/${canonicalPath}` : '/');
    const fullUrl = `https://myersglobalpathways.com${cleanPath === '/' ? '/' : cleanPath}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://myersglobalpathways.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Myers Global Pathways');
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', fullOgImage);
    updateMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', fullOgImage);
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 5. Twitter Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullOgImage);

    // 6. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

  }, [title, description, canonicalPath, ogType, ogImage, keywords, noIndex]);
}
