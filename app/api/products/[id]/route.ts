import { ProductDetailProps } from '@/types/typeProduct';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
interface paramsProps {
  params: {
    id: number;
  };
}
export async function GET(request: Request, { params }: paramsProps) {
  const { id } = await params;
  const res = await fetch(`${API}/api/products/${id}`);
  const data: ProductDetailProps = await res.json();
  return NextResponse.json(data, { status: 200 });
}
