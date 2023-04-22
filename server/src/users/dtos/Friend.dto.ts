import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "../entities/User.entity";

export class CreateFriendDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    friendId: number;
}

export interface FriendDTO {
    id: number;
    user?: User;
    friend?: User;
    isPending?: boolean;
    type?: "friend";
    avatar?: string;
    username?: string;
	connected?: boolean;
	inGame?: boolean
}
