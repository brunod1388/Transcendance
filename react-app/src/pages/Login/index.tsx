// import style from "../assets/styles/pages.module.css";
// import { Login } from "../components/authentification/components/LogIn";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../pages.scss";

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e: any) {}

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <span className="logo">Transcendance</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You don't have an account?{" "}
                    <Link to="/subscribe">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;