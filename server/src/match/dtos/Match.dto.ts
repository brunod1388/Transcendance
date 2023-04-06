import { IsNotEmpty, IsNumber } from "class-validator";
import { MatchType } from "../entities/Match.entity";

export class CreateMatchDto {
    @IsNumber()
    @IsNotEmpty()
    user1id: number;

    @IsNumber()
    @IsNotEmpty()
    user2id: number;

    @IsNotEmpty()
    score1: number;

    @IsNotEmpty()
    score2: number;

    @IsNotEmpty()
    type: MatchType;
}
