// import { ChangeEvent } from "react";
import style from "../assets/styles/Input.module.css";

interface Props {
    divStyle?: string;
    content: any;
    fill?: boolean;
}

export function Input(props: Props) {
    const { fill = false, content, divStyle = "" } = props;
    let styleInput: string = style.input + (fill ? " " + style.width100 : "");
    console.log(`${content.name}: ${content}`);

    return (
        <div className={divStyle}>
            <input className={styleInput} {...props.content} />
        </div>
    );
}
