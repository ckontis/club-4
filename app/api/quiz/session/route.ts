import { NextResponse } from "next/server"
import { createQuizSession, createGuestUser } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { userId, username } = await request.json()

    let finalUserId = userId
    let finalUsername = username

    // If no user provided, create a guest user
    if (!userId) {
      const guestUser = await createGuestUser()
      finalUserId = guestUser.id
      finalUsername = guestUser.username
    }

    const sessionId = await createQuizSession(finalUserId, finalUsername)

    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
