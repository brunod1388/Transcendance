import style from './Input.module.css';

interface InputProps {
	name: string;
	required?: boolean;
	placeholder: string;
	type?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	divStyle?: string;
	fill?: boolean;
}

function Input (props: InputProps) {
	const { name,
			required = false,
			placeholder,
			type,
			onChange = () => {},
			divStyle = "",
			fill = false
	} = props;

	return (
		<div className={divStyle}>
			<input
				type={type}
				name={name}
				className={style.input + (fill ? " " + style.width100 : "")}
				required={required}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
}

export default Input;