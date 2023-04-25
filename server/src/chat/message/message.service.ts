import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities";
import { MessageBody } from "@nestjs/websockets";
import {
    CreateMessageDto,
    GetMessagesDto,
    UpdateMessageDto,
} from "../dtos/Message.dto";
import { User } from "src/users/entities/User.entity";
import { Channel } from "../entities";
@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) {}

    async createMessage(
        user: User,
        channel: Channel,
        content: string
    ): Promise<Message> {
        const message = await this.messageRepository.create({
            creator: user,
            channel: channel,
            content: content,
        });
        return this.messageRepository.save(message);
    }

    async getNLastMessage(details: GetMessagesDto): Promise<Message[]> {
        const messages = await this.messageRepository.find({
            relations: { creator: true, channel: true },
            where: { channel: { id: details.id } },
            select: {
                id: true,
                createdAt: true,
                modifiedAt: true,
                content: true,
                creator: { id: true, username: true, avatar: true },
                channel: { id: true, name: true },
            },
            order: { createdAt: "DESC" },
            take: details.nb,
        });
        return messages;
    }

    async getLastMessage(channelid: number): Promise<string | null> {
        const message = await this.messageRepository.findOne({
            relations: { channel: true },
            where: { channel: { id: channelid } },
            select: {
                id: true,
                content: true,
                createdAt: true,
            },
            order: { createdAt: "DESC" },
        });
        return message ? message.content : null;
    }

    async updateMessage(messageDto: UpdateMessageDto): Promise<Message> {
        const message = await this.messageRepository.findOne({
            where: { id: messageDto.id },
        });
        message.content = messageDto.content;
        this.messageRepository.save(message);
        return message;
    }
}
