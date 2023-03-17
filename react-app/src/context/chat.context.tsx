import React, {
    PropsWithChildren,
    useContext,
    useState,
    createContext,
} from "react";
type Props = {};

// export type ChannelContextType = "none" | "directMessage" | "channel";

export interface ChannelDetailsType {
    id: number;
    name: string;
    type: string;
    image: string;
    room: string;
}

const defaultChannel: ChannelDetailsType = {
    id: 0,
    name: "",
    type: "none",
    image: "",
    room: "",
};

export interface ChatContextType {
    channel: ChannelDetailsType;
    updateChannel: (channel: ChannelDetailsType) => void;
}

const defaultChatContext: ChatContextType = {
    channel: defaultChannel,
    updateChannel: (channel: ChannelDetailsType) => {},
};

const ChatContext = createContext<ChatContextType>(defaultChatContext);

export function ChatProvider(props: PropsWithChildren<Props>) {
    const [channel, setChannel] = useState<ChannelDetailsType>(defaultChannel);

    const updateChannel = (channel: ChannelDetailsType) => {
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
