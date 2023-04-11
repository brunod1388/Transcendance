import { Module, forwardRef } from "@nestjs/common";
import { Match } from "./entities/Match.entity";
import { MatchService } from "./match.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchGateway } from "./match.gateway";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Match]), forwardRef(() => UsersModule)],
    providers: [MatchGateway, MatchService],
    exports: [MatchService],
})
export class MatchModule {}
