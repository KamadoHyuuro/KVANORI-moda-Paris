import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, RotateCcw, Loader2 } from 'lucide-react';
import { Product, Category, SortOption } from '../types';
import { useStoreData } from '../context/StoreDataContext';
import { useNavigation } from '../context/NavigationContext';
import { ProductCard } from './ProductCard';

const SIZES_OPTIONS = ['34', '36', '38', '40', '42', 'PP', 'P', 'M', 'G'];

const COLOR_FILTERS = [
  { name: 'Creme', hex: '#F3EFE6', border: true },
  { name: 'Off-White', hex: '#FAF7F0', border: true },
  { name: 'Bege', hex: '#D2C5B3' },
  { name: 'Marrom', hex: '#633F2E' },
  { name: 'Vinho', hex: '#631B2B' },
  { name: 'Verde-Musgo', hex: '#374736' },
  { name: 'Azul-Marinho', hex: '#1C263B' },
  { name: 'Cinza', hex: '#5E5D5A' },
  { name: 'Preto', hex: '#181716' },
];

export const ProductCatalog: React.FC = () => {
  const { products, categories, isLoading } = useStoreData();
  const { selectedCategory, navigateTo } = useNavigation();

  // Filters state
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategory === 'Novidades' ? 'Novidades' :
    selectedCategory === 'Roupas' ? 'Roupas' :
    selectedCategory === 'Acessórios' ? 'Acessórios' :
    selectedCategory
  );
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1800);
  const [sortBy, setSortBy] = useState<SortOption>('recentes');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Dynamic category list from Firestore
  const allCategories = useMemo(() => {
    return categories.length > 0
      ? categories.map(c => c.name as Category)
      : [
          'Blazers' as Category,
          'Cardigans & Suéteres' as Category,
          'Camisas' as Category,
          'Saias' as Category,
          'Vestidos' as Category,
          'Casacos' as Category,
          'Boinas' as Category,
          'Lenços' as Category,
          'Bolsas' as Category
        ];
  }, [categories]);

  // Sync if selectedCategory from navigation changes
  React.useEffect(() => {
    setActiveCategory(
      selectedCategory === 'Novidades' ? 'Novidades' :
      selectedCategory === 'Roupas' ? 'Roupas' :
      selectedCategory === 'Acessórios' ? 'Acessórios' :
      selectedCategory
    );
  }, [selectedCategory]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const resetFilters = () => {
    setActiveCategory('Todos');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(1800);
    setSortBy('recentes');
  };

  // Filtered & sorted products list loaded from Firestore
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory === 'Novidades') {
        if (!product.newArrival && !product.isNew) return false;
      } else if (activeCategory === 'Roupas') {
        const clothingCats = ['Blazers', 'Cardigans & Suéteres', 'Camisas', 'Saias', 'Vestidos', 'Casacos'];
        if (!clothingCats.includes(product.category)) return false;
      } else if (activeCategory === 'Acessórios') {
        const accCats = ['Boinas', 'Lenços', 'Bolsas'];
        if (!accCats.includes(product.category)) return false;
      } else if (activeCategory !== 'Todos') {
        if (product.category !== activeCategory) return false;
      }

      // Price filter
      if (product.price > maxPrice) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes?.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors?.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recentes') {
        return (b.newArrival || b.isNew ? 1 : 0) - (a.newArrival || a.isNew ? 1 : 0);
      }
      if (sortBy === 'bestsellers') {
        return (b.featured || b.isBestseller ? 1 : 0) - (a.featured || a.isBestseller ? 1 : 0);
      }
      if (sortBy === 'menor-preco') {
        return a.price - b.price;
      }
      if (sortBy === 'maior-preco') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [products, activeCategory, maxPrice, selectedSizes, selectedColors, sortBy]);

  const activeFiltersCount = 
    (activeCategory !== 'Todos' ? 1 : 0) + 
    selectedSizes.length + 
    selectedColors.length + 
    (maxPrice < 1800 ? 1 : 0);

  if (isLoading && products.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 flex flex-col items-center justify-center text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B1D2F]" />
        <p className="text-xs uppercase tracking-widest text-[#7E7870] font-serif">
          Carregando acervo do Cloud Firestore...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Subtext */}
        <div className="border-b border-[#E8E1D5] pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#7E7870] font-sans">
              Collection Automne-Hiver 1986 · Firestore Database
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#181716] tracking-tight mt-1">
              {activeCategory === 'Todos' ? 'Todas as Criações' : activeCategory}
            </h1>
            <p className="text-xs sm:text-sm text-[#6C675F] font-serif italic mt-1">
              Alfaiataria impecável e silhuetas que celebram a feminilidade parisiense
            </p>
          </div>

          <div className="text-xs text-[#7A756D] tabular-nums self-center sm:self-end">
            Exibindo <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> peças sincronizadas
          </div>
        </div>

        {/* Quick Category Bar (Segmented Interactive Filter Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-[#EFEBE4]">
          <button
            onClick={() => setActiveCategory('Todos')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'Todos'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'bg-white/80 text-[#55514B] hover:text-[#181716] border border-[#E5DDD2]'
            }`}
          >
            Todos ({products.length})
          </button>
          
          <button
            onClick={() => setActiveCategory('Novidades')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'Novidades'
                ? 'bg-[#6B1D2F] text-[#FAF8F5]'
                : 'bg-white/80 text-[#55514B] hover:text-[#181716] border border-[#E5DDD2]'
            }`}
          >
            Novidades
          </button>

          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#181716] text-[#FAF8F5]'
                  : 'bg-white/80 text-[#55514B] hover:text-[#181716] border border-[#E5DDD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Bar & Sorting Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 border border-[#E8E1D5] p-4 mb-8">
          
          {/* Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#6B1D2F] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar Filtros</span>
              </button>
            )}
          </div>

          {/* Active Tags Summary */}
          <div className="hidden md:flex items-center gap-2 text-xs text-[#706B62]">
            <span>Filtros ativos:</span>
            <span className="font-medium text-[#181716]">
              {activeCategory}
            </span>
            {selectedColors.length > 0 && (
              <>
                <span>·</span>
                <span>Cores ({selectedColors.join(', ')})</span>
              </>
            )}
            {selectedSizes.length > 0 && (
              <>
                <span>·</span>
                <span>Tam ({selectedSizes.join(', ')})</span>
              </>
            )}
            {maxPrice < 1800 && (
              <>
                <span>·</span>
                <span>Até R$ {maxPrice}</span>
              </>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-[#78726A] uppercase tracking-wider">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-[#DCD3C5] text-[#181716] py-1.5 px-3 text-xs focus:outline-hidden focus:border-[#181716] cursor-pointer"
            >
              <option value="recentes">Mais recentes</option>
              <option value="bestsellers">Mais vendidos</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 bg-white/50 p-6 border border-[#E8E1D5]">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#181716]">
                Refinar Seleção
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#6B1D2F] hover:underline cursor-pointer"
                >
                  Restaurar
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C3935]">
                Categorias
              </h4>
              <div className="flex flex-col space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setActiveCategory('Todos')}
                  className={`text-left text-xs py-1 transition-colors cursor-pointer flex items-center justify-between ${
                    activeCategory === 'Todos' ? 'text-[#6B1D2F] font-semibold' : 'text-[#615B52] hover:text-[#181716]'
                  }`}
                >
                  <span>Todas as peças</span>
                  <span className="text-[10px] tabular-nums text-[#9A9388]">({products.length})</span>
                </button>
                {allCategories.map((cat) => {
                  const count = products.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-xs py-1 transition-colors cursor-pointer flex items-center justify-between ${
                        activeCategory === cat ? 'text-[#6B1D2F] font-semibold' : 'text-[#615B52] hover:text-[#181716]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] tabular-nums text-[#9A9388]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C3935]">
                Tamanhos
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {SIZES_OPTIONS.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`min-w-8 h-8 px-2 text-xs uppercase font-medium border transition-colors cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                          : 'bg-white text-[#524E48] border-[#DCD3C5] hover:border-[#181716]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C3935]">
                Paleta Parisiense
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_FILTERS.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className={`flex items-center gap-2 p-1.5 text-xs text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#181716] bg-[#FAF8F5]'
                          : 'border-transparent hover:border-[#DCD3C5]'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full ${col.border ? 'border border-[#C2BCB2]' : ''}`}
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className={`truncate text-[11px] ${isSelected ? 'font-medium text-[#181716]' : 'text-[#635E56]'}`}>
                        {col.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#3C3935]">
                <span>Preço Máximo</span>
                <span className="font-serif italic font-normal text-sm text-[#181716] tabular-nums">
                  R$ {maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1800"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6B1D2F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9A9388] tabular-nums">
                <span>R$ 200</span>
                <span>R$ 1.800</span>
              </div>
            </div>

          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
              <div className="w-80 max-w-[85%] bg-[#FAF8F5] h-full p-6 overflow-y-auto space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-[#181716]">
                    Filtros da Loja
                  </h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-[#181716] hover:text-[#6B1D2F] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-semibold text-[#3C3935]">Categorias</h4>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => setActiveCategory('Todos')}
                      className={`text-left text-xs py-1.5 cursor-pointer ${activeCategory === 'Todos' ? 'text-[#6B1D2F] font-bold' : 'text-[#5A554D]'}`}
                    >
                      Todas as peças
                    </button>
                    {allCategories.map(c => (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`text-left text-xs py-1.5 cursor-pointer ${activeCategory === c ? 'text-[#6B1D2F] font-bold' : 'text-[#5A554D]'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Sizes */}
                <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
                  <h4 className="text-xs uppercase font-semibold text-[#3C3935]">Tamanhos</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {SIZES_OPTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`min-w-8 h-8 px-2 text-xs border cursor-pointer ${selectedSizes.includes(s) ? 'bg-[#181716] text-white' : 'bg-white'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Colors */}
                <div className="space-y-2 border-t border-[#E8E1D5] pt-4">
                  <h4 className="text-xs uppercase font-semibold text-[#3C3935]">Cores</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_FILTERS.map(col => (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`flex items-center gap-1.5 p-1 border text-xs cursor-pointer ${selectedColors.includes(col.name) ? 'border-[#181716] bg-white' : 'border-transparent'}`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: col.hex }} />
                        <span className="truncate">{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E1D5] flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 text-xs uppercase border border-[#181716] text-[#181716] cursor-pointer"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-2 text-xs uppercase bg-[#181716] text-white cursor-pointer"
                  >
                    Ver ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid (3 cols on desktop) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white/60 border border-[#E8E1D5] p-12 text-center space-y-4">
                <span className="font-serif italic text-2xl text-[#181716]">Nenhuma peça encontrada</span>
                <p className="text-xs text-[#706B62] max-w-md mx-auto">
                  Não encontramos produtos correspondentes à sua seleção de filtros. Tente ajustar os parâmetros ou restaurar as opções originais.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#181716] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                >
                  Ver Todas as Peças
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
