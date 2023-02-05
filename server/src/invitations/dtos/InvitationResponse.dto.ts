import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class InvitationResponseDTO {
    @IsString()
    @IsNotEmpty()
    requestId: string;

    @IsNumber()
    @IsNotEmpty()
    statut: number;
}
