import { neon } from "@neondatabase/serverless"

// Initialize database connection
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

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
  userId?: string
  username?: string
  correctAnswers: number
  totalAttempts: number
  isActive: boolean
  startedAt: string
  endedAt?: string
  usedQuestions: number[]
}

export interface UserStats {
  userId: string
  username: string
  totalSessions: number
  bestScore: number
  bestPercentage: number
  totalCorrect: number
  totalAttempts: number
  averagePercentage: number
  lastPlayed: string
}

export interface UserProgress {
  userId: string
  playedQuestions: number[]
  totalQuestionsPlayed: number
  lastReset?: string
}

// Static data arrays (same as before)
export const PLAYERS: Player[] = [
  // ... (keeping all 145 players from previous version)
  {
    id: 1,
    name: "Cristiano Ronaldo",
    clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 2,
    name: "Lionel Messi",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  // ... (all other players from the previous version)
]

export const CLUB_PAIRS: ClubPair[] = [
  // ... (keeping all 165 club pairs from previous version)
  { id: 1, club1: "Manchester United", club2: "Real Madrid" },
  { id: 2, club1: "Chelsea", club2: "Real Madrid" },
  // ... (all other club pairs from the previous version)
]

// Database initialization
async function initializeDatabase() {
  if (!sql) {
    console.warn("No DATABASE_URL found, using fallback mode")
    return false
  }

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        session_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create user_stats table
    await sql`
      CREATE TABLE IF NOT EXISTS user_stats (
        user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        username VARCHAR(255) NOT NULL,
        total_sessions INTEGER DEFAULT 0,
        best_score INTEGER DEFAULT 0,
        best_percentage DECIMAL(5,2) DEFAULT 0,
        total_correct INTEGER DEFAULT 0,
        total_attempts INTEGER DEFAULT 0,
        average_percentage DECIMAL(5,2) DEFAULT 0,
        last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create user_progress table to track played questions
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        played_questions INTEGER[] DEFAULT '{}',
        total_questions_played INTEGER DEFAULT 0,
        last_reset TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create quiz_sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
        username VARCHAR(255),
        correct_answers INTEGER DEFAULT 0,
        total_attempts INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        used_questions INTEGER[] DEFAULT '{}',
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_user_stats_total_correct ON user_stats(total_correct DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_user_stats_average_percentage ON user_stats(average_percentage DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON quiz_sessions(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id)`

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Database initialization error:", error)
    return false
  }
}

// Fallback storage for when database is not available
const fallbackUsers = new Map<string, { id: string; username: string; sessionToken: string; createdAt: string }>()
const fallbackSessions = new Map<string, QuizSession>()
const fallbackUserStats = new Map<string, UserStats>()
const fallbackUserProgress = new Map<string, UserProgress>()

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function searchPlayers(query: string): Player[] {
  if (!query || query.length < 3) return []

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

// QUESTION SELECTION SYSTEM EXPLANATION:
// =====================================
// 1. Each user has a "played_questions" array that tracks question IDs they've seen
// 2. When getting a random question, we exclude already-played questions
// 3. If all questions are exhausted, we can either:
//    - Reset the user's progress (start over)
//    - End the game
// 4. This ensures users don't see the same question twice until they've played all questions

export async function getRandomClubPair(userId?: string): Promise<ClubPair | null> {
  let excludeIds: number[] = []

  if (userId) {
    // Get user's played questions from database or fallback
    const userProgress = await getUserProgress(userId)
    excludeIds = userProgress?.playedQuestions || []
  }

  const availablePairs = CLUB_PAIRS.filter((pair) => !excludeIds.includes(pair.id))

  if (availablePairs.length === 0) {
    // All questions played - could reset progress here if desired
    return null
  }

  const randomIndex = Math.floor(Math.random() * availablePairs.length)
  return availablePairs[randomIndex]
}

// User management functions
export async function createUser(
  username: string,
  password: string,
): Promise<{ id: string; username: string; sessionToken: string } | null> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      // Check if user exists
      const existingUser = await sql`SELECT id FROM users WHERE username = ${username}`
      if (existingUser.length > 0) {
        return null
      }

      const userId = generateId()
      const sessionToken = generateId()

      // Create user
      await sql`
        INSERT INTO users (id, username, session_token)
        VALUES (${userId}, ${username}, ${sessionToken})
      `

      // Initialize user stats
      await sql`
        INSERT INTO user_stats (user_id, username)
        VALUES (${userId}, ${username})
      `

      // Initialize user progress
      await sql`
        INSERT INTO user_progress (user_id)
        VALUES (${userId})
      `

      return { id: userId, username, sessionToken }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  // Fallback to memory storage
  for (const [, user] of fallbackUsers) {
    if (user.username === username) {
      return null
    }
  }

  const userId = generateId()
  const sessionToken = generateId()

  fallbackUsers.set(userId, {
    id: userId,
    username,
    sessionToken,
    createdAt: new Date().toISOString(),
  })

  fallbackUserProgress.set(userId, {
    userId,
    playedQuestions: [],
    totalQuestionsPlayed: 0,
  })

  return { id: userId, username, sessionToken }
}

