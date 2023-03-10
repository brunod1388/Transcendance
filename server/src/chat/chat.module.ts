import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";
// import { ChatController } from "./chat.controller";
import { ChannelModule } from "./channel/channel.module";
import { MessageModule } from "./message/message.module";
import { MutedService } from "./muted/muted.service";
import { BlockedService } from "./blocked/blocked.service";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import { ChannelUsersModule } from "./channelUser/channelUsers.module";
import { BlockedModule } from "./blocked/blocked.module";
import { MutedModule } from "./muted/muted.module";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelUser, BlockedUser, Channel, MutedUser } from "./entities";
import { User } from "src/users/entities/User.entity";
import { FriendModule } from "src/users/friend/friend.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BlockedUser,
            ChannelUser,
            Channel,
            MutedUser,
            User,
        ]),
        ChannelModule,
        MessageModule,
        ChannelUsersModule,
        BlockedModule,
        MutedModule,
        UsersModule,
        FriendModule
    ],
    controllers: [],
    providers: [
        ChatGateway,
        MutedService,
        BlockedService,
        ChannelUserService,
        ChannelModule,
    ],
    exports: [],
})
export class ChatModule {}
