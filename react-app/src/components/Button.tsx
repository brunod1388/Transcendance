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

// .link_button {
// 	color: #459ce8;
// 	text-shadow: 0 0 5px #459ce8;
// 	border: none;
// 	background: none;
// 	align-self: lefat;
// 	font-style: italic;
// }

// .link_button:hover {
// 	text-shadow: 0 0 10px white;
// }

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
