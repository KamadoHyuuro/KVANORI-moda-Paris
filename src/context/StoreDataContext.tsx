import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Product, 
  CategoryItem, 
  CollectionItem, 
  BannerItem, 
  CustomerData, 
  Order, 
  OrderStatus 
} from '../types';
import {
  getProducts,
  getCategories,
  getCollections,
  getBanners,
  getCustomers,
  getProductById as fetchProductById,
  createProduct,
  updateProduct as firestoreUpdateProduct,
  deleteProduct as firestoreDeleteProduct,
  createCategory,
  updateCategory as firestoreUpdateCategory,
  deleteCategory as firestoreDeleteCategory,
  createCollectionItem,
  updateCollectionItem as firestoreUpdateCollectionItem,
  deleteCollectionItem as firestoreDeleteCollectionItem,
  createBanner as firestoreCreateBanner,
  updateBanner as firestoreUpdateBanner,
  deleteBanner as firestoreDeleteBanner,
  createOrder as saveOrderToFirestore,
  getUserOrders,
  getAllOrders,
  updateOrderStatus as firestoreUpdateOrderStatus,
  seedInitialFirestoreData
} from '../firebase/firestore';
import { useAuth } from './AuthContext';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COLLECTIONS, INITIAL_BANNERS } from '../firebase/seedData';

interface StoreDataContextType {
  products: Product[];
  categories: CategoryItem[];
  collections: CollectionItem[];
  banners: BannerItem[];
  customers: CustomerData[];
  orders: Order[];
  isLoading: boolean;
  isSeeding: boolean;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  refreshCollections: () => Promise<void>;
  refreshBanners: () => Promise<void>;
  refreshCustomers: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshAllData: () => Promise<void>;
  resetToSeedCatalog: () => Promise<void>;
  getProduct: (id: string) => Promise<Product | null>;
  // Product management
  addProduct: (product: Product) => Promise<void>;
  modifyProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  // Category management
  addCategory: (category: CategoryItem) => Promise<void>;
  modifyCategory: (id: string, updates: Partial<CategoryItem>) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  // Collection management
  addCollection: (col: CollectionItem) => Promise<void>;
  modifyCollection: (id: string, updates: Partial<CollectionItem>) => Promise<void>;
  removeCollection: (id: string) => Promise<void>;
  // Banner management
  addBanner: (banner: BannerItem) => Promise<void>;
  modifyBanner: (id: string, updates: Partial<BannerItem>) => Promise<void>;
  removeBanner: (id: string) => Promise<void>;
  // Orders
  changeOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // First attempt to seed Firestore if empty
      await seedInitialFirestoreData();

      const [prods, cats, cols, bans, custs] = await Promise.all([
        getProducts(),
        getCategories(),
        getCollections(),
        getBanners(),
        getCustomers()
      ]);
      setProducts(prods);
      setCategories(cats);
      setCollections(cols);
      setBanners(bans);
      setCustomers(custs);

