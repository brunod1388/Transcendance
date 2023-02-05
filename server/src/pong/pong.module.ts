import { Module } from "@nestjs/common";
import { PongGateway } from "./pong.gateway";
import { PongService } from "./pong.service";

@Module({
    imports: [],
    controllers: [],
    providers: [PongService, PongGateway],
    exports: [],
})
export class PongModule {}
