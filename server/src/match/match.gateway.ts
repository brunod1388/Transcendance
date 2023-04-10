import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MatchService } from "./match.service";
import { Match, MatchType } from "./entities/Match.entity";
import { CreateMatchDto } from "./dtos/Match.dto";
import { User } from "src/users/entities/User.entity";

interface MatchElement {
    username1: string;
    username2: string;
    score1: number;
    score2: number;
    avatar1: string;
    avatar2: string;
    type: MatchType;
    playDate: string;
}

interface MatchSummary {
    totalWins: number;
    totalLoses: number;
    totalGames: number;
    points: number;
    league: string;
}

interface Player {
    username: string;
    avatar: string;
    wins: number;
    losses: number;
    points: number;
    league: string;
}

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class MatchGateway {
    @WebSocketServer()
    server: Server;

    constructor(private matchService: MatchService) {}

    @SubscribeMessage("getMatchesByUsers")
    async getMatchesByUsersId(
        @MessageBody("user1id") user1id: number,
        @MessageBody("user2id") user2id: number
    ): Promise<Match[]> {
        return await this.matchService.findMatchByUsersId(user1id, user2id);
    }

    @SubscribeMessage("getMatchesByUser")
    async getMatchesByUserId(client: Socket, userid: number) {
        const matches: Match[] = await this.matchService.findMatchByUserId(
            userid
        );

        matches.sort((n1, n2) => {
            if (n1.playDate < n2.playDate) {
                return 1;
            }
            if (n1.playDate > n2.playDate) {
                return -1;
            }
            return 0;
        });
        const matchesList: Array<MatchElement> = [];

        matches.forEach((match: Match) => {
            matchesList.push({
                username1: match.user1.username,
                username2: match.user2.username,
                score1: match.score1,
                score2: match.score2,
                avatar1: match.user1.avatar,
                avatar2: match.user2.avatar,
                type: match.type,
                playDate: match.playDate.toJSON(),
            });
        });
        client.emit("receiveMatchesByUser", JSON.stringify(matchesList));
    }

    @SubscribeMessage("newMatch")
    async createNewMatch(
        @MessageBody() matchDetail: CreateMatchDto
    ): Promise<string> {
        const match = await this.matchService.createMatch(matchDetail);
        if (match === undefined) return "Something went wrong. Match not saved";
        return "Match Saved";
    }

    @SubscribeMessage("joinMatchmaking")
    async HandleJoinMatchmaking(client: Socket, userId: number) {
        await this.matchService.addUserToMatchmaking(
            this.server,
            client,
            userId
        );
        client.emit(
            "matchmakingStatus",
            this.matchService.isInMatchmaking(userId)
        );
    }

    @SubscribeMessage("leaveMatchmaking")
    async HandleLeaveMatchmaking(@MessageBody() userId: number) {
        this.matchService.removeUserFromMatchmaking(userId);
    }

    @SubscribeMessage("getStatusMatchmaking")
    async HandleMatchmakingStatus(client: Socket, userId: number) {
        const isWaiting = this.matchService.isInMatchmaking(userId);
        client.emit("matchmakingStatus", isWaiting);
    }

    @SubscribeMessage("getMatchSummary")
    async HandleGetMatchSummary(client: Socket, userId: number) {
        const summary = await this.matchService.getMatchSummaryById(userId);
        client.emit("matchSummary", summary);
    }

    @SubscribeMessage("getPlayersRanking")
    async GetPlayersRanking(client: Socket) {
        const allUsers: User[] = await this.matchService.getUsers();
        const playerRanking: Array<Player> = [];

        for (const user of allUsers) {
            const summary = await this.matchService.getMatchSummaryById(
                user.id
            );
            playerRanking.push({
                username: user.username,
                avatar: user.avatar,
                wins: summary.totalWins,
                losses: summary.totalLoses,
                points: summary.points,
                league: summary.league,
            });
        }

        playerRanking.sort((n1, n2) => {
            if (n1.points < n2.points) {
                return 1;
            }
            if (n1.points > n2.points) {
                return -1;
            }
            return 0;
        });
        client.emit("playersRanking", playerRanking);
    }

    // 	<div>
    // 	<span>Total wins</span> <span>{0}</span>
    // </div>
    // <div>
    // 	<span>Total losses</span> <span>{0}</span>
    // </div>
    // <div>
    // 	<span>Total games</span> <span>{0}</span>
    // </div>
    // <div>
    // 	<span>Points</span> <span>{0}</span>
    // </div>
    // <div>
    // 	<span>League</span> <span>{"Noob"}</span>
    // </div>
}
