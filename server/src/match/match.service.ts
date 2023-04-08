import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Match } from "./entities/Match.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMatchDto } from "./dtos/Match.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {}

    async findMatchByUserId(userid: number): Promise<Match[]> {
        return this.matchRepository.find({
            relations: {
                user1: true,
                user2: true,
            },
            where: [{ user1: { id: userid } }, { user2: { id: userid } }],
            select: {
                user1: { id: true, username: true, avatar: true },
                user2: { id: true, username: true, avatar: true },
                score1: true,
                score2: true,
                playDate: true,
            },
        });
    }

    async findMatchByUsersId(
        user1id: number,
        user2id: number
    ): Promise<Match[]> {
        return this.matchRepository.find({
            relations: {
                user1: true,
                user2: true,
            },
            where: [
                { user1: { id: user1id }, user2: { id: user2id } },
                { user1: { id: user2id }, user2: { id: user1id } },
            ],
            select: {
                user1: { id: true, username: true, avatar: true },
                user2: { id: true, username: true, avatar: true },
                score1: true,
                score2: true,
                playDate: true,
            },
        });
    }

    async createMatch(matchDetail: CreateMatchDto): Promise<Match> {
        const user1 = await this.userService.findUserId(matchDetail.user1id);
        const user2 = await this.userService.findUserId(matchDetail.user2id);

        const match = this.matchRepository.create({
            user1: user1,
            user2: user2,
            score1: matchDetail.score1,
            score2: matchDetail.score2,
            type: matchDetail.type,
        });

        return this.matchRepository.save(match);
    }
}
