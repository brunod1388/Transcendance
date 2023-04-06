import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { MatchService } from "./match.service";
import { Match } from "./entities/Match.entity";
import { CreateMatchDto } from "./dtos/Match.dto";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class MatchGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private matchService: MatchService,
    ) {}

    @SubscribeMessage("getMatchesByUsers")
    async getMatchesByUsersId(
		@MessageBody("user1id") user1id: number,
		@MessageBody("user2id") user2id: number,
	): Promise<Match[]> {
        return await this.matchService.findMatchByUsersId(user1id, user2id);
    }

	@SubscribeMessage("getMatchesByUsers")
    async getMatchesByUserId(
		@MessageBody("user1id") userid: number
	): Promise<Match[]> {
        return await this.matchService.findMatchByUserId(userid);
    }

	@SubscribeMessage("newMatch")
	async createNewMatch(
		@MessageBody("matchDetail") matchDetail: CreateMatchDto
	): Promise<string> {
		const match = await this.matchService.createMatch(matchDetail);
		if (match === undefined)
			return "Something went wrong. Match not saved"
		return "Match Saved"
	}
}
