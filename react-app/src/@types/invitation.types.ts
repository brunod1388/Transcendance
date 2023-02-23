import { DispatchType } from ".";

export interface InvitationDTO {
    requestId: string;
    from: string;
}

export interface InvitationRequestDTO {
    fromUser: string;
    toUser: string;
}

export interface InvitationResponseDTO {
    requestId: string;
    statut: number;
    fromUser: string;
}
export interface RoomStatutDTO {
    player1: string;
    player2: string;
    ready: boolean;
}

export interface GameFrameDTO {
    room: string;
    player: number;
    y: number;
}

export interface BallBroadcastDTO {
    room: string;
    x: number;
    y: number;
}

export type InvitationType = InvitationDTO;


export interface INotification {
    id: string;
    type: string;
    content: any;
    open: (dispatch: DispatchType) => void;
    close: (dispatch: DispatchType) => void;
}

export interface Invitation extends INotification {
    invitation: InvitationType;
}
