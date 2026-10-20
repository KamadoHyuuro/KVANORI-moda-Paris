import React from 'react';

interface ReazzipiLogoProps {
  /**
   * Layout format:
   * - 'full': Centered vertical stack (Star + KVANORI + — MODA VINTAGE —)
   * - 'horizontal': Balanced horizontal composition suitable for navigation header bars
   * - 'compact': Wordmark with subtle star accent
   * - 'mark': Celestial 4-pointed star emblem only
   */
  variant?: 'full' | 'horizontal' | 'compact' | 'mark';
  /**
   * Color theme:
   * - 'espresso': Signature deep vintage chocolate brown (#36190D) from the brand artwork
   * - 'light': Warm ivory / cream (#FAF8F5) for dark backgrounds (Footer / Admin bar)
   * - 'current': Inherits currentColor
   */
  theme?: 'espresso' | 'light' | 'current';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const ReazzipiLogo: React.FC<ReazzipiLogoProps> = ({
  variant = 'full',
  theme = 'espresso',
  size = 'md',
  className = '',
  onClick,
}) => {
  const colorHex = 
    theme === 'espresso' ? '#36190D' : 
    theme === 'light' ? '#FAF8F5' : 
    'currentColor';

  // 4-Point Celestial Sparkle Star Path
  const StarIcon = ({ sizePx = 28, className: iconClass = '' }: { sizePx?: number; className?: string }) => (
    <svg 
      width={sizePx} 
      height={sizePx} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${iconClass}`}
      style={{ color: colorHex }}
    >
      <path 
        d="M 32 4 C 32.5 18 38 28.5 58 32 C 38 35.5 32.5 46 32 60 C 31.5 46 26 35.5 6 32 C 26 28.5 31.5 18 32 4 Z" 
        fill="currentColor"
      />
    </svg>
  );

  if (variant === 'mark') {
    const starSizes = {
      xs: 18,
      sm: 24,
      md: 32,
      lg: 44,
      xl: 60,
    };
    return (
      <div 
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
        aria-label="KVANORI"
      >
        <StarIcon sizePx={starSizes[size]} />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div 
        className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
        aria-label="KVANORI — Moda Vintage"
        style={{ color: colorHex }}
      >
        <StarIcon sizePx={size === 'sm' ? 22 : size === 'lg' ? 34 : 26} />
        
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-baseline gap-1">
            <span 
              className="font-serif font-bold tracking-[0.03em]"
              style={{
                fontFamily: "'Bodoni Moda', 'Playfair Display', 'Cormorant Garamond', serif",
                fontSize: size === 'sm' ? '1.35rem' : size === 'lg' ? '2.1rem' : '1.75rem',
                lineHeight: 1,
              }}
            >
              KVANORI
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 mt-1 opacity-90">
            <span className="w-3.5 h-[1px] bg-current opacity-70" />
            <span className="text-[8.5px] uppercase tracking-[0.24em] font-medium font-sans">
              Moda Vintage
            </span>
            <span className="w-3.5 h-[1px] bg-current opacity-70" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-2 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
        aria-label="KVANORI"
        style={{ color: colorHex }}
      >
        <StarIcon sizePx={size === 'sm' ? 18 : 22} />
        <span 
          className="font-serif font-bold tracking-[0.03em]"
          style={{
            fontFamily: "'Bodoni Moda', 'Playfair Display', 'Cormorant Garamond', serif",
            fontSize: size === 'sm' ? '1.25rem' : size === 'lg' ? '1.9rem' : '1.5rem',
            lineHeight: 1,
          }}
        >
          KVANORI
        </span>
      </div>
    );
  }

  // Default: 'full' — Bespoke brand representation
  const scaleMap = {
    xs: { width: 140, starSize: 20, fontSize: '1.4rem', tagSize: '8px', dashWidth: '16px' },
    sm: { width: 175, starSize: 24, fontSize: '1.8rem', tagSize: '9px', dashWidth: '22px' },
    md: { width: 220, starSize: 32, fontSize: '2.3rem', tagSize: '10.5px', dashWidth: '28px' },
    lg: { width: 270, starSize: 40, fontSize: '2.85rem', tagSize: '12px', dashWidth: '36px' },
    xl: { width: 340, starSize: 52, fontSize: '3.6rem', tagSize: '14px', dashWidth: '46px' },
  };

  const currentScale = scaleMap[size];

  return (
    <div 
      className={`flex flex-col items-center justify-center text-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      aria-label="KVANORI — Moda Vintage"
      style={{ color: colorHex, maxWidth: '100%' }}
    >
      {/* 1. Celestial 4-pointed Star */}
      <div className="flex items-center justify-center mb-1.5 transition-transform duration-300 hover:rotate-12">
        <StarIcon sizePx={currentScale.starSize} />
      </div>

      {/* 2. KVANORI Typographic Display */}
      <div className="relative inline-block leading-none px-2">
        <span 
          className="font-serif font-bold tracking-[0.03em] block"
          style={{
            fontFamily: "'Bodoni Moda', 'Playfair Display', 'Cormorant Garamond', serif",
            fontSize: currentScale.fontSize,
            lineHeight: 1.05,
            letterSpacing: '0.04em',
          }}
        >
          KVANORI
        </span>

        {/* Subtle refined accent stroke */}
        <svg 
          className="absolute -bottom-1 left-2 pointer-events-none opacity-80"
          width="50%" 
          height="6" 
          viewBox="0 0 100 12" 
          fill="none"
        >
          <path 
            d="M 5 2 C 25 10 50 11 95 3 C 70 8 40 7 12 1 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 3. Subtitle: — MODA VINTAGE — */}
      <div className="flex items-center justify-center gap-2 mt-2.5 w-full opacity-90">
        <span 
          className="h-[1px] bg-current opacity-70 shrink-0" 
          style={{ width: currentScale.dashWidth }} 
        />
        <span 
          className="uppercase tracking-[0.3em] font-sans font-medium whitespace-nowrap"
          style={{ fontSize: currentScale.tagSize }}
        >
          Moda Vintage
        </span>
        <span 
          className="h-[1px] bg-current opacity-70 shrink-0" 
          style={{ width: currentScale.dashWidth }} 
        />
      </div>
    </div>
  );
};
