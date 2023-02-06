export interface InvitationRequest {
    fromUser: string;
    toUser: string;
}

export interface InvitationOpponent {
    requestId: string;
    from: string;
}

export interface InvitationResponse {
    requestId: string;
    statut: number;
}
