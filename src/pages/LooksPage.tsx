import React from 'react';
import { LOOKS_COLLECTION } from '../data/looks';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useStoreData } from '../context/StoreDataContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const LooksPage: React.FC = () => {
  const { navigateTo, openProduct } = useNavigation();
  const { addToCart } = useCart();
  const { products } = useStoreData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#736E66] hover:text-[#181716] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Início</span>
          </button>
        </div>

        {/* Page Hero */}
        <div className="border-b border-[#E8E1D5] pb-8 mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7A746B] block">
            Lookbook Automne 1986 · Cloud Firestore
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#181716]">
            Les Silhouettes KVANORI
          </h1>
          <p className="text-sm sm:text-base text-[#57524A] font-serif italic leading-relaxed">
            “A harmonia perfeita entre blazer de tweed, camisa de popeline, tricot de lã, saia plissada, meia-calça e mocassins nobres.”
          </p>
        </div>

        {/* All curated looks list */}
        <div className="space-y-20">
          {LOOKS_COLLECTION.map((look, index) => {
            const lookItems = look.productIds
              .map(id => products.find(p => p.id === id))
              .filter(Boolean);

            const isEven = index % 2 === 0;

            return (
              <div
                key={look.id}
                className="bg-white/70 border border-[#E8E1D5] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E2DBD0] border border-[#D5CCC0] shadow-sm">
                    <img
                      src={look.image}
                      alt={look.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] tracking-widest uppercase text-[#D7CEBF]">Paris 1986</span>
                      <h3 className="text-xl sm:text-2xl font-serif">{look.title}</h3>
                      <p className="text-xs text-[#E8E1D5] font-serif italic">{look.location}</p>
                    </div>
                  </div>
                </div>

                {/* Details & Items Column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="border-b border-[#E8E1D5] pb-4 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#7C756B]">{look.subtitle}</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#181716]">{look.title}</h2>
                    <p className="text-sm text-[#4E4B45] leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  {/* Items Grid */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#181716] block">
                      Composição deste look:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {lookItems.map(item => item && (
                        <div
                          key={item.id}
                          onClick={() => openProduct(item)}
                          className="flex items-center gap-3 p-2 bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#181716] transition-colors cursor-pointer group"
                        >
                          <div className="w-12 h-14 bg-[#E2DBD0] shrink-0 overflow-hidden">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] uppercase tracking-wider text-[#888175] block truncate">{item.category}</span>
                            <h4 className="text-xs font-serif font-medium text-[#181716] group-hover:text-[#6B1D2F] truncate">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-[#555047] tabular-nums font-semibold">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        lookItems.forEach(item => {
                          if (item) addToCart(item, item.colors[0], item.sizes[0], 1);
                        });
                      }}
                      className="py-3 px-6 bg-[#181716] text-[#FAF8F5] hover:bg-[#35322F] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Comprar Look Completo</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
