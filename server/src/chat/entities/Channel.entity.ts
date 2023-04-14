import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/User.entity";
import { ChannelUser, Message } from "../entities";

// to put in a dto
export enum ChannelType {
    PROTECTED = "protected",
    PUBLIC = "public",
    PRIVATE = "private",
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

    @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
    channelUsers: ChannelUser[];
}
