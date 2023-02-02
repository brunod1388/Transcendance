import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from "typeorm";
import { User } from "./User";

// to put in a dto
export enum ChannelType {
    PRIVATE = "private",
    PUBLIC = "public",
    DIRECT = "direct",
}

@Entity({ name: "channels" })
export class Channel {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    // @ManyToOne(() => User, (user) => user.ownedChannels)
    // ownerId: number;

    @Column({ type: "varchar", length: 42 })
    name: string;

    @Column({ type: "enum", enum: ChannelType })
    type: ChannelType;

    @Column({ default: null })
    password: string;

    @CreateDateColumn()
    creationDate: Date;
}
