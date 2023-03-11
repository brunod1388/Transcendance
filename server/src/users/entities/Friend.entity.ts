import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index,
} from "typeorm";

import { Channel } from "../../chat/entities/Channel.entity";
import { User } from "./User.entity";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

@Entity({ name: "friends" })
@Index(["user", "friend"], { unique: true })
export class Friend {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Channel, (user) => user.id)
    friend: User;

    @Column()
    isPending: boolean;
}
