import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Add from "../../assets/images/add-image.png";
import { useSocket } from "../../hooks/useSocket";

import "../../assets/styles/global.scss";
import { useAuth } from "../../context";
import { useAxios } from "../../hooks";
//import { useSignup } from "../../hooks/useSignup";
//import axios from "axios";
import Cookies from "js-cookie";

function Subscribe() {
    const [err] = useState(false);
    const navigate = useNavigate();

    const [Auth, { updateUser, updateToken }] = useAuth();

    useEffect(() => {
        console.log("Updated Auth: ", Auth);
    }, [Auth]);

    const [params, setParams] = useState({
        method: "POST",
        url: "/auth/signup",
        data: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            enable2FA: false,
            code2FA: "",
        },
    });

    const { response } = useAxios(params);

    useEffect(() => {
        let TFAuth = false;
        let code = "";

        const token = Cookies.get("JWTtoken");
        console.log("Response cookie: ", token);
        if (token) {
            updateToken(token);
        }
        //console.log("URL: ", res.data["url"]);
        if (response !== undefined && response.data["url"]) {
            TFAuth = true;
            code = response.data["url"];
            console.log("OUTPUT: ", code);
        } else if (response !== undefined) {
            console.log("DATA: ", response.data);
            updateUser(response.data);
            //console.log("AUTH: ", Auth);
        }

        if (TFAuth) {
            navigate("/2fa", { state: code, replace: true });
        }
    }, [response]);

    /*
    const api = axios.create({
        baseURL: `http://localhost:3000/auth`,
        withCredentials: true,
        headers: { crossorigin: "true" },
    });
    */

    //var TFAuth = false;
    //var code = "";

    //const { TFAuth, code } = useSignup(data);

    async function handleSubmit(e: any) {
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confpassword = e.target[3].value;
        // const file = e.target[4].files[0];
        e.preventDefault();
        console.log("handleSubmit launched");
        setParams((prevState: any) => ({
            method: prevState.method,
            url: prevState.url,
            data: {
                username: displayName,
                email: email,
                password: password,
                confirmPassword: confpassword,
                enable2FA: false,
                code2FA: "",
            },
        }));

        /*
        try {
            const res = await api.post("/signup", {
                username: displayName,
                email: email,
                password: password,
                confirmPassword: confpassword,
                enable2FA: false,
                code2FA: "",
            });
            const token = Cookies.get("JWTtoken");
            console.log("Response cookie: ", token);
            if (token) {
                updateToken(token);
            }
            console.log("Response data: ", res.data);
            //console.log("URL: ", res.data["url"]);
            if (res.data["url"]) {
                TFAuth = true;
                code = res.data["url"];
                console.log("OUTPUT: ", code);
            } else {
                console.log("DATA: ", res.data);
                updateUser(res.data);
                console.log("AUTH: ", Auth);
            }
        } catch (error) {
            console.log(error);
        }
        
        if (TFAuth) {
            navigate("/2fa", { state: code, replace: true });
        }
        */
    }

    const [socket] = useSocket();
    function signup(e: any) {
        console.log("TEST");
        socket.emit(
            "newUser",
            {
                username: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
                confirmPassword: e.target[3].value,
            },
            (res?: string) => {
                console.log(res);
            }
        );
        // navigate("/", { replace: true });
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper register">
                <span className="title">Register</span>
                <form onSubmit={signup}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="confirm password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && (
                        <span className="err_msg">Something went wrong</span>
                    )}
                </form>
                <p className="detail">
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Subscribe;
