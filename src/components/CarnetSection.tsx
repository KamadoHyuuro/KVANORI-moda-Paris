import React from 'react';
import { ArrowRight, BookOpen, Coffee, Compass } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const CarnetSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Atmospheric Editorial Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2DBD0] border border-[#DDD3C5] shadow-md film-grain">
              <img
                src="/src/assets/images/editorial_carnet_paris_cafe_1790164857930.jpg"
                alt="Editorial fotográfico parisiense dos anos 80 em Saint-Germain-des-Prés"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#6B1D2F]/5 mix-blend-multiply" />
            </div>

            {/* Stamp badge in corner */}
            <div className="absolute -bottom-4 -right-4 hidden sm:block bg-[#181716] text-[#FAF8F5] p-4 border border-[#FAF8F5] max-w-[200px] shadow-lg">
              <span className="text-[10px] tracking-[0.2em] uppercase block text-[#B8AE9F]">Gazette Littéraire</span>
              <p className="font-serif italic text-xs mt-1">“L'art de vivre à Saint-Germain-des-Prés, automne 1986.”</p>
            </div>
          </div>

          {/* Right Column: Narrative Essay */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7E776F]">
                <span>Carnet de Paris · Édition Automne</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#181716] leading-[1.05]">
                O Elogio à Moda Intelectual
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed font-light">
              Na margem esquerda do Sena, o estilo nunca foi sobre ostentação ruidosa, mas sobre a harmonia silenciosa entre pensamento e forma. No outono de 1986, as alunas e professoras da Sorbonne, as escritoras nas mesas do Café de Flore e as artistas de Montparnasse consolidaram o que hoje chamamos de <em>French Preppy</em>.
            </p>

            <p className="text-sm text-[#5B554D] leading-relaxed font-serif italic border-l-2 border-[#6B1D2F] pl-4">
              “Um blazer de tweed bem cortado, uma saia plissada que acompanha o ritmo dos passos nas calçadas de pedra e uma boina de lã: peças que não buscam a novidade efêmera, mas a eternidade da elegância.”
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-xs border-t border-[#E8E1D5]">
              <div className="space-y-1">
                <span className="font-serif font-semibold text-sm text-[#181716] block">Saint-Germain</span>
                <span className="text-[#78726A]">O berço dos cafés literários e da alfaiataria sóbria.</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif font-semibold text-sm text-[#181716] block">Lã & Tweed</span>
                <span className="text-[#78726A]">Fibras naturais de tecelagens históricas europeias.</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif font-semibold text-sm text-[#181716] block">Intemporal</span>
                <span className="text-[#78726A]">Silhuetas imunes à passagem rápida das tendências.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('carnet')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#181716] hover:text-[#6B1D2F] border-b border-[#181716] hover:border-[#6B1D2F] pb-1 transition-colors cursor-pointer"
              >
                <span>Ler o Carnet de Paris Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
