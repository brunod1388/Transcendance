import React, { useEffect, useState } from 'react'
import User from './User'
import { useAuth, useChat } from '../../../context';
import { useSocket } from '../../../hooks';
import { UserType } from '../../../@types';

type Props = {}

export default function Sidebar({}: Props) {
    const {channel} = useChat();
    const [socket] = useSocket();
    const [users, setUsers] = useState<UserType[]>([]);
    const {userAuth} = useAuth();
	const [searchUser, setSearchUser] = useState<UserType>()

    useEffect(() => {
        if (channel.currentChannelType == "channel")
            socket.emit("getChannelUsers", channel.currentChannelId, (usersReceived: UserType[]) => {
                setUsers(usersReceived);
            });
        else
		socket.emit("getPrivateUsers", userAuth.id, (usersReceived: UserType[]) => {
			setUsers(usersReceived);
            });
		}, [channel]);

  return (
	<div className="SideBar">
		<div className="search">
			<div className="searchForm">
				<input type="text" placeholder="type a user" />
			</div>
			{searchUser !== undefined &&
				<User user={searchUser} keyId="searchUser" />
			}
		</div>
		<div className="users">
			{/* {[...Array(20)].map((e, i) => ( */}
			{users.map((user, i) => (
				<User
					user={user}
					isPrivate={channel.currentChannelType === "directMessage"}
					keyId={`${user.id}`}
					key={i}
				/>
			))}
		</div>
	</div>
  )
}