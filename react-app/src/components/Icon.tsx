import { style } from "./index";

interface Props {
    imageURL: string;
}

export function Icon({ imageURL }: Props) {
    return (
        <div className={style.Icon_Wrapper}>
            <img src={imageURL} alt="Icon" className={style.Icon_Icon} />
        </div>
    );
}
