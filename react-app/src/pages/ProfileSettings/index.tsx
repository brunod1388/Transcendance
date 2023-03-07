import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import Add from "../../assets/images/add-image.png";
import { AxiosRequestConfig } from "axios";
import "../../assets/styles/form.scss";
import { useAxios } from "../../hooks";

const defaultRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/users/avatar",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    data: null,
};

function ProfileSettings() {
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

    function handleImage(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            console.log("File: ", e.target.files[0]);
            //formData.append("image", e.currentTarget.files[0]);
            setRequest((prev: AxiosRequestConfig) => ({
                ...prev,
                data: formData,
            }));
        }
    }

    return (
        <div className="form_container">
            <span className="logo">Manage Profile Settings</span>
            <div className="form_wrapper register">
                <span className="title">Change your profile avatar by uploading an image</span>
                {/* <form onSubmit={signup}> */}
                <input
                    type="file"
                    name="file"
                    placeholder="upload your avatar"
                    onChange={handleImage}
                />
                <p className="detail">
                    To return to the homepage click <Link to="/home">here</Link>
                </p>
            </div>
        </div>
    );
}

export default ProfileSettings;
