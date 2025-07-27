import { NextResponse } from "next/server"
import { createUser, initializeDatabase } from "@/lib/database"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    await initializeDatabase()

    const { username, email, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await createUser(username, email, passwordHash)

    if (!user) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register" }, { status: 500 })
  }
}
