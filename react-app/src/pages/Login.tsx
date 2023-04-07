import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";
import "../assets/styles/form.scss";
import { useAxios } from "../hooks";
import Cookies from "js-cookie";
import { LockIcon, Logo42Icon, UserIcon } from "../assets/images";
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

function Login() {
    const navigate = useNavigate();
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const { response, loading, error, sendData } = useAxios(request);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (Cookies.get("JWTtoken")) {
            navigate("/home");
        }
    }, []);

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate(response.data?.redirect);
        }
    }, [loading, response]);

    useEffect(() => {
        if (request !== defaultRequest) {
            sendData();
        }
    }, [request]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const data: DataType = {
            username: target.username.value,
            password: target.password.value,
        };
        setRequest((prev: AxiosRequestConfig) => ({ ...prev, data: data }));
    }

    function login42(e: MouseEvent<HTMLButtonElement>) {
        const checking = window.location;
        if (checking !== null) {
            checking.href = "http://localhost:3000/auth/login42";
        }
    }

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <span className="logo">Transcendance</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <span className="input-title">Username</span>
                        <img className="input_icon" src={UserIcon} alt="" />
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            onChange={() => setNotFound(false)}
                        />
                    </div>
                    <div className="input_container">
                        <span className="input-title">Password</span>
                        <img className="input_icon locker" src={LockIcon} alt="" />
                        <input
                            className="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <button className="button-purple login">Login</button>
                    {error && <p>Credentials Incorrect</p>}
                    {/* {err && <span>Something went wrong</span>} */}
                    {notFound && <span>User does not exist</span>}
                </form>
                <div className="flex-row signup_buttons_container">
                    <button
                        className="button-purple"
                        type="button"
                        onClick={login42}
                    >
                        <img src={Logo42Icon} alt="" />
                        Login
                    </button>
                    <Link to="/subscribe">
                        <button className="button-purple">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Login };
