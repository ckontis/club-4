import { NextResponse } from "next/server"
import { searchPlayers } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const players = searchPlayers(query)

    // Return players without club information (hide clubs during search)
    const playersWithoutClubs = players.map((player) => ({
      id: player.id,
      name: player.name,
      nationality: player.nationality,
      position: player.position,
    }))

    return NextResponse.json({ players: playersWithoutClubs })
  } catch (error) {
    console.error("Player search error:", error)
    return NextResponse.json({ error: "Failed to search players" }, { status: 500 })
  }
}
