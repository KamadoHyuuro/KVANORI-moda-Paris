import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, ProductColor, CartItem } from '../types';
import { useAuth } from './AuthContext';
import { useNavigation } from './NavigationContext';
import { getCart, saveCart } from '../firebase/firestore';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  updateQuantity: (productId: string, colorName: string, size: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  discountCode: string;
  discountAmount: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  lastAddedProduct: { product: Product; color: ProductColor; size: string } | null;
  clearLastAdded: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setAuthPromptMessage } = useAuth();
  const { setIsAccountModalOpen } = useNavigation();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ product: Product; color: ProductColor; size: string } | null>(null);

  const initialLoadRef = useRef(false);

  // Sync cart with Firestore for the authenticated user
  useEffect(() => {
    let isCancelled = false;

    async function syncUserCart() {
      if (user) {
        try {
          const userItems = await getCart(user.id);
          if (!isCancelled && userItems) {
            setItems(userItems);
          }
        } catch (err) {
          console.warn('Error fetching Firestore cart:', err);
        }
      } else {
        // Clear items when user logs out
        setItems([]);
        setIsCartOpen(false);
        setIsCheckoutModalOpen(false);
      }
      initialLoadRef.current = true;
    }

    syncUserCart();
    return () => { isCancelled = true; };
  }, [user?.id]);

  // Persist items for authenticated user
  useEffect(() => {
    if (user && initialLoadRef.current) {
      saveCart(user.id, items).catch((err) => {
        console.warn('Could not persist cart to Firestore:', err);
      });
    }
  }, [items, user]);

  // Open cart guarded by authentication check
  const openCart = () => {
    if (!user) {
      setAuthPromptMessage('Entre na sua conta para continuar.');
      setIsAccountModalOpen(true);
      return;
    }
    setIsCartOpen(true);
  };

  const handleSetIsCartOpen = (open: boolean) => {
    if (open && !user) {
      setAuthPromptMessage('Entre na sua conta para continuar.');
      setIsAccountModalOpen(true);
      return;
    }
    setIsCartOpen(open);
  };

  // Add to cart guarded by authentication check
  const addToCart = (product: Product, color: ProductColor, size: string, quantity: number = 1) => {
    if (!user) {
      setAuthPromptMessage('Entre na sua conta para continuar.');
      setIsAccountModalOpen(true);
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });

    setLastAddedProduct({ product, color, size });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorName: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (productId: string, colorName: string, size: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const clearLastAdded = () => {
    setLastAddedProduct(null);
  };

  const applyDiscount = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PARIS1986' || cleanCode === 'RIVEGAUCHE10') {
      setDiscountCode(cleanCode);
      setDiscountPercent(0.10);
      return { success: true, message: 'Cupom de 10% aplicado com elegância!' };
    }
    if (cleanCode === 'FLORE15') {
      setDiscountCode(cleanCode);
      setDiscountPercent(0.15);
      return { success: true, message: 'Privilégio literário de 15% ativado.' };
    }
    return { success: false, message: 'Cupom não reconhecido pelo ateliê.' };
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const shipping = subtotal === 0 ? 0 : subtotal >= 600 ? 0 : 45;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen: handleSetIsCartOpen,
        openCart,
        totalItems,
        subtotal,
        shipping,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        lastAddedProduct,
        clearLastAdded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
