import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./typeorm/entities/User";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { ChatModule } from "./chat/chat.module";
import { PongModule } from "./pong/pong.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // Connexion database
        TypeOrmModule.forRoot({
            // type eg: mysql, postgres, mariadb...
            type: "postgres",
            // host: nom du container docker
            host: "postgresql",
            // port de la database

            port: 5432,
            // information de connexion
            username: "root",
            password: "root",
            database: "myDB",
            // entitées nestjs
            entities: [User],
            // Il faudrais mettre a false avant la fin du projet
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
        ChatModule,
        PongModule,
    ],
    controllers: [AppController],
    providers: [],
    exports: [],
})
export class AppModule {}
