// import style from "../assets/styles/pages.module.css";
// import { Login } from "../components/authentification/components/LogIn";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../assets/styles/global.scss";
import { useUser } from "../../context/test-context";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks";

// interface resp{
//     found.boolean
// }
// interface user {
//     id: number;
//     username: string;
// }

function Login() {
    const [err, setErr] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
    const user = useUser();
    const [socket] = useSocket();

    async function handleSubmit(e: any) {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        setErr(false);
        try {
            socket.emit("findUserByMail", { email }, (res?: any) => {
                if (res.found) {
                    user.setUser(res.user.id, res.user.username);
                    navigate("/home");
                } else setNotFound(true);
            });
        } catch (error) {
            setErr(err ? false : true);
        }
    }

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={() => setNotFound(false)}
                    />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                    {notFound && <span>User does not exist</span>}
                </form>
                <p className="detail">
                    You don't have an account?{" "}
                    <Link to="/subscribe">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
