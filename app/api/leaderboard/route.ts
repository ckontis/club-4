import { NextResponse } from "next/server"
import { getLeaderboard, initializeDatabase } from "@/lib/database"

export async function GET() {
  try {
    await initializeDatabase()

    const leaderboard = await getLeaderboard(50)

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json({ error: "Failed to get leaderboard" }, { status: 500 })
  }
}
