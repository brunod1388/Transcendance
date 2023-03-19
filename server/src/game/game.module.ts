import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { GeneralModule } from "src/general/general.module";
import { ClientsModule } from "src/clients/clients.module";

@Module({
    imports: [GeneralModule, ClientsModule],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
