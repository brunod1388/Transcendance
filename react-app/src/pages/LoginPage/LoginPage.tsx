import { useState } from 'react';
// import { Layout } from './index'
import style from './LoginPage.module.css';
import Input from '../../components/Input/Input';
// import SubmitButton from '../../components/Buttons/SubmitButton';
import { useNavigate } from 'react-router-dom';

function	LoginPage() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const joinChat = () => {

		// socket.emit('join_chat', {username, password});
		console.log(`username: ${username}`);
		console.log(`password: ${password}`);
		navigate('/messages', {replace: true});
	};

	return (
		<div className={style.login_wrapper}>
			<div>
				<div className={style.title}>
					<h1>Transcendence</h1>
				</div>
				<div className={style.login_container}>
					<div className={style.form_container}>
						<div className={style.div_container}> 
							<h3>Sign in to your account</h3>
						</div>
						<div className={style.div_container}> 
							<Input name="login"
								placeholder="Login"
								required={true}
								onChange={(e) => setUsername(e.target.value)}/>
						</div>
						<div className={style.div_container}>
							<Input
								name="password"
								placeholder="password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={style.div_container}>
							{/* <SubmitButton
								name="continue"
								handleClick={joinChat}
							/> */}
							<button
								className={style.shadow__btn}
								onClick={joinChat}
							>
								continue
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default	LoginPage;