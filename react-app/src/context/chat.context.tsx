import React, {
    PropsWithChildren,
    useContext,
    useState,
    createContext,
} from "react";
type Props = {};

export type ChannelContextType = "none" | "directMessage" | "channel";


export interface ChannelType {
    currentChannelId: number;
    currentChannelName: string;
    currentChannelType: ChannelContextType;
}

const defaultChannel: ChannelType = {
    currentChannelId: 0,
    currentChannelName: "",
    currentChannelType: "none",
};

export interface ChatContextType {
    channel: ChannelType;
    updateChannel: (channel: ChannelType) => void;
}

const defaultChatContext: ChatContextType = {
    channel: defaultChannel,
    updateChannel: (channel: ChannelType) => {},
};

const ChatContext = createContext<ChatContextType>(defaultChatContext);

export function ChatProvider(props: PropsWithChildren<Props>) {
    const [channel, setChannel] = useState<ChannelType>(defaultChannel);

    const updateChannel = (channel: ChannelType) => {
        setChannel(channel);
    };

    const providerValue: ChatContextType = {
        channel: channel,
        updateChannel: updateChannel,
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
