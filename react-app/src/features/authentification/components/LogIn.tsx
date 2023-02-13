import style from "../styles/Login.module.css";
import { SubmitButton } from "../../../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";

interface Props {
    divStyle: string;
    onClick: () => void;
}

export function Login() {
    const username = useInput("", "Login", "login", "text", true);
    const password = useInput("", "Password", "password", "password", true);

    const navigate = useNavigate();
    let divStyle: string = style.div_container;

    const joinChat = () => {
        console.log(`login: ${username.value}`)
        console.log(`login: ${password.value}`)
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
        <div className={style.form_container}>
            <div className={style.div_container}>
                <h3>Sign in to your account</h3>
            </div>
            <Input divStyle={divStyle} content={username} />
            <Input divStyle={divStyle} content={password} />
            <SubmitButton placeholder="Log In" divStyle={divStyle} onClick={joinChat} />
            <SubmitButton placeholder="No account? Sign up." buttonStyle={style.link_button} divStyle={divStyle} onClick={subscribe} />
            <hr className={style.hrLogin} />
            <SubmitButton placeholder="Sign in 42" divStyle={divStyle} onClick={signIn42} />
        </div>
    );
}
