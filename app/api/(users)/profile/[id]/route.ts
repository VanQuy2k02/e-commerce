// app/api/profile/[id]/route.ts
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const customerId = Number(id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ message: 'Invalid customer id' }, { status: 400 });
  }

  const res = await fetch(`${API}/api/customers/${customerId}`, {
    headers: {
      accept: 'application/json',
      authorization: 'swagger ui', // 🔥 QUAN TRỌNG
    },
    cache: 'no-store',
  });

  const text = await res.text();

  if (!res.ok) {
    return NextResponse.json({ message: 'Backend error', detail: text }, { status: res.status });
  }

  return NextResponse.json(JSON.parse(text));
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { id } = await params;
  const customerId = Number(id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ message: 'Invalid customer id' }, { status: 400 });
  }

  const res = await fetch(`${API}/api/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authorization: 'swagger ui', // 🔥 QUAN TRỌNG
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const text = await res.text();

  if (!res.ok) {
    return NextResponse.json({ message: 'Backend error', detail: text }, { status: res.status });
  }

  return NextResponse.json(JSON.parse(text), { status: 200 });
}
