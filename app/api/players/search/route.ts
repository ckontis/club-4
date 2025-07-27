import { NextResponse } from "next/server"
import { searchPlayers } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const players = searchPlayers(query)

    // Return players with only name and id (no nationality or position)
    const cleanPlayers = players.map((player) => ({
      id: player.id,
      name: player.name,
    }))

    return NextResponse.json({ players: cleanPlayers })
  } catch (error) {
    console.error("Player search error:", error)
    return NextResponse.json({ error: "Failed to search players" }, { status: 500 })
  }
}
