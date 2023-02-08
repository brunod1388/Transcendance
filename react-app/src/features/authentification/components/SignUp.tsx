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
            <SignUpSubmitButton onClick={signup} divStyle={divStyle} />
        </div>
    );
}

interface Props {
    onClick: () => void;
    divStyle: string;
}

export function SignUpSubmitButton(props: Props) {
    const { onClick, divStyle } = props;

    return (
        <>
            <SubmitButton divStyle={divStyle} handleClick={onClick} fill={true}>
                Subscribe
            </SubmitButton>
        </>
    );
}
