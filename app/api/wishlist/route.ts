import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export async function GET(request: Request) {
  const res = await fetch(`${API}/api/customers/12/wishlist`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'swagger ui',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ message: 'Backend Error' });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API}/api/customers/12/wishlist`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authorization: 'swagger ui',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ message: 'Backend Error' });
  }
  return NextResponse.json(data, { status: 200 });
}
