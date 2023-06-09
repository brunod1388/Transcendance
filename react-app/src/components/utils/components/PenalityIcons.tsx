import { dateDiffStr } from "utils/timeFormat.utils";
import { Block } from "assets/images";
import { Mute } from "assets/images";
import { useChat } from "context";
import { UserType } from "@customTypes";
import "../styles/penalityIcon.scss";
import { useSocket } from "hooks";

type PenalityType = "Block" | "Mute";

type PenalityProps = {
    type: PenalityType;
    endBlock: string;
    endMute: string;
    channelUserId: number;
};

function PenalityIcon(props: PenalityProps) {
    const endTime =
        (props.type === "Mute" ? new Date(props.endMute) : new Date(props.endBlock)) ||
        new Date(Date.now());
    const { channel } = useChat();
    const isAdmin = channel.rights !== "normal";
    const [socket] = useSocket();

    function handlePenality() {
        if (props.type === "Block") {
            socket.emit(
                "unblockUser",
                { channelId: channel.id, channelUserId: props.channelUserId },
                (res: any) => {
                    console.log("UNBLOCK RESPONSE: ", res);
                }
            );
        } else {
            socket.emit(
                "unmuteUser",
                { channelId: channel.id, channelUserId: props.channelUserId },
                (res: any) => {
                    console.log("UNMUTE RESPONSE: ", res);
                }
            );
        }
    }

    return (
        <div className="penality-container">
            <img className="icon" src={props.type === "Mute" ? Mute : Block} alt="" />
            <div className={"tooltip " + (isAdmin ? "admin" : "")}>
                <span>
                    {props.type === "Mute" ? "Muted " : "Blocked "}for{" "}
                    {dateDiffStr(endTime, new Date(Date.now()))}
                </span>
                {isAdmin && (
                    <button className="button-purple" onClick={handlePenality}>
                        {props.type === "Mute" ? "Unmute" : "Unblock"}
                    </button>
                )}
            </div>
        </div>
    );
}

type Props = {
    user: UserType;
};

export default function PenalityIcons(props: Props) {
    const { user } = props;
    if (user.endBlock || user.endMute) {
        console.log("USER: ", user);
    }
    return (
        <div className="penalities-container">
            {user.endMute !== undefined && (
                <PenalityIcon
                    type="Mute"
                    endBlock={user.endBlock ? user.endBlock : String(Date.now())}
                    endMute={user.endMute ? user.endMute : String(Date.now())}
                    channelUserId={Number(user.channelUserId)}
                />
            )}
            {user.endBlock !== undefined && (
                <PenalityIcon
                    type="Block"
                    endBlock={user.endBlock ? user.endBlock : String(Date.now())}
                    endMute={user.endMute ? user.endMute : String(Date.now())}
                    channelUserId={Number(user.channelUserId)}
                />
            )}
        </div>
    );
}
