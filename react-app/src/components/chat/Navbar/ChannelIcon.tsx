import React from "react";

interface Props {
    image?: any;
    name: string;
    filter?: boolean;
}

export default function ChannelIcon(props: Props) {
    const { image, name, filter = false } = props;
    return (
        <div className="channel tooltip">
            <img src={image} alt="channel" className={filter ? "filter" : ""} />
            <span className="tooltiptext">{name}</span>
        </div>
    );
}
