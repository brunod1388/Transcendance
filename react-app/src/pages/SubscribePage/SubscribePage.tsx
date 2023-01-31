import { useState } from 'react';
// import { Layout } from './index'
import style from './SubscribePage.module.css';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/Buttons/SubmitButton';
import { useNavigate } from 'react-router-dom';

function	SubscribePage() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [mail, setMail] = useState('');
	const navigate = useNavigate();

	const subscribeChat = () => {

		// socket.emit('join_chat', {username, password});
		console.log(`username: ${username}`);
		console.log(`password: ${password}`);
		console.log(`re-password: ${rePassword}`);
		console.log(`mail: ${mail}`);
		
		navigate('/', {replace: true});
	};

	return (
		<div className={style.login_wrapper}>
			<div className={style.title}>
				<h1>Transcendence</h1>
			</div>
			<div className={style.login_container}>
				<div className={style.form_container}>
					<div className={style.div_container}> 
						<h3>Fill this subscription form</h3>
					</div>
					<Input
						divStyle={style.div_container}
						name="login"
						placeholder="Login"
						required={true}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
							divStyle={style.div_container}
							name="mail"
							placeholder="Email"
							type="mail"
							onChange={(e) => setMail(e.target.value)}
						/>
					<Input
						divStyle={style.div_container}
						name="password"
						placeholder="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						divStyle={style.div_container}
						name="repassword"
						placeholder="Re-type Password"
						type="repassword"
						onChange={(e) => setRePassword(e.target.value)}
					/>
					<SubmitButton
							divStyle={style.div_container}
							name="Suscribe"
							handleClick={subscribeChat}
							fill={true}
					/>
				</div>
			</div>
		</div>

	);
}

export default	SubscribePage;