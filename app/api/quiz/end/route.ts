import { NextResponse } from "next/server"
import { getQuizSession, updateQuizSession } from "@/lib/database"

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

    // If ending without answering current question, count it as wrong
    const finalCorrectAnswers = session.correct_answers
    let finalTotalAttempts = session.total_attempts

    // If there's an active question that hasn't been answered, count it as wrong
    if (session.is_active && session.total_attempts === session.used_questions.length - 1) {
      finalTotalAttempts += 1
    }

    await updateQuizSession(sessionId, {
      is_active: false,
      ended_at: new Date().toISOString(),
      correct_answers: finalCorrectAnswers,
      total_attempts: finalTotalAttempts,
    })

    return NextResponse.json({
      success: true,
      finalScore: {
        correct: finalCorrectAnswers,
        total: finalTotalAttempts,
        percentage: finalTotalAttempts > 0 ? Math.round((finalCorrectAnswers / finalTotalAttempts) * 100) : 0,
      },
    })
  } catch (error) {
    console.error("End game error:", error)
    return NextResponse.json({ error: "Failed to end game" }, { status: 500 })
  }
}
