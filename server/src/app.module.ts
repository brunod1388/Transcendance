import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ChannelUsersModule } from "./chat/channelUser/channelUsers.module";
import { ChannelModule } from "./chat/channel/channel.module";
import { GameModule } from "./game/game.module";
import { ClientsModule } from "./clients/clients.module";
import { GeneralModule } from "./general/general.module";
import { MatchModule } from "./match/match.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        AuthModule,
        MatchModule,
        UsersModule,
        ChatModule,
        GameModule,
        ClientsModule,
        GeneralModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule {}