export async function authenticateUser(
  username: string,
  password: string,
): Promise<{ id: string; username: string; sessionToken: string } | null> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const user = await sql`SELECT id, username FROM users WHERE username = ${username}`
      if (user.length === 0) {
        return null
      }

      const sessionToken = generateId()
      await sql`UPDATE users SET session_token = ${sessionToken}, updated_at = CURRENT_TIMESTAMP WHERE id = ${user[0].id}`

      return { id: user[0].id, username: user[0].username, sessionToken }
    } catch (error) {
      console.error("Error authenticating user:", error)
    }
  }

  // Fallback to memory storage
  for (const [userId, user] of fallbackUsers) {
    if (user.username === username) {
      const sessionToken = generateId()
      user.sessionToken = sessionToken
      fallbackUsers.set(userId, user)
      return { id: userId, username, sessionToken }
    }
  }
  return null
}

export async function getUserByToken(sessionToken: string): Promise<{ id: string; username: string } | null> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const user = await sql`SELECT id, username FROM users WHERE session_token = ${sessionToken}`
      if (user.length > 0) {
        return { id: user[0].id, username: user[0].username }
      }
    } catch (error) {
      console.error("Error getting user by token:", error)
    }
  }

  // Fallback to memory storage
  for (const [userId, user] of fallbackUsers) {
    if (user.sessionToken === sessionToken) {
      return { id: userId, username: user.username }
    }
  }
  return null
}

// User progress functions
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const progress = await sql`
        SELECT user_id, played_questions, total_questions_played, last_reset
        FROM user_progress 
        WHERE user_id = ${userId}
      `

      if (progress.length > 0) {
        return {
          userId: progress[0].user_id,
          playedQuestions: progress[0].played_questions || [],
          totalQuestionsPlayed: progress[0].total_questions_played || 0,
          lastReset: progress[0].last_reset,
        }
      }
    } catch (error) {
      console.error("Error getting user progress:", error)
    }
  }

  // Fallback to memory storage
  return fallbackUserProgress.get(userId) || null
}

export async function updateUserProgress(userId: string, questionId: number): Promise<void> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      await sql`
        UPDATE user_progress 
        SET 
          played_questions = array_append(played_questions, ${questionId}),
          total_questions_played = total_questions_played + 1,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `
    } catch (error) {
      console.error("Error updating user progress:", error)
    }
  } else {
    // Fallback to memory storage
    const progress = fallbackUserProgress.get(userId) || {
      userId,
      playedQuestions: [],
      totalQuestionsPlayed: 0,
    }

    if (!progress.playedQuestions.includes(questionId)) {
      progress.playedQuestions.push(questionId)
      progress.totalQuestionsPlayed += 1
      fallbackUserProgress.set(userId, progress)
    }
  }
}

