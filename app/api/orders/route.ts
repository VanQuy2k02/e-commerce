import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export async function GET(req: Request) {
  const res = await fetch(`${API}/api/customers/12/orders`, {
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
