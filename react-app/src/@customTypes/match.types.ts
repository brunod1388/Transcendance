export interface Match {
    username1: string;
    username2: string;
    avatar1: string;
    avatar2: string;
    score1: number;
    score2: number;
    type: string;
    playDate: string;
}

export interface Player {
    username: string;
    avatar: string;
    wins: number;
    losses: number;
    points: number;
    league: string;
}

export interface MatchSummary {
    totalWins: number;
    totalLoses: number;
    totalGames: number;
    points: number;
}

export const initialSummary: MatchSummary = {
    totalWins: 0,
    totalLoses: 0,
    totalGames: 0,
    points: 0,
};
