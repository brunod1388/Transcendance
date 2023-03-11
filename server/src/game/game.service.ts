import { Injectable, Inject } from "@nestjs/common";
import { GeneralGateway } from "src/general/general.gateway";
import { ClientsService } from "../clients/clients.service";
import { GameInvitationDto } from "./dto/gameInvitation.dto";

@Injectable()
export class GameService {
	@Inject(GeneralGateway)
	private generalGateway: GeneralGateway;


	emit() {
		this.generalGateway.server.emit("hello", "Bonjour");
	}
    // constructor(
    //     // private clientsService: ClientsService
    // ) {}

    // saveClients(userId: number, socketId: string, username: string) {
    //     this.clientsService.saveClient(userId, socketId, username);
    // }

    // sendInvitation(invitation: GameInvitationDto) {
    //     console.log("sendInvitation");
    // }

    // startGame() {
    //     console.log("sendInvitation");
    // }
}
