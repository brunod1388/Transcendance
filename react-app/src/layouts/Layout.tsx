import { NavBar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { PropsWithChildren } from "react";
import style from "../assets/styles/Layout.module.css";

interface Props {}

export function Layout(props: PropsWithChildren<Props>) {
    return (
        <div className={style.layoutContainer}>
            {/* <Topbar/> */}
            <nav className={style.navContainer}>
                <NavBar />
            </nav>
            <div className={style.pageContent}>
                <div className={style.sidebarContainer}>
                    <Sidebar />
                </div>
                {props.children}
            </div>
        </div>
    );
}
