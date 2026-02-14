import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get('isLogin');

  if (isLogin && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLogin && request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isLogin && request.nextUrl.pathname.startsWith('/cart')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/cart/:path*'],
};
