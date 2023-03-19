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
}

export enum channelRightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

export interface UserType {
    id: number;
    username: string;
    avatar?: string;
    rights?: channelRightType;
    channelUserId?: number;
    friendId?: number;
}

export interface MessageType {
    id: number;
    creator: UserType;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
}

export type UserPlateType = "channelUser" | "friend" | "direct";