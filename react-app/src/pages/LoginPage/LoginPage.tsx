import { useState } from "react";
// import { Layout } from './index'
import style from "./LoginPage.module.css";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const joinChat = () => {
        // socket.emit('join_chat', {username, password});
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        navigate("/messages", { replace: true });
    };

    const signIn42 = () => {
        console.log(`sign in 42`);
        navigate("/messages", { replace: true });
    };

    const subscribe = () => {
        console.log(`sign in 42`);
        navigate("/subscribe", { replace: true });
    };

    return (
        <div className={style.login_wrapper}>
            <div className={style.title}>
                <h1>Transcendence</h1>
            </div>
            <div className={style.login_container}>
                <div className={style.form_container}>
                    <div className={style.div_container}>
                        <h3>Sign in to your account</h3>
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
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton
                        divStyle={style.div_container}
                        name="Log in"
                        handleClick={joinChat}
                        fill={true}
                    />
                    <div className={style.div_container}>
                        <button
                            className={style.link_button}
                            onClick={subscribe}
                        >
                            No account? Sign up.
                        </button>
                    </div>
                    <hr className={style.hrLogin} />
                    <SubmitButton
                        divStyle={style.div_container}
                        name="Sign In 42"
                        handleClick={signIn42}
                        fill={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
