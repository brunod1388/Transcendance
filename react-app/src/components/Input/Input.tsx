import style from './Input.module.css';

interface InputProps {
	name: string;
	required?: boolean;
	placeholder: string;
	type?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	divStyle?: string;
}

function Input (props: InputProps) {
	const { name,
			required = false,
			placeholder,
			type,
			onChange = () => {},
			divStyle = ""
	} = props;

	return (
		<div className={props.divStyle}>
			<input
				type={type}
				name={name}
				className={style.input}
				required={required}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
}

export default Input;