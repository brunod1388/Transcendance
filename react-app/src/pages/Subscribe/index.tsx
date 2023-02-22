import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Add from "../../assets/images/add-image.png";
import { useSocket } from "../../hooks/useSocket";

import "../../assets/styles/global.scss";

function Subscribe() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    // const [socket, setSocket] = useSocket();

    function handleSubmit(e: any) {
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        e.preventDefault();
        console.log("TEST");
        console.log(`displayName: ${displayName}`);
        console.log(`password: ${password}`);
        console.log(`email: ${email}`);
    }

    // const signup = (e: any) => {
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
    //     navigate("/", { replace: true });
    // };

    return (
        <div className="form_container">
            <span className="logo">Transcendance</span>
            <div className="form_wrapper register">
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="re-type password" />
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
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Subscribe;
