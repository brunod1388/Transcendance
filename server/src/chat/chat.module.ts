import { Module } from "@nestjs/common";
import { ChatGateway } from "../chat/chat.gateway";

@Module({
    imports: [ChatGateway],
    controllers: [],
    providers: [],
    exports: [],
})
export class ChatModule {}
