import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'emblem-only';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showTagline?: boolean;
}

export const BrandEmblem: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = "w-10 h-10",
  size
}) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Myers Global Pathways Emblem"
    >
      {/* Top Black Curve - Stylized Upper Wave / Letter E Cap */}
      <path 
        d="M 32 94 C 36 94, 52 92, 68 85 C 80 80, 88 64, 100 64 C 114 64, 126 73, 131 87 L 168 87 C 163 60, 135 40, 100 40 C 65 40, 42 62, 32 94 Z" 
        fill="currentColor"
        className="text-slate-950 dark:text-slate-900"
      />
      <path 
        d="M 40 94 C 54 94, 82 94, 114 94 C 138 94, 158 94, 168 87 C 158 52, 132 40, 100 40 C 62 40, 44 64, 32 94 C 34 94, 37 94, 40 94 Z"
        fill="#111827"
      />
      {/* Refined Accurate Top Arc */}
      <path 
        d="M 34 95 C 44 94, 60 76, 82 66 C 92 61, 108 61, 118 66 C 132 73, 140 84, 144 95 L 170 95 C 165 60, 137 42, 100 42 C 60 42, 40 68, 34 95 Z"
        fill="#111827"
      />
      {/* Center Dynamic Loop of the E */}
      <path
        d="M 72 95 C 72 82, 85 71, 101 71 C 117 71, 128 82, 130 95 Z"
        fill="#FFFFFF"
      />
      
      {/* Bottom Golden Arc */}
      <path 
        d="M 44 105 C 50 138, 72 158, 100 158 C 132 158, 156 140, 166 112 C 172 106, 178 105, 184 105 C 174 115, 166 128, 150 144 C 137 155, 119 162, 100 162 C 62 162, 38 136, 44 105 Z" 
        fill="#D99B26" 
      />
      <path 
        d="M 44 105 C 42 118, 54 140, 76 151 C 88 156, 112 156, 126 151 C 144 142, 160 126, 180 105 C 160 110, 142 128, 122 135 C 108 140, 92 140, 78 135 C 60 128, 48 116, 44 105 Z"
        fill="#DB9A24"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'auto',
  className = '',
  showTagline = true
}) => {
  const isLightText = theme === 'light';

  // Sizing definitions
  const emblemSizes = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const titleSizes = {
    xs: 'text-sm font-black tracking-tight',
    sm: 'text-base font-black tracking-tight',
    md: 'text-lg sm:text-xl font-extrabold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
    xl: 'text-3xl sm:text-4xl font-extrabold tracking-tight'
  };

  const subtitleSizes = {
    xs: 'text-[9px] tracking-widest font-bold uppercase',
    sm: 'text-[10px] tracking-wider font-bold uppercase',
    md: 'text-[10px] sm:text-[11px] tracking-widest font-bold uppercase',
    lg: 'text-xs sm:text-sm tracking-widest font-bold uppercase',
    xl: 'text-sm sm:text-base tracking-widest font-bold uppercase'
  };

  if (variant === 'emblem-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={emblemSizes[size]}
        >
          {/* Main Accurate Vector Geometry matching the user's uploaded logo */}
          <g>
            {/* Top Black Arc / Wave of E */}
            <path 
              d="M 30 95 C 38 60, 64 38, 100 38 C 138 38, 164 62, 170 95 L 140 95 C 136 78, 122 66, 100 66 C 78 66, 64 78, 58 95 Z" 
              fill={isLightText ? "#FFFFFF" : "#111827"} 
            />
            <path 
              d="M 58 95 C 62 82, 78 72, 100 72 C 122 72, 138 82, 142 95 Z" 
              fill={isLightText ? "#1E293B" : "#FFFFFF"} 
            />
            {/* Middle aerodynamic cutout */}
            <path 
              d="M 30 95 L 170 95 C 160 92, 140 90, 115 90 C 70 90, 48 93, 30 95 Z" 
              fill={isLightText ? "#FFFFFF" : "#111827"} 
            />

            {/* Bottom Gold Arc / Pathway Curve */}
            <path 
              d="M 40 105 C 46 138, 68 162, 100 162 C 132 162, 154 138, 160 105 L 180 105 C 172 148, 140 180, 100 180 C 60 180, 28 148, 20 105 Z" 
              fill="#D99B26" 
            />
            <path 
              d="M 40 105 C 46 138, 68 162, 100 162 C 132 162, 154 138, 160 105 L 184 105 C 174 122, 150 148, 124 156 C 108 160, 92 160, 76 154 C 54 144, 42 126, 40 105 Z" 
              fill="#DB9A24" 
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={emblemSizes[size]}
        >
          {/* Top Black Arc */}
          <path 
            d="M 28 95 C 36 56, 64 36, 100 36 C 136 36, 164 56, 172 95 L 140 95 C 135 75, 120 62, 100 62 C 80 62, 65 75, 60 95 Z" 
            fill={isLightText ? "#FFFFFF" : "#111827"} 
          />
          {/* Inner cutout loop */}
          <path 
            d="M 60 95 C 64 80, 80 70, 100 70 C 120 70, 136 80, 140 95 Z" 
            fill={isLightText ? "#0F172A" : "#FFFFFF"} 
          />
          {/* Bottom Gold Arc */}
          <path 
            d="M 40 105 C 46 138, 70 164, 100 164 C 130 164, 154 138, 160 105 L 186 105 C 178 126, 154 154, 126 163 C 110 168, 90 168, 74 163 C 50 152, 42 130, 40 105 Z" 
            fill="#D99B26" 
          />
        </svg>

        <div className="mt-3 flex flex-col items-center">
          <span className={`${titleSizes[size]} ${isLightText ? 'text-white' : 'text-slate-900'} leading-none tracking-wider`}>
            MYERS
          </span>
          <span className={`${subtitleSizes[size]} ${isLightText ? 'text-amber-400' : 'text-slate-800'} mt-1 font-extrabold tracking-widest`}>
            GLOBAL PATHWAYS
          </span>
          {showTagline && (
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold mt-1">
              International Admissions Advisory
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal layout
  return (
    <div className={`inline-flex items-center gap-3.5 group text-left ${className}`}>
      <div className="shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={emblemSizes[size]}
        >
          {/* Top Arc (Charcoal Black / White on dark) */}
          <path 
            d="M 28 95 C 36 56, 64 36, 100 36 C 136 36, 164 56, 172 95 L 138 95 C 133 74, 119 62, 100 62 C 81 62, 67 74, 62 95 Z" 
            fill={isLightText ? "#FFFFFF" : "#111827"} 
          />
          {/* Center Cutout of the top loop */}
          <path 
            d="M 62 95 C 66 79, 81 69, 100 69 C 119 69, 134 79, 138 95 Z" 
            fill={isLightText ? "#0F172A" : "#FFFFFF"} 
          />
          {/* Bottom Gold/Amber Arc */}
          <path 
            d="M 40 105 C 46 138, 70 164, 100 164 C 130 164, 154 138, 160 105 L 186 105 C 178 126, 154 154, 126 163 C 110 168, 90 168, 74 163 C 50 152, 42 130, 40 105 Z" 
            fill="#D99B26" 
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`${titleSizes[size]} ${isLightText ? 'text-white' : 'text-slate-900'} leading-tight group-hover:text-blue-900 transition-colors`}>
            MYERS
          </span>
          <span className={`${titleSizes[size]} ${isLightText ? 'text-amber-400' : 'text-[#D99B26]'} font-extrabold leading-tight`}>
            GLOBAL
          </span>
          <span className={`${titleSizes[size]} ${isLightText ? 'text-slate-200' : 'text-slate-900'} font-black leading-tight`}>
            PATHWAYS
          </span>
        </div>
        {showTagline && (
          <span className={`${subtitleSizes[size]} ${isLightText ? 'text-slate-400' : 'text-slate-500'} leading-normal`}>
            International Admissions Advisory
          </span>
        )}
      </div>
    </div>
  );
};
