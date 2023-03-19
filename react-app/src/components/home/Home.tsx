import { Navbar, Topbar, Friendbar } from ".";
import { useSearchParams } from "react-router-dom";
import { Pong } from "../pong";

import Chat from "../chat/Chat";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import "./styles/home.scss";
import { useState, useEffect } from "react";
import { useNotificationsDispatch, useSocket } from "../../hooks";
import { CreateInvitation, CreateResponse } from "../invitations";
import { InvitationDTO, ResponseDTO } from "../../@types";
import { useAuth } from "../../context";

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    // [Feature.Pong, <Pong />],
    // [Feature.Ranking, <Ranking />],
]);

function Home() {
    const { feature } = useFeature();
    const [friendsVisible, setFriendsVisible] = useState(false);
	const [socket] = useSocket();
	const dispatch = useNotificationsDispatch();
	const {userAuth} = useAuth();
	const [isPong, setIsPong] = useState<Boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		socket.on("invitation", (invitation: InvitationDTO) => {
			if (userAuth.username === invitation.to) {
				CreateInvitation(invitation, dispatch, socket);
			}});
		socket.on("response", (response: ResponseDTO) => {
			console.log('received response');
			console.log(response.to);
			console.log(userAuth.id);
			if (Number(userAuth.id) === Number(response.to)) {
				CreateResponse(response, dispatch, socket)
			}});
			socket.on("joinPong", () => {
				setIsPong(true);
			});
		return () => {
			socket.off("invitation");
			socket.off("response");
			socket.off("joinPong");
		}
	}, [])

    return (
        <div className="home">
            <div className="homeContainer">
                <Navbar />
                <div className="mainContainer">
                    <Topbar />
                    <div className="featureContainer">
					{isPong && (
                            <Pong
                                onEnd={() => {
                                    setIsPong(false);
									searchParams.delete('room');
									setSearchParams(searchParams);
                                }}
                            />
                        )}
                        {isPong === false && featureComponent.get(feature)}
                    </div>
                </div>
                <div className="button_container">
                    <button
                        className="friendButton"
                        onClick={() => {
                            setFriendsVisible(friendsVisible ? false : true);
                        }}
                    >
                        <img src={ContactIcon} alt="" />
                    </button>
                </div>
                {friendsVisible && <Friendbar />}
            </div>
        </div>
    );
}

export { Home };
