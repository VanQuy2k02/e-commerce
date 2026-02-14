import { LoginProps, resAuth } from '@/types/typeAuth';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export async function POST(req: Request) {
  const body: LoginProps = await req.json();

  const res = await fetch(`${API}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        message: 'Sai tài khoản hoặc mật khẩu',
      },
      { status: res.status },
    );
  }

  const data: resAuth = await res.json();

  const response = NextResponse.json(data);

  // ✅ FORWARD COOKIE TỪ BACKEND
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  // cookie phụ để FE check UI
  response.cookies.set('isLogin', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
