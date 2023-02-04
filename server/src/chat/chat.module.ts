import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";
import { Channel } from "../typeorm/entities/Channel.entity";
import { ChannelUser } from "../typeorm/entities/ChannelUser.entity";
import { BlockedUser } from "../typeorm/entities/BlockedUser.entity";
import { MutedUser } from "../typeorm/entities/MutedUser.entity";
import { Message } from "../typeorm/entities/Message.entity";
import { ChatController } from "./chat.controller";

@Module({
    imports: [ChatGateway],
    controllers: [],
    providers: [],
    exports: [],
})
export class ChatModule {}
