import { getToken } from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard', '/tasks', '/profile'];

export function middleware(request: NextRequest) {
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check if user has a valid token
    const token = getToken();

    if (!token) {
      // Redirect to login page if no token exists
      const url = request.nextUrl.clone();
      url.pathname = '/(auth)/sign-in';
      url.search = `?callbackUrl=${request.nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};