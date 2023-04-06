import { User } from "src/users/entities/User.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";

export type MatchType = "Training" | "Ranked";
@Entity("Matches")
export class Match {
    @PrimaryColumn({ type: "bigint" })
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

	@Column()
	type: MatchType;

}
