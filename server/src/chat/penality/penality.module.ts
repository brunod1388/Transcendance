import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Penality } from "../entities/Penality.entity";
import { PenalityService } from "./penality.service";
import { ChannelUsersModule } from "../channelUser/channelUsers.module";
import { ChannelUser } from "../entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([Penality, ChannelUser]),
        forwardRef(() => ChannelUsersModule),
    ],
    providers: [PenalityService],
    exports: [PenalityService],
})
export class PenalityModule {}
