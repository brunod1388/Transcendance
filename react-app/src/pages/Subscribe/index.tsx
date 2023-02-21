import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../pages.scss";
import Add from "../../assets/images/add-image.png"
function Subscribe() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

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
                    {err && <span className="err_msg">Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Subscribe;
