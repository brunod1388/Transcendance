import React from 'react'
import { MatchIcon } from '../../../assets/images'
import "../styles/matchBoard.scss"

type Props = {}

export default function MatchBoard({}: Props) {
  return (
	<div className="match-container">
		<div className='button-container'>
			<div className="button-border"/>
			<button className='play-button'>Play</button>
		</div>
	</div>
  )
}