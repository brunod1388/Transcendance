export interface player {
    username: string;
    avatar: string;
    wins: number;
    losses: number;
    points: number;
    league: string;
}

export interface Match {
    username1: string;
    username2: string;
    avatar1: string;
    avatar2: string;
    score1: number;
    score2: number;
    type: string;
    playDate: Date;
}