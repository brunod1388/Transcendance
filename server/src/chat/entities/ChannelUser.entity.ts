import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index,
    OneToOne,
    JoinTable,
} from "typeorm";
import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
    OWNER = "owner",
}

export enum MuteOrBlock {
    None,
    Mute,
    Block,
}

@Entity({ name: "channelUsers" })
@Index(["user", "channel"], { unique: true })
export class ChannelUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.ownedChannels)
    user: User;

    @ManyToOne(() => Channel, (channel) => channel.owner, { onDelete: 'CASCADE' })
    channel: Channel;

    @Column()
    rights: rightType;

    @Column()
    isPending: boolean;

}
