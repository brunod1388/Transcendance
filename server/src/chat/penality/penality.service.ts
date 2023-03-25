import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ChannelUserService } from "../channelUser/channelUsers.service";
import { Repository } from "typeorm";
import { Penality } from "../entities/Penality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePenalityDTO } from "../dtos/Penality.dto";
import { ChannelUser } from "../entities";

@Injectable()
export class PenalityService {
    constructor(
        @InjectRepository(Penality)
        private penalityRepository: Repository<Penality>,
        // @Inject(forwardRef(() => ChannelUserService))
        @InjectRepository(ChannelUser)
        private channelUserRepository: Repository<ChannelUser>
    ) {}

    async findPenalityByChannelUser(channelUserId: number): Promise<Penality> {
        return await this.penalityRepository.findOne({
            relations: { channelUser: true },
            where: {
                channelUser: { id: channelUserId },
            },
            select: {
                id: true,
                type: true,
                endDate: true,
            },
        });
    }

    async createPenality(
        penalityDetails: CreatePenalityDTO
    ): Promise<Penality> {
        const channelUser = await this.channelUserRepository.findOne({
            where: { id: penalityDetails.channelUserId },
        });
        console.log("TEST :", channelUser);
        // const newPenality = await this.penalityRepository.create({
        //     type: penalityDetails.type,
        //     // endDate: penalityDetails.endDate,
        // });
        // newPenality.channelUser = channelUser;

        const penality = new Penality();
        penality.type = penalityDetails.type;
        penality.channelUser = channelUser;
        penality.endDate = new Date(penalityDetails.endDate);
        console.log("newPenality: ", penality);
        return await this.penalityRepository.save(penality);
    }
}
