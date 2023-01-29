import React from 'react';
import style from './Chat.module.css';

interface chatProps {
	id: number;
	name: string;
	messages: string[];
}

function Chat(props: chatProps) {

	return (
		<div>
			<h1>TEST</h1>
			<h2>{props.id}</h2>
			<h2>{props.name}</h2>
			<h2>{props.messages[0]}</h2>
		</div>
	);
}

export default Chat;