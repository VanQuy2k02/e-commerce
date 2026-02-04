interface queryProps {
  page?: number;
  limit?: number;
  category?: string;
  supplier?: string;
  orderBy?: string;
  order?: string;
  hideOutOfStock?: string;
  minPrice?: number;
  maxPrice?: number;
}
export const handleProduct = {
  getProduct: async ({
    page,
    limit,
    category,
    supplier,
    orderBy,
    order,
    hideOutOfStock,
    minPrice,
    maxPrice,
  }: queryProps) => {
    const url = new URL('http://localhost:3000/api/products');
    const param = url.searchParams;

    if (page) {
      param.set('page', String(page));
    }
    if (limit) {
      param.set('limit', String(limit));
    }

    if (category) {
      param.set('category', String(category));
    }

    if (supplier) {
      param.set('supplier', String(supplier));
    }

    if (orderBy) {
      param.set('orderBy', String(orderBy));
    }

    if (supplier) {
      param.set('order', String(order));
    }

    if (supplier) {
      param.set('hideOutOfStock', String(hideOutOfStock));
    }

    if (minPrice) {
      param.set('minPrice', String(minPrice));
    }

    if (maxPrice) {
      param.set('maxPrice', String(maxPrice));
    }

    const res = await fetch(`${url.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Loi call api!');
    }
    const data = await res.json();
    return data;
  },
};
