import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";
// import { ChatController } from "./chat.controller";
import { ChannelModule } from "./channel/channel.module";
import { MessageModule } from "./message/message.module";
import { PenalityService } from "./penality/penality.service";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import { ChannelUsersModule } from "./channelUser/channelUsers.module";
import { PenalityModule } from "./penality/penality.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelUser, Channel, Message } from "./entities";
import { User } from "src/users/entities/User.entity";
import { FriendModule } from "src/users/friend/friend.module";
import { UsersModule } from "src/users/users.module";
import { Penality } from "./entities/Penality.entity";
import { GeneralModule } from "src/general/general.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ChannelUser,
            Channel,
            Penality,
            User,
            Message,
        ]),
        ChannelModule,
        MessageModule,
        ChannelUsersModule,
        PenalityModule,
        UsersModule,
        FriendModule,
        GeneralModule,
    ],
    controllers: [],
    providers: [
        ChatGateway,
        PenalityService,
        ChannelUserService,
        ChannelModule,
    ],
    exports: [],
})
export class ChatModule {}
