import React, { useState } from 'react';
import { 
  Shield, 
  Package, 
  ShoppingBag, 
  LayoutDashboard, 
  Layers, 
  Compass, 
  Image as ImageIcon, 
  Database, 
  Lock, 
  ArrowLeft, 
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';
import { useNavigation } from '../context/NavigationContext';

import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminCategories } from './admin/AdminCategories';
import { AdminCollections } from './admin/AdminCollections';
import { AdminOrders } from './admin/AdminOrders';
import { AdminBanners } from './admin/AdminBanners';

type AdminTab = 'dashboard' | 'produtos' | 'pedidos' | 'categorias' | 'colecoes' | 'banners' | 'database';

export const AdminPanel: React.FC = () => {
  const { user, role, isAdmin } = useAuth();
  const { products, orders, refreshAllData, resetToSeedCatalog, isSeeding, isLoading } = useStoreData();
  const { navigateTo } = useNavigation();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // RBAC GUARD: strictly restricted to verified administrator
  if (!isAdmin) {
    return (
      <div className="bg-[#FAF8F5] min-h-[80vh] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E8E1D5] p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FDF0EE] text-[#6B1D2F] flex items-center justify-center border border-[#F5C2BC]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#6B1D2F]">
              403 · Acesso Negado
            </span>
            <h2 className="text-2xl font-serif text-[#181716]">
              Área Restrita à Administração
            </h2>
          </div>

          <p className="text-xs text-[#5D574F] leading-relaxed">
            Esta área é reservada exclusivamente para o único administrador da boutique KVANORI. Usuários sem privilégios administrativos autorizados não têm permissão de acesso.
          </p>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer"
          >
            ← Retornar à Boutique
          </button>
        </div>
      </div>
    );
  }

  const pendingOrdersCount = orders.filter(o => o.status === 'Pendente' || o.status === 'pendente').length;
  const lowStockCount = products.filter(p => (p.stock ?? 10) <= 3).length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* Top Administrative Bar */}
      <div className="bg-[#181716] text-[#FAF8F5] border-b border-[#2C2A28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="text-[#D2C5B3] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Loja</span>
            </button>
            <span className="text-[#555048]">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2A6E3F] animate-pulse" />
              <span className="font-serif tracking-wide text-white">
                KVANORI · Painel Administrativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#A89F91]">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#C2A97E]" />
              <span className="font-mono text-[11px] text-[#FAF8F5]">
                {user?.email}
              </span>
              <span className="bg-[#6B1D2F] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                {role}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs Header */}
        <div className="bg-white border border-[#E8E1D5] p-2 flex flex-wrap items-center gap-1.5 shadow-sm">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('produtos')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'produtos'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produtos</span>
            {lowStockCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#C43828]" title={`${lowStockCount} peças com baixo estoque`} />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'pedidos'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-[#B25E12] text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('categorias')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'categorias'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categorias</span>
          </button>

          <button
            onClick={() => setActiveTab('colecoes')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'colecoes'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Coleções</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'banners'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#5D574F] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Banners da Home</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ml-auto ${
              activeTab === 'database'
                ? 'bg-[#181716] text-[#FAF8F5]'
                : 'text-[#7A7367] hover:bg-[#FAF8F5] hover:text-[#181716]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Banco & Sincronização</span>
          </button>

        </div>

        {/* Global Feedback Alert */}
        {feedback && (
          <div className={`p-4 text-xs flex items-center justify-between transition-all ${
            feedback.type === 'success' 
              ? 'bg-[#EBF7EE] text-[#2A6E3F] border border-[#C4E7CC]' 
              : 'bg-[#FDF0EE] text-[#C43828] border border-[#F5C2BC]'
          }`}>
            <div className="flex items-center gap-2 font-medium">
              {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="cursor-pointer hover:opacity-75">
              &times;
            </button>
          </div>
        )}

        {/* Tab Content Rendering */}
        <div>
          {activeTab === 'dashboard' && (
            <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'produtos' && (
            <AdminProducts />
          )}

          {activeTab === 'pedidos' && (
            <AdminOrders />
          )}

          {activeTab === 'categorias' && (
            <AdminCategories />
          )}

          {activeTab === 'colecoes' && (
            <AdminCollections />
          )}

          {activeTab === 'banners' && (
            <AdminBanners />
          )}

          {activeTab === 'database' && (
            <div className="bg-white border border-[#E8E1D5] p-6 space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#181716]">
                  Status do Banco de Dados & Infraestrutura Firestore
                </h3>
                <p className="text-xs text-[#5D574F] mt-1">
                  Gerenciamento de sincronismo de dados com persistência resiliente e restauração de catálogo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                  <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Coleção de Produtos</span>
                  <span className="text-lg font-serif font-bold text-[#181716] block">{products.length} cadastrados</span>
                  <span className="text-[#2A6E3F]">Persistência ativa</span>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                  <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Coleção de Pedidos</span>
                  <span className="text-lg font-serif font-bold text-[#181716] block">{orders.length} pedidos</span>
                  <span className="text-[#2A6E3F]">Sincronização em tempo real</span>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                  <span className="text-[#8C8476] uppercase tracking-wider text-[10px] block">Regras de Segurança (RBAC)</span>
                  <span className="text-lg font-serif font-bold text-[#6B1D2F] block">Ativas & Válidas</span>
                  <span className="text-[#5D574F]">Acesso restrito por role="admin"</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex flex-wrap gap-4">
                <button
                  onClick={async () => {
                    await refreshAllData();
                    showFeedback('success', 'Dados recarregados com sucesso.');
                  }}
                  disabled={isLoading}
                  className="px-4 py-2.5 bg-[#181716] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Atualizar Todos os Dados</span>
                </button>

                <button
                  onClick={async () => {
                    if (window.confirm('Deseja recarregar o catálogo original com as 30 peças de alfaiataria parisiense?')) {
                      await resetToSeedCatalog();
                      showFeedback('success', 'Catálogo inicial restaurado com sucesso.');
                    }
                  }}
                  disabled={isSeeding}
                  className="px-4 py-2.5 border border-[#6B1D2F] text-[#6B1D2F] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{isSeeding ? 'Restaurando...' : 'Restaurar Catálogo Base KVANORI'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
