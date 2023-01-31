import React from 'react';
import ChatGroups from '../ChatGroups/ChatGroups';
import style from './Layout.module.css';
import Sidebar from '../Sidebar/Sidebar';
// import NavigationBar from '../NavigationBar/NavigationBar';
// import GroupsList from '../GroupList/GroupsList';
// import GroupsList from '../ChatGroups/GroupsList';
// import Topbar from '../Topbar/Topbar';																																																																																																																																																																																																																																																																																																																																																																																																																																																					
// import Sidebar from '../Sidebar/Sidebar';
// import Chat from  '../Chat/Chat';

interface Props {
	children: React.ReactNode;
}

function Layout({children}: Props) {

	return (
		<div className={style.layoutContainer}>
			{/* <Topbar/> */}
			<nav className={style.navContainer}>
				<ChatGroups/>
			</nav>
			<div className={style.sidebarContainer}>
				<Sidebar />
			</div>
			<div className={style.contentWrapper}>
				{children}
			</div>
		</div>
	);
}

export default Layout;