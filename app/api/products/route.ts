import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const category = searchParams.get('category');
  const supplier = searchParams.get('supplier');
  const orderBy = searchParams.get('orderBy');
  const order = searchParams.get('order');
  const hideOutOfStock = searchParams.get('hideOutOfStock');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const url = new URL('/api/products', API);
  const param = url.searchParams;

  if (page) param.set('page', String(page));
  if (limit) param.set('limit', String(limit));
  if (category) param.set('category', String(category));
  if (supplier) param.set('supplier', String(supplier));
  if (orderBy) param.set('orderBy', String(orderBy));
  if (order) param.set('order', String(order));
  if (hideOutOfStock) param.set('hideOutOfStock', String(hideOutOfStock));
  if (minPrice) param.set('minPrice', String(minPrice));
  if (maxPrice) param.set('maxPrice', String(maxPrice));

  const res = await fetch(`${url.toString()}`, {
    next: { revalidate: 3000 },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
