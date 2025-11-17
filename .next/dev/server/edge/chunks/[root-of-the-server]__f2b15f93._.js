(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map