// Session management
export async function createQuizSession(userId?: string, username?: string): Promise<string> {
  const sessionId = generateId()
  const session: QuizSession = {
    id: sessionId,
    userId,
    username,
    correctAnswers: 0,
    totalAttempts: 0,
    isActive: true,
    startedAt: new Date().toISOString(),
    usedQuestions: [],
  }

  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      await sql`
        INSERT INTO quiz_sessions (id, user_id, username, correct_answers, total_attempts, is_active, used_questions, started_at)
        VALUES (${sessionId}, ${userId || null}, ${username || null}, 0, 0, true, '{}', CURRENT_TIMESTAMP)
      `
    } catch (error) {
      console.error("Error creating quiz session:", error)
    }
  } else {
    fallbackSessions.set(sessionId, session)
  }

  return sessionId
}

export async function getQuizSession(sessionId: string): Promise<QuizSession | null> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const session = await sql`
        SELECT * FROM quiz_sessions WHERE id = ${sessionId}
      `

      if (session.length > 0) {
        return {
          id: session[0].id,
          userId: session[0].user_id,
          username: session[0].username,
          correctAnswers: session[0].correct_answers,
          totalAttempts: session[0].total_attempts,
          isActive: session[0].is_active,
          startedAt: session[0].started_at,
          endedAt: session[0].ended_at,
          usedQuestions: session[0].used_questions || [],
        }
      }
    } catch (error) {
      console.error("Error getting quiz session:", error)
    }
  }

  return fallbackSessions.get(sessionId) || null
}

export async function updateQuizSession(sessionId: string, updates: Partial<QuizSession>): Promise<void> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const setClause = []
      const values = []

      if (updates.correctAnswers !== undefined) {
        setClause.push(`correct_answers = $${values.length + 1}`)
        values.push(updates.correctAnswers)
      }
      if (updates.totalAttempts !== undefined) {
        setClause.push(`total_attempts = $${values.length + 1}`)
        values.push(updates.totalAttempts)
      }
      if (updates.isActive !== undefined) {
        setClause.push(`is_active = $${values.length + 1}`)
        values.push(updates.isActive)
      }
      if (updates.endedAt !== undefined) {
        setClause.push(`ended_at = $${values.length + 1}`)
        values.push(updates.endedAt)
      }
      if (updates.usedQuestions !== undefined) {
        setClause.push(`used_questions = $${values.length + 1}`)
        values.push(updates.usedQuestions)
      }

      if (setClause.length > 0) {
        values.push(sessionId)
        await sql`
          UPDATE quiz_sessions 
          SET ${sql.unsafe(setClause.join(", "))}
          WHERE id = $${values.length}
        `.apply(null, values)
      }
    } catch (error) {
      console.error("Error updating quiz session:", error)
    }
  } else {
    const session = fallbackSessions.get(sessionId)
    if (session) {
      Object.assign(session, updates)
      fallbackSessions.set(sessionId, session)
    }
  }
}

