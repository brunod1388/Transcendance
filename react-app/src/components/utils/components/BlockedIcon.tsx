import { dateDiffStr } from "utils/timeFormat.utils";
import { Block } from "assets/images";

type Props = {
    endBlock: Date;
};

export default function BlockedIcon(props: Props) {
    return (
        <div className="penality-container">
            <img className="icon" src={Block} alt="" />
            <span className="time">for {dateDiffStr(props.endBlock, new Date(Date.now()))}</span>
        </div>
    );
}
