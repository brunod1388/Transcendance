import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/User.entity";
import { BlockedUser, ChannelUser, Message, MutedUser } from "../entities";

// to put in a dto
export enum ChannelType {
    PRIVATE = "protected",
    PUBLIC = "public",
    DIRECT = "direct",
}

@Entity({ name: "channels" })
export class Channel {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.ownedChannels)
    owner: User;

    @Column({ unique: true, type: "varchar", length: 42 })
    name: string;

    @Column({ default: null })
    image: string;

    @Column({ type: "enum", enum: ChannelType })
    type: ChannelType;

    @Column({ default: null })
    password: string;

    @CreateDateColumn()
    creationDate: Date;

    @OneToMany(() => Message, (message) => message.channel)
    messages: Message[];

    @OneToMany(() => MutedUser, (mutedUser) => mutedUser.channel)
    mutedUsers: MutedUser[];

    @OneToMany(() => BlockedUser, (blockedUser) => blockedUser.channel)
    blockedUsers: BlockedUser[];

    @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
    channelUsers: ChannelUser[];
}
