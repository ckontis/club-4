import { NextResponse } from "next/server"
import { getQuizSession, updateQuizSession, updateUserStats } from "@/lib/database"

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

    // Mark session as ended
    const endedAt = new Date().toISOString()
    await updateQuizSession(sessionId, {
      is_active: false,
      ended_at: endedAt,
    })

    // Update user stats if user exists
    if (session.user_id && session.username) {
      const updatedSession = { ...session, ended_at: endedAt, is_active: false }
      await updateUserStats(session.user_id, session.username, updatedSession)
      console.log("Updated stats for user:", session.username)
    }

    return NextResponse.json({
      success: true,
      finalScore: {
        correct: session.correct_answers,
        total: session.total_attempts,
        percentage:
          session.total_attempts > 0 ? Math.round((session.correct_answers / session.total_attempts) * 100) : 0,
      },
    })
  } catch (error) {
    console.error("End game error:", error)
    return NextResponse.json({ error: "Failed to end game" }, { status: 500 })
  }
}
