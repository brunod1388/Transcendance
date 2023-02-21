export interface Room {
    id: number;
    name: string;
    roomName: string;
    messages: string[];
}

export const roomSample: Room = {
    id: 13,
    name: "user1",
    roomName: "testRoom",
    messages: [],
};
