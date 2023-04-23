import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Match } from "./entities/Match.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMatchDto } from "./dtos/Match.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/User.entity";
import { Server, Socket } from "socket.io";

export enum GameMode {
    CLASSIC = "classic",
    PINGPONG = "pingpong",
}

interface JoinPongDto {
    room: string;
    mode: GameMode;
}

interface PongData {
    isPong: boolean;
    data: JoinPongDto;
    host: boolean;
}

interface MatchSummary {
    totalWins: number;
    totalLoses: number;
    totalGames: number;
    points: number;
    league: string;
}

@Injectable()
export class MatchService {
    private matchmaking: number[];
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {
        this.matchmaking = [];
    }

    isInMatchmaking(userId: number): boolean {
        return this.matchmaking.includes(userId);
    }

    async addUserToMatchmaking(server: Server, client: Socket, userId: number) {
        if (
            (await this.getMatchmakingOpponent(server, client, userId)) ===
            false
        ) {
            this.matchmaking.push(userId);
        }
    }

    createId(): string {
        return (
            Date.now().toString(36) + Math.random().toString(36).substring(2)
        );
    }

    async getMatchmakingOpponent(
        server: Server,
        client: Socket,
        userId: number
    ) {
        if (this.matchmaking.length !== 0) {
            const all_sockets = await server.fetchSockets();
            const opponentId = this.getUsersFromMatchmaking().find(
                (s) => s !== userId
            );
            const opponentSocket = all_sockets.find(
                (s) => s.data.user.id === opponentId
            );
            const room = this.createId();
            client.join(room);
            opponentSocket.join(room);
            opponentSocket.emit("joinPongByMatchmaking", {
                isPong: true,
                host: true,
                data: {
                    room: room,
                    mode: GameMode.CLASSIC,
                },
            });
            client.emit("joinPongByMatchmaking", {
                isPong: true,
                host: false,
                data: {
                    room: room,
                    mode: GameMode.CLASSIC,
                },
            });
            this.removeUserFromMatchmaking(opponentId);
            return true;
        }
        return false;
    }

    removeUserFromMatchmaking(userId: number) {
        console.log(this.matchmaking);
        this.matchmaking = this.matchmaking.filter((user) => user !== userId);
        console.log(this.matchmaking);
    }

    getUsersFromMatchmaking() {
        return this.matchmaking;
    }

    async findMatchByUserId(userid: number): Promise<Match[]> {
        return this.matchRepository.find({
            relations: {
                user1: true,
                user2: true,
                winner: true,
            },
            where: [{ user1: { id: userid } }, { user2: { id: userid } }],
            select: {
                user1: { id: true, username: true, avatar: true },
                user2: { id: true, username: true, avatar: true },
                score1: true,
                score2: true,
                playDate: true,
                winner: { id: true },
            },
        });
    }

    async findMatchByUsersId(
        user1id: number,
        user2id: number
    ): Promise<Match[]> {
        return this.matchRepository.find({
            relations: {
                user1: true,
                user2: true,
            },
            where: [
                { user1: { id: user1id }, user2: { id: user2id } },
                { user1: { id: user2id }, user2: { id: user1id } },
            ],
            select: {
                user1: { id: true, username: true, avatar: true },
                user2: { id: true, username: true, avatar: true },
                score1: true,
                score2: true,
                playDate: true,
            },
        });
    }

    async createMatch(matchDetail: CreateMatchDto) {
        const user1 = await this.userService.findUserId(matchDetail.user1id);
        const user2 = await this.userService.findUserId(matchDetail.user2id);
        console.log(
            matchDetail.score1,
            matchDetail.score2,
            matchDetail.type,
            matchDetail.user1id,
            matchDetail.user2id,
            matchDetail.winner
        );
        const match = this.matchRepository.create({
            user1: user1,
            user2: user2,
            score1: matchDetail.score1,
            score2: matchDetail.score2,
            winner: matchDetail.winner === user1.id ? user1 : user2,
            type: matchDetail.type,
        });

        return this.matchRepository.save(match);
    }

    async getUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    async getMatchSummaryById(userId: number) {
        const matches: Match[] = await this.findMatchByUserId(userId);
        const summary: MatchSummary = {
            totalWins: 0,
            totalLoses: 0,
            totalGames: 0,
            points: 0,
            league: "Noob",
        };

        matches.forEach((match: Match) => {
            summary.totalGames += 1;
            match.winner.id === userId
                ? (summary.totalWins += 1)
                : (summary.totalLoses += 1);
            summary.points += match.winner.id === userId ? 3 : 1;
        });
        return summary;
    }
}
