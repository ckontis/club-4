import { NextResponse } from "next/server"
import { getLeaderboard } from "@/lib/database"

export async function GET() {
  try {
    console.log("Fetching leaderboard...")

    const leaderboard = await getLeaderboard(50)

    console.log("Leaderboard fetched:", leaderboard.length, "entries")

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json(
      {
        error: "Failed to get leaderboard",
        leaderboard: [], // Return empty array as fallback
      },
      { status: 200 },
    ) // Return 200 with empty data instead of 500
  }
}
