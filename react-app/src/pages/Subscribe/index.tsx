import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import Add from "../../assets/images/add-image.png";
import { AxiosRequestConfig } from "axios";
// import { useSocket } from "../../hooks/useSocket";

import "../../assets/styles/form.scss";
import { useAxios } from "../../hooks";

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
    // const [socket] = useSocket();
    // function signup(e: any) {
    //     console.log("TEST");
    //     socket.emit(
    //         "newUser",
    //         {
    //             username: e.target[0].value,
    //             email: e.target[1].value,
    //             password: e.target[2].value,
    //             confirmPassword: e.target[3].value,
    //         },
    //         (res?: string) => {
    //             console.log(res);
    //         }
    //     );
    //     // navigate("/", { replace: true });
    // }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper register">
                <span className="title">Register</span>
                {/* <form onSubmit={signup}> */}
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        placeholder="display name"
                    />
                    <input name="email" type="email" placeholder="email" />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                    />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button type="submit">Sign up</button>
                    {error && <p>Invalid Input</p>}
                </form>
                <button type="button" onClick={signup42}>
                    Sign up with 42
                </button>
                <p className="detail">
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Subscribe;
