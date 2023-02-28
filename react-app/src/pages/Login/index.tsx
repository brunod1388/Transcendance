import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
// import { useSocket } from "../../hooks/useSocket";
import { AxiosRequestConfig } from "axios";
import "../../assets/styles/global.scss";
import { useAuth } from "../../context";
import { useAxios } from "../../hooks";
//import { useSignup } from "../../hooks/useSignup";
//import axios from "axios";
import Cookies from "js-cookie";
import { SetStateType } from "../../@types";

// import style from "../assets/styles/pages.module.css";
// import { Login } from "../components/authentification/components/LogIn";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../../assets/styles/global.scss";
// import { useAxios } from "../../hooks";
// import { useAuth } from "../../context";
// import Cookies from "js-cookie";

interface DataType {
    username: string;
    password: string;
}

const defaultDataType: DataType = {
    username: "",
    password: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/signin",
    data: defaultDataType,
};

interface Props {
    setRequest: SetStateType<AxiosRequestConfig>;
}

function Login() {
    const navigate = useNavigate();
    const { userAuth, token, updateUser, updateToken } = useAuth();
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const { response, loading } = useAxios(request);

    useEffect(() => {
        console.log("Updated userAuth: ", userAuth);
    }, [userAuth]);

    useEffect(() => {
        console.log("Updated Auth: ", token);
    }, [token]);

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate("/twofactor");
        }
    }, [loading, response]);

    useEffect(() => {
        console.log(`statut: ${response?.status}`);
        console.log(`data: ${response?.data}`);
        const token = Cookies.get("JWTtoken");
        console.log("Response cookie: ", token);
        if (token) {
            updateToken(token);
        }
        if (response !== undefined) {
            updateUser(response.data);
        }
    }, [response]);

    return <LoginPage setRequest={setRequest} />;
}

function LoginPage({ setRequest }: Props) {
    const [err] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const data: DataType = {
            username: target.username.value,
            password: target.password.value,
        };
        console.log(data);
        console.log("handleSubmit launched");
        setRequest((prev: AxiosRequestConfig) => ({ ...prev, data: data }));
    }

    function login42(e: any) {
        const checking = window.location;
        if (checking !== null) {
            checking.href = "http://localhost:3000/auth/login42";
        }
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input name="username" type="text" placeholder="username" />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <button type="button" onClick={login42}>
                    Login with 42
                </button>
                <p>
                    You don't have an account?{" "}
                    <Link to="/subscribe">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

/*
function Login() {
    const [err] = useState(false);
    // const navigate = useNavigate();

    //const [Auth, { updateUser, updateToken }] = useAuth();

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
*/
