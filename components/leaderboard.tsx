"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, RefreshCw } from "lucide-react"

interface LeaderboardEntry {
  id: string
  username: string
  is_guest: boolean
  total_correct: number
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

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      console.log("Fetching leaderboard from API...")
      const response = await fetch("/api/leaderboard")
      const data = await response.json()
      console.log("Leaderboard API response:", data)
      setLeaderboard(data.leaderboard || [])
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</div>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
      case 3:
        return "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
            <div>Loading leaderboard...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <CardTitle className="text-xl">Leaderboard</CardTitle>
          </div>
          <Button onClick={fetchLeaderboard} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-12 space-y-4">
            <div className="text-6xl">🏆</div>
            <div className="text-lg font-semibold">No scores yet!</div>
            <div className="text-sm">Be the first to play and claim the top spot!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${getRankBg(entry.rank)}`}
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(entry.rank)}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{entry.username}</span>
                      {entry.is_guest && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Guest</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.total_sessions} game{entry.total_sessions !== 1 ? "s" : ""} played
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-2xl text-blue-600">{entry.total_correct}</div>
                  <div className="text-sm text-gray-600">{entry.average_percentage}% avg</div>
                  <div className="text-xs text-gray-500">Best: {entry.best_score}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
