import React, { PropsWithChildren } from "react";

interface Props {
    onClick?: () => void;
    style?: string;
}

export function Button(props: PropsWithChildren<Props>) {
    const { onClick = () => {}, style = "" } = props;
    return (
        <button className={style} onClick={onClick}>
            {props.children}
        </button>
    );
}

// import style from "./LinkButton.module.css";

// interface LinkProps {
//     name: string;
//     handleClick(): void;
//     divStyle?: string;
//     fill?: boolean;
// }

// function LinkButton(props: LinkProps) {
//     const { name, handleClick, divStyle = "", fill = false } = props;

//     return (
//         <div className={props.divStyle}>
//             <button className={style.link_button} onClick={handleClick}>
//                 {name}
//             </button>
//         </div>
//     );
// }

// export default LinkButton;
