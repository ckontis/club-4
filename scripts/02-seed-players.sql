-- This file contains the seed data for players
-- The data will be inserted by the application when needed
-- No direct SQL insertion needed as data is managed in code

-- Clear existing data
TRUNCATE TABLE players, club_pairs RESTART IDENTITY CASCADE;

-- Insert extensive player database with more players
INSERT INTO players (name, clubs, nationality, position, birth_year) VALUES
-- Premier League Stars
('Cristiano Ronaldo', ARRAY['Sporting CP', 'Manchester United', 'Real Madrid', 'Juventus', 'Al Nassr'], 'Portugal', 'Forward', 1985),
('Lionel Messi', ARRAY['Barcelona', 'Paris Saint-Germain', 'Inter Miami'], 'Argentina', 'Forward', 1987),
('Neymar Jr', ARRAY['Santos', 'Barcelona', 'Paris Saint-Germain', 'Al Hilal'], 'Brazil', 'Forward', 1992),
('Kylian Mbappe', ARRAY['AS Monaco', 'Paris Saint-Germain', 'Real Madrid'], 'France', 'Forward', 1998),
('Erling Haaland', ARRAY['Molde', 'Red Bull Salzburg', 'Borussia Dortmund', 'Manchester City'], 'Norway', 'Forward', 2000),
('Robert Lewandowski', ARRAY['Znicz Pruszków', 'Lech Poznań', 'Borussia Dortmund', 'Bayern Munich', 'Barcelona'], 'Poland', 'Forward', 1988),
('Sadio Mane', ARRAY['Metz', 'Red Bull Salzburg', 'Southampton', 'Liverpool', 'Bayern Munich', 'Al Nassr'], 'Senegal', 'Forward', 1992),
('Mohamed Salah', ARRAY['El Mokawloon', 'Basel', 'Chelsea', 'Fiorentina', 'AS Roma', 'Liverpool'], 'Egypt', 'Forward', 1992),
('Kevin De Bruyne', ARRAY['Genk', 'Chelsea', 'Werder Bremen', 'VfL Wolfsburg', 'Manchester City'], 'Belgium', 'Midfielder', 1991),
('Virgil van Dijk', ARRAY['Willem II', 'Groningen', 'Celtic', 'Southampton', 'Liverpool'], 'Netherlands', 'Defender', 1991),

-- More Premier League Players
('Harry Kane', ARRAY['Tottenham', 'Bayern Munich'], 'England', 'Forward', 1993),
('Raheem Sterling', ARRAY['Liverpool', 'Manchester City', 'Chelsea', 'Arsenal'], 'England', 'Forward', 1994),
('Jack Grealish', ARRAY['Aston Villa', 'Manchester City'], 'England', 'Midfielder', 1995),
('Mason Mount', ARRAY['Chelsea', 'Manchester United'], 'England', 'Midfielder', 1999),
('Declan Rice', ARRAY['West Ham United', 'Arsenal'], 'England', 'Midfielder', 1999),
('Bukayo Saka', ARRAY['Arsenal'], 'England', 'Forward', 2001),
('Phil Foden', ARRAY['Manchester City'], 'England', 'Midfielder', 2000),
('Jadon Sancho', ARRAY['Watford', 'Manchester City', 'Borussia Dortmund', 'Manchester United'], 'England', 'Forward', 2000),

-- La Liga Stars
('Luka Modric', ARRAY['Dinamo Zagreb', 'Tottenham', 'Real Madrid'], 'Croatia', 'Midfielder', 1985),
('Gareth Bale', ARRAY['Southampton', 'Tottenham', 'Real Madrid', 'LAFC'], 'Wales', 'Forward', 1989),
('Eden Hazard', ARRAY['Lille', 'Chelsea', 'Real Madrid'], 'Belgium', 'Forward', 1991),
('Karim Benzema', ARRAY['Lyon', 'Real Madrid', 'Al Ittihad'], 'France', 'Forward', 1987),
('Antoine Griezmann', ARRAY['Real Sociedad', 'Atletico Madrid', 'Barcelona'], 'France', 'Forward', 1991),
('Luis Suarez', ARRAY['Nacional', 'Groningen', 'Ajax', 'Liverpool', 'Barcelona', 'Atletico Madrid', 'Inter Miami'], 'Uruguay', 'Forward', 1987),
('Sergio Ramos', ARRAY['Sevilla', 'Real Madrid', 'Paris Saint-Germain'], 'Spain', 'Defender', 1986),
('Gerard Pique', ARRAY['Barcelona', 'Manchester United'], 'Spain', 'Defender', 1987),

-- Serie A Stars
('Paulo Dybala', ARRAY['Instituto', 'Palermo', 'Juventus', 'AS Roma'], 'Argentina', 'Forward', 1993),
('Romelu Lukaku', ARRAY['Anderlecht', 'Chelsea', 'West Bromwich Albion', 'Everton', 'Manchester United', 'Inter Milan'], 'Belgium', 'Forward', 1993),
('Paul Pogba', ARRAY['Le Havre', 'Manchester United', 'Juventus'], 'France', 'Midfielder', 1993),
('Angel Di Maria', ARRAY['Rosario Central', 'Benfica', 'Real Madrid', 'Manchester United', 'Paris Saint-Germain', 'Juventus'], 'Argentina', 'Forward', 1988),
('Zlatan Ibrahimovic', ARRAY['Malmö FF', 'Ajax', 'Juventus', 'Inter Milan', 'Barcelona', 'AC Milan', 'Paris Saint-Germain', 'Manchester United', 'LA Galaxy'], 'Sweden', 'Forward', 1981),

