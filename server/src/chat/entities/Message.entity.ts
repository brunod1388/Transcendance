import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";

@Entity({ name: "messages" })
export class Message {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    creator: User;

    @ManyToOne(() => Channel, (channel) => channel.id, { onDelete: "CASCADE" })
    channel: Channel;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}
