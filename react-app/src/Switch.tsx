import React from "react";
import Sun from "./assets/images/sun.svg";
import Moon from "./assets/images/moon.svg";
import { useThemeUpdate } from "./features/theme";
import { useTheme } from "./features/theme";

export default function Switch() {
    const changeTheme = useThemeUpdate();
    const theme = useTheme();

    return (
        <button className="Switch" onClick={changeTheme}>
            <img
                src={Sun}
                alt="SVG logo"
                className={`icon ${theme ? "active" : ""}`}
            />
            <img
                src={Moon}
                alt="SVG logo"
                className={`icon ${!theme ? "active" : ""}`}
            />
        </button>
    );
}
