import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Channel } from "../entities/Channel.entity";
import { ChannelService } from "./channel.service";
import { UsersModule } from "src/users/users.module";
import { ChannelUsersModule } from "../channelUser/channelUsers.module";
import { ChannelUser } from "../entities/ChannelUser.entity";
import { User } from "src/users/entities/User.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Channel, ChannelUser, User]),
        UsersModule,
        forwardRef(() => ChannelUsersModule),
    ],
    providers: [ChannelService],
    exports: [ChannelService],
})
export class ChannelModule {}
