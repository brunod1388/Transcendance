import {
    CLASSIC,
    GameMode,
    PlayerInfo,
    READY,
    classicConfig,
    pingpongConfig,
} from "@customTypes";

export const playersAreReady = (
    player1: PlayerInfo,
    player2: PlayerInfo
): boolean => {
    return player1.status === READY && player2.status === READY;
};

export function gameConfig(mode: GameMode, room: string) {
    const config = mode === CLASSIC ? classicConfig : pingpongConfig;
    config.room = room;
    return config;
}
