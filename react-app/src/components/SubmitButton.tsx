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
    const { onClick = () => {},
            divStyle = "",
            fill = true,
            buttonStyle = style.shadow_btn
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

// import { Button } from "./Button";
// import { style } from "./index";
// import { PropsWithChildren } from "react";

// interface SubmitProps {
//     fill?: boolean;
//     divStyle?: string;
//     handleClick?: () => void;
// }

// export function SubmitButton(props: PropsWithChildren<SubmitProps>) {
//     const { handleClick = () => {}, divStyle = "", fill = false } = props;
//     const fillStyle = fill ? " " + style.width100 : "";
//     const buttonStyle = style.shadow_btn + fillStyle;
//     return (
//         <div className={divStyle + fillStyle}>
//             <Button style={buttonStyle} onClick={handleClick}>
//                 {props.children}
//             </Button>
//         </div>
//     );
// }

