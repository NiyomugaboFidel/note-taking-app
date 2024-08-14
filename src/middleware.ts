import { NextRequest, NextResponse } from "next/server";

// Middleware function to handle authentication
export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken") // Adjust the cookie name as necessary

  // Redirect to home page if the user is accessing the root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect to login page if the user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Middleware configuration to match specific paths
export const config = {
  matcher: ["/home", "/notes/:path*"], // Adjust the path pattern as necessary
};
