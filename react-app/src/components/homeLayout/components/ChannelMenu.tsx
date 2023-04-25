import { LockIcon, NoChannelIcon } from "assets/images"
import { useChat } from "context"
import "../styles/channelMenu.scss"
import { useState } from "react"
import { useSocket } from "hooks"

type Props = {

}

export default function ChannelMenu({}: Props) {
	const [ error, setError ] = useState("");
	const [socket] = useSocket();
	const {channel} = useChat();
	const [ protectedChannel, setProtected ] = useState<boolean>(channel.protected)
	const [ type, setType ] = useState("protected");
	
	function applyChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.newPassword && e.target.confirmPassword && e.target.oldPassword && (e.target.newPassword === e.target.confirmPassword)) {
			socket.emit("updateChannelPwd", { channelId: channel.id, oldPassword: e.target.oldPassword, password: e.target.newPassword}, (res: string) => {
				if (res !== "OK")
					setError(res);
			})		

		} else {
			setError("Error");
		} 
	}


	return (
		<div className="channel-menu-container">
			<div className="channel-title">
				<img src={NoChannelIcon} alt="channel" />
				<span className="channelName">{channel.name}</span>
			</div>
			<div className="channel-detail">
				<div className="channel-detail-item">
					<span className="label">Current type</span>
					<span className="value">{channel.protected ? "Protected" : "Public"}</span>
				</div>
				<div className="channel-detail-item">
					<div>Change</div>
					<select
						name="channelType"
						onChange={(e) => setType(e.target.value)}
						id="type">
						<option value="protected">Protected</option>
						<option value="public">Public</option>
					</select>
				</div>
				{type !== (channel.protected ? "protected" : "public") && type === "public" &&
					<div className="protected-form">
						<div className="input-title">Old password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="password" name="oldPassword" placeholder="Old Password"/>
						</div>
						<button className="button-purple" onClick={applyChange}>Apply Change</button>
					</div>
				}
				{type !== (channel.protected ? "protected" : "public") && type == "protected" &&
					<div className="protected-form">
						<div className="input-title">Old password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="password" name="oldPassword" placeholder="Old Password"/>
						</div>
						<div className="input-title">New password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="password" name="newPassword" placeholder="New Password"/>
						</div>
						<div className="input-title">Confirm password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="password" name="confirmPassword" placeholder="Confirm Password"/>
						</div>
						<button className="button-purple" onClick={applyChange}>Apply Change</button>
					</div>
				}
			</div>
			{error && <p className="error"></>}
		</div>
  )
}