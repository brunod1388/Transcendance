import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockedUser } from "../entities/BlockedUser.entity";
import { Repository } from "typeorm";

@Injectable()
export class BlockedService {
    constructor(
        @InjectRepository(BlockedUser)
        private channelUserRepository: Repository<BlockedUser>
    ) {}
}
