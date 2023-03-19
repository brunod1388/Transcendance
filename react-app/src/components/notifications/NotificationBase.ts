// import { ActionType, DispatchType } from "../../@types";

// export abstract class NotificationBase {
//     id: string;
//     type: string;
//     content: any;
//     constructor(type: string) {
//         this.id =
//             Date.now().toString(36) + Math.random().toString(36).substring(2);
//         this.type = type;
//     }
//     open(dispatch: DispatchType) {
//         dispatch({
//             type: ActionType.ADD,
//             payload: {
//                 id: this.id,
//                 type: this.type,
//                 content: this.content,
//             },
//         });
//     }

//     close(dispatch: DispatchType) {
//         dispatch({
//             type: ActionType.REMOVE,
//             payload: {
//                 id: this.id,
//             },
//         });
//     }
// }
export {};
