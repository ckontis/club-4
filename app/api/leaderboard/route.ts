import { NextResponse } from "next/server"
import { getLeaderboard, addTestLeaderboardData } from "@/lib/database"

export async function GET(request: Request) {
  try {
    console.log("=== LEADERBOARD API CALLED ===")

    // Check if we should add test data (for debugging)
    const { searchParams } = new URL(request.url)
    if (searchParams.get("test") === "true") {
      console.log("Test mode enabled - adding test data")
      await addTestLeaderboardData()
    }

    const leaderboard = await getLeaderboard(50)

    console.log("Returning leaderboard with", leaderboard.length, "entries")

    // Always return valid JSON, even if empty
    return NextResponse.json({
      success: true,
      leaderboard: leaderboard || [],
    })
  } catch (error) {
    console.error("Leaderboard error:", error)

    // Always return valid JSON on error
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get leaderboard",
        leaderboard: [], // Return empty array as fallback
      },
      { status: 200 }, // Return 200 to avoid JSON parsing issues
    )
  }
}
