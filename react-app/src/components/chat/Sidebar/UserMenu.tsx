import React from 'react'

type Props = {}

export default function UserMenu({}: Props) {
  return (
		<div className="userMenu">
			<div className="btnContainer">
				<button className="askFriend">Ask Friend</button>
			</div>
			<div className="btnContainer">
				<button className="mute">Mute</button>
			</div>
			<div className="btnContainer">
				<button className="block">Block</button>
			</div>
			<div className="btnContainer">
				<button className="Play">Play</button>
			</div>
		</div>
	)
}