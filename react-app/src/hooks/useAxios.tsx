import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["crossorigin"] = true;
axios.defaults.headers.get["Access-Control-Allow-Origin"] =
    "https://api.intra.42.fr/oauth";

export const useAxios = (axiosParams: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.request(axiosParams);
                setResponse(res);
            } catch (err: any) {
                setError(err);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosParams]);

    //    useEffect(() => {
    //        fetchData();
    //    }, [axiosParams]);
    return { response, error, loading };
};
