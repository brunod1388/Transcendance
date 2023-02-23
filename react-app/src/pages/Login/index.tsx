// import style from "../assets/styles/pages.module.css";
// import { Login } from "../components/authentification/components/LogIn";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../assets/styles/global.scss";
// import { useUser } from "../../hooks/useTest";
// import {useNavigate} from "react-router-dom";

function Login() {
    const [err, setErr] = useState(false);
    // const navigate = useNavigate();
    // const user = useUser();

    async function handleSubmit(e: any) {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        console.log(`email: ${email}`);
        console.log(`password: ${password}`);
        setErr(err ? false : true);
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p className="detail">
                    You don't have an account?{" "}
                    <Link to="/subscribe">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
