import style from "../styles/Login.module.css";
import { SubmitButton } from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import { LogInForm } from "./LoginForm";

interface Props {
    divStyle: string;
    onClick: () => void;
}

function LoginButton(props: Props) {
    const { divStyle, onClick } = props;
    return (
        <>
            <SubmitButton divStyle={divStyle} handleClick={onClick} fill={true}>
                Log in
            </SubmitButton>
        </>
    );
}

function SignIn42Button(props: Props) {
    const { divStyle, onClick } = props;
    return (
        <>
            <SubmitButton divStyle={divStyle} handleClick={onClick} fill={true}>
                Sign In 42
            </SubmitButton>
        </>
    );
}

function SignUpButton(props: Props) {
    const { divStyle, onClick } = props;
    return (
        <>
            <div className={divStyle}>
                <button className={style.link_button} onClick={onClick}>
                    No account? Sign up.
                </button>
            </div>
        </>
    );
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
            <LoginButton divStyle={divStyle} onClick={joinChat} />
            <SignUpButton divStyle={divStyle} onClick={subscribe} />
            <hr className={style.hrLogin} />
            <SignIn42Button divStyle={divStyle} onClick={signIn42} />
        </div>
    );
}
