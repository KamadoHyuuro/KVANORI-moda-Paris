import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useStoreData } from '../context/StoreDataContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProduct, navigateTo } = useNavigation();
  const { products } = useStoreData();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.colors && p.colors.some(c => c.name.toLowerCase().includes(q)))
    ).slice(0, 6);
  }, [query, products]);

  const quickSearches = ['Tweed', 'Blazer', 'Saia', 'Boina', 'Vestido', 'Cardigan', 'Trench Coat', 'Lã'];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-[#FAF8F5] max-w-2xl w-full border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('');
          }}
          className="absolute top-5 right-5 text-[#181716] hover:text-[#6B1D2F] p-1 cursor-pointer"
          aria-label="Fechar busca"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input Bar */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E776F]">Pesquisa no Catálogo KVANORI</span>
          <div className="relative border-b-2 border-[#181716] pb-2 flex items-center">
            <Search className="w-5 h-5 text-[#181716] mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Digite o nome da peça, tecido, modelo ou cor..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#181716] placeholder-[#9E968B] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#888176]">Sugestões populares:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white border border-[#E0D7CA] text-[#4E4A43] hover:border-[#181716] hover:text-[#181716] transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            <div className="text-xs uppercase tracking-wider text-[#736D64] flex justify-between">
              <span>Resultados encontrados ({searchResults.length})</span>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-xs text-[#6B655B] font-serif italic py-6 text-center">
                Nenhuma peça parisiense encontrada para “{query}”.
              </p>
            ) : (
              <div className="divide-y divide-[#EAE4D9]">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuery('');
                      openProduct(product);
                    }}
                    className="py-3 flex items-center gap-4 hover:bg-[#F3EDE2] p-2 transition-colors cursor-pointer group"
                  >
                    <div className="w-14 h-18 bg-[#EAE3D6] shrink-0 overflow-hidden border border-[#DDD4C5]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8377]">{product.category}</span>
                      <h4 className="text-sm font-serif font-medium text-[#181716] group-hover:text-[#6B1D2F]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#5D574D] tabular-nums font-semibold mt-0.5">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C8478] group-hover:text-[#181716] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View all in catalog */}
        {query.trim() && searchResults.length > 0 && (
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigateTo('catalog');
            }}
            className="w-full py-2.5 border border-[#181716] text-[#181716] text-xs uppercase tracking-wider hover:bg-[#181716] hover:text-[#FAF8F5] transition-colors cursor-pointer text-center font-medium"
          >
            Ver Todas as Peças no Catálogo
          </button>
        )}

      </div>
    </div>
  );
};
