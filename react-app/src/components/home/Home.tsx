import { Navbar, Topbar, Friendbar } from ".";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import { useAuth } from "../../context";
import { useState, useEffect } from "react";
import { useNotificationsDispatch, useSocket, useVisible } from "../../hooks";
import { CreateInvitation, CreateResponse } from "../invitations";
import { InvitationDTO, ResponseDTO } from "../../@types";
// import { Pong } from "../pong";
import Chat from "../chat/Chat";
import "./styles/home.scss";
import { CLASSIC, GameMode } from "../pong/Game";
import { Game } from "../pong/Game";
import { gameConfig } from "../pong/GameService";

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    // [Feature.Pong, <Pong />],
    // [Feature.Ranking, <Ranking />],
]);

interface JoinPongDto {
    room: string;
    mode: GameMode;
}

interface PongData {
    isPong: boolean;
    data: JoinPongDto;
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
    });

    const onPong = (room: string, mode: GameMode) => {
        setPongSwitch({
            isPong: true,
            data: {
                room: room,
                mode: mode,
            },
        });
    };

    useEffect(() => {
        socket.emit("chatConnection", { userid: userAuth.id });
        socket.emit("getChannels", { userid: userAuth.id, isPendng: false });
    }, [userAuth.id, socket]);

    useEffect(() => {
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
        socket.on("joinPong", (data: JoinPongDto) => {
            setPongSwitch({
                isPong: true,
                data: {
                    mode: data.mode,
                    room: data.room,
                },
            });
        });
        return () => {
            socket.off("invitation");
            socket.off("response");
            socket.off("joinPong");
        };
    }, []);

    return (
        <div className="home">
            <div className="homeContainer">
                <Navbar />
                <div className="mainContainer">
                    <Topbar />
                    <div className="featureContainer">
                        {PongSwitch.isPong && (
                            <Game
                                onEnd={() => {
                                    setPongSwitch({
                                        isPong: false,
                                        data: {
                                            room: "",
                                            mode: CLASSIC,
                                        },
                                    });
                                }}
                                mode={PongSwitch.data.mode}
                                room={PongSwitch.data.room}
                                config={gameConfig(
                                    PongSwitch.data.mode,
                                    PongSwitch.data.room
                                )}
                            />
                        )}
                        {PongSwitch.isPong === false &&
                            featureComponent.get(feature)}
                    </div>
                </div>
                <div className="button_container">
                    {!isVisible && (
                        <button
                            className="friendButton"
                            onClick={() => {
                                setIsVisible(!isVisible);
                            }}
                        >
                            <img src={ContactIcon} alt="" />
                        </button>
                    )}
                </div>
                <div className="friendbarContainer" ref={ref}>
                    {isVisible && <Friendbar />}
                </div>
            </div>
        </div>
    );
}

export { Home };
