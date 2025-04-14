import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default function middleware(req) {
  // Define protected routes
  const protectedPaths = ["/blog", "/admin"]; // Add routes that need protection

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If the route is protected and user is not authenticated, redirect to login
  if (isProtected) {
    const user = req.cookies["next-auth.session-token"]; // Or another session cookie from NextAuth
    if (!user) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow public access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"], // Apply middleware to all routes except API, static, etc.
};
