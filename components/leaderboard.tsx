"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LeaderboardEntry {
  id: string
  username: string
  is_guest: boolean
  correct_answers: number
  total_attempts: number
  average_percentage: number
  best_score: number
  total_sessions: number
  rank: number
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading leaderboard...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No scores yet. Be the first to play!</div>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.rank <= 3 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1
                        ? "bg-yellow-500 text-white"
                        : entry.rank === 2
                          ? "bg-gray-400 text-white"
                          : entry.rank === 3
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {entry.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{entry.username}</span>
                      {entry.is_guest && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Guest</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.total_sessions} session{entry.total_sessions !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg">{entry.correct_answers}</div>
                  <div className="text-sm text-gray-600">{entry.average_percentage}% avg</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
