import { Injectable, Inject, Body } from "@nestjs/common";
import { InvitationDto } from "src/general/dto/invitation.dto";
import { GeneralGateway } from "src/general/general.gateway";
import { ClientsService } from "../clients/clients.service";
import { GameInvitationDto } from "./dto/gameInvitation.dto";
import { GameResponseDto } from "./dto/gameResponse.dto";

@Injectable()
export class GameService {
    @Inject(GeneralGateway)
    private generalGateway: GeneralGateway;

    @Inject(ClientsService)
    private clientsService: ClientsService;

    emit(invitation: GameInvitationDto) {
        this.generalGateway.server.emit("invitation", invitation);
    }

    emit2(response: GameResponseDto) {
        this.generalGateway.server.emit("response", response);
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
