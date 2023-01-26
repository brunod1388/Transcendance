import React from "react";
// import NavigationBar from '../NavigationBar/NavigationBar';
// import GroupsList from '../GroupList/GroupsList';
// import GroupsList from '../ChatGroups/GroupsList';
import ChatGroups from "../ChatGroups/ChatGroups";
import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
// import Topbar from '../Topbar/Topbar';
// import Sidebar from '../Sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={style.container}>
      {/* <Topbar/> */}
      <nav className={style.serversWrapper}>
        <ChatGroups />
      </nav>
      <div className={style.base}>
        <Sidebar />
        <div className={style.contentWrapper}>
          <main className={style.content}>
            <div className={style.contentHeader}>
              <div className={style.contentName}></div>
            </div>
            <div className={style.contentToolbar}></div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Layout;
