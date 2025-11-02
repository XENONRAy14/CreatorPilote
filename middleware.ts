import { NextResponse } from 'next/server'

export async function middleware() {
  // Pour l'instant, on laisse passer toutes les requêtes
  // La protection sera gérée côté client et dans les pages
  return NextResponse.next()
}

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
}
