"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"

interface Player {
  id: number
  name: string
  nationality?: string
  position?: string
}

interface PlayerSearchProps {
  onPlayerSelect: (playerName: string) => void
  disabled?: boolean
}

export function PlayerSearch({ onPlayerSelect, disabled = false }: PlayerSearchProps) {
  const [query, setQuery] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when component becomes enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  useEffect(() => {
    if (query.length < 3) {
      setPlayers([])
      setShowSuggestions(false)
      return
    }

    const searchPlayers = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/players/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setPlayers(data.players || [])
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error("Error searching players:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPlayers, 200)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, players.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && players[selectedIndex]) {
        handlePlayerSelect(players[selectedIndex].name)
      } else if (query.trim()) {
        handlePlayerSelect(query.trim())
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handlePlayerSelect = (playerName: string) => {
    onPlayerSelect(playerName)
    setQuery("")
    setPlayers([])
    setSelectedIndex(-1)
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handlePlayerSelect(query.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (query.length >= 3 && players.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 150)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type player name (min 3 letters)..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={disabled}
              className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && players.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 mt-2 overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                {players.map((player, index) => (
                  <button
                    key={player.id}
                    type="button"
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${
                      index === selectedIndex ? "bg-blue-100 border-blue-200" : ""
                    }`}
                    onClick={() => handlePlayerSelect(player.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-800 truncate">{player.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer hint */}
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                Use ↑↓ arrows to navigate, Enter to select
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {loading && query.length >= 3 && (
            <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 mt-2 p-4 text-center text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Searching players...</span>
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && query.length >= 3 && players.length === 0 && showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 mt-2 p-4 text-center text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                <span>No players found for "{query}"</span>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={disabled || !query.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Submit
        </Button>
      </form>

      {/* Input hint */}
      {query.length > 0 && query.length < 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 text-xs text-gray-400 text-center">
          Type at least 3 letters to see suggestions
        </div>
      )}
    </div>
  )
}
