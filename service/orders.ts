export const handleOrders = {
  getOrders: async () => {
    const res = await fetch('http://localhost:3000/api/orders', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: 'swagger ui',
      },
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
        authorization: 'swagger ui',
      },
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
