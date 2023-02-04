import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import { Channel } from "./Channel.entity";
import { User } from "./User.entity";

@Entity({ name: "mutedUsers" })
export class MutedUser {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: number;

    @ManyToOne(() => Channel, (channel) => channel.id)
    channel: Channel;

    @Column()
    endDate: Date;
}
