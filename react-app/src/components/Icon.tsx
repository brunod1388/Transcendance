import "../assets/styles/Icon.css";

interface Props {
    imageURL: string;
}

export function Icon({ imageURL }: Props) {
    return (
        <div className={"IconWrapper"}>
            <img src={imageURL} alt="Icon" className={"Icon"} />
        </div>
    );
}
