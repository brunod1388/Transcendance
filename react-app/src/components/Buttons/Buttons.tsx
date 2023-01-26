import React from 'react';

interface ButtonProps {
	children:  React.ReactNode;
	handleClick?(): void;
	mouseEnter?(): void;
	mouseLeave?(): void;
}

function Button (props: ButtonProps) {
	if (props.handleClick && props.mouseEnter && props.mouseLeave)
		return ButtonClickAndHover(props);
	else if ( props.handleClick )
		return ButtonClick(props);
	
	else if ( props.mouseEnter && props.mouseLeave) {
		return ButtonHover(props);
		
	}
	return ( <button> {props.children} </button> );
}


function ButtonClick(props: ButtonProps) {
	return ( <button onClick={props.handleClick}> {props.children} </button> );
}

function ButtonHover(props: ButtonProps) {
	return (	<button	onMouseEnter={props.mouseEnter}
						onMouseLeave={props.mouseLeave}>
								{props.children}
					</button> );
}

function ButtonClickAndHover(props: ButtonProps) {
	return (<button	onClick={props.handleClick}
							onMouseEnter={props.mouseEnter}
							onMouseLeave={props.mouseLeave}>
								{props.children}
				</button> );
}
export default Button;



