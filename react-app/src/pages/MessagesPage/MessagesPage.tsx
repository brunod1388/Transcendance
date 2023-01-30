import { Layout } from './index'
import style from './MessagesPage.module.css';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/Buttons/SubmitButton';

interface chatProps {
	id: number;
	name: string;
	roomName: string;
	messages: string[];
}

function sendMessage(): void {
	console.log("send message");
}

function	MessagesPage() {
	// test purpose
	const props: chatProps = {id: 13, name: 'user1', roomName: 'testRoom', messages: []};
	
	return (
		<Layout>
			{/* <h1>Messages Page</h1>
			<p className="subtitle">Play</p> */}
			<div className={style.chat_container}>
				<div className={style.toolbar_container}>
					<h4>#{props.roomName}</h4>
				</div>
				<div className={style.messages_container}>
					Message content
				</div>
				<div className={style.writting_container}>
					<div className={style.input_container}>
						<Input name="messageToSend"
							placeholder={`Send a message to ${props.roomName}`}
							required={true}/>
					</div>
					<div className={style.button_container}>
						<SubmitButton name="send" handleClick={sendMessage}/>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default	MessagesPage;