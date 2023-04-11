import "../styles/menuButton.scss";

interface Props {
    image?: any;
    name: string;
    filter?: boolean;
    onClick?: any;
    isChannel?: boolean;
}

export default function MenuButton(props: Props) {
    const { image, name, filter = false, onClick, isChannel = true } = props;
    return (
        <div
            className={"menu-button" + (isChannel ? "" : " notChannel")}
            onClick={onClick}
        >
            <img
                src={image}
                alt="channel"
                className={
                    (filter ? "filter" : "") + (isChannel ? "" : " notChannel")
                }
            />
            <span className="icon-name">{name}</span>
        </div>
    );
}
