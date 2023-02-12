import style from "../styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../../components/SubmitButton";
import { SignUpForm } from "./SignUpForm";

export function SignUp() {
    const navigate = useNavigate();
    const divStyle = style.div_container;

    const signup = () => {
        navigate("/", { replace: true });
    };

    return (
        <div className={style.form_container}>
            <div className={style.div_container}>
                <h3>Fill this subscription form</h3>
            </div>
            <SignUpForm divStyle={divStyle} />
            <SubmitButton placeholder="Subscribe" onClick={signup} divStyle={divStyle}/>
        </div>
    );
}
