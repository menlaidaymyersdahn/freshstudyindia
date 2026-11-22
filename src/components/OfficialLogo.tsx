import React from 'react';
import { COMPANY } from '../config/company';

export type OfficialLogoVariant = 'header' | 'badge' | 'full';
export type OfficialLogoSize = 'sm' | 'md' | 'lg';

interface OfficialLogoProps {
  variant?: OfficialLogoVariant;
  size?: OfficialLogoSize;
  className?: string;
  showWordmark?: boolean;
}

/**
 * Official Myers Global Pathways brand logo component.
 * Uses only the verified uploaded official logo assets (never generated or placeholder marks).
 */
export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  variant = 'header',
  size = 'md',
  className = '',
  showWordmark = true,
}) => {
  if (variant === 'badge') {
    const sizeClasses: Record<OfficialLogoSize, string> = {
      sm: 'px-2.5 py-1.5 rounded-lg',
      md: 'px-3.5 py-2 rounded-xl',
      lg: 'px-4 py-3 rounded-xl',
    };
    const imgHeights: Record<OfficialLogoSize, string> = {
      sm: 'h-8 sm:h-9',
      md: 'h-11 sm:h-12',
      lg: 'h-16 sm:h-[72px]',
    };

    return (
      <span
        className={`inline-flex items-center justify-center bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(7,20,38,0.14)] shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <img
          src="/mgp-logo-full.png"
          alt={COMPANY.shortName}
          width={739}
          height={625}
          loading="eager"
          decoding="async"
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </span>
    );
  }

  if (variant === 'full') {
    const imgHeights: Record<OfficialLogoSize, string> = {
      sm: 'h-10',
      md: 'h-14',
      lg: 'h-20',
    };

    return (
      <img
        src="/mgp-logo-full.png"
        alt={COMPANY.shortName}
        width={739}
        height={625}
        loading="eager"
        decoding="async"
        className={`${imgHeights[size]} w-auto object-contain block ${className}`}
      />
    );
  }

  // Default: 'header' — cropped official black-and-gold emblem beside Myers Global Pathways text
  const emblemSize =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8 sm:w-9 sm:h-9';

  return (
    <span className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      <img
        src="/mgp-logo-emblem.png"
        alt={`${COMPANY.shortName} emblem`}
        width={512}
        height={512}
        loading="eager"
        decoding="async"
        className={`${emblemSize} rounded-md object-contain bg-white shrink-0 block`}
      />
      {showWordmark && (
        <span className="font-display text-[15px] sm:text-[17px] font-bold tracking-[-0.02em] text-[#0B1F3A] whitespace-nowrap">
          {COMPANY.shortName}
        </span>
      )}
    </span>
  );
};
