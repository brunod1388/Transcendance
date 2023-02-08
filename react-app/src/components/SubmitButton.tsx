import { Button } from "./Button";
import { style } from "./index";
import { PropsWithChildren } from "react";

interface SubmitProps {
    fill?: boolean;
    divStyle?: string;
    handleClick?: () => void;
}

export function SubmitButton(props: PropsWithChildren<SubmitProps>) {
    const { handleClick = () => {}, divStyle = "", fill = false } = props;
    const fillStyle = fill ? " " + style.width100 : "";
    const buttonStyle = style.shadow_btn + fillStyle;
    return (
        <div className={divStyle + fillStyle}>
            <Button style={buttonStyle} onClick={handleClick}>
                {props.children}
            </Button>
        </div>
    );
}
