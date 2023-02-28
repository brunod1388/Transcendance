import { useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAuth } from "../../context";
import { useAxios } from "../../hooks";

interface DataType {
    code: string;
    id: number;
}

const defaultDataType: DataType = {
    code: "",
    id: 0,
};

const defaultRequest: AxiosRequestConfig = {
    method: "",
    url: "",
    data: {},
};

const defaultVerifyRequest: AxiosRequestConfig = {
    method: "",
    url: "",
    data: defaultDataType,
};

interface Props {
    qrcode: string;
}

function TwoFactorAuth() {
    //const navigate = useNavigate();

    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const [code, setCode] = useState<string>("");
    const { response } = useAxios(request);
    const { userAuth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setRequest({
                method: "POST",
                url: "/auth/enable2FA",
                data: { id: Number(userAuth.id) },
            });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (response?.data?.url) {
                setCode(response.data.url);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [response]);

    return <TwoFactorAuthPage qrcode={code} />;
}

function TwoFactorAuthPage({ qrcode }: Props) {
    const [request, setRequest] =
        useState<AxiosRequestConfig>(defaultVerifyRequest);
    const { response } = useAxios(request);
    const { userAuth, updateUser } = useAuth();
    const navigate = useNavigate();

    const [err, setErr] = useState(false);

    useEffect(() => {
        console.log("Response: ", response);
        if (response?.data === true) {
            updateUser({
                id: userAuth.id,
                username: userAuth.username,
                avatar: userAuth.avatar,
                authStrategy: userAuth.authStrategy,
                enable2FA: true,
            });
            navigate("/home");
        } else {
            setErr(true);
        }
    }, [response]);

    useEffect(() => {
        console.log("Request variable: ", request);
    }, [request]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        console.log("handleSubmit launched");
        const dto: DataType = {
            code: String(target.code.value),
            id: Number(userAuth.id),
        };
        setRequest({
            method: "GET",
            url: "/auth/verify2FA",
            data: dto,
        });

        console.log("Code: ", target.code.value);
    }

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <span className="logo">Transcendance</span>
                <span className="title">Two Factor Authentication</span>
                <img src={qrcode} />
                <form onSubmit={handleSubmit}>
                    <input name="code" type="text" placeholder="code" />
                    <button>Verify and complete two factor activation</button>
                    {err && <span>Something went wrong</span>}
                </form>
            </div>
        </div>
    );
}

export default TwoFactorAuth;

/*
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

const defaultRequest: AxiosRequestConfig = {
    method: "",
    url: "",
};

interface Props {
    setRequest: SetStateType<AxiosRequestConfig>;
}

function TwoFactorAuth() {
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
            navigate("/home");
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
*/
