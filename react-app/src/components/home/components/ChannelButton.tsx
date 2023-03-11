interface Props {
    image?: any;
    name: string;
    filter?: boolean;
    onClick?: any;
}

export default function ChannelButton(props: Props) {
    const { image, name, filter = false, onClick } = props;
    return (
        <div className="channel tooltip" onClick={onClick}>
            <img src={image} alt="channel" className={filter ? "filter" : ""} />
            <span className="tooltiptext">{name}</span>
        </div>
    );
}
