import { Layout } from './index'
import style from './MessagesPage.module.css';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/Buttons/SubmitButton';
import Message from '../../components/Message/Message';

interface chatProps {
	id: number;
	name: string;
	roomName: string;
	messages: string[];
}

interface message {
	created: any;
	content: string;
	userName: string;
}

function sendMessage(): void {
	console.log("send message");
}

function	MessagesPage() {
	// test purpose
	const props: chatProps = {id: 13, name: 'user1', roomName: 'testRoom', messages: []};
	const messages: message[] = [{created: Date(), content: "message1", userName: "user1"},
	{created: Date(), content: "message2", userName: "user2"},
	{created: Date(), content: "message3", userName: "user3"}]

	// useEffect(() => {
	// 	socket.on('receive_message', (data) => {
	// 	  console.log(data);
	// 	  setMessagesReceived((state) => [
	// 		...state,
	// 		{
	// 		  message: data.message,
	// 		  username: data.username,
	// 		  __createdtime__: data.__createdtime__,
	// 		},
	// 	  ]);
	// 	});
	
	// 	// Remove event listener on component unmount
	// 	return () => socket.off('receive_message');
	//   }, [socket]);
	
	//   useEffect(() => {
	// 	// Last 100 messages sent in the chat room (fetched from the db in backend)
	// 	socket.on('last_100_messages', (last100Messages) => {
	// 	  console.log('Last 100 messages:', JSON.parse(last100Messages));
	// 	  last100Messages = JSON.parse(last100Messages);
	// 	  // Sort these messages by __createdtime__
	// 	  last100Messages = sortMessagesByDate(last100Messages);
	// 	  setMessagesReceived((state) => [...last100Messages, ...state]);
	// 	});
	
	// 	return () => socket.off('last_100_messages');
	//   }, [socket]);
	
	//   // Scroll to the most recent message
	//   useEffect(() => {
	// 	messagesColumnRef.current.scrollTop =
	// 	  messagesColumnRef.current.scrollHeight;
	//   }, [messagesRecieved]);



	return (
		<Layout>
			{/* <h1>Messages Page</h1>
			<p className="subtitle">Play</p> */}
			<div className={style.chat_container}>
				<div className={style.toolbar_container}>
					<h4>#{props.roomName}</h4>
				</div>
				<div className={style.messages_container}>
					{messages.map((message: message) => (
						<Message
							created={message.created}
							content={message.content}
							user={message.userName}
						/>
					))}
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