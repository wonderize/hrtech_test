import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
const protectedRoutes = ['/']
const publicRoutes = ['/login']
 
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  const session = cookies().get("access_token")?.value
 
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
 
  if (
    isPublicRoute &&
    session &&
    request.nextUrl.pathname.startsWith('/login')
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
