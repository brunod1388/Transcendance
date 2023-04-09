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

interface MatchElement {
	username1: string,
	username2: string,
	score1: number,
	score2: number,
	avatar1: string,
	avatar2: string,
	type: MatchType,
	playDate: string,
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
        const matches: Match[]  = await this.matchService.findMatchByUserId(userid);
		let matchesList: Array<MatchElement> = [];

		matches.forEach((match: Match) => {
			matchesList.push({
				username1: match.user1.username, 
				username2: match.user2.username,
				score1: match.score1,
				score2: match.score2,
				avatar1: match.user1.avatar,
				avatar2: match.user2.avatar,
				type: match.type,
				playDate: match.playDate.toJSON()})
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
    async HandleJoinMatchmaking(client: Socket,  userId: number) {
        await this.matchService.addUserToMatchmaking(this.server, client, userId);
		client.emit("matchmakingStatus", this.matchService.isInMatchmaking(userId));
    }

	@SubscribeMessage("leaveMatchmaking")
    async HandleLeaveMatchmaking(@MessageBody() userId: number){
        this.matchService.removeUserFromMatchmaking(userId);
    }

	@SubscribeMessage("getStatusMatchmaking")
    async HandleMatchmakingStatus(client: Socket, userId: number){
        const isWaiting = this.matchService.isInMatchmaking(userId);
		client.emit("matchmakingStatus", isWaiting);
    }
}
