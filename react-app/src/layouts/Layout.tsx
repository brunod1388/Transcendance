import { NavBar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { PropsWithChildren } from "react";
import { style } from "./index";

interface Props {}

export function Layout(props: PropsWithChildren<Props>) {
    return (
        <div className={style.layout_Container}>
            {/* <Topbar/> */}
            <nav className={style.layout_navContainer}>
                <NavBar />
            </nav>
            <div className={style.layout_pageContent}>
                <div className={style.layout_sidebarContainer}>
                    <Sidebar />
                </div>
                {props.children}
            </div>
        </div>
    );
}
