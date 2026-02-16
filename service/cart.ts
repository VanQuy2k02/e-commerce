import { UpdateCartPayload } from '@/zustand/useCartStore';

export const handleCart = {
  getCart: async () => {
    const res = await fetch('/api/cart');
    const result = await res.json();
    if (!res.ok) {
      console.log('call api error');
    }
    return result.cart.cartItems;
  },

  updateCart: async (data: UpdateCartPayload) => {
    const res = await fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      console.log('call api error');
    }
    return result.cart.cartItems;
  },
};
