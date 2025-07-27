import { NextResponse } from "next/server"
import { getQuizSession, updateQuizSession, updateUserStats } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    console.log("Ending game for session:", sessionId)

    const session = await getQuizSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    console.log("Found session:", session)

    // Mark session as ended
    const endedAt = new Date().toISOString()
    await updateQuizSession(sessionId, {
      is_active: false,
      ended_at: endedAt,
    })

    // Update the session object with the ended_at time
    const finalSession = { ...session, ended_at: endedAt, is_active: false }

    // ALWAYS update user stats when a game ends (for both registered users and guests)
    if (finalSession.username) {
      console.log("Updating stats for user:", finalSession.username)
      await updateUserStats(
        finalSession.user_id || finalSession.username, // Use username as ID if no user_id
        finalSession.username,
        finalSession,
      )
      console.log("Stats updated successfully")
    } else {
      console.log("No username found, skipping stats update")
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
