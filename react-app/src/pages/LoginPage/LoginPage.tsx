import React from 'react';
// import { Layout } from './index'
import style from './LoginPage.module.css';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/Buttons/SubmitButton';

function test(): void {
	console.log("yeaaaah");
}

function	LoginPage() {
	return (
		// <Layout>
		// 	<h1>Login Page</h1>
		// 	{/* <p className="subtitle">Play</p> */}
		// </Layout>
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
								required={true}/>
						</div>
						<div className={style.div_container}>
							<Input
								name="password"
								placeholder="password"
								type="password"
							/>
						</div>
						<div className={style.div_container}>
							<SubmitButton
								name="continue"
								handleClick={test}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default	LoginPage;