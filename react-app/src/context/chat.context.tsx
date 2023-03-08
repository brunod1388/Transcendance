import React, {
    PropsWithChildren,
    useContext,
    useState,
    createContext,
} from "react";
type Props = {};

export type ChannelContextType = "none" | "directMessage" | "channel";

export interface ChatType {
    currentChannelId: number;
    currentChannelName: string;
    currentChannelType: ChannelContextType;
}

const defaultChat: ChatType = {
    currentChannelId: 0,
    currentChannelName: "",
    currentChannelType: "none",
};

export interface ChatContextType {
    chat: ChatType;
    updateChat: (
        channelId: number,
        channelName: string,
        currentChannelType: ChannelContextType
    ) => void;
}

const defaultChatContext: ChatContextType = {
    chat: defaultChat,
    updateChat: (
        channelId: number,
        channelName: string,
        currentChannelType: ChannelContextType
    ) => {},
};

const ChatContext = createContext<ChatContextType>(defaultChatContext);

export function ChatProvider(props: PropsWithChildren<Props>) {
    const [chat, setChat] = useState<ChatType>(defaultChat);

    const updateChat = (
        channelId: number,
        channelName: string,
        currentChannelType: ChannelContextType
    ) => {
        setChat({
            currentChannelId: channelId,
            currentChannelName: channelName,
            currentChannelType: currentChannelType,
        });
    };

    const providerValue: ChatContextType = {
        chat: chat,
        updateChat: updateChat,
    };

    return (
        <ChatContext.Provider value={providerValue}>
            {props.children}
        </ChatContext.Provider>
    );
}

export function useChat(): ChatContextType {
    return useContext(ChatContext);
}
