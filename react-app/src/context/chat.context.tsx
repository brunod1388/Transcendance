import { PropsWithChildren, useContext, useState, createContext } from "react";

export interface ChannelDetailsType {
    id: number;
    name: string;
    type: string;
    protected: boolean;
    image: string;
    room: string;
    rights: string;
}

export const defaultChannel: ChannelDetailsType = {
    id: 0,
    name: "",
    type: "none",
    image: "",
    room: "",
    rights: "",
    protected: false,
};

export interface ChatContextType {
    channel: ChannelDetailsType;
    updateChannel: (channel?: ChannelDetailsType) => void;
}

const defaultChatContext: ChatContextType = {
    channel: defaultChannel,
    updateChannel: (channel?: ChannelDetailsType) => {},
};

const ChatContext = createContext<ChatContextType>(defaultChatContext);

export function ChatProvider(props: PropsWithChildren) {
    const [channel, setChannel] = useState<ChannelDetailsType>(defaultChannel);

    function updateChannel(channel?: ChannelDetailsType) {
        channel !== undefined ? setChannel(channel) : setChannel(defaultChannel);
    }

    const providerValue: ChatContextType = {
        channel: channel,
        updateChannel: updateChannel,
    };

    return <ChatContext.Provider value={providerValue}>{props.children}</ChatContext.Provider>;
}

export function useChat(): ChatContextType {
    return useContext(ChatContext);
}
