-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    clubs TEXT[] NOT NULL,
    nationality VARCHAR(100),
    position VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create club_pairs table  
CREATE TABLE IF NOT EXISTS club_pairs (
    id SERIAL PRIMARY KEY,
    club1 VARCHAR(255) NOT NULL,
    club2 VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert existing data
INSERT INTO players (name, clubs, nationality, position) VALUES
('Cristiano Ronaldo', ARRAY['Sporting CP', 'Manchester United', 'Real Madrid', 'Juventus', 'Al Nassr'], 'Portugal', 'Forward'),
-- ... more players
;

INSERT INTO club_pairs (club1, club2) VALUES
('Manchester United', 'Real Madrid'),
-- ... more pairs
;
