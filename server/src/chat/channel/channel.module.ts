import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Channel } from "../entities/Channel.entity";
import { ChannelService } from "./channel.service";
import { UsersModule } from "src/users/users.module";
import { ChannelUsersModule } from "../channelUser/channelUsers.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Channel]),
        UsersModule,
        forwardRef(() => ChannelUsersModule),
    ],
    providers: [ChannelService],
    exports: [ChannelService],
})
export class ChannelModule {}
