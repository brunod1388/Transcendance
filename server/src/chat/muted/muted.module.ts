import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MutedUser } from "../entities/MutedUser.entity";
import { MutedService } from "./muted.service";

@Module({
    imports: [TypeOrmModule.forFeature([MutedUser])],
    providers: [MutedService],
    exports: [MutedService],
})
export class MutedModule {}
