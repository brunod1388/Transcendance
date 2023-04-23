import { DispatchType, UserType } from ".";
// import { NotificationBase } from "../components/notifications";

export const NONE = 0;
export const ACCEPTED = 1;
export const DECLINED = -1;
export const CLOSE = -1;

export interface InvitationDTO {
    type: string;
    to: string;
    from: number;
    room: string;
    user?: UserType;
}

export interface ResponseDTO {
    type: string;
    to: number;
    room: string;
    statut: number;
    username?: string;
    avatar?: string;
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
