import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { NewArrivals } from '../components/NewArrivals';
import { CategoriesSection } from '../components/CategoriesSection';
import { LooksSection } from '../components/LooksSection';
import { CarnetSection } from '../components/CarnetSection';
import { NewsletterSection } from '../components/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero strictly matching user brief: "PARIS, 1986." / "L'élégance ne vieillit jamais." / "Descobrir coleção" */}
      <Hero />

      {/* 2. Coleção em destaque */}
      <FeaturedCollection />

      {/* 3. Novidades */}
      <NewArrivals />

      {/* 4. Categorias */}
      <CategoriesSection />

      {/* 5. Looks completos (Les Silhouettes) */}
      <LooksSection />

      {/* 6. Editorial (Carnet de Paris) */}
      <CarnetSection />

      {/* 7. Newsletter (La Gazette KVANORI) */}
      <NewsletterSection />
    </div>
  );
};
