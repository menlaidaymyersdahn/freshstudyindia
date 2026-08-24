import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  fallbackSrcs?: string[];
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  fallbackSrcs = [],
  alt,
  className = '',
  loading = 'lazy',
  ...rest
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(-1);
  const [hasError, setHasError] = useState(false);

  // Combine primary src, optional fallbackSrc, and optional fallbackSrcs array
  const candidateFallbacks = [
    ...(fallbackSrc ? [fallbackSrc] : []),
    ...fallbackSrcs
  ];
  const allSources = Array.from(new Set([src, ...candidateFallbacks].filter(Boolean)));
  const activeSrc = currentSrcIndex === -1 ? src : allSources[currentSrcIndex] || src;

  const handleError = () => {
    const nextIndex = (currentSrcIndex === -1 ? 0 : currentSrcIndex) + 1;
    if (nextIndex < allSources.length) {
      setCurrentSrcIndex(nextIndex);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Fallback container if all image sources fail
    return (
      <div className={`bg-slate-900 flex items-center justify-center text-slate-500 ${className}`}>
        <span className="text-xs font-mono">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      {...rest}
    />
  );
};
