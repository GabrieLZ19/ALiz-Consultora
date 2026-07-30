import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("aliz_token")?.value;
  const role = request.cookies.get("aliz_role")?.value;
  const { pathname } = request.nextUrl;

  // 1. Proteger rutas del Portal de Cliente ("Mi Cuenta" / "Dashboard")
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/mi-cuenta")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Proteger rutas del Panel de Administración (Exclusivo ALiZ)
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Si ya está logueado e intenta ir a /login, redirigir al Dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

// Configuración de rutas interceptadas por el Middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mi-cuenta/:path*",
    "/admin/:path*",
    "/login",
  ],
};
