import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check if the request is for the dashboard (except the login page)
  if (request.nextUrl.pathname.startsWith("/dashboard") && request.nextUrl.pathname !== "/dashboard") {
    // Get the token from the cookies
    const token = request.cookies.get("auth_token")?.value

    // If there's no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    try {
      // Verify the token
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "default_secret"))

      // If the token is valid, continue to the requested page
      return NextResponse.next()
    } catch (error) {
      // If the token is invalid, redirect to the login page
      console.error("Token verification error:", error)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // For all other requests, continue
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
}

