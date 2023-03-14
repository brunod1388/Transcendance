import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities";
import { MessageBody } from "@nestjs/websockets";
import { CreateMessageDto, GetMessageDto, UpdateMessageDto } from "../dtos/Message.dto";
import { User } from "src/users/entities/User.entity";
import { Channel } from "../entities";
@Injectable()
export class MessageService {

	constructor(
		@InjectRepository(Message)
		private messageRepository: Repository<Message>
	) {}

	async createMessage(user: User, channel: Channel, content: string) {
		console.log("content", content)
		const message = await this.messageRepository.create({
			creator: user,
			channel: channel,
			content: content
		})
		console.log(message)
		this.messageRepository.save(message);
		return message;
	}

	async getMessage(details: GetMessageDto) {
		const {channelId, nb = 5 } = details;
		const messages = this.messageRepository.find({
			relations: { creator: true },
			where: {channel: { id: channelId }},
			select: {
				id: true,
				createdAt: true,
				modifiedAt: true,
				content: true,
				creator: { id: true, username: true, avatar: true }
			},
			order: { createdAt: "DESC"},
			take: nb,
		})
		return messages
	}

	async updateMessage(messageDto: UpdateMessageDto) {
		const message = await this.messageRepository.findOne({
			where: { id: messageDto.id }
		})

		message.content = messageDto.content;
		this.messageRepository.save(message);
		return message;
	}
}
