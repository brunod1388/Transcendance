import { Link } from "react-router-dom";
import "assets/styles/NotFound.scss";
import "assets/styles/App.scss";

export function NotFound() {
    return (
        <div className="form_container">
            <div className="errorCode">Page</div>
            <span className="errorCode">Not Found</span>
            <div className="home_button_container">
                <Link to="/home">
                    <button className="button-purple">Go back home</button>
                </Link>
            </div>
        </div>
    );
}
