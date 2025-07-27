import { NextResponse } from "next/server"
import { getQuizSession, updateQuizSession, getPlayersForClubs } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { sessionId, club1, club2, userAnswer } = await request.json()

    if (!sessionId || !club1 || !club2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = await getQuizSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    if (!session.is_active) {
      return NextResponse.json({ error: "Session is not active" }, { status: 400 })
    }

    // Get all players who played for both clubs
    const correctPlayers = getPlayersForClubs(club1, club2)
    const correctPlayerNames = correctPlayers.map((p) => p.name.toLowerCase())

    // Check if the user's answer is correct (empty answer counts as wrong)
    const isCorrect = userAnswer && correctPlayerNames.includes(userAnswer.toLowerCase())

    // Update session stats
    const newCorrectAnswers = session.correct_answers + (isCorrect ? 1 : 0)
    const newTotalAttempts = session.total_attempts + 1
    const newUsedQuestions = [...session.used_questions]

    // Find the current question ID and add it to used questions
    const currentQuestionId = session.used_questions.length + 1
    if (!newUsedQuestions.includes(currentQuestionId)) {
      newUsedQuestions.push(currentQuestionId)
    }

    await updateQuizSession(sessionId, {
      correct_answers: newCorrectAnswers,
      total_attempts: newTotalAttempts,
      used_questions: newUsedQuestions,
    })

    return NextResponse.json({
      isCorrect,
      correctPlayers: correctPlayers.map((p) => p.name),
      userAnswer: isCorrect ? userAnswer : null,
    })
  } catch (error) {
    console.error("Answer submission error:", error)
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 })
  }
}
