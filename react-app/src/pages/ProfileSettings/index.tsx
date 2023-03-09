import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";
import "../../assets/styles/form.scss";
import { useAxios } from "../../hooks";
import { useAuth } from "../../context";

const defaultAvatarRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/users/avatar",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    data: null,
};

const defaultUsernameRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/update",
    data: {
        username: "",
    },
};

const defaultEmailRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/update",
    data: {
        email: "",
    },
};

const default2faRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/deactivate2FA",
    data: null,
};

function ProfileSettings() {
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    const [avatarReq, setAvatarReq] =
        useState<AxiosRequestConfig>(defaultAvatarRequest);
    const [usernameReq, setUsernameReq] = useState<AxiosRequestConfig>(
        defaultUsernameRequest
    );
    const [emailReq, setEmailReq] =
        useState<AxiosRequestConfig>(defaultEmailRequest);
    const [twofaReq, setTwofaReq] = useState<boolean>(false);
    const {
        response: resA,
        loading: loadA,
        error: errA,
        sendData: sendDataA,
    } = useAxios(avatarReq);
    const {
        response: resU,
        loading: loadU,
        error: errU,
        sendData: sendDataU,
    } = useAxios(usernameReq);
    const {
        response: resE,
        loading: loadE,
        error: errE,
        sendData: sendDataE,
    } = useAxios(emailReq);
    const {
        response: res2,
        loading: load2,
        sendData: sendData2,
    } = useAxios(default2faRequest);

    useEffect(() => {
        if (load2 === false && res2?.status === 201) {
            navigate("/home");
        }
    }, [load2, res2]);

    useEffect(() => {
        if (avatarReq !== defaultAvatarRequest) {
            sendDataA();
        }
    }, [avatarReq]);

    useEffect(() => {
        if (usernameReq !== defaultUsernameRequest) {
            sendDataU();
        }
    }, [usernameReq]);

    useEffect(() => {
        if (emailReq !== defaultEmailRequest) {
            sendDataE();
        }
    }, [emailReq]);

    useEffect(() => {
        if (twofaReq) {
            sendData2();
        }
    }, [twofaReq]);

    function handleImage(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            console.log("File: ", e.target.files[0]);
            //formData.append("image", e.currentTarget.files[0]);
            setAvatarReq((prev: AxiosRequestConfig) => ({
                ...prev,
                data: formData,
            }));
        }
    }

    function handleUsername(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        if (target.username.value) {
            const data = {
                username: String(target.username.value),
            };
            setUsernameReq((prev: AxiosRequestConfig) => ({
                ...prev,
                data: data,
            }));
        }
    }

    function handleEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        if (target.username.value) {
            const data = {
                email: String(target.email.value),
            };
            setEmailReq((prev: AxiosRequestConfig) => ({
                ...prev,
                data: data,
            }));
        }
    }

    function enableTwoFactor(e: MouseEvent<HTMLButtonElement>) {
        navigate("/twofactor");
    }

    function disableTwoFactor(e: MouseEvent<HTMLButtonElement>) {
        setTwofaReq(true);
    }

    return (
        <div className="form_container">
            <span className="logo">Manage Profile Settings</span>
            <div className="form_wrapper register">
                <span className="title">Change your username</span>
                <form onSubmit={handleUsername}>
                    <input
                        name="username"
                        type="text"
                        placeholder="new username"
                    />
                    <button type="submit">Update username</button>
                    {errU && <p>Error: Username already taken</p>}
                    {resU && !loadU && <p>Username successfully changed</p>}
                </form>
                <span className="title">Change your email</span>
                <form onSubmit={handleEmail}>
                    <input name="email" type="email" placeholder="new email" />
                    <button type="submit">Update email</button>
                    {errE && <p>Error: Email already taken</p>}
                    {resE && !loadE && <p>Email successfully changed</p>}
                </form>
                <span className="title">
                    Change your profile avatar by uploading an image
                </span>
                <input
                    type="file"
                    name="file"
                    placeholder="upload your avatar"
                    onChange={handleImage}
                />
                {errA && <p>Error: Invalid file</p>}
                {resA && !loadA && <p>Avatar successfully changed</p>}
                <span className="title">
                    Two factor authentication settings
                </span>
                {userAuth.enable2FA && (
                    <button type="button" onClick={disableTwoFactor}>
                        Disable Two Factor Authentication
                    </button>
                )}
                {!userAuth.enable2FA && (
                    <button type="button" onClick={enableTwoFactor}>
                        Enable Two Factor Authentication
                    </button>
                )}
                <p className="detail">
                    To return to the homepage click <Link to="/home">here</Link>
                </p>
            </div>
        </div>
    );
}

export default ProfileSettings;
