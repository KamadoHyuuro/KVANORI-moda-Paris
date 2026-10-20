import React from 'react';
import { ArrowLeft, Award, Sparkles, HeartHandshake, Compass } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#736E66] hover:text-[#181716] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Início</span>
          </button>
        </div>

        {/* Header */}
        <div className="border-b border-[#E8E1D5] pb-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7A746B] block">
            Maison & Atelier Parisien
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#181716]">
            A Alma da KVANORI
          </h1>
          <p className="text-sm sm:text-base text-[#57524A] font-serif italic max-w-xl mx-auto">
            Fundada sob o espírito vintage e atemporal, resgatando a alfaiataria autêntica e a elegância refinada.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E2DBD0] border border-[#DDD3C5] shadow-sm film-grain">
          <img
            src="/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg"
            alt="Atelier KVANORI"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Manifesto Content */}
        <div className="bg-white/70 border border-[#E8E1D5] p-6 sm:p-10 space-y-6 text-sm text-[#47433E] leading-relaxed">
          <h2 className="text-2xl font-serif text-[#181716]">
            Paris, 1986: Um Manifesto contra a Efemeridade
          </h2>
          
          <p>
            A <strong>KVANORI</strong> nasceu na interseção entre o ambiente acadêmico da Sorbonne, as galerias de arte de Saint-Germain-des-Prés e a boêmia elegante dos cafés literários parisienses.
          </p>

          <p>
            Enquanto as passarelas internacionais dos anos 1980 flertavam com o exagero e as cores fluorescentes, a jovem mulher parisiense cultivava um contraponto discreto e profundamente sofisticado: o <em>French Preppy</em>. Uma celebração da alfaiataria herdada das tradicionais universidades europeias (French Ivy), combinada com a doçura e a liberdade feminina da França.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-[#E8E1D5] my-6">
            <div className="space-y-2">
              <span className="font-serif font-bold text-base text-[#181716] block">Tweed & Lã Pura</span>
              <p className="text-xs text-[#635D54]">
                Selecionamos apenas fiações de pura lã virgem e cashmere de cooperativas têxteis históricas, sem fibras plásticas baratas.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif font-bold text-base text-[#181716] block">Corte Intemporal</span>
              <p className="text-xs text-[#635D54]">
                Nossos padrões de modelagem são preservados para que uma peça comprada hoje permaneça impecável daqui a vinte anos.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif font-bold text-base text-[#181716] block">Feminilidade Livre</span>
              <p className="text-xs text-[#635D54]">
                Roupas que proporcionam conforto para caminhar por horas, ler, criar e viver com plenitude intelectual.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-serif text-[#181716]">
            O Atelier na Rue Bonaparte
          </h3>
          <p>
            No número 6 da Rue Bonaparte, a poucos passos da Igreja de Saint-Germain-des-Prés, nosso ateliê supervisiona cada costura, cada botão de madrepérola e cada plissado feito à mão.
          </p>
          <p className="font-serif italic text-base text-[#181716] pt-2">
            “L'élégance ne vieillit jamais.”
          </p>
        </div>

        {/* CTA to Catalog */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('catalog')}
            className="px-8 py-3.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer shadow-md"
          >
            Descobrir a Coleção
          </button>
        </div>

      </div>
    </div>
  );
};
