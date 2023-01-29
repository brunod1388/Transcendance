import style from './Input.module.css';

interface InputProps {
	name: string;
	required?: boolean;
	placeholder: string;
	type?: string;
}

function Input (props: InputProps) {
	const { name, required = false , placeholder, type} = props;
	return (
		<div className={style.inputbox}>
			<input
				type={type}
				name={name}
				className={style.input}
				required={required}
				placeholder={placeholder}
			/>
		</div>

	);
}

export default Input;