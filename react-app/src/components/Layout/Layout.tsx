import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import style from './Layout.module.css';

interface Props {
	children: React.ReactNode;
}

function Layout({children}: Props) {
	return(
	<div className={style.wrapper}>
		<Header />
		{children}
		<Footer />
	</div>
	);
}
export default Layout;