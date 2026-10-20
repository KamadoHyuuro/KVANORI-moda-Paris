import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useNavigation();
  const [tab, setTab] = useState<'roupas' | 'calcados'>('roupas');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] max-w-2xl w-full border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 text-[#181716] hover:text-[#6B1D2F] p-1 cursor-pointer"
          aria-label="Fechar guia de medidas"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A746B]">
            <Ruler className="w-4 h-4 text-[#6B1D2F]" />
            <span>Atelier KVANORI Paris</span>
          </div>
          <h3 className="text-2xl font-serif text-[#181716]">
            Guia de Medidas & Alfaiataria Francesa
          </h3>
          <p className="text-xs text-[#5D574F] font-serif italic">
            Nossos moldes respeitam o padrão de corte parisiense clássico dos anos 80, com caimento refinado e proporcional.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E8E1D5] text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setTab('roupas')}
            className={`py-2 px-4 border-b-2 cursor-pointer transition-colors ${
              tab === 'roupas' ? 'border-[#181716] text-[#181716]' : 'border-transparent text-[#7D776E] hover:text-[#181716]'
            }`}
          >
            Alfaiataria, Blusas & Saias
          </button>
          <button
            onClick={() => setTab('calcados')}
            className={`py-2 px-4 border-b-2 cursor-pointer transition-colors ${
              tab === 'calcados' ? 'border-[#181716] text-[#181716]' : 'border-transparent text-[#7D776E] hover:text-[#181716]'
            }`}
          >
            Calçados & Sapatos
          </button>
        </div>

        {/* Content Table */}
        {tab === 'roupas' ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-[#3D3A35] border border-[#E5DDD2]">
                <thead className="bg-[#EFEBE4] text-[#181716] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Tam. FR</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Equiv. BR</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Busto (cm)</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Cintura (cm)</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DDD2] bg-white">
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">34 (PP)</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">34</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">80 - 84</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">60 - 64</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">86 - 90</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">36 (P)</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">36</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">84 - 88</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">64 - 68</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">90 - 94</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">38 (M)</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">38</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">88 - 92</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">68 - 72</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">94 - 98</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">40 (G)</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">40</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">92 - 96</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">72 - 76</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">98 - 102</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">42 (GG)</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">42/44</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">96 - 102</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">76 - 82</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">102 - 108</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#F3EDE2] p-3 text-xs text-[#565147] space-y-1">
              <span className="font-semibold text-[#181716]">Dica de Vestibilidade:</span>
              <p>Os blazers e casacos já são concebidos com folga de vestimenta planejada para acomodar camisas e malhas de lã por baixo.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-[#3D3A35] border border-[#E5DDD2]">
                <thead className="bg-[#EFEBE4] text-[#181716] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Tamanho BR</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Tamanho FR / EU</th>
                    <th className="py-2.5 px-3 border border-[#E5DDD2]">Comprimento do Pé (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DDD2] bg-white">
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">34 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">36 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">22,5 - 23,0 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">35 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">37 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">23,1 - 23,7 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">36 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">38 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">23,8 - 24,4 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">37 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">39 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">24,5 - 25,0 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">38 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">40 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">25,1 - 25,7 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold border border-[#E5DDD2]">39 BR</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">41 EU</td>
                    <td className="py-2 px-3 border border-[#E5DDD2]">25,8 - 26,4 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#F3EDE2] p-3 text-xs text-[#565147]">
              <span className="font-semibold text-[#181716]">Meias caneladas ou meias-calças:</span> Nossos mocassins e sapatos Oxford adaptam-se com facilidade ao uso com meias finas ou de algodão penteado.
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
