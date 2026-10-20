import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ReazzipiLogo } from './ReazzipiLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-[#181716] text-[#FAF8F5] border-t border-[#2D2A26] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2925]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-block text-left">
              <ReazzipiLogo variant="horizontal" theme="light" size="lg" />
            </div>
            <p className="font-serif italic text-sm text-[#BDB2A2] max-w-sm leading-relaxed">
              “L'élégance ne vieillit jamais.”
            </p>
            <p className="text-xs text-[#968E82] leading-relaxed max-w-sm">
              Boutique especializada em moda feminina inspirada na alfaiataria clássica, estética vintage e silhuetas atemporais.
            </p>
            <div className="pt-2 text-xs text-[#B8AE9F] space-y-1">
              <p className="font-medium text-[#FAF8F5]">Atelier & Boutique:</p>
              <p>6, Rue Bonaparte — 75006 Paris, France</p>
              <p>Envio segurado para todo o Brasil e Europa</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#D4C8B8]">
              Navegação
            </h4>
            <ul className="space-y-2 text-[#9E9588]">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Novidades' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Novidades Automne 1986
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Roupas' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Alfaiataria & Roupas
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Acessórios' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Boinas & Acessórios
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('looks')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Les Silhouettes (Looks)
                </button>
              </li>
            </ul>
          </div>

          {/* Collections by Style */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#D4C8B8]">
              Estilo & Categorias
            </h4>
            <ul className="space-y-2 text-[#9E9588]">
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Blazers' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Blazers de Tweed
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Saias' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Saias Plissadas & Veludo
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Cardigans & Suéteres' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Cardigans & Lã Merino
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Casacos' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Trench Coats & Sobretudos
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', { category: 'Acessórios' })} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Mocassins & Mary Jane
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Atelier */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#D4C8B8]">
              A Maison
            </h4>
            <ul className="space-y-2 text-[#9E9588]">
              <li>
                <button onClick={() => navigateTo('sobre')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  A História da KVANORI
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('carnet')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Carnet de Paris
                </button>
              </li>
              <li>
                <span className="text-[#787165]">Guia de Cuidados com a Lã</span>
              </li>
              <li>
                <span className="text-[#787165]">Compromisso Artesanal</span>
              </li>
              <li>
                <span className="text-[#787165]">Política de Privacidade</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#787165] gap-4">
          <p>© 1986 — 2026 KVANORI · Moda Vintage. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-[#9C9488]">
            <span>Saint-Germain-des-Prés</span>
            <span>·</span>
            <span>Paris 6e Arrondissement</span>
            <span>·</span>
            <span>French Preppy Heritage</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
