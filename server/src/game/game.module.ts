import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { GeneralModule } from "src/general/general.module";

@Module({
    imports: [GeneralModule],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
