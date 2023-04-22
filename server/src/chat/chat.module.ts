import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";
// import { ChatController } from "./chat.controller";
import { ChannelModule } from "./channel/channel.module";
import { MessageModule } from "./message/message.module";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import { ChannelUsersModule } from "./channelUser/channelUsers.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelUser, Channel, Message } from "./entities";
import { User } from "src/users/entities/User.entity";
import { FriendModule } from "src/users/friend/friend.module";
import { UsersModule } from "src/users/users.module";
import { GeneralModule } from "src/general/general.module";
import { BlockedUserModule } from "./blockedUser/blockedUser.module";
import { MutedUserModule } from "./mutedUser/mutedUser.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChannelUser, Channel, User, Message]),
        ChannelModule,
        MessageModule,
        ChannelUsersModule,
        UsersModule,
        FriendModule,
        GeneralModule,
        BlockedUserModule,
        MutedUserModule,
    ],
    controllers: [],
    providers: [ChatGateway, ChannelUserService, ChannelModule],
    exports: [],
})
export class ChatModule {}
