"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

  useEffect(() => {
    if (query.length < 2) {
      setPlayers([])
      return
    }

    const searchPlayers = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/players/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setPlayers(data.players || [])
        }
      } catch (error) {
        console.error("Error searching players:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPlayers, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    }
  }

  const handlePlayerSelect = (playerName: string) => {
    onPlayerSelect(playerName)
    setQuery("")
    setPlayers([])
    setSelectedIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handlePlayerSelect(query.trim())
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter player name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full"
          />

          {players.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {players.map((player, index) => (
                <button
                  key={player.id}
                  type="button"
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handlePlayerSelect(player.name)}
                >
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm text-gray-500">
                    {player.nationality && <span className="mr-2">🏳️ {player.nationality}</span>}
                    {player.position && <span>{player.position}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" disabled={disabled || !query.trim()}>
          Submit
        </Button>
      </form>

      {loading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
    </div>
  )
}
