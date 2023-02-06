import { Layout } from "./index";
import style from "./MessagesPage.module.css";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Message from "../../components/Message/Message";

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

function MessagesPage() {
    // test purpose
    const props: chatProps = {
        id: 13,
        name: "user1",
        roomName: "testRoom",
        messages: [],
    };
    const messages: message[] = [
        {
            created: new Date("December 17, 1995 03:23:00"),
            content: "message1",
            userName: "user1",
        },
        {
            created: new Date("December 17, 1995 03:24:00"),
            content: "message20",
            userName: "user2",
        },
        {
            created: new Date("December 18, 1995 03:24:00"),
            content: "message21",
            userName: "user2",
        },
        {
            created: new Date("December 18, 1995 03:25:00"),
            content: "message22",
            userName: "user2",
        },
        {
            created: new Date("December 18, 1995 03:26:00"),
            content: "message23",
            userName: "user2",
        },
        {
            created: new Date("December 19, 1996 03:55:00"),
            content: "message24",
            userName: "user2",
        },
        {
            created: new Date("December 11, 1992 04:20:00"),
            content: "message25",
            userName: "user2",
        },
        // {created: new Date('December 19, 1996 04:26:00'), content: "message35", userName: "user3"},
        {
            created: new Date("December 16, 1995 03:24:00"),
            content: "message3",
            userName: "user3",
        },
    ];

    function sortMessagesByDate(messages: message[]) {
        return messages.sort(
            (a, b) => a.created.getTime() - b.created.getTime()
        );
    }
    const sortedMessages: message[] = sortMessagesByDate(messages);

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
                <hr className={style.hrMessage} />
                <div className={style.messages_container}>
                    {sortedMessages.map(
                        (message: message, index: number, array: any[]) => (
                            <Message
                                created={message.created}
                                content={message.content}
                                user={message.userName}
                                index={index}
                                array={array}
                                key={index}
                            />
                        )
                    )}
                </div>
                <hr className={style.hrMessage} />
                <div className={style.writting_container}>
                    <Input
                        divStyle={style.input_container}
                        name="messageToSend"
                        placeholder={`Send a message to ${props.roomName}`}
                        required={true}
                        fill={true}
                    />
                    <SubmitButton
                        divStyle={style.button_container}
                        name="send"
                        handleClick={sendMessage}
                        fill={true}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default MessagesPage;
