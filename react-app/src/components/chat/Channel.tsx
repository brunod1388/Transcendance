import React from "react";

interface Props {
    image?: any;
    name: string;
};

export default function Channel(props: Props) {

	const {image, name} = props;
    return (
        <div className="channel tooltip">
            <img src={image} alt="channel" />
            <span className="tooltiptext">{name}</span>
        </div>
    );
}
