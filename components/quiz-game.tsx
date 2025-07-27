"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClubBadge } from "@/components/club-badge"
import { PlayerSearch } from "@/components/player-search"
import { Clock, Trophy, Target, Zap, SkipForward, Square } from "lucide-react"

interface ClubPair {
  id: number
  club1: string
  club2: string
}

interface QuizGameProps {
  user?: { id: string; username: string } | null
}

export function QuizGame({ user }: QuizGameProps) {
  const [currentPair, setCurrentPair] = useState<ClubPair | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<{ correct: boolean; playerName?: string; correctPlayers?: string[] } | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
  const [gameStarting, setGameStarting] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, timeLeft])

  const handleTimeUp = () => {
    setTimerActive(false)
    handleAnswer("") // Empty answer counts as wrong
  }

  const startNewGame = async () => {
    if (gameStarting) return // Prevent double clicks

    setGameStarting(true)
    setLoading(true)

    try {
      // Reset all game state first
      setCurrentPair(null)
      setSessionId(null)
      setScore(0)
      setTotalAttempts(0)
      setGameOver(false)
      setFeedback(null)
      setShowCorrectAnswers(false)
      setTimerActive(false)
      setTimeLeft(60)

      const response = await fetch("/api/quiz/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, username: user?.username }),
      })

      if (response.ok) {
        const data = await response.json()
        setSessionId(data.sessionId)

        // Get the first question
        const questionResponse = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: data.sessionId }),
        })

        if (questionResponse.ok) {
          const questionData = await questionResponse.json()
          if (questionData.clubPair) {
            setCurrentPair(questionData.clubPair)
            setTimeLeft(60)
            setTimerActive(true)
          } else {
            setGameOver(true)
          }
        }
      }
    } catch (error) {
      console.error("Error starting game:", error)
    } finally {
      setLoading(false)
      setGameStarting(false)
    }
  }

  const getNextQuestion = async () => {
    if (!sessionId) return

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.clubPair) {
          setCurrentPair(data.clubPair)
          setFeedback(null)
          setShowCorrectAnswers(false)
          setTimeLeft(60)
          setTimerActive(true)
        } else {
          setGameOver(true)
          setTimerActive(false)
        }
      }
    } catch (error) {
      console.error("Error getting next question:", error)
    }
  }

  const handleAnswer = async (playerName: string) => {
    if (!currentPair || !sessionId || loading) return

    setLoading(true)
    setTimerActive(false)

    try {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          club1: currentPair.club1,
          club2: currentPair.club2,
          userAnswer: playerName,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setFeedback({
          correct: data.isCorrect,
          playerName: data.isCorrect ? playerName : undefined,
          correctPlayers: data.correctPlayers || [],
        })

        if (data.isCorrect) {
          setScore((prev) => prev + 1)
        }
        setTotalAttempts((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNextQuestion = () => {
    getNextQuestion()
  }

  const handleSkipQuestion = () => {
    if (!currentPair || !sessionId) return
    handleAnswer("") // Submit empty answer (counts as wrong)
  }

  const endGame = async () => {
    if (!sessionId) return

    setTimerActive(false)

    try {
      await fetch("/api/quiz/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
      setGameOver(true)
    } catch (error) {
      console.error("Error ending game:", error)
    }
  }

  const getTimerColor = () => {
    if (timeLeft > 30) return "bg-green-500"
    if (timeLeft > 10) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreColor = () => {
    const percentage = totalAttempts > 0 ? (score / totalAttempts) * 100 : 0
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (gameOver) {
    const percentage = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0

    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Game Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 p-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{totalAttempts}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor()}`}>{percentage}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div className="space-y-2">
            {percentage >= 90 && (
              <div className="text-lg text-green-600 font-semibold">🏆 Outstanding! Football genius!</div>
            )}
            {percentage >= 70 && percentage < 90 && (
              <div className="text-lg text-blue-600 font-semibold">⭐ Great job! You know your football!</div>
            )}
            {percentage >= 50 && percentage < 70 && (
              <div className="text-lg text-yellow-600 font-semibold">👍 Good effort! Keep practicing!</div>
            )}
            {percentage < 50 && (
              <div className="text-lg text-gray-600 font-semibold">📚 Room for improvement! Try again!</div>
            )}
          </div>

          <Button onClick={startNewGame} size="lg" className="w-full" disabled={gameStarting}>
            <Zap className="w-4 h-4 mr-2" />
            {gameStarting ? "Starting..." : "Play Again"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!currentPair || loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle className="text-2xl font-bold text-gray-800">⚽ Football Club Combo</CardTitle>
          <p className="text-gray-600 mt-2">Test your football knowledge!</p>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="space-y-4">
            {loading || gameStarting ? (
              <>
                <div className="text-6xl animate-spin">⚽</div>
                <p className="text-lg text-gray-600">Loading game...</p>
              </>
            ) : (
              <>
                <div className="text-6xl">🏆</div>
                <p className="text-lg text-gray-600 mb-6">
                  Name players who have played for both clubs. You have 60 seconds per question!
                </p>
                <Button onClick={startNewGame} size="lg" className="px-8" disabled={gameStarting}>
                  <Target className="w-4 h-4 mr-2" />
                  {gameStarting ? "Starting..." : "Start New Game"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className={`font-bold ${getScoreColor()}`}>
                {score} / {totalAttempts}
              </span>
            </div>
            {totalAttempts > 0 && (
              <div className="text-sm text-gray-600">({Math.round((score / totalAttempts) * 100)}%)</div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-600" : "text-gray-700"}`}>{timeLeft}s</span>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${getTimerColor()}`}
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>

        <CardTitle className="text-center text-xl">
          Name a player who has played for <span className="text-blue-600">both clubs</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Club Display */}
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <ClubBadge clubName={currentPair.club1} size="lg" />
            <p className="mt-3 font-semibold text-lg">{currentPair.club1}</p>
          </div>

          <div className="text-3xl font-bold text-gray-400">VS</div>

          <div className="text-center">
            <ClubBadge clubName={currentPair.club2} size="lg" />
            <p className="mt-3 font-semibold text-lg">{currentPair.club2}</p>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback ? (
          <div className="space-y-4">
            <div
              className={`text-center p-6 rounded-lg border-2 ${
                feedback.correct
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {feedback.correct ? (
                <div>
                  <div className="text-2xl font-bold mb-2">Correct! ✅</div>
                  <div className="text-lg">{feedback.playerName} is a valid answer!</div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold mb-2">Incorrect ❌</div>
                  <div className="text-lg">Better luck with the next question!</div>
                </div>
              )}
            </div>

            {/* Show correct answers option */}
            {!feedback.correct && feedback.correctPlayers && feedback.correctPlayers.length > 0 && (
              <div className="text-center">
                <Button onClick={() => setShowCorrectAnswers(!showCorrectAnswers)} variant="outline" size="sm">
                  {showCorrectAnswers ? "Hide" : "Show"} Correct Answers
                </Button>

                {showCorrectAnswers && (
                  <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-semibold text-blue-800 mb-2">Correct answers:</div>
                    <div className="text-sm text-blue-700">{feedback.correctPlayers.join(", ")}</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button onClick={handleNextQuestion} className="px-6">
                <SkipForward className="w-4 h-4 mr-2" />
                Next Question
              </Button>
              <Button onClick={endGame} variant="outline">
                <Square className="w-4 h-4 mr-2" />
                End Game
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Player Search */}
            <PlayerSearch onPlayerSelect={handleAnswer} disabled={loading || !timerActive} />

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button onClick={handleSkipQuestion} variant="outline" disabled={loading || !timerActive}>
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Question
              </Button>
              <Button onClick={endGame} variant="outline">
                <Square className="w-4 h-4 mr-2" />
                End Game
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
