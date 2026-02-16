import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export async function GET(req: Request) {
  const res = await fetch(`${API}/api/customers/12/orders`, {
    headers: {
      'Content-Type': 'application/json',
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

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${API}/api/customers/12/orders`, {
    method: 'POST',
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
  return NextResponse.json(data, { status: 201 });
}
