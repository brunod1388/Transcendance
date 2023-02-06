import React from "react";
import { useTheme } from "./hooks/index";

interface Props {
    description?: string;
    title?: string;
}
export default function Card(props: Props) {
    const theme = useTheme();
    return (
        <div className="Card">
            <div className="img" />
            <h2>{props.title || "Hello World!"}</h2>
            <p>
                {props.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
            <button>{theme ? "Light theme" : "Dark Theme"}</button>
        </div>
    );
}
