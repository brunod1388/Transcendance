// import { SignUp } from "../components/authentification/components/SignUp";
// import style from "../assets/styles/pages.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../pages.scss";
import { useAuth } from "../../context/auth-context";
import { useAxios } from "../../hooks/useAxios";
import { useSignup } from "../../hooks/useSignup";

function Subscribe() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const [Auth, { updateUser, updateToken }] = useAuth();

    const [params, setParams] = useState({
        method: "POST",
        url: "/auth/signup",
        headers: { crossorigin: "true" },
        data: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            enable2FA: false,
            code2FA: "",
        },
    });

    const { data, loading, error, fetchData } = useAxios(params);

    //const { TFAuth, code } = useSignup(data);

    function handleSubmit(e: any) {
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confpassword = e.target[3].value;
        const file = e.target[4].files[0];
        e.preventDefault();
        console.log("TEST");
        console.log(`displayName: ${displayName}`);
        console.log(`password: ${password}`);
        console.log(`email: ${email}`);
        console.log(`confirm password: ${confpassword}`);
        setParams((prevState) => ({
            method: prevState.method,
            url: prevState.url,
            headers: prevState.headers,
            data: {
                username: displayName,
                email: email,
                password: password,
                confirmPassword: confpassword,
                enable2FA: false,
                code2FA: "",
            },
        }));
        console.log("Auth: ", Auth);
    }

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <span className="logo">Transcendance</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="confirm password" />
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
