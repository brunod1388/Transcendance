export interface ChatType {
    id: number;
    name: string;
}

export const defaultChat: ChatType = {
    id: 0,
    name: "",
};

export interface ChatContextType {
    chat: ChatType;
    updateChat: () => void;
}

export const defaultChatContext = {
    chat: defaultChat,
    updateChat: () => {},
};

export interface ChannelType {
    id: number;
    name: string;
    image?: any;
    protected?: boolean;
}

export enum channelRightType {
    NORMAL = "normal",
    ADMIN = "admin",
    OWNER = "owner",
}

export interface UserType {
    id: number;
    username: string;
    avatar?: string;
    rights?: channelRightType;
    channelUserId?: number;
    friendId?: number;
    connected?: boolean;
    inGame?: boolean;
    channelId?: number;
    room?: string;
    muted?: boolean;
    endMute?: Date;
    blocked?: boolean;
    endBlock?: Date;
}

export interface MessageType {
    id: number;
    creator: UserType;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
}

export interface CreateChannelDto {
    ownerId: number;
    name: string;
    type: ChannelType;
    password: string;
}

export type UserPlateType = "channelUser" | "friend" | "privateUser";

export interface ChatInvitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}
