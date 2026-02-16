import { OrderPayload } from '@/types/typeCheckout';

const baseUrl =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000'
    : '';

export const handleOrders = {
  getOrders: async () => {
    const res = await fetch(`${baseUrl}/api/orders`, {
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
    const res = await fetch(`${baseUrl}/api/orders/${ordersId}`, {
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
    const res = await fetch(`${baseUrl}/api/orders`, {
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
