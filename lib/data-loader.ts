import playersData from "@/data/players.json"
import clubPairsData from "@/data/club-pairs.json"

export const PLAYERS = playersData
export const CLUB_PAIRS = clubPairsData

// Function to reload data without restart
export async function reloadData() {
  // In production, you'd re-read the files
  // For now, this would require a restart
}
