import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Cart, CartItem } from '../types';

const STORAGE_KEY = 'restaurante:cart';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'SET_TABLE'; payload: number | null }
  | { type: 'CLEAR' };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.productId !== action.payload) };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREMENT': {
      const item = state.items.find(i => i.productId === action.payload);
      if (item && item.quantity <= 1) {
        return { ...state, items: state.items.filter(i => i.productId !== action.payload) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case 'SET_TABLE':
      return { ...state, tableNumber: action.payload };
    case 'CLEAR':
      return { items: [], tableNumber: null };
    default:
      return state;
  }
}

function loadCart(): Cart {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { items: [], tableNumber: null };
}

interface CartContextValue {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  setTable: (n: number | null) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value: CartContextValue = {
    cart,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    increment: (id) => dispatch({ type: 'INCREMENT', payload: id }),
    decrement: (id) => dispatch({ type: 'DECREMENT', payload: id }),
    setTable: (n) => dispatch({ type: 'SET_TABLE', payload: n }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
