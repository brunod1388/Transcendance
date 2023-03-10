import { IsNotEmpty, IsNumber } from "class-validator";

export class FriendDto {

	@IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    friendId: number;
}
