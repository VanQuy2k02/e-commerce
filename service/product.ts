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
    const url = new URL('/api/products');
    const param = url.searchParams;

    param.set('page', String(page));
    param.set('limit', String(limit));

    if (category) {
      param.set('category', String(category));
    }

    if (supplier) {
      param.set('supplier', String(supplier));
    }

    if (orderBy) {
      param.set('orderBy', String(orderBy));
    }

    if (order) {
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
      next: {
        revalidate: 3000,
      },
    });
    if (!res.ok) {
      throw new Error('Loi call api!');
    }
    const data: ResponseProduct = await res.json();
    return data;
  },

  getDetailProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      throw new Error('Loi call api');
    }
    const data: ProductDetailProps = await res.json();
    return data;
  },

  getReviewsProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}/reviews`);
    if (!res.ok) {
      throw new Error('Loi call api');
    }
    const data = await res.json();
    return data;
  },
};
