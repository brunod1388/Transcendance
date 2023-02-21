// import { SignUp } from "../components/authentification/components/SignUp";
// import style from "../assets/styles/pages.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../pages.scss";

function Subscribe() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e: any) {}

    return (
    <div className="form_container">
        <div className="form_wrapper">
            <span className="logo">Transcendance</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input style={{ display: "none" }} type="file" id="file" />
                <label htmlFor="file">
                    {/* <img src={Add} alt="" /> */}
                    <span>Add an Avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>
                You do have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    </div>
    );
}

export default Subscribe;
