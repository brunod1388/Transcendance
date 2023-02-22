import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/Message.entity";

import { CreateMessageParams, ModifyMessageParams } from "../utils/types";

@Injectable()
export class ChatService {
    // The argument (with name userRepository) has type Repository (generic type which accepts the entity User)
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) {}

    createMessage(messageDetails: CreateMessageParams) {
        // The spreader operator (...) will unpack the username and password property (from CreateUserParams)
        const newMessage = this.messageRepository.create({
            ...messageDetails,
            createdAt: new Date(),
            modifiedAt: new Date(),
        });
        return this.messageRepository.save(newMessage);
    }

    // modifyMessage(messageDetails: ModifyMessageParams) {
    // 	// The spreader operator (...) will unpack the username and password property (from CreateUserParams)
    // 	const modifiedMessage = this.messageRepository.update({
    // 		{ messageDetails.id },
    // 		{...messageDetails}
    // 		modifiedAt: new Date()
    // 	});
    // 	return this.messageRepository.save(modifiedMessage);
    // }
}
