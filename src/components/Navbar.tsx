import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Shield, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { ReazzipiLogo } from './ReazzipiLogo';

export const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { currentPage, navigateTo, setIsSearchOpen, setIsAccountModalOpen } = useNavigation();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', action: () => navigateTo('home') },
    { label: 'Novidades', action: () => navigateTo('catalog', { category: 'Novidades' }) },
    { label: 'Roupas', action: () => navigateTo('catalog', { category: 'Roupas' }) },
    { label: 'Acessórios', action: () => navigateTo('catalog', { category: 'Acessórios' }) },
    { label: 'Looks', action: () => navigateTo('looks') },
    { label: 'Carnet de Paris', action: () => navigateTo('carnet') },
    { label: 'Sobre', action: () => navigateTo('sobre') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-colors">
      {/* Top micro-announcement banner */}
      <div className="bg-[#181716] text-[#EFEBE4] text-[11px] tracking-wider py-1.5 px-4 text-center font-normal uppercase">
        <span className="hidden sm:inline">Collection Automne-Hiver 1986</span>
        <span className="mx-2 hidden sm:inline text-[#A0988A]">·</span>
        <span>Frete cortesia para pedidos acima de R$ 600</span>
        <span className="mx-2 text-[#A0988A]">·</span>
        <span className="italic font-serif lowercase">Saint-Germain-des-Prés, Paris 6e</span>
      </div>

      {/* Main Top Bar fulfilling 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#181716] hover:text-[#6B1D2F] transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Zone 1: Reazzipi Brand Logo with Celestial Star and Vintage Subtitle */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center text-left py-1 hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
            title="KVANORI · Moda Vintage"
          >
            <div className="hidden sm:block">
              <ReazzipiLogo variant="horizontal" theme="espresso" size="md" />
            </div>
            <div className="block sm:hidden">
              <ReazzipiLogo variant="horizontal" theme="espresso" size="sm" />
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links with subtle underline */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.06em] text-[#3A3835]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`py-1 transition-all duration-150 whitespace-nowrap cursor-pointer hover:text-[#6B1D2F] ${
                (currentPage === 'home' && link.label === 'Início') ||
                (currentPage === 'looks' && link.label === 'Looks') ||
                (currentPage === 'carnet' && link.label === 'Carnet de Paris') ||
                (currentPage === 'sobre' && link.label === 'Sobre')
                  ? 'text-[#6B1D2F] font-medium border-b border-[#6B1D2F]'
                  : 'text-[#3E3C38] border-b border-transparent'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Discrete Administration link ONLY visible for verified administrator */}
          {isAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className={`py-1 transition-all duration-150 whitespace-nowrap cursor-pointer hover:text-[#6B1D2F] flex items-center gap-1.5 text-xs text-[#6B1D2F] font-medium ${
                currentPage === 'admin'
                  ? 'border-b border-[#6B1D2F]'
                  : 'border-b border-transparent'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Administração</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Search, Account, Cart) */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#181716]">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 hover:text-[#6B1D2F] transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Buscar produtos"
            title="Buscar"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden md:inline text-xs tracking-wider uppercase text-[#55524E]">Pesquisa</span>
          </button>

          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="p-1.5 hover:text-[#6B1D2F] transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Minha conta"
            title="Minha conta"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden md:inline text-xs tracking-wider uppercase text-[#55524E]">
              {user ? (user.name ? user.name.split(' ')[0] : 'Conta') : 'Conta'}
            </span>
          </button>

          <button
            onClick={openCart}
            className="p-1.5 hover:text-[#6B1D2F] transition-colors flex items-center gap-2 cursor-pointer group"
            aria-label="Sacola de compras"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#6B1D2F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center tabular-nums font-semibold leading-none shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs tracking-wider uppercase text-[#181716] group-hover:text-[#6B1D2F] font-medium">
              Sacola <span className="text-[#7A756D] font-normal tabular-nums">({totalItems})</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D5] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-serif tracking-wide text-[#181716] hover:text-[#6B1D2F] py-2 border-b border-[#EFEBE4] flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans text-[#968F83]">→</span>
              </button>
            ))}

            <button
              onClick={() => {
                navigateTo('orders');
                setMobileMenuOpen(false);
              }}
              className="text-left text-base font-serif tracking-wide text-[#181716] hover:text-[#6B1D2F] py-2 border-b border-[#EFEBE4] flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#6B1D2F]" />
                Meus Pedidos
              </span>
              <span className="text-xs font-sans text-[#968F83]">→</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base font-serif tracking-wide text-[#6B1D2F] py-2 border-b border-[#EFEBE4] flex items-center justify-between cursor-pointer font-medium"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Administração
                </span>
                <span className="text-xs font-sans text-[#6B1D2F]">→</span>
              </button>
            )}
          </nav>
          
          <div className="pt-4 flex flex-col gap-2.5 text-xs text-[#6C675F]">
            <p className="font-serif italic text-sm text-[#181716]">6, Rue Bonaparte — 75006 Paris</p>
            <p>Atendimento exclusivo de segunda a sábado das 10h às 19h</p>
          </div>
        </div>
      )}
    </header>
  );
};
