import { neon } from "@neondatabase/serverless"

// Only initialize if DATABASE_URL exists
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export interface User {
  id: string
  username: string
  email?: string
  password_hash?: string
  is_guest: boolean
  created_at: string
}

export interface Player {
  id: number
  name: string
  clubs: string[]
  nationality?: string
  position?: string
}

export interface ClubPair {
  id: number
  club1: string
  club2: string
}

export interface QuizSession {
  id: string
  user_id?: string
  username?: string
  correct_answers: number
  total_attempts: number
  is_active: boolean
  started_at: string
  ended_at?: string
  used_questions: number[]
}

// Simple player database for testing
export const PLAYERS: Player[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    clubs: ["Manchester United", "Real Madrid", "Juventus"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 2,
    name: "David Beckham",
    clubs: ["Manchester United", "Real Madrid", "AC Milan", "Paris Saint-Germain"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 3,
    name: "Thierry Henry",
    clubs: ["Arsenal", "Barcelona"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 4,
    name: "Cesc Fabregas",
    clubs: ["Arsenal", "Barcelona", "Chelsea"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 5,
    name: "Fernando Torres",
    clubs: ["Liverpool", "Chelsea", "Atletico Madrid"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 6,
    name: "Zlatan Ibrahimovic",
    clubs: ["Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "Paris Saint-Germain", "Manchester United"],
    nationality: "Sweden",
    position: "Forward",
  },
  {
    id: 7,
    name: "Andrea Pirlo",
    clubs: ["Inter Milan", "AC Milan", "Juventus"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 8,
    name: "Ronaldinho",
    clubs: ["Paris Saint-Germain", "Barcelona", "AC Milan"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 9,
    name: "Kaka",
    clubs: ["AC Milan", "Real Madrid"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 10,
    name: "Luis Figo",
    clubs: ["Barcelona", "Real Madrid"],
    nationality: "Portugal",
    position: "Winger",
  },
]

// Simple club pairs for testing
export const CLUB_PAIRS: ClubPair[] = [
  { id: 1, club1: "Manchester United", club2: "Real Madrid" },
  { id: 2, club1: "Arsenal", club2: "Barcelona" },
  { id: 3, club1: "Liverpool", club2: "Chelsea" },
  { id: 4, club1: "AC Milan", club2: "Juventus" },
  { id: 5, club1: "Barcelona", club2: "Paris Saint-Germain" },
  { id: 6, club1: "Manchester United", club2: "Juventus" },
  { id: 7, club1: "Real Madrid", club2: "AC Milan" },
  { id: 8, club1: "Arsenal", club2: "Chelsea" },
  { id: 9, club1: "Inter Milan", club2: "AC Milan" },
  { id: 10, club1: "Barcelona", club2: "Real Madrid" },
]

// Fallback storage for when database is not available
const fallbackUsers = new Map<string, User>()
const fallbackSessions = new Map<string, QuizSession>()

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateGuestUsername(): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000)
  return `Guest${randomNumber}`
}

export function searchPlayers(query: string): Player[] {
  if (!query || query.length < 2) return []

  return PLAYERS.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase())
      const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase())
      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10)
}

export function getPlayersForClubs(club1: string, club2: string): Player[] {
  return PLAYERS.filter((player) => player.clubs.includes(club1) && player.clubs.includes(club2))
}

export async function getRandomClubPair(excludeIds: number[] = []): Promise<ClubPair | null> {
  const availablePairs = CLUB_PAIRS.filter((pair) => !excludeIds.includes(pair.id))

  if (availablePairs.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * availablePairs.length)
  return availablePairs[randomIndex]
}

// Database initialization
export async function initializeDatabase() {
  if (!sql) {
    console.warn("No DATABASE_URL found, using fallback mode")
    return false
  }

  try {
    // Test connection first
    await sql`SELECT 1`

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255),
        password_hash VARCHAR(255),
        is_guest BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255),
        username VARCHAR(255),
        correct_answers INTEGER DEFAULT 0,
        total_attempts INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        used_questions INTEGER[] DEFAULT '{}',
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP
      )
    `

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Database initialization error:", error)
    console.log("Falling back to memory storage")
    return false
  }
}

// User management
export async function createGuestUser(): Promise<User> {
  const user: User = {
    id: generateId(),
    username: generateGuestUsername(),
    is_guest: true,
    created_at: new Date().toISOString(),
  }

  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      await sql`
        INSERT INTO users (id, username, is_guest)
        VALUES (${user.id}, ${user.username}, ${user.is_guest})
      `
      console.log("Guest user created in database:", user.username)
    } catch (error) {
      console.error("Error creating guest user in database:", error)
    }
  }

  // Always store in fallback
  fallbackUsers.set(user.id, user)
  console.log("Guest user created in fallback storage:", user.username)
  return user
}

export async function createUser(username: string, email?: string, passwordHash?: string): Promise<User | null> {
  const dbInitialized = await initializeDatabase()

  // Check if user exists in fallback first
  for (const [, user] of fallbackUsers) {
    if (user.username === username) {
      return null
    }
  }

  const user: User = {
    id: generateId(),
    username,
    email,
    password_hash: passwordHash,
    is_guest: false,
    created_at: new Date().toISOString(),
  }

  if (dbInitialized && sql) {
    try {
      const existingUser = await sql`SELECT id FROM users WHERE username = ${username}`
      if (existingUser.length > 0) {
        return null
      }

      await sql`
        INSERT INTO users (id, username, email, password_hash, is_guest)
        VALUES (${user.id}, ${username}, ${email || null}, ${passwordHash || null}, false)
      `

      console.log("User created in database:", username)
    } catch (error) {
      console.error("Error creating user in database:", error)
      // Continue to fallback storage
    }
  }

  // Always store in fallback for reliability
  fallbackUsers.set(user.id, user)
  console.log("User created in fallback storage:", username)
  return user
}

export async function findUserByUsername(username: string): Promise<User | null> {
  if (sql) {
    try {
      const result = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`
      if (result.length > 0) {
        return result[0] as User
      }
    } catch (error) {
      console.error("Error finding user in database:", error)
    }
  }

  // Fallback to memory storage
  for (const [, user] of fallbackUsers) {
    if (user.username === username) {
      return user
    }
  }
  return null
}

