import { LockIcon, NoChannelIcon } from "assets/images"
import { useChat } from "context"
import "../styles/channelMenu.scss"
import { useState } from "react"

type Props = {

}

export default function ChannelMenu({}: Props) {
	const {channel} = useChat();
	const [ protectedChannel, setProtected ] = useState<boolean>(channel.protected)
	const [ type, setType ] = useState("protected");
	function applyChange() {
		console.log("apply change")
		console.log(protectedChannel)
	}
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let isChecked = e.target.checked;
        setProtected(isChecked);
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
					<form className="protected-form" onSubmit={applyChange}>
						<div className="input-title">Old password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="oldPassword" name="password" placeholder="Old Password"/>
						</div>
						<button className="button-purple" onClick={applyChange}>Apply Change</button>
					</form>
				}
				{type !== (channel.protected ? "protected" : "public") && type == "protected" &&
					<form className="protected-form" onSubmit={applyChange}>
						<div className="input-title">Old password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="oldPassword" name="password" placeholder="Old Password"/>
						</div>
						<div className="input-title">New password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="newPassword" name="password" placeholder="New Password"/>
						</div>
						<div className="input-title">Confirm password</div>
						<div className="input">
							<img src={LockIcon} alt="" />
							<input type="confirmPassword" name="password" placeholder="Confirm Password"/>
						</div>
						<button className="button-purple" onClick={applyChange}>Apply Change</button>
					</form>
				}
			</div>
		</div>
  )
}