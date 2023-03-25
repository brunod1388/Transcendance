import { Channel } from "../../chat/entities/Channel.entity";
import { Friend } from "../entities/Friend.entity";
// import { Match } from "./Match.entity";
import { Message } from "../../chat/entities/Message.entity";
import { ChannelUser } from "../../chat/entities/ChannelUser.entity";

export interface UserDTO {
    id: number;
    username: string;
    email?: string;
    avatar?: string;
}
