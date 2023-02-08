import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Channel } from "../../chat/entities/Channel.entity";
import { User } from "./User.entity";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

@Entity({ name: "friends" })
export class Friend {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: number;

    @ManyToOne(() => Channel, (user) => user.id)
    friend: number;

    @Column()
    isPending: boolean;
}
