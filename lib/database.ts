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

// Expanded player database with more football stars
export const PLAYERS: Player[] = [
  // Premier League Legends & Current Stars
  {
    id: 1,
    name: "Cristiano Ronaldo",
    clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 2,
    name: "David Beckham",
    clubs: ["Manchester United", "Real Madrid", "AC Milan", "Paris Saint-Germain", "LA Galaxy"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 3,
    name: "Thierry Henry",
    clubs: ["AS Monaco", "Arsenal", "Juventus", "Barcelona", "New York Red Bulls"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 4,
    name: "Cesc Fabregas",
    clubs: ["Arsenal", "Barcelona", "Chelsea", "AS Monaco"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 5,
    name: "Fernando Torres",
    clubs: ["Atletico Madrid", "Liverpool", "Chelsea"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 6,
    name: "Zlatan Ibrahimovic",
    clubs: [
      "Ajax",
      "Juventus",
      "Inter Milan",
      "Barcelona",
      "AC Milan",
      "Paris Saint-Germain",
      "Manchester United",
      "LA Galaxy",
    ],
    nationality: "Sweden",
    position: "Forward",
  },
  {
    id: 7,
    name: "Andrea Pirlo",
    clubs: ["Brescia", "Inter Milan", "AC Milan", "Juventus", "New York City FC"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 8,
    name: "Ronaldinho",
    clubs: ["Gremio", "Paris Saint-Germain", "Barcelona", "AC Milan"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 9,
    name: "Kaka",
    clubs: ["Sao Paulo", "AC Milan", "Real Madrid", "New York City FC"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 10,
    name: "Luis Figo",
    clubs: ["Sporting CP", "Barcelona", "Real Madrid", "Inter Milan"],
    nationality: "Portugal",
    position: "Winger",
  },
  {
    id: 11,
    name: "Raheem Sterling",
    clubs: ["Liverpool", "Manchester City", "Chelsea", "Arsenal"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: 12,
    name: "Carlos Tevez",
    clubs: ["Boca Juniors", "West Ham United", "Manchester United", "Manchester City", "Juventus"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 13,
    name: "Ashley Cole",
    clubs: ["Arsenal", "Chelsea", "AS Roma", "LA Galaxy"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 14,
    name: "Sol Campbell",
    clubs: ["Tottenham", "Arsenal", "Portsmouth"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 15,
    name: "Michael Owen",
    clubs: ["Liverpool", "Real Madrid", "Newcastle United", "Manchester United"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 16,
    name: "Gareth Bale",
    clubs: ["Southampton", "Tottenham", "Real Madrid", "LAFC"],
    nationality: "Wales",
    position: "Winger",
  },
  {
    id: 17,
    name: "Eden Hazard",
    clubs: ["Lille", "Chelsea", "Real Madrid"],
    nationality: "Belgium",
    position: "Winger",
  },
  {
    id: 18,
    name: "Kevin De Bruyne",
    clubs: ["Genk", "Chelsea", "Werder Bremen", "VfL Wolfsburg", "Manchester City"],
    nationality: "Belgium",
    position: "Midfielder",
  },
  {
    id: 19,
    name: "Romelu Lukaku",
    clubs: ["Anderlecht", "Chelsea", "West Bromwich Albion", "Everton", "Manchester United", "Inter Milan"],
    nationality: "Belgium",
    position: "Forward",
  },
  {
    id: 20,
    name: "N'Golo Kante",
    clubs: ["Caen", "Leicester City", "Chelsea", "Al Ittihad"],
    nationality: "France",
    position: "Midfielder",
  },

  // La Liga Stars
  {
    id: 21,
    name: "Lionel Messi",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 22,
    name: "Neymar Jr",
    clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 23,
    name: "Luka Modric",
    clubs: ["Dinamo Zagreb", "Tottenham", "Real Madrid"],
    nationality: "Croatia",
    position: "Midfielder",
  },
  {
    id: 24,
    name: "Sergio Ramos",
    clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 25,
    name: "Antoine Griezmann",
    clubs: ["Real Sociedad", "Atletico Madrid", "Barcelona"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 26,
    name: "Luis Suarez",
    clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atletico Madrid", "Inter Miami"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 27,
    name: "Gerard Pique",
    clubs: ["Barcelona", "Manchester United"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 28,
    name: "Alvaro Morata",
    clubs: ["Real Madrid", "Juventus", "Chelsea", "Atletico Madrid", "AC Milan"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 29,
    name: "Diego Costa",
    clubs: ["Atletico Madrid", "Chelsea"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 30,
    name: "Thibaut Courtois",
    clubs: ["Genk", "Chelsea", "Atletico Madrid", "Real Madrid"],
    nationality: "Belgium",
    position: "Goalkeeper",
  },

  // Serie A Legends
  {
    id: 31,
    name: "Paulo Dybala",
    clubs: ["Instituto", "Palermo", "Juventus", "AS Roma"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 32,
    name: "Gonzalo Higuain",
    clubs: ["River Plate", "Real Madrid", "Napoli", "Juventus", "AC Milan", "Chelsea", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 33,
    name: "Roberto Baggio",
    clubs: ["Vicenza", "Fiorentina", "Juventus", "AC Milan", "Bologna", "Inter Milan", "Brescia"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 34,
    name: "Francesco Totti",
    clubs: ["AS Roma"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 35,
    name: "Gianluigi Buffon",
    clubs: ["Parma", "Juventus", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 36,
    name: "Clarence Seedorf",
    clubs: ["Ajax", "Sampdoria", "Real Madrid", "Inter Milan", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 37,
    name: "Thiago Silva",
    clubs: ["Juventude", "Porto", "Dynamo Moscow", "Fluminense", "AC Milan", "Paris Saint-Germain", "Chelsea"],
    nationality: "Brazil",
    position: "Defender",
  },

  // Bundesliga Stars
  {
    id: 38,
    name: "Robert Lewandowski",
    clubs: ["Znicz Pruszkow", "Lech Poznan", "Borussia Dortmund", "Bayern Munich", "Barcelona"],
    nationality: "Poland",
    position: "Forward",
  },
  {
    id: 39,
    name: "Mario Gotze",
    clubs: ["Borussia Dortmund", "Bayern Munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 40,
    name: "Mats Hummels",
    clubs: ["Bayern Munich", "Borussia Dortmund"],
    nationality: "Germany",
    position: "Defender",
  },
  {
    id: 41,
    name: "Timo Werner",
    clubs: ["VfB Stuttgart", "RB Leipzig", "Chelsea", "RB Leipzig"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 42,
    name: "Kai Havertz",
    clubs: ["Bayer Leverkusen", "Chelsea", "Arsenal"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 43,
    name: "Erling Haaland",
    clubs: ["Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
    nationality: "Norway",
    position: "Forward",
  },
  {
    id: 44,
    name: "Jadon Sancho",
    clubs: ["Watford", "Manchester City", "Borussia Dortmund", "Manchester United"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: 45,
    name: "Sadio Mane",
    clubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"],
    nationality: "Senegal",
    position: "Winger",
  },

  // Ligue 1 & International Stars
  {
    id: 46,
    name: "Kylian Mbappe",
    clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 47,
    name: "Edinson Cavani",
    clubs: ["Danubio", "Palermo", "Napoli", "Paris Saint-Germain", "Manchester United", "Valencia"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 48,
    name: "Angel Di Maria",
    clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus"],
    nationality: "Argentina",
    position: "Winger",
  },
  {
    id: 49,
    name: "Marco Verratti",
    clubs: ["Pescara", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 50,
    name: "Marquinhos",
    clubs: ["Corinthians", "AS Roma", "Paris Saint-Germain"],
    nationality: "Brazil",
    position: "Defender",
  },

  // More Premier League Stars
  {
    id: 51,
    name: "Mohamed Salah",
    clubs: ["El Mokawloon", "Basel", "Chelsea", "Fiorentina", "AS Roma", "Liverpool"],
    nationality: "Egypt",
    position: "Forward",
  },
  {
    id: 52,
    name: "Virgil van Dijk",
    clubs: ["Willem II", "Groningen", "Celtic", "Southampton", "Liverpool"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 53,
    name: "Riyad Mahrez",
    clubs: ["Le Havre", "Leicester City", "Manchester City", "Al Ahli"],
    nationality: "Algeria",
    position: "Winger",
  },
  {
    id: 54,
    name: "Jamie Vardy",
    clubs: ["Stocksbridge Park Steels", "Halifax Town", "Fleetwood Town", "Leicester City"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 55,
    name: "Harry Kane",
    clubs: ["Tottenham", "Bayern Munich"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 56,
    name: "Declan Rice",
    clubs: ["West Ham United", "Arsenal"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 57,
    name: "Mason Mount",
    clubs: ["Chelsea", "Manchester United"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 58,
    name: "Jack Grealish",
    clubs: ["Aston Villa", "Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 59,
    name: "Phil Foden",
    clubs: ["Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 60,
    name: "Bukayo Saka",
    clubs: ["Arsenal"],
    nationality: "England",
    position: "Winger",
  },

  // More International Stars
  {
    id: 61,
    name: "Jude Bellingham",
    clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 62,
    name: "Pedri",
    clubs: ["Las Palmas", "Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 63,
    name: "Gavi",
    clubs: ["Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 64,
    name: "Vinicius Jr",
    clubs: ["Flamengo", "Real Madrid"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 65,
    name: "Rodrygo",
    clubs: ["Santos", "Real Madrid"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 66,
    name: "Eduardo Camavinga",
    clubs: ["Rennes", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 67,
    name: "Aurelien Tchouameni",
    clubs: ["Bordeaux", "AS Monaco", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 68,
    name: "Christopher Nkunku",
    clubs: ["Paris Saint-Germain", "RB Leipzig", "Chelsea"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 69,
    name: "Victor Osimhen",
    clubs: ["Wolfsburg", "Charleroi", "Lille", "Napoli"],
    nationality: "Nigeria",
    position: "Forward",
  },
  {
    id: 70,
    name: "Rafael Leao",
    clubs: ["Sporting CP", "Lille", "AC Milan"],
    nationality: "Portugal",
    position: "Winger",
  },

  // Classic Legends
  {
    id: 71,
    name: "Ronaldo Nazario",
    clubs: ["Cruzeiro", "PSV", "Barcelona", "Inter Milan", "Real Madrid", "AC Milan", "Corinthians"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 72,
    name: "Zinedine Zidane",
    clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 73,
    name: "Pavel Nedved",
    clubs: ["Dukla Prague", "Sparta Prague", "Lazio", "Juventus"],
    nationality: "Czech Republic",
    position: "Midfielder",
  },
  {
    id: 74,
    name: "Fabio Cannavaro",
    clubs: ["Napoli", "Parma", "Inter Milan", "Juventus", "Real Madrid"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 75,
    name: "Samuel Eto'o",
    clubs: ["Real Madrid", "Espanyol", "Mallorca", "Barcelona", "Inter Milan", "Anzhi", "Chelsea", "Everton"],
    nationality: "Cameroon",
    position: "Forward",
  },
  {
    id: 76,
    name: "Arjen Robben",
    clubs: ["Groningen", "PSV", "Chelsea", "Real Madrid", "Bayern Munich"],
    nationality: "Netherlands",
    position: "Winger",
  },
  {
    id: 77,
    name: "Wesley Sneijder",
    clubs: ["Ajax", "Real Madrid", "Inter Milan", "Galatasaray", "Nice", "Al Gharafa"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 78,
    name: "Xabi Alonso",
    clubs: ["Real Sociedad", "Liverpool", "Real Madrid", "Bayern Munich"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 79,
    name: "James Rodriguez",
    clubs: [
      "Envigado",
      "Banfield",
      "Porto",
      "AS Monaco",
      "Real Madrid",
      "Bayern Munich",
      "Everton",
      "Al Rayyan",
      "Olympiacos",
    ],
    nationality: "Colombia",
    position: "Midfielder",
  },
  {
    id: 80,
    name: "Radamel Falcao",
    clubs: [
      "Lanceros Boyaca",
      "River Plate",
      "Porto",
      "Atletico Madrid",
      "AS Monaco",
      "Manchester United",
      "Chelsea",
      "Galatasaray",
      "Rayo Vallecano",
    ],
    nationality: "Colombia",
    position: "Forward",
  },

  // More Recent Stars
  {
    id: 81,
    name: "Bruno Fernandes",
    clubs: ["Boavista", "Novara", "Udinese", "Sampdoria", "Sporting CP", "Manchester United"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 82,
    name: "Joao Felix",
    clubs: ["Benfica", "Atletico Madrid", "Chelsea", "Barcelona"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 83,
    name: "Ruben Dias",
    clubs: ["Benfica", "Manchester City"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 84,
    name: "Bernardo Silva",
    clubs: ["Benfica", "AS Monaco", "Manchester City"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 85,
    name: "Joao Cancelo",
    clubs: ["Benfica", "Valencia", "Inter Milan", "Juventus", "Manchester City", "Bayern Munich", "Barcelona"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 86,
    name: "Frenkie de Jong",
    clubs: ["Willem II", "Ajax", "Barcelona"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 87,
    name: "Matthijs de Ligt",
    clubs: ["Ajax", "Juventus", "Bayern Munich"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 88,
    name: "Donny van de Beek",
    clubs: ["Ajax", "Manchester United", "Everton", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 89,
    name: "Hakim Ziyech",
    clubs: ["Heerenveen", "FC Twente", "Ajax", "Chelsea", "AC Milan", "Galatasaray"],
    nationality: "Morocco",
    position: "Winger",
  },
  {
    id: 90,
    name: "Achraf Hakimi",
    clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain"],
    nationality: "Morocco",
    position: "Defender",
  },

  // Additional Quality Players
  {
    id: 91,
    name: "Casemiro",
    clubs: ["Sao Paulo", "Real Madrid", "Manchester United"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 92,
    name: "Raphael Varane",
    clubs: ["Lens", "Real Madrid", "Manchester United", "Como"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 93,
    name: "Paul Pogba",
    clubs: ["Le Havre", "Manchester United", "Juventus"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 94,
    name: "Ousmane Dembele",
    clubs: ["Rennes", "Borussia Dortmund", "Barcelona", "Paris Saint-Germain"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 95,
    name: "Kingsley Coman",
    clubs: ["Paris Saint-Germain", "Juventus", "Bayern Munich"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 96,
    name: "Ferran Torres",
    clubs: ["Valencia", "Manchester City", "Barcelona"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 97,
    name: "Mikel Oyarzabal",
    clubs: ["Real Sociedad"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 98,
    name: "Dani Olmo",
    clubs: ["Barcelona", "Dinamo Zagreb", "RB Leipzig", "Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 99,
    name: "Lautaro Martinez",
    clubs: ["Racing Club", "Inter Milan"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 100,
    name: "Nicolo Barella",
    clubs: ["Cagliari", "Inter Milan"],
    nationality: "Italy",
    position: "Midfielder",
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
  { id: 11, club1: "Manchester City", club2: "Barcelona" },
  { id: 12, club1: "Liverpool", club2: "Real Madrid" },
  { id: 13, club1: "Chelsea", club2: "Real Madrid" },
  { id: 14, club1: "Tottenham", club2: "Real Madrid" },
  { id: 15, club1: "Bayern Munich", club2: "Barcelona" },
  { id: 16, club1: "Borussia Dortmund", club2: "Bayern Munich" },
  { id: 17, club1: "Atletico Madrid", club2: "Chelsea" },
  { id: 18, club1: "AS Monaco", club2: "Paris Saint-Germain" },
  { id: 19, club1: "Napoli", club2: "Chelsea" },
  { id: 20, club1: "Leicester City", club2: "Chelsea" },
]

// Fallback storage for when database is not available
const fallbackUsers = new Map<string, User>()
const fallbackSessions = new Map<string, QuizSession>()
const fallbackUserStats = new Map<string, any>()

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateGuestUsername(): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000)
  return `Guest${randomNumber}`
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
    .slice(0, 8) // Show max 8 suggestions
}

export function getPlayersForClubs(club1: string, club2: string): Player[] {
  return PLAYERS.filter((player) => player.clubs.includes(club1) && player.clubs.includes(club2))
}

export async function getRandomClubPair(userId?: string, excludeIds: number[] = []): Promise<ClubPair | null> {
  let finalExcludeIds = [...excludeIds]

  // If we have a userId, get their previously seen questions
  if (userId) {
    const userStats = fallbackUserStats.get(userId)
    if (userStats && userStats.seen_questions) {
      finalExcludeIds = [...finalExcludeIds, ...userStats.seen_questions]
    }
  }

  const availablePairs = CLUB_PAIRS.filter((pair) => !finalExcludeIds.includes(pair.id))

  if (availablePairs.length === 0) {
    // If user has seen all questions, reset their progress
    if (userId) {
      const userStats = fallbackUserStats.get(userId)
      if (userStats) {
        userStats.seen_questions = []
        fallbackUserStats.set(userId, userStats)
        // Try again with reset progress
        return getRandomClubPair(userId, excludeIds)
      }
    }
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
  console.log("Created quiz session for:", username || "anonymous")
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
    console.log("Updated session:", sessionId, updates)
  }
}

// Update user stats when session ends
export async function updateUserStats(userId: string, username: string, sessionData: QuizSession): Promise<void> {
  console.log("Updating user stats for:", username, "with session data:", sessionData)

  // Get user info to determine if guest
  const user = fallbackUsers.get(userId)
  const isGuest = user?.is_guest || username.startsWith("Guest")

  const existing = fallbackUserStats.get(userId) || {
    id: userId,
    username,
    is_guest: isGuest,
    total_correct: 0,
    total_attempts: 0,
    best_score: 0,
    total_sessions: 0,
    last_played: new Date().toISOString(),
    average_percentage: 0,
    seen_questions: [], // Add this to track seen questions
  }

  // Update stats with the session data
  existing.total_correct += sessionData.correct_answers
  existing.total_attempts += sessionData.total_attempts
  existing.best_score = Math.max(existing.best_score, sessionData.correct_answers)
  existing.total_sessions += 1
  existing.last_played = sessionData.ended_at || new Date().toISOString()
  existing.average_percentage =
    existing.total_attempts > 0 ? Math.round((existing.total_correct / existing.total_attempts) * 100) : 0

  // Add used questions to seen questions
  if (sessionData.used_questions) {
    existing.seen_questions = existing.seen_questions || []
    sessionData.used_questions.forEach((questionId) => {
      if (!existing.seen_questions.includes(questionId)) {
        existing.seen_questions.push(questionId)
      }
    })
  }

  fallbackUserStats.set(userId, existing)
  console.log("Updated user stats:", existing)
}

// Leaderboard
export async function getLeaderboard(limit = 50): Promise<any[]> {
  console.log("=== GETTING LEADERBOARD ===")
  console.log("Fallback user stats entries:", fallbackUserStats.size)

  // Get all stats from fallback storage
  const leaderboardData = Array.from(fallbackUserStats.values())
    .filter((stats) => {
      console.log("Checking stats for:", stats.username, "total_correct:", stats.total_correct)
      return stats.total_correct > 0 // Only show users who have scored at least 1 point
    })
    .sort((a, b) => {
      // Sort by total correct first, then by average percentage, then by last played
      if (a.total_correct !== b.total_correct) return b.total_correct - a.total_correct
      if (a.average_percentage !== b.average_percentage) return b.average_percentage - a.average_percentage
      return new Date(b.last_played).getTime() - new Date(a.last_played).getTime()
    })
    .slice(0, limit)
    .map((stats, index) => ({
      ...stats,
      rank: index + 1,
      correct_answers: stats.total_correct, // Ensure the field name matches what the UI expects
    }))

  console.log("Final leaderboard data:", leaderboardData)
  return leaderboardData
}
