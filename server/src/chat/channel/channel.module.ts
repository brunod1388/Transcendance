import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Channel } from "../entities/Channel.entity";
import { ChannelService } from "./channel.service";

@Module({
    imports: [TypeOrmModule.forFeature([Channel])],
    providers: [ChannelService],
    exports: [ChannelService],
})
export class ChannelModule {}
