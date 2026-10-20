import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import {
  Product,
  CategoryItem,
  CollectionItem,
  BannerItem,
  CustomerData,
  UserProfile,
  Order,
  CartItem,
  OrderStatus
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_COLLECTIONS,
  INITIAL_BANNERS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS
} from './seedData';

// Storage keys for resilient local mirror when offline or unconfigured
const STORAGE_KEYS = {
  PRODUCTS: 'rg_store_products_v1',
  CATEGORIES: 'rg_store_categories_v1',
  COLLECTIONS: 'rg_store_collections_v1',
  BANNERS: 'rg_store_banners_v1',
  USERS: 'rg_store_users_v1',
  ORDERS: 'rg_store_orders_v1',
  CARTS: 'rg_store_carts_v1',
  CUSTOMERS: 'rg_store_customers_v1'
};

function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
}

// Check if Firestore is live and writable
let firestoreIsLive: boolean | null = null;

async function checkFirestoreAvailable(): Promise<boolean> {
  if (firestoreIsLive !== null) return firestoreIsLive;
  if (!db) {
    firestoreIsLive = false;
    return false;
  }
  try {
    // Quick probe
    const probe = await getDoc(doc(db, 'system', 'status'));
    firestoreIsLive = true;
    return true;
  } catch (err) {
    const msg = String(err);
    if (msg.includes('offline') || msg.includes('permission') || msg.includes('API key') || msg.includes('invalid')) {
      firestoreIsLive = false;
      return false;
    }
    // If permission denied on probe, Firestore itself is responsive
    firestoreIsLive = true;
    return true;
  }
}

// -------------------------------------------------------------
// 1. PRODUCTS
// -------------------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  // 1. Try Firestore first
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        const list: Product[] = [];
        snap.forEach((d) => list.push(d.data() as Product));
        setLocalData(STORAGE_KEYS.PRODUCTS, list);
        return list;
      }
    } catch (err) {
      console.warn('Could not fetch products from Firestore, attempting server API:', err);
    }
  }

  // 2. Try Server API
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        setLocalData(STORAGE_KEYS.PRODUCTS, data.products);
        return data.products;
      }
    }
  } catch (err) {
    console.warn('Could not fetch products from /api/products, using local mirror:', err);
  }

  // 3. Fallback to local storage mirror
  let local = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, []);
  if (!local || local.length === 0) {
    local = INITIAL_PRODUCTS;
    setLocalData(STORAGE_KEYS.PRODUCTS, local);
  }
  return local;
}

export async function getProductById(productId: string): Promise<Product | null> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const ref = doc(db, 'products', productId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as Product;
      }
    } catch (err) {
      console.warn(`Firestore getProductById (${productId}) error, using mirror:`, err);
    }
  }

  const products = await getProducts();
  return products.find((p) => p.id === productId) || null;
}

export async function createProduct(product: Product): Promise<void> {
  // 1. Persist to server API if possible
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch (err) {
    console.warn('Could not save product to /api/products:', err);
  }

  // 2. Persist to Firestore
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'products', product.id), product);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `products/${product.id}`);
    }
  }

  // 3. Update local mirror
  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updated = [product, ...products.filter((p) => p.id !== product.id)];
  setLocalData(STORAGE_KEYS.PRODUCTS, updated);
}

