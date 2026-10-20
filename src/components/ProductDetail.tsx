import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Ruler, Sparkles } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStoreData } from '../context/StoreDataContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { products } = useStoreData();
  const { addToCart } = useCart();
  const { navigateTo, setIsSizeGuideOpen } = useNavigation();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Padrão', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '36');
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'detalhes' | 'composicao' | 'cuidados'>('detalhes');

  // Related complete look items resolved dynamically from Firestore products
  const completeLookProducts = (product.completeLookIds || [])
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 2200);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      {/* Breadcrumb / Back Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#736E66] hover:text-[#181716] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Voltar ao Catálogo</span>
          <span className="text-[#B3AAA0]">/</span>
          <span className="text-[#181716] font-medium">{product.category}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contiguous Purchase Module (PDP Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Gallery (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full bg-[#EFEBE4] overflow-hidden border border-[#E5DDD2] shadow-xs">
              <ProductImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} - Vista ${selectedImageIndex + 1}`}
                productId={product.id}
                productName={product.name}
                category={product.category}
                colorHex={selectedColor?.hex || product.colors[0]?.hex}
                loading="eager"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              
              {product.stock !== undefined && product.stock <= 2 && (
                <div className="absolute top-4 left-4 text-xs font-serif tracking-wider uppercase text-[#6B1D2F] bg-[#FAF8F5]/95 px-3 py-1 border border-[#6B1D2F]/20 z-10">
                  Últimas {product.stock} peças em estoque
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#181716] ring-1 ring-[#181716]'
                        : 'border-[#E0D8CC] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Editorial Story Quote */}
            {product.story && (
              <div className="p-6 bg-[#F3EDE2]/60 border border-[#E5DDD0] space-y-2 mt-6">
                <span className="text-[11px] uppercase tracking-widest text-[#7C7569]">Atelier KVANORI · Carnet de Style</span>
                <p className="font-serif italic text-base sm:text-lg text-[#2A2724] leading-relaxed">
                  “{product.story}”
                </p>
                {product.styleNote && (
                  <p className="text-xs text-[#6F685D] pt-1">
                    <span className="font-medium text-[#181716]">Dica de estilista:</span> {product.styleNote}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            {/* Header info */}
            <div className="border-b border-[#E8E1D5] pb-5 space-y-2">
              <div className="flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#7E7870]">
                <span>{product.category}</span>
                <span className="tabular-nums">Ref. RG-{product.id.slice(0, 6).toUpperCase()}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-[#181716] leading-tight font-medium">
                {product.name}
              </h1>

              {product.frenchSubtitle && (
                <p className="font-serif italic text-sm text-[#6C665C]">
                  {product.frenchSubtitle}
                </p>
              )}

              {/* Price */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl font-serif text-[#181716] tabular-nums font-semibold">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9C9488] line-through tabular-nums">
                    R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                )}
                <span className="text-xs text-[#6B1D2F] font-medium tracking-wide">
                  ou 6x de R$ {(product.price / 6).toFixed(2).replace('.', ',')} sem juros
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4E4B46] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                  <span className="text-[#181716] font-medium">Cor:</span>
                  <span className="text-[#686258] font-serif italic capitalize">{selectedColor.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`group relative p-0.5 rounded-full transition-all cursor-pointer ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-offset-2 ring-[#181716]'
                          : 'hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span
                        className={`block w-6 h-6 rounded-full ${color.border ? 'border border-[#C2BCB2]' : ''}`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection & Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                  <span className="text-[#181716] font-medium">Tamanho Francês:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[#6B1D2F] hover:underline cursor-pointer lowercase first-letter:uppercase"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guia de Medidas</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#33312E] border-[#DCD3C5] hover:border-[#181716]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Stock info */}
                <div className="flex items-center gap-2 pt-1 text-xs text-[#524E48]">
                  <span className="w-2 h-2 rounded-full bg-[#384837]" />
                  <span>Estoque no Firestore: <strong>{product.stock} unidades</strong></span>
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart CTA */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#DCD3C5] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-sm text-[#4E4B46] hover:bg-[#F5F2EB] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-xs font-semibold tabular-nums text-[#181716]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-sm text-[#4E4B46] hover:bg-[#F5F2EB] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isAddedFeedback
                      ? 'bg-[#384837] text-white'
                      : 'bg-[#181716] hover:bg-[#33312D] text-[#FAF8F5]'
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Adicionado à Sacola</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#7A746B] text-center">
                Frete cortesia para todo o Brasil em compras acima de R$ 600 · Devolução em 30 dias
              </p>
            </div>

            {/* Accordion Tabs for Specifications */}
            <div className="border-t border-[#E8E1D5] pt-4 space-y-3 text-xs">
              <div className="flex items-center border-b border-[#E8E1D5]">
                <button
                  onClick={() => setActiveTab('detalhes')}
                  className={`py-2 px-3 tracking-wider uppercase font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'detalhes'
                      ? 'border-[#181716] text-[#181716]'
                      : 'border-transparent text-[#7B756C] hover:text-[#181716]'
                  }`}
                >
                  Detalhes
                </button>
                <button
                  onClick={() => setActiveTab('composicao')}
                  className={`py-2 px-3 tracking-wider uppercase font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'composicao'
                      ? 'border-[#181716] text-[#181716]'
                      : 'border-transparent text-[#7B756C] hover:text-[#181716]'
                  }`}
                >
                  Composição
                </button>
                <button
                  onClick={() => setActiveTab('cuidados')}
                  className={`py-2 px-3 tracking-wider uppercase font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'cuidados'
                      ? 'border-[#181716] text-[#181716]'
                      : 'border-transparent text-[#7B756C] hover:text-[#181716]'
                  }`}
                >
                  Cuidados
                </button>
              </div>

              <div className="py-2 text-[#4A4742] leading-relaxed">
                {activeTab === 'detalhes' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {(product.details || ['Alfaiataria parisiense dos anos 1980', 'Acabamento minucioso feito à mão']).map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'composicao' && (
                  <p className="font-medium text-[#2E2B27]">{product.composition || '100% Lã virgem de alta gramatura e forro acetinado'}</p>
                )}
                {activeTab === 'cuidados' && (
                  <p>{product.care || 'Lavagem a seco especializada. Passar a vapor em temperatura média.'}</p>
                )}
              </div>
            </div>

            {/* Trust markers */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E8E1D5] text-[11px] text-[#716B62]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#181716]" />
                <span>Envio Express</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#181716]" />
                <span>Troca Gratuita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#181716]" />
                <span>Atelier Certifié</span>
              </div>
            </div>

          </div>

        </div>

        {/* "Complete o Look" Section */}
        {completeLookProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8E1D5]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#7D766C]">Silhouette Complète</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#181716] mt-1">
                  Complete o Look
                </h2>
              </div>
              <p className="text-xs text-[#7A746B] mt-2 sm:mt-0 font-serif italic">
                Peças selecionadas pela curadoria KVANORI para compor a silhueta clássica
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {completeLookProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
