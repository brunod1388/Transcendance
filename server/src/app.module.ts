import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseModule } from "./database.module";
import { ChatModule } from "./chat/chat.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

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
