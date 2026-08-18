import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  delayMs?: number;
  direction?: 'up' | 'none';
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  delayMs = 0,
  direction = 'up',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const effectiveDelay = delay || delayMs;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Support reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const translateClass =
    direction === 'up'
      ? isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-6 sm:translate-y-8 opacity-0'
      : isVisible
      ? 'opacity-100'
      : 'opacity-0';

  return (
    <div
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${effectiveDelay}ms`,
      }}
      className={`transition-all duration-700 ease-out will-change-transform ${translateClass} ${className}`}
    >
      {children}
    </div>
  );
};
