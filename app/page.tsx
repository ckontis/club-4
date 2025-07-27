"use client"

import { useState, useEffect } from "react"
import { QuizGame } from "@/components/quiz-game"
import { Leaderboard } from "@/components/leaderboard"
import { AuthForm } from "@/components/auth-form"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  username: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
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

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    setShowAuth(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚽ Football Club Combo</h1>
          <p className="text-gray-600 mb-4">
            Test your football knowledge! Name players who have played for both clubs.
          </p>

          <div className="flex justify-center gap-4 mb-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, <strong>{user.username}</strong>!
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setShowAuth(true)} variant="outline" size="sm">
                  Login / Sign Up
                </Button>
                <span className="text-sm text-gray-500 flex items-center">or play as guest</span>
              </div>
            )}
          </div>
        </div>

        {/* Auth Form */}
        {showAuth && !user && (
          <div className="mb-8">
            <AuthForm onAuthSuccess={handleAuthSuccess} />
            <div className="text-center mt-4">
              <Button onClick={() => setShowAuth(false)} variant="ghost" size="sm">
                Cancel
              </Button>
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

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Test your knowledge of football transfers and player careers!</p>
          <p className="mt-2">🎯 Simple dataset for testing • 🏆 Compete on the leaderboard • ⚡ Real-time scoring</p>
        </div>
      </div>
    </div>
  )
}
