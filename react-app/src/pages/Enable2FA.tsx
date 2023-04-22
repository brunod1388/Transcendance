import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "hooks";

interface DataType {
    code: string;
}

const defaultDataType: DataType = {
    code: "",
};

const defaultRequest: AxiosRequestConfig = {
    method: "GET",
    url: "/auth/enable2FA",
};

const defaultVerifyRequest: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/activate2FA",
    data: defaultDataType,
};

interface Props {
    qrcode: string;
}

function TwoFactorAuth() {
    const [request] = useState<AxiosRequestConfig>(defaultRequest);
    const [code, setCode] = useState<string>("");
    const { response } = useAxios(request);

    useEffect(() => {
        if (response?.data?.url) {
            setCode(response.data.url);
        }
    }, [response]);

    return <TwoFactorAuthPage qrcode={code} />;
}

function TwoFactorAuthPage({ qrcode }: Props) {
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultVerifyRequest);
    const { response, error, sendData } = useAxios(request);
    //const { userAuth, updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (response?.status === 201) {
            navigate("/home");
        }
    }, [response]);

    useEffect(() => {
        if (request !== defaultVerifyRequest) {
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
                <span className="logo enable-2FA">Two Factor Authentication</span>
                <span className="title">
                    Google Authenticator
                </span>
                <span className="detail">
                    Scan QR with Google Authenticator then input code below{" "}
                </span>
                <img alt="" src={qrcode} />
                <form onSubmit={handleSubmit}>
                    <input name="code" type="text" placeholder="code" />
                    <button className="button-purple">Verify code and complete two factor activation</button>
                    {error?.response?.status === 403 && <span>Verification code incorrect</span>}
                </form>
                <p className="detail">
                    Cancel activation of Two Factor Authentication? <Link to="/home">Home</Link>
                </p>
            </div>
        </div>
    );
}

export { TwoFactorAuth };
