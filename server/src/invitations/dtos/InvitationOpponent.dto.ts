import { IsString, IsNotEmpty } from "class-validator";

export class InvitationOpponentDTO {
    @IsString()
    @IsNotEmpty()
    requestId: string;

    @IsString()
    @IsNotEmpty()
    from: string;
}
