interface Props {
    image?: any;
    name: string;
    filter?: boolean;
    onClick?: any;
    isChannel?: boolean;
}

export default function ChannelButton(props: Props) {
    const { image, name, filter = false, onClick, isChannel = true } = props;
    return (
        <div className={"channel-button" + (isChannel ? "" : " notChannel")} onClick={onClick}>
            <img src={image} alt="channel" className={(filter ? "filter" : "") + (isChannel ? "" : " notChannel")} />
            <span className="icon-name">{name}</span>
            {/* <span className="tooltiptext">{name}</span> */}
        </div>
    );
}
