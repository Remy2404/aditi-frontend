"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { CartItem, Cart } from "@/types/cart";
import { Product } from "@/types/product";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "aditi_cart";

const getInitialCart = (): Cart => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }
  return { items: [], total: 0, itemCount: 0 };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(getInitialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      setCart((prevCart) => {
        const existingItem = prevCart.items.find(
          (item) => item.id === product.id
        );

        let newItems: CartItem[];
        if (existingItem) {
          newItems = prevCart.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...prevCart.items, { id: product.id, product, quantity }];
        }

        const newTotal = calculateTotal(newItems);
        const newItemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return {
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        };
      });
    },
    [calculateTotal]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.filter((item) => item.id !== productId);
        const newTotal = calculateTotal(newItems);
        const newItemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return {
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        };
      });
    },
    [calculateTotal]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCart((prevCart) => {
        const newItems =
          quantity <= 0
            ? prevCart.items.filter((item) => item.id !== productId)
            : prevCart.items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              );

        const newTotal = calculateTotal(newItems);
        const newItemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return {
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        };
      });
    },
    [calculateTotal]
  );

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount: cart.itemCount,
        cartTotal: cart.total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
