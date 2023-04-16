import { ChannelType } from "@customTypes";

type Props = {
	channel: ChannelType;
}

export default function ProtectedForm({channel}: Props) {

	function handleSubmit(e: any) {

	}

	return (
		<div className='protected-container'>
			<div className="form_container">
				<div className="form_wrapper">
					<h1>{channel.name}</h1>
					<form onSubmit={handleSubmit}>
						<input type="password" placeholder="Type password"/>
					</form>
				</div>
			</div>
		</div>
	)
}