// import style from "../assets/styles/pages.module.css";
// import { Login } from "../components/authentification/components/LogIn";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/styles/global.scss";
import { useAxios } from "../../hooks";
import { useAuth } from "../../context";
import Cookies from "js-cookie";

function Login() {
    const [err] = useState(false);
    // const navigate = useNavigate();

    const [Auth, { updateUser, updateToken }] = useAuth();

    useEffect(() => {
        console.log("Updated Auth: ", Auth);
    }, [Auth]);

    const [params, setParams] = useState({
        method: "POST",
        url: "/auth/signin",
        data: {
            username: "",
            password: "",
            code2FA: "",
        },
    });

    // Find a way to display error message
    const { response } = useAxios(params);

    useEffect(() => {
        //    let TFAuth = false;
        //    let code = "";

        const token = Cookies.get("JWTtoken");
        console.log("Response cookie: ", token);
        if (token) {
            updateToken(token);
        }
        //console.log("URL: ", res.data["url"]);
        if (response !== undefined) {
            console.log("DATA: ", response.data);
            updateUser(response.data);
            //console.log("AUTH: ", Auth);
        }

        //    if (TFAuth) {
        //        navigate("/2fa", { state: code, replace: true });
        //    }
    }, [response]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        console.log("handleSubmit launched");
        setParams((prevState: any) => ({
            method: prevState.method,
            url: prevState.url,
            data: {
                username: username,
                password: password,
                code2FA: "",
            },
        }));
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" />
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
