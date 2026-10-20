import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  productId: string;
  productName?: string;
  category?: string;
  colorHex?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  productId,
  productName = 'Pièce d’Atelier',
  category = 'Collection',
  colorHex = '#181716',
  className = 'w-full h-full object-cover object-center',
  loading = 'lazy'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If the image fails to load or error occurs, display an exclusive editorial archive plate
  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-[#F4EFE6] border border-[#E3DACB] text-center select-none relative overflow-hidden">
        {/* Subtle decorative borders */}
        <div className="absolute inset-2 border border-[#D8CEBC]/70 pointer-events-none" />
        
        {/* Top Header */}
        <div className="relative z-10 space-y-0.5 pt-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#857D71] font-sans block">
            Atelier KVANORI
          </span>
          <span className="text-[9px] tracking-widest text-[#A89E90] uppercase block">
            Paris, 1986
          </span>
        </div>

        {/* Center Monogram & Product Ident */}
        <div className="relative z-10 flex flex-col items-center space-y-2 py-3">
          <div 
            className="w-8 h-8 rounded-full border border-white/60 shadow-xs flex items-center justify-center text-[10px] font-serif font-bold text-white tracking-wider"
            style={{ backgroundColor: colorHex }}
            title={`Nuance: ${colorHex}`}
          >
            RG
          </div>
          <h4 className="font-serif italic text-base sm:text-lg text-[#25221F] max-w-[200px] leading-snug">
            {productName}
          </h4>
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#6E675B] font-medium">
            {category}
          </span>
        </div>

        {/* Bottom Archive Reference */}
        <div className="relative z-10 pb-2 border-t border-[#E3DACB] pt-2 w-full max-w-[180px]">
          <span className="text-[9px] tracking-wider uppercase font-mono text-[#948B7D]">
            Ref. {productId}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#ECE6DC]">
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
