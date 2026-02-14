import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export async function POST(req: Request) {
  await fetch(`${API}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  const response = NextResponse.json({
    msg: 'Logout Success',
    status: 200,
  });

  response.cookies.set('isLogin', '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}
