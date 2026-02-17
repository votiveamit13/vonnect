import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const buildingId = req.cookies.get("buildingId")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  const isProtected =
    pathname.startsWith("/owner") ||
    pathname.startsWith("/tenant") ||
    pathname.startsWith("/security") ||
    pathname.startsWith("/administrator") ||
    pathname.startsWith("/building-selection");

  if (!isProtected) return NextResponse.next();

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Logged in but no building selected
  if (!buildingId && !pathname.startsWith("/building-selection")) {
    return NextResponse.redirect(new URL("/building-selection", req.url));
  }

  // 🔐 Role-based route protection
  if (pathname.startsWith("/owner") && role !== "owner") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/tenant") && role !== "tenant") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/security") && role !== "security") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/administrator") && role !== "administration") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/owner/:path*",
    "/tenant/:path*",
    "/security/:path*",
    "/administrator/:path*",
    "/building-selection",
  ],
};
