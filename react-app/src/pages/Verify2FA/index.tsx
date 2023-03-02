import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "../../hooks";

import { SetStateType } from "../../@types";

interface DataType {
    code: string;
}

const defaultDataType: DataType = {
    code: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "post",
    url: "/verify2FA",
    data: defaultDataType,
};

interface Props {
    setRequest: SetStateType<AxiosRequestConfig>;
}

function Verify2FA() {
    const navigate = useNavigate();
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const { response, loading } = useAxios(request);

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate("/login");
        }
    }, [loading, response]);

    return <LoginPage setRequest={setRequest} />;
}

function LoginPage({ setRequest }: Props) {
    const [err] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const conf: AxiosRequestConfig = {
            method: "POST",
            url: "/auth/verify2FA",
            data: { code: String(target.code.value) },
        };
        console.log(conf);
        console.log("handleSubmit launched");
        setRequest(conf);
    }

    return (
        <div className="form_container">
            <span className="logo">Two Factor Authentication</span>
            <div className="form_wrapper">
                <span className="title">
                    Input verification code from Google Authenticator to login
                </span>
                <form onSubmit={handleSubmit}>
                    <input name="code" type="text" placeholder="code" />
                    <button>Verify</button>
                    {err && <span>Something went wrong</span>}
                </form>
            </div>
        </div>
    );
}

export default Verify2FA;
