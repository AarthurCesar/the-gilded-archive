import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Order, OrderStatus, CartItem } from '../types';

const STORAGE_KEY = 'restaurante:orders';

function loadOrders(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

interface OrderContextValue {
  orders: Order[];
  addOrder: (items: CartItem[], tableNumber: number, notes: string) => string;
  advanceStatus: (orderId: string) => void;
  removeOrder: (orderId: string) => void;
  closeTable: (tableNumber: number) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  // Persist on change
  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  // Listen for cross-tab changes + polling
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setOrders(loadOrders());
      }
    };
    window.addEventListener('storage', onStorage);

    const interval = setInterval(() => {
      setOrders(loadOrders());
    }, 3000);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  const addOrder = useCallback((items: CartItem[], tableNumber: number, notes: string) => {
    const id = `order_${Date.now()}`;
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order: Order = {
      id,
      tableNumber,
      items,
      notes,
      status: 'novo',
      total,
      createdAt: new Date().toISOString(),
    };
    const current = loadOrders();
    saveOrders([...current, order]);
    setOrders([...current, order]);
    return id;
  }, []);

  const advanceStatus = useCallback((orderId: string) => {
    const next: Record<OrderStatus, OrderStatus | null> = {
      novo: 'preparando',
      preparando: 'pronto',
      pronto: null,
    };
    setOrders(prev => {
      const updated = prev.map(o => {
        if (o.id === orderId) {
          const nextStatus = next[o.status];
          if (nextStatus) return { ...o, status: nextStatus };
        }
        return o;
      });
      saveOrders(updated);
      return updated;
    });
  }, []);

  const removeOrder = useCallback((orderId: string) => {
    setOrders(prev => {
      const updated = prev.filter(o => o.id !== orderId);
      saveOrders(updated);
      return updated;
    });
  }, []);

  const closeTable = useCallback((tableNumber: number) => {
    setOrders(prev => {
      const updated = prev.filter(o => o.tableNumber !== tableNumber);
      saveOrders(updated);
      return updated;
    });
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, advanceStatus, removeOrder, closeTable }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
