import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";
import "../../assets/styles/form.scss";
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
    // import { useUser } from "../../context/test-context";
    // import { useSocket } from "../../hooks";

    //     const [err, setErr] = useState(false);
    const [notFound, setNotFound] = useState(false);
    //     const user = useUser();
    //     const [socket] = useSocket();

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate("/home");
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
        // const email = e.target[0].value;
        // const password = e.target[1].value;
        // setErr(false);
        // try {
        //     socket.emit("findUserByMail", { email }, (res?: any) => {
        //         if (res.found) {
        //             user.setUser(res.user.id, res.user.username);
        //             navigate("/home");
        //         } else setNotFound(true);
        //     });
        // } catch (error) {
        //     setErr(err ? false : true);
        // }
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
                    <input
                        name="username"
                        type="text"
                        placeholder="username"
                        onChange={() => setNotFound(false)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button>Login</button>
                    {error && <p>Credentials Incorrect</p>}
                    {/* {err && <span>Something went wrong</span>} */}
                    {notFound && <span>User does not exist</span>}
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
