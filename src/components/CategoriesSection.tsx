import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { useStoreData } from '../context/StoreDataContext';

export const CategoriesSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { categories, products } = useStoreData();

  // Use Firestore categories if available, computing current product counts
  const displayCategories = (categories.length > 0 ? categories : CATEGORIES_LIST).map(cat => {
    const productCount = products.filter(p => p.category === cat.name).length;
    return {
      ...cat,
      count: productCount || (cat as any).count || 4
    };
  });

  return (
    <section className="py-20 bg-[#F5F2EB] border-y border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E0D8CB]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7C756B]">Vestiaire 1986 · Cloud Firestore</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#181716] tracking-tight mt-1">
              Categorias da Boutique
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog', { category: 'Todos' })}
            className="text-xs uppercase tracking-wider text-[#6B1D2F] font-medium hover:underline inline-flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid - Balanced 3x3 for 9 categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('catalog', { category: cat.name as any })}
              className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-[#E2DBD0] border border-[#D5CCC0] flex flex-col justify-end p-4 transition-all duration-300 hover:shadow-md"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent group-hover:from-black/85 transition-colors" />

              <div className="relative z-10 text-white space-y-0.5">
                <span className="text-[10px] tracking-widest uppercase text-[#D8CEBF] block">
                  {cat.count} criações
                </span>
                <h3 className="text-base sm:text-lg font-serif font-medium leading-tight group-hover:text-[#F3EDE2] transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-[#C2B7A8] opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                  <span>Descobrir</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
