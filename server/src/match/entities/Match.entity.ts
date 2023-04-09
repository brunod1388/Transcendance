import { User } from "src/users/entities/User.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

export type MatchType = "Training" | "Ranked";
@Entity("Matches")
export class Match {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user1: User;

    @ManyToOne(() => User, (user) => user.id)
    user2: User;

    @Column()
    score1: number;

    @Column()
    score2: number;

    @CreateDateColumn()
    playDate: Date;

	@ManyToOne(() => User, (user) => user.id)
    winner: User;

    @Column()
    type: MatchType;
}
