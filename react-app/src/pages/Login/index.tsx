import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";
import "../../assets/styles/global.scss";
import { useAxios } from "../../hooks";

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

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate("/twofactor");
        }
    }, [loading, response]);

    useEffect(() => {
        if (request !== defaultRequest) {
            sendData();
        }
    }, [request])

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
                    <button>Login</button>
                    {error && (<p>Credentials Incorrect</p>)}
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
