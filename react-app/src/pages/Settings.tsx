import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "hooks";
import { useAuth } from "context";
import "assets/styles/form.scss";
import { AddChannelIcon, AddImageIcon, EmailIcon, UserIcon, LockIcon } from "../assets/images";

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

const defaultPasswordRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/updatePassword",
    data: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    },
};

const default2faRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/deactivate2FA",
    data: null,
};

function Settings() {
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    const [avatarReq, setAvatarReq] = useState<AxiosRequestConfig>(defaultAvatarRequest);
    const [usernameReq, setUsernameReq] = useState<AxiosRequestConfig>(defaultUsernameRequest);
    const [emailReq, setEmailReq] = useState<AxiosRequestConfig>(defaultEmailRequest);
    const [passwordReq, setPasswordReq] = useState<AxiosRequestConfig>(defaultPasswordRequest);
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
    const { response: resE, loading: loadE, error: errE, sendData: sendDataE } = useAxios(emailReq);
    const {
        response: resP,
        loading: loadP,
        error: errP,
        sendData: sendDataP,
    } = useAxios(passwordReq);
    const { response: res2, loading: load2, sendData: sendData2 } = useAxios(default2faRequest);

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
        if (passwordReq !== defaultPasswordRequest) {
            sendDataP();
        }
    }, [passwordReq]);

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
        if (target.email.value) {
            const data = {
                email: String(target.email.value),
            };
            setEmailReq((prev: AxiosRequestConfig) => ({
                ...prev,
                data: data,
            }));
        }
    }

    function handlePassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        if (target.pwd.value && target.newPwd.value && target.confNewPwd.value) {
            const data = {
                password: String(target.pwd.value),
                newPassword: String(target.newPwd.value),
                confirmNewPassword: String(target.confNewPwd.value),
            };
            setPasswordReq((prev: AxiosRequestConfig) => ({
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
            <div className="form_wrapper settings">
                <h1 className="logo">Profile Settings</h1>
                <form className="setting_form" onSubmit={handleUsername}>
                    <div className="input_container">
                        <img className="input_icon" src={UserIcon} alt="" />
                        <span className="input-title">Change your username</span>
                        <input name="username" type="text" placeholder="new username" />
                    </div>
                    <div className="button_container">
                        <button className="button-purple" type="submit">
                            Update username
                        </button>
                        {errU && <p>Error: Username already taken</p>}
                        {resU && !loadU && <p>Username successfully changed</p>}
                    </div>
                </form>
                <form className="setting_form" onSubmit={handleEmail}>
                    <div className="input_container">
                        <img className="input_icon" src={EmailIcon} alt="" />
                        <span className="input-title">Change your email</span>
                        <input name="email" type="email" placeholder="new email" />
                    </div>
                    <div className="button_container">
                        <button className="button-purple" type="submit">
                            Update email
                        </button>
                        {errE && <p>Error: Email already taken</p>}
                        {resE && !loadE && <p>Email successfully changed</p>}
                    </div>
                </form>
                {userAuth.authStrategy === "password" && (
                    <form className="setting_form password" onSubmit={handlePassword}>
                        <div className="password-row">
                            <div className="input_container">
                                <span className="input-title">Change your password</span>
                                <img className="input_icon" src={LockIcon} alt="" />
                                <input name="pwd" type="password" placeholder="current password" />
                            </div>
                            <div className="button_container">
                                <button className="button-purple" type="submit">
                                    Update password
                                </button>
                                {errP && <p>Error: Password incorrect or too weak</p>}
                                {resP && !loadP && <p>Password successfully changed</p>}
                            </div>
                        </div>
                        <div className="password-row">
                            <div className="input_container">
                                <img className="input_icon" src={LockIcon} alt="" />
                                <input name="newPwd" type="password" placeholder="new password" />
                            </div>
                            <div className="input_container">
                                <img className="input_icon" src={LockIcon} alt="" />
                                <input
                                    name="confNewPwd"
                                    type="password"
                                    placeholder="confirm new password"
                                />
                            </div>
                        </div>
                        <span className="info">
                            (8 character min. length including lowercase, uppercase, number, special
                            character)
                        </span>
                    </form>
                )}
                <span className="title">Upload a new avatar</span>
                <div className="input_container">
                    <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleImage}
                        id="file"
                    />
                    <label htmlFor="file" className="flex-row">
                        <img src={AddImageIcon} alt="" />
                        <span>Change your Avatar (jpeg format, max 10Mb)</span>
                    </label>
                    {errA && <p>Error: Invalid file</p>}
                    {resA && !loadA && <p>Avatar successfully changed</p>}
                </div>
                {userAuth.enable2FA && (
                    <button className="button-purple" type="button" onClick={disableTwoFactor}>
                        Disable Two Factor Authentication
                    </button>
                )}
                {!userAuth.enable2FA && (
                    <button className="button-purple" type="button" onClick={enableTwoFactor}>
                        Enable Two Factor Authentication
                    </button>
                )}
                <Link to="/home">
                    <button className="button-purple"> Back to Home</button>
                </Link>
            </div>
        </div>
    );
}

export { Settings };
