import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("aliz_token")?.value;
  const role = request.cookies.get("aliz_role")?.value;
  const { pathname } = request.nextUrl;

  // 1. Proteger rutas del Cliente (Perfil, Mi Cuenta y futuro Dashboard)
  if (
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/mi-cuenta")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Proteger rutas del Panel de Administración (Exclusivo ALiz)
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Si ya está logueado e intenta ir a /login, redirigir a /perfil (o /admin si es administrador)
  if (pathname === "/login" && token) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/perfil", request.url),
    );
  }

  return NextResponse.next();
}

// Configuración de rutas interceptadas por el Proxy
export const config = {
  matcher: [
    "/perfil/:path*",
    "/dashboard/:path*",
    "/mi-cuenta/:path*",
    "/admin/:path*",
    "/login",
  ],
};
