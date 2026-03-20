export type OddDir = 'up' | 'down' | 'neutral';

export interface Odd {
  label: string;
  value: number;
  dir: OddDir;
}

export interface Market {
  name: string;
  odds: Odd[];
}

export interface Game {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  minute?: number;
  markets: Market[];
}

export const SPORTS_ICONS: Record<string, string> = {
  'Soccer': '⚽',
  'Basketball': '🏀',
  'American Football': '🏈',
  'Tennis': '🎾',
  'Baseball': '⚾',
  'Ice Hockey': '🏒',
  'MMA': '🥊',
  'Rugby': '🏉',
};

export const INITIAL_GAMES: Game[] = [
  {
    id: 'g1',
    sport: 'Soccer',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Man City',
    homeScore: 1,
    awayScore: 2,
    time: "67'",
    status: 'live',
    minute: 67,
    markets: [
      { name: 'Match Result', odds: [
        { label: 'Arsenal', value: 3.40, dir: 'up' },
        { label: 'Draw', value: 3.20, dir: 'neutral' },
        { label: 'Man City', value: 2.10, dir: 'down' },
      ]},
      { name: 'Total Goals', odds: [
        { label: 'Over 2.5', value: 1.75, dir: 'neutral' },
        { label: 'Under 2.5', value: 2.05, dir: 'neutral' },
      ]},
      { name: 'Both Score', odds: [
        { label: 'Yes', value: 1.65, dir: 'up' },
        { label: 'No', value: 2.20, dir: 'down' },
      ]},
    ]
  },
  {
    id: 'g2',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Celtics',
    homeScore: 87,
    awayScore: 91,
    time: "Q3 8:24",
    status: 'live',
    markets: [
      { name: 'Moneyline', odds: [
        { label: 'Lakers', value: 2.85, dir: 'up' },
        { label: 'Celtics', value: 1.48, dir: 'down' },
      ]},
      { name: 'Point Spread', odds: [
        { label: 'LAL +4.5', value: 1.90, dir: 'neutral' },
        { label: 'BOS -4.5', value: 1.90, dir: 'neutral' },
      ]},
      { name: 'Total Points', odds: [
        { label: 'Over 226.5', value: 1.88, dir: 'up' },
        { label: 'Under 226.5', value: 1.92, dir: 'down' },
      ]},
    ]
  },
  {
    id: 'g3',
    sport: 'American Football',
    league: 'NFL',
    homeTeam: 'Chiefs',
    awayTeam: 'Eagles',
    homeScore: 14,
    awayScore: 10,
    time: "Q2 3:45",
    status: 'live',
    markets: [
      { name: 'Moneyline', odds: [
        { label: 'Chiefs', value: 1.62, dir: 'down' },
        { label: 'Eagles', value: 2.38, dir: 'up' },
      ]},
      { name: 'Spread', odds: [
        { label: 'KC -3.5', value: 1.90, dir: 'neutral' },
        { label: 'PHI +3.5', value: 1.90, dir: 'neutral' },
      ]},
      { name: 'Total Points', odds: [
        { label: 'Over 48.5', value: 1.85, dir: 'up' },
        { label: 'Under 48.5', value: 1.95, dir: 'down' },
      ]},
    ]
  },
  {
    id: 'g4',
    sport: 'Tennis',
    league: 'ATP Masters',
    homeTeam: 'Djokovic',
    awayTeam: 'Alcaraz',
    homeScore: 1,
    awayScore: 1,
    time: "Set 3",
    status: 'live',
    markets: [
      { name: 'Match Winner', odds: [
        { label: 'Djokovic', value: 2.10, dir: 'up' },
        { label: 'Alcaraz', value: 1.75, dir: 'down' },
      ]},
      { name: 'Set 3 Winner', odds: [
        { label: 'Djokovic', value: 1.95, dir: 'neutral' },
        { label: 'Alcaraz', value: 1.85, dir: 'neutral' },
      ]},
    ]
  },
  {
    id: 'g5',
    sport: 'Soccer',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 0,
    awayScore: 0,
    time: "19'",
    status: 'live',
    minute: 19,
    markets: [
      { name: 'Match Result', odds: [
        { label: 'Real Madrid', value: 2.20, dir: 'neutral' },
        { label: 'Draw', value: 3.10, dir: 'neutral' },
        { label: 'Barcelona', value: 3.50, dir: 'up' },
      ]},
      { name: 'Next Goal', odds: [
        { label: 'Real Madrid', value: 1.95, dir: 'down' },
        { label: 'No Goal', value: 4.50, dir: 'up' },
        { label: 'Barcelona', value: 2.10, dir: 'neutral' },
      ]},
    ]
  },
  {
    id: 'g6',
    sport: 'Ice Hockey',
    league: 'NHL',
    homeTeam: 'Rangers',
    awayTeam: 'Bruins',
    homeScore: 2,
    awayScore: 1,
    time: "P2 12:30",
    status: 'live',
    markets: [
      { name: 'Moneyline', odds: [
        { label: 'Rangers', value: 1.72, dir: 'down' },
        { label: 'Bruins', value: 2.15, dir: 'up' },
      ]},
      { name: 'Total Goals', odds: [
        { label: 'Over 5.5', value: 1.80, dir: 'up' },
        { label: 'Under 5.5', value: 2.00, dir: 'down' },
      ]},
    ]
  },
  {
    id: 'g7',
    sport: 'MMA',
    league: 'UFC 300',
    homeTeam: 'Jones',
    awayTeam: 'Miocic',
    homeScore: 0,
    awayScore: 0,
    time: "R2 3:45",
    status: 'live',
    markets: [
      { name: 'Fight Winner', odds: [
        { label: 'Jones', value: 1.40, dir: 'down' },
        { label: 'Miocic', value: 2.90, dir: 'up' },
      ]},
      { name: 'Method', odds: [
        { label: 'KO/TKO', value: 2.20, dir: 'neutral' },
        { label: 'Submission', value: 3.80, dir: 'neutral' },
        { label: 'Decision', value: 2.60, dir: 'neutral' },
      ]},
    ]
  },
  {
    id: 'g8',
    sport: 'Baseball',
    league: 'MLB',
    homeTeam: 'Yankees',
    awayTeam: 'Red Sox',
    homeScore: 4,
    awayScore: 3,
    time: "7th Inn",
    status: 'live',
    markets: [
      { name: 'Moneyline', odds: [
        { label: 'Yankees', value: 1.58, dir: 'down' },
        { label: 'Red Sox', value: 2.45, dir: 'up' },
      ]},
      { name: 'Total Runs', odds: [
        { label: 'Over 8.5', value: 1.90, dir: 'neutral' },
        { label: 'Under 8.5', value: 1.90, dir: 'neutral' },
      ]},
    ]
  },
];

export const UPCOMING_GAMES: Game[] = [
  {
    id: 'u1', sport: 'Soccer', league: 'Champions League',
    homeTeam: 'PSG', awayTeam: 'Bayern Munich',
    homeScore: 0, awayScore: 0, time: 'Today 20:45', status: 'upcoming',
    markets: [
      { name: 'Match Result', odds: [
        { label: 'PSG', value: 2.75, dir: 'neutral' },
        { label: 'Draw', value: 3.20, dir: 'neutral' },
        { label: 'Bayern', value: 2.55, dir: 'neutral' },
      ]},
    ]
  },
  {
    id: 'u2', sport: 'Basketball', league: 'NBA',
    homeTeam: 'Warriors', awayTeam: 'Bucks',
    homeScore: 0, awayScore: 0, time: 'Today 22:00', status: 'upcoming',
    markets: [
      { name: 'Moneyline', odds: [
        { label: 'Warriors', value: 1.95, dir: 'neutral' },
        { label: 'Bucks', value: 1.85, dir: 'neutral' },
      ]},
    ]
  },
];
