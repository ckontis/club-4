import { NextResponse } from "next/server"
import { getLeaderboard, addTestLeaderboardData } from "@/lib/database"

export async function GET(request: Request) {
  try {
    console.log("=== LEADERBOARD API CALLED ===")

    // Check if we should add test data (for debugging)
    const { searchParams } = new URL(request.url)
    if (searchParams.get("test") === "true") {
      addTestLeaderboardData()
    }

    const leaderboard = await getLeaderboard(50)

    console.log("Returning leaderboard with", leaderboard.length, "entries")

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json(
      {
        error: "Failed to get leaderboard",
        leaderboard: [], // Return empty array as fallback
      },
      { status: 200 },
    )
  }
}
