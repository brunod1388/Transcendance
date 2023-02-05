import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BlockedUser } from "../entities/BlockedUser.entity";
import { BlockedService } from "./blocked.service";

@Module({
    imports: [TypeOrmModule.forFeature([BlockedUser])],
    providers: [BlockedService],
    exports: [BlockedService],
})
export class BlockedModule {}
