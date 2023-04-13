import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index,
} from "typeorm";
import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";

@Entity({ name: "blockedUser" })
@Index(["user", "channel"], { unique: true })
export class BlockedUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    userID: number;

    @Column()
    channelID: number;

    @ManyToOne(() => User, user => user.blockedChannels)
    user: User;

    @ManyToOne(() => Channel, channel => channel.blockedUsers)
    channel: Channel;

    @Column()
    endDate: Date;
}