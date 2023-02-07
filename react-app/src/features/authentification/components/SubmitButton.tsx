import { Button } from "../../../components/Button";
import style from "../styles/SubmitButton.module.css";
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

interface Props {
    onClick: () => void;
    divStyle: string;
}

export function SignUpSubmitButton(props: Props) {
    const { onClick, divStyle } = props;

    return (
        <>
            <SubmitButton divStyle={divStyle} handleClick={onClick} fill={true}>
                Subscribe
            </SubmitButton>
        </>
    );
}
