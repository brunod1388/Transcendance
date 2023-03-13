import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ChannelUsersModule } from "./chat/channelUser/channelUsers.module";
import { ChannelModule } from "./chat/channel/channel.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        AuthModule,
        UsersModule,
        ChatModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule {}
