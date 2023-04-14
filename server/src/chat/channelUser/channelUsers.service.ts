import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ChannelUser, rightType } from "../entities/ChannelUser.entity";
import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelService } from "../channel/channel.service";
import { ChannelUserDTO, CreateChannelUserDto } from "../dtos/ChannelUsers.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/User.entity";
import { Channel } from "diagnostics_channel";
import { ChannelType } from "../entities";
import { UserDTO } from "src/users/dtos/User.dto";

@Injectable()
export class ChannelUserService {
    constructor(
        @InjectRepository(ChannelUser)
        private channelUserRepository: Repository<ChannelUser>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => ChannelService))
        private channelService: ChannelService
    ) {}

    async createChannelUser(
        channelUserDetails: CreateChannelUserDto
    ): Promise<ChannelUser> {
        const user = await this.userService.findUserId(
            channelUserDetails.userId
        );
        const channel = await this.channelService.findChannelById(
            channelUserDetails.channelId
        );
        const newChannelUser = await this.channelUserRepository.create({
            ...channelUserDetails,
            user: user,
            channel: channel,
        });
        try {
            const channelUser = await this.channelUserRepository.save(
                newChannelUser
            );
            return channelUser;
        } catch (error) {
            // if (
            //     "ExecConstraints" === error.routine ||
            //     "_bt_check_unique" === error.routine
            // )
            //     return "ChannelUser already exist or is pending";
            return undefined;
        }
    }

    async getChannelUsers(
        channelId: number,
        isPending: boolean
    ): Promise<ChannelUser[]> {
        const channelUsers = await this.channelUserRepository.find({
            relations: {
                user: true,
                channel: true,
            },
            where: {
                isPending: isPending,
                channel: { id: channelId },
            },
            select: {
                id: true,
                user: { id: true, username: true, avatar: true },
                channel: { id: true, name: true, image: true },
                rights: true,
            },
        });
        return channelUsers;
    }

    async findChannelUserById(channelUserId: number): Promise<ChannelUser> {
        const channelUsers = await this.channelUserRepository.findOne({
            relations: {
                user: true,
                channel: true,
            },
            where: {
                id: channelUserId,
            },
            select: {
                id: true,
                user: { id: true, username: true, avatar: true },
                channel: { id: true, name: true, image: true },
                rights: true,
            },
        });
        return channelUsers;
    }

    async getChannelUsersByUserId(
        userId: number,
        isPending: boolean
    ): Promise<ChannelUser[]> {
        const channelUsers = await this.channelUserRepository.find({
            relations: {
                user: true,
                channel: true,
            },
            where: {
                isPending: isPending,
                user: { id: userId },
            },
            select: {
                id: true,
                user: { id: true, username: true, avatar: true },
                channel: { id: true, name: true, image: true },
                rights: true,
            },
        });
        return channelUsers;
    }

    async updateChannelUser(
        channelUserDetails: ChannelUserDTO
    ): Promise<ChannelUser | undefined> {
        const {
            id,
            isPending = false,
            rights = rightType.NORMAL,
        } = channelUserDetails;
        const channelUser = await this.channelUserRepository.findOne({
            relations: {
                channel: true,
                user: true,
            },
            where: {
                id: id,
            },
            select: {
                id: true,
                channel: { id: true },
                user: { id: true, username: true, avatar: true },
                rights: true,
                isPending: true,
            },
        });
        if (channelUser === undefined) return undefined;
        channelUser.isPending = isPending;
        channelUser.rights = rights;
        await this.channelUserRepository.save(channelUser);
        return channelUser;
    }

    async deleteChannelUser(id: number): Promise<string> {
        await this.channelUserRepository.delete({ id });
        return `channelUser ${id} deleted`;
    }

    async getPrivateUsers(userId: number): Promise<UserDTO[]> {
        const channelUsers = await this.channelUserRepository.find({
            relations: { channel: true},
            where: {
                channel: {type: ChannelType.PRIVATE},
                user: { id: userId }
            },
            select: {
                channel: {id: true}
            }
        })
        const privateUsers = [];
        for (const channelUser of channelUsers) {
            const chanUsers = await this.getChannelUsers(channelUser.channel.id, false);
            chanUsers.forEach((cUser) => {
                if (Number(cUser.user.id) !== userId)
                {
                    privateUsers.push({
                        id: cUser.user.id,
                        username: cUser.user.username,
                        avatar: cUser.user.avatar,
                        channelId: cUser.channel.id,
                        channelUserId: cUser.id,
                        rights: cUser.rights,
                        room: cUser.channel.name
                    })
                }
            })
        }
        return privateUsers;
    }
}
