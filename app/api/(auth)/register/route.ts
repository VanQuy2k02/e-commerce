import { resAuth, signupReq } from '@/types/typeAuth';
import { NextResponse } from 'next/server';
const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export async function POST(req: Request) {
  const body: signupReq = await req.json();
  const res = await fetch(`${API}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data: resAuth = await res.json();
  return NextResponse.json(data, { status: res.status });
}
