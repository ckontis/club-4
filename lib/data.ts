export interface Player {
  id: string
  name: string
  clubs: string[]
  nationality: string
  position: string
}

export interface Club {
  id: string
  name: string
  logo: string
  country: string
  league: string
}

export interface ClubPair {
  club1: Club
  club2: Club
  players: Player[]
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
  usedQuestions: number[] // Track used question IDs
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

export const clubs: Club[] = [
  // Premier League
  {
    id: "arsenal",
    name: "Arsenal",
    logo: "/placeholder.svg?height=60&width=60&text=ARS",
    country: "England",
    league: "Premier League",
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "/placeholder.svg?height=60&width=60&text=CHE",
    country: "England",
    league: "Premier League",
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "/placeholder.svg?height=60&width=60&text=LIV",
    country: "England",
    league: "Premier League",
  },
  {
    id: "manchester-city",
    name: "Manchester City",
    logo: "/placeholder.svg?height=60&width=60&text=MCI",
    country: "England",
    league: "Premier League",
  },
  {
    id: "manchester-united",
    name: "Manchester United",
    logo: "/placeholder.svg?height=60&width=60&text=MUN",
    country: "England",
    league: "Premier League",
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logo: "/placeholder.svg?height=60&width=60&text=TOT",
    country: "England",
    league: "Premier League",
  },
  {
    id: "newcastle",
    name: "Newcastle United",
    logo: "/placeholder.svg?height=60&width=60&text=NEW",
    country: "England",
    league: "Premier League",
  },
  {
    id: "west-ham",
    name: "West Ham United",
    logo: "/placeholder.svg?height=60&width=60&text=WHU",
    country: "England",
    league: "Premier League",
  },
  {
    id: "leicester",
    name: "Leicester City",
    logo: "/placeholder.svg?height=60&width=60&text=LEI",
    country: "England",
    league: "Premier League",
  },
  {
    id: "everton",
    name: "Everton",
    logo: "/placeholder.svg?height=60&width=60&text=EVE",
    country: "England",
    league: "Premier League",
  },

  // La Liga
  {
    id: "real-madrid",
    name: "Real Madrid",
    logo: "/placeholder.svg?height=60&width=60&text=RMA",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    logo: "/placeholder.svg?height=60&width=60&text=BAR",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "atletico-madrid",
    name: "Atlético Madrid",
    logo: "/placeholder.svg?height=60&width=60&text=ATM",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "sevilla",
    name: "Sevilla",
    logo: "/placeholder.svg?height=60&width=60&text=SEV",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "valencia",
    name: "Valencia",
    logo: "/placeholder.svg?height=60&width=60&text=VAL",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "villarreal",
    name: "Villarreal",
    logo: "/placeholder.svg?height=60&width=60&text=VIL",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "real-sociedad",
    name: "Real Sociedad",
    logo: "/placeholder.svg?height=60&width=60&text=RSO",
    country: "Spain",
    league: "La Liga",
  },
  {
    id: "athletic-bilbao",
    name: "Athletic Bilbao",
    logo: "/placeholder.svg?height=60&width=60&text=ATH",
    country: "Spain",
    league: "La Liga",
  },

  // Serie A
  {
    id: "juventus",
    name: "Juventus",
    logo: "/placeholder.svg?height=60&width=60&text=JUV",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "ac-milan",
    name: "AC Milan",
    logo: "/placeholder.svg?height=60&width=60&text=MIL",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "inter-milan",
    name: "Inter Milan",
    logo: "/placeholder.svg?height=60&width=60&text=INT",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "napoli",
    name: "Napoli",
    logo: "/placeholder.svg?height=60&width=60&text=NAP",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "roma",
    name: "AS Roma",
    logo: "/placeholder.svg?height=60&width=60&text=ROM",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "lazio",
    name: "Lazio",
    logo: "/placeholder.svg?height=60&width=60&text=LAZ",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "atalanta",
    name: "Atalanta",
    logo: "/placeholder.svg?height=60&width=60&text=ATA",
    country: "Italy",
    league: "Serie A",
  },
  {
    id: "fiorentina",
    name: "Fiorentina",
    logo: "/placeholder.svg?height=60&width=60&text=FIO",
    country: "Italy",
    league: "Serie A",
  },

  // Bundesliga
  {
    id: "bayern-munich",
    name: "Bayern Munich",
    logo: "/placeholder.svg?height=60&width=60&text=BAY",
    country: "Germany",
    league: "Bundesliga",
  },
  {
    id: "borussia-dortmund",
    name: "Borussia Dortmund",
    logo: "/placeholder.svg?height=60&width=60&text=BVB",
    country: "Germany",
    league: "Bundesliga",
  },
  {
    id: "rb-leipzig",
    name: "RB Leipzig",
    logo: "/placeholder.svg?height=60&width=60&text=RBL",
    country: "Germany",
    league: "Bundesliga",
  },
  {
    id: "bayer-leverkusen",
    name: "Bayer Leverkusen",
    logo: "/placeholder.svg?height=60&width=60&text=B04",
    country: "Germany",
    league: "Bundesliga",
  },
  {
    id: "borussia-monchengladbach",
    name: "Borussia Mönchengladbach",
    logo: "/placeholder.svg?height=60&width=60&text=BMG",
    country: "Germany",
    league: "Bundesliga",
  },
  {
    id: "schalke",
    name: "Schalke 04",
    logo: "/placeholder.svg?height=60&width=60&text=S04",
    country: "Germany",
    league: "Bundesliga",
  },

  // Ligue 1
  {
    id: "psg",
    name: "Paris Saint-Germain",
    logo: "/placeholder.svg?height=60&width=60&text=PSG",
    country: "France",
    league: "Ligue 1",
  },
  {
    id: "marseille",
    name: "Marseille",
    logo: "/placeholder.svg?height=60&width=60&text=OM",
    country: "France",
    league: "Ligue 1",
  },
  {
    id: "lyon",
    name: "Lyon",
    logo: "/placeholder.svg?height=60&width=60&text=OL",
    country: "France",
    league: "Ligue 1",
  },
  {
    id: "monaco",
    name: "AS Monaco",
    logo: "/placeholder.svg?height=60&width=60&text=MON",
    country: "France",
    league: "Ligue 1",
  },
  {
    id: "lille",
    name: "Lille",
    logo: "/placeholder.svg?height=60&width=60&text=LIL",
    country: "France",
    league: "Ligue 1",
  },

  // Other Notable Clubs
  {
    id: "ajax",
    name: "Ajax",
    logo: "/placeholder.svg?height=60&width=60&text=AJX",
    country: "Netherlands",
    league: "Eredivisie",
  },
  {
    id: "benfica",
    name: "Benfica",
    logo: "/placeholder.svg?height=60&width=60&text=BEN",
    country: "Portugal",
    league: "Primeira Liga",
  },
  {
    id: "porto",
    name: "FC Porto",
    logo: "/placeholder.svg?height=60&width=60&text=POR",
    country: "Portugal",
    league: "Primeira Liga",
  },
  {
    id: "sporting",
    name: "Sporting CP",
    logo: "/placeholder.svg?height=60&width=60&text=SCP",
    country: "Portugal",
    league: "Primeira Liga",
  },
]

export const players: Player[] = [
  // Premier League Legends
  {
    id: "1",
    name: "Thierry Henry",
    clubs: ["arsenal", "barcelona", "monaco"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: "2",
    name: "Cesc Fàbregas",
    clubs: ["arsenal", "barcelona", "chelsea"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: "3",
    name: "David Silva",
    clubs: ["manchester-city", "valencia", "real-sociedad"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: "4",
    name: "Fernando Torres",
    clubs: ["liverpool", "chelsea", "atletico-madrid"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: "5",
    name: "Raheem Sterling",
    clubs: ["liverpool", "manchester-city", "chelsea"],
    nationality: "England",
    position: "Winger",
  },
  {
    id: "6",
    name: "Carlos Tevez",
    clubs: ["manchester-united", "manchester-city", "west-ham"],
    nationality: "Argentina",
    position: "Forward",
  },
  { id: "7", name: "Ashley Cole", clubs: ["arsenal", "chelsea"], nationality: "England", position: "Defender" },
  { id: "8", name: "Sol Campbell", clubs: ["tottenham", "arsenal"], nationality: "England", position: "Defender" },
  {
    id: "9",
    name: "Michael Owen",
    clubs: ["liverpool", "manchester-united", "newcastle"],
    nationality: "England",
    position: "Forward",
  },
  { id: "10", name: "Gareth Bale", clubs: ["tottenham", "real-madrid"], nationality: "Wales", position: "Winger" },

  // La Liga Stars
  { id: "11", name: "Luis Figo", clubs: ["barcelona", "real-madrid"], nationality: "Portugal", position: "Winger" },
  {
    id: "12",
    name: "Ronaldo Nazário",
    clubs: ["barcelona", "real-madrid", "inter-milan", "ac-milan"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: "13",
    name: "Samuel Eto'o",
    clubs: ["barcelona", "real-madrid", "inter-milan"],
    nationality: "Cameroon",
    position: "Forward",
  },
  {
    id: "14",
    name: "David Villa",
    clubs: ["barcelona", "valencia", "atletico-madrid"],
    nationality: "Spain",
    position: "Forward",
  },
  {
    id: "15",
    name: "Antoine Griezmann",
    clubs: ["atletico-madrid", "barcelona", "real-sociedad"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: "16",
    name: "Diego Simeone",
    clubs: ["atletico-madrid", "sevilla", "inter-milan"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: "17",
    name: "Sergio Ramos",
    clubs: ["real-madrid", "sevilla", "psg"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: "18",
    name: "Alvaro Morata",
    clubs: ["real-madrid", "atletico-madrid", "juventus", "chelsea"],
    nationality: "Spain",
    position: "Forward",
  },

  // Serie A Legends
  {
    id: "19",
    name: "Andrea Pirlo",
    clubs: ["ac-milan", "juventus", "inter-milan"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: "20",
    name: "Roberto Baggio",
    clubs: ["juventus", "ac-milan", "inter-milan", "fiorentina"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: "21",
    name: "Zlatan Ibrahimović",
    clubs: ["juventus", "inter-milan", "ac-milan", "barcelona", "psg"],
    nationality: "Sweden",
    position: "Forward",
  },
  {
    id: "22",
    name: "Gonzalo Higuaín",
    clubs: ["napoli", "juventus", "ac-milan", "real-madrid"],
    nationality: "Argentina",
    position: "Forward",
  },
  { id: "23", name: "Paulo Dybala", clubs: ["juventus", "roma"], nationality: "Argentina", position: "Forward" },
  {
    id: "24",
    name: "Ciro Immobile",
    clubs: ["lazio", "juventus", "borussia-dortmund"],
    nationality: "Italy",
    position: "Forward",
  },
  { id: "25", name: "Lorenzo Insigne", clubs: ["napoli"], nationality: "Italy", position: "Winger" },

  // Bundesliga Stars
  {
    id: "26",
    name: "Robert Lewandowski",
    clubs: ["borussia-dortmund", "bayern-munich", "barcelona"],
    nationality: "Poland",
    position: "Forward",
  },
  {
    id: "27",
    name: "Mario Götze",
    clubs: ["borussia-dortmund", "bayern-munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: "28",
    name: "Mats Hummels",
    clubs: ["borussia-dortmund", "bayern-munich"],
    nationality: "Germany",
    position: "Defender",
  },
  {
    id: "29",
    name: "Timo Werner",
    clubs: ["rb-leipzig", "chelsea", "borussia-dortmund"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: "30",
    name: "Kai Havertz",
    clubs: ["bayer-leverkusen", "chelsea", "arsenal"],
    nationality: "Germany",
    position: "Midfielder",
  },

  // Ligue 1 & Others
  { id: "31", name: "Neymar Jr", clubs: ["barcelona", "psg"], nationality: "Brazil", position: "Winger" },
  {
    id: "32",
    name: "Kylian Mbappé",
    clubs: ["psg", "monaco", "real-madrid"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: "33",
    name: "Edinson Cavani",
    clubs: ["psg", "napoli", "manchester-united"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: "34",
    name: "Thiago Silva",
    clubs: ["psg", "ac-milan", "chelsea"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: "35",
    name: "Angel Di María",
    clubs: ["real-madrid", "manchester-united", "psg", "juventus"],
    nationality: "Argentina",
    position: "Winger",
  },

  // More Cross-League Players
  {
    id: "36",
    name: "Cristiano Ronaldo",
    clubs: ["manchester-united", "real-madrid", "juventus"],
    nationality: "Portugal",
    position: "Forward",
  },
  { id: "37", name: "Kaká", clubs: ["ac-milan", "real-madrid"], nationality: "Brazil", position: "Midfielder" },
  {
    id: "38",
    name: "Xabi Alonso",
    clubs: ["liverpool", "real-madrid", "bayern-munich"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: "39",
    name: "James Rodríguez",
    clubs: ["real-madrid", "bayern-munich", "everton", "monaco"],
    nationality: "Colombia",
    position: "Midfielder",
  },
  {
    id: "40",
    name: "Arjen Robben",
    clubs: ["chelsea", "real-madrid", "bayern-munich"],
    nationality: "Netherlands",
    position: "Winger",
  },

  // Additional Premier League Players
  { id: "41", name: "N'Golo Kanté", clubs: ["leicester", "chelsea"], nationality: "France", position: "Midfielder" },
  {
    id: "42",
    name: "Riyad Mahrez",
    clubs: ["leicester", "manchester-city"],
    nationality: "Algeria",
    position: "Winger",
  },
  { id: "43", name: "Sadio Mané", clubs: ["liverpool", "bayern-munich"], nationality: "Senegal", position: "Winger" },
  {
    id: "44",
    name: "Mohamed Salah",
    clubs: ["chelsea", "liverpool", "roma", "fiorentina"],
    nationality: "Egypt",
    position: "Winger",
  },
  {
    id: "45",
    name: "Kevin De Bruyne",
    clubs: ["chelsea", "manchester-city"],
    nationality: "Belgium",
    position: "Midfielder",
  },
  {
    id: "46",
    name: "Romelu Lukaku",
    clubs: ["chelsea", "everton", "manchester-united", "inter-milan"],
    nationality: "Belgium",
    position: "Forward",
  },
  { id: "47", name: "Eden Hazard", clubs: ["chelsea", "real-madrid"], nationality: "Belgium", position: "Winger" },
  { id: "48", name: "Petr Čech", clubs: ["chelsea", "arsenal"], nationality: "Czech Republic", position: "Goalkeeper" },

  // More La Liga Players
  {
    id: "49",
    name: "Luka Modrić",
    clubs: ["real-madrid", "tottenham"],
    nationality: "Croatia",
    position: "Midfielder",
  },
  {
    id: "50",
    name: "Toni Kroos",
    clubs: ["real-madrid", "bayern-munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: "51",
    name: "Casemiro",
    clubs: ["real-madrid", "manchester-united"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: "52",
    name: "Raphaël Varane",
    clubs: ["real-madrid", "manchester-united"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: "53",
    name: "Courtois",
    clubs: ["chelsea", "real-madrid", "atletico-madrid"],
    nationality: "Belgium",
    position: "Goalkeeper",
  },
  { id: "54", name: "Diego Costa", clubs: ["chelsea", "atletico-madrid"], nationality: "Spain", position: "Forward" },

  // More Serie A Players
  { id: "55", name: "Gianluigi Buffon", clubs: ["juventus", "psg"], nationality: "Italy", position: "Goalkeeper" },
  { id: "56", name: "Francesco Totti", clubs: ["roma"], nationality: "Italy", position: "Forward" },
  { id: "57", name: "Franco Baresi", clubs: ["ac-milan"], nationality: "Italy", position: "Defender" },
  { id: "58", name: "Paolo Maldini", clubs: ["ac-milan"], nationality: "Italy", position: "Defender" },
  { id: "59", name: "Gennaro Gattuso", clubs: ["ac-milan"], nationality: "Italy", position: "Midfielder" },
  {
    id: "60",
    name: "Clarence Seedorf",
    clubs: ["ac-milan", "inter-milan", "real-madrid", "ajax"],
    nationality: "Netherlands",
    position: "Midfielder",
  },

  // More Bundesliga Players
  { id: "61", name: "Thomas Müller", clubs: ["bayern-munich"], nationality: "Germany", position: "Forward" },
  {
    id: "62",
    name: "Manuel Neuer",
    clubs: ["bayern-munich", "schalke"],
    nationality: "Germany",
    position: "Goalkeeper",
  },
  {
    id: "63",
    name: "Joshua Kimmich",
    clubs: ["bayern-munich", "rb-leipzig"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: "64",
    name: "Erling Haaland",
    clubs: ["borussia-dortmund", "manchester-city"],
    nationality: "Norway",
    position: "Forward",
  },
  {
    id: "65",
    name: "Jadon Sancho",
    clubs: ["borussia-dortmund", "manchester-united"],
    nationality: "England",
    position: "Winger",
  },

  // Portuguese League Players
  {
    id: "66",
    name: "Bruno Fernandes",
    clubs: ["sporting", "manchester-united"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: "67",
    name: "João Félix",
    clubs: ["benfica", "atletico-madrid", "chelsea"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: "68",
    name: "Rúben Dias",
    clubs: ["benfica", "manchester-city"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: "69",
    name: "Bernardo Silva",
    clubs: ["benfica", "monaco", "manchester-city"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: "70",
    name: "João Cancelo",
    clubs: ["benfica", "valencia", "inter-milan", "juventus", "manchester-city", "bayern-munich"],
    nationality: "Portugal",
    position: "Defender",
  },

  // Dutch League Players
  {
    id: "71",
    name: "Frenkie de Jong",
    clubs: ["ajax", "barcelona"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  {
    id: "72",
    name: "Matthijs de Ligt",
    clubs: ["ajax", "juventus", "bayern-munich"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: "73",
    name: "Donny van de Beek",
    clubs: ["ajax", "manchester-united"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  { id: "74", name: "Hakim Ziyech", clubs: ["ajax", "chelsea"], nationality: "Morocco", position: "Winger" },
  { id: "75", name: "Antony", clubs: ["ajax", "manchester-united"], nationality: "Brazil", position: "Winger" },

  // More Cross-League Stars
  {
    id: "76",
    name: "Virgil van Dijk",
    clubs: ["liverpool", "southampton"],
    nationality: "Netherlands",
    position: "Defender",
  },
  { id: "77", name: "Alisson Becker", clubs: ["liverpool", "roma"], nationality: "Brazil", position: "Goalkeeper" },
  { id: "78", name: "Fabinho", clubs: ["liverpool", "monaco"], nationality: "Brazil", position: "Midfielder" },
  { id: "79", name: "Roberto Firmino", clubs: ["liverpool"], nationality: "Brazil", position: "Forward" },
  { id: "80", name: "Jordan Henderson", clubs: ["liverpool"], nationality: "England", position: "Midfielder" },

  // Recent Transfer Stars
  { id: "81", name: "Harry Kane", clubs: ["tottenham", "bayern-munich"], nationality: "England", position: "Forward" },
  { id: "82", name: "Declan Rice", clubs: ["west-ham", "arsenal"], nationality: "England", position: "Midfielder" },
  {
    id: "83",
    name: "Mason Mount",
    clubs: ["chelsea", "manchester-united"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: "84",
    name: "Jude Bellingham",
    clubs: ["borussia-dortmund", "real-madrid"],
    nationality: "England",
    position: "Midfielder",
  },
  { id: "85", name: "Pedri", clubs: ["barcelona"], nationality: "Spain", position: "Midfielder" },
  { id: "86", name: "Gavi", clubs: ["barcelona"], nationality: "Spain", position: "Midfielder" },
  { id: "87", name: "Ansu Fati", clubs: ["barcelona"], nationality: "Spain", position: "Forward" },
  {
    id: "88",
    name: "Ferran Torres",
    clubs: ["valencia", "manchester-city", "barcelona"],
    nationality: "Spain",
    position: "Forward",
  },
  { id: "89", name: "Pau Torres", clubs: ["villarreal"], nationality: "Spain", position: "Defender" },
  { id: "90", name: "Mikel Oyarzabal", clubs: ["real-sociedad"], nationality: "Spain", position: "Forward" },

  // Italian Talents
  { id: "91", name: "Federico Chiesa", clubs: ["fiorentina", "juventus"], nationality: "Italy", position: "Winger" },
  { id: "92", name: "Nicolo Barella", clubs: ["inter-milan"], nationality: "Italy", position: "Midfielder" },
  { id: "93", name: "Alessandro Bastoni", clubs: ["inter-milan"], nationality: "Italy", position: "Defender" },
  { id: "94", name: "Lautaro Martínez", clubs: ["inter-milan"], nationality: "Argentina", position: "Forward" },
  { id: "95", name: "Victor Osimhen", clubs: ["napoli"], nationality: "Nigeria", position: "Forward" },
  { id: "96", name: "Khvicha Kvaratskhelia", clubs: ["napoli"], nationality: "Georgia", position: "Winger" },
  { id: "97", name: "Rafael Leão", clubs: ["ac-milan"], nationality: "Portugal", position: "Winger" },
  { id: "98", name: "Theo Hernández", clubs: ["ac-milan", "real-madrid"], nationality: "France", position: "Defender" },
  { id: "99", name: "Sergej Milinković-Savić", clubs: ["lazio"], nationality: "Serbia", position: "Midfielder" },
  { id: "100", name: "Dusan Vlahović", clubs: ["fiorentina", "juventus"], nationality: "Serbia", position: "Forward" },

  // French League Stars
  { id: "101", name: "Marquinhos", clubs: ["psg", "roma"], nationality: "Brazil", position: "Defender" },
  { id: "102", name: "Marco Verratti", clubs: ["psg"], nationality: "Italy", position: "Midfielder" },
  { id: "103", name: "Presnel Kimpembe", clubs: ["psg"], nationality: "France", position: "Defender" },
  {
    id: "104",
    name: "Achraf Hakimi",
    clubs: ["psg", "inter-milan", "borussia-dortmund", "real-madrid"],
    nationality: "Morocco",
    position: "Defender",
  },
  {
    id: "105",
    name: "Ousmane Dembélé",
    clubs: ["barcelona", "psg", "borussia-dortmund"],
    nationality: "France",
    position: "Winger",
  },
  {
    id: "106",
    name: "Memphis Depay",
    clubs: ["lyon", "barcelona", "manchester-united"],
    nationality: "Netherlands",
    position: "Forward",
  },
  { id: "107", name: "Alexandre Lacazette", clubs: ["arsenal", "lyon"], nationality: "France", position: "Forward" },
  { id: "108", name: "Houssem Aouar", clubs: ["lyon"], nationality: "France", position: "Midfielder" },
  { id: "109", name: "Wissam Ben Yedder", clubs: ["monaco", "sevilla"], nationality: "France", position: "Forward" },
  { id: "110", name: "Youssouf Fofana", clubs: ["monaco"], nationality: "France", position: "Midfielder" },

  // German Talents
  { id: "111", name: "Florian Wirtz", clubs: ["bayer-leverkusen"], nationality: "Germany", position: "Midfielder" },
  { id: "112", name: "Jamal Musiala", clubs: ["bayern-munich"], nationality: "Germany", position: "Midfielder" },
  { id: "113", name: "Alphonso Davies", clubs: ["bayern-munich"], nationality: "Canada", position: "Defender" },
  {
    id: "114",
    name: "Leon Goretzka",
    clubs: ["bayern-munich", "schalke"],
    nationality: "Germany",
    position: "Midfielder",
  },
  { id: "115", name: "Serge Gnabry", clubs: ["bayern-munich", "arsenal"], nationality: "Germany", position: "Winger" },
  {
    id: "116",
    name: "Dayot Upamecano",
    clubs: ["bayern-munich", "rb-leipzig"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: "117",
    name: "Christopher Nkunku",
    clubs: ["rb-leipzig", "chelsea", "psg"],
    nationality: "France",
    position: "Forward",
  },
  { id: "118", name: "Dani Olmo", clubs: ["rb-leipzig", "barcelona"], nationality: "Spain", position: "Midfielder" },
  {
    id: "119",
    name: "Patrik Schick",
    clubs: ["bayer-leverkusen", "rb-leipzig", "roma"],
    nationality: "Czech Republic",
    position: "Forward",
  },
  { id: "120", name: "Moussa Diaby", clubs: ["bayer-leverkusen", "psg"], nationality: "France", position: "Winger" },

  // More Premier League Stars
  { id: "121", name: "Phil Foden", clubs: ["manchester-city"], nationality: "England", position: "Midfielder" },
  { id: "122", name: "Jack Grealish", clubs: ["manchester-city"], nationality: "England", position: "Winger" },
  { id: "123", name: "Bukayo Saka", clubs: ["arsenal"], nationality: "England", position: "Winger" },
  {
    id: "124",
    name: "Martin Ødegaard",
    clubs: ["arsenal", "real-madrid"],
    nationality: "Norway",
    position: "Midfielder",
  },
  {
    id: "125",
    name: "Gabriel Jesus",
    clubs: ["arsenal", "manchester-city"],
    nationality: "Brazil",
    position: "Forward",
  },
  { id: "126", name: "William Saliba", clubs: ["arsenal", "marseille"], nationality: "France", position: "Defender" },
  { id: "127", name: "Reece James", clubs: ["chelsea"], nationality: "England", position: "Defender" },
  {
    id: "128",
    name: "Enzo Fernández",
    clubs: ["chelsea", "benfica"],
    nationality: "Argentina",
    position: "Midfielder",
  },
  {
    id: "129",
    name: "Christopher Nkunku",
    clubs: ["chelsea", "rb-leipzig", "psg"],
    nationality: "France",
    position: "Forward",
  },
  { id: "130", name: "Moisés Caicedo", clubs: ["chelsea"], nationality: "Ecuador", position: "Midfielder" },

  // More La Liga Players
  { id: "131", name: "Vinícius Jr.", clubs: ["real-madrid"], nationality: "Brazil", position: "Winger" },
  { id: "132", name: "Rodrygo", clubs: ["real-madrid"], nationality: "Brazil", position: "Winger" },
  { id: "133", name: "Eduardo Camavinga", clubs: ["real-madrid"], nationality: "France", position: "Midfielder" },
  {
    id: "134",
    name: "Aurélien Tchouaméni",
    clubs: ["real-madrid", "monaco"],
    nationality: "France",
    position: "Midfielder",
  },
  { id: "135", name: "Eder Militão", clubs: ["real-madrid", "porto"], nationality: "Brazil", position: "Defender" },
  {
    id: "136",
    name: "Robert Lewandowski",
    clubs: ["barcelona", "bayern-munich", "borussia-dortmund"],
    nationality: "Poland",
    position: "Forward",
  },
  {
    id: "137",
    name: "Frenkie de Jong",
    clubs: ["barcelona", "ajax"],
    nationality: "Netherlands",
    position: "Midfielder",
  },
  { id: "138", name: "Ronald Araújo", clubs: ["barcelona"], nationality: "Uruguay", position: "Defender" },
  { id: "139", name: "Jules Koundé", clubs: ["barcelona", "sevilla"], nationality: "France", position: "Defender" },
  {
    id: "140",
    name: "João Cancelo",
    clubs: ["barcelona", "manchester-city", "juventus", "valencia", "inter-milan", "benfica"],
    nationality: "Portugal",
    position: "Defender",
  },

  // Additional Cross-League Players
  {
    id: "141",
    name: "Achraf Hakimi",
    clubs: ["psg", "inter-milan", "borussia-dortmund", "real-madrid"],
    nationality: "Morocco",
    position: "Defender",
  },
  { id: "142", name: "Gianluigi Donnarumma", clubs: ["psg", "ac-milan"], nationality: "Italy", position: "Goalkeeper" },
  {
    id: "143",
    name: "Sergio Busquets",
    clubs: ["barcelona", "inter-milan"],
    nationality: "Spain",
    position: "Midfielder",
  },
  { id: "144", name: "Jordi Alba", clubs: ["barcelona", "valencia"], nationality: "Spain", position: "Defender" },
  {
    id: "145",
    name: "Gerard Piqué",
    clubs: ["barcelona", "manchester-united"],
    nationality: "Spain",
    position: "Defender",
  },
  { id: "146", name: "Ivan Rakitić", clubs: ["barcelona", "sevilla"], nationality: "Croatia", position: "Midfielder" },
  {
    id: "147",
    name: "Arturo Vidal",
    clubs: ["barcelona", "bayern-munich", "juventus", "inter-milan"],
    nationality: "Chile",
    position: "Midfielder",
  },
  {
    id: "148",
    name: "Miralem Pjanić",
    clubs: ["barcelona", "juventus", "roma"],
    nationality: "Bosnia",
    position: "Midfielder",
  },
  {
    id: "149",
    name: "Philippe Coutinho",
    clubs: ["barcelona", "liverpool", "bayern-munich"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: "150",
    name: "Ousmane Dembélé",
    clubs: ["barcelona", "psg", "borussia-dortmund"],
    nationality: "France",
    position: "Winger",
  },
]

// Generate club pairs with their associated players
export function generateClubPairs(): ClubPair[] {
  const pairs: ClubPair[] = []

  // Generate all possible club combinations
  for (let i = 0; i < clubs.length; i++) {
    for (let j = i + 1; j < clubs.length; j++) {
      const club1 = clubs[i]
      const club2 = clubs[j]

      // Find players who played for both clubs
      const commonPlayers = players.filter(
        (player) => player.clubs.includes(club1.id) && player.clubs.includes(club2.id),
      )

      // Only include pairs that have at least one common player
      if (commonPlayers.length > 0) {
        pairs.push({
          club1,
          club2,
          players: commonPlayers,
        })
      }
    }
  }

  return pairs
}

// Get a random club pair
export function getRandomClubPair(excludePairs: string[] = []): ClubPair | null {
  const allPairs = generateClubPairs()
  const availablePairs = allPairs.filter((pair) => {
    const pairId = `${pair.club1.id}-${pair.club2.id}`
    const reversePairId = `${pair.club2.id}-${pair.club1.id}`
    return !excludePairs.includes(pairId) && !excludePairs.includes(reversePairId)
  })

  if (availablePairs.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * availablePairs.length)
  return availablePairs[randomIndex]
}

// Search for players (without showing club information)
export function searchPlayers(query: string): Player[] {
  if (!query || query.length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase()
  return players.filter((player) => player.name.toLowerCase().includes(searchTerm)).slice(0, 10) // Limit to 10 results
}

// Get club pair hash for tracking progress
export function getClubPairHash(club1Id: string, club2Id: string): string {
  const sortedIds = [club1Id, club2Id].sort()
  return `${sortedIds[0]}-${sortedIds[1]}`
}

// Check if player is valid for club pair
export function isValidPlayerForClubPair(playerName: string, club1Id: string, club2Id: string): boolean {
  const player = players.find((p) => p.name.toLowerCase() === playerName.toLowerCase())
  if (!player) return false

  return player.clubs.includes(club1Id) && player.clubs.includes(club2Id)
}

// Get all valid players for a club pair
export function getValidPlayersForClubPair(club1Id: string, club2Id: string): Player[] {
  return players.filter((player) => player.clubs.includes(club1Id) && player.clubs.includes(club2Id))
}

// In-memory storage (will be reset on each deployment)
const users = new Map<string, { id: string; username: string; sessionToken: string; createdAt: string }>()
const sessions = new Map<string, QuizSession>()
const userStats = new Map<string, UserStats>()

// Helper functions

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateUserId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}

export function createUser(
  username: string,
  password: string,
): { id: string; username: string; sessionToken: string } | null {
  // Check if user exists
  for (const [, user] of users) {
    if (user.username === username) {
      return null
    }
  }

  const userId = generateUserId()
  const sessionToken = generateSessionToken()

  users.set(userId, {
    id: userId,
    username,
    sessionToken,
    createdAt: new Date().toISOString(),
  })

  return { id: userId, username, sessionToken }
}

export function authenticateUser(
  username: string,
  password: string,
): { id: string; username: string; sessionToken: string } | null {
  for (const [userId, user] of users) {
    if (user.username === username) {
      // For demo purposes, accept any password for existing users
      const sessionToken = generateSessionToken()
      user.sessionToken = sessionToken
      users.set(userId, user)
      return { id: userId, username, sessionToken }
    }
  }
  return null
}

export function getUserByToken(sessionToken: string): { id: string; username: string } | null {
  for (const [userId, user] of users) {
    if (user.sessionToken === sessionToken) {
      return { id: userId, username: user.username }
    }
  }
  return null
}

// Fix the updateUserStats function to properly handle session data
export function updateUserStats(userId: string, username: string, session: QuizSession): void {
  const existing = userStats.get(userId)
  const percentage = session.totalAttempts > 0 ? (session.correctAnswers / session.totalAttempts) * 100 : 0

  if (existing) {
    // Update existing stats - add the new session data
    existing.totalSessions += 1
    existing.totalCorrect += session.correctAnswers
    existing.totalAttempts += session.totalAttempts
    existing.averagePercentage = existing.totalAttempts > 0 ? (existing.totalCorrect / existing.totalAttempts) * 100 : 0
    existing.lastPlayed = session.endedAt || session.startedAt

    // Update best scores
    if (session.correctAnswers > existing.bestScore) {
      existing.bestScore = session.correctAnswers
    }
    if (percentage > existing.bestPercentage) {
      existing.bestPercentage = percentage
    }

    userStats.set(userId, existing)
  } else {
    // Create new stats
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
    userStats.set(userId, newStats)
  }
}

export { users, sessions, userStats }
