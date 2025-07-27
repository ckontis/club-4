"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Settings } from "lucide-react"

interface Player {
  id: number
  name: string
  clubs: string[]
  nationality: string
  position: string
}

interface ClubPair {
  id: number
  club1: string
  club2: string
}

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"players" | "clubs">("players")
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    clubs: "",
    nationality: "",
    position: "",
  })
  const [newClubPair, setNewClubPair] = useState({
    club1: "",
    club2: "",
  })

  const handleAddPlayer = async () => {
    if (!newPlayer.name || !newPlayer.clubs) return

    const playerData = {
      name: newPlayer.name,
      clubs: newPlayer.clubs.split(",").map((club) => club.trim()),
      nationality: newPlayer.nationality,
      position: newPlayer.position,
    }

    try {
      const response = await fetch("/api/admin/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData),
      })

      if (response.ok) {
        alert("Player added successfully!")
        setNewPlayer({ name: "", clubs: "", nationality: "", position: "" })
      }
    } catch (error) {
      alert("Error adding player")
    }
  }

  const handleAddClubPair = async () => {
    if (!newClubPair.club1 || !newClubPair.club2) return

    try {
      const response = await fetch("/api/admin/club-pairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClubPair),
      })

      if (response.ok) {
        alert("Club pair added successfully!")
        setNewClubPair({ club1: "", club2: "" })
      }
    } catch (error) {
      alert("Error adding club pair")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Panel - Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button onClick={() => setActiveTab("players")} variant={activeTab === "players" ? "default" : "outline"}>
              Manage Players
            </Button>
            <Button onClick={() => setActiveTab("clubs")} variant={activeTab === "clubs" ? "default" : "outline"}>
              Manage Club Pairs
            </Button>
          </div>

          {activeTab === "players" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add New Player</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Player Name"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                />
                <Input
                  placeholder="Clubs (comma separated)"
                  value={newPlayer.clubs}
                  onChange={(e) => setNewPlayer({ ...newPlayer, clubs: e.target.value })}
                />
                <Input
                  placeholder="Nationality"
                  value={newPlayer.nationality}
                  onChange={(e) => setNewPlayer({ ...newPlayer, nationality: e.target.value })}
                />
                <Input
                  placeholder="Position"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                />
              </div>
              <Button onClick={handleAddPlayer} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            </div>
          )}

          {activeTab === "clubs" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add New Club Pair</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="First Club"
                  value={newClubPair.club1}
                  onChange={(e) => setNewClubPair({ ...newClubPair, club1: e.target.value })}
                />
                <Input
                  placeholder="Second Club"
                  value={newClubPair.club2}
                  onChange={(e) => setNewClubPair({ ...newClubPair, club2: e.target.value })}
                />
              </div>
              <Button onClick={handleAddClubPair} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Club Pair
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>
            • <strong>Players:</strong> Enter clubs exactly as they appear in existing data
          </p>
          <p>
            • <strong>Club Pairs:</strong> Only add pairs where players actually exist for both clubs
          </p>
          <p>
            • <strong>Format:</strong> Use exact club names like "Manchester United", "Real Madrid"
          </p>
          <p>
            • <strong>Validation:</strong> The system will check if valid players exist for club pairs
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
