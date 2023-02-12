import style from "../styles/Login.module.css";
import { SubmitButton } from "../../../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { LogInForm } from "./LoginForm";

interface Props {
    divStyle: string;
    onClick: () => void;
}

export function Login() {
    const navigate = useNavigate();
    let divStyle: string = style.div_container;

    const joinChat = () => {
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
            <LogInForm divStyle={divStyle} />
            <SubmitButton placeholder="Log In" divStyle={divStyle} onClick={joinChat} />
            <SubmitButton placeholder="No account? Sign up." buttonStyle={style.link_button} divStyle={divStyle} onClick={subscribe} />
            <hr className={style.hrLogin} />
            <SubmitButton placeholder="Sign in 42" divStyle={divStyle} onClick={signIn42} />
        </div>
    );

}
