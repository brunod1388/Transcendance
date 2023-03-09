import React from 'react'
import User from './User'
import { UserType } from '../../../@types'

type Props = {}

const usr:UserType = {
	id: 113,
    username: "testUser"
}
export default function Friendbar({}: Props) {
  return (
	<div className="friendBar">
		<span className="title">Friends</span>
		{[...Array(20)].map((e, i) => (
			<User user={usr} isPrivate={true} keyId={`d${i}`} key={i} />
		))}
	</div>
  )
}