export async function updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
  // 1. Update on server API if possible
  try {
    await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch (err) {
    console.warn(`Could not update product ${productId} on /api/products:`, err);
  }

  // 2. Update on Firestore
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'products', productId), updates as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${productId}`);
    }
  }

  // 3. Update local mirror
  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updated = products.map((p) => (p.id === productId ? { ...p, ...updates } : p));
  setLocalData(STORAGE_KEYS.PRODUCTS, updated);
}

export async function deleteProduct(productId: string): Promise<void> {
  // 1. Delete on server API if possible
  try {
    await fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn(`Could not delete product ${productId} on /api/products:`, err);
  }

  // 2. Delete on Firestore
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
    }
  }

  // 3. Update local mirror
  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updated = products.filter((p) => p.id !== productId);
  setLocalData(STORAGE_KEYS.PRODUCTS, updated);
}

// -------------------------------------------------------------
// 2. CATEGORIES & COLLECTIONS & BANNERS
// -------------------------------------------------------------
export async function getCategories(): Promise<CategoryItem[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        const list: CategoryItem[] = [];
        snap.forEach((d) => list.push(d.data() as CategoryItem));
        setLocalData(STORAGE_KEYS.CATEGORIES, list);
        return list;
      }
    } catch (err) {
      console.warn('Could not fetch categories from Firestore, using mirror:', err);
    }
  }

  let local = getLocalData<CategoryItem[]>(STORAGE_KEYS.CATEGORIES, []);
  if (!local || local.length === 0) {
    local = INITIAL_CATEGORIES;
    setLocalData(STORAGE_KEYS.CATEGORIES, local);
  }
  return local;
}

export async function createCategory(cat: CategoryItem): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'categories', cat.id), cat);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `categories/${cat.id}`);
    }
  }
  const list = getLocalData<CategoryItem[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const updated = [cat, ...list.filter(c => c.id !== cat.id)];
  setLocalData(STORAGE_KEYS.CATEGORIES, updated);
}

export async function updateCategory(catId: string, updates: Partial<CategoryItem>): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'categories', catId), updates as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `categories/${catId}`);
    }
  }
  const list = getLocalData<CategoryItem[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const updated = list.map(c => c.id === catId ? { ...c, ...updates } : c);
  setLocalData(STORAGE_KEYS.CATEGORIES, updated);
}

export async function deleteCategory(catId: string): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await deleteDoc(doc(db, 'categories', catId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `categories/${catId}`);
    }
  }
  const list = getLocalData<CategoryItem[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const updated = list.filter(c => c.id !== catId);
  setLocalData(STORAGE_KEYS.CATEGORIES, updated);
}

export async function getCollections(): Promise<CollectionItem[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'collections'));
      if (!snap.empty) {
        const list: CollectionItem[] = [];
        snap.forEach((d) => list.push(d.data() as CollectionItem));
        setLocalData(STORAGE_KEYS.COLLECTIONS, list);
        return list;
      }
    } catch (err) {
      console.warn('Could not fetch collections from Firestore, using mirror:', err);
    }
  }

  let local = getLocalData<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, []);
  if (!local || local.length === 0) {
    local = INITIAL_COLLECTIONS;
    setLocalData(STORAGE_KEYS.COLLECTIONS, local);
  }
  return local;
}

export async function createCollectionItem(col: CollectionItem): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'collections', col.id), col);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `collections/${col.id}`);
    }
  }
  const list = getLocalData<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  const updated = [col, ...list.filter(c => c.id !== col.id)];
  setLocalData(STORAGE_KEYS.COLLECTIONS, updated);
}

export async function updateCollectionItem(colId: string, updates: Partial<CollectionItem>): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'collections', colId), updates as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `collections/${colId}`);
    }
  }
  const list = getLocalData<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  const updated = list.map(c => c.id === colId ? { ...c, ...updates } : c);
  setLocalData(STORAGE_KEYS.COLLECTIONS, updated);
}

export async function deleteCollectionItem(colId: string): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await deleteDoc(doc(db, 'collections', colId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `collections/${colId}`);
    }
  }
  const list = getLocalData<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  const updated = list.filter(c => c.id !== colId);
  setLocalData(STORAGE_KEYS.COLLECTIONS, updated);
}

// -------------------------------------------------------------
// BANNERS
// -------------------------------------------------------------
export async function getBanners(): Promise<BannerItem[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'banners'));
      if (!snap.empty) {
        const list: BannerItem[] = [];
        snap.forEach((d) => list.push(d.data() as BannerItem));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        setLocalData(STORAGE_KEYS.BANNERS, list);
        return list;
      }
    } catch (err) {
      console.warn('Could not fetch banners from Firestore, using mirror:', err);
    }
  }

  let local = getLocalData<BannerItem[]>(STORAGE_KEYS.BANNERS, []);
  if (!local || local.length === 0) {
    local = INITIAL_BANNERS;
    setLocalData(STORAGE_KEYS.BANNERS, local);
  }
  return local;
}

export async function createBanner(banner: BannerItem): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'banners', banner.id), banner);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `banners/${banner.id}`);
    }
  }
  const list = getLocalData<BannerItem[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
  const updated = [...list, banner];
  setLocalData(STORAGE_KEYS.BANNERS, updated);
}

export async function updateBanner(bannerId: string, updates: Partial<BannerItem>): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'banners', bannerId), updates as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `banners/${bannerId}`);
    }
  }
  const list = getLocalData<BannerItem[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
  const updated = list.map(b => b.id === bannerId ? { ...b, ...updates } : b);
  setLocalData(STORAGE_KEYS.BANNERS, updated);
}

export async function deleteBanner(bannerId: string): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await deleteDoc(doc(db, 'banners', bannerId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `banners/${bannerId}`);
    }
  }
  const list = getLocalData<BannerItem[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
  const updated = list.filter(b => b.id !== bannerId);
  setLocalData(STORAGE_KEYS.BANNERS, updated);
}

// -------------------------------------------------------------
// 3. USERS & PROFILES
// -------------------------------------------------------------
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDoc(doc(db, 'users', userId));
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        const users = getLocalData<Record<string, UserProfile>>(STORAGE_KEYS.USERS, {});
        users[userId] = data;
        setLocalData(STORAGE_KEYS.USERS, users);
        return data;
      }
    } catch (err) {
      console.warn(`Firestore getUserProfile (${userId}) error:`, err);
    }
  }

  const users = getLocalData<Record<string, UserProfile>>(STORAGE_KEYS.USERS, {});
  return users[userId] || null;
}

export async function createUserProfile(profile: UserProfile): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'users', profile.id), profile);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${profile.id}`);
    }
  }

  const users = getLocalData<Record<string, UserProfile>>(STORAGE_KEYS.USERS, {});
  users[profile.id] = profile;
  setLocalData(STORAGE_KEYS.USERS, users);
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'users', userId), updates as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${userId}`);
    }
  }

  const users = getLocalData<Record<string, UserProfile>>(STORAGE_KEYS.USERS, {});
  if (users[userId]) {
    users[userId] = { ...users[userId], ...updates };
    setLocalData(STORAGE_KEYS.USERS, users);
  }
}

// -------------------------------------------------------------
// 4. ORDERS
// -------------------------------------------------------------
export async function createOrder(order: Order): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'orders', order.id), order);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `orders/${order.id}`);
    }
  }

  const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);
  setLocalData(STORAGE_KEYS.ORDERS, [order, ...orders]);
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const list: Order[] = [];
      snap.forEach((d) => list.push(d.data() as Order));
      return list;
    } catch (err) {
      console.warn('Firestore getUserOrders error, checking local mirror:', err);
    }
  }

  const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);
  return orders.filter((o) => o.userId === userId);
}

export async function getAllOrders(): Promise<Order[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'orders'));
      if (!snap.empty) {
        const list: Order[] = [];
        snap.forEach((d) => list.push(d.data() as Order));
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLocalData(STORAGE_KEYS.ORDERS, list);
        return list;
      }
    } catch (err) {
      console.warn('Firestore getAllOrders error:', err);
    }
  }

  let local = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);
  if (!local || local.length === 0) {
    local = INITIAL_ORDERS;
    setLocalData(STORAGE_KEYS.ORDERS, local);
  }
  return local;
}

export async function getCustomers(): Promise<CustomerData[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDocs(collection(db, 'users'));
      if (!snap.empty) {
        const customers: CustomerData[] = [];
        const allOrders = await getAllOrders();
        snap.forEach((d) => {
          const u = d.data() as UserProfile;
          const userOrders = allOrders.filter(o => o.userId === u.id);
          const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
          customers.push({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role,
            totalOrders: userOrders.length,
            totalSpent,
            lastOrderDate: userOrders[0]?.createdAt
          });
        });
        if (customers.length > 0) {
          setLocalData(STORAGE_KEYS.CUSTOMERS, customers);
          return customers;
        }
      }
    } catch (err) {
      console.warn('Firestore getCustomers error:', err);
    }
  }

  let local = getLocalData<CustomerData[]>(STORAGE_KEYS.CUSTOMERS, []);
  if (!local || local.length === 0) {
    local = INITIAL_CUSTOMERS;
    setLocalData(STORAGE_KEYS.CUSTOMERS, local);
  }
  return local;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  }

  const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
  setLocalData(STORAGE_KEYS.ORDERS, updated);
}

// -------------------------------------------------------------
// 5. CARTS
// -------------------------------------------------------------
export async function getCart(userId: string): Promise<CartItem[]> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      const snap = await getDoc(doc(db, 'carts', userId));
      if (snap.exists()) {
        const data = snap.data();
        return (data.items as CartItem[]) || [];
      }
    } catch (err) {
      console.warn('Firestore getCart error:', err);
    }
  }

  const carts = getLocalData<Record<string, CartItem[]>>(STORAGE_KEYS.CARTS, {});
  return carts[userId] || [];
}

export async function saveCart(userId: string, items: CartItem[]): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (isLive) {
    try {
      await setDoc(doc(db, 'carts', userId), {
        id: userId,
        userId,
        items
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `carts/${userId}`);
    }
  }

  const carts = getLocalData<Record<string, CartItem[]>>(STORAGE_KEYS.CARTS, {});
  carts[userId] = items;
  setLocalData(STORAGE_KEYS.CARTS, carts);
}

// -------------------------------------------------------------
// 6. INITIAL SEEDING HELPER
// -------------------------------------------------------------
export async function seedInitialFirestoreData(): Promise<void> {
  const isLive = await checkFirestoreAvailable();
  if (!isLive) return;

  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    if (productsSnap.empty) {
      console.log('Seeding initial 30 products to Firestore...');
      for (const p of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
      for (const c of INITIAL_CATEGORIES) {
        await setDoc(doc(db, 'categories', c.id), c);
      }
      for (const col of INITIAL_COLLECTIONS) {
        await setDoc(doc(db, 'collections', col.id), col);
      }
      for (const b of INITIAL_BANNERS) {
        await setDoc(doc(db, 'banners', b.id), b);
      }
      for (const o of INITIAL_ORDERS) {
        await setDoc(doc(db, 'orders', o.id), o);
      }
      console.log('Firestore seed completed successfully.');
    }
  } catch (err) {
    console.warn('Initial seeding encountered an issue:', err);
  }
}
