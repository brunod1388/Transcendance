import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import Add from "../assets/images/add-image.png";
import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAxios } from "../hooks";
import "../assets/styles/form.scss";
import { Email, Lock, Logo42, User } from "../assets/images";

interface DataType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const defaultDataType: DataType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/signup",
    data: defaultDataType,
};

function Subscribe() {
    const navigate = useNavigate();
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const { response, loading, error, sendData } = useAxios(request);

    useEffect(() => {
        if (Cookies.get("JWTtoken")) {
            navigate("/home");
        }
    }, []);

    useEffect(() => {
        if (loading === false && response?.status === 201) {
            navigate("/login");
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
            email: target.email.value,
            password: target.password.value,
            confirmPassword: target.confirmPassword.value,
        };
        setRequest((prev: AxiosRequestConfig) => ({ ...prev, data: data }));
    }

    function signup42(e: MouseEvent<HTMLButtonElement>) {
        const checking = window.location;
        if (checking !== null) {
            checking.href = "http://localhost:3000/auth/login42";
        }
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper signup_wrapper">
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <span className="input-title">Username</span>
                        <img className="input_icon" src={User} alt="" />
                        <input
                            name="username"
                            type="text"
                            placeholder="display name"
                        />
                    </div>
                    <div className="input_container">
                        <span className="input-title">Email</span>
                        <img className="input_icon" src={Email} alt="" />
                        <input name="email" type="email" placeholder="email" />
                    </div>
                    <div className="input_container">
                        <span className="input-title">Password</span>
                        <img className="input_icon" src={Lock} alt="" />
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                    />
                    </div>
                    <div className="input_container">
                        <span className="input-title">Confirm Password</span>
                        <img className="input_icon" src={Lock} alt="" />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="confirm password"
                    />
                    </div>
                    <div className="input_container">
                        <input style={{ display: "none" }} type="file" id="file" />
                        <label htmlFor="file" className="flex-row">
                            <img src={Add} alt="" />
                            <span>Add an Avatar</span>
                    </label>
                    </div>
                    <button className="button-purple" type="submit">Sign up</button>
                    {error && <p>Invalid Input</p>}
                </form>
                <div className="flex-row signup_buttons_container">
                    <button className="button-purple" type="button" onClick={signup42}>
                        <img src={Logo42} alt="" />
                        Login
                    </button>
                    <Link to="/login">
                        <button className="button-purple">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Subscribe };
