import style from './Message.module.css';

interface MessageProps {
	created: any;
	content: string;
	user: string;
	index: number;
	array: any[]
}

function Message (msg: MessageProps) {

	function formatDateFromTimestamp(timestamp: any) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	const hasHeader: boolean = (msg.index === 0
		|| (msg.user !== msg.array[msg.index - 1].userName)
		|| (msg.created.getTime() -  msg.array[msg.index - 1].created.getTime() ) > 1800000);

	return <div className={style.messageContainer}>
				{ hasHeader &&
					<div className={style.messageHeaderContainer}>
						<p className={style.userMessage}>{msg.user}</p>
						<p className={style.createdMessage}>
							{formatDateFromTimestamp(msg.created)}
						</p>
					</div>
				}
				<div className={style.messageStyle}>
					{msg.content}
				</div>
			</div>;
}

export default Message;