import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { openProduct } = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size (e.g. '36' or 'P')
    const defaultSize = product.sizes[0];
    addToCart(product, selectedColor, defaultSize, 1);
  };

  const handleCardClick = () => {
    openProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group cursor-pointer flex flex-col transition-all duration-300 transform-gpu hover:-translate-y-1"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#EFEBE4] overflow-hidden border border-[#E7DFC5]/60">
        
        {/* Subtle Status Tag - Text only, NO PILL BOX */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 z-10 text-[11px] tracking-widest uppercase font-serif text-[#181716] bg-[#FAF8F5]/90 px-2 py-0.5 border border-[#181716]/10">
            Pièce Culte
          </div>
        )}
        {product.isNew && !product.isBestseller && (
          <div className="absolute top-3 left-3 z-10 text-[11px] tracking-widest uppercase font-serif text-[#6B1D2F] bg-[#FAF8F5]/90 px-2 py-0.5 border border-[#6B1D2F]/20">
            Nouveauté
          </div>
        )}

        {/* Exclusive Product Image with fallback support */}
        <ProductImage
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          productId={product.id}
          productName={product.name}
          category={product.category}
          colorHex={selectedColor?.hex || product.colors[0]?.hex}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Quick Add Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-[#FAF8F5] text-[#181716] hover:bg-white text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Adicionar Rápido</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProduct(product);
            }}
            className="p-2 bg-[#FAF8F5]/90 hover:bg-white text-[#181716] transition-colors"
            title="Ver detalhes da peça"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metadata Section - Zero Pill, Clean French Typography */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        
        {/* Category & Collection kicker */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7A756D]">
          <span>{product.category}</span>
          <span className="font-serif italic capitalize text-[#968F83] text-[12px]">Paris 1986</span>
        </div>

        {/* Product Name */}
        <h3 className="text-[15px] font-serif font-medium text-[#181716] group-hover:text-[#6B1D2F] transition-colors line-clamp-1 leading-snug">
          {product.name}
        </h3>

        {/* Price & Original Price */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-medium text-[#181716] tabular-nums tracking-tight">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9E968B] line-through tabular-nums">
              R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="pt-1.5 flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  selectedColor.name === color.name
                    ? 'ring-1 ring-offset-2 ring-[#181716] scale-110'
                    : 'hover:scale-105 opacity-85 hover:opacity-100'
                } ${color.border ? 'border border-[#C2BCB2]' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[11px] text-[#868075] ml-1 truncate font-serif italic">
              {selectedColor.name}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