-- Bundesliga Stars
('Thomas Müller', ARRAY['Bayern Munich'], 'Germany', 'Forward', 1989),
('Manuel Neuer', ARRAY['Schalke 04', 'Bayern Munich'], 'Germany', 'Goalkeeper', 1986),
('Joshua Kimmich', ARRAY['VfB Stuttgart', 'RB Leipzig', 'Bayern Munich'], 'Germany', 'Midfielder', 1995),
('Timo Werner', ARRAY['VfB Stuttgart', 'RB Leipzig', 'Chelsea', 'RB Leipzig'], 'Germany', 'Forward', 1996),
('Kai Havertz', ARRAY['Bayer Leverkusen', 'Chelsea', 'Arsenal'], 'Germany', 'Midfielder', 1999),

-- Legends
('David Beckham', ARRAY['Manchester United', 'Preston North End', 'Real Madrid', 'LA Galaxy', 'AC Milan', 'Paris Saint-Germain'], 'England', 'Midfielder', 1975),
('Ronaldinho', ARRAY['Grêmio', 'Paris Saint-Germain', 'Barcelona', 'AC Milan', 'Flamengo', 'Atletico Mineiro', 'Queretaro', 'Fluminense'], 'Brazil', 'Forward', 1980),
('Thierry Henry', ARRAY['AS Monaco', 'Juventus', 'Arsenal', 'Barcelona', 'New York Red Bulls'], 'France', 'Forward', 1977),
('Carlos Tevez', ARRAY['Boca Juniors', 'Corinthians', 'West Ham United', 'Manchester United', 'Manchester City', 'Juventus', 'Shanghai Shenhua'], 'Argentina', 'Forward', 1984),
('Andrea Pirlo', ARRAY['Brescia', 'Inter Milan', 'AC Milan', 'Juventus', 'New York City FC'], 'Italy', 'Midfielder', 1979),
('Frank Lampard', ARRAY['West Ham United', 'Swansea City', 'Chelsea', 'Manchester City', 'New York City FC'], 'England', 'Midfielder', 1978),
('Steven Gerrard', ARRAY['Liverpool', 'LA Galaxy'], 'England', 'Midfielder', 1980),
('Xavi', ARRAY['Barcelona', 'Al Sadd'], 'Spain', 'Midfielder', 1980),
('Andres Iniesta', ARRAY['Barcelona', 'Vissel Kobe', 'Emirates Club'], 'Spain', 'Midfielder', 1984),
('Cesc Fabregas', ARRAY['Barcelona', 'Arsenal', 'Chelsea', 'AS Monaco', 'Como'], 'Spain', 'Midfielder', 1987),
('Alexis Sanchez', ARRAY['Cobreloa', 'Colo-Colo', 'River Plate', 'Udinese', 'Barcelona', 'Arsenal', 'Manchester United', 'Inter Milan', 'Marseille'], 'Chile', 'Forward', 1988),

-- More current players
('Pedri', ARRAY['Las Palmas', 'Barcelona'], 'Spain', 'Midfielder', 2002),
('Gavi', ARRAY['Barcelona'], 'Spain', 'Midfielder', 2004),
('Vinicius Jr', ARRAY['Flamengo', 'Real Madrid'], 'Brazil', 'Forward', 2000),
('Jude Bellingham', ARRAY['Birmingham City', 'Borussia Dortmund', 'Real Madrid'], 'England', 'Midfielder', 2003),
('Eduardo Camavinga', ARRAY['Rennes', 'Real Madrid'], 'France', 'Midfielder', 2002),
('Aurelien Tchouameni', ARRAY['Bordeaux', 'AS Monaco', 'Real Madrid'], 'France', 'Midfielder', 2000),
('Christopher Nkunku', ARRAY['Paris Saint-Germain', 'RB Leipzig', 'Chelsea'], 'France', 'Forward', 1997),
('Victor Osimhen', ARRAY['Wolfsburg', 'Charleroi', 'Lille', 'Napoli'], 'Nigeria', 'Forward', 1998),
('Rafael Leao', ARRAY['Sporting CP', 'Lille', 'AC Milan'], 'Portugal', 'Forward', 1999),
('Khvicha Kvaratskhelia', ARRAY['Dinamo Batumi', 'Rubin Kazan', 'Napoli'], 'Georgia', 'Forward', 2001);

-- Insert popular club pairs for quiz questions
INSERT INTO club_pairs (club1, club2) VALUES
('Manchester United', 'Real Madrid'),
('Barcelona', 'Paris Saint-Germain'),
('Chelsea', 'Real Madrid'),
('Liverpool', 'Barcelona'),
('Manchester City', 'Barcelona'),
('Arsenal', 'Barcelona'),
('Tottenham', 'Real Madrid'),
('Juventus', 'Barcelona'),
('AC Milan', 'Barcelona'),
('Inter Milan', 'Chelsea'),
('Bayern Munich', 'Barcelona'),
('Borussia Dortmund', 'Manchester City'),
('Atletico Madrid', 'Chelsea'),
('AS Roma', 'Liverpool'),
('Napoli', 'Chelsea'),
('Sevilla', 'Real Madrid'),
('Valencia', 'Arsenal'),
('Manchester United', 'Juventus'),
('Liverpool', 'AC Milan'),
('Chelsea', 'AC Milan'),
('Arsenal', 'AC Milan'),
('Manchester City', 'AC Milan'),
('Real Madrid', 'AC Milan'),
('Barcelona', 'AC Milan'),
('Paris Saint-Germain', 'AC Milan'),
('Bayern Munich', 'Manchester City'),
('Borussia Dortmund', 'Bayern Munich'),
('RB Leipzig', 'Chelsea'),
('Bayer Leverkusen', 'Arsenal'),
('AS Monaco', 'Real Madrid');
