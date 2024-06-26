import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/`,
    });

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response && err.response.status === 401) {
                    <Navigate to={"/unauthorized"} replace></Navigate>;
                }

                if (err.response && err.response.status === 403) {
                    <Navigate to={"/forbidden"} replace></Navigate>;
                }

                return Promise.reject(err);
            }
        );
    }, [axiosSecure]);

    return [axiosSecure];
};

export default useAxiosSecure;
