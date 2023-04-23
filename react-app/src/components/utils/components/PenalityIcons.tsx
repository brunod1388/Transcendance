import { dateDiffStr } from "utils/timeFormat.utils";
import { Block } from "assets/images";
import { Mute } from "assets/images";
import { useChat } from "context";
import { UserType } from "@customTypes";
import "../styles/penalityIcon.scss";

type PenalityType = "Block" | "Mute";

type PenalityProps = {
    type: PenalityType;
    endBlock?: Date;
    endMute?: Date;
    channelUserId: number;
};

function PenalityIcon(props: PenalityProps) {
    const endTime =
        (props.type === "Mute" ? props.endMute : props.endBlock) || new Date(Date.now());
    const { channel } = useChat();
    const isAdmin = channel.rights !== "normal";

    function handlePenality() {
        // TODO: handle penality
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
    return (
        <div className="penalities-container">
            {user.endMute !== undefined && (
                <PenalityIcon
                    type="Mute"
                    endBlock={user.endMute}
                    channelUserId={Number(user.channelUserId)}
                />
            )}
            {user.endBlock !== undefined && (
                <PenalityIcon
                    type="Block"
                    endBlock={user.endBlock}
                    channelUserId={Number(user.channelUserId)}
                />
            )}
        </div>
    );
}
