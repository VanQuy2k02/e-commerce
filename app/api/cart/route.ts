import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const res = await fetch(`https://taliphus.vercel.app/api/customers/12/cart`, {
    headers: {
      accept: 'application/json',
      authorization: 'swagger ui',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ message: 'Backend error' });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const res = await fetch(`https://taliphus.vercel.app/api/customers/12/cart`, {
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
    return NextResponse.json({ message: 'Backend error' });
  }

  return NextResponse.json(data, { status: 200 });
}
