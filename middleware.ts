import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    '/sign-in',
    '/sign-up',
    '/api/auth',
    '/',
  ];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token =
    req.cookies.get('accessToken')?.value ||
    req.cookies.get('token')?.value ||
    req.cookies.get('auth')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('Cookie', req.cookies.toString());

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/notes/:path*',
    '/profile/:path*',
    '/api/:path*',
  ],
};
