import { NextResponse } from "next/server"
import { getRandomClubPair, getQuizSession } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    const session = await getQuizSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    if (!session.is_active) {
      return NextResponse.json({ error: "Session is not active" }, { status: 400 })
    }

    // Get a random club pair, excluding already used ones and user's seen questions
    const clubPair = await getRandomClubPair(session.user_id, session.used_questions)

    if (!clubPair) {
      // No more questions available
      return NextResponse.json({ clubPair: null, message: "No more questions available" })
    }

    return NextResponse.json({ clubPair })
  } catch (error) {
    console.error("Quiz question error:", error)
    return NextResponse.json({ error: "Failed to get quiz question" }, { status: 500 })
  }
}
