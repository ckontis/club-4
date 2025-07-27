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

// MASSIVELY EXPANDED player database with 300+ football stars
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
    clubs: ["Arsenal", "Barcelona", "Chelsea", "AS Monaco", "Como"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 5,
    name: "Fernando Torres",
    clubs: ["Atletico Madrid", "Liverpool", "Chelsea", "AC Milan"],
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
    clubs: ["Gremio", "Paris Saint-Germain", "Barcelona", "AC Milan", "Flamengo"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 9,
    name: "Kaka",
    clubs: ["Sao Paulo", "AC Milan", "Real Madrid", "New York City FC", "Orlando City"],
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
    clubs: ["Tottenham", "Arsenal", "Portsmouth", "Newcastle United"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 15,
    name: "Michael Owen",
    clubs: ["Liverpool", "Real Madrid", "Newcastle United", "Manchester United", "Stoke City"],
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
    clubs: ["Anderlecht", "Chelsea", "West Bromwich Albion", "Everton", "Manchester United", "Inter Milan", "AS Roma"],
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

  // More Premier League Stars
  {
    id: 21,
    name: "Frank Lampard",
    clubs: ["West Ham United", "Chelsea", "Manchester City", "New York City FC"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 22,
    name: "Steven Gerrard",
    clubs: ["Liverpool", "LA Galaxy"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 23,
    name: "Paul Scholes",
    clubs: ["Manchester United"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 24,
    name: "Rio Ferdinand",
    clubs: ["West Ham United", "Leeds United", "Manchester United", "Queens Park Rangers"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 25,
    name: "John Terry",
    clubs: ["Chelsea", "Aston Villa"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 26,
    name: "Petr Cech",
    clubs: ["Sparta Prague", "Rennes", "Chelsea", "Arsenal"],
    nationality: "Czech Republic",
    position: "Goalkeeper",
  },
  {
    id: 27,
    name: "Didier Drogba",
    clubs: ["Le Mans", "Guingamp", "Marseille", "Chelsea", "Shanghai Shenhua", "Galatasaray", "Montreal Impact"],
    nationality: "Ivory Coast",
    position: "Forward",
  },
  {
    id: 28,
    name: "Yaya Toure",
    clubs: ["Metalurh Donetsk", "Olympiacos", "AS Monaco", "Barcelona", "Manchester City", "New York City FC"],
    nationality: "Ivory Coast",
    position: "Midfielder",
  },
  {
    id: 29,
    name: "Sergio Aguero",
    clubs: ["Independiente", "Atletico Madrid", "Manchester City", "Barcelona"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 30,
    name: "David Silva",
    clubs: ["Valencia", "Manchester City", "Real Sociedad"],
    nationality: "Spain",
    position: "Midfielder",
  },

  // La Liga Stars
  {
    id: 31,
    name: "Lionel Messi",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 32,
    name: "Neymar Jr",
    clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 33,
    name: "Luka Modric",
    clubs: ["Dinamo Zagreb", "Tottenham", "Real Madrid"],
    nationality: "Croatia",
    position: "Midfielder",
  },
  {
    id: 34,
    name: "Sergio Ramos",
    clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 35,
    name: "Antoine Griezmann",
    clubs: ["Real Sociedad", "Atletico Madrid", "Barcelona"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 36,
    name: "Luis Suarez",
    clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atletico Madrid", "Inter Miami"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 37,
    name: "Gerard Pique",
    clubs: ["Barcelona", "Manchester United"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 38,
    name: "Alvaro Morata",
    clubs: ["Real Madrid", "Juventus", "Chelsea", "Atletico Madrid", "AC Milan"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 39,
    name: "Diego Costa",
    clubs: ["Atletico Madrid", "Chelsea", "Wolverhampton Wanderers"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 40,
    name: "Thibaut Courtois",
    clubs: ["Genk", "Chelsea", "Atletico Madrid", "Real Madrid"],
    nationality: "Belgium",
    position: "Goalkeeper",
  },
  {
    id: 41,
    name: "Karim Benzema",
    clubs: ["Lyon", "Real Madrid", "Al Ittihad"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 42,
    name: "Xavi",
    clubs: ["Barcelona", "Al Sadd"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 43,
    name: "Andres Iniesta",
    clubs: ["Barcelona", "Vissel Kobe", "Emirates Club"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 44,
    name: "Sergio Busquets",
    clubs: ["Barcelona", "Inter Miami"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 45,
    name: "Jordi Alba",
    clubs: ["Barcelona", "Valencia", "Inter Miami"],
    nationality: "Spain",
    position: "Defender",
  },

  // Serie A Legends
  {
    id: 46,
    name: "Paulo Dybala",
    clubs: ["Instituto", "Palermo", "Juventus", "AS Roma"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 47,
    name: "Gonzalo Higuain",
    clubs: ["River Plate", "Real Madrid", "Napoli", "Juventus", "AC Milan", "Chelsea", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 48,
    name: "Roberto Baggio",
    clubs: ["Vicenza", "Fiorentina", "Juventus", "AC Milan", "Bologna", "Inter Milan", "Brescia"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 49,
    name: "Francesco Totti",
    clubs: ["AS Roma"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 50,
    name: "Gianluigi Buffon",
    clubs: ["Parma", "Juventus", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 51,
    name: "Clarence Seedorf",
    clubs: ["Ajax", "Sampdoria", "Real Madrid", "Inter Milan", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 52,
    name: "Thiago Silva",
    clubs: ["Juventude", "Porto", "Dynamo Moscow", "Fluminense", "AC Milan", "Paris Saint-Germain", "Chelsea"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 53,
    name: "Ciro Immobile",
    clubs: ["Juventus", "Siena", "Grosseto", "Pescara", "Genoa", "Torino", "Borussia Dortmund", "Sevilla", "Lazio"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 54,
    name: "Lorenzo Insigne",
    clubs: ["Napoli", "Toronto FC"],
    nationality: "Italy",
    position: "Winger",
  },
  {
    id: 55,
    name: "Federico Chiesa",
    clubs: ["Fiorentina", "Juventus", "Liverpool"],
    nationality: "Italy",
    position: "Winger",
  },

  // Bundesliga Stars
  {
    id: 56,
    name: "Robert Lewandowski",
    clubs: ["Znicz Pruszkow", "Lech Poznan", "Borussia Dortmund", "Bayern Munich", "Barcelona"],
    nationality: "Poland",
    position: "Forward",
  },
  {
    id: 57,
    name: "Mario Gotze",
    clubs: ["Borussia Dortmund", "Bayern Munich", "PSV Eindhoven", "Eintracht Frankfurt"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 58,
    name: "Mats Hummels",
    clubs: ["Bayern Munich", "Borussia Dortmund"],
    nationality: "Germany",
    position: "Defender",
  },
  {
    id: 59,
    name: "Timo Werner",
    clubs: ["VfB Stuttgart", "RB Leipzig", "Chelsea", "RB Leipzig"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 60,
    name: "Kai Havertz",
    clubs: ["Bayer Leverkusen", "Chelsea", "Arsenal"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 61,
    name: "Erling Haaland",
    clubs: ["Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
    nationality: "Norway",
    position: "Forward",
  },
  {
    id: 62,
    name: "Jadon Sancho",
    clubs: ["Watford", "Manchester City", "Borussia Dortmund", "Manchester United"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: 63,
    name: "Sadio Mane",
    clubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"],
    nationality: "Senegal",
    position: "Winger",
  },
  {
    id: 64,
    name: "Thomas Muller",
    clubs: ["Bayern Munich"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 65,
    name: "Manuel Neuer",
    clubs: ["Schalke 04", "Bayern Munich"],
    nationality: "Germany",
    position: "Goalkeeper",
  },

  // Ligue 1 & International Stars
  {
    id: 66,
    name: "Kylian Mbappe",
    clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 67,
    name: "Edinson Cavani",
    clubs: ["Danubio", "Palermo", "Napoli", "Paris Saint-Germain", "Manchester United", "Valencia"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 68,
    name: "Angel Di Maria",
    clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus"],
    nationality: "Argentina",
    position: "Winger",
  },
  {
    id: 69,
    name: "Marco Verratti",
    clubs: ["Pescara", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 70,
    name: "Marquinhos",
    clubs: ["Corinthians", "AS Roma", "Paris Saint-Germain"],
    nationality: "Brazil",
    position: "Defender",
  },

  // More Premier League Stars
  {
    id: 71,
    name: "Mohamed Salah",
    clubs: ["El Mokawloon", "Basel", "Chelsea", "Fiorentina", "AS Roma", "Liverpool"],
    nationality: "Egypt",
    position: "Forward",
  },
  {
    id: 72,
    name: "Virgil van Dijk",
    clubs: ["Willem II", "Groningen", "Celtic", "Southampton", "Liverpool"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 73,
    name: "Riyad Mahrez",
    clubs: ["Le Havre", "Leicester City", "Manchester City", "Al Ahli"],
    nationality: "Algeria",
    position: "Winger",
  },
  {
    id: 74,
    name: "Jamie Vardy",
    clubs: ["Stocksbridge Park Steels", "Halifax Town", "Fleetwood Town", "Leicester City"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 75,
    name: "Harry Kane",
    clubs: ["Tottenham", "Bayern Munich"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 76,
    name: "Declan Rice",
    clubs: ["West Ham United", "Arsenal"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 77,
    name: "Mason Mount",
    clubs: ["Chelsea", "Manchester United"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 78,
    name: "Jack Grealish",
    clubs: ["Aston Villa", "Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 79,
    name: "Phil Foden",
    clubs: ["Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 80,
    name: "Bukayo Saka",
    clubs: ["Arsenal"],
    nationality: "England",
    position: "Winger",
  },

  // More International Stars
  {
    id: 81,
    name: "Jude Bellingham",
    clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 82,
    name: "Pedri",
    clubs: ["Las Palmas", "Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 83,
    name: "Gavi",
    clubs: ["Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 84,
    name: "Vinicius Jr",
    clubs: ["Flamengo", "Real Madrid"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 85,
    name: "Rodrygo",
    clubs: ["Santos", "Real Madrid"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 86,
    name: "Eduardo Camavinga",
    clubs: ["Rennes", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 87,
    name: "Aurelien Tchouameni",
    clubs: ["Bordeaux", "AS Monaco", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 88,
    name: "Christopher Nkunku",
    clubs: ["Paris Saint-Germain", "RB Leipzig", "Chelsea"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 89,
    name: "Victor Osimhen",
    clubs: ["Wolfsburg", "Charleroi", "Lille", "Napoli", "Galatasaray"],
    nationality: "Nigeria",
    position: "Forward",
  },
  {
    id: 90,
    name: "Rafael Leao",
    clubs: ["Sporting CP", "Lille", "AC Milan"],
    nationality: "Portugal",
    position: "Winger",
  },

  // Classic Legends
  {
    id: 91,
    name: "Ronaldo Nazario",
    clubs: ["Cruzeiro", "PSV", "Barcelona", "Inter Milan", "Real Madrid", "AC Milan", "Corinthians"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 92,
    name: "Zinedine Zidane",
    clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 93,
    name: "Pavel Nedved",
    clubs: ["Dukla Prague", "Sparta Prague", "Lazio", "Juventus"],
    nationality: "Czech Republic",
    position: "Midfielder",
  },
  {
    id: 94,
    name: "Fabio Cannavaro",
    clubs: ["Napoli", "Parma", "Inter Milan", "Juventus", "Real Madrid"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 95,
    name: "Samuel Eto'o",
    clubs: ["Real Madrid", "Espanyol", "Mallorca", "Barcelona", "Inter Milan", "Anzhi", "Chelsea", "Everton"],
    nationality: "Cameroon",
    position: "Forward",
  },
  {
    id: 96,
    name: "Arjen Robben",
    clubs: ["Groningen", "PSV", "Chelsea", "Real Madrid", "Bayern Munich"],
    nationality: "Netherlands",
    position: "Winger",
  },
  {
    id: 97,
    name: "Wesley Sneijder",
    clubs: ["Ajax", "Real Madrid", "Inter Milan", "Galatasaray", "Nice", "Al Gharafa"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 98,
    name: "Xabi Alonso",
    clubs: ["Real Sociedad", "Liverpool", "Real Madrid", "Bayern Munich"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 99,
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
    id: 100,
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
    id: 101,
    name: "Bruno Fernandes",
    clubs: ["Boavista", "Novara", "Udinese", "Sampdoria", "Sporting CP", "Manchester United"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 102,
    name: "Joao Felix",
    clubs: ["Benfica", "Atletico Madrid", "Chelsea", "Barcelona"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 103,
    name: "Ruben Dias",
    clubs: ["Benfica", "Manchester City"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 104,
    name: "Bernardo Silva",
    clubs: ["Benfica", "AS Monaco", "Manchester City"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 105,
    name: "Joao Cancelo",
    clubs: ["Benfica", "Valencia", "Inter Milan", "Juventus", "Manchester City", "Bayern Munich", "Barcelona"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 106,
    name: "Frenkie de Jong",
    clubs: ["Willem II", "Ajax", "Barcelona"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 107,
    name: "Matthijs de Ligt",
    clubs: ["Ajax", "Juventus", "Bayern Munich"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 108,
    name: "Donny van de Beek",
    clubs: ["Ajax", "Manchester United", "Everton", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 109,
    name: "Hakim Ziyech",
    clubs: ["Heerenveen", "FC Twente", "Ajax", "Chelsea", "AC Milan", "Galatasaray"],
    nationality: "Morocco",
    position: "Winger",
  },
  {
    id: 110,
    name: "Achraf Hakimi",
    clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain"],
    nationality: "Morocco",
    position: "Defender",
  },

  // Additional Quality Players
  {
    id: 111,
    name: "Casemiro",
    clubs: ["Sao Paulo", "Real Madrid", "Manchester United"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 112,
    name: "Raphael Varane",
    clubs: ["Lens", "Real Madrid", "Manchester United", "Como"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 113,
    name: "Paul Pogba",
    clubs: ["Le Havre", "Manchester United", "Juventus"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 114,
    name: "Ousmane Dembele",
    clubs: ["Rennes", "Borussia Dortmund", "Barcelona", "Paris Saint-Germain"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 115,
    name: "Kingsley Coman",
    clubs: ["Paris Saint-Germain", "Juventus", "Bayern Munich"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 116,
    name: "Ferran Torres",
    clubs: ["Valencia", "Manchester City", "Barcelona"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 117,
    name: "Mikel Oyarzabal",
    clubs: ["Real Sociedad"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 118,
    name: "Dani Olmo",
    clubs: ["Barcelona", "Dinamo Zagreb", "RB Leipzig", "Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 119,
    name: "Lautaro Martinez",
    clubs: ["Racing Club", "Inter Milan"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 120,
    name: "Nicolo Barella",
    clubs: ["Cagliari", "Inter Milan"],
    nationality: "Italy",
    position: "Midfielder",
  },

  // More Legends and Stars
  {
    id: 121,
    name: "Rivaldo",
    clubs: [
      "Santa Cruz",
      "Mogi Mirim",
      "Corinthians",
      "Palmeiras",
      "Deportivo La Coruna",
      "Barcelona",
      "AC Milan",
      "Cruzeiro",
    ],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 122,
    name: "Raul",
    clubs: ["Real Madrid", "Schalke 04", "Al Sadd", "New York Cosmos"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 123,
    name: "Iker Casillas",
    clubs: ["Real Madrid", "Porto"],
    nationality: "Spain",
    position: "Goalkeeper",
  },
  {
    id: 124,
    name: "Carles Puyol",
    clubs: ["Barcelona"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 125,
    name: "Deco",
    clubs: ["Benfica", "Porto", "Barcelona", "Chelsea", "Fluminense"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 126,
    name: "Ricardo Quaresma",
    clubs: ["Sporting CP", "Barcelona", "Porto", "Inter Milan", "Chelsea", "Besiktas"],
    nationality: "Portugal",
    position: "Winger",
  },
  {
    id: 127,
    name: "Pepe",
    clubs: ["Maritimo", "Porto", "Real Madrid", "Besiktas"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 128,
    name: "Mesut Ozil",
    clubs: ["Schalke 04", "Werder Bremen", "Real Madrid", "Arsenal", "Fenerbahce"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 129,
    name: "Bastian Schweinsteiger",
    clubs: ["Bayern Munich", "Manchester United", "Chicago Fire"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 130,
    name: "Philipp Lahm",
    clubs: ["Bayern Munich", "VfB Stuttgart"],
    nationality: "Germany",
    position: "Defender",
  },

  // More Current Stars
  {
    id: 131,
    name: "Khvicha Kvaratskhelia",
    clubs: ["Dinamo Batumi", "Rubin Kazan", "Napoli"],
    nationality: "Georgia",
    position: "Winger",
  },
  {
    id: 132,
    name: "Dusan Vlahovic",
    clubs: ["Partizan", "Fiorentina", "Juventus"],
    nationality: "Serbia",
    position: "Forward",
  },
  {
    id: 133,
    name: "Alexander Isak",
    clubs: ["AIK", "Borussia Dortmund", "Willem II", "Real Sociedad", "Newcastle United"],
    nationality: "Sweden",
    position: "Forward",
  },
  {
    id: 134,
    name: "Darwin Nunez",
    clubs: ["Penarol", "Almeria", "Benfica", "Liverpool"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 135,
    name: "Antony",
    clubs: ["Sao Paulo", "Ajax", "Manchester United"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 136,
    name: "Lisandro Martinez",
    clubs: ["Newell's Old Boys", "Defensa y Justicia", "Ajax", "Manchester United"],
    nationality: "Argentina",
    position: "Defender",
  },
  {
    id: 137,
    name: "Enzo Fernandez",
    clubs: ["River Plate", "Defensa y Justicia", "Benfica", "Chelsea"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: 138,
    name: "Mykhaylo Mudryk",
    clubs: ["Dnipro-1", "Shakhtar Donetsk", "Chelsea"],
    nationality: "Ukraine",
    position: "Winger",
  },
  {
    id: 139,
    name: "Cody Gakpo",
    clubs: ["PSV", "Liverpool"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 140,
    name: "Wout Weghorst",
    clubs: ["De Graafschap", "Heracles", "AZ", "VfL Wolfsburg", "Burnley", "Manchester United", "Hoffenheim"],
    nationality: "Netherlands",
    position: "Forward",
  },

  // More Serie A Stars
  {
    id: 141,
    name: "Alessandro Bastoni",
    clubs: ["Atalanta", "Parma", "Inter Milan"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 142,
    name: "Sergej Milinkovic-Savic",
    clubs: ["Vojvodina", "Genk", "Lazio", "Al Hilal"],
    nationality: "Serbia",
    position: "Midfielder",
  },
  {
    id: 143,
    name: "Theo Hernandez",
    clubs: ["Atletico Madrid", "Alaves", "Real Madrid", "AC Milan"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 144,
    name: "Mike Maignan",
    clubs: ["Paris Saint-Germain", "Lille", "AC Milan"],
    nationality: "France",
    position: "Goalkeeper",
  },
  {
    id: 145,
    name: "Tammy Abraham",
    clubs: ["Chelsea", "Bristol City", "Swansea City", "Aston Villa", "AS Roma", "AC Milan"],
    nationality: "England",
    position: "Forward",
  },

  // More Bundesliga Stars
  {
    id: 146,
    name: "Joshua Kimmich",
    clubs: ["VfB Stuttgart", "RB Leipzig", "Bayern Munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 147,
    name: "Leon Goretzka",
    clubs: ["VfL Bochum", "Schalke 04", "Bayern Munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 148,
    name: "Serge Gnabry",
    clubs: ["VfB Stuttgart", "Arsenal", "Werder Bremen", "Hoffenheim", "Bayern Munich"],
    nationality: "Germany",
    position: "Winger",
  },
  {
    id: 149,
    name: "Leroy Sane",
    clubs: ["Schalke 04", "Manchester City", "Bayern Munich"],
    nationality: "Germany",
    position: "Winger",
  },
  {
    id: 150,
    name: "Dayot Upamecano",
    clubs: ["Valenciennes", "Red Bull Salzburg", "RB Leipzig", "Bayern Munich"],
    nationality: "France",
    position: "Defender",
  },

  // More Ligue 1 Stars
  {
    id: 151,
    name: "Gianluigi Donnarumma",
    clubs: ["AC Milan", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 152,
    name: "Presnel Kimpembe",
    clubs: ["Paris Saint-Germain"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 153,
    name: "Warren Zaire-Emery",
    clubs: ["Paris Saint-Germain"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 154,
    name: "Bradley Barcola",
    clubs: ["Lyon", "Paris Saint-Germain"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 155,
    name: "Randal Kolo Muani",
    clubs: ["FC Nantes", "Eintracht Frankfurt", "Paris Saint-Germain"],
    nationality: "France",
    position: "Forward",
  },

  // Portuguese League Stars
  {
    id: 156,
    name: "Otavio",
    clubs: ["Internacional", "Porto", "Al Nassr"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 157,
    name: "Mehdi Taremi",
    clubs: ["Shahin Bushehr", "Persepolis", "Al Gharafa", "Rio Ave", "Porto", "Inter Milan"],
    nationality: "Iran",
    position: "Forward",
  },
  {
    id: 158,
    name: "Evanilson",
    clubs: ["Fluminense", "Tombense", "Porto", "Bournemouth"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 159,
    name: "Goncalo Ramos",
    clubs: ["Benfica", "Paris Saint-Germain"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 160,
    name: "Rafa Silva",
    clubs: ["Feirense", "Braga", "Benfica"],
    nationality: "Portugal",
    position: "Winger",
  },

  // Dutch League Stars
  {
    id: 161,
    name: "Steven Bergwijn",
    clubs: ["PSV", "Tottenham", "Ajax", "Al Ittihad"],
    nationality: "Netherlands",
    position: "Winger",
  },
  {
    id: 162,
    name: "Dusan Tadic",
    clubs: ["Vojvodina", "Groningen", "FC Twente", "Southampton", "Ajax", "Fenerbahce"],
    nationality: "Serbia",
    position: "Midfielder",
  },
  {
    id: 163,
    name: "Sebastien Haller",
    clubs: ["AJ Auxerre", "FC Utrecht", "Eintracht Frankfurt", "West Ham United", "Ajax", "Borussia Dortmund"],
    nationality: "Ivory Coast",
    position: "Forward",
  },
  {
    id: 164,
    name: "Ryan Gravenberch",
    clubs: ["Ajax", "Bayern Munich", "Liverpool"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 165,
    name: "Jurrien Timber",
    clubs: ["Ajax", "Arsenal"],
    nationality: "Netherlands",
    position: "Defender",
  },

  // More International Stars
  {
    id: 166,
    name: "Son Heung-min",
    clubs: ["FC Seoul", "Hamburger SV", "Bayer Leverkusen", "Tottenham"],
    nationality: "South Korea",
    position: "Forward",
  },
  {
    id: 167,
    name: "Hirving Lozano",
    clubs: ["Pachuca", "PSV", "Napoli", "AC Milan"],
    nationality: "Mexico",
    position: "Winger",
  },
  {
    id: 168,
    name: "Takumi Minamino",
    clubs: ["Cerezo Osaka", "Red Bull Salzburg", "Liverpool", "AS Monaco"],
    nationality: "Japan",
    position: "Forward",
  },
  {
    id: 169,
    name: "Yuki Soma",
    clubs: ["Nagoya Grampus", "Reims"],
    nationality: "Japan",
    position: "Midfielder",
  },
  {
    id: 170,
    name: "Min-jae Kim",
    clubs: ["Jeonbuk Hyundai Motors", "Beijing Guoan", "Fenerbahce", "Napoli", "Bayern Munich"],
    nationality: "South Korea",
    position: "Defender",
  },

  // More South American Stars
  {
    id: 171,
    name: "Enzo Barrenechea",
    clubs: ["Newell's Old Boys", "Sion", "Juventus", "Frosinone", "Valencia"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: 172,
    name: "Facundo Pellistri",
    clubs: ["Penarol", "Manchester United", "Alaves", "Granada"],
    nationality: "Uruguay",
    position: "Winger",
  },
  {
    id: 173,
    name: "Matheus Cunha",
    clubs: ["Coritiba", "Sion", "RB Leipzig", "Hertha Berlin", "Atletico Madrid", "Wolverhampton Wanderers"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 174,
    name: "Lucas Paqueta",
    clubs: ["Flamengo", "AC Milan", "Lyon", "West Ham United"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 175,
    name: "Richarlison",
    clubs: ["America Mineiro", "Fluminense", "Watford", "Everton", "Tottenham"],
    nationality: "Brazil",
    position: "Forward",
  },

  // More African Stars
  {
    id: 176,
    name: "Yves Bissouma",
    clubs: ["Lille", "Brighton", "Tottenham"],
    nationality: "Mali",
    position: "Midfielder",
  },
  {
    id: 177,
    name: "Wilfred Ndidi",
    clubs: ["Genk", "Leicester City"],
    nationality: "Nigeria",
    position: "Midfielder",
  },
  {
    id: 178,
    name: "Thomas Partey",
    clubs: ["Odometah", "Atletico Madrid", "Arsenal"],
    nationality: "Ghana",
    position: "Midfielder",
  },
  {
    id: 179,
    name: "Kalidou Koulibaly",
    clubs: ["Metz", "Genk", "Napoli", "Chelsea", "Al Hilal"],
    nationality: "Senegal",
    position: "Defender",
  },
  {
    id: 180,
    name: "Andre Onana",
    clubs: ["Barcelona", "Ajax", "Inter Milan", "Manchester United"],
    nationality: "Cameroon",
    position: "Goalkeeper",
  },

  // More Eastern European Stars
  {
    id: 181,
    name: "Andriy Yarmolenko",
    clubs: ["Dynamo Kyiv", "Borussia Dortmund", "West Ham United", "Al Ain"],
    nationality: "Ukraine",
    position: "Winger",
  },
  {
    id: 182,
    name: "Aleksandar Mitrovic",
    clubs: ["Partizan", "Anderlecht", "Newcastle United", "Fulham", "Al Hilal"],
    nationality: "Serbia",
    position: "Forward",
  },
  {
    id: 183,
    name: "Luka Jovic",
    clubs: ["Red Star Belgrade", "Benfica", "Eintracht Frankfurt", "Real Madrid", "Fiorentina", "AC Milan"],
    nationality: "Serbia",
    position: "Forward",
  },
  {
    id: 184,
    name: "Filip Kostic",
    clubs: [
      "Radnicki Kragujevac",
      "Groningen",
      "VfB Stuttgart",
      "Hamburger SV",
      "Eintracht Frankfurt",
      "Juventus",
      "Fenerbahce",
    ],
    nationality: "Serbia",
    position: "Winger",
  },
  {
    id: 185,
    name: "Nikola Milenkovic",
    clubs: ["Partizan", "Fiorentina", "Nottingham Forest"],
    nationality: "Serbia",
    position: "Defender",
  },

  // More Scandinavian Stars
  {
    id: 186,
    name: "Martin Odegaard",
    clubs: ["Stromsgodset", "Real Madrid", "Heerenveen", "Vitesse", "Real Sociedad", "Arsenal"],
    nationality: "Norway",
    position: "Midfielder",
  },
  {
    id: 187,
    name: "Dejan Kulusevski",
    clubs: ["Atalanta", "Parma", "Juventus", "Tottenham"],
    nationality: "Sweden",
    position: "Winger",
  },
  {
    id: 188,
    name: "Emil Forsberg",
    clubs: ["GIF Sundsvall", "Malmo FF", "RB Leipzig", "New York Red Bulls"],
    nationality: "Sweden",
    position: "Midfielder",
  },
  {
    id: 189,
    name: "Pierre-Emile Hojbjerg",
    clubs: ["Brondby", "Bayern Munich", "Schalke 04", "Southampton", "Tottenham", "Fulham"],
    nationality: "Denmark",
    position: "Midfielder",
  },
  {
    id: 190,
    name: "Kasper Schmeichel",
    clubs: [
      "Manchester City",
      "Darlington",
      "Bury",
      "Falkirk",
      "Coventry City",
      "Notts County",
      "Leeds United",
      "Leicester City",
      "Nice",
      "Celtic",
    ],
    nationality: "Denmark",
    position: "Goalkeeper",
  },

  // Final additions - More versatile players
  {
    id: 191,
    name: "Granit Xhaka",
    clubs: ["Basel", "Borussia Monchengladbach", "Arsenal", "Bayer Leverkusen"],
    nationality: "Switzerland",
    position: "Midfielder",
  },
  {
    id: 192,
    name: "Xherdan Shaqiri",
    clubs: ["Basel", "Bayern Munich", "Inter Milan", "Stoke City", "Liverpool", "Lyon", "Chicago Fire"],
    nationality: "Switzerland",
    position: "Winger",
  },
  {
    id: 193,
    name: "Yann Sommer",
    clubs: ["Basel", "Borussia Monchengladbach", "Inter Milan", "Bayern Munich"],
    nationality: "Switzerland",
    position: "Goalkeeper",
  },
  {
    id: 194,
    name: "Breel Embolo",
    clubs: ["Basel", "Schalke 04", "Borussia Monchengladbach", "AS Monaco"],
    nationality: "Switzerland",
    position: "Forward",
  },
  {
    id: 195,
    name: "Hakan Calhanoglu",
    clubs: ["Karlsruher SC", "Hamburger SV", "Bayer Leverkusen", "AC Milan", "Inter Milan"],
    nationality: "Turkey",
    position: "Midfielder",
  },
  {
    id: 196,
    name: "Merih Demiral",
    clubs: ["Alanyaspor", "Sassuolo", "Juventus", "Atalanta", "Al Ahli"],
    nationality: "Turkey",
    position: "Defender",
  },
  {
    id: 197,
    name: "Cengiz Under",
    clubs: ["Altinordu", "Istanbul Basaksehir", "AS Roma", "Leicester City", "Marseille", "Fenerbahce"],
    nationality: "Turkey",
    position: "Winger",
  },
  {
    id: 198,
    name: "Burak Yilmaz",
    clubs: ["Antalyaspor", "Eskisehirspor", "Trabzonspor", "Galatasaray", "Beijing Guoan", "Lille", "Fortuna Sittard"],
    nationality: "Turkey",
    position: "Forward",
  },
  {
    id: 199,
    name: "Orkun Kokcu",
    clubs: ["Feyenoord", "Benfica"],
    nationality: "Turkey",
    position: "Midfielder",
  },
  {
    id: 200,
    name: "Yunus Musah",
    clubs: ["Arsenal", "Valencia", "AC Milan"],
    nationality: "USA",
    position: "Midfielder",
  },
  // 2024-2025 Season Updates & More Players
  {
    id: 201,
    name: "Endrick",
    clubs: ["Palmeiras", "Real Madrid"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 202,
    name: "Leny Yoro",
    clubs: ["Lille", "Manchester United"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 203,
    name: "Joshua Zirkzee",
    clubs: ["Bayern Munich", "Parma", "Anderlecht", "Bologna", "Manchester United"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 204,
    name: "Riccardo Calafiori",
    clubs: ["AS Roma", "Genoa", "Basel", "Bologna", "Arsenal"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 205,
    name: "Mikel Merino",
    clubs: ["Osasuna", "Borussia Dortmund", "Newcastle United", "Real Sociedad", "Arsenal"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 206,
    name: "Pau Victor",
    clubs: ["Barcelona"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 207,
    name: "Julian Alvarez",
    clubs: ["River Plate", "Manchester City", "Atletico Madrid"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 208,
    name: "Conor Gallagher",
    clubs: [
      "Chelsea",
      "Crystal Palace",
      "West Bromwich Albion",
      "Swansea City",
      "Charlton Athletic",
      "Atletico Madrid",
    ],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 209,
    name: "Alexander Sorloth",
    clubs: [
      "Rosenborg",
      "FC Midtjylland",
      "Crystal Palace",
      "Gent",
      "Trabzonspor",
      "RB Leipzig",
      "Real Sociedad",
      "Villarreal",
      "Atletico Madrid",
    ],
    nationality: "Norway",
    position: "Forward",
  },
  {
    id: 210,
    name: "Robin Le Normand",
    clubs: ["Real Sociedad", "Atletico Madrid"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 211,
    name: "Clement Lenglet",
    clubs: ["Nancy", "Sevilla", "Barcelona", "Tottenham", "Atletico Madrid"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 212,
    name: "Joao Neves",
    clubs: ["Benfica", "Paris Saint-Germain"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 213,
    name: "Desire Doue",
    clubs: ["Rennes", "Paris Saint-Germain"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 214,
    name: "Matvey Safonov",
    clubs: ["FK Krasnodar", "Paris Saint-Germain"],
    nationality: "Russia",
    position: "Goalkeeper",
  },
  {
    id: 215,
    name: "Willian Pacho",
    clubs: ["Independiente del Valle", "Royal Antwerp", "Eintracht Frankfurt", "Paris Saint-Germain"],
    nationality: "Ecuador",
    position: "Defender",
  },
  {
    id: 216,
    name: "Michael Olise",
    clubs: ["Chelsea", "Reading", "Crystal Palace", "Bayern Munich"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 217,
    name: "Joao Palhinha",
    clubs: ["Sporting CP", "Braga", "Fulham", "Bayern Munich"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 218,
    name: "Hiroki Ito",
    clubs: ["Jubilo Iwata", "VfB Stuttgart", "Bayern Munich"],
    nationality: "Japan",
    position: "Defender",
  },
  {
    id: 219,
    name: "Savinho",
    clubs: ["Atletico Mineiro", "PSV", "Girona", "Manchester City"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 220,
    name: "Ilkay Gundogan",
    clubs: ["VfL Bochum", "1. FC Nurnberg", "Borussia Dortmund", "Manchester City", "Barcelona", "Manchester City"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 221,
    name: "Omar Marmoush",
    clubs: ["Wadi Degla", "VfL Wolfsburg", "FC St. Pauli", "Eintracht Frankfurt"],
    nationality: "Egypt",
    position: "Forward",
  },
  {
    id: 222,
    name: "Hugo Ekitike",
    clubs: ["Reims", "Paris Saint-Germain", "Eintracht Frankfurt"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 223,
    name: "Arthur Theate",
    clubs: ["KV Oostende", "Bologna", "Rennes", "Eintracht Frankfurt"],
    nationality: "Belgium",
    position: "Defender",
  },
  {
    id: 224,
    name: "Can Uzun",
    clubs: ["1. FC Nurnberg", "Eintracht Frankfurt"],
    nationality: "Turkey",
    position: "Forward",
  },
  {
    id: 225,
    name: "Teun Koopmeiners",
    clubs: ["AZ Alkmaar", "Atalanta", "Juventus"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 226,
    name: "Nico Gonzalez",
    clubs: ["Argentinos Juniors", "VfB Stuttgart", "Fiorentina", "Juventus"],
    nationality: "Argentina",
    position: "Winger",
  },
  {
    id: 227,
    name: "Francisco Conceicao",
    clubs: ["FC Porto", "Ajax", "Juventus"],
    nationality: "Portugal",
    position: "Winger",
  },
  {
    id: 228,
    name: "Pierre Kalulu",
    clubs: ["Lyon", "AC Milan", "Juventus"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 229,
    name: "Khephren Thuram",
    clubs: ["AS Monaco", "Nice", "Juventus"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 230,
    name: "Douglas Luiz",
    clubs: ["Vasco da Gama", "Manchester City", "Girona", "Aston Villa", "Juventus"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 231,
    name: "Michele Di Gregorio",
    clubs: ["Inter Milan", "Renate", "Pordenone", "Monza", "Juventus"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 232,
    name: "Strahinja Pavlovic",
    clubs: ["Partizan", "AS Monaco", "VfL Wolfsburg", "Red Bull Salzburg", "AC Milan"],
    nationality: "Serbia",
    position: "Defender",
  },
  {
    id: 233,
    name: "Emerson Royal",
    clubs: ["Atletico Mineiro", "Ponte Preta", "Barcelona", "Real Betis", "Tottenham", "AC Milan"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 234,
    name: "Youssouf Fofana",
    clubs: ["Strasbourg", "AS Monaco", "AC Milan"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 235,
    name: "Ruben Loftus-Cheek",
    clubs: ["Chelsea", "Crystal Palace", "Fulham", "AC Milan"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 236,
    name: "Tijjani Reijnders",
    clubs: ["PEC Zwolle", "RKC Waalwijk", "AZ Alkmaar", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 237,
    name: "Piotr Zielinski",
    clubs: ["Zagłębie Lubin", "Udinese", "Empoli", "Napoli", "Inter Milan"],
    nationality: "Poland",
    position: "Midfielder",
  },
  {
    id: 238,
    name: "Josep Martinez",
    clubs: ["Las Palmas", "RB Leipzig", "Genoa", "Inter Milan"],
    nationality: "Spain",
    position: "Goalkeeper",
  },
  {
    id: 239,
    name: "Luka Sucic",
    clubs: ["Red Bull Salzburg", "Real Sociedad"],
    nationality: "Croatia",
    position: "Midfielder",
  },
  {
    id: 240,
    name: "Sergio Gomez",
    clubs: ["Barcelona", "Borussia Dortmund", "Huesca", "Anderlecht", "Manchester City", "Real Sociedad"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 241,
    name: "Nayef Aguerd",
    clubs: ["Dijon", "Rennes", "West Ham United", "Real Sociedad"],
    nationality: "Morocco",
    position: "Defender",
  },
  {
    id: 242,
    name: "Orri Oskarsson",
    clubs: ["FC Copenhagen", "Real Sociedad"],
    nationality: "Iceland",
    position: "Forward",
  },
  {
    id: 243,
    name: "Takefusa Kubo",
    clubs: ["FC Tokyo", "Real Madrid", "Mallorca", "Villarreal", "Getafe", "Real Sociedad"],
    nationality: "Japan",
    position: "Winger",
  },
  {
    id: 244,
    name: "Dani Ceballos",
    clubs: ["Real Betis", "Real Madrid", "Arsenal", "Real Betis"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 245,
    name: "Giovani Lo Celso",
    clubs: ["Rosario Central", "Paris Saint-Germain", "Real Betis", "Tottenham", "Villarreal", "Real Betis"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: 246,
    name: "Vitor Roque",
    clubs: ["Cruzeiro", "Athletico Paranaense", "Barcelona", "Real Betis"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 247,
    name: "Cedric Bakambu",
    clubs: ["Sochaux", "Bursaspor", "Villarreal", "Beijing Guoan", "Marseille", "Real Betis"],
    nationality: "DR Congo",
    position: "Forward",
  },
  {
    id: 248,
    name: "Romain Perraud",
    clubs: ["Nice", "Brest", "Southampton", "Real Betis"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 249,
    name: "Diego Llorente",
    clubs: ["Real Madrid", "Malaga", "Real Sociedad", "Leeds United", "AS Roma", "Real Betis"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 250,
    name: "Ayoze Perez",
    clubs: ["Tenerife", "Newcastle United", "Leicester City", "Real Betis"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: 251,
    name: "Isco",
    clubs: ["Valencia", "Malaga", "Real Madrid", "Sevilla", "Real Betis"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 252,
    name: "William Carvalho",
    clubs: ["Sporting CP", "West Ham United", "Real Betis"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 253,
    name: "Guido Rodriguez",
    clubs: ["River Plate", "Tijuana", "America", "Real Betis", "West Ham United"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: 254,
    name: "Niclas Fullkrug",
    clubs: ["Werder Bremen", "Hannover 96", "Borussia Dortmund", "West Ham United"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 255,
    name: "Max Kilman",
    clubs: ["Maidenhead United", "Wolverhampton Wanderers", "West Ham United"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 256,
    name: "Crysencio Summerville",
    clubs: ["Feyenoord", "ADO Den Haag", "Leeds United", "West Ham United"],
    nationality: "Netherlands",
    position: "Winger",
  },
  {
    id: 257,
    name: "Jean-Clair Todibo",
    clubs: ["Toulouse", "Barcelona", "Schalke 04", "Benfica", "Nice", "West Ham United"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 258,
    name: "Aaron Wan-Bissaka",
    clubs: ["Crystal Palace", "Manchester United", "West Ham United"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 259,
    name: "Carlos Soler",
    clubs: ["Valencia", "Paris Saint-Germain", "West Ham United"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 260,
    name: "Wes Foderingham",
    clubs: ["Crystal Palace", "Swindon Town", "Rangers", "Sheffield United", "West Ham United"],
    nationality: "England",
    position: "Goalkeeper",
  },
  {
    id: 261,
    name: "Luis Guilherme",
    clubs: ["Palmeiras", "West Ham United"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 262,
    name: "Archie Gray",
    clubs: ["Leeds United", "Tottenham"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 263,
    name: "Dominic Solanke",
    clubs: ["Chelsea", "Vitesse", "Brighton", "Liverpool", "Bournemouth", "Tottenham"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 264,
    name: "Wilson Odobert",
    clubs: ["Paris Saint-Germain", "Troyes", "Burnley", "Tottenham"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: 265,
    name: "Lucas Bergvall",
    clubs: ["Djurgardens IF", "Tottenham"],
    nationality: "Sweden",
    position: "Midfielder",
  },
  {
    id: 266,
    name: "Yang Min-hyeok",
    clubs: ["Gangwon FC", "Tottenham"],
    nationality: "South Korea",
    position: "Winger",
  },
  {
    id: 267,
    name: "Antonin Kinsky",
    clubs: ["Sparta Prague", "Tottenham"],
    nationality: "Czech Republic",
    position: "Goalkeeper",
  },
  {
    id: 268,
    name: "Pedro Porro",
    clubs: ["Girona", "Manchester City", "Real Valladolid", "Sporting CP", "Tottenham"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 269,
    name: "Micky van de Ven",
    clubs: ["FC Volendam", "VfL Wolfsburg", "Tottenham"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 270,
    name: "Guglielmo Vicario",
    clubs: ["Venezia", "Cagliari", "Empoli", "Tottenham"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 271,
    name: "James Maddison",
    clubs: ["Coventry City", "Norwich City", "Aberdeen", "Leicester City", "Tottenham"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 272,
    name: "Manor Solomon",
    clubs: ["Maccabi Petah Tikva", "Shakhtar Donetsk", "Fulham", "Tottenham"],
    nationality: "Israel",
    position: "Winger",
  },
  {
    id: 273,
    name: "Brennan Johnson",
    clubs: ["Nottingham Forest", "Lincoln City", "Tottenham"],
    nationality: "Wales",
    position: "Winger",
  },
  {
    id: 274,
    name: "Radu Dragusin",
    clubs: ["Juventus", "Salernitana", "Sampdoria", "Genoa", "Tottenham"],
    nationality: "Romania",
    position: "Defender",
  },
  {
    id: 275,
    name: "Djed Spence",
    clubs: ["Fulham", "Middlesbrough", "Nottingham Forest", "Tottenham", "Leeds United", "Genoa"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 276,
    name: "Fraser Forster",
    clubs: ["Newcastle United", "Norwich City", "Celtic", "Southampton", "Tottenham"],
    nationality: "England",
    position: "Goalkeeper",
  },
  {
    id: 277,
    name: "Sergio Reguilon",
    clubs: ["Real Madrid", "Sevilla", "Tottenham", "Atletico Madrid", "Manchester United", "Brentford"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 278,
    name: "Emile Smith Rowe",
    clubs: ["Arsenal", "RB Leipzig", "Huddersfield Town", "Fulham"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 279,
    name: "Alex Iwobi",
    clubs: ["Arsenal", "Everton", "Fulham"],
    nationality: "Nigeria",
    position: "Midfielder",
  },
  {
    id: 280,
    name: "Joachim Andersen",
    clubs: ["FC Twente", "Sampdoria", "Lyon", "Crystal Palace", "Fulham"],
    nationality: "Denmark",
    position: "Defender",
  },
  {
    id: 281,
    name: "Ryan Sessegnon",
    clubs: ["Fulham", "Tottenham", "Hoffenheim", "Fulham"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 282,
    name: "Reiss Nelson",
    clubs: ["Arsenal", "Hoffenheim", "Feyenoord", "Fulham"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: 283,
    name: "Jorge Cuenca",
    clubs: ["Barcelona", "Almeria", "Getafe", "Villarreal", "Fulham"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 284,
    name: "Sander Berge",
    clubs: ["Valerenga", "Genk", "Sheffield United", "Burnley", "Fulham"],
    nationality: "Norway",
    position: "Midfielder",
  },
  {
    id: 285,
    name: "Armando Broja",
    clubs: ["Chelsea", "Vitesse", "Southampton", "Fulham"],
    nationality: "Albania",
    position: "Forward",
  },
  {
    id: 286,
    name: "Calvin Bassey",
    clubs: ["Leicester City", "Rangers", "Ajax", "Fulham"],
    nationality: "Nigeria",
    position: "Defender",
  },
  {
    id: 287,
    name: "Timothy Castagne",
    clubs: ["Genk", "Atalanta", "Leicester City", "Fulham"],
    nationality: "Belgium",
    position: "Defender",
  },
  {
    id: 288,
    name: "Adama Traore",
    clubs: ["Barcelona", "Aston Villa", "Middlesbrough", "Wolverhampton Wanderers", "Barcelona", "Fulham"],
    nationality: "Spain",
    position: "Winger",
  },
  {
    id: 289,
    name: "Harrison Reed",
    clubs: ["Southampton", "Norwich City", "Blackburn Rovers", "Fulham"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 290,
    name: "Tom Cairney",
    clubs: ["Hull City", "Blackburn Rovers", "Fulham"],
    nationality: "Scotland",
    position: "Midfielder",
  },
  {
    id: 291,
    name: "Rodrigo Muniz",
    clubs: ["Flamengo", "Fulham"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 292,
    name: "Marco Silva",
    clubs: ["Sporting CP", "Olympiacos", "Hull City", "Watford", "Everton", "Fulham"],
    nationality: "Portugal",
    position: "Manager",
  },
  {
    id: 293,
    name: "Bernd Leno",
    clubs: ["VfB Stuttgart", "Bayer Leverkusen", "Arsenal", "Fulham"],
    nationality: "Germany",
    position: "Goalkeeper",
  },
  {
    id: 294,
    name: "Willian",
    clubs: ["Corinthians", "Shakhtar Donetsk", "Anzhi Makhachkala", "Chelsea", "Arsenal", "Fulham"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 295,
    name: "Kenny Tete",
    clubs: ["Ajax", "Lyon", "Fulham"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 296,
    name: "Antonee Robinson",
    clubs: ["Everton", "Wigan Athletic", "Bolton Wanderers", "Fulham"],
    nationality: "USA",
    position: "Defender",
  },
  {
    id: 297,
    name: "Bobby Decordova-Reid",
    clubs: ["Bristol City", "Cardiff City", "Fulham"],
    nationality: "Jamaica",
    position: "Forward",
  },
  {
    id: 298,
    name: "Tosin Adarabioyo",
    clubs: ["Manchester City", "West Bromwich Albion", "Blackburn Rovers", "Fulham", "Chelsea"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 299,
    name: "Andreas Pereira",
    clubs: ["Manchester United", "Granada", "Valencia", "Lazio", "Flamengo", "Fulham"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 300,
    name: "Raul Jimenez",
    clubs: ["Club America", "Atletico Madrid", "Benfica", "Wolverhampton Wanderers", "Fulham"],
    nationality: "Mexico",
    position: "Forward",
  },

  // More Well-Known Legends and Current Stars (301-400)
  {
    id: 301,
    name: "Pele",
    clubs: ["Santos", "New York Cosmos"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 302,
    name: "Diego Maradona",
    clubs: ["Argentinos Juniors", "Boca Juniors", "Barcelona", "Napoli", "Sevilla"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 303,
    name: "Johan Cruyff",
    clubs: ["Ajax", "Barcelona", "Los Angeles Aztecs", "Washington Diplomats", "Levante", "Feyenoord"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 304,
    name: "Franz Beckenbauer",
    clubs: ["Bayern Munich", "New York Cosmos", "Hamburger SV"],
    nationality: "Germany",
    position: "Defender",
  },
  {
    id: 305,
    name: "Michel Platini",
    clubs: ["Nancy", "Saint-Etienne", "Juventus"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 306,
    name: "George Best",
    clubs: ["Manchester United", "Fulham", "Los Angeles Aztecs", "Fort Lauderdale Strikers", "San Jose Earthquakes"],
    nationality: "Northern Ireland",
    position: "Winger",
  },
  {
    id: 307,
    name: "Alfredo Di Stefano",
    clubs: ["River Plate", "Huracán", "Real Madrid", "Espanyol"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 308,
    name: "Ferenc Puskas",
    clubs: ["Kispest", "Honved", "Real Madrid"],
    nationality: "Hungary",
    position: "Forward",
  },
  {
    id: 309,
    name: "Eusebio",
    clubs: ["Sporting Lourenço Marques", "Benfica", "Boston Minutemen", "Toronto Metros-Croatia"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 310,
    name: "Gerd Muller",
    clubs: ["Bayern Munich", "Fort Lauderdale Strikers"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 311,
    name: "Marco van Basten",
    clubs: ["Ajax", "AC Milan"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 312,
    name: "Ruud Gullit",
    clubs: ["HFC Haarlem", "Feyenoord", "PSV", "AC Milan", "Sampdoria", "Chelsea"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 313,
    name: "Frank Rijkaard",
    clubs: ["Ajax", "Sporting CP", "Real Zaragoza", "AC Milan"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 314,
    name: "Roberto Carlos",
    clubs: ["União São João", "Palmeiras", "Inter Milan", "Real Madrid", "Fenerbahce", "Corinthians", "Anzhi"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 315,
    name: "Cafu",
    clubs: ["São Paulo", "Real Zaragoza", "Palmeiras", "AS Roma", "AC Milan"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 316,
    name: "Paolo Maldini",
    clubs: ["AC Milan"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 317,
    name: "Franco Baresi",
    clubs: ["AC Milan"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 318,
    name: "Lothar Matthaus",
    clubs: ["Borussia Monchengladbach", "Bayern Munich", "Inter Milan", "New York MetroStars"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 319,
    name: "Ruud van Nistelrooy",
    clubs: ["Den Bosch", "Heerenveen", "PSV", "Manchester United", "Real Madrid", "Hamburger SV", "Malaga"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 320,
    name: "Patrick Vieira",
    clubs: ["Cannes", "AC Milan", "Arsenal", "Juventus", "Inter Milan", "Manchester City", "New York City FC"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 321,
    name: "Claude Makelele",
    clubs: ["Nantes", "Marseille", "Celta Vigo", "Real Madrid", "Chelsea", "Paris Saint-Germain"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 322,
    name: "Zinedine Zidane",
    clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 323,
    name: "Fabio Cannavaro",
    clubs: ["Napoli", "Parma", "Inter Milan", "Juventus", "Real Madrid", "Al Ahli"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 324,
    name: "Gianluigi Buffon",
    clubs: ["Parma", "Juventus", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 325,
    name: "Oliver Kahn",
    clubs: ["Karlsruher SC", "Bayern Munich"],
    nationality: "Germany",
    position: "Goalkeeper",
  },
  {
    id: 326,
    name: "Edwin van der Sar",
    clubs: ["Ajax", "Juventus", "Fulham", "Manchester United"],
    nationality: "Netherlands",
    position: "Goalkeeper",
  },
  {
    id: 327,
    name: "Peter Schmeichel",
    clubs: [
      "Gladsaxe-Hero",
      "Hvidovre",
      "Brondby",
      "Manchester United",
      "Sporting CP",
      "Aston Villa",
      "Manchester City",
    ],
    nationality: "Denmark",
    position: "Goalkeeper",
  },
  {
    id: 328,
    name: "Rui Costa",
    clubs: ["Benfica", "Fiorentina", "AC Milan"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 329,
    name: "Hernan Crespo",
    clubs: ["River Plate", "Parma", "Lazio", "Inter Milan", "Chelsea", "AC Milan", "Genoa"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 330,
    name: "Gabriel Batistuta",
    clubs: ["Newell's Old Boys", "River Plate", "Boca Juniors", "Fiorentina", "AS Roma", "Inter Milan", "Al Arabi"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 331,
    name: "Dennis Bergkamp",
    clubs: ["Ajax", "Inter Milan", "Arsenal"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 332,
    name: "Alan Shearer",
    clubs: ["Southampton", "Blackburn Rovers", "Newcastle United"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 333,
    name: "Eric Cantona",
    clubs: [
      "Auxerre",
      "Martigues",
      "Marseille",
      "Bordeaux",
      "Montpellier",
      "Nimes",
      "Leeds United",
      "Manchester United",
    ],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 334,
    name: "Ryan Giggs",
    clubs: ["Manchester United"],
    nationality: "Wales",
    position: "Winger",
  },
  {
    id: 335,
    name: "Roy Keane",
    clubs: ["Cobh Ramblers", "Nottingham Forest", "Manchester United", "Celtic"],
    nationality: "Ireland",
    position: "Midfielder",
  },
  {
    id: 336,
    name: "Patrick Kluivert",
    clubs: ["Ajax", "AC Milan", "Barcelona", "Newcastle United", "Valencia", "PSV", "Lille"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 337,
    name: "Edgar Davids",
    clubs: ["Ajax", "AC Milan", "Juventus", "Barcelona", "Inter Milan", "Tottenham", "Crystal Palace"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: 338,
    name: "Rivaldo",
    clubs: [
      "Santa Cruz",
      "Mogi Mirim",
      "Corinthians",
      "Palmeiras",
      "Deportivo La Coruna",
      "Barcelona",
      "AC Milan",
      "Olympiacos",
      "AEK Athens",
      "Bunyodkor",
      "São Paulo",
      "Kabuscorp",
      "Mogi Mirim",
    ],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 339,
    name: "Romario",
    clubs: [
      "Vasco da Gama",
      "PSV",
      "Barcelona",
      "Flamengo",
      "Valencia",
      "Fluminense",
      "Al Sadd",
      "Miami FC",
      "Adelaide United",
    ],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 340,
    name: "Bebeto",
    clubs: [
      "Vitoria",
      "Flamengo",
      "Vasco da Gama",
      "Deportivo La Coruna",
      "Sevilla",
      "Cruzeiro",
      "Botafogo",
      "Toros Neza",
      "Kashima Antlers",
      "Al Ittihad",
    ],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 341,
    name: "Careca",
    clubs: ["Guarani", "São Paulo", "Napoli", "Hitachi", "Santos", "Leece"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 342,
    name: "Socrates",
    clubs: ["Botafogo-SP", "Corinthians", "Fiorentina", "Flamengo", "Santos", "Garforth Town"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 343,
    name: "Zico",
    clubs: ["Flamengo", "Udinese", "Kashima Antlers"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 344,
    name: "Jairzinho",
    clubs: ["Botafogo", "Marseille", "Cruzeiro", "Portuguesa", "Independiente Medellin"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 345,
    name: "Carlos Valderrama",
    clubs: [
      "Unión Magdalena",
      "Millonarios",
      "Deportivo Cali",
      "Montpellier",
      "Real Valladolid",
      "Independiente Medellín",
      "Atlético Junior",
      "Tampa Bay Mutiny",
      "Colorado Rapids",
      "Chicago Fire",
    ],
    nationality: "Colombia",
    position: "Midfielder",
  },
  {
    id: 346,
    name: "Hugo Sanchez",
    clubs: ["UNAM", "Atlético Madrid", "Real Madrid", "Rayo Vallecano", "América", "Atlante", "Linz", "Dallas Burn"],
    nationality: "Mexico",
    position: "Forward",
  },
  {
    id: 347,
    name: "Gheorghe Hagi",
    clubs: [
      "Farul Constanta",
      "Sportul Studentesc",
      "Steaua Bucharest",
      "Real Madrid",
      "Brescia",
      "Barcelona",
      "Galatasaray",
    ],
    nationality: "Romania",
    position: "Midfielder",
  },
  {
    id: 348,
    name: "Hristo Stoichkov",
    clubs: ["CSKA Sofia", "Barcelona", "Parma", "Al Nassr", "Kashiwa Reysol", "Chicago Fire", "DC United"],
    nationality: "Bulgaria",
    position: "Forward",
  },
  {
    id: 349,
    name: "Davor Suker",
    clubs: ["Osijek", "Dinamo Zagreb", "Sevilla", "Real Madrid", "Arsenal", "West Ham United", "1860 Munich"],
    nationality: "Croatia",
    position: "Forward",
  },
  {
    id: 350,
    name: "Roberto Baggio",
    clubs: ["Vicenza", "Fiorentina", "Juventus", "AC Milan", "Bologna", "Inter Milan", "Brescia"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 351,
    name: "Francesco Totti",
    clubs: ["AS Roma"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 352,
    name: "Alessandro Del Piero",
    clubs: ["Juventus", "Sydney FC"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 353,
    name: "Gianluca Vialli",
    clubs: ["Cremonese", "Sampdoria", "Juventus", "Chelsea"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 354,
    name: "Roberto Mancini",
    clubs: ["Bologna", "Sampdoria", "Lazio", "Leicester City"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 355,
    name: "Gianni Rivera",
    clubs: ["Alessandria", "AC Milan"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 356,
    name: "Sandro Mazzola",
    clubs: ["Inter Milan"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 357,
    name: "Giancarlo Antognoni",
    clubs: ["Fiorentina"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 358,
    name: "Dino Zoff",
    clubs: ["Udinese", "Mantova", "Napoli", "Juventus"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 359,
    name: "Gaetano Scirea",
    clubs: ["Atalanta", "Juventus"],
    nationality: "Italy",
    position: "Defender",
  },
  {
    id: 360,
    name: "Giancarlo Vialli",
    clubs: ["Cremonese", "Sampdoria", "Juventus", "Chelsea"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 361,
    name: "Kenny Dalglish",
    clubs: ["Celtic", "Liverpool"],
    nationality: "Scotland",
    position: "Forward",
  },
  {
    id: 362,
    name: "Kevin Keegan",
    clubs: ["Scunthorpe United", "Liverpool", "Hamburger SV", "Southampton", "Newcastle United"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 363,
    name: "Gary Lineker",
    clubs: ["Leicester City", "Everton", "Barcelona", "Tottenham", "Nagoya Grampus"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 364,
    name: "Glenn Hoddle",
    clubs: ["Tottenham", "AS Monaco", "Swindon Town", "Chelsea"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 365,
    name: "Bryan Robson",
    clubs: ["West Bromwich Albion", "Manchester United", "Middlesbrough"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 366,
    name: "Peter Beardsley",
    clubs: [
      "Carlisle United",
      "Vancouver Whitecaps",
      "Newcastle United",
      "Liverpool",
      "Everton",
      "Bolton Wanderers",
      "Manchester City",
      "Fulham",
      "Hartlepool United",
      "Boston United",
    ],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 367,
    name: "John Barnes",
    clubs: ["Watford", "Liverpool", "Newcastle United", "Charlton Athletic"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: 368,
    name: "Ian Rush",
    clubs: [
      "Chester City",
      "Liverpool",
      "Juventus",
      "Leeds United",
      "Newcastle United",
      "Sheffield United",
      "Wrexham",
      "Sydney Olympic",
    ],
    nationality: "Wales",
    position: "Forward",
  },
  {
    id: 369,
    name: "Mark Hughes",
    clubs: ["Manchester United", "Barcelona", "Bayern Munich", "Chelsea", "Southampton", "Everton", "Blackburn Rovers"],
    nationality: "Wales",
    position: "Forward",
  },
  {
    id: 370,
    name: "Liam Brady",
    clubs: ["Arsenal", "Juventus", "Sampdoria", "Inter Milan", "Ascoli", "West Ham United"],
    nationality: "Ireland",
    position: "Midfielder",
  },
  {
    id: 371,
    name: "Paul McGrath",
    clubs: ["St Patrick's Athletic", "Manchester United", "Aston Villa", "Derby County", "Sheffield United"],
    nationality: "Ireland",
    position: "Defender",
  },
  {
    id: 372,
    name: "Robbie Keane",
    clubs: [
      "Wolverhampton Wanderers",
      "Coventry City",
      "Inter Milan",
      "Leeds United",
      "Tottenham",
      "Liverpool",
      "West Ham United",
      "LA Galaxy",
      "Aston Villa",
      "ATK",
    ],
    nationality: "Ireland",
    position: "Forward",
  },
  {
    id: 373,
    name: "Damien Duff",
    clubs: ["Blackburn Rovers", "Chelsea", "Newcastle United", "Fulham", "Melbourne City", "Shamrock Rovers"],
    nationality: "Ireland",
    position: "Winger",
  },
  {
    id: 374,
    name: "Shay Given",
    clubs: [
      "Celtic",
      "Blackburn Rovers",
      "Swindon Town",
      "Sunderland",
      "Newcastle United",
      "Manchester City",
      "Aston Villa",
      "Middlesbrough",
      "Stoke City",
    ],
    nationality: "Ireland",
    position: "Goalkeeper",
  },
  {
    id: 375,
    name: "Landon Donovan",
    clubs: ["Bayer Leverkusen", "San Jose Earthquakes", "LA Galaxy", "Bayern Munich", "Everton", "Club León"],
    nationality: "USA",
    position: "Midfielder",
  },
  {
    id: 376,
    name: "Clint Dempsey",
    clubs: ["New England Revolution", "Fulham", "Tottenham", "Seattle Sounders"],
    nationality: "USA",
    position: "Forward",
  },
  {
    id: 377,
    name: "Tim Howard",
    clubs: ["North Jersey Imperials", "MetroStars", "Manchester United", "Everton", "Colorado Rapids", "Memphis 901"],
    nationality: "USA",
    position: "Goalkeeper",
  },
  {
    id: 378,
    name: "Carlos Vela",
    clubs: ["Arsenal", "Salamanca", "Osasuna", "West Bromwich Albion", "Real Sociedad", "LAFC"],
    nationality: "Mexico",
    position: "Forward",
  },
  {
    id: 379,
    name: "Javier Hernandez",
    clubs: [
      "Guadalajara",
      "Manchester United",
      "Real Madrid",
      "Bayer Leverkusen",
      "West Ham United",
      "Sevilla",
      "LA Galaxy",
    ],
    nationality: "Mexico",
    position: "Forward",
  },
  {
    id: 380,
    name: "Rafa Marquez",
    clubs: ["Atlas", "AS Monaco", "Barcelona", "New York Red Bulls", "Hellas Verona", "León"],
    nationality: "Mexico",
    position: "Defender",
  },
  {
    id: 381,
    name: "Cuauhtemoc Blanco",
    clubs: ["Club América", "Real Valladolid", "Chicago Fire", "Puebla", "Irapuato", "Dorados", "Lobos BUAP"],
    nationality: "Mexico",
    position: "Forward",
  },
  {
    id: 382,
    name: "Claudio Reyna",
    clubs: [
      "Virginia Cavaliers",
      "Bayer Leverkusen",
      "VfL Wolfsburg",
      "Rangers",
      "Sunderland",
      "Manchester City",
      "New York Red Bulls",
    ],
    nationality: "USA",
    position: "Midfielder",
  },
  {
    id: 383,
    name: "Alexi Lalas",
    clubs: [
      "Rutgers Scarlet Knights",
      "Padova",
      "New England Revolution",
      "MetroStars",
      "Kansas City Wizards",
      "Los Angeles Galaxy",
      "San Jose Earthquakes",
    ],
    nationality: "USA",
    position: "Defender",
  },
  {
    id: 384,
    name: "Cobi Jones",
    clubs: ["UCLA Bruins", "Coventry City", "Vasco da Gama", "Los Angeles Galaxy"],
    nationality: "USA",
    position: "Midfielder",
  },
  {
    id: 385,
    name: "Tab Ramos",
    clubs: ["NC State Wolfpack", "Figueirense", "Real Betis", "Tigres UANL", "MetroStars"],
    nationality: "USA",
    position: "Midfielder",
  },
  {
    id: 386,
    name: "Hidetoshi Nakata",
    clubs: ["Bellmare Hiratsuka", "Perugia", "AS Roma", "Parma", "Bologna", "Fiorentina"],
    nationality: "Japan",
    position: "Midfielder",
  },
  {
    id: 387,
    name: "Shinji Kagawa",
    clubs: [
      "Cerezo Osaka",
      "Borussia Dortmund",
      "Manchester United",
      "Besiktas",
      "Real Zaragoza",
      "PAOK",
      "Sint-Truiden",
    ],
    nationality: "Japan",
    position: "Midfielder",
  },
  {
    id: 388,
    name: "Shinji Okazaki",
    clubs: ["Shimizu S-Pulse", "VfB Stuttgart", "Mainz 05", "Leicester City", "Malaga", "SD Huesca", "FC Cartagena"],
    nationality: "Japan",
    position: "Forward",
  },
  {
    id: 389,
    name: "Juninho Pernambucano",
    clubs: ["Sport Recife", "Vasco da Gama", "Lyon", "New York Red Bulls", "Al Gharafa"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 390,
    name: "Juninho Paulista",
    clubs: ["São Paulo", "Middlesbrough", "Atletico Madrid", "Palmeiras", "Celtic", "Flamengo", "Sydney FC"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 391,
    name: "Gilberto Silva",
    clubs: ["América Mineiro", "Arsenal", "Panathinaikos", "Grêmio", "Atlético Mineiro"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 392,
    name: "Emerson",
    clubs: ["Grêmio", "Bayer Leverkusen", "AS Roma", "Juventus", "Real Madrid", "AC Milan", "Santos"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 393,
    name: "Denilson",
    clubs: ["São Paulo", "Real Betis", "Bordeaux", "Arsenal", "Al Wahda", "FC Dallas"],
    nationality: "Brazil",
    position: "Winger",
  },
  {
    id: 394,
    name: "Edu",
    clubs: ["Corinthians", "Arsenal", "Valencia", "Stoke City"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 395,
    name: "Lucio",
    clubs: ["Internacional", "Bayer Leverkusen", "Bayern Munich", "Inter Milan", "Juventus", "São Paulo", "FC Goa"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 396,
    name: "Juan",
    clubs: ["Bayer Leverkusen", "AS Roma", "Liverpool"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 397,
    name: "Roque Junior",
    clubs: ["Palmeiras", "AC Milan", "Leeds United", "Siena", "Bayer Leverkusen", "MSV Duisburg", "Ituano"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 398,
    name: "Marcos",
    clubs: ["Palmeiras", "Coritiba", "Figueirense"],
    nationality: "Brazil",
    position: "Goalkeeper",
  },
  {
    id: 399,
    name: "Dida",
    clubs: ["Vitória", "Cruzeiro", "Corinthians", "AC Milan", "Internacional", "Grêmio", "Portuguesa"],
    nationality: "Brazil",
    position: "Goalkeeper",
  },
  {
    id: 400,
    name: "Claudio Taffarel",
    clubs: ["Internacional", "Parma", "Reggiana", "Atletico Mineiro", "Galatasaray"],
    nationality: "Brazil",
    position: "Goalkeeper",
  },
]

// MASSIVELY EXPANDED club pairs for more variety (200+ combinations)
export const CLUB_PAIRS: ClubPair[] = [
  // Premier League vs La Liga
  { id: 1, club1: "Manchester United", club2: "Real Madrid" },
  { id: 2, club1: "Arsenal", club2: "Barcelona" },
  { id: 3, club1: "Liverpool", club2: "Real Madrid" },
  { id: 4, club1: "Chelsea", club2: "Real Madrid" },
  { id: 5, club1: "Tottenham", club2: "Real Madrid" },
  { id: 6, club1: "Manchester City", club2: "Barcelona" },
  { id: 7, club1: "Chelsea", club2: "Barcelona" },
  { id: 8, club1: "Arsenal", club2: "Real Madrid" },
  { id: 9, club1: "Liverpool", club2: "Barcelona" },
  { id: 10, club1: "Manchester United", club2: "Barcelona" },

  // Premier League vs Serie A
  { id: 11, club1: "Chelsea", club2: "AC Milan" },
  { id: 12, club1: "Arsenal", club2: "AC Milan" },
  { id: 13, club1: "Manchester City", club2: "AC Milan" },
  { id: 14, club1: "Manchester United", club2: "Juventus" },
  { id: 15, club1: "Chelsea", club2: "Juventus" },
  { id: 16, club1: "Liverpool", club2: "AC Milan" },
  { id: 17, club1: "Chelsea", club2: "AS Roma" },
  { id: 18, club1: "Manchester United", club2: "Inter Milan" },
  { id: 19, club1: "Arsenal", club2: "Juventus" },
  { id: 20, club1: "Tottenham", club2: "Juventus" },

  // Premier League vs Bundesliga
  { id: 21, club1: "Manchester City", club2: "Bayern Munich" },
  { id: 22, club1: "Chelsea", club2: "Borussia Dortmund" },
  { id: 23, club1: "Arsenal", club2: "Bayer Leverkusen" },
  { id: 24, club1: "Manchester United", club2: "Borussia Dortmund" },
  { id: 25, club1: "Liverpool", club2: "Bayern Munich" },
  { id: 26, club1: "Chelsea", club2: "RB Leipzig" },
  { id: 27, club1: "Tottenham", club2: "Bayern Munich" },
  { id: 28, club1: "Manchester City", club2: "Borussia Dortmund" },

  // Premier League vs Ligue 1
  { id: 29, club1: "Chelsea", club2: "Paris Saint-Germain" },
  { id: 30, club1: "Manchester United", club2: "Paris Saint-Germain" },
  { id: 31, club1: "Arsenal", club2: "Paris Saint-Germain" },
  { id: 32, club1: "Liverpool", club2: "AS Monaco" },
  { id: 33, club1: "Manchester City", club2: "AS Monaco" },
  { id: 34, club1: "Tottenham", club2: "Lyon" },

  // La Liga vs Serie A
  { id: 35, club1: "Barcelona", club2: "AC Milan" },
  { id: 36, club1: "Real Madrid", club2: "AC Milan" },
  { id: 37, club1: "Barcelona", club2: "Juventus" },
  { id: 38, club1: "Real Madrid", club2: "Juventus" },
  { id: 39, club1: "Atletico Madrid", club2: "Juventus" },
  { id: 40, club1: "Barcelona", club2: "Inter Milan" },
  { id: 41, club1: "Real Madrid", club2: "Inter Milan" },
  { id: 42, club1: "Valencia", club2: "Inter Milan" },

  // La Liga vs Bundesliga
  { id: 43, club1: "Barcelona", club2: "Bayern Munich" },
  { id: 44, club1: "Real Madrid", club2: "Bayern Munich" },
  { id: 45, club1: "Atletico Madrid", club2: "Borussia Dortmund" },
  { id: 46, club1: "Barcelona", club2: "Borussia Dortmund" },
  { id: 47, club1: "Real Madrid", club2: "Borussia Dortmund" },

  // La Liga vs Ligue 1
  { id: 48, club1: "Barcelona", club2: "Paris Saint-Germain" },
  { id: 49, club1: "Real Madrid", club2: "Paris Saint-Germain" },
  { id: 50, club1: "Atletico Madrid", club2: "AS Monaco" },

  // Serie A vs Bundesliga
  { id: 51, club1: "Juventus", club2: "Bayern Munich" },
  { id: 52, club1: "AC Milan", club2: "Bayern Munich" },
  { id: 53, club1: "Inter Milan", club2: "Borussia Dortmund" },
  { id: 54, club1: "Juventus", club2: "Borussia Dortmund" },

  // Serie A vs Ligue 1
  { id: 55, club1: "AC Milan", club2: "Paris Saint-Germain" },
  { id: 56, club1: "Juventus", club2: "Paris Saint-Germain" },
  { id: 57, club1: "AS Roma", club2: "Paris Saint-Germain" },

  // Bundesliga vs Ligue 1
  { id: 58, club1: "Bayern Munich", club2: "Paris Saint-Germain" },
  { id: 59, club1: "Borussia Dortmund", club2: "Paris Saint-Germain" },

  // Within Premier League
  { id: 60, club1: "Arsenal", club2: "Chelsea" },
  { id: 61, club1: "Liverpool", club2: "Chelsea" },
  { id: 62, club1: "Manchester United", club2: "Manchester City" },
  { id: 63, club1: "Arsenal", club2: "Manchester City" },
  { id: 64, club1: "Chelsea", club2: "Manchester City" },
  { id: 65, club1: "Tottenham", club2: "Arsenal" },

  // Within La Liga
  { id: 66, club1: "Barcelona", club2: "Real Madrid" },
  { id: 67, club1: "Atletico Madrid", club2: "Real Madrid" },
  { id: 68, club1: "Barcelona", club2: "Atletico Madrid" },
  { id: 69, club1: "Valencia", club2: "Real Madrid" },
  { id: 70, club1: "Sevilla", club2: "Real Madrid" },

  // Within Serie A
  { id: 71, club1: "AC Milan", club2: "Juventus" },
  { id: 72, club1: "Inter Milan", club2: "AC Milan" },
  { id: 73, club1: "Inter Milan", club2: "Juventus" },
  { id: 74, club1: "AS Roma", club2: "Juventus" },
  { id: 75, club1: "Napoli", club2: "Juventus" },

  // Within Bundesliga
  { id: 76, club1: "Bayern Munich", club2: "Borussia Dortmund" },
  { id: 77, club1: "Bayern Munich", club2: "Schalke 04" },
  { id: 78, club1: "Borussia Dortmund", club2: "Schalke 04" },
  { id: 79, club1: "Bayern Munich", club2: "Bayer Leverkusen" },
  { id: 80, club1: "RB Leipzig", club2: "Bayern Munich" },

  // Portuguese League combinations
  { id: 81, club1: "Benfica", club2: "Manchester City" },
  { id: 82, club1: "Porto", club2: "Real Madrid" },
  { id: 83, club1: "Sporting CP", club2: "Manchester United" },
  { id: 84, club1: "Benfica", club2: "Barcelona" },
  { id: 85, club1: "Porto", club2: "Juventus" },

  // Dutch League combinations
  { id: 86, club1: "Ajax", club2: "Barcelona" },
  { id: 87, club1: "Ajax", club2: "Juventus" },
  { id: 88, club1: "Ajax", club2: "Real Madrid" },
  { id: 89, club1: "PSV", club2: "Barcelona" },
  { id: 90, club1: "Ajax", club2: "Manchester United" },

  // More cross-league combinations
  { id: 91, club1: "Leicester City", club2: "Chelsea" },
  { id: 92, club1: "West Ham United", club2: "Manchester United" },
  { id: 93, club1: "Southampton", club2: "Liverpool" },
  { id: 94, club1: "Everton", club2: "Manchester United" },
  { id: 95, club1: "Aston Villa", club2: "Manchester City" },
  { id: 96, club1: "Newcastle United", club2: "Real Sociedad" },
  { id: 97, club1: "Brighton", club2: "Tottenham" },
  { id: 98, club1: "Fulham", club2: "Tottenham" },
  { id: 99, club1: "Crystal Palace", club2: "Liverpool" },
  { id: 100, club1: "Wolverhampton Wanderers", club2: "Atletico Madrid" },

  // Additional 2024-2025 Season Club Pairs
  { id: 101, club1: "Real Madrid", club2: "AS Monaco" },
  { id: 102, club1: "Manchester United", club2: "Lille" },
  { id: 103, club1: "Arsenal", club2: "Bologna" },
  { id: 104, club1: "Manchester United", club2: "Bologna" },
  { id: 105, club1: "Barcelona", club2: "Real Madrid" },
  { id: 106, club1: "Atletico Madrid", club2: "Chelsea" },
  { id: 107, club1: "Atletico Madrid", club2: "Manchester City" },
  { id: 108, club1: "Paris Saint-Germain", club2: "Benfica" },
  { id: 109, club1: "Bayern Munich", club2: "Crystal Palace" },
  { id: 110, club1: "Bayern Munich", club2: "Fulham" },
  { id: 111, club1: "Manchester City", club2: "Girona" },
  { id: 112, club1: "Barcelona", club2: "Manchester City" },
  { id: 113, club1: "Eintracht Frankfurt", club2: "Paris Saint-Germain" },
  { id: 114, club1: "Eintracht Frankfurt", club2: "Reims" },
  { id: 115, club1: "Juventus", club2: "Atalanta" },
  { id: 116, club1: "Juventus", club2: "Fiorentina" },
  { id: 117, club1: "Juventus", club2: "AS Monaco" },
  { id: 118, club1: "Juventus", club2: "Manchester City" },
  { id: 119, club1: "Juventus", club2: "Lyon" },
  { id: 120, club1: "AC Milan", club2: "Atletico Madrid" },
  { id: 121, club1: "AC Milan", club2: "AS Monaco" },
  { id: 122, club1: "AC Milan", club2: "Tottenham" },
  { id: 123, club1: "AC Milan", club2: "Chelsea" },
  { id: 124, club1: "AC Milan", club2: "Fulham" },
  { id: 125, club1: "Inter Milan", club2: "Napoli" },
  { id: 126, club1: "Inter Milan", club2: "Porto" },
  { id: 127, club1: "Inter Milan", club2: "Genoa" },
  { id: 128, club1: "Inter Milan", club2: "RB Leipzig" },
  { id: 129, club1: "Real Sociedad", club2: "Borussia Dortmund" },
  { id: 130, club1: "Real Sociedad", club2: "Manchester City" },
  { id: 131, club1: "Real Sociedad", club2: "West Ham United" },
  { id: 132, club1: "Real Sociedad", club2: "Arsenal" },
  { id: 133, club1: "Real Betis", club2: "Barcelona" },
  { id: 134, club1: "Real Betis", club2: "Tottenham" },
  { id: 135, club1: "Real Betis", club2: "Arsenal" },
  { id: 136, club1: "Real Betis", club2: "West Ham United" },
  { id: 137, club1: "Real Betis", club2: "Southampton" },
  { id: 138, club1: "Real Betis", club2: "Leicester City" },
  { id: 139, club1: "West Ham United", club2: "Nice" },
  { id: 140, club1: "West Ham United", club2: "Barcelona" },
  { id: 141, club1: "West Ham United", club2: "Paris Saint-Germain" },
  { id: 142, club1: "West Ham United", club2: "Napoli" },
  { id: 143, club1: "West Ham United", club2: "Sheffield United" },
  { id: 144, club1: "Tottenham", club2: "Leeds United" },
  { id: 145, club1: "Tottenham", club2: "VfL Wolfsburg" },
  { id: 146, club1: "Tottenham", club2: "Empoli" },
  { id: 147, club1: "Tottenham", club2: "Nottingham Forest" },
  { id: 148, club1: "Tottenham", club2: "Genoa" },
  { id: 149, club1: "Tottenham", club2: "Brentford" },
  { id: 150, club1: "Tottenham", club2: "Hoffenheim" },
  { id: 151, club1: "Fulham", club2: "Arsenal" },
  { id: 152, club1: "Fulham", club2: "Everton" },
  { id: 153, club1: "Fulham", club2: "Leicester City" },
  { id: 154, club1: "Fulham", club2: "Ajax" },
  { id: 155, club1: "Fulham", club2: "Atalanta" },
  { id: 156, club1: "Fulham", club2: "Villarreal" },
  { id: 157, club1: "Fulham", club2: "Wolverhampton Wanderers" },
  { id: 158, club1: "Fulham", club2: "Southampton" },
  { id: 159, club1: "Fulham", club2: "Norwich City" },
  { id: 160, club1: "Brighton", club2: "Chelsea" },
  { id: 161, club1: "Brighton", club2: "Ajax" },
  { id: 162, club1: "Crystal Palace", club2: "Manchester United" },
  { id: 163, club1: "Crystal Palace", club2: "Lyon" },
  { id: 164, club1: "Brentford", club2: "Atletico Madrid" },
  { id: 165, club1: "Burnley", club2: "Paris Saint-Germain" },
  { id: 166, club1: "Sheffield United", club2: "Genk" },
  { id: 167, club1: "Leeds United", club2: "RB Leipzig" },
  { id: 168, club1: "Norwich City", club2: "Bayern Munich" },
  { id: 169, club1: "Southampton", club2: "Liverpool" },
  { id: 170, club1: "Leicester City", club2: "Atalanta" },
  { id: 171, club1: "Everton", club2: "Shakhtar Donetsk" },
  { id: 172, club1: "Newcastle United", club2: "Borussia Dortmund" },
  { id: 173, club1: "Aston Villa", club2: "Wolverhampton Wanderers" },
  { id: 174, club1: "Nottingham Forest", club2: "Middlesbrough" },
  { id: 175, club1: "Wolverhampton Wanderers", club2: "Barcelona" },
  { id: 176, club1: "Huddersfield Town", club2: "Arsenal" },
  { id: 177, club1: "Blackburn Rovers", club2: "Southampton" },
  { id: 178, club1: "Hull City", club2: "Fulham" },
  { id: 179, club1: "Coventry City", club2: "Leicester City" },
  { id: 180, club1: "Rangers", club2: "Ajax" },
  { id: 181, club1: "Celtic", club2: "Southampton" },
  { id: 182, club1: "Sparta Prague", club2: "Tottenham" },
  { id: 183, club1: "Djurgardens IF", club2: "Tottenham" },
  { id: 184, club1: "Gangwon FC", club2: "Tottenham" },
  { id: 185, club1: "FC Copenhagen", club2: "Real Sociedad" },
  { id: 186, club1: "Girona", club2: "Manchester City" },
  { id: 187, club1: "Troyes", club2: "Paris Saint-Germain" },
  { id: 188, club1: "Reims", club2: "Eintracht Frankfurt" },
  { id: 189, club1: "Nice", club2: "West Ham United" },
  { id: 190, club1: "Rennes", club2: "Paris Saint-Germain" },
  { id: 191, club1: "Strasbourg", club2: "AS Monaco" },
  { id: 192, club1: "Toulouse", club2: "Barcelona" },
  { id: 193, club1: "Schalke 04", club2: "Barcelona" },
  { id: 194, club1: "Werder Bremen", club2: "West Ham United" },
  { id: 195, club1: "Hannover 96", club2: "West Ham United" },
  { id: 196, club1: "VfB Stuttgart", club2: "Tottenham" },
  { id: 197, club1: "1. FC Nurnberg", club2: "Eintracht Frankfurt" },
  { id: 198, club1: "Red Bull Salzburg", club2: "AC Milan" },
  { id: 199, club1: "FK Krasnodar", club2: "Paris Saint-Germain" },
  { id: 200, club1: "Flamengo", club2: "Fulham" },
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

// Leaderboard with better error handling
export async function getLeaderboard(limit = 50): Promise<any[]> {
  try {
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
    return leaderboardData || []
  } catch (error) {
    console.error("Error in getLeaderboard:", error)
    return [] // Always return an array, never undefined
  }
}

// Add test leaderboard data function for debugging
export async function addTestLeaderboardData(): Promise<void> {
  try {
    // Create some test users and stats if none exist
    if (fallbackUserStats.size === 0) {
      const testUsers = [
        { username: "FootballFan1", correct: 25, total: 30 },
        { username: "QuizMaster", correct: 22, total: 28 },
        { username: "SoccerExpert", correct: 18, total: 25 },
        { username: "Guest1234", correct: 15, total: 22 },
        { username: "ChampionsLeague", correct: 12, total: 20 },
      ]

      for (const testUser of testUsers) {
        const userId = generateId()
        const user: User = {
          id: userId,
          username: testUser.username,
          is_guest: testUser.username.startsWith("Guest"),
          created_at: new Date().toISOString(),
        }

        fallbackUsers.set(userId, user)

        const mockSession: QuizSession = {
          id: generateId(),
          user_id: userId,
          username: testUser.username,
          correct_answers: testUser.correct,
          total_attempts: testUser.total,
          is_active: false,
          started_at: new Date().toISOString(),
          ended_at: new Date().toISOString(),
          used_questions: [],
        }

        await updateUserStats(userId, testUser.username, mockSession)
      }

      console.log("Test leaderboard data added successfully")
    }
  } catch (error) {
    console.error("Error adding test leaderboard data:", error)
  }
}