      // Load orders based on role
      if (isAdmin) {
        const all = await getAllOrders();
        setOrders(all);
      } else if (user) {
        const userOrds = await getUserOrders(user.id);
        setOrders(userOrds);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('StoreDataContext: Fallback to local memory.', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshProducts = async () => {
    const prods = await getProducts();
    setProducts(prods);
  };

  const refreshCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  const refreshCollections = async () => {
    const cols = await getCollections();
    setCollections(cols);
  };

  const refreshBanners = async () => {
    const bans = await getBanners();
    setBanners(bans);
  };

  const refreshCustomers = async () => {
    const custs = await getCustomers();
    setCustomers(custs);
  };

  const refreshOrders = async () => {
    if (isAdmin) {
      const all = await getAllOrders();
      setOrders(all);
    } else if (user) {
      const userOrds = await getUserOrders(user.id);
      setOrders(userOrds);
    }
  };

  const refreshAllData = async () => {
    await loadData();
  };

  const resetToSeedCatalog = async () => {
    setIsSeeding(true);
    try {
      for (const prod of INITIAL_PRODUCTS) {
        await createProduct(prod);
      }
      for (const cat of INITIAL_CATEGORIES) {
        await createCategory(cat);
      }
      for (const col of INITIAL_COLLECTIONS) {
        await createCollectionItem(col);
      }
      for (const ban of INITIAL_BANNERS) {
        await firestoreCreateBanner(ban);
      }
      await refreshAllData();
    } finally {
      setIsSeeding(false);
    }
  };

  const getProduct = async (id: string): Promise<Product | null> => {
    const cached = products.find((p) => p.id === id);
    if (cached) return cached;
    return await fetchProductById(id);
  };

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString()
    };

    await saveOrderToFirestore(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock in memory and Firestore
    for (const item of orderData.items) {
      const target = products.find((p) => p.id === item.product.id);
      if (target) {
        const currentStock = target.stock ?? 10;
        const newStock = Math.max(0, currentStock - item.quantity);
        try {
          await firestoreUpdateProduct(target.id, { stock: newStock });
        } catch {}
      }
    }
    await refreshProducts();
    return newOrder;
  };

  // Product mutations (Strict Admin Guard)
  const addProduct = async (product: Product) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem cadastrar produtos.');
    }
    // Optimistic state update for instant UI feedback
    setProducts((prev) => [product, ...prev.filter(p => p.id !== product.id)]);
    await createProduct(product);
    await refreshProducts();
  };

  const modifyProduct = async (id: string, updates: Partial<Product>) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem alterar produtos.');
    }
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    await firestoreUpdateProduct(id, updates);
    await refreshProducts();
  };

  const removeProduct = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem remover produtos.');
    }
    setProducts((prev) => prev.filter(p => p.id !== id));
    await firestoreDeleteProduct(id);
    await refreshProducts();
  };

  // Category mutations (Strict Admin Guard)
  const addCategory = async (category: CategoryItem) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem cadastrar categorias.');
    }
    await createCategory(category);
    await refreshCategories();
  };

  const modifyCategory = async (id: string, updates: Partial<CategoryItem>) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem alterar categorias.');
    }
    await firestoreUpdateCategory(id, updates);
    await refreshCategories();
  };

  const removeCategory = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem remover categorias.');
    }
    await firestoreDeleteCategory(id);
    await refreshCategories();
  };

  // Collection mutations (Strict Admin Guard)
  const addCollection = async (col: CollectionItem) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem cadastrar coleções.');
    }
    await createCollectionItem(col);
    await refreshCollections();
  };

  const modifyCollection = async (id: string, updates: Partial<CollectionItem>) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem alterar coleções.');
    }
    await firestoreUpdateCollectionItem(id, updates);
    await refreshCollections();
  };

  const removeCollection = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem remover coleções.');
    }
    await firestoreDeleteCollectionItem(id);
    await refreshCollections();
  };

  // Banner mutations (Strict Admin Guard)
  const addBanner = async (banner: BannerItem) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem cadastrar banners.');
    }
    await firestoreCreateBanner(banner);
    await refreshBanners();
  };

  const modifyBanner = async (id: string, updates: Partial<BannerItem>) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem alterar banners.');
    }
    await firestoreUpdateBanner(id, updates);
    await refreshBanners();
  };

  const removeBanner = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem remover banners.');
    }
    await firestoreDeleteBanner(id);
    await refreshBanners();
  };

  // Orders mutation (Strict Admin Guard)
  const changeOrderStatus = async (orderId: string, status: OrderStatus) => {
    if (!isAdmin) {
      throw new Error('Acesso negado: Apenas administradores podem alterar pedidos.');
    }
    await firestoreUpdateOrderStatus(orderId, status);
    await refreshOrders();
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        categories,
        collections,
        banners,
        customers,
        orders,
        isLoading,
        isSeeding,
        refreshProducts,
        refreshCategories,
        refreshCollections,
        refreshBanners,
        refreshCustomers,
        refreshOrders,
        refreshAllData,
        resetToSeedCatalog,
        getProduct,
        addProduct,
        modifyProduct,
        updateProduct: modifyProduct,
        removeProduct,
        deleteProduct: removeProduct,
        addCategory,
        modifyCategory,
        removeCategory,
        addCollection,
        modifyCollection,
        removeCollection,
        addBanner,
        modifyBanner,
        removeBanner,
        changeOrderStatus,
        updateOrderStatus: changeOrderStatus,
        placeOrder
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
