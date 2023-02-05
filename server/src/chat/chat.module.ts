import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";
import { ChatController } from "./chat.controller";
import { ChannelModule } from "./channel/channel.module";
import { MessageModule } from "./message/message.module";
import { MutedService } from "./muted/muted.service";
import { BlockedService } from "./blocked/blocked.service";
import { ChannelUserService } from "./channel-user/channel-user.service";
import { ChannelUserModule } from "./channel-user/channel-user.module";
import { BlockedModule } from "./blocked/blocked.module";
import { MutedModule } from "./muted/muted.module";

@Module({
    imports: [
        ChannelModule,
        MessageModule,
        ChannelUserModule,
        BlockedModule,
        MutedModule,
    ],
    controllers: [],
    providers: [ChatGateway, MutedService, BlockedService, ChannelUserService],
    exports: [],
})
export class ChatModule {}
