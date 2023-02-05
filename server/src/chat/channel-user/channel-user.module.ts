import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChannelUser } from "../entities/ChannelUser.entity";
import { ChannelUserService } from "./channel-user.service";

@Module({
    imports: [TypeOrmModule.forFeature([ChannelUser])],
    providers: [ChannelUserService],
    exports: [ChannelUserService],
})
export class ChannelUserModule {}
