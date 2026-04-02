export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  tableNumber: number | null;
}

export type OrderStatus = 'novo' | 'preparando' | 'pronto';

export interface Order {
  id: string;
  tableNumber: number;
  items: CartItem[];
  notes: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
}
