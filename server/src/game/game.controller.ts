import { Controller, Post, Body } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameInvitationDto } from "./dto/gameInvitation.dto";
import { GameResponseDto } from "./dto/gameResponse.dto";

@Controller("game")
export class GameController {
    constructor(private gameService: GameService) {}

    @Post("invitation")
    async handleGameInvitation(@Body() invitation: GameInvitationDto) {
        console.log("invitation received");
        await this.gameService.emit(invitation);
        // this.gameService.sendInvitation(invitation);
    }

    @Post("response")
    async handleGameResponse(@Body() response: GameResponseDto) {
        console.log("invitation received");
        await this.gameService.emit2(response);
        // this.gameService.sendInvitation(invitation);
    }
}
