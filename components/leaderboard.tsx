"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, RefreshCw, User, Users, Crown, Star, Zap } from "lucide-react"

interface LeaderboardEntry {
  id: string
  username: string
  is_guest: boolean
  total_correct: number
  correct_answers: number // Alternative field name
  total_attempts: number
  average_percentage: number
  best_score: number
  total_sessions: number
  rank: number
  last_played: string
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Fetching leaderboard from API...")
      const response = await fetch("/api/leaderboard")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      console.log("Leaderboard API response:", data)

      if (data.success === false) {
        throw new Error(data.error || "Failed to fetch leaderboard")
      }

      // Normalize the data to handle both field names
      const normalizedData = (data.leaderboard || []).map((entry: any) => ({
        ...entry,
        total_correct: entry.total_correct || entry.correct_answers || 0,
      }))

      setLeaderboard(normalizedData)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
      setError(error instanceof Error ? error.message : "Failed to load leaderboard")
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-7 h-7 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return (
          <div className="w-7 h-7 flex items-center justify-center text-sm font-bold text-gray-500 bg-gray-100 rounded-full">
            {rank}
          </div>
        )
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-300 shadow-lg"
      case 2:
        return "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-gray-300 shadow-md"
      case 3:
        return "bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 border-orange-300 shadow-md"
      default:
        return "bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:shadow-md"
    }
  }

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) {
      return (
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          Legend
        </span>
      )
    }
    if (percentage >= 80) {
      return (
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Expert
        </span>
      )
    }
    if (percentage >= 70) {
      return (
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          Pro
        </span>
      )
    }
    if (percentage >= 60) {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Good</span>
    }
    return null
  }

  if (loading) {
    return (
      <Card className="shadow-xl border-0 h-fit">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <RefreshCw className="w-10 h-10 animate-spin mx-auto text-blue-500" />
            <div className="text-lg font-medium text-gray-600">Loading leaderboard...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-xl border-0 h-fit">
        <CardHeader className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white">
          <CardTitle className="text-2xl font-bold">Leaderboard Error</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="text-red-600 text-lg">Failed to load leaderboard</div>
            <div className="text-sm text-gray-600">{error}</div>
            <Button onClick={fetchLeaderboard} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-xl border-0 overflow-hidden h-fit">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
              <p className="text-blue-100 text-sm">Top football quiz champions</p>
            </div>
          </div>
          <Button
            onClick={fetchLeaderboard}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-16 px-8 space-y-6">
            <div className="text-8xl">🏆</div>
            <div>
              <div className="text-2xl font-bold text-gray-700 mb-2">No champions yet!</div>
              <div className="text-lg text-gray-600 mb-4">Be the first to claim the throne</div>
              <div className="text-sm text-gray-500 max-w-md mx-auto">
                Complete a football quiz to see your name on the leaderboard. Both registered users and guests can
                compete for the top spot!
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 lg:p-6 transition-all duration-200 ${getRankBg(entry.rank)} ${
                  index === 0 ? "border-t-4 border-yellow-400" : ""
                }`}
              >
                <div className="flex items-center gap-3 lg:gap-5 min-w-0 flex-1">
                  <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2 flex-wrap">
                      <span
                        className={`font-bold text-lg lg:text-xl truncate ${entry.rank <= 3 ? "text-gray-800" : "text-gray-700"}`}
                      >
                        {entry.username}
                      </span>

                      <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
                        {entry.is_guest ? (
                          <span className="px-2 lg:px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center gap-1 font-medium">
                            <User className="w-3 h-3" />
                            Guest
                          </span>
                        ) : (
                          <span className="px-2 lg:px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1 font-medium">
                            <Users className="w-3 h-3" />
                            Member
                          </span>
                        )}

                        {getPerformanceBadge(entry.average_percentage)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {entry.total_sessions} game{entry.total_sessions !== 1 ? "s" : ""}
                      </span>
                      <span className="hidden lg:inline">•</span>
                      <span>Best: {entry.best_score}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-2">
                  <div
                    className={`font-bold text-2xl lg:text-3xl ${
                      entry.rank === 1
                        ? "text-yellow-600"
                        : entry.rank === 2
                          ? "text-gray-500"
                          : entry.rank === 3
                            ? "text-orange-500"
                            : "text-blue-600"
                    }`}
                  >
                    {entry.total_correct}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">{entry.average_percentage}%</div>
                  <div className="text-xs text-gray-500 mt-1 hidden lg:block">{entry.total_attempts} total</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="bg-gray-50 px-4 lg:px-6 py-4 text-center">
            <p className="text-xs lg:text-sm text-gray-600">
              🎯 Showing top {leaderboard.length} players • Play more games to climb the ranks!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
