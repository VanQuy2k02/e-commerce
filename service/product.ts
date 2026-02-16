import { ProductDetailProps, ResponseProduct } from '@/types/typeProduct';

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

    if (page) param.set('page', String(page));
    if (limit) param.set('limit', String(limit));
    if (category) param.set('category', category);
    if (supplier) param.set('supplier', supplier);
    if (orderBy) param.set('orderBy', orderBy);
    if (order) param.set('order', order);
    if (hideOutOfStock) param.set('hideOutOfStock', hideOutOfStock);
    if (minPrice) param.set('minPrice', String(minPrice));
    if (maxPrice) param.set('maxPrice', String(maxPrice));

    const res = await fetch(url.toString(), {
      next: { revalidate: 3000 },
    });

    if (!res.ok) {
      throw new Error('Lỗi call api products');
    }

    return res.json() as Promise<ResponseProduct>;
  },

  getDetailProduct: async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Lỗi call api product detail');
    }

    return res.json() as Promise<ProductDetailProps>;
  },

  getReviewsProduct: async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}/reviews`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Lỗi call api reviews');
    }

    return res.json();
  },
};
