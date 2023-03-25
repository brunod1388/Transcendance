import { FormEvent, useState } from "react";
import { UserPlateType, UserType, defaultChatContext } from "../../../@types";
import { Feature, useAuth, useChat, useFeature } from "../../../context";
import { useSocket, useVisible } from "../../../hooks";
import { sendInvitation } from "../../../utils";
import "../styles/userMenu.scss";

type MuteOrBlock = "Mute" | "Block" | "";
interface Props {
    user: UserType;
    type: UserPlateType;
}

const MIN_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MIN_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export default function UserMenu(props: Props) {
    const user = props.user;
    const { userAuth } = useAuth();
    const { channel, updateChannel } = useChat();
    const [socket] = useSocket();
    const [inviteResponse, setInviteResponse] = useState("");
    const { setFeature } = useFeature();
    const [muteOrBlock, setMuteOrBlock] = useState<MuteOrBlock>("");
    const { ref, isVisible, setIsVisible } = useVisible(false);

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
        if (type ==="self")
            setFeature(Feature.None);
        if (type === "channelUser" || type === "self") {
            socket.emit("deleteChannelUser", { id: user.channelUserId });
        } else if (type === "friend")
            socket.emit("deleteFriend", { id: user.friendId });
    }

    function play(user: UserType) {
        sendInvitation("pong", userAuth.id, user.username, socket);
    }

    function makeAdmin(userId: number) {}

    function deleteFriend(friendId: number | undefined) {
        if (friendId !== undefined)
            socket.emit(
                "updateFriend",
                { id: friendId, accept: false },
                (res: string) => {
                    console.log(res);
                }
            );
    }

    function handleMuteOrBlock(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const days = e.currentTarget.days.value | 0;
        const hours = e.currentTarget.hours.value | 0;
        const minutes = e.currentTarget.minutes.value | 0;

        const endDate = new Date(
            Date.now() +
                days * DAY_IN_MS +
                hours * HOUR_IN_MS +
                minutes * MIN_IN_MS
        );
        console.log(`d: ${days}, h:${hours}, m:${minutes}`);
        socket.emit(
            "createPenality",
            {
                penality: {
                    channelUserId: Number(user.channelUserId),
                    endDate: endDate,
                    type: muteOrBlock,
                },
            },
            (res: any) => console.log("res: ", res)
        );
        console.log({
            channelUserId: Number(user.channelUserId),
            endDate: endDate,
            type: muteOrBlock,
        });
        console.log("mute or block");
        setIsVisible(false);
    }

    return (
        <div className="userMenu">
            {props.type === "channelUser" && userAuth.id !== user.id && (
                <div className="btnContainer">
                    <button
                        className="askFriend button-purple"
                        onClick={() => {
                            inviteFriend(user.id);
                        }}
                    >
                        Friend
                    </button>
                    {inviteResponse !== "" && 
                        <div className="message">
                            <p>{inviteResponse}</p>
                        </div>
                    }
                </div>
            )}
            {userAuth.id !== user.id && (
                <button
                    className={
                        "Play button-purple" +
                        (props.type === "friend" ? " long" : "")
                    }
                    onClick={() => {
                        play(user);
                    }}
                >
                    Play
                </button>
            )}
            {userAuth.id !== user.id && (
                <button className="dm long button-purple" onClick={() => {}}>
                    Direct Message
                </button>
            )}
            <div className="muteAndBlock">
                {userAuth.id !== user.id && channel.rights === "admin" && (
                    <button
                        className="mute button-purple"
                        onClick={() => {
                            setMuteOrBlock("Mute");
                            setIsVisible(true);
                        }}
                    >
                        Mute
                    </button>
                )}
                {userAuth.id !== user.id && channel.rights === "admin" && (
                    <button
                        className="block button-purple"
                        onClick={() => {
                            setMuteOrBlock("Block");
                            setIsVisible(true);
                        }}
                    >
                        Block
                    </button>
                )}
                {isVisible && (
                    <div ref={ref}>
                        <form
                            className="muteOrBlock"
                            onSubmit={handleMuteOrBlock}
                        >
                            <div>
                                {" "}
                                D: <input name="days" type="number" />{" "}
                            </div>
                            <div>
                                {" "}
                                H: <input name="hours" type="number" />{" "}
                            </div>
                            <div>
                                {" "}
                                M: <input name="minutes" type="number" />{" "}
                            </div>
                            <button className="button-purple">
                                {"Apply " + muteOrBlock}
                            </button>
                        </form>
                    </div>
                )}
            </div>
            {props.type === "channelUser" &&
                userAuth.id !== user.id &&
                channel.rights === "admin" && (
                    <button
                        className="handleRight long button-purple"
                        onClick={() => {}}
                    >
                        Make Admin
                    </button>
                )}
            {props.type === "channelUser" &&
                userAuth.id !== user.id &&
                channel.rights === "admin" && (
                    <button
                        className="delete long red-button button-purple"
                        onClick={() => {
                            deleteChannelUser(user.channelUserId);
                        }}
                    >
                        Delete channel user
                    </button>
                )}
            {userAuth.id === user.id && (
                <button
                    className="quit channel long button-purple"
                    onClick={() => {
                        quitChannel(user.channelUserId);
                    }}
                >
                    Quit channel
                </button>
            )}
            {props.type === "friend" && (
                <button
                    className="deleteFriend red-button long button-purple"
                    onClick={() => {
                        deleteFriend(user.friendId);
                    }}
                >
                    Delete Friend
                </button>
            )}
        </div>
    );
}
