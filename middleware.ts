
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const publicRoutes = [
//     '/sign-in',
//     '/sign-up',
//     '/api/auth',
//     '/',
//   ];

//   if (publicRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   const token =
//     req.cookies.get('accessToken')?.value ||
//     req.cookies.get('token')?.value ||
//     req.cookies.get('auth')?.value;

//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/sign-in';
//     return NextResponse.redirect(url);
//   }

//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set('Cookie', req.cookies.toString());

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

// export const config = {
//   matcher: [
//     '/notes/:path*',
//     '/profile/:path*',
//     '/api/:path*',
//   ],
// };


import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (accessToken) {
    if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
    if (isPrivateRoute) return NextResponse.next();
  }

  if (!accessToken) {
    if (refreshToken) {
      if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
      if (isPublicRoute) return NextResponse.next();
    } else {
      if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
      if (isPublicRoute) return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};

