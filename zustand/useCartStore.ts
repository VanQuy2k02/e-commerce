import { create } from 'zustand';
import { handleCart } from '@/service/cart';
import useAuthStore from './useAuthStore';
import { useToastStore } from './useToastStore';
export interface Product {
  id: number;
  name?: string;
  description?: string;
  price?: string; // backend trả string
  stock?: number;
  categoryName?: string;
  supplierName?: string;
  thumbnail?: string;
}

export interface CartItem {
  quantity: number;
  product: Product;
}

export interface UpdateCartItem {
  customerId: number;
  productId: number;
  quantity: number;
}

export type UpdateCartPayload = UpdateCartItem[];

interface CartState {
  carts: CartItem[];
  fetchDataCart: () => void;
  updateCart: (newCarts: UpdateCartPayload) => void;
  addToCart: (productId: number) => void;
  deleteCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  carts: [],
  fetchDataCart: async () => {
    const res = await handleCart.getCart();
    set({ carts: res });
  },
  updateCart: async (newCarts: UpdateCartPayload) => {
    const prev = get().carts;
    try {
      await handleCart.updateCart(newCarts);
    } catch (error) {
      set({ carts: prev });
    }
  },
  increment: (productId) => {
    const customerId = useAuthStore.getState().user?.id;
    if (!customerId) return;
    const prev = get().carts;
    set({
      carts: prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    });
    const cartsUpdate = get().carts;
    const data = cartsUpdate.map((item) => {
      return {
        customerId: 12,
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    get().updateCart(data);
  },
  decrement: (productId) => {
    const customerId = useAuthStore.getState()?.user?.id;
    if (!customerId) return;
    const prev = get().carts;
    set({
      carts: prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    });
    const cartUpdate = get().carts;
    const data = cartUpdate.map((item) => {
      return {
        customerId: 12,
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    get().updateCart(data);
  },
  deleteCart: (productId) => {
    const customerId = useAuthStore.getState()?.user?.id;
    if (!customerId) return;
    const prev = get().carts;
    set({ carts: prev.filter((item) => item.product.id !== productId) });
    const updateCart = get().carts;
    const data = updateCart.map((item) => {
      return {
        customerId: 12,
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    get().updateCart(data);
  },
  addToCart: (productId) => {
    const customerId = useAuthStore.getState()?.user?.id;
    if (!customerId) return;
    const prev = get().carts;
    let newCart;
    const existed = prev.find((item) => item.product.id === productId);
    if (existed) {
      newCart = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      newCart = [
        ...prev,
        {
          product: {
            id: productId,
          },
          quantity: 1,
        },
      ];
    }
    set({ carts: newCart });
    const data = newCart.map((item) => {
      return {
        customerId: 12,
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    get().updateCart(data);
  },
}));
