import React from "react";
import Sun from "./assets/images/sun.svg";
import Moon from "./assets/images/moon.svg";
import { useThemeUpdate } from "./hooks/index";

export default function Switch() {
    const changeTheme = useThemeUpdate();
	

    return (
        <button className="Switch" onClick={changeTheme}>
            <img
                src={Sun}
                alt="SVG logo"
                className={`icon`}
            />
            <img
                src={Moon}
                alt="SVG logo"
                className={`icon`}
            />
        </button>
    );
}
