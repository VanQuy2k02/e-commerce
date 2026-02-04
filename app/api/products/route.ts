import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const url = new URL('/api/products', API);
  const param = url.searchParams;

  if (page) param.set('page', String(page));
  if (limit) param.set('limit', String(limit));
  if (minPrice) param.set('minPrice', String(minPrice));
  if (maxPrice) param.set('maxPrice', String(maxPrice));

  const res = await fetch(`${url.toString()}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
