import { useState } from "react";
import { UserPlateType, UserType, defaultChatContext } from "../../../@types";
import {
    Feature,
    defaultChannel,
    useAuth,
    useChat,
    useFeature,
} from "../../../context";
import { useSocket } from "../../../hooks";
import { sendInvitation } from "../../../utils";

interface Props {
    user: UserType;
    type: UserPlateType;
}

export default function UserMenu(props: Props) {
    const user = props.user;
    const { userAuth } = useAuth();
    const { channel, updateChannel } = useChat();
    const [socket] = useSocket();
    const [inviteResponse, setInviteResponse] = useState("");
    const { setFeature } = useFeature();

    function inviteFriend(userId: number) {
        socket.emit(
            "inviteFriend",
            {
                userid: userAuth.id,
                friendname: user.username,
            },
            (res: string) => {
                setInviteResponse(res);
                setTimeout(() => {
                    setInviteResponse("");
                }, 3000);
            }
        );
    }

    function deleteChannelUser(channelUserId: number | undefined) {
        if (channelUserId !== undefined)
            socket.emit(
                "deleteChannelUser",
                { id: channelUserId },
                (res: string) => {}
            );
    }

    function quitChannel(channelUserId: number | undefined) {
        if (channelUserId !== undefined)
            socket.emit(
                "deleteChannelUser",
                { id: channelUserId },
                (res: string) => {
                    setFeature(Feature.None);
                }
            );
    }

    function deleteUser(user: UserType, type: string) {
        if (type === "channelUser" || type === "self") {
            socket.emit("deleteChannelUser", { id: user.channelUserId });
            setFeature(Feature.None);
        } else if (type === "friend")
            socket.emit("deleteFriend", { id: user.friendId });
    }

    function play(userId: number) {}
    function mute(userId: number) {}
    function block(userId: number) {}
    function makeAdmin(userId: number) {}

    return (
        <div className="userMenu">
            {userAuth.id !== user.id && (
                <div className="btnContainer">
                    <button
                        className="askFriend button-purple"
                        onClick={() => {
                            inviteFriend(user.id);
                        }}
                    >
                        Friend
                    </button>
                    {inviteResponse !== "" && (
                        <div className="message">
                            <p>{inviteResponse}</p>
                        </div>
                    )}
                </div>
            )}
            {userAuth.id !== user.id && (
                <div className="btnContainer">
                    <div className="btnContainer">
                        <button
                            className="Play"
                            onClick={() =>
                                sendInvitation(
                                    "pong",
                                    userAuth.id,
                                    user.username,
                                    socket
                                )
                            }
                        >
                            Play
                        </button>
                    </div>
                </div>
            )}
            {userAuth.id !== user.id && (
                <div className="btnContainer">
                    <button
                        className="dm long button-purple"
                        onClick={() => {}}
                    >
                        Direct Message
                    </button>
                </div>
            )}
            {userAuth.id !== user.id && channel.rights === "admin" && (
                <div className="btnContainer">
                    <button className="mute button-purple" onClick={() => {}}>
                        Mute
                    </button>
                </div>
            )}
            {userAuth.id !== user.id && channel.rights === "admin" && (
                <div className="btnContainer">
                    <button className="block button-purple" onClick={() => {}}>
                        Block
                    </button>
                </div>
            )}
            {userAuth.id !== user.id && channel.rights === "admin" && (
                <div className="btnContainer">
                    <button
                        className="handleRight long button-purple"
                        onClick={() => {}}
                    >
                        Make Admin
                    </button>
                </div>
            )}
            {userAuth.id !== user.id && channel.rights === "admin" && (
                <div className="btnContainer">
                    <button
                        className="delete long red-button button-purple"
                        onClick={() => {
                            deleteChannelUser(user.channelUserId);
                        }}
                    >
                        Delete channel user
                    </button>
                </div>
            )}
            {userAuth.id === user.id && (
                <div className="btnContainer">
                    <button
                        className="quit channel long button-purple"
                        onClick={() => {
                            quitChannel(user.channelUserId);
                        }}
                    >
                        Quit channel
                    </button>
                </div>
            )}
        </div>
    );
}
