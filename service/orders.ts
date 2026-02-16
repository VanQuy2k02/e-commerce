import { OrderPayload } from '@/types/typeCheckout';

export const handleOrders = {
  getOrders: async () => {
    const res = await fetch(`http://localhost:3000/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: 'Backend Error' };
    }

    return {
      status: res.status,
      data: result,
    };
  },

  getDetailOrders: async (ordersId: number) => {
    const res = await fetch(`http://localhost:3000/api/orders/${ordersId}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: 'Backend Error' };
    }

    return {
      status: res.status,
      data: result,
    };
  },

  postOrders: async (data: OrderPayload) => {
    const res = await fetch(`http://localhost:3000/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: 'Backend Error' };
    }

    return {
      status: res.status,
      data: result,
    };
  },
};
