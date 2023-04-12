import { Server, Socket } from "socket.io"

function userIdIsOnline(server: Server, userId: number): boolean
{
	let hasUser = false;
	const sockets = server.sockets.sockets;
	sockets.forEach((socket) => {
		if (socket.data.user.id === userId)
			hasUser = true;
	})
	return hasUser;
}

function getSocket(server: Server, userId: number): Socket
{
	let socket = undefined;
	const sockets = server.sockets.sockets;
	sockets.forEach((s) => {
		if (socket.data.user.id === userId)
			socket = s;
	})
	return socket;
}