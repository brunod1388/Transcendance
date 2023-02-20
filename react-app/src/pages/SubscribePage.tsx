import { SignUp } from "../components/authentification/components/SignUp";
import style from "../assets/styles/pages.module.css";

function SubscribePage() {
    return (
        <div className={style.login_wrapper}>
            <div className={style.login_title}>
                <h1>Transcendence</h1>
            </div>
            <div className={style.login_container}>
                <SignUp />
            </div>
        </div>
    );
}

export default SubscribePage;
