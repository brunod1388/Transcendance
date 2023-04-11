import { Navbar, Topbar, Friendbar } from ".";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import { useAuth } from "../../context";
import { useState, useEffect } from "react";
import { useNotificationsDispatch, useSocket, useVisible } from "../../hooks";
import { CreateInvitation, CreateResponse } from "../invitations";
import { InvitationDTO, ResponseDTO, CLASSIC, GameMode } from "../../@types";
// import { Pong } from "../pong";
import Chat from "../chat/Chat";
import "./styles/home.scss";
import { Game } from "../game";
import { Game as Pong } from "../pong/Game";
import { gameConfig } from "../pong/GameService";

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    [Feature.Game, <Game />],
    // [Feature.Ranking, <Ranking />],
]);

interface JoinPongDto {
    room: string;
    mode: GameMode;
}

interface PongData {
    isPong: boolean;
    data: JoinPongDto;
    host: boolean;
}

function Home() {
    const { feature } = useFeature();
    const { ref, isVisible, setIsVisible } = useVisible(false);
    const [socket] = useSocket();
    const dispatch = useNotificationsDispatch();
    const { userAuth } = useAuth();
    const [PongSwitch, setPongSwitch] = useState<PongData>({
        isPong: false,
        data: {
            room: "",
            mode: CLASSIC,
        },
        host: false,
    });

    const onPong = (room: string, mode: GameMode, host: boolean) => {
        setPongSwitch({
            isPong: true,
            data: {
                room: room,
                mode: mode,
            },
            host: host,
        });
    };

    useEffect(() => {
        socket.emit("chatConnection", { userid: userAuth.id });
        socket.emit("getChannels", { userid: userAuth.id, isPendng: false });
    }, [userAuth.id, socket]);

    useEffect(() => {
        socket.on("joinPongByMatchmaking", (data: PongData) => {
            console.log("recieved is pong");
            setPongSwitch(data);
        });
        socket.on("invitation", (invitation: InvitationDTO) => {
            if (userAuth.username === invitation.to) {
                CreateInvitation(invitation, dispatch, socket, onPong);
            }
        });
        socket.on("response", (response: ResponseDTO) => {
            console.log("received response");
            console.log(response.to);
            console.log(userAuth.id);
            if (Number(userAuth.id) === Number(response.to)) {
                CreateResponse(response, dispatch, socket, onPong);
            }
        });
        return () => {
            socket.off("invitation");
            socket.off("response");
            socket.off("joinPongByMatchmaking");
        };
    }, []);

    return (
        <div className="home">
            <div className="homeContainer">
                <Topbar />
                <div className="mainContainer">
                    <Navbar />
                    <div className="featureContainer">
                        {PongSwitch.isPong && (
                            <Pong
                                username={userAuth.username}
                                host={PongSwitch.host}
                                onEnd={() => {
                                    setPongSwitch({
                                        isPong: false,
                                        data: {
                                            room: "",
                                            mode: CLASSIC,
                                        },
                                        host: false,
                                    });
                                }}
                                mode={PongSwitch.data.mode}
                                room={PongSwitch.data.room}
                            />
                        )}
                        {PongSwitch.isPong === false &&
                            featureComponent.get(feature)}
                    </div>
                    <div className="button-container">
                        {!isVisible && (
                            <button
                                className="friend-button"
                                onClick={() => {
                                    setIsVisible(!isVisible);
                                }}
                            >
                                <img src={ContactIcon} alt="" />
                            </button>
                        )}
                    </div>
                    <div className="friendbar-container" ref={ref}>
                        {isVisible && <Friendbar/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Home };
