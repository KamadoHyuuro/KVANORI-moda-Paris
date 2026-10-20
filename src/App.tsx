/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreDataProvider } from './context/StoreDataContext';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { LooksPage } from './pages/LooksPage';
import { CarnetPage } from './pages/CarnetPage';
import { AboutPage } from './pages/AboutPage';
import { OrdersView } from './components/OrdersView';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';

const AdminAccessDenied: React.FC = () => {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-[#E8E1D5] p-8 text-center space-y-5 shadow-lg">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#FDF0EE] text-[#6B1D2F] flex items-center justify-center border border-[#F5C2BC]">
          <ShieldAlert className="w-7 h-7" />
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
          Esta rota é reservada exclusivamente para o único administrador da boutique KVANORI. Usuários sem credenciais administrativas autorizadas não possuem permissão de acesso. Redirecionando para a loja...
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retornar Imediatamente à Boutique</span>
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentPage, selectedProduct, navigateTo } = useNavigation();
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const [deniedBanner, setDeniedBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('auth_error=acesso_negado')) {
      setDeniedBanner(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('auth_error');
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      setTimeout(() => setDeniedBanner(false), 5000);
    }
  }, []);

  // Route views
  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <ProductCatalog />;
      case 'product':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <ProductCatalog />
        );
      case 'looks':
        return <LooksPage />;
      case 'carnet':
        return <CarnetPage />;
      case 'sobre':
        return <AboutPage />;
      case 'orders':
        return <OrdersView />;
      case 'admin':
        if (isAuthLoading) {
          return (
            <div className="min-h-[60vh] flex items-center justify-center text-xs text-[#7A746B]">
              Verificando credenciais administrativas...
            </div>
          );
        }
        if (!isAdmin) {
          return <AdminAccessDenied />;
        }
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1C]">
      {/* Top Bar strictly fulfilling 3-Zone Contract */}
      <Navbar />

      {/* Access Denied Flash Banner if redirected from server */}
      {deniedBanner && (
        <div className="bg-[#6B1D2F] text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          <span>Acesso negado: Esta rota é restrita exclusivamente ao administrador oficial da boutique.</span>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Modals & Slide-over Drawers */}
      <CartDrawer />
      <SearchModal />
      <SizeGuideModal />
      <AccountModal />

      {/* Boutique Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreDataProvider>
        <NavigationProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </NavigationProvider>
      </StoreDataProvider>
    </AuthProvider>
  );
}
