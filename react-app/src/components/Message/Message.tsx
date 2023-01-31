import style from './Message.module.css';

interface MessageProps {
	created: any;
	content: string;
	user: string;
}

function Message (msg: MessageProps, hostName: string) {

	return <div>
				<p className={(hostName === msg.user) ? style.from_me : style.from_them}>
					{msg.content}
				</p>
			</div>;
}

export default Message;