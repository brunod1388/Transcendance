import React from "react";
import Attach from "../../../assets/images/paper-clip.png";
import AddImage from "../../../assets/images/add-image.png";

export default function Input() {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <img src={AddImage} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Attach} alt="" />
                </label>
                <button className="button-purple">Send</button>
            </div>
        </div>
    );
}
