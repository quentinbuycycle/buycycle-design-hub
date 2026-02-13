import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

function validateShareToken(token: string): boolean {
  const secret = process.env.UPLOAD_PASSWORD;
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encoded, signature] = parts;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");

  return signature === expected;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Allow: login page, API routes, static assets
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Already authenticated via hub login
  const authCookie = request.cookies.get("hub-auth");
  if (authCookie?.value) {
    return NextResponse.next();
  }

  // Share token in URL — validate and grant temporary access
  const shareToken = searchParams.get("share");
  if (shareToken && validateShareToken(shareToken)) {
    const response = NextResponse.next();
    // Set a 1-hour cookie so prototype links work after landing
    response.cookies.set("share-access", shareToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  }

  // Share access cookie from a previous share-link landing
  const shareCookie = request.cookies.get("share-access");
  if (shareCookie?.value && validateShareToken(shareCookie.value)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
