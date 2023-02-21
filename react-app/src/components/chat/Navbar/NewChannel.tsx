import React from 'react'

type Props = {}

export default function NewChannel({}: Props) {
	
	function handleSubmit(e: any) {
		// ADD NEW CHANNEL
	}

	return (
	<div className="newChannel_container">
		<div className="form_wrapper">
			<span className="title">New Channel</span>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="ChannelName"/>
				<select name="channelType" id="channelType">
					<option value="public">public</option>
					<option value="protected"></option>
				</select>
				{true && <input type="password" placeholder="Password" /> }
				{true && <input type="password" placeholder="re-type Password" /> }
				<input type="file" style={{ display: "none"}} id="fileUrl" />
				<label htmlFor="file">
					<img src="AddImage" alt="" />
					<span>Add a channel image</span>
				</label>
				<button>Create Channel</button>
			</form>
		</div>
	</div>
  )
}