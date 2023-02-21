import React from "react";
import Attach from "../../assets/images/paper-clip.png";
import AddImage from "../../assets/images/add-image.png";

type Props = {};

export default function Input({}: Props) {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <img src={AddImage} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Attach} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    );
}
