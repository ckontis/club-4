import { NextResponse } from "next/server"
import { findUserByUsername } from "@/lib/database"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Find user (this will check both database and fallback)
    const user = await findUserByUsername(username)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For demo purposes, if no password hash exists, accept any password
    if (user.password_hash) {
      const isValidPassword = await verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
    }

    console.log("User logged in successfully:", user.username)

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      isGuest: user.is_guest,
    })

    // Set cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
