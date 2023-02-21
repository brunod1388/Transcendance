import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000`;

export const useAxios = (axiosParams: any) => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.request(axiosParams);
            setData(response.data);
        } catch (err: any) {
            setError(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [axiosParams]);
    return { data, error, loading, fetchData };
};
