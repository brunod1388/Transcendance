import React, { PropsWithChildren } from 'react'
import "../styles/boardLayout.scss"

type Props = {
	title: string;
	titleIcon: string;
	children: React.ReactNode;
}

export default function BoardLayout(props: PropsWithChildren<Props>) {
	const {title, titleIcon, children} = props;

	return (
	<div className='match-board'>
		<div className="title-container">
			<img src={titleIcon} alt="" />
			<h1 className="title">{title}</h1>
			<img src={titleIcon} alt="" />
		</div>
		<div className="board-container">
			{children}
		</div>
	</div>
  )
}