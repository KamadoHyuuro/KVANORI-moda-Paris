import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useStoreData } from '../context/StoreDataContext';

export const Hero: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { banners } = useStoreData();
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const activeBanners = banners.filter(b => b.active);
  const currentBanner = activeBanners[currentIdx] || activeBanners[0] || {
    id: 'default',
    title: 'PARIS, 1986.',
    subtitle: '“L\'élégance ne vieillit jamais.”',
    kicker: 'Collection Automne-Hiver · Boutique Saint-Germain',
    description: 'Inspirada no estilo French Preppy e na intelectualidade de Saint-Germain-des-Prés. Alfaiataria impecável em tweed de lã, saias plissadas, boinas autênticas e a atemporalidade da feminilidade clássica.',
    image: '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg',
    buttonText: 'Descobrir coleção',
    link: 'catalog',
    active: true
  };

  const handleNext = () => {
    if (activeBanners.length > 1) {
      setCurrentIdx((prev) => (prev + 1) % activeBanners.length);
    }
  };

  const handlePrev = () => {
    if (activeBanners.length > 1) {
      setCurrentIdx((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    }
  };

  return (
    <section className="relative w-full bg-[#181716] text-[#FAF8F5] overflow-hidden">
      {/* High-fidelity 1980s Paris Editorial Hero Image with Measured Contrast Scrim */}
      <div className="relative h-[82vh] min-h-[580px] max-h-[820px] w-full flex items-center">
        <img
          key={currentBanner.id + currentBanner.image}
          src={currentBanner.image}
          alt={currentBanner.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] transition-all duration-1000 ease-out"
        />

        {/* Measured Scrim for WCAG AA readability and warm analog 1980s grading */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-[#6B1D2F]/10 mix-blend-color" />
        
        {/* Subtle vintage film grain layer */}
        <div className="film-grain absolute inset-0 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#D2C5B3]">
              <span>{currentBanner.kicker || 'Collection Automne-Hiver · Boutique Saint-Germain'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-[#FAF8F5] leading-[0.95] text-balance">
              {currentBanner.title}
            </h1>

            {/* Subtext */}
            {currentBanner.subtitle && (
              <p className="text-xl sm:text-2xl font-serif italic text-[#E5DCD0] font-light max-w-xl">
                {currentBanner.subtitle}
              </p>
            )}

            {currentBanner.description && (
              <p className="text-sm sm:text-base text-[#D4C8B8] leading-relaxed max-w-lg font-light">
                {currentBanner.description}
              </p>
            )}

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigateTo((currentBanner.link || 'catalog') as any)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#FAF8F5] text-[#181716] hover:bg-[#FAF8F5]/90 transition-all duration-200 text-xs tracking-[0.14em] uppercase font-semibold cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>{currentBanner.buttonText || 'Descobrir coleção'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigateTo('looks')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#FAF8F5]/40 text-[#FAF8F5] hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/10 transition-colors text-xs tracking-[0.14em] uppercase font-medium cursor-pointer"
              >
                <span>Ver Silhuetas & Looks</span>
              </button>
            </div>

          </div>
        </div>

        {/* Carousel controls if more than 1 active banner */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-6 left-8 z-20 flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 border border-white/30 text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Banner anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-white/70">
              0{currentIdx + 1} / 0{activeBanners.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 border border-white/30 text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Próximo banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom subtle indicator */}
        <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-4 text-[11px] tracking-widest uppercase text-[#BDB2A2]/80">
          <span>6, Rue Bonaparte — Paris 6e</span>
          <span>·</span>
          <span>Édition Limitée</span>
        </div>

      </div>
    </section>
  );
};

