import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index,
    Check,
    Unique,
} from "typeorm";

import { Channel } from "../../chat/entities/Channel.entity";
import { User } from "./User.entity";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

@Entity({ name: "friends" })
@Index(["user", "friend"], { unique: true })
@Check(`"userId" <> "friendId"`)
// @Unique(["user", "friend"])
// @Unique(["friend", "user"])
export class Friend {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => User, (user) => user.id)
    friend: User;

    @Column()
    isPending: boolean;
}
