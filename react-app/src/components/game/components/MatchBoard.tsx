import React from 'react'
import { MatchIcon } from '../../../assets/images'
import "../styles/matchBoard.scss"

type Props = {}

export default function MatchBoard({}: Props) {
  return (
	<div className='match-board'>
		<div className="title-container">
			<img src={MatchIcon} alt="" />
			<h1 className="title">Match</h1>
			<img src={MatchIcon} alt="" />
		</div>
		<div className="match-container">
			<div className='button-container'>
				<div className="button-border"/>
				<button className='play-button'>Play</button>
			</div>
		</div>
	</div>
  )
}