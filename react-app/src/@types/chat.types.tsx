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
