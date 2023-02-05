import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
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
            entities: ["dist/**/entities/*.entity.{ts,js}"],
            // Il faudrais mettre a false avant la fin du projet
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
