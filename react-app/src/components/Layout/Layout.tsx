import React from 'react';
// import NavigationBar from '../NavigationBar/NavigationBar';
// import GroupsList from '../GroupList/GroupsList';
// import GroupsList from '../ChatGroups/GroupsList';
import ChatGroups from '../ChatGroups/ChatGroups';
import style from './Layout.module.css';
import Sidebar from '../Sidebar/Sidebar';
// import Topbar from '../Topbar/Topbar';																																																																																																																																																																																																																																																																																																																																																																																																																																																					
// import Sidebar from '../Sidebar/Sidebar';
import Chat from  '../Chat/Chat';

interface Props {
	children: React.ReactNode;
	mode?: string;
}

function Layout({children}: Props) {
	const { childre, mode = "chat"} = children;

	if (mode === "chat") {
		const content = <Chat id={13} name="testName" messages={["abc"]} />;
	}
	else {
		const content = <h2>Nope</h2>;
	}
	return (
		<div className={style.container}>
			{/* <Topbar/> */}
			<nav className={style.serversWrapper}>
				<ChatGroups/>
			</nav>
			<div className={style.base}>
				<Sidebar />
				<div className={style.contentWrapper}>
					{/* <main className={style.content}>
						<div className={style.contentHeader}>
							<div className={style.contentName}></div>
						</div>
						<div className={style.contentToolbar}></div>
					</main> */}
					{content}
				</div>
			</div>
		</div>
	);
}
export default Layout;