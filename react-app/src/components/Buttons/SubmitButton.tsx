import style from './SubmitButton.module.css';

interface SubmitProps {
	name: string;
	handleClick(): void;
}

function Input (props: SubmitProps) {
	return (
		<button
			className={style.shadow__btn}
			onClick={props.handleClick}
		>
			{props.name}
		</button>

	);
}

export default Input;