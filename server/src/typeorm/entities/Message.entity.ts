import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import { Channel } from "./Channel.entity";
import { User } from "./User.entity";

@Entity({ name: "messages" })
export class Message {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    creator: number;

    @ManyToOne(() => Channel, (channel) => channel.id)
    channel: Channel;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @Column()
    modifiedAt: Date;
}
