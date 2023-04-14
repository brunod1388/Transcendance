import React from "react";
import "./burgermenu.scss";

type Props = {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function BurgerMenu(props: Props) {
    return (
        <div className="burger-menu" onClick={(e) => props.onClick(e)}>
            <div></div>
        </div>
    );
}
