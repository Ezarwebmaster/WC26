export interface MatchEvent {
  player: string;
  minute: string;
  type?: string; // "penalty" | "own" | "yellow" | "red" | "yellow-red"
}

export interface RichMatchDetails {
  stadium: string;
  city: string;
  dateEvent: string;
  strTime: string;
  homeGoals: MatchEvent[];
  awayGoals: MatchEvent[];
  homeCards: MatchEvent[];
  awayCards: MatchEvent[];
}

export const MATCH_DETAILS: Record<string, RichMatchDetails> = {};
