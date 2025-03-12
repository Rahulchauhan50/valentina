import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function withAuth(request: NextRequest, handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  try {
    // Get the token from the cookies
    const token = request.cookies.get("auth_token")?.value

    // If there's no token, return unauthorized
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "default_secret"))

    // Call the handler with the user information
    return handler(request, payload)
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

