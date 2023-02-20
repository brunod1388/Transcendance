import style from "../styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../../components/SubmitButton";
import { Input } from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";

export function SignUp() {
    const navigate = useNavigate();
    const divStyle = style.div_container;

    const username = useInput("", "Login", "login", "text", true);
    const mail = useInput("", "Email", "mail", "mail", true);
    const pwd = useInput("", "Password", "pwd", "password", true);
    const repwd = useInput("", "Re-type Password", "repwd", "password", true);

    const signup = () => {
        navigate("/", { replace: true });
    };

    return (
        <div className={style.form_container}>
            <div className={style.div_container}>
                <h3>Fill this subscription form</h3>
            </div>
            <Input divStyle={divStyle} content={username} />
            <Input divStyle={divStyle} content={mail} />
            <Input divStyle={divStyle} content={pwd} />
            <Input divStyle={divStyle} content={repwd} />
            <SubmitButton
                placeholder="Subscribe"
                onClick={signup}
                divStyle={divStyle}
            />
        </div>
    );
}
