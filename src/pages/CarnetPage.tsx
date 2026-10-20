import React from 'react';
import { ArrowLeft, BookOpen, Clock, MapPin, Feather } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const CarnetPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const articles = [
    {
      id: 'saint-germain-1986',
      title: 'Saint-Germain-des-Prés: Onde as Ideias Encontram a Alfaiataria',
      date: 'Outubro de 1986',
      readTime: '5 min de leitura',
      subtitle: 'O Café de Flore, as livrarias da Rue Bonaparte e o charme da elegância intelectual.',
      image: '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg',
      content: `No outono de 1986, cruzar a Boulevard Saint-Germain não era um ato de pressa, mas um ritual estético. Entre as mesas redondas do Café de Flore e os mostruários da livraria La Hune, as mulheres de Paris construíram um estilo que rejeitava tanto o excesso kitsch da época quanto o descuido.

A mulher KVANORI carrega um caderno de notas sob o braço, veste um blazer de lã tweed com botões de madrepérola e caminha com a segurança silenciosa de quem lê Marguerite Duras e ouve Françoise Hardy. Sua roupa não grita: ela sussurra precisão, qualidade do corte e conforto duradouro.`
    },
    {
      id: 'arte-da-sobreposicao',
      title: 'L’Art de la Superposition: O Segredo da Silhueta Preppy',
      date: 'Novembro de 1986',
      readTime: '4 min de leitura',
      subtitle: 'Como harmonizar texturas: tweed áspero, seda fluida e malhas aveludadas.',
      image: '/src/assets/images/category_knitwear_editorial_1790164841496.jpg',
      content: `O grande trunfo do French Ivy repousa na sobreposição deliberada de matérias primas naturais. A camisa branca de algodão popeline nunca surge isolada: sua gola estruturada projeta-se sobre o decote em V de um suéter de lã merino azul-marinho, que por sua vez repousa sob a lapela notched de um casaco de lã conhaque.

Adicione uma saia midi plissada com estampa xadrez escocês e meias curtas de algodão puro ajustadas sobre mocassins com fivela dourada. A proporção permanece esguia, dinâmica e termicamente perfeita para o outono parisiense.`
    },
    {
      id: 'elogio-ao-tweed',
      title: 'O Elogio à Lã e ao Tweed: Uma Vida de Alfaiataria',
      date: 'Setembro de 1986',
      readTime: '6 min de leitura',
      subtitle: 'A nobreza dos tecidos que resistem ao teste das décadas sem perder a alma.',
      image: '/src/assets/images/editorial_carnet_paris_cafe_1790164857930.jpg',
      content: `Em uma época seduzida pela rapidez dos materiais sintéticos, a boutique KVANORI mantém sua lealdade inegociável às fiações de lã virgem, cashmere e algodão egípcio de fibra longa.

O tweed chevron de nossos blazers ganha maciez e adapta-se à anatomia de sua proprietária ao longo dos anos. Um casaco de boa linhagem não é descartado na estação seguinte: ele herda memórias, tardes de garoa sob as pontes do Sena e viagens de trem rumo ao campo.`
    }
  ];

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

        {/* Page Title */}
        <div className="border-b border-[#E8E1D5] pb-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7A746B] block">
            Revue Littéraire & Carnet de Mode
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#181716]">
            Carnet de Paris
          </h1>
          <p className="text-sm sm:text-base text-[#57524A] font-serif italic max-w-xl mx-auto">
            Crônicas, filosofia de vestimenta e reflexões sobre a beleza intemporal da margem esquerda do Sena.
          </p>
        </div>

        {/* Articles Feed */}
        <div className="space-y-16">
          {articles.map((art) => (
            <article key={art.id} className="bg-white/70 border border-[#E8E1D5] p-6 sm:p-10 space-y-6 shadow-xs">
              
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E2DBD0] border border-[#DDD3C5]">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#7A746B]">
                  <span className="font-serif italic">{art.date}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                  <span>·</span>
                  <span className="text-[#6B1D2F] uppercase text-[11px] tracking-wider">Saint-Germain</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-[#181716] leading-tight">
                  {art.title}
                </h2>

                <p className="font-serif italic text-sm text-[#6C665C]">
                  {art.subtitle}
                </p>

                <div className="pt-2 text-sm text-[#45423E] leading-relaxed whitespace-pre-line border-t border-[#EFEBE4] pt-4 font-light">
                  {art.content}
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
