import { IsString, IsNotEmpty } from "class-validator";

export class InvitationRequestDTO {
    @IsString()
    @IsNotEmpty()
    fromUser: string;

    @IsString()
    @IsNotEmpty()
    toUser: string;
}
