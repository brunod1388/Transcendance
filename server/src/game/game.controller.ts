import { Controller, Post, Body } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameInvitationDto } from "./dto/gameInvitation.dto";

@Controller("game")
export class GameController {
    constructor(private gameService: GameService) {}

    @Post("invitation")
    async handleGameInvitation(@Body() invitation: any) {
        console.log("invitation received");
		await this.gameService.emit();
        // this.gameService.sendInvitation(invitation);
    }
}
