import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

@Entity({ name: "channelUsers" })
export class ChannelUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.ownedChannels)
    user: number;

    @ManyToOne(() => Channel, (channel) => channel.owner)
    channel: Channel;

    @Column()
    rights: rightType;
}
