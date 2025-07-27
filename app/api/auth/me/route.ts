import { NextResponse } from "next/server"
import { findUserById } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("session_token=")[1]?.split(";")[0]

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await findUserById(payload.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Failed to check auth" }, { status: 500 })
  }
}
