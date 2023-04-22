import { Socket } from "socket.io-client";
import { ResponseDTO } from "@customTypes";
import { createId } from "./notifications.utils";

interface InvitationType {
    type: string;
    from: number;
    to: string;
    room: string;
}

// function sucess(response: any) {
//     console.log("invitation send");
//     console.log(`response ${response.data}`);
// }

// function failure(error: any) {
//     if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//     } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request);
//     } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//     }
//     console.log(error.config);
// }

export function sendInvitation(type: string, from: number, to: string, socket: Socket) {
    // was being converted to string for no reason
    let invitation: InvitationType = {
        type,
        from: Number(from),
        to,
        room: createId(),
    };
    socket.emit("invitation", invitation);
}

export function sendResponse(
    statut: number,
    type: string,
    to: number,
    room: string,
    socket: Socket
) {
    let response: ResponseDTO = { type, to, statut: Number(statut), room };
    socket.emit("response", response);
}
