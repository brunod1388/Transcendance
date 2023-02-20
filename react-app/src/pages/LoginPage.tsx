import style from "../assets/styles/pages.module.css";
import { Login } from "../components/authentification/components/LogIn";

function LoginPage() {
    return (
        <div className={style.login_wrapper}>
            <div className={style.login_title}>
                <h1>Transcendence</h1>
            </div>
            <div className={style.login_container}>
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;
