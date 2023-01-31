import style from './LinkButton.module.css';

interface LinkProps {
	name: string;
	handleClick(): void;
	divStyle?: string;
	fill?: boolean;
}

function SubmitButton (props: LinkProps) {
	const {name, handleClick, divStyle = "", fill=false} = props;
	
	return (
		<div className={props.divStyle}>
			<button
				className={style.link_button}
				onClick={handleClick}
			>
				{name}
			</button>
		</div>
	);
}

export default SubmitButton;