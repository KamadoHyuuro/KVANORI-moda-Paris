import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { ProductCard } from './ProductCard';
import { useNavigation } from '../context/NavigationContext';

export const NewArrivals: React.FC = () => {
  const { products } = useStoreData();
  const { navigateTo } = useNavigation();

  // Selected new pieces from Firestore
  const newItems = products.filter(p => p.newArrival || p.isNew || (p.stock !== undefined && p.stock <= 2)).slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E1D5]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7E7870] font-sans">
              Nouveautés de Saison
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#181716] tracking-tight mt-1">
              Novidades do Ateliê
            </h2>
            <p className="text-xs sm:text-sm text-[#6C675F] font-serif italic mt-1">
              Recém-chegadas das oficinas de tecelagem e alfaiataria
            </p>
          </div>

          <button
            onClick={() => navigateTo('catalog', { category: 'Novidades' })}
            className="text-xs uppercase tracking-wider text-[#6B1D2F] font-medium hover:underline inline-flex items-center gap-1 mt-3 sm:mt-0 cursor-pointer"
          >
            <span>Ver Todas as Novidades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
