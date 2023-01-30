import style from './Input.module.css';

interface InputProps {
	name: string;
	required?: boolean;
	placeholder: string;
	type?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input (props: InputProps) {
	const { name, required = false , placeholder, type, onChange = () => {}} = props;
	return (
		<div className={style.inputbox}>
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