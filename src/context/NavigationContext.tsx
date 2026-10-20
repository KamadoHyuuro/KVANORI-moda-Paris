import React, { createContext, useContext, useState } from 'react';
import { Category, Product } from '../types';
import { useStoreData } from './StoreDataContext';

export type PageView = 'home' | 'catalog' | 'product' | 'looks' | 'carnet' | 'sobre' | 'orders' | 'admin';

interface NavigationContextType {
  currentPage: PageView;
  selectedCategory: Category | 'Todos' | 'Roupas' | 'Acessórios' | 'Novidades';
  selectedProductId: string | null;
  selectedProduct: Product | null;
  navigateTo: (page: PageView, options?: { category?: Category | 'Todos' | 'Roupas' | 'Acessórios' | 'Novidades'; productId?: string }) => void;
  openProduct: (product: Product | string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const getInitialPage = (): PageView => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const route = path || hash;
  if (route === 'admin') return 'admin';
  if (route === 'catalog') return 'catalog';
  if (route === 'looks') return 'looks';
  if (route === 'carnet') return 'carnet';
  if (route === 'sobre') return 'sobre';
  if (route === 'orders') return 'orders';
  return 'home';
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { products } = useStoreData();
  const [currentPage, setCurrentPage] = useState<PageView>(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos' | 'Roupas' | 'Acessórios' | 'Novidades'>('Todos');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Sync with browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically resolve product from Firestore-loaded products
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) || null 
    : null;

  const navigateTo = (
    page: PageView, 
    options?: { category?: Category | 'Todos' | 'Roupas' | 'Acessórios' | 'Novidades'; productId?: string }
  ) => {
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.productId !== undefined) {
      setSelectedProductId(options.productId);
    }
    setCurrentPage(page);

    try {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (productOrId: Product | string) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        selectedCategory,
        selectedProductId,
        selectedProduct,
        navigateTo,
        openProduct,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAccountModalOpen,
        setIsAccountModalOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
