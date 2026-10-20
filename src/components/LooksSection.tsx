import React, { useState } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { LOOKS_COLLECTION } from '../data/looks';
import { Product } from '../types';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useStoreData } from '../context/StoreDataContext';

export const LooksSection: React.FC<{ isStandalone?: boolean }> = ({ isStandalone = false }) => {
  const { openProduct, navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { products } = useStoreData();
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  const currentLook = LOOKS_COLLECTION[activeLookIndex];
  
  // Resolve look products dynamically from Firestore store data
  const lookProducts = currentLook.productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddAllToCart = () => {
    lookProducts.forEach(prod => {
      addToCart(prod, prod.colors[0], prod.sizes[0], 1);
    });
  };

  return (
    <section className={`w-full ${isStandalone ? 'py-12' : 'py-20'} bg-[#FAF8F5]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#E8E1D5] pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7E7870] font-sans">
              Le Style French Preppy · 1986
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#181716] tracking-tight mt-1">
              Les Silhouettes Complètes
            </h2>
            <p className="text-xs sm:text-sm text-[#6C675F] font-serif italic mt-1 max-w-xl">
              A harmonia essencial: blazer de alfaiataria + camisa de popeline + cardigan de lã + saia plissada + boina de feltro + calçados nobres.
            </p>
          </div>

          {/* Look Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {LOOKS_COLLECTION.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  activeLookIndex === idx
                    ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                    : 'bg-white/80 text-[#54504A] border-[#DCD3C5] hover:border-[#181716]'
                }`}
              >
                0{idx + 1}. {look.title.replace('La Silhouette ', '').replace('L’', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Look Interactive Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/70 border border-[#E8E1D5] p-6 sm:p-10 shadow-xs">
          
          {/* Left: Editorial Photograph */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-[#EAE4D9] overflow-hidden border border-[#DDD5C7] shadow-sm">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#D7CEBF]">Paris, Automne 1986</span>
                <h3 className="text-xl sm:text-2xl font-serif">{currentLook.title}</h3>
                <p className="text-xs text-[#EBE5DB] font-serif italic">{currentLook.location}</p>
              </div>
            </div>

            {/* Tags / Editorial elements */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#716C63]">
              <span className="font-semibold text-[#181716] uppercase text-[10px] tracking-wider">Elementos:</span>
              {currentLook.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {i < currentLook.tags.length - 1 && <span className="text-[#C2BAAE]">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: Look Breakdown & Items List */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="border-b border-[#E8E1D5] pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#7A746B]">{currentLook.subtitle}</span>
                <h3 className="text-2xl font-serif text-[#181716] mt-1">{currentLook.title}</h3>
                <p className="text-xs sm:text-sm text-[#4E4B45] leading-relaxed mt-2">
                  {currentLook.description}
                </p>
              </div>

              {/* Items forming this look */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#181716]">
                  <span>Peças que compõem a silhueta ({lookProducts.length})</span>
                  <span className="text-[#6B1D2F] font-serif italic text-xs capitalize">Clique para ver</span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 divide-y divide-[#EFEBE4]">
                  {lookProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => openProduct(product)}
                      className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 group cursor-pointer hover:bg-[#F5F1E8] p-2 transition-colors rounded-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-15 bg-[#EAE3D6] shrink-0 overflow-hidden border border-[#DCD3C5]">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8A8377] block">{product.category}</span>
                          <h4 className="text-sm font-serif font-medium text-[#181716] group-hover:text-[#6B1D2F] line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs text-[#524E48] tabular-nums font-semibold">
                            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, product.colors[0], product.sizes[0], 1);
                          }}
                          className="p-2 bg-[#181716] text-[#FAF8F5] hover:bg-[#6B1D2F] transition-colors cursor-pointer text-xs"
                          title="Adicionar esta peça"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions for Look */}
            <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddAllToCart}
                className="w-full sm:flex-1 py-3 bg-[#181716] hover:bg-[#33312D] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar Visual Completo</span>
              </button>

              {!isStandalone && (
                <button
                  onClick={() => navigateTo('looks')}
                  className="w-full sm:w-auto py-3 px-5 border border-[#181716] text-[#181716] hover:bg-[#EFEBE4] text-xs uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer"
                >
                  Ver Todas as Silhuetas
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
