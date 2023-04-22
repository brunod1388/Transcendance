import { FormEvent, useEffect, useState } from "react";
import { UserPlateType, UserType } from "@customTypes";
import { Feature, useAuth, useChat, useFeature } from "context";
import { useSocket, useVisible } from "hooks";
import { sendInvitation } from "utils";
import "../styles/userMenu.scss";
import UserDetails from "./UserDetails";
import { MatchSummary, initialSummary } from "@customTypes/match.types";

type MuteOrBlock = "Mute" | "Block" | "";
interface Props {
    user: UserType;
    type: UserPlateType;
    isPrivate?: boolean;
}

const MIN_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MIN_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export default function UserMenu(props: Props) {
    const { user } = props;
    const { userAuth } = useAuth();
    const { channel, updateChannel } = useChat();
    const [socket] = useSocket();
    const [inviteResponse, setInviteResponse] = useState("");
    const { setFeature } = useFeature();
    const [muteOrBlock, setMuteOrBlock] = useState<MuteOrBlock>("");
    const { ref, isVisible, setIsVisible } = useVisible(false);
    const [matchSummary, setMatchSummary] = useState(initialSummary);

    useEffect(() => {
        console.log("userMenu: ", user);
        socket.emit("getMatchSummary", userAuth.id);
        socket.on("matchSummary", (data: MatchSummary) => setMatchSummary(data));
        return () => {
            socket.off("matchSummary");
        };
    }, []);

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

    function play(user: UserType) {
        sendInvitation("pong", userAuth.id, user.username, socket);
    }

    function privateMessage() {
        socket.emit("privateMessage", { receiverId: user.id }, (res: any) => {
            console.log("res: ", res);
            // setFeature(Feature.Private);
            // updateChannel({
            //     ...channel,
        });
    }

    function handleMuteOrBlock(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const days = e.currentTarget.days.value | 0;
        const hours = e.currentTarget.hours.value | 0;
        const minutes = e.currentTarget.minutes.value | 0;

        const endDate = new Date(
            Date.now() + days * DAY_IN_MS + hours * HOUR_IN_MS + minutes * MIN_IN_MS
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

    function quitChannel(channelUserId: number | undefined) {
        if (channelUserId !== undefined)
            socket.emit("deleteChannelUser", { id: channelUserId }, (res: string) => {
                setFeature(Feature.None);
            });
    }

    function deleteUser(user: UserType, type: string) {
        if (type === "self") setFeature(Feature.None);
        if (type === "channelUser" || type === "self")
            socket.emit("deleteChannelUser", { id: user.channelUserId });
        else if (type === "friend") socket.emit("deleteFriend", { id: user.friendId });
    }

    function updateRight(rights: string) {
        console.log();
        socket.emit(
            "updateRight",
            {
                channelUser: user.channelUserId,
                rights: rights,
            },
            (res: string) => console.log(res)
        );
    }

    function deleteChannel() {
        socket.emit("deleteChannel", { id: channel.id });
        setFeature(Feature.None);
        updateChannel({
            ...channel,
            id: 0,
            name: "Transcendance",
            type: "none",
            rights: "none",
            image: "",
        });
    }
    return (
        <div className="userMenu">
            {user.id !== userAuth.id && (
                <div className="user-info">
                    <span className="title">User Info</span>
                    <div className="details">
                        <UserDetails matchSummary={matchSummary} small={true} />
                    </div>
                </div>
            )}
            {props.type !== "friend" && userAuth.id !== user.id && (
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
                <button
                    className={"Play button-purple" + (props.type === "friend" ? " long" : "")}
                    onClick={() => {
                        play(user);
                    }}
                >
                    Play
                </button>
            )}
            {userAuth.id !== user.id && (
                <button className="dm long button-purple" onClick={privateMessage}>
                    Direct Message
                </button>
            )}
            {(user.friendId !== undefined ||
                (userAuth.id !== user.id &&
                    (channel.rights === "admin" || channel.rights === "owner"))) && (
                <div className="muteAndBlock">
                    <button
                        className="mute button-purple"
                        onClick={() => {
                            setMuteOrBlock("Mute");
                            setIsVisible(true);
                        }}
                    >
                        Mute
                    </button>
                    <button
                        className="block button-purple"
                        onClick={() => {
                            setMuteOrBlock("Block");
                            setIsVisible(true);
                        }}
                    >
                        Block
                    </button>
                    {isVisible && (
                        <div ref={ref}>
                            <form className="muteOrBlock" onSubmit={handleMuteOrBlock}>
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
                                <button className="button-purple">{"Apply " + muteOrBlock}</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
            {props.type === "channelUser" &&
                userAuth.id !== user.id &&
                (channel.rights === "admin" || channel.rights === "owner") && (
                    <button
                        className="handleRight long button-purple"
                        onClick={() => updateRight(user.rights === "normal" ? "admin" : "normal")}
                    >
                        Make {user.rights === "normal" ? "admin" : "normal"}
                    </button>
                )}
            {props.type === "channelUser" &&
                userAuth.id !== user.id &&
                (channel.rights === "admin" || channel.rights === "owner") && (
                    <button
                        className="delete long red-button button-purple"
                        onClick={() => {
                            deleteUser(user, "channelUser");
                        }}
                    >
                        Delete channel user
                    </button>
                )}
            {userAuth.id === user.id && user.rights != "owner" && (
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
                        deleteUser(user, "friend");
                    }}
                >
                    Delete Friend
                </button>
            )}
            {props.user.rights === "owner" && (
                <button
                    className="deleteChannel red-button long button-purple"
                    onClick={deleteChannel}
                >
                    Delete Channel
                </button>
            )}
        </div>
    );
}
