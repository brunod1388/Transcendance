import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Channel } from "../../chat/entities/Channel.entity";
import { Friend } from "./Friend.entity";
// import { Match } from "./Match.entity";
import { Message } from "../../chat/entities/Message.entity";
import { MutedUser } from "../../chat/entities/MutedUser.entity";
import { BlockedUser } from "../../chat/entities/BlockedUser.entity";
import { ChannelUser } from "../../chat/entities/ChannelUser.entity";

// The name provided here will be used as the table name in the db
@Entity({ name: "users" })
export class User {
    // This decorator indicates that field will be an auto-incrementing numeric value (auto-generated)
    // Equivalent to the primary key for a SQL table
    @PrimaryGeneratedColumn("uuid")
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

    @Column({ nullable: true })
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

    @OneToMany(() => MutedUser, (mutedUser) => mutedUser.user)
    mutedUsers: MutedUser[];

    @OneToMany(() => BlockedUser, (blockedUser) => blockedUser.user)
    blockedUsers: BlockedUser[];

    @OneToMany(() => ChannelUser, (channelUser) => channelUser.user)
    channelUsers: ChannelUser[];

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendsOf: Friend[];
}
