import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { ChannelUser } from "./ChannelUser.entity";

export type MuteOrBlock = "Mute" | "Block" | "None";

@Entity({ name: "penalities" })
export class Penality {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    type: MuteOrBlock;

    @Column()
    endDate: Date;

    @OneToOne(() => ChannelUser)
    @JoinColumn()
    channelUser: ChannelUser;
}
