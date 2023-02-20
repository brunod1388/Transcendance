import { Button } from "./Button";
import { style } from "./index";
import { PropsWithChildren } from "react";

interface SubmitProps {
    placeholder: string;
    fill?: boolean;
    divStyle?: string;
    buttonStyle?: string;
    onClick?: () => void;
}

export function SubmitButton(props: PropsWithChildren<SubmitProps>) {
    const {
        onClick = () => {},
        divStyle = "",
        fill = true,
        buttonStyle = style.shadow_btn,
    } = props;
    const fillStyle = fill ? " " + style.width100 : "";
    return (
        <div className={divStyle + fillStyle}>
            <Button style={buttonStyle + fillStyle} onClick={onClick}>
                {props.placeholder}
            </Button>
        </div>
    );
}
