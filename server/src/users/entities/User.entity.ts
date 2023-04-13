import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Channel } from "../../chat/entities/Channel.entity";
import { Friend } from "./Friend.entity";
// import { Match } from "./Match.entity";
import { Message } from "../../chat/entities/Message.entity";
import { ChannelUser } from "../../chat/entities/ChannelUser.entity";
import { Match } from "src/match/entities/Match.entity";
import { BlockedUser } from "src/chat/entities/BlockedUser.entity";
import { MutedUser } from "src/chat/entities/MutedUser.entity";

// The name provided here will be used as the table name in the db
@Entity({ name: "users" })
export class User {
    // This decorator indicates that field will be an auto-incrementing numeric value (auto-generated)
    // Equivalent to the primary key for a SQL table
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    // Uniquely identifies users (based on 42 authentication) while permitting username to be selected
    @Column({ unique: true, nullable: true })
    idFortyTwo: number;

    // In order for the property to map to an actual column in SQL table, the @Column decorator must be used
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    // If a unique constraint needs to be added, simply use @Column({ unique: true })
    @Column({ nullable: true })
    password: string;

    @Column({
        default: "http://localhost:3000/users/avatar/default_avatar.jpg",
    })
    avatar: string;

    // A default value can be set as follows @Column({ default: new Date() })
    // In the above example new Date() retrieves the current date)
    @Column()
    createdAt: Date;

    @Column({ default: "password" })
    authStrategy: string;

    @Column({ default: false })
    enable2FA: boolean;

    // A nullable property allows the field to be null as default if no value is passed (i.e. optional)
    @Column({ nullable: true })
    code2FA: string;

    @OneToMany(() => Channel, (channel) => channel.owner)
    ownedChannels: Channel[];

    @OneToMany(() => Message, (message) => message.creator)
    messages: Message[];

    @OneToMany(() => ChannelUser, (channelUser) => channelUser.user)
    channelUsers: ChannelUser[];

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendsOf: Friend[];

    @OneToMany(() => Match, (match) => match.user1)
    matches1: Match[];

    @OneToMany(() => Match, (match) => match.user2)
    matches2: Match[];

    @OneToMany(() => BlockedUser, blockedChannels => blockedChannels.user)
    blockedChannels: BlockedUser[]

    @OneToMany(() => MutedUser, mutedChannels => mutedChannels.user)
    mutedChannels: MutedUser[]
}
