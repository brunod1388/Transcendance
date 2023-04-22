import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "../hooks";

interface DataType {
    code: string;
}

const defaultDataType: DataType = {
    code: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/verify2FA",
    data: defaultDataType,
};

function Verify2FA() {
    const navigate = useNavigate();
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const { response, loading, error, sendData } = useAxios(request);

    useEffect(() => {
        if (loading === false && response?.status === 200) {
            navigate("/home");
        }
    }, [loading, response]);

    useEffect(() => {
        if (request !== defaultRequest) {
            sendData();
        }
    }, [request]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const dto: DataType = {
            code: String(target.code.value),
        };
        setRequest((prev: AxiosRequestConfig) => ({ ...prev, data: dto }));
    }

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <span className="logo logo-2FA">Two Factor Authentication</span>
                <span className="title">
                    Google Authenticator
                </span>
                <span className="detail">
                    Input verification code from Google Authenticator to login
                </span>
                <form onSubmit={handleSubmit}>
                    <input name="code" type="text" placeholder="code" />
                    <button className="button-purple">Verify</button>
                    {error && <span>Invalid code</span>}
                </form>
            </div>
        </div>
    );
}

export { Verify2FA };
