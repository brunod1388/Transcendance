import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "../../hooks";

interface DataType {
    code: string;
}

const defaultDataType: DataType = {
    code: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "GET",
    url: "/auth/enable2FA",
};

const defaultVerifyRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/activate2FA",
    data: defaultDataType,
};

interface Props {
    qrcode: string;
}

function TwoFactorAuth() {
    const [request] = useState<AxiosRequestConfig>(defaultRequest);
    const [code, setCode] = useState<string>("");
    const { response } = useAxios(request);

    useEffect(() => {
        if (response?.data?.url) {
            setCode(response.data.url);
        }
    }, [response]);

    return <TwoFactorAuthPage qrcode={code} />;
}

function TwoFactorAuthPage({ qrcode }: Props) {
    const [request, setRequest] =
        useState<AxiosRequestConfig>(defaultVerifyRequest);
    const { response, error, sendData } = useAxios(request);
    //const { userAuth, updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (response?.status === 201) {
            navigate("/home");
        }
    }, [response]);

    useEffect(() => {
        if (request !== defaultVerifyRequest) {
            sendData();
        }
    }, [request])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const dto: DataType = {
            code: String(target.code.value),
        };
        setRequest((prev: AxiosRequestConfig) => ({ ...prev, data: dto }));
    }

    return (
        <div className="form_container">
            <span className="logo">Two Factor Authentication</span>
            <div className="form_wrapper">
                <span className="title">
                    Scan QR with Google Authenticator then input code below{" "}
                </span>
                <img alt="" src={qrcode} />
                <form onSubmit={handleSubmit}>
                    <input name="code" type="text" placeholder="code" />
                    <button>
                        Verify code and complete two factor activation
                    </button>
                    {error?.response?.status === 403 && (
                        <span>Verification code incorrect</span>
                    )}
                </form>
                <p className="detail">
                    Cancel activation of Two Factor Authentication?{" "}
                    <Link to="/home">Home</Link>
                </p>
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
