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

@Entity({ name: "mutedUser" })
@Index(["user", "channel"], { unique: true })
export class MutedUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    userID: number;

    @Column()
    channelID: number;

    @ManyToOne(() => User, user => user.mutedChannels)
    user: User;

    @ManyToOne(() => Channel, channel => channel.mutedUsers)
    channel: Channel;

    @Column()
    endDate: Date;
}