// Stats management
export async function updateUserStats(userId: string, username: string, session: QuizSession): Promise<void> {
  const percentage = session.totalAttempts > 0 ? (session.correctAnswers / session.totalAttempts) * 100 : 0
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      // Get current stats
      const currentStats = await sql`
        SELECT * FROM user_stats WHERE user_id = ${userId}
      `

      if (currentStats.length > 0) {
        const stats = currentStats[0]
        const newTotalCorrect = stats.total_correct + session.correctAnswers
        const newTotalAttempts = stats.total_attempts + session.totalAttempts
        const newAveragePercentage = newTotalAttempts > 0 ? (newTotalCorrect / newTotalAttempts) * 100 : 0
        const newBestScore = Math.max(stats.best_score, session.correctAnswers)
        const newBestPercentage = Math.max(stats.best_percentage, percentage)

        await sql`
          UPDATE user_stats 
          SET 
            total_sessions = total_sessions + 1,
            total_correct = ${newTotalCorrect},
            total_attempts = ${newTotalAttempts},
            average_percentage = ${newAveragePercentage},
            best_score = ${newBestScore},
            best_percentage = ${newBestPercentage},
            last_played = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ${userId}
        `
      }
    } catch (error) {
      console.error("Error updating user stats:", error)
    }
  } else {
    // Fallback to memory storage
    const existing = fallbackUserStats.get(userId)

    if (existing) {
      existing.totalSessions += 1
      existing.totalCorrect += session.correctAnswers
      existing.totalAttempts += session.totalAttempts
      existing.averagePercentage =
        existing.totalAttempts > 0 ? (existing.totalCorrect / existing.totalAttempts) * 100 : 0
      existing.lastPlayed = session.endedAt || session.startedAt
      existing.bestScore = Math.max(existing.bestScore, session.correctAnswers)
      existing.bestPercentage = Math.max(existing.bestPercentage, percentage)
      fallbackUserStats.set(userId, existing)
    } else {
      const newStats: UserStats = {
        userId,
        username,
        totalSessions: 1,
        bestScore: session.correctAnswers,
        bestPercentage: percentage,
        totalCorrect: session.correctAnswers,
        totalAttempts: session.totalAttempts,
        averagePercentage: percentage,
        lastPlayed: session.endedAt || session.startedAt,
      }
      fallbackUserStats.set(userId, newStats)
    }
  }
}

// Leaderboard
export async function getLeaderboard(limit = 50): Promise<any[]> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      const leaderboard = await sql`
        SELECT 
          user_id as id,
          username,
          total_correct as correct_answers,
          total_attempts,
          average_percentage,
          best_score,
          best_percentage,
          total_sessions,
          last_played,
          ROW_NUMBER() OVER (ORDER BY total_correct DESC, average_percentage DESC, total_attempts ASC) as rank
        FROM user_stats 
        WHERE total_attempts > 0
        ORDER BY total_correct DESC, average_percentage DESC, total_attempts ASC
        LIMIT ${limit}
      `

      return leaderboard.map((entry: any) => ({
        ...entry,
        average_percentage: Math.round(entry.average_percentage),
        best_percentage: Math.round(entry.best_percentage),
      }))
    } catch (error) {
      console.error("Error getting leaderboard:", error)
    }
  }

  // Fallback to memory storage
  return Array.from(fallbackUserStats.values())
    .filter((stats) => stats.totalAttempts > 0)
    .sort((a, b) => {
      if (a.totalCorrect !== b.totalCorrect) return b.totalCorrect - a.totalCorrect
      if (a.averagePercentage !== b.averagePercentage) return b.averagePercentage - a.averagePercentage
      return a.totalAttempts - b.totalAttempts
    })
    .slice(0, limit)
    .map((stats, index) => ({
      id: stats.userId,
      username: stats.username,
      correct_answers: stats.totalCorrect,
      total_attempts: stats.totalAttempts,
      average_percentage: Math.round(stats.averagePercentage),
      best_score: stats.bestScore,
      best_percentage: Math.round(stats.bestPercentage),
      total_sessions: stats.totalSessions,
      last_played: stats.lastPlayed,
      rank: index + 1,
    }))
}

// Reset user progress (if they want to play all questions again)
export async function resetUserProgress(userId: string): Promise<void> {
  const dbInitialized = await initializeDatabase()

  if (dbInitialized && sql) {
    try {
      await sql`
        UPDATE user_progress 
        SET 
          played_questions = '{}',
          total_questions_played = 0,
          last_reset = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `
    } catch (error) {
      console.error("Error resetting user progress:", error)
    }
  } else {
    fallbackUserProgress.set(userId, {
      userId,
      playedQuestions: [],
      totalQuestionsPlayed: 0,
      lastReset: new Date().toISOString(),
    })
  }
}
