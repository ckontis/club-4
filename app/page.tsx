"use client"

import { useState, useEffect } from "react"
import { QuizGame } from "@/components/quiz-game"
import { Leaderboard } from "@/components/leaderboard"
import { AuthForm } from "@/components/auth-form"
import { Button } from "@/components/ui/button"
import { LogOut, Trophy } from "lucide-react"

interface AppUser {
  id: string
  username: string
}

export default function Home() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleAuthSuccess = (userData: AppUser) => {
    setUser(userData)
    setShowAuth(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">⚽</div>
          <div className="text-xl font-semibold text-gray-700">Loading Football Quiz...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Football Club Combo
            </h1>
          </div>

          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Test your football knowledge! Name players who have played for both clubs and climb the leaderboard.
          </p>

          {/* User Status */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {user ? (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">Welcome, {user.username}!</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="rounded-full bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
                <span className="text-gray-500 flex items-center gap-2">
                  or
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    play as guest
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Auth Form */}
        {showAuth && !user && (
          <div className="mb-12">
            <div className="max-w-md mx-auto">
              <AuthForm onAuthSuccess={handleAuthSuccess} />
              <div className="text-center mt-6">
                <Button onClick={() => setShowAuth(false)} variant="ghost" className="rounded-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!showAuth && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quiz Game */}
            <div className="lg:col-span-2">
              <QuizGame user={user} />
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <Leaderboard />
            </div>
          </div>
        )}

        

          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Challenge yourself with football transfer knowledge! Name players who have played for both clubs, compete
            with others, and see how you rank among football quiz champions.
          </p>

         
        </div>
      </div>
    </div>
  )
}
