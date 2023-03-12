export interface ChatType {
    currentChannelId: number;
    currentChannelName: string;
}

export const defaultChat: ChatType = {
    currentChannelId: 0,
    currentChannelName: "",
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
}

export interface MessageType {
    id: number;
    creator: UserType;
    created: Date;
    content: string;
    image?: string;
}