export async function findUserById(id: string): Promise<User | null> {
  if (sql) {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`
      if (result.length > 0) {
        return result[0] as User
      }
    } catch (error) {
      console.error("Error finding user by id in database:", error)
    }
  }

  return fallbackUsers.get(id) || null
}

// Quiz session management
export async function createQuizSession(userId?: string, username?: string): Promise<string> {
  const session: QuizSession = {
    id: generateId(),
    user_id: userId,
    username,
    correct_answers: 0,
    total_attempts: 0,
    is_active: true,
    started_at: new Date().toISOString(),
    used_questions: [],
  }

  if (sql) {
    try {
      await sql`
        INSERT INTO quiz_sessions (id, user_id, username, correct_answers, total_attempts, is_active, used_questions, started_at)
        VALUES (${session.id}, ${userId || null}, ${username || null}, 0, 0, true, '{}', CURRENT_TIMESTAMP)
      `
    } catch (error) {
      console.error("Error creating quiz session in database:", error)
    }
  }

  fallbackSessions.set(session.id, session)
  return session.id
}

export async function getQuizSession(sessionId: string): Promise<QuizSession | null> {
  if (sql) {
    try {
      const result = await sql`SELECT * FROM quiz_sessions WHERE id = ${sessionId}`
      if (result.length > 0) {
        return {
          id: result[0].id,
          user_id: result[0].user_id,
          username: result[0].username,
          correct_answers: result[0].correct_answers,
          total_attempts: result[0].total_attempts,
          is_active: result[0].is_active,
          started_at: result[0].started_at,
          ended_at: result[0].ended_at,
          used_questions: result[0].used_questions || [],
        }
      }
    } catch (error) {
      console.error("Error getting quiz session from database:", error)
    }
  }

  return fallbackSessions.get(sessionId) || null
}

export async function updateQuizSession(sessionId: string, updates: Partial<QuizSession>): Promise<void> {
  if (sql) {
    try {
      const setClause = []
      const values = []

      if (updates.correct_answers !== undefined) {
        setClause.push(`correct_answers = $${values.length + 1}`)
        values.push(updates.correct_answers)
      }
      if (updates.total_attempts !== undefined) {
        setClause.push(`total_attempts = $${values.length + 1}`)
        values.push(updates.total_attempts)
      }
      if (updates.is_active !== undefined) {
        setClause.push(`is_active = $${values.length + 1}`)
        values.push(updates.is_active)
      }
      if (updates.ended_at !== undefined) {
        setClause.push(`ended_at = $${values.length + 1}`)
        values.push(updates.ended_at)
      }
      if (updates.used_questions !== undefined) {
        setClause.push(`used_questions = $${values.length + 1}`)
        values.push(updates.used_questions)
      }

      if (setClause.length > 0) {
        values.push(sessionId)
        const query = `UPDATE quiz_sessions SET ${setClause.join(", ")} WHERE id = $${values.length}`
        await sql.unsafe(query, values)
      }
    } catch (error) {
      console.error("Error updating quiz session in database:", error)
    }
  }

  // Update fallback storage
  const session = fallbackSessions.get(sessionId)
  if (session) {
    Object.assign(session, updates)
    fallbackSessions.set(sessionId, session)
  }
}

// Leaderboard
export async function getLeaderboard(limit = 50): Promise<any[]> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const result = await sql`
        SELECT 
          u.id,
          u.username,
          u.is_guest,
          COALESCE(SUM(qs.correct_answers), 0) as total_correct,
          COALESCE(SUM(qs.total_attempts), 0) as total_attempts,
          COALESCE(MAX(qs.correct_answers), 0) as best_score,
          COALESCE(COUNT(CASE WHEN qs.ended_at IS NOT NULL THEN 1 END), 0) as total_sessions,
          COALESCE(MAX(qs.ended_at), u.created_at) as last_played,
          CASE 
            WHEN SUM(qs.total_attempts) > 0 
            THEN ROUND((SUM(qs.correct_answers)::DECIMAL / SUM(qs.total_attempts) * 100), 1)
            ELSE 0 
          END as average_percentage
        FROM users u
        LEFT JOIN quiz_sessions qs ON u.id = qs.user_id AND qs.ended_at IS NOT NULL
        GROUP BY u.id, u.username, u.is_guest, u.created_at
        HAVING COALESCE(SUM(qs.correct_answers), 0) > 0
        ORDER BY total_correct DESC, average_percentage DESC, last_played DESC
        LIMIT ${limit}
      `

      if (result.length > 0) {
        return result.map((row, index) => ({
          id: row.id,
          username: row.username,
          is_guest: row.is_guest,
          correct_answers: Number.parseInt(row.total_correct),
          total_attempts: Number.parseInt(row.total_attempts),
          average_percentage: Number.parseFloat(row.average_percentage),
          best_score: Number.parseInt(row.best_score),
          total_sessions: Number.parseInt(row.total_sessions),
          last_played: row.last_played,
          rank: index + 1,
        }))
      }
    } catch (error) {
      console.error("Error getting leaderboard from database:", error)
    }
  }

  // Always use fallback storage
  console.log("Using fallback storage for leaderboard")
  const userStats = new Map<string, any>()

  // Process all completed sessions
  for (const [, session] of fallbackSessions) {
    if (!session.user_id || !session.ended_at) continue

    const user = fallbackUsers.get(session.user_id)
    if (!user) continue

    const existing = userStats.get(session.user_id) || {
      id: user.id,
      username: user.username,
      is_guest: user.is_guest,
      total_correct: 0,
      total_attempts: 0,
      best_score: 0,
      total_sessions: 0,
      last_played: user.created_at,
    }

    existing.total_correct += session.correct_answers
    existing.total_attempts += session.total_attempts
    existing.best_score = Math.max(existing.best_score, session.correct_answers)
    existing.total_sessions += 1
    existing.last_played = session.ended_at || existing.last_played

    userStats.set(session.user_id, existing)
  }

  const leaderboardData = Array.from(userStats.values())
    .filter((stats) => stats.total_correct > 0)
    .map((stats) => ({
      ...stats,
      average_percentage: stats.total_attempts > 0 ? Math.round((stats.total_correct / stats.total_attempts) * 100) : 0,
    }))
    .sort((a, b) => {
      if (a.total_correct !== b.total_correct) return b.total_correct - a.total_correct
      if (a.average_percentage !== b.average_percentage) return b.average_percentage - a.average_percentage
      return new Date(b.last_played).getTime() - new Date(a.last_played).getTime()
    })
    .slice(0, limit)
    .map((stats, index) => ({ ...stats, rank: index + 1 }))

  console.log("Fallback leaderboard data:", leaderboardData)
  return leaderboardData
}
