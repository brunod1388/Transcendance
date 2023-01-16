import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
//import { AuthModule } from "./auth/auth.module";
//import { UserModule } from "./user/user.module";
//import { BookmarkModule } from "./bookmark/bookmark.module";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { PrismaModule } from "./prisma/prisma.module";
import { User } from "./typeorm/entities/User";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // Connexion database
        TypeOrmModule.forRoot({
            // type eg: mysql, postgresql, mariadb...
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
        //        AuthModule,
        UsersModule,
        //        BookmarkModule,
        //        PrismaModule,
    ],
})
export class AppModule {}
