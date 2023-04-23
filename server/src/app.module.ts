import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { GeneralModule } from "./general/general.module";
import { MatchModule } from "./match/match.module";
import { BlockedUserModule } from "./chat/blockedUser/blockedUser.module";
import { MutedUserModule } from "./chat/mutedUser/mutedUser.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        AuthModule,
        MatchModule,
        UsersModule,
        ChatModule,
        GeneralModule,
        BlockedUserModule,
        MutedUserModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule {}
