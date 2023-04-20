import { Mute } from "assets/images";
import { dateDiffStr } from "utils/timeFormat.utils";
import "./penalityIcon.scss";

type Props = {
    endMute: Date;
};

export default function MutedIcon(props: Props) {
    return (
        <div className="penality-container">
            <img className="icon" src={Mute} alt="" />
            <span className="time">
                for {dateDiffStr(props.endMute, new Date(Date.now()))}
            </span>
        </div>
    );
}
