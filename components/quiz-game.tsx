"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClubBadge } from "@/components/club-badge"
import { PlayerSearch } from "@/components/player-search"

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
  const [feedback, setFeedback] = useState<{ correct: boolean; playerName?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)

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
    try {
      const response = await fetch("/api/quiz/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, username: user?.username }),
      })

      if (response.ok) {
        const data = await response.json()
        setSessionId(data.sessionId)
        setScore(0)
        setTotalAttempts(0)
        setGameOver(false)
        setFeedback(null)
        await getNextQuestion()
      }
    } catch (error) {
      console.error("Error starting game:", error)
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
        setFeedback({ correct: data.isCorrect, playerName: data.isCorrect ? playerName : undefined })

        if (data.isCorrect) {
          setScore((prev) => prev + 1)
        }
        setTotalAttempts((prev) => prev + 1)

        // Show feedback for 2 seconds, then get next question
        setTimeout(() => {
          getNextQuestion()
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setLoading(false)
    }
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

  if (gameOver) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-2xl font-bold">
            Final Score: {score} / {totalAttempts}
          </div>
          {totalAttempts > 0 && (
            <div className="text-lg text-gray-600">Accuracy: {Math.round((score / totalAttempts) * 100)}%</div>
          )}
          <Button onClick={startNewGame} size="lg">
            Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!currentPair) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <Button onClick={startNewGame} size="lg">
            Start New Game
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Score: {score} / {totalAttempts}
          </div>
          <div className="text-sm text-gray-600">Time: {timeLeft}s</div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>

        <CardTitle className="text-center">Name a player who has played for both clubs</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <ClubBadge clubName={currentPair.club1} size="lg" />
            <p className="mt-2 font-semibold">{currentPair.club1}</p>
          </div>

          <div className="text-2xl font-bold text-gray-400">VS</div>

          <div className="text-center">
            <ClubBadge clubName={currentPair.club2} size="lg" />
            <p className="mt-2 font-semibold">{currentPair.club2}</p>
          </div>
        </div>

        {feedback ? (
          <div
            className={`text-center p-4 rounded-lg ${
              feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {feedback.correct ? (
              <div>
                <div className="text-lg font-semibold">Correct! ✅</div>
                <div>{feedback.playerName} is a valid answer!</div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-semibold">Incorrect ❌</div>
                <div>Try again with the next question!</div>
              </div>
            )}
          </div>
        ) : (
          <PlayerSearch onPlayerSelect={handleAnswer} disabled={loading || !timerActive} />
        )}

        <div className="flex justify-center gap-4">
          <Button onClick={endGame} variant="outline">
            End Game
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
