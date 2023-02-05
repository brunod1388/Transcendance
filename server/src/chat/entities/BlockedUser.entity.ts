import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";

@Entity({ name: "blockedUsers" })
export class BlockedUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: number;

    @ManyToOne(() => Channel, (channel) => channel.id)
    channel: Channel;

    @Column()
    endDate: Date;
}
