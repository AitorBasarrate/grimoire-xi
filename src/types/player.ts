export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface Team {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  shortName: string;
  logo?: string;
}

export interface MatchEvent {
  type: 'goal' | 'assist' | 'yellow_card' | 'red_card' | 'substitution';
  minute: number;
  description: string;
}

export interface MatchPlayerStats {
  minutesPlayed: number;
  goals: number;
  assists: number;
  passesCompleted: number;
  totalPasses: number;
  shotsTaken: number;
  tacklesMade: number;
  yellowCards: number;
  redCards: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: Team;
  isHome: boolean;
  matchResult: 'win' | 'loss' | 'draw';
  finalScore: {
    home: number;
    away: number;
  };
  playerStats: MatchPlayerStats;
  events: MatchEvent[];
}

export interface AggregatedStats {
  totalMatches: number;
  totalGoals: number;
  totalAssists: number;
  totalMinutes: number;
  recentFormAverage: {
    goals: number;
    assists: number;
    passAccuracy: number;
  };
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  position: Position;
  matches: Match[];
  aggregatedStats: AggregatedStats;
  photo?: string